import { AsyncLocalStorage } from 'node:async_hooks'
import pg from 'pg'

export function createPostgres(connectionString) {
  if (!connectionString) throw new Error('DATABASE_URL is required.')
  const pool = new pg.Pool({ connectionString, max: 4, idleTimeoutMillis: 10000, connectionTimeoutMillis: 15000 })
  const context = new AsyncLocalStorage()
  pool.on('error', (error) => console.error('[database] idle connection failed', { code: error.code }))
  async function transaction(callback, { readOnly = false } = {}) {
    if (context.getStore()) return callback()
    const client = await pool.connect()
    try {
      await client.query(readOnly ? 'BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY' : 'BEGIN')
      await client.query('SET LOCAL search_path TO public')
      const result = await context.run(client, callback)
      await client.query('COMMIT')
      return result
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {})
      throw error
    } finally { client.release() }
  }
  async function query(text, values = []) {
    const client = context.getStore()
    if (client) return client.query(text, values)
    return transaction(() => query(text, values))
  }
  async function lock(keys) {
    if (!context.getStore()) throw new Error('Database locks require a transaction.')
    for (const key of [...new Set(keys)].sort()) {
      await query('SELECT pg_advisory_xact_lock(hashtextextended($1, 0))', [key])
    }
  }
  return { query, transaction, lock, close: () => pool.end() }
}
