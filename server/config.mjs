import { isAbsolute, resolve } from 'node:path'

import { EVENT } from '../shared/event.mjs'

export const RENAISS_PRODUCTION_ISSUER = 'https://www.renaiss.xyz/api/auth'

function envString(env, name, fallback = '') {
  const value = String(env[name] ?? '').trim()
  return value || fallback
}

function envInteger(env, name, fallback, minimum, maximum) {
  const value = Number(env[name] ?? fallback)
  if (!Number.isFinite(value)) return fallback
  return Math.min(maximum, Math.max(minimum, Math.floor(value)))
}

function envBoolean(env, name, fallback = false) {
  const raw = String(env[name] ?? '').trim().toLowerCase()
  if (!raw) return fallback
  if (['1', 'true', 'yes', 'on'].includes(raw)) return true
  if (['0', 'false', 'no', 'off'].includes(raw)) return false
  throw new Error(`${name} must be a boolean value.`)
}

function normalizeOrigin(value, name) {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash) {
      throw new Error()
    }
    return url.origin
  } catch {
    throw new Error(`${name} must be an http(s) origin without a path.`)
  }
}

function parseTimestamp(value, name) {
  if (!value) return null
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) {
    throw new Error(`${name} must include an explicit UTC offset.`)
  }
  const timestamp = Date.parse(value)
  if (!Number.isFinite(timestamp)) throw new Error(`${name} must be a valid ISO date-time.`)
  return timestamp
}

function assertSecret(secret, production) {
  if (secret.length < 32) {
    const prefix = production ? 'Production requires' : 'Local authentication requires'
    throw new Error(`${prefix} AUTH_SESSION_SECRET with at least 32 characters.`)
  }
}

