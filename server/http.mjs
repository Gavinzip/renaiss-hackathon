export class HttpError extends Error {
  constructor(status, code, message = code, options = {}) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
    this.headers = options.headers || null
  }
}

export function asyncRoute(handler) {
  return function wrappedAsyncRoute(request, response, next) {
    Promise.resolve(handler(request, response, next)).catch(next)
  }
}

export function sendNoStore(response, status, payload) {
  response.set('Cache-Control', 'no-store')
  return response.status(status).json(payload)
}

export function requireMethod(request, method) {
  if (request.method !== method) {
    throw new HttpError(405, 'method_not_allowed', `${method} required.`)
  }
}

export function notFoundHandler(request, response) {
  sendNoStore(response, 404, {
    error: 'not_found',
    message: 'Route not found.',
  })
}

export function errorHandler(error, request, response, _next) {
  if (response.headersSent) {
    _next(error)
    return
  }

  const malformedJson = error?.type === 'entity.parse.failed'
  const requestTooLarge = error?.type === 'entity.too.large'
  const status = malformedJson
    ? 400
    : requestTooLarge
      ? 413
      : error instanceof HttpError
        ? error.status
        : 500
  const code = malformedJson
    ? 'invalid_json'
    : requestTooLarge
      ? 'request_too_large'
      : error instanceof HttpError
        ? error.code
        : 'server_error'
  const message = malformedJson
    ? 'Request body must be valid JSON.'
    : requestTooLarge
      ? 'Request body is too large.'
      : error instanceof HttpError && status < 500
        ? error.message
        : 'The server could not complete this request.'

  if (error instanceof HttpError && error.headers) {
    for (const [name, value] of Object.entries(error.headers)) {
      response.set(name, String(value))
    }
  }

  if (status >= 500) {
    console.error('[server] request failed', {
      code,
      method: request.method,
      pathname: request.path,
      message: sanitizeLogMessage(error),
    })
  }

  sendNoStore(response, status, {
    error: code,
    message,
  })
}

export function sanitizeLogMessage(error) {
  return String(error instanceof Error ? error.message : error || 'Unknown error')
    .replace(/[A-Za-z0-9_-]{48,}/g, '[redacted]')
    .slice(0, 240)
}
