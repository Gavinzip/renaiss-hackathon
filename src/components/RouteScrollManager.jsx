import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';

export function RouteScrollManager() {
  const { hash, pathname } = useLocation();
  const { locale, t } = useI18n();
  useEffect(() => {
    const titleKeys = { '/': 'meta.homeTitle', '/vote': 'meta.voteTitle', '/rules': 'meta.rulesTitle' };
    document.title = t(titleKeys[pathname] || 'meta.notFoundTitle');
    let frame = 0;
    const timer = window.setTimeout(() => {
      frame = window.requestAnimationFrame(() => {
        if (hash) {
          const target = document.getElementById(decodeURIComponent(hash.slice(1)));
          if (target) {
            target.scrollIntoView({ block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hash, locale, pathname, t]);

  return null;
}