export function loadConfig(env = process.env, options = {}) {
  const cwd = options.cwd || process.cwd()
  const nodeEnv = envString(env, 'NODE_ENV', 'development')
  const production = nodeEnv === 'production'
  const prelaunchRequested = production && envBoolean(env, 'RENAISS_PRELAUNCH_MODE', true)
  const port = envInteger(env, 'PORT', production ? 8080 : 4174, 1, 65535)
  const host = envString(env, 'HOST', production ? '0.0.0.0' : '127.0.0.1')

  const configuredOrigin = envString(env, 'PUBLIC_APP_ORIGIN')
  if (production && !configuredOrigin) {
    throw new Error('Production requires PUBLIC_APP_ORIGIN.')
  }
  const publicOrigin = normalizeOrigin(
    configuredOrigin || `http://127.0.0.1:${port}`,
    'PUBLIC_APP_ORIGIN',
  )
  if (production && !publicOrigin.startsWith('https://')) {
    throw new Error('Production PUBLIC_APP_ORIGIN must use https.')
  }

  const sessionSecret = envString(env, 'AUTH_SESSION_SECRET')
  assertSecret(sessionSecret, production)

  const configuredDatabasePath = envString(env, 'DATABASE_PATH')
  if (production && !configuredDatabasePath) {
    throw new Error('Production requires an explicit persistent DATABASE_PATH.')
  }
  if (production && !isAbsolute(configuredDatabasePath)) {
    throw new Error('Production DATABASE_PATH must be absolute and point to persistent storage.')
  }
  const databasePath = configuredDatabasePath
    ? resolve(cwd, configuredDatabasePath)
    : resolve(cwd, 'data/hackathon.sqlite')

  const issuer = envString(env, 'RENAISS_ISSUER', RENAISS_PRODUCTION_ISSUER).replace(/\/+$/, '')
  if (issuer !== RENAISS_PRODUCTION_ISSUER) {
    throw new Error(`RENAISS_ISSUER must be ${RENAISS_PRODUCTION_ISSUER}.`)
  }

  const clientId = envString(env, 'RENAISS_CLIENT_ID')
  const clientSecret = envString(env, 'RENAISS_CLIENT_SECRET')
  const ssoConfigured = Boolean(clientId && clientSecret)
  const partialSsoConfiguration = Boolean(clientId) !== Boolean(clientSecret)
  if (production && partialSsoConfiguration) {
    throw new Error('Production requires RENAISS_CLIENT_ID and RENAISS_CLIENT_SECRET.')
  }

  const expectedRedirectUri = `${publicOrigin}/auth/callback`
  const redirectUri = envString(env, 'RENAISS_REDIRECT_URI', expectedRedirectUri)
  if (redirectUri !== expectedRedirectUri) {
    throw new Error(`RENAISS_REDIRECT_URI must exactly equal ${expectedRedirectUri}.`)
  }

  const tokenAuthMethod = envString(env, 'RENAISS_TOKEN_AUTH_METHOD', 'post').toLowerCase()
  if (!['post', 'client_secret_post'].includes(tokenAuthMethod)) {
    throw new Error('RENAISS_TOKEN_AUTH_METHOD must be post.')
  }
  const scope = envString(env, 'RENAISS_SCOPE', 'openid profile email safe x')
  if (!scope.split(/\s+/).includes('openid')) {
    throw new Error('RENAISS_SCOPE must include openid.')
  }

  const votingOpensAt = parseTimestamp(envString(env, 'VOTING_OPENS_AT'), 'VOTING_OPENS_AT')
  const votingClosesAt = parseTimestamp(envString(env, 'VOTING_CLOSES_AT'), 'VOTING_CLOSES_AT')
  const votingWindowConfigured = votingOpensAt !== null && votingClosesAt !== null
  if ((votingOpensAt === null) !== (votingClosesAt === null)) {
    throw new Error('VOTING_OPENS_AT and VOTING_CLOSES_AT must be configured together.')
  }
  if (votingWindowConfigured && votingOpensAt >= votingClosesAt) {
    throw new Error('VOTING_OPENS_AT must be earlier than VOTING_CLOSES_AT.')
  }
  const prelaunchOpensAt = prelaunchRequested
    ? parseTimestamp(
      envString(env, 'PRELAUNCH_VOTING_OPENS_AT', EVENT.voteWindow.prelaunchStartsAt),
      'PRELAUNCH_VOTING_OPENS_AT',
    )
    : null
  const prelaunchMode = prelaunchRequested && (!ssoConfigured || !votingWindowConfigured)
  if (production && !ssoConfigured && !prelaunchMode) {
    throw new Error('Production requires RENAISS_CLIENT_ID and RENAISS_CLIENT_SECRET.')
  }
  if (production && !votingWindowConfigured && !prelaunchMode) {
    throw new Error('Production requires VOTING_OPENS_AT and VOTING_CLOSES_AT.')
  }
  if (prelaunchMode && prelaunchOpensAt === null) {
    throw new Error('Pre-launch requires PRELAUNCH_VOTING_OPENS_AT.')
  }

  return Object.freeze({
    nodeEnv,
    production,
    port,
    host,
    publicOrigin,
    databasePath,
    distDir: resolve(cwd, 'dist'),
    sessionSecret,
    cookieSecure: publicOrigin.startsWith('https://'),
    sessionCookieName: envString(env, 'SESSION_COOKIE_NAME', 'renaiss_hackathon_session'),
    challengeCookieName: envString(env, 'OAUTH_CHALLENGE_COOKIE_NAME', 'renaiss_hackathon_oauth'),
    sessionTtlMs: envInteger(env, 'SESSION_TTL_SECONDS', 7 * 24 * 60 * 60, 300, 30 * 24 * 60 * 60) * 1000,
    challengeTtlMs: envInteger(env, 'OAUTH_CHALLENGE_TTL_SECONDS', 10 * 60, 120, 20 * 60) * 1000,
    oidcTimeoutMs: envInteger(env, 'RENAISS_OIDC_TIMEOUT_MS', 8000, 1000, 30000),
    oidcDiscoveryTtlMs: envInteger(env, 'RENAISS_DISCOVERY_TTL_SECONDS', 300, 30, 3600) * 1000,
    issuer,
    clientId,
    clientSecret,
    ssoConfigured,
    prelaunchMode,
    redirectUri,
    scope,
    votingWindow: Object.freeze({
      configured: votingWindowConfigured,
      prelaunch: prelaunchMode,
      opensAt: votingWindowConfigured ? votingOpensAt : prelaunchOpensAt,
      closesAt: votingClosesAt,
    }),
    resultsPublished: envBoolean(env, 'RESULTS_PUBLISHED', false),
    authStartRateLimit: Object.freeze({
      limit: envInteger(env, 'AUTH_START_RATE_LIMIT', 20, 1, 500),
      windowMs: envInteger(env, 'AUTH_START_RATE_WINDOW_SECONDS', 600, 10, 3600) * 1000,
    }),
    voteRateLimit: Object.freeze({
      limit: envInteger(env, 'VOTE_RATE_LIMIT', 12, 1, 500),
      windowMs: envInteger(env, 'VOTE_RATE_WINDOW_SECONDS', 60, 10, 3600) * 1000,
    }),
  })
}
