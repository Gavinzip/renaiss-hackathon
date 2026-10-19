import { HttpError } from './http.mjs'
import { hmacDigest } from './security.mjs'

export function createDatabaseRateLimiter(database) {
  const db = database.connection
  return {
    async consume(rawRules) {
      const now = Date.now()
      const rules = (Array.isArray(rawRules) ? rawRules : [rawRules]).filter(Boolean).map((rule) => ({
        key: hmacDigest('rate-limit:v1', String(rule.scope || 'request').slice(0,80), String(rule.key || 'anonymous').slice(0,160)),
        limit: Math.max(1, Math.floor(Number(rule.limit || 1))),
        windowMs: Math.max(1000, Math.floor(Number(rule.windowMs || 1000))),
      }))
      await db.transaction(async () => {
        await db.lock(rules.map((rule) => `rate:${rule.key}`))
        const updates = []
        for (const rule of rules) {
          const { rows: [row] } = await db.query('SELECT timestamps FROM rate_limits WHERE key=$1', [rule.key])
          const fresh = (row?.timestamps || []).map(Number).filter((t) => t > now-rule.windowMs)
          if (fresh.length >= rule.limit) {
            const retryAfter = Math.max(1, Math.ceil((Math.min(...fresh)+rule.windowMs-now)/1000))
            throw new HttpError(429, 'rate_limited', 'Too many requests. Try again later.', { headers: { 'Retry-After': retryAfter } })
          }
          updates.push({ ...rule, timestamps: [...fresh,now] })
        }
        await db.query('DELETE FROM rate_limits WHERE expires_at <= $1', [now])
        for (const rule of updates) {
          await db.query(`INSERT INTO rate_limits (key,timestamps,expires_at) VALUES ($1,$2,$3)
            ON CONFLICT (key) DO UPDATE SET timestamps=EXCLUDED.timestamps,expires_at=EXCLUDED.expires_at`,
          [rule.key,rule.timestamps,now+rule.windowMs])
        }
      })
    },
  }
}
