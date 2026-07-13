const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || '';
const VALID_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i.test(MEASUREMENT_ID);
const ELIGIBLE_EVENT_SESSION_KEY = 'renaiss-hackathon-ga-sbt-eligible-event';

let initialized = false;

function send(...args) {
  if (!VALID_MEASUREMENT_ID || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag(...args);
}

export function initializeAnalytics() {
  if (!VALID_MEASUREMENT_ID || initialized || typeof document === 'undefined') return;

  initialized = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.renaissAnalytics = 'true';
  document.head.append(script);

  send('js', new Date());
  send('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView({ path, title }) {
  if (!VALID_MEASUREMENT_ID) return;

  send('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

// The event is intentionally anonymous. It records only that this browser session
// passed the server-side SBT gate, so GA can aggregate Country by this event.
export function trackEligibleSbtVoter() {
  if (!VALID_MEASUREMENT_ID || typeof window === 'undefined') return;
  if (window.sessionStorage.getItem(ELIGIBLE_EVENT_SESSION_KEY)) return;

  window.sessionStorage.setItem(ELIGIBLE_EVENT_SESSION_KEY, '1');
  send('event', 'sbt_eligible_vote_access');
}

export const analyticsConfigured = VALID_MEASUREMENT_ID;
