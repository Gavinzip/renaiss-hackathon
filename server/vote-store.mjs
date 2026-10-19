import { createHash, randomUUID } from 'node:crypto'

import { EVENT } from '../shared/event.mjs'
import { orderProjectsByVotes } from '../shared/project-order.mjs'
import { PROJECTS, PROJECT_IDS, VOTABLE_PROJECT_IDS } from '../shared/projects.mjs'

import { HttpError } from './http.mjs'
import { createVoteRepository } from './vote-repository.mjs'

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
const RESULT_VOTE_MULTIPLIER = Number(EVENT.votePolicy?.resultVoteMultiplier)
if (!Number.isInteger(RESULT_VOTE_MULTIPLIER) || RESULT_VOTE_MULTIPLIER < 1) {
  throw new Error('EVENT.votePolicy.resultVoteMultiplier must be a positive integer.')
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
  return new Date(Number(timestamp)).toISOString()
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
  if (!Array.isArray(value) || value.length < 1 || value.length > SELECTIONS_PER_VOTER) {
    throw new HttpError(
      400,
      'vote_selection_count_invalid',
      `Select between 1 and ${SELECTIONS_PER_VOTER} different teams.`,
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

export function createVoteStore({ database, config }) {
  const repository = createVoteRepository(database, EVENT_ID)

  async function readVote(voterSub) {
    const ballot = await repository.ballot(voterSub)
    if (!ballot) return null
    const choices = await repository.choices(voterSub)
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

  async function voteCountsByProject() {
    return new Map((await repository.counts()).map((row) => [
      row.project_id,
      Number(row.votes) * RESULT_VOTE_MULTIPLIER,
    ]))
  }

  async function idempotentResult(requestId, voterSub, fingerprint) {
    const event = await repository.event(requestId)
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

  async function results() {
    const counts = await voteCountsByProject()
    const projects = PROJECTS.map((project) => ({
      projectId: project.id,
      votes: counts.get(project.id) || 0,
    }))
    return {
      totalVotes: projects.reduce((sum, project) => sum + project.votes, 0),
      projects,
    }
  }

  async function adminResults() {
    const counts = await voteCountsByProject()
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
    const latestVote = await repository.latest()

    return {
      totalVotes: leaderboard.reduce((total, project) => total + project.votes, 0),
      leaderboard,
      lastUpdatedAt: latestVote?.updated_at ? iso(latestVote.updated_at) : null,
      serverTime: iso(nowMs()),
    }
  }

  async function publicEvent() {
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
    if (resultsPublished) event.results = await results()
    return event
  }

  async function publicState(voterSub) {
    return {
      vote: await readVote(voterSub),
      event: await publicEvent(),
    }
  }

  async function castVote({ voterSub, projectIds: rawProjectIds, requestId: rawRequestId }) {
    const projectIds = normalizeProjectIds(rawProjectIds)
    const requestId = normalizeRequestId(rawRequestId)
    const fingerprint = requestFingerprint('submit', projectIds)

    await database.transaction(async () => {
      await repository.lock(voterSub, requestId)
      const replay = await idempotentResult(requestId, voterSub, fingerprint)
      if (replay) return replay
      assertVotingOpen(config)

      const existing = await readVote(voterSub)
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
      if (existing && addedProjectIds.length < 1) {
        throw new HttpError(409, 'vote_completion_invalid', 'Add at least one new selection to this ballot.')
      }

      if (!existing) {
        await repository.insertBallot({
          eventId: EVENT_ID,
          voterSub,
          selectionCount: projectIds.length,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
      }
      for (const [index, projectId] of addedProjectIds.entries()) {
        await repository.insertChoice({
          eventId: EVENT_ID,
          voterSub,
          selectionIndex: (existing?.selectionCount || 0) + index + 1,
          projectId,
          teamKey: TEAM_KEY_BY_PROJECT_ID.get(projectId),
          createdAt: timestamp,
        })
      }

      const vote = await readVote(voterSub)
      const storedResult = { vote }
      await repository.insertEvent({
        id: randomUUID(),
        eventId: EVENT_ID,
        voterSub,
        action: existing ? 'append' : 'cast',
        previousProjectId: existing?.projectIds.at(-1) || null,
        projectId: addedProjectIds.at(-1) || null,
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
    getResults: results,
    getAdminResults: adminResults,
    castVote,
  }
}
