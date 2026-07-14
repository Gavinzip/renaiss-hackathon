import { createHash, randomUUID } from 'node:crypto'

import { EVENT } from '../shared/event.mjs'
import { PROJECTS, PROJECT_IDS, VOTABLE_PROJECT_IDS } from '../shared/projects.mjs'

import { HttpError } from './http.mjs'

const EVENT_ID = String(EVENT?.id || '').trim()
if (!EVENT_ID) throw new Error('shared/event.mjs must export EVENT with a stable id.')
if (!Array.isArray(PROJECTS) || !Array.isArray(PROJECT_IDS) || PROJECTS.length === 0) {
  throw new Error('shared/projects.mjs must export non-empty PROJECTS and PROJECT_IDS.')
}
if (Number(EVENT.projectCount) !== PROJECTS.length) {
  throw new Error('EVENT.projectCount must match the official PROJECTS catalog.')
}
const PROJECT_ID_SET = new Set(PROJECT_IDS)
if (PROJECT_ID_SET.size !== PROJECTS.length) {
  throw new Error('PROJECT_IDS must contain one unique id for every project.')
}
const VOTABLE_PROJECT_ID_SET = new Set(VOTABLE_PROJECT_IDS)
if (VOTABLE_PROJECT_ID_SET.size !== VOTABLE_PROJECT_IDS.length) {
  throw new Error('VOTABLE_PROJECT_IDS must contain unique project ids.')
}
for (const projectId of VOTABLE_PROJECT_ID_SET) {
  if (!PROJECT_ID_SET.has(projectId)) {
    throw new Error('VOTABLE_PROJECT_IDS must only contain official project ids.')
  }
}
for (const project of PROJECTS) {
  if (!project?.id || !PROJECT_ID_SET.has(project.id)) {
    throw new Error('Every project must have a stable id included in PROJECT_IDS.')
  }
}

function nowMs() {
  return Date.now()
}

function iso(timestamp) {
  return new Date(timestamp).toISOString()
}

function parseJson(value) {
  try {
    return JSON.parse(String(value || 'null'))
  } catch {
    throw new HttpError(500, 'stored_vote_result_invalid')
  }
}

function rowToVote(row) {
  if (!row) return null
  return {
    eventId: row.event_id,
    projectId: row.project_id,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  }
}

function normalizeRequestId(value) {
  const requestId = String(value || '').trim()
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(requestId)) {
    throw new HttpError(400, 'request_id_invalid', 'requestId must contain 8-128 URL-safe characters.')
  }
  return requestId
}

function normalizeProjectId(value) {
  const projectId = String(value || '').trim()
  if (!projectId || !VOTABLE_PROJECT_ID_SET.has(projectId)) {
    throw new HttpError(400, 'project_not_found', 'Select a valid hackathon project.')
  }
  return projectId
}

function requestFingerprint(action, projectId = '') {
  return createHash('sha256')
    .update(JSON.stringify({ action, eventId: EVENT_ID, projectId }))
    .digest('hex')
}

function votingWindowPayload(config, timestamp = nowMs()) {
  const { configured, prelaunch, opensAt, closesAt } = config.votingWindow
  let status = 'configuration_required'
  if (!prelaunch && configured && timestamp < opensAt) status = 'upcoming'
  if (!prelaunch && configured && timestamp >= opensAt && timestamp < closesAt) status = 'open'
  if (!prelaunch && configured && timestamp >= closesAt) status = 'closed'
  return {
    status,
    prelaunch: Boolean(prelaunch),
    opensAt: configured || prelaunch ? iso(opensAt) : null,
    closesAt: configured ? iso(closesAt) : null,
    serverTime: iso(timestamp),
  }
}

function assertVotingOpen(config, timestamp = nowMs()) {
  const window = votingWindowPayload(config, timestamp)
  if (window.status === 'configuration_required') {
    throw new HttpError(503, 'voting_window_not_configured', 'Voting is not configured yet.')
  }
  if (window.status === 'upcoming') {
    throw new HttpError(409, 'voting_not_open', 'Voting has not opened yet.')
  }
  if (window.status === 'closed') {
    throw new HttpError(409, 'voting_closed', 'Voting is closed.')
  }
  return window
}

