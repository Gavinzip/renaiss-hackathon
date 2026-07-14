import { randomBytes, timingSafeEqual } from 'node:crypto'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import compression from 'compression'
import express from 'express'
import helmet from 'helmet'

import { isAdministrator, requireAdministrator } from './admin-access.mjs'
import { loadConfig } from './config.mjs'
import { createDatabase } from './database.mjs'
import { loadLocalEnv } from './env-loader.mjs'
import {
  HttpError,
  asyncRoute,
  errorHandler,
  notFoundHandler,
  sanitizeLogMessage,
  sendNoStore,
} from './http.mjs'
import { createOidcClient } from './oidc.mjs'
import {
  addAuthResult,
  appendCookie,
  applySecurityHeaders,
  clearCookie,
  clientIp,
  createMemoryRateLimiter,
  csrfTokenForSession,
  parseCookies,
  requireUnsafeRequestSecurity,
  safeReturnTo,
  serializeCookie,
  signCookieValue,
  verifyCookieValue,
} from './security.mjs'
import { createVoteStore } from './vote-store.mjs'
import { createSbtEligibilityService } from './sbt-eligibility.mjs'
import { runDatabaseBackup, runRepositoryCheck } from './backup/runner.mjs'

function displayUser(config, session) {
  if (!session) return null
  return {
    name: session.user.name,
    picture: session.user.picture,
    twitterUsername: session.user.twitterUsername,
    safeWalletAddress: session.user.safeWalletAddress,
    isAdministrator: isAdministrator(config, session),
  }
}

function requestIdFrom(request) {
  const headerValue = String(request.get('idempotency-key') || '').trim()
  const bodyValue = String(request.body?.requestId || '').trim()
  if (headerValue && bodyValue && headerValue !== bodyValue) {
    throw new HttpError(400, 'request_id_mismatch', 'Idempotency-Key and requestId must match.')
  }
  return headerValue || bodyValue
}

function setApiNoStore(request, response, next) {
  response.set('Cache-Control', 'no-store')
  next()
}

function secretsMatch(expected, actual) {
  const expectedBuffer = Buffer.from(String(expected || ''))
  const actualBuffer = Buffer.from(String(actual || ''))
  return expectedBuffer.length > 0
    && expectedBuffer.length === actualBuffer.length
    && timingSafeEqual(expectedBuffer, actualBuffer)
}

function setStaticCacheHeaders(response, filePath) {
  if (filePath.endsWith('.html')) {
    response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    return
  }
  if (/-[A-Za-z0-9_]{8,}\.[^.]+$/.test(filePath)) {
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return
  }
  response.setHeader('Cache-Control', 'public, max-age=3600')
}

