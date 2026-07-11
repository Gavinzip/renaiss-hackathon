import { useCallback, useEffect, useState } from 'react';

import { apiRequest } from '../lib/api.js';

const EMPTY_SESSION = {
  loading: true,
  authenticated: false,
  authConfigured: false,
  user: null,
  csrfToken: '',
  vote: null,
  event: null,
  error: null,
};

export function useSession() {
  const [session, setSession] = useState(EMPTY_SESSION);

  const refresh = useCallback(async () => {
    try {
      const payload = await apiRequest('/api/session');
      setSession({
        ...EMPTY_SESSION,
        ...payload,
        loading: false,
        error: null,
      });
      return payload;
    } catch (error) {
      setSession((current) => ({
        ...current,
        loading: false,
        error,
      }));
      return null;
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const recordVote = useCallback(async (projectId) => {
    const requestId = crypto.randomUUID();
    const payload = await apiRequest('/api/vote', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': session.csrfToken,
      },
      body: JSON.stringify({ projectId, requestId }),
    });
    setSession((current) => ({ ...current, ...payload, vote: payload.vote }));
    return payload;
  }, [session.csrfToken]);

  const clearVote = useCallback(async () => {
    const requestId = crypto.randomUUID();
    const payload = await apiRequest('/api/vote', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': session.csrfToken,
      },
      body: JSON.stringify({ requestId }),
    });
    setSession((current) => ({ ...current, ...payload, vote: payload.vote || null }));
    return payload;
  }, [session.csrfToken]);

  const logout = useCallback(async () => {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': session.csrfToken,
      },
    });
    await refresh();
  }, [refresh, session.csrfToken]);

  return { session, refresh, recordVote, clearVote, logout };
}
