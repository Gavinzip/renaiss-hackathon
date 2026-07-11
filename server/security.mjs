import { createHmac, timingSafeEqual } from 'node:crypto'

import { HttpError } from './http.mjs'

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''))
  const rightBuffer = Buffer.from(String(right || ''))
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function hmacDigest(secret, purpose, value, encoding = 'hex') {
  return createHmac('sha256', secret)
    .update(`${purpose}:`)
    .update(String(value || ''))
    .digest(encoding)
}

export function signCookieValue(secret, purpose, token) {
  const signature = hmacDigest(secret, `cookie:${purpose}`, token, 'base64url')
  return `${token}.${signature}`
}

export function verifyCookieValue(secret, purpose, signedValue) {
  const value = String(signedValue || '')
  const separator = value.lastIndexOf('.')
  if (separator <= 0) return ''
  const token = value.slice(0, separator)
  const signature = value.slice(separator + 1)
  const expected = hmacDigest(secret, `cookie:${purpose}`, token, 'base64url')
  return safeEqual(signature, expected) ? token : ''
}

export function parseCookies(header = '') {
  const cookies = new Map()
  for (const part of String(header || '').split(';')) {
    const separator = part.indexOf('=')
    if (separator <= 0) continue
    const name = part.slice(0, separator).trim()
    const value = part.slice(separator + 1).trim()
    if (!name) continue
    try {
      cookies.set(name, decodeURIComponent(value))
    } catch {
      cookies.set(name, value)
    }
  }
  return cookies
}

export function serializeCookie(name, value, options = {}) {
  const segments = [`${name}=${encodeURIComponent(value)}`]
  if (options.maxAge !== undefined) {
    segments.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`)
  }
  if (options.maxAge === 0) {
    segments.push('Expires=Thu, 01 Jan 1970 00:00:00 GMT')
  }
  segments.push(`Path=${options.path || '/'}`)
  if (options.httpOnly !== false) segments.push('HttpOnly')
  if (options.secure) segments.push('Secure')
  segments.push(`SameSite=${options.sameSite || 'Lax'}`)
  return segments.join('; ')
}

export function appendCookie(response, cookie) {
  response.append('Set-Cookie', cookie)
}

export function clearCookie(response, name, options = {}) {
  appendCookie(response, serializeCookie(name, '', {
    ...options,
    maxAge: 0,
  }))
}

export function csrfTokenForSession(secret, session) {
  if (!session?.idHash) return ''
  return hmacDigest(secret, 'csrf:v1', session.idHash, 'base64url')
}

export function verifyCsrfRequest(secret, session, request) {
  const expected = csrfTokenForSession(secret, session)
  const actual = String(request.get('x-csrf-token') || request.get('x-xsrf-token') || '').trim()
  return Boolean(expected && actual && safeEqual(actual, expected))
}

export function requireUnsafeRequestSecurity(config, session, request) {
  const origin = normalizeOrigin(request.get('origin'))
  if (!origin || origin !== config.publicOrigin) {
    throw new HttpError(403, 'origin_not_allowed', 'Request origin is not allowed.')
  }
  if (!session || !verifyCsrfRequest(config.sessionSecret, session, request)) {
    throw new HttpError(403, 'csrf_invalid', 'A valid CSRF token is required.')
  }
}

export function safeReturnTo(value) {
  const raw = String(value || '').trim()
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/'
  try {
    const parsed = new URL(raw, 'https://renaiss.local')
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return '/'
  }
}

export function addAuthResult(returnTo, status, reason = '') {
  const url = new URL(safeReturnTo(returnTo), 'https://renaiss.local')
  url.searchParams.set('auth', status)
  if (reason) url.searchParams.set('reason', reason)
  return `${url.pathname}${url.search}${url.hash}`
}

function normalizeOrigin(value) {
  try {
    return new URL(String(value || '')).origin
  } catch {
    return ''
  }
}

export function clientIp(request) {
  return String(request.ip || request.socket?.remoteAddress || 'unknown').slice(0, 96)
}

export function createMemoryRateLimiter({ maxBuckets = 10000 } = {}) {
  const buckets = new Map()
  let checks = 0

  function prune(key, now, windowMs) {
    const fresh = (buckets.get(key) || []).filter((timestamp) => timestamp > now - windowMs)
    if (fresh.length) buckets.set(key, fresh)
    else buckets.delete(key)
    return fresh
  }

  function trimBuckets() {
    while (buckets.size > maxBuckets) {
      const firstKey = buckets.keys().next().value
      if (firstKey === undefined) return
      buckets.delete(firstKey)
    }
  }

  return {
    consume(rawRules) {
      const now = Date.now()
      const rules = (Array.isArray(rawRules) ? rawRules : [rawRules])
        .filter(Boolean)
        .map((rule) => ({
          key: `${String(rule.scope || 'request').slice(0, 80)}:${String(rule.key || 'anonymous').slice(0, 160)}`,
          scope: String(rule.scope || 'request'),
          limit: Math.max(1, Math.floor(Number(rule.limit || 1))),
          windowMs: Math.max(1000, Math.floor(Number(rule.windowMs || 1000))),
        }))

      const current = rules.map((rule) => ({
        rule,
        timestamps: prune(rule.key, now, rule.windowMs),
      }))
      const blocked = current.find(({ rule, timestamps }) => timestamps.length >= rule.limit)
      if (blocked) {
        const oldest = Math.min(...blocked.timestamps)
        const retryAfter = Math.max(1, Math.ceil((oldest + blocked.rule.windowMs - now) / 1000))
        throw new HttpError(429, 'rate_limited', 'Too many requests. Try again later.', {
          headers: { 'Retry-After': retryAfter },
        })
      }

      for (const { rule, timestamps } of current) {
        buckets.set(rule.key, [...timestamps, now])
      }
      checks += 1
      if (checks % 200 === 0) trimBuckets()
    },
  }
}

export function applySecurityHeaders(_request, response, next) {
  response.set({
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  })
  next()
}
