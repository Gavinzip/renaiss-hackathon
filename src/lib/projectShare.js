export function projectShareUrl(projectId) {
  const url = new URL('/vote', window.location.origin);
  url.searchParams.set('project', projectId);
  url.hash = 'projects';
  return url.toString();
}
