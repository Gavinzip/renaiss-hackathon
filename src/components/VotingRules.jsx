import {
  CheckCircle,
  EyeSlash,
  ShieldCheck,
  Swap,
} from '@phosphor-icons/react';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './motion/Reveal.jsx';

const STATIC_RULES = [
  {
    icon: ShieldCheck,
    titleKey: 'rules.signInTitle',
    bodyKey: 'rules.signInBody',
  },
  {
    icon: CheckCircle,
    titleKey: 'rules.chooseTitle',
    bodyKey: 'rules.chooseBody',
  },
  {
    icon: Swap,
    titleKey: 'rules.changeTitle',
    bodyKey: 'rules.changeBody',
  },
  {
    icon: EyeSlash,
    titleKey: 'rules.hiddenTitle',
    bodyKey: 'rules.hiddenBody',
  },
];

export function VotingRules({ event }) {
  const { t } = useI18n();
  const minimumSbtBadgeCount = event.voteEligibility?.minimumSbtBadgeCount;
  const hasSbtEligibility = Number.isInteger(minimumSbtBadgeCount);
  const rules = hasSbtEligibility
    ? [{ icon: CheckCircle, titleKey: 'rules.sbtTitle', bodyKey: 'rules.sbtBody' }, ...STATIC_RULES]
    : STATIC_RULES;
  return (
    <section className="rules-section" id="rules">
      <div className="rules-section__inner page-shell">
        <Reveal className="rules-section__heading" distance={28}>
          <div>
            <span className="section-kicker">{t('rules.kicker')}</span>
            <h2>{t('rules.title')}</h2>
          </div>
          <p>{hasSbtEligibility ? t('rules.intro', { minimum: minimumSbtBadgeCount }) : t('rules.introUnavailable')}</p>
        </Reveal>

        <div className="rules-layout">
          <div className="rules-list">
            {rules.map(({ icon: Icon, titleKey, bodyKey }, index) => (
              <Reveal as="article" delay={index * 0.08} distance={22} key={titleKey}>
                <span className="rules-list__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="rules-list__icon"><Icon size={22} weight="duotone" /></span>
                <div><h3>{t(titleKey)}</h3><p>{t(bodyKey, { minimum: minimumSbtBadgeCount })}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
