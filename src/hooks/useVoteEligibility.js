import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE_STATE = Object.freeze({
  status: 'idle',
  eligibility: null,
  error: null,
});

/**
 * Maintains one authoritative eligibility result for the Vote route. The
 * automatic post-login check and any immediate confirmation share one request.
 */
export function useVoteEligibility({ enabled, authenticated, checkEligibility }) {
  const [state, setState] = useState(IDLE_STATE);
  const requestVersion = useRef(0);
  const pendingRequest = useRef(null);

  const refresh = useCallback(async () => {
    if (!enabled || !authenticated) return null;
    if (pendingRequest.current) return pendingRequest.current;

    const version = ++requestVersion.current;
    setState((current) => ({
      status: 'checking',
      eligibility: current.eligibility,
      error: null,
    }));

    let request;
    request = checkEligibility()
      .then((eligibility) => {
        if (requestVersion.current === version) {
          setState({ status: eligibility.status, eligibility, error: null });
        }
        return eligibility;
      })
      .catch((error) => {
        if (requestVersion.current === version) {
          setState({ status: 'error', eligibility: null, error });
        }
        throw error;
      })
      .finally(() => {
        if (pendingRequest.current === request) pendingRequest.current = null;
      });
    pendingRequest.current = request;
    return request;
  }, [authenticated, checkEligibility, enabled]);

  useEffect(() => {
    if (!enabled || !authenticated) {
      requestVersion.current += 1;
      pendingRequest.current = null;
      setState(IDLE_STATE);
      return undefined;
    }

    refresh().catch(() => undefined);
    return undefined;
  }, [authenticated, enabled, refresh]);

  return { ...state, refresh };
}