export function createApplication(options = {}) {
  if (!options.config) loadLocalEnv()
  const config = options.config || loadConfig()
  const database = options.database || createDatabase(config)
  const oidc = options.oidc || createOidcClient(config)
  const voteStore = options.voteStore || createVoteStore({ database, config })
  const sbtEligibility = options.sbtEligibility || createSbtEligibilityService({ config })
  const rateLimiter = options.rateLimiter || createMemoryRateLimiter()
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: config.production ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
  }))
  app.use(compression())
  app.use(applySecurityHeaders)
  app.use('/api', setApiNoStore)
  app.use('/auth', setApiNoStore)
  app.use('/api', express.json({ limit: '16kb', type: 'application/json' }))

  function signedCookieToken(request, name, purpose) {
    const signedValue = parseCookies(request.headers.cookie).get(name)
    return verifyCookieValue(config.sessionSecret, purpose, signedValue)
  }

  function readSession(request) {
    return database.readSession(
      signedCookieToken(request, config.sessionCookieName, 'session'),
    )
  }

  function requireSession(request) {
    const session = readSession(request)
    if (!session) throw new HttpError(401, 'session_required', 'Sign in with Renaiss to vote.')
    return session
  }

  function requireVoteWriteSecurity(request, session) {
    requireUnsafeRequestSecurity(config, session, request)
    rateLimiter.consume([
      {
        scope: 'vote_subject',
        key: session.user.sub,
        ...config.voteRateLimit,
      },
      {
        scope: 'vote_ip',
        key: clientIp(request),
        limit: config.voteRateLimit.limit * 2,
        windowMs: config.voteRateLimit.windowMs,
      },
    ])
  }

  function requireBackupTrigger(request) {
    if (!config.backup.configured) {
      throw new HttpError(503, 'backup_not_configured', 'Offsite backup is not configured.')
    }
    const authorization = String(request.get('authorization') || '')
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length).trim()
      : ''
    if (!secretsMatch(config.backup.triggerSecret, token)) {
      throw new HttpError(401, 'backup_trigger_unauthorized', 'Backup trigger is not authorized.')
    }
    rateLimiter.consume({
      scope: 'backup_trigger',
      key: 'service',
      limit: 1,
      windowMs: 10 * 60 * 1000,
    })
  }

  app.get('/healthz', (_request, response) => {
    sendNoStore(response, 200, {
      ok: true,
      service: 'renaiss-hackathon-vote',
      backup: { state: config.backup.state },
      checkedAt: new Date().toISOString(),
    })
  })

  app.get('/api/session', (request, response) => {
    const session = readSession(request)
    const publicVoteState = session
      ? voteStore.getPublicState(session.user.sub)
      : { vote: null, event: voteStore.getPublicEvent() }
    sendNoStore(response, 200, {
      authenticated: Boolean(session),
      authConfigured: config.ssoConfigured,
      user: displayUser(config, session),
      csrfToken: session ? csrfTokenForSession(config.sessionSecret, session) : null,
      vote: publicVoteState.vote,
      event: publicVoteState.event,
    })
  })

  app.get('/api/auth/renaiss/start', asyncRoute(async (request, response) => {
    rateLimiter.consume({
      scope: 'auth_start_ip',
      key: clientIp(request),
      ...config.authStartRateLimit,
    })
    if (!config.ssoConfigured) throw new HttpError(503, 'sso_not_configured')

    const returnTo = safeReturnTo(request.query.returnTo || request.query.return_to)
    const cookieToken = cryptoRandomToken()
    const { challenge, authorizationUrl } = await oidc.createAuthorizationRequest()
    database.saveChallenge({
      cookieToken,
      state: challenge.state,
      codeVerifier: challenge.codeVerifier,
      nonce: challenge.nonce,
      redirectUri: config.redirectUri,
      returnTo,
    })
    appendCookie(response, serializeCookie(
      config.challengeCookieName,
      signCookieValue(config.sessionSecret, 'challenge', cookieToken),
      {
        maxAge: Math.floor(config.challengeTtlMs / 1000),
        path: '/auth/callback',
        httpOnly: true,
        secure: config.cookieSecure,
        sameSite: 'Lax',
      },
    ))
    response.set('Cache-Control', 'no-store')
    response.redirect(302, authorizationUrl)
  }))

  app.get('/auth/callback', asyncRoute(async (request, response) => {
    let challenge = null
    clearCookie(response, config.challengeCookieName, {
      path: '/auth/callback',
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'Lax',
    })

    try {
      const cookieToken = signedCookieToken(
        request,
        config.challengeCookieName,
        'challenge',
      )
      challenge = database.consumeChallenge(cookieToken, request.query.state)
      if (!challenge) throw new HttpError(401, 'invalid_oauth_state')
      if (request.query.error) throw new HttpError(401, 'sso_authorization_failed')

      const code = String(request.query.code || '').trim()
      if (!code) throw new HttpError(401, 'authorization_code_missing')
      const identity = await oidc.completeAuthorization({
        code,
        codeVerifier: challenge.codeVerifier,
        redirectUri: challenge.redirectUri,
        nonce: challenge.nonce,
      })
      const { token } = database.createSession(identity)
      appendCookie(response, serializeCookie(
        config.sessionCookieName,
        signCookieValue(config.sessionSecret, 'session', token),
        {
          maxAge: Math.floor(config.sessionTtlMs / 1000),
          path: '/',
          httpOnly: true,
          secure: config.cookieSecure,
          sameSite: 'Lax',
        },
      ))
      response.redirect(302, addAuthResult(challenge.returnTo, 'success'))
    } catch (error) {
      const code = error instanceof HttpError ? error.code : 'sso_callback_failed'
      console.warn('[auth] Renaiss callback failed', {
        code,
        message: sanitizeLogMessage(error),
      })
      response.redirect(302, addAuthResult(challenge?.returnTo || '/', 'error', code))
    }
  }))

  app.post('/api/auth/logout', (request, response) => {
    const session = requireSession(request)
    requireUnsafeRequestSecurity(config, session, request)
    const token = signedCookieToken(request, config.sessionCookieName, 'session')
    database.removeSession(token)
    clearCookie(response, config.sessionCookieName, {
      path: '/',
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'Lax',
    })
    response.set('Cache-Control', 'no-store')
    response.status(204).end()
  })

  app.get('/api/vote', (request, response) => {
    const session = requireSession(request)
    sendNoStore(response, 200, voteStore.getPublicState(session.user.sub))
  })

  app.get('/api/vote/eligibility', asyncRoute(async (request, response) => {
    const session = requireSession(request)
    sendNoStore(response, 200, await sbtEligibility.read(session))
  }))

  app.get('/api/admin/votes', (request, response) => {
    const session = requireSession(request)
    requireAdministrator(config, session)
    sendNoStore(response, 200, voteStore.getAdminResults())
  })

  app.post('/api/vote', asyncRoute(async (request, response) => {
    const session = requireSession(request)
    requireVoteWriteSecurity(request, session)
    const eligibility = await sbtEligibility.requireEligible(session)
    const result = voteStore.castVote({
      voterSub: session.user.sub,
      projectId: request.body?.projectId,
      requestId: requestIdFrom(request),
    })
    sendNoStore(response, 200, { ...result, eligibility })
  }))

  app.post('/api/internal/backup', asyncRoute(async (request, response) => {
    requireBackupTrigger(request)
    try {
      const result = await runDatabaseBackup(config)
      sendNoStore(response, 200, { ok: true, ...result })
    } catch (error) {
      if (error?.code === 'backup_in_progress') {
        throw new HttpError(409, 'backup_in_progress', 'A backup is already running.')
      }
      console.error('[backup] offsite backup failed', {
        message: sanitizeLogMessage(error),
        command: sanitizeLogMessage(error?.command),
        detail: sanitizeLogMessage(error?.stderr, 1200),
      })
      throw new HttpError(502, 'backup_failed')
    }
  }))

  app.post('/api/internal/backup/check', asyncRoute(async (request, response) => {
    requireBackupTrigger(request)
    try {
      const result = await runRepositoryCheck(config)
      sendNoStore(response, 200, { ok: true, ...result })
    } catch (error) {
      if (error?.code === 'backup_in_progress') {
        throw new HttpError(409, 'backup_in_progress', 'A backup is already running.')
      }
      console.error('[backup] repository check failed', {
        message: sanitizeLogMessage(error),
        command: sanitizeLogMessage(error?.command),
        detail: sanitizeLogMessage(error?.stderr, 1200),
      })
      throw new HttpError(502, 'backup_check_failed')
    }
  }))

  app.use('/api', notFoundHandler)
  app.use('/auth', notFoundHandler)

  const indexPath = resolve(config.distDir, 'index.html')
  if (existsSync(config.distDir)) {
    app.use(express.static(config.distDir, {
      index: false,
      setHeaders: setStaticCacheHeaders,
    }))
  }
  app.use((request, response, next) => {
    if (request.method !== 'GET' || !request.accepts('html') || !existsSync(indexPath)) {
      next()
      return
    }
    response.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.sendFile(indexPath)
  })
  app.use(notFoundHandler)
  app.use(errorHandler)

  return {
    app,
    config,
    database,
    voteStore,
    sbtEligibility,
  }
}

function cryptoRandomToken() {
  return randomBytes(32).toString('base64url')
}

export function startServer(options = {}) {
  const application = createApplication(options)
  const server = application.app.listen(
    application.config.port,
    application.config.host,
    () => {
      console.log(`renaiss-hackathon server listening on http://${application.config.host}:${application.config.port}`)
    },
  )

  let closing = false
  const close = () => {
    if (closing) return
    closing = true
    server.close(() => {
      application.database.close()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10000).unref()
  }
  process.once('SIGTERM', close)
  process.once('SIGINT', close)
  return { ...application, server, close }
}

const entryUrl = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href
  : ''
if (import.meta.url === entryUrl) startServer()
