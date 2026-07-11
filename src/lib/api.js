export class ApiError extends Error {
  constructor(message, { code = 'request_failed', status = 500, payload = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.payload = payload;
  }
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers,
      credentials: 'same-origin',
    });
  } catch {
    throw new ApiError('The voting service could not be reached.', {
      code: 'service_unreachable',
      status: 0,
    });
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new ApiError(payload?.message || friendlyError(payload?.error, response.status), {
      code: payload?.error || 'request_failed',
      status: response.status,
      payload,
    });
  }

  return payload;
}

function friendlyError(code, status) {
  const messages = {
    auth_not_configured: 'Renaiss sign-in is not configured for this environment yet.',
    sso_not_configured: 'Renaiss sign-in is not configured for this environment yet.',
    session_required: 'Sign in with Renaiss before recording your vote.',
    csrf_invalid: 'Your session changed. Refresh the page and try again.',
    origin_not_allowed: 'This voting request came from an unapproved origin.',
    voting_window_not_configured: 'The official voting window has not been configured yet.',
    voting_not_open: 'Voting is not open right now.',
    voting_closed: 'Community voting has closed.',
    project_not_found: 'That project is not in the official submission list.',
    rate_limited: 'Too many requests. Please wait a moment and try again.',
  };
  return messages[code] || `Request failed (${status}).`;
}
