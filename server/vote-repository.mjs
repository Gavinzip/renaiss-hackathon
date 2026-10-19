export function createVoteRepository(database, eventId) {
  const db = database.connection
  return {
    async ballot(voterSub) {
      return (await db.query('SELECT * FROM vote_ballots WHERE event_id=$1 AND voter_sub=$2', [eventId,voterSub])).rows[0]
    },
    async choices(voterSub) {
      return (await db.query('SELECT * FROM vote_choices WHERE event_id=$1 AND voter_sub=$2 ORDER BY selection_index', [eventId,voterSub])).rows
    },
    async event(requestId) {
      return (await db.query('SELECT * FROM vote_events WHERE event_id=$1 AND request_id=$2', [eventId,requestId])).rows[0]
    },
    async counts() {
      return (await db.query('SELECT project_id,COUNT(*) AS votes FROM vote_choices WHERE event_id=$1 GROUP BY project_id', [eventId])).rows
    },
    async latest() {
      return (await db.query(`SELECT MAX(recorded_at) AS updated_at FROM (
        SELECT updated_at AS recorded_at FROM vote_ballots WHERE event_id=$1
        UNION ALL SELECT created_at FROM vote_events WHERE event_id=$1) AS records`, [eventId])).rows[0]
    },
    insertBallot(r) {
      return db.query(`INSERT INTO vote_ballots (event_id,voter_sub,selection_count,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5)`, [eventId,r.voterSub,r.selectionCount,r.createdAt,r.updatedAt])
    },
    insertChoice(r) {
      return db.query(`INSERT INTO vote_choices (event_id,voter_sub,selection_index,project_id,team_key,created_at)
        VALUES ($1,$2,$3,$4,$5,$6)`, [eventId,r.voterSub,r.selectionIndex,r.projectId,r.teamKey,r.createdAt])
    },
    insertEvent(r) {
      return db.query(`INSERT INTO vote_events (id,event_id,voter_sub,action,previous_project_id,project_id,
        project_ids_json,request_id,request_fingerprint,result_json,created_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [r.id,eventId,r.voterSub,r.action,r.previousProjectId,r.projectId,r.projectIdsJson,r.requestId,r.requestFingerprint,r.resultJson,r.createdAt])
    },
    lock(voterSub,requestId) {
      return db.lock([`vote:subject:${eventId}:${voterSub}`,`vote:request:${eventId}:${requestId}`])
    },
  }
}
