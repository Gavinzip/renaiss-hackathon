import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Renaiss Tech Hackathon S1',
  '/vote': 'Start Voting | Renaiss Tech Hackathon S1',
  '/rules': 'Voting Rules | Renaiss Tech Hackathon S1',
};

export function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] || 'Page not found | Renaiss Tech Hackathon S1';
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}
