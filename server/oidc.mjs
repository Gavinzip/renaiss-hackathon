import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

import { createRemoteJWKSet, jwtVerify } from 'jose'

import { HttpError } from './http.mjs'

const WALLET_PATTERN = /^0x[a-fA-F0-9]{40}$/
const TWITTER_USERNAME_PATTERN = /^[A-Za-z0-9_]{1,15}$/

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''))
  const rightBuffer = Buffer.from(String(right || ''))
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

function randomToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url')
}

function requireString(value, code) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (!text) throw new HttpError(502, code)
  return text
}

function optionalString(value, maxLength = 512) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text ? text.slice(0, maxLength) : null
}

function normalizeWallet(value, claimName) {
  if (value === null || value === undefined || value === '') return null
  if (typeof value !== 'string' || !WALLET_PATTERN.test(value)) {
    throw new HttpError(502, `${claimName}_invalid`)
  }
  return value.toLowerCase()
}

function normalizePicture(value) {
  const picture = optionalString(value, 2048)
  if (!picture) return null
  try {
    const url = new URL(picture)
    return ['https:', 'http:'].includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}

function normalizeTwitterUsername(value) {
  const username = optionalString(value)?.replace(/^@+/, '') || ''
  return TWITTER_USERNAME_PATTERN.test(username) ? username.toLowerCase() : null
}

function requireHttpsEndpoint(document, field) {
  const value = requireString(document?.[field], `discovery_${field}_missing`)
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') throw new Error()
    return url.toString()
  } catch {
    throw new HttpError(502, `discovery_${field}_invalid`)
  }
}

async function fetchJson(url, options, timeoutMs, failureCode) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    const text = await response.text()
    let payload = null
    try {
      payload = text ? JSON.parse(text) : null
    } catch {
      throw new HttpError(502, `${failureCode}_invalid_json`)
    }
    if (!response.ok) throw new HttpError(502, failureCode)
    return payload
  } catch (error) {
    if (error instanceof HttpError) throw error
    if (error?.name === 'AbortError') throw new HttpError(504, `${failureCode}_timeout`)
    throw new HttpError(502, failureCode)
  } finally {
    clearTimeout(timeout)
  }
}

export function createOidcClient(config) {
  let cachedDiscovery = null
  let cachedAt = 0
  let cachedJwks = null

  async function discover() {
    if (cachedDiscovery && Date.now() - cachedAt < config.oidcDiscoveryTtlMs) {
      return cachedDiscovery
    }

    const document = await fetchJson(
      `${config.issuer}/.well-known/openid-configuration`,
      { headers: { Accept: 'application/json' } },
      config.oidcTimeoutMs,
      'sso_discovery_failed',
    )
    const discoveredIssuer = requireString(document?.issuer, 'discovery_issuer_missing').replace(/\/+$/, '')
    if (discoveredIssuer !== config.issuer) {
      throw new HttpError(502, 'discovery_issuer_mismatch')
    }

    cachedDiscovery = Object.freeze({
      issuer: discoveredIssuer,
      authorizationEndpoint: requireHttpsEndpoint(document, 'authorization_endpoint'),
      tokenEndpoint: requireHttpsEndpoint(document, 'token_endpoint'),
      userinfoEndpoint: requireHttpsEndpoint(document, 'userinfo_endpoint'),
      jwksUri: requireHttpsEndpoint(document, 'jwks_uri'),
    })
    cachedAt = Date.now()
    cachedJwks = createRemoteJWKSet(new URL(cachedDiscovery.jwksUri))
    return cachedDiscovery
  }

  async function createAuthorizationRequest() {
    if (!config.ssoConfigured) throw new HttpError(503, 'sso_not_configured')
    const discovery = await discover()
    const codeVerifier = randomToken(48)
    const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url')
    const challenge = {
      codeVerifier,
      codeChallenge,
      state: randomToken(),
      nonce: randomToken(),
    }
    const authorizeUrl = new URL(discovery.authorizationEndpoint)
    authorizeUrl.searchParams.set('response_type', 'code')
    authorizeUrl.searchParams.set('client_id', config.clientId)
    authorizeUrl.searchParams.set('redirect_uri', config.redirectUri)
    authorizeUrl.searchParams.set('scope', config.scope)
    authorizeUrl.searchParams.set('state', challenge.state)
    authorizeUrl.searchParams.set('nonce', challenge.nonce)
    authorizeUrl.searchParams.set('code_challenge', challenge.codeChallenge)
    authorizeUrl.searchParams.set('code_challenge_method', 'S256')
    authorizeUrl.searchParams.set('prompt', 'consent')
    return { challenge, authorizationUrl: authorizeUrl.toString() }
  }

  async function completeAuthorization({ code, codeVerifier, redirectUri, nonce }) {
    if (!config.ssoConfigured) throw new HttpError(503, 'sso_not_configured')
    const discovery = await discover()
    const token = await fetchJson(
      discovery.tokenEndpoint,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          code_verifier: codeVerifier,
          client_id: config.clientId,
          client_secret: config.clientSecret,
          redirect_uri: redirectUri,
        }),
      },
      config.oidcTimeoutMs,
      'token_exchange_failed',
    )
    const idToken = requireString(token?.id_token, 'id_token_missing')
    const accessToken = requireString(token?.access_token, 'access_token_missing')
    let payload
    try {
      const verification = await jwtVerify(idToken, cachedJwks, {
        issuer: config.issuer,
        audience: config.clientId,
        clockTolerance: 5,
      })
      payload = verification.payload
    } catch {
      throw new HttpError(401, 'id_token_invalid')
    }

    if (!Number.isFinite(payload.exp) || !Number.isFinite(payload.iat)) {
      throw new HttpError(401, 'id_token_time_claims_missing')
    }
    if (Array.isArray(payload.aud) && payload.aud.length > 1 && payload.azp !== config.clientId) {
      throw new HttpError(401, 'id_token_authorized_party_invalid')
    }
    if (!safeEqual(payload.nonce, nonce)) {
      throw new HttpError(401, 'invalid_nonce')
    }
    const subject = requireString(payload.sub, 'identity_subject_missing')
    if (subject.length > 512) throw new HttpError(401, 'identity_subject_invalid')

    const userinfo = await fetchJson(
      discovery.userinfoEndpoint,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
      config.oidcTimeoutMs,
      'userinfo_fetch_failed',
    )
    if (requireString(userinfo?.sub, 'userinfo_subject_missing') !== subject) {
      throw new HttpError(401, 'userinfo_subject_mismatch')
    }

    const claims = {
      ...payload,
      ...userinfo,
      sub: subject,
    }
    return Object.freeze({
      sub: subject,
      name: optionalString(claims.name, 160),
      picture: normalizePicture(claims.picture),
      safeWalletAddress: normalizeWallet(claims.safe_wallet_address, 'safe_wallet_address'),
      legacyWalletAddress: normalizeWallet(claims.legacy_wallet_address, 'legacy_wallet_address'),
      chainId: claims.chain_id === null || claims.chain_id === undefined
        ? null
        : String(claims.chain_id).slice(0, 64),
      twitterUsername: normalizeTwitterUsername(claims.twitter_username),
    })
  }

  return {
    discover,
    createAuthorizationRequest,
    completeAuthorization,
  }
}
