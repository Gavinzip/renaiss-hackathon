import { createHash, randomUUID } from 'node:crypto'

import { EVENT } from '../shared/event.mjs'
import { orderProjectsByVotes } from '../shared/project-order.mjs'
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

const SELECTIONS_PER_VOTER = Number(EVENT.votePolicy?.selectionsPerVoter)
if (!Number.isInteger(SELECTIONS_PER_VOTER) || SELECTIONS_PER_VOTER < 1) {
  throw new Error('EVENT.votePolicy.selectionsPerVoter must be a positive integer.')
}
if (EVENT.votePolicy?.requireDistinctTeams !== true) {
  throw new Error('EVENT.votePolicy.requireDistinctTeams must be true for community voting.')
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

const TEAM_KEY_BY_PROJECT_ID = new Map()
for (const project of PROJECTS) {
  if (!project?.id || !PROJECT_ID_SET.has(project.id)) {
    throw new Error('Every project must have a stable id included in PROJECT_IDS.')
  }
  const teamKey = normalizeTeamKey(project.team)
  if (!teamKey) {
    throw new Error(`Project ${project.id} must have a non-empty team name.`)
  }
  TEAM_KEY_BY_PROJECT_ID.set(project.id, teamKey)
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

function normalizeTeamKey(value) {
  return String(value || '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('en-US')
}

function normalizeRequestId(value) {
  const requestId = String(value || '').trim()
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(requestId)) {
    throw new HttpError(400, 'request_id_invalid', 'requestId must contain 8-128 URL-safe characters.')
  }
  return requestId
}

function normalizeProjectIds(value) {
  if (!Array.isArray(value) || value.length !== SELECTIONS_PER_VOTER) {
    throw new HttpError(
      400,
      'vote_selection_count_invalid',
      `Select exactly ${SELECTIONS_PER_VOTER} different teams.`,
    )
  }

  const projectIds = value.map((item) => String(item || '').trim())
  if (projectIds.some((projectId) => !projectId || !VOTABLE_PROJECT_ID_SET.has(projectId))) {
    throw new HttpError(400, 'project_not_found', 'Select valid hackathon projects.')
  }
  if (new Set(projectIds).size !== projectIds.length) {
    throw new HttpError(400, 'vote_project_duplicate', 'Each selected project must be different.')
  }

  const teamKeys = projectIds.map((projectId) => TEAM_KEY_BY_PROJECT_ID.get(projectId))
  if (new Set(teamKeys).size !== teamKeys.length) {
    throw new HttpError(400, 'vote_team_duplicate', 'Each selection must belong to a different team.')
  }

  return projectIds
}

function requestFingerprint(action, projectIds = []) {
  return createHash('sha256')
    .update(JSON.stringify({ action, eventId: EVENT_ID, projectIds: [...projectIds].sort() }))
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

function ensureVoteEventProjectListColumn(db) {
  const columns = db.prepare('PRAGMA table_info(vote_events)').all()
  if (!columns.some((column) => column.name === 'project_ids_json')) {
    db.exec('ALTER TABLE vote_events ADD COLUMN project_ids_json TEXT')
  }
}

export function createVoteStore({ database, config }) {
  const db = database.connection
  db.exec(`
    -- Kept read-only by this store so deployments can migrate the original
    -- one-project ballot schema without deleting any historical records.
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

    CREATE TABLE IF NOT EXISTS vote_ballots (
      event_id TEXT NOT NULL,
      voter_sub TEXT NOT NULL,
      selection_count INTEGER NOT NULL CHECK (selection_count >= 1 AND selection_count <= ${SELECTIONS_PER_VOTER}),
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (event_id, voter_sub)
    );

    CREATE TABLE IF NOT EXISTS vote_choices (
      event_id TEXT NOT NULL,
      voter_sub TEXT NOT NULL,
      selection_index INTEGER NOT NULL CHECK (selection_index >= 1 AND selection_index <= ${SELECTIONS_PER_VOTER}),
      project_id TEXT NOT NULL,
      team_key TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (event_id, voter_sub, project_id),
      UNIQUE (event_id, voter_sub, selection_index),
      FOREIGN KEY (event_id, voter_sub)
        REFERENCES vote_ballots (event_id, voter_sub)
        ON DELETE RESTRICT
    );

    CREATE INDEX IF NOT EXISTS vote_choices_project_idx
      ON vote_choices (event_id, project_id);

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

    CREATE TRIGGER IF NOT EXISTS vote_ballots_no_update
    BEFORE UPDATE ON vote_ballots
    BEGIN
      SELECT RAISE(ABORT, 'vote_ballots is immutable');
    END;

    CREATE TRIGGER IF NOT EXISTS vote_ballots_no_delete
    BEFORE DELETE ON vote_ballots
    BEGIN
      SELECT RAISE(ABORT, 'vote_ballots is immutable');
    END;

    CREATE TRIGGER IF NOT EXISTS vote_choices_no_update
    BEFORE UPDATE ON vote_choices
    BEGIN
      SELECT RAISE(ABORT, 'vote_choices is immutable');
    END;

    CREATE TRIGGER IF NOT EXISTS vote_choices_no_delete
    BEFORE DELETE ON vote_choices
    BEGIN
      SELECT RAISE(ABORT, 'vote_choices is immutable');
    END;

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
  ensureVoteEventProjectListColumn(db)

  const selectBallot = db.prepare(`
    SELECT event_id, voter_sub, selection_count, created_at, updated_at
    FROM vote_ballots
    WHERE event_id = ? AND voter_sub = ?
  `)
  const selectChoices = db.prepare(`
    SELECT selection_index, project_id, team_key, created_at
    FROM vote_choices
    WHERE event_id = ? AND voter_sub = ?
    ORDER BY selection_index ASC
  `)
  const selectEventByRequestId = db.prepare(`
    SELECT event_id, voter_sub, action, request_fingerprint, result_json
    FROM vote_events
    WHERE event_id = ? AND request_id = ?
  `)
  const insertBallot = db.prepare(`
    INSERT INTO vote_ballots (event_id, voter_sub, selection_count, created_at, updated_at)
    VALUES (@eventId, @voterSub, @selectionCount, @createdAt, @updatedAt)
  `)
  const insertChoice = db.prepare(`
    INSERT INTO vote_choices (
      event_id, voter_sub, selection_index, project_id, team_key, created_at
    ) VALUES (
      @eventId, @voterSub, @selectionIndex, @projectId, @teamKey, @createdAt
    )
  `)
  const insertEvent = db.prepare(`
    INSERT INTO vote_events (
      id, event_id, voter_sub, action, previous_project_id, project_id,
      project_ids_json, request_id, request_fingerprint, result_json, created_at
    ) VALUES (
      @id, @eventId, @voterSub, @action, @previousProjectId, @projectId,
      @projectIdsJson, @requestId, @requestFingerprint, @resultJson, @createdAt
    )
  `)
  const migrateLegacyBallots = db.prepare(`
    INSERT OR IGNORE INTO vote_ballots (
      event_id, voter_sub, selection_count, created_at, updated_at
    )
    SELECT event_id, voter_sub, 1, created_at, updated_at
    FROM vote_allocations
    WHERE event_id = @eventId
  `)
  const migrateLegacyChoices = db.prepare(`
    INSERT OR IGNORE INTO vote_choices (
      event_id, voter_sub, selection_index, project_id, team_key, created_at
    )
    SELECT event_id, voter_sub, 1, project_id, @teamKey, created_at
    FROM vote_allocations
    WHERE event_id = @eventId
      AND voter_sub = @voterSub
      AND project_id = @projectId
  `)
  const legacyVotes = db.prepare(`
    SELECT voter_sub, project_id
    FROM vote_allocations
    WHERE event_id = ?
  `)
  const countVotes = db.prepare(`
    SELECT project_id, COUNT(*) AS votes
    FROM vote_choices
    WHERE event_id = ?
    GROUP BY project_id
  `)
  const selectLatestVote = db.prepare(`
    SELECT MAX(recorded_at) AS updated_at
    FROM (
      SELECT updated_at AS recorded_at
      FROM vote_ballots
      WHERE event_id = ?
      UNION ALL
      SELECT created_at AS recorded_at
      FROM vote_events
      WHERE event_id = ?
    )
  `)

  database.immediateTransaction(() => {
    migrateLegacyBallots.run({ eventId: EVENT_ID })
    for (const legacyVote of legacyVotes.all(EVENT_ID)) {
      const teamKey = TEAM_KEY_BY_PROJECT_ID.get(legacyVote.project_id)
      if (!teamKey) {
        throw new Error(`Legacy vote references unknown project ${legacyVote.project_id}.`)
      }
      migrateLegacyChoices.run({
        eventId: EVENT_ID,
        voterSub: legacyVote.voter_sub,
        projectId: legacyVote.project_id,
        teamKey,
      })
    }
  })

  function readVote(voterSub) {
    const ballot = selectBallot.get(EVENT_ID, voterSub)
    if (!ballot) return null
    const choices = selectChoices.all(EVENT_ID, voterSub)
    if (choices.length < 1 || choices.length > SELECTIONS_PER_VOTER) {
      throw new HttpError(500, 'stored_vote_incomplete')
    }
    return {
      eventId: ballot.event_id,
      projectIds: choices.map((choice) => choice.project_id),
      // The initial ballot row stays immutable. A legacy one-vote ballot can
      // receive its two additional, append-only choices after the policy
      // changes to three votes, so the authoritative count is the choices.
      selectionCount: choices.length,
      createdAt: iso(ballot.created_at),
      updatedAt: iso(choices.at(-1)?.created_at || ballot.updated_at),
    }
  }

  function voteCountsByProject() {
    return new Map(countVotes.all(EVENT_ID).map((row) => [row.project_id, Number(row.votes)]))
  }

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
    const counts = voteCountsByProject()
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
    const counts = voteCountsByProject()
    const ordered = orderProjectsByVotes(
      PROJECTS.filter((project) => VOTABLE_PROJECT_ID_SET.has(project.id)),
      counts,
    )

    let previousVotes = null
    let rank = 0
    const leaderboard = ordered.map((project, index) => {
      if (project.votes !== previousVotes) rank = index + 1
      previousVotes = project.votes
      return { ...project, rank }
    })
    const latestVote = selectLatestVote.get(EVENT_ID, EVENT_ID)

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
      vote: readVote(voterSub),
      event: publicEvent(),
    }
  }

  function castVote({ voterSub, projectIds: rawProjectIds, requestId: rawRequestId }) {
    const projectIds = normalizeProjectIds(rawProjectIds)
    const requestId = normalizeRequestId(rawRequestId)
    const fingerprint = requestFingerprint('submit', projectIds)

    database.immediateTransaction(() => {
      const replay = idempotentResult(requestId, voterSub, fingerprint)
      if (replay) return replay
      assertVotingOpen(config)

      const existing = readVote(voterSub)
      if (existing && existing.selectionCount >= SELECTIONS_PER_VOTER) {
        throw new HttpError(409, 'vote_already_recorded', 'A vote is already recorded for this identity.')
      }

      const timestamp = nowMs()
      const existingProjectIds = new Set(existing?.projectIds || [])
      if (existing && [...existingProjectIds].some((projectId) => !projectIds.includes(projectId))) {
        throw new HttpError(
          409,
          'vote_existing_selection_required',
          'Keep every recorded selection when completing a legacy ballot.',
        )
      }

      const addedProjectIds = projectIds.filter((projectId) => !existingProjectIds.has(projectId))
      if (existing && addedProjectIds.length !== SELECTIONS_PER_VOTER - existing.selectionCount) {
        throw new HttpError(409, 'vote_completion_invalid', 'Complete the remaining selections for this ballot.')
      }

      if (!existing) {
        insertBallot.run({
          eventId: EVENT_ID,
          voterSub,
          selectionCount: projectIds.length,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
      }
      addedProjectIds.forEach((projectId, index) => {
        insertChoice.run({
          eventId: EVENT_ID,
          voterSub,
          selectionIndex: (existing?.selectionCount || 0) + index + 1,
          projectId,
          teamKey: TEAM_KEY_BY_PROJECT_ID.get(projectId),
          createdAt: timestamp,
        })
      })

      const vote = readVote(voterSub)
      const storedResult = { vote }
      insertEvent.run({
        id: randomUUID(),
        eventId: EVENT_ID,
        voterSub,
        action: existing ? 'complete' : 'cast',
        previousProjectId: existing?.projectIds[0] || null,
        projectId: null,
        projectIdsJson: JSON.stringify(projectIds),
        requestId,
        requestFingerprint: fingerprint,
        resultJson: JSON.stringify(storedResult),
        createdAt: timestamp,
      })
      return storedResult
    })

    return publicState(voterSub)
  }

  return {
    eventId: EVENT_ID,
    getPublicEvent: publicEvent,
    getPublicState: publicState,
    getAdminResults: adminResults,
    castVote,
  }
}
