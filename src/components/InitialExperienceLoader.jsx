import { useI18n } from '../i18n/I18nProvider.jsx';
import initialLoaderLogoUrl from 'virtual:initial-loader-logo';

import './InitialExperienceLoader.css';

export function InitialExperienceLoader({ isLeaving }) {
  const { t } = useI18n();

  return (
    <div
      className={`initial-experience-loader${isLeaving ? ' initial-experience-loader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={!isLeaving}
    >
      <div className="initial-experience-loader__ambient" aria-hidden="true" />
      <div className="initial-experience-loader__mark" aria-hidden="true">
        <span className="initial-experience-loader__orbit initial-experience-loader__orbit--outer" />
        <span className="initial-experience-loader__orbit initial-experience-loader__orbit--inner" />
        <img
          className="initial-experience-loader__logo"
          src={initialLoaderLogoUrl}
          alt=""
          width="96"
          height="96"
          decoding="sync"
        />
      </div>
      <p className="initial-experience-loader__label">{t('common.loadingExperience')}</p>
    </div>
  );
}
