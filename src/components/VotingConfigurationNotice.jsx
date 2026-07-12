import { WarningCircle } from '@phosphor-icons/react';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './motion/Reveal.jsx';

export function VotingConfigurationNotice({ event, className = '' }) {
  const { intlLocale, t } = useI18n();
  const voting = event?.voting;

  if (!voting?.prelaunch || !voting.opensAt) return null;

  const opensAt = new Intl.DateTimeFormat(intlLocale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Taipei',
  }).format(new Date(voting.opensAt));

  return (
    <Reveal className={`configuration-notice ${className}`.trim()} role="status" distance={14}>
      <WarningCircle weight="fill" aria-hidden="true" />
      <div>
        <strong>{t('prelaunch.title')}</strong>
        <span>{t('prelaunch.body', { date: opensAt })}</span>
      </div>
    </Reveal>
  );
}
