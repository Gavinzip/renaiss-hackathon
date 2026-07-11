import { randomBytes, timingSafeEqual } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

import Database from 'better-sqlite3'

import { hmacDigest } from './security.mjs'

function nowMs() {
  return Date.now()
}

function nullableText(value) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || null
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''))
  const rightBuffer = Buffer.from(String(right || ''))
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

function rowToSession(row) {
  if (!row) return null
  return {
    idHash: row.id_hash,
    user: {
      sub: row.user_sub,
      name: row.name,
      picture: row.picture,
      safeWalletAddress: row.safe_wallet_address,
      legacyWalletAddress: row.legacy_wallet_address,
      chainId: row.chain_id,
      twitterUsername: row.twitter_username,
    },
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }
}

export function createDatabase(config) {
  mkdirSync(dirname(config.databasePath), { recursive: true })
  const connection = new Database(config.databasePath, { timeout: 5000 })
  connection.pragma('journal_mode = WAL')
  connection.pragma('synchronous = FULL')
  connection.pragma('busy_timeout = 5000')
  connection.pragma('foreign_keys = ON')

  connection.exec(`
    CREATE TABLE IF NOT EXISTS auth_challenges (
      id_hash TEXT PRIMARY KEY,
      state_hash TEXT NOT NULL,
      code_verifier TEXT NOT NULL,
      nonce TEXT NOT NULL,
      redirect_uri TEXT NOT NULL,
      return_to TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS auth_challenges_expires_at_idx
      ON auth_challenges (expires_at);

    CREATE TABLE IF NOT EXISTS auth_sessions (
      id_hash TEXT PRIMARY KEY,
      user_sub TEXT NOT NULL,
      name TEXT,
      picture TEXT,
      safe_wallet_address TEXT,
      legacy_wallet_address TEXT,
      chain_id TEXT,
      twitter_username TEXT,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS auth_sessions_user_sub_idx
      ON auth_sessions (user_sub);

    CREATE INDEX IF NOT EXISTS auth_sessions_expires_at_idx
      ON auth_sessions (expires_at);
  `)

  const cleanupExpiredChallenges = connection.prepare(
    'DELETE FROM auth_challenges WHERE expires_at <= ?',
  )
  const cleanupExpiredSessions = connection.prepare(
    'DELETE FROM auth_sessions WHERE expires_at <= ?',
  )
  const insertChallenge = connection.prepare(`
    INSERT INTO auth_challenges (
      id_hash, state_hash, code_verifier, nonce, redirect_uri, return_to, created_at, expires_at
    ) VALUES (
      @idHash, @stateHash, @codeVerifier, @nonce, @redirectUri, @returnTo, @createdAt, @expiresAt
    )
  `)
  const selectChallenge = connection.prepare(`
    SELECT id_hash, state_hash, code_verifier, nonce, redirect_uri, return_to, created_at, expires_at
    FROM auth_challenges
    WHERE id_hash = ?
  `)
  const deleteChallenge = connection.prepare('DELETE FROM auth_challenges WHERE id_hash = ?')
  const insertSession = connection.prepare(`
    INSERT INTO auth_sessions (
      id_hash, user_sub, name, picture, safe_wallet_address,
      legacy_wallet_address, chain_id, twitter_username, created_at, expires_at
    ) VALUES (
      @idHash, @sub, @name, @picture, @safeWalletAddress,
      @legacyWalletAddress, @chainId, @twitterUsername, @createdAt, @expiresAt
    )
  `)
  const selectSession = connection.prepare(`
    SELECT id_hash, user_sub, name, picture, safe_wallet_address,
      legacy_wallet_address, chain_id, twitter_username, created_at, expires_at
    FROM auth_sessions
    WHERE id_hash = ?
  `)
  const deleteSession = connection.prepare('DELETE FROM auth_sessions WHERE id_hash = ?')

  function tokenHash(purpose, token) {
    return hmacDigest(config.sessionSecret, `opaque:${purpose}`, token)
  }

  function cleanupExpired(timestamp = nowMs()) {
    cleanupExpiredChallenges.run(timestamp)
    cleanupExpiredSessions.run(timestamp)
  }

  function immediateTransaction(callback) {
    connection.exec('BEGIN IMMEDIATE')
    try {
      const result = callback()
      connection.exec('COMMIT')
      return result
    } catch (error) {
      try {
        connection.exec('ROLLBACK')
      } catch (rollbackError) {
        console.error('[database] rollback failed', rollbackError)
      }
      throw error
    }
  }

  function saveChallenge({ cookieToken, state, codeVerifier, nonce, redirectUri, returnTo }) {
    cleanupExpired()
    const createdAt = nowMs()
    const record = {
      idHash: tokenHash('challenge', cookieToken),
      stateHash: tokenHash('state', state),
      codeVerifier,
      nonce,
      redirectUri,
      returnTo,
      createdAt,
      expiresAt: createdAt + config.challengeTtlMs,
    }
    insertChallenge.run(record)
    return record
  }

  function consumeChallenge(cookieToken, returnedState) {
    if (!cookieToken) return null
    const idHash = tokenHash('challenge', cookieToken)
    return immediateTransaction(() => {
      const row = selectChallenge.get(idHash)
      deleteChallenge.run(idHash)
      if (!row || row.expires_at <= nowMs()) return null
      if (!safeEqual(row.state_hash, tokenHash('state', returnedState))) return null
      return {
        codeVerifier: row.code_verifier,
        nonce: row.nonce,
        redirectUri: row.redirect_uri,
        returnTo: row.return_to,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
      }
    })
  }

  function createSession(user) {
    cleanupExpired()
    const token = randomBytes(32).toString('base64url')
    const createdAt = nowMs()
    const record = {
      idHash: tokenHash('session', token),
      sub: user.sub,
      name: nullableText(user.name),
      picture: nullableText(user.picture),
      safeWalletAddress: nullableText(user.safeWalletAddress),
      legacyWalletAddress: nullableText(user.legacyWalletAddress),
      chainId: nullableText(user.chainId),
      twitterUsername: nullableText(user.twitterUsername),
      createdAt,
      expiresAt: createdAt + config.sessionTtlMs,
    }
    insertSession.run(record)
    return {
      token,
      session: rowToSession(selectSession.get(record.idHash)),
    }
  }

  function readSession(token) {
    if (!token) return null
    const idHash = tokenHash('session', token)
    const row = selectSession.get(idHash)
    if (!row) return null
    if (row.expires_at <= nowMs()) {
      deleteSession.run(idHash)
      return null
    }
    return rowToSession(row)
  }

  function removeSession(token) {
    if (!token) return false
    return deleteSession.run(tokenHash('session', token)).changes > 0
  }

  return {
    connection,
    immediateTransaction,
    cleanupExpired,
    saveChallenge,
    consumeChallenge,
    createSession,
    readSession,
    removeSession,
    close() {
      connection.close()
    },
  }
}
