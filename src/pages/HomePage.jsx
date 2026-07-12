import { WarningCircle } from '@phosphor-icons/react';

import { Hero } from '../components/Hero.jsx';
import { ProgramGlassBackdrop } from '../components/ProgramGlassBackdrop.jsx';
import { ScoringAwards } from '../components/ScoringAwards.jsx';
import { VotingConfigurationNotice } from '../components/VotingConfigurationNotice.jsx';
import { VotingRules } from '../components/VotingRules.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function HomePage({ event, projectCount, serviceError }) {
  const { t } = useI18n();
  return (
    <div className="home-page">
      <Hero projectCount={projectCount} />
      <div className="home-page__program">
        <ProgramGlassBackdrop />
        <VotingConfigurationNotice event={event} className="page-shell" />
        {serviceError ? (
          <Reveal className="service-banner page-shell" role="status" distance={14}>
            <WarningCircle weight="fill" />
            <span>{t('service.homeOffline')}</span>
          </Reveal>
        ) : null}
        <VotingRules event={event} />
        <ScoringAwards event={event} />
      </div>
    </div>
  );
}
