import { Link } from 'react-router-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { staticAssetUrl } from '../lib/staticAssets.js';

export function BrandLockup({ compact = false }) {
  const { t } = useI18n();
  return (
    <Link className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`} to="/" aria-label={t('brand.home')}>
      <img src={staticAssetUrl('/assets/renaiss-lab-mark.webp')} alt="" width="44" height="44" />
      <span className="brand-lockup__name">
        renaiss<span className="brand-lockup__lab">lab</span>
      </span>
    </Link>
  );
}