export function createVoteStore({ database, config }) {
  const db = database.connection
  db.exec(`
    CREATE TABLE IF NOT EXISTS vote_allocations (
      event_id TEXT NOT NULL,
      voter_sub TEXT NOT NULL,
      project_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (event_id, voter_sub)
    );

    CREATE INDEX IF NOT EXISTS vote_allocations_project_idx
      ON vote_allocations (event_id, project_id);

    CREATE TABLE IF NOT EXISTS vote_events (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      voter_sub TEXT NOT NULL,
      action TEXT NOT NULL,
      previous_project_id TEXT,
      project_id TEXT,
      request_id TEXT NOT NULL,
      request_fingerprint TEXT NOT NULL,
      result_json TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      UNIQUE (event_id, request_id)
    );

    CREATE INDEX IF NOT EXISTS vote_events_voter_idx
      ON vote_events (event_id, voter_sub, created_at);

    CREATE TRIGGER IF NOT EXISTS vote_events_no_update
    BEFORE UPDATE ON vote_events
    BEGIN
      SELECT RAISE(ABORT, 'vote_events is append-only');
    END;

    CREATE TRIGGER IF NOT EXISTS vote_events_no_delete
    BEFORE DELETE ON vote_events
    BEGIN
      SELECT RAISE(ABORT, 'vote_events is append-only');
    END;
  `)

  const selectVote = db.prepare(`
    SELECT event_id, voter_sub, project_id, created_at, updated_at
    FROM vote_allocations
    WHERE event_id = ? AND voter_sub = ?
  `)
  const selectEventByRequestId = db.prepare(`
    SELECT event_id, voter_sub, action, request_fingerprint, result_json
    FROM vote_events
    WHERE event_id = ? AND request_id = ?
  `)
  const insertVote = db.prepare(`
    INSERT INTO vote_allocations (event_id, voter_sub, project_id, created_at, updated_at)
    VALUES (@eventId, @voterSub, @projectId, @createdAt, @updatedAt)
  `)
  const insertEvent = db.prepare(`
    INSERT INTO vote_events (
      id, event_id, voter_sub, action, previous_project_id, project_id,
      request_id, request_fingerprint, result_json, created_at
    ) VALUES (
      @id, @eventId, @voterSub, @action, @previousProjectId, @projectId,
      @requestId, @requestFingerprint, @resultJson, @createdAt
    )
  `)
  const countVotes = db.prepare(`
    SELECT project_id, COUNT(*) AS votes
    FROM vote_allocations
    WHERE event_id = ?
    GROUP BY project_id
  `)
  const selectLatestVote = db.prepare(`
    SELECT MAX(updated_at) AS updated_at
    FROM vote_allocations
    WHERE event_id = ?
  `)

  function idempotentResult(requestId, voterSub, fingerprint) {
    const event = selectEventByRequestId.get(EVENT_ID, requestId)
    if (!event) return null
    if (
      event.event_id !== EVENT_ID
      || event.voter_sub !== voterSub
      || event.request_fingerprint !== fingerprint
    ) {
      throw new HttpError(409, 'idempotency_key_conflict', 'requestId was already used for another action.')
    }
    return {
      ...parseJson(event.result_json),
      idempotentReplay: true,
    }
  }

  function results() {
    const counts = new Map(countVotes.all(EVENT_ID).map((row) => [row.project_id, Number(row.votes)]))
    const projects = PROJECTS.map((project) => ({
      projectId: project.id,
      votes: counts.get(project.id) || 0,
    }))
    return {
      totalVotes: projects.reduce((sum, project) => sum + project.votes, 0),
      projects,
    }
  }

  function adminResults() {
    const counts = new Map(countVotes.all(EVENT_ID).map((row) => [row.project_id, Number(row.votes)]))
    const ordered = PROJECTS
      .filter((project) => VOTABLE_PROJECT_ID_SET.has(project.id))
      .map((project) => ({ projectId: project.id, votes: counts.get(project.id) || 0 }))
      .sort((left, right) => right.votes - left.votes || left.projectId.localeCompare(right.projectId))

    let previousVotes = null
    let rank = 0
    const leaderboard = ordered.map((project, index) => {
      if (project.votes !== previousVotes) rank = index + 1
      previousVotes = project.votes
      return { ...project, rank }
    })
    const latestVote = selectLatestVote.get(EVENT_ID)

    return {
      totalVotes: leaderboard.reduce((total, project) => total + project.votes, 0),
      leaderboard,
      lastUpdatedAt: latestVote?.updated_at ? iso(latestVote.updated_at) : null,
      serverTime: iso(nowMs()),
    }
  }

  function publicEvent() {
    const voting = votingWindowPayload(config)
    const resultsPublished = config.resultsPublished && voting.status === 'closed'
    const event = {
      ...EVENT,
      id: EVENT_ID,
      status: voting.status,
      opensAt: voting.opensAt,
      closesAt: voting.closesAt,
      voting,
      voteEligibility: {
        minimumSbtBadgeCount: config.sbtEligibility.minimumBadgeCount,
      },
      resultsPublished,
    }
    delete event.results
    delete event.totalVotes
    delete event.voteTotals
    if (resultsPublished) event.results = results()
    return event
  }

  function publicState(voterSub) {
    return {
      vote: rowToVote(selectVote.get(EVENT_ID, voterSub)),
      event: publicEvent(),
    }
  }

  function castVote({ voterSub, projectId: rawProjectId, requestId: rawRequestId }) {
    const projectId = normalizeProjectId(rawProjectId)
    const requestId = normalizeRequestId(rawRequestId)
    const fingerprint = requestFingerprint('vote', projectId)

    database.immediateTransaction(() => {
      const replay = idempotentResult(requestId, voterSub, fingerprint)
      if (replay) return replay
      assertVotingOpen(config)

      const existing = selectVote.get(EVENT_ID, voterSub)
      if (existing) {
        throw new HttpError(409, 'vote_already_recorded', 'A vote is already recorded for this identity.')
      }
      const timestamp = nowMs()
      insertVote.run({
        eventId: EVENT_ID,
        voterSub,
        projectId,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      const vote = rowToVote(selectVote.get(EVENT_ID, voterSub))
      const storedResult = { vote }
      insertEvent.run({
        id: randomUUID(),
        eventId: EVENT_ID,
        voterSub,
        action: 'cast',
        previousProjectId: null,
        projectId,
        requestId,
        requestFingerprint: fingerprint,
        resultJson: JSON.stringify(storedResult),
        createdAt: timestamp,
      })
      return storedResult
    })

    return {
      ...publicState(voterSub),
    }
  }

  return {
    eventId: EVENT_ID,
    getPublicEvent: publicEvent,
    getPublicState: publicState,
    getAdminResults: adminResults,
    castVote,
  }
}
