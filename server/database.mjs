import { randomBytes, timingSafeEqual } from 'node:crypto'
import { createPostgres } from './postgres.mjs'
import { hmacDigest } from './security.mjs'

const nullableText = (value) => (typeof value === 'string' ? value.trim() : '') || null
function safeEqual(left, right) {
  const a = Buffer.from(String(left || '')), b = Buffer.from(String(right || ''))
  return a.length === b.length && timingSafeEqual(a, b)
}
function rowToSession(row) {
  if (!row) return null
  return {
    idHash: row.id_hash,
    user: { sub: row.user_sub, name: row.name, picture: row.picture,
      safeWalletAddress: row.safe_wallet_address, legacyWalletAddress: row.legacy_wallet_address,
      chainId: row.chain_id, twitterUsername: row.twitter_username },
    createdAt: Number(row.created_at), expiresAt: Number(row.expires_at),
  }
}
export function createDatabase(config) {
  const connection = createPostgres(config.databaseUrl)
  const tokenHash = (purpose, token) => hmacDigest(config.sessionSecret, `opaque:${purpose}`, token)
  async function cleanupExpired(timestamp = Date.now()) {
    await connection.query('DELETE FROM auth_challenges WHERE expires_at <= $1', [timestamp])
    await connection.query('DELETE FROM auth_sessions WHERE expires_at <= $1', [timestamp])
  }
  async function saveChallenge({ cookieToken, state, codeVerifier, nonce, redirectUri, returnTo }) {
    const createdAt = Date.now(), expiresAt = createdAt + config.challengeTtlMs
    await connection.transaction(async () => {
      await cleanupExpired(createdAt)
      await connection.query(`INSERT INTO auth_challenges
        (id_hash,state_hash,code_verifier,nonce,redirect_uri,return_to,created_at,expires_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [tokenHash('challenge', cookieToken),tokenHash('state', state),codeVerifier,nonce,redirectUri,returnTo,createdAt,expiresAt])
    })
    return { createdAt, expiresAt }
  }
  async function consumeChallenge(cookieToken, returnedState) {
    if (!cookieToken) return null
    // DELETE RETURNING atomically consumes even expired or incorrect-state challenges.
    const { rows: [row] } = await connection.query('DELETE FROM auth_challenges WHERE id_hash = $1 RETURNING *', [tokenHash('challenge', cookieToken)])
    if (!row || Number(row.expires_at) <= Date.now() || !safeEqual(row.state_hash, tokenHash('state', returnedState))) return null
    return { codeVerifier: row.code_verifier, nonce: row.nonce, redirectUri: row.redirect_uri,
      returnTo: row.return_to, createdAt: Number(row.created_at), expiresAt: Number(row.expires_at) }
  }
  async function createSession(user) {
    const token = randomBytes(32).toString('base64url'), createdAt = Date.now()
    const session = await connection.transaction(async () => {
      await cleanupExpired(createdAt)
      const { rows: [row] } = await connection.query(`INSERT INTO auth_sessions
        (id_hash,user_sub,name,picture,safe_wallet_address,legacy_wallet_address,chain_id,twitter_username,created_at,expires_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [tokenHash('session',token),user.sub,nullableText(user.name),nullableText(user.picture),
        nullableText(user.safeWalletAddress),nullableText(user.legacyWalletAddress),nullableText(user.chainId),
        nullableText(user.twitterUsername),createdAt,createdAt+config.sessionTtlMs])
      return rowToSession(row)
    })
    return { token, session }
  }
  async function readSession(token) {
    if (!token) return null
    const idHash = tokenHash('session',token)
    const { rows: [row] } = await connection.query('SELECT * FROM auth_sessions WHERE id_hash = $1', [idHash])
    if (!row) return null
    if (Number(row.expires_at) <= Date.now()) {
      await connection.query('DELETE FROM auth_sessions WHERE id_hash = $1 AND expires_at <= $2', [idHash,Date.now()])
      return null
    }
    return rowToSession(row)
  }
  async function removeSession(token) {
    if (!token) return false
    return (await connection.query('DELETE FROM auth_sessions WHERE id_hash = $1', [tokenHash('session',token)])).rowCount > 0
  }
  return { connection, cleanupExpired, saveChallenge, consumeChallenge, createSession, readSession, removeSession,
    transaction: connection.transaction, close: connection.close }
}
