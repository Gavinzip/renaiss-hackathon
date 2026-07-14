import { staticAssetUrl } from './staticAssets.js';

const PRELOAD_CONCURRENCY = 3;
const IDLE_TIMEOUT_MS = 1800;
const pendingCoverUrls = [];
const queuedCoverUrls = new Set();
let activeRequests = 0;
let idleHandle = null;

export function warmProjectCoverCache(projects) {
  if (shouldSkipWarmup()) return;

  const coverUrls = [...new Set(
    projects
      .map((project) => project.coverUrl)
      .filter(Boolean)
      .map((coverUrl) => staticAssetUrl(coverUrl)),
  )];

  for (const url of coverUrls) {
    if (queuedCoverUrls.has(url)) continue;
    queuedCoverUrls.add(url);
    pendingCoverUrls.push(url);
  }

  scheduleQueue();
}

function scheduleQueue() {
  if (!pendingCoverUrls.length || activeRequests >= PRELOAD_CONCURRENCY || idleHandle !== null) return;

  if (typeof window.requestIdleCallback === 'function') {
    idleHandle = window.requestIdleCallback(runQueue, { timeout: IDLE_TIMEOUT_MS });
    return;
  }

  idleHandle = window.setTimeout(() => runQueue(), IDLE_TIMEOUT_MS);
}

function runQueue(deadline) {
  idleHandle = null;

  while (activeRequests < PRELOAD_CONCURRENCY && pendingCoverUrls.length && canUseIdleTime(deadline)) {
    const image = new Image();
    const url = pendingCoverUrls.shift();
    activeRequests += 1;

    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.onload = image.onerror = () => {
      activeRequests -= 1;
      scheduleQueue();
    };
    image.src = url;
  }

  scheduleQueue();
}

function canUseIdleTime(deadline) {
  return !deadline || deadline.didTimeout || deadline.timeRemaining() > 4;
}

function shouldSkipWarmup() {
  const connection = navigator.connection;
  return connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
}
