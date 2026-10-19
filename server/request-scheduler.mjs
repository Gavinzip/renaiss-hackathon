import { randomUUID } from 'node:crypto'
import { setTimeout as delay } from 'node:timers/promises'
import { HttpError } from './http.mjs'
import { hmacDigest } from './security.mjs'

// Shared leases preserve the provider's rate and concurrency limits across functions.
export function createSharedRequestScheduler(database, config) {
  const db = database.connection
  const settings = config.sbtEligibility
  const key = hmacDigest(config.sessionSecret, 'provider:bscscan', settings.apiKey)
  const interval = Math.ceil(1000 / settings.requestsPerSecond)
  const capacityError = () => new HttpError(503,'bscscan_capacity_exceeded','The official SBT verification service is busy. No vote was recorded.')
  async function withLock(callback) {
    return db.transaction(async () => {
      await db.lock([`provider:${key}`])
      await db.query('DELETE FROM provider_requests WHERE provider_key=$1 AND expires_at <= $2',[key,Date.now()])
      return callback()
    })
  }
  return {
    async run(operation) {
      const id = randomUUID()
      await withLock(async () => {
        const count = Number((await db.query("SELECT COUNT(*) AS n FROM provider_requests WHERE provider_key=$1 AND state='queued'",[key])).rows[0].n)
        if (count >= settings.maxQueuedRequests) throw capacityError()
        await db.query("INSERT INTO provider_requests (id,provider_key,state,queued_at,expires_at) VALUES ($1,$2,'queued',$3,$4)",[id,key,Date.now(),Date.now()+240000])
      })
      try {
        let acquired = false
        while (!acquired) {
          acquired = await withLock(async () => {
            const own = (await db.query('SELECT id FROM provider_requests WHERE id=$1',[id])).rows[0]
            if (!own) throw capacityError()
            const next = (await db.query("SELECT id FROM provider_requests WHERE provider_key=$1 AND state='queued' ORDER BY queued_at,id LIMIT 1",[key])).rows[0]
            if (next?.id !== id) return false
            const count = Number((await db.query("SELECT COUNT(*) AS n FROM provider_requests WHERE provider_key=$1 AND state='active'",[key])).rows[0].n)
            const last = (await db.query('SELECT timestamps FROM rate_limits WHERE key=$1',[`provider:${key}`])).rows[0]
            const now = Date.now()
            if (count >= settings.maxConcurrentRequests || now < Number(last?.timestamps[0] || 0)+interval) return false
            await db.query("UPDATE provider_requests SET state='active',expires_at=$2 WHERE id=$1",[id,now+settings.requestTimeoutMs+5000])
            await db.query(`INSERT INTO rate_limits (key,timestamps,expires_at) VALUES ($1,$2,$3)
              ON CONFLICT (key) DO UPDATE SET timestamps=EXCLUDED.timestamps,expires_at=EXCLUDED.expires_at`,[`provider:${key}`,[now],now+1000+interval])
            return true
          })
          if (!acquired) await delay(Math.min(interval,250))
        }
        return await operation()
      } finally {
        await db.query('DELETE FROM provider_requests WHERE id=$1',[id])
      }
    },
  }
}
