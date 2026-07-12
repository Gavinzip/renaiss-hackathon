import { Buildings, Star, Trophy, UsersThree } from '@phosphor-icons/react';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './motion/Reveal.jsx';

export function ScoringAwards({ event }) {
  const { intlLocale, t } = useI18n();
  const communityWeight = event.scoring.communityWeight;
  const renaissTeamWeight = event.scoring.renaissTeamWeight;
  const awards = event.prizePool.awards.flatMap((award) => (
    Array.from({ length: award.count }, (_, index) => ({ ...award, key: `${award.name}-${index}` }))
  ));

  return (
    <>
      <section className="scoring-section page-shell" id="scoring">
        <Reveal className="section-heading" distance={28}>
          <div>
            <span className="section-kicker">{t('scoring.kicker')}</span>
            <h2>{t('scoring.title')}</h2>
          </div>
        </Reveal>
        <div className="scoring-split" aria-label={`${t('scoring.community')} ${communityWeight}%, ${t('scoring.team')} ${renaissTeamWeight}%`}>
          <Reveal as="article" className="scoring-card scoring-card--community" distance={24} scale={0.97}>
            <UsersThree size={30} weight="duotone" />
            <div><span>{t('scoring.community')}</span><strong>{communityWeight}%</strong></div>
            <p>{t('scoring.communityBody')}</p>
          </Reveal>
          <Reveal as="article" className="scoring-card scoring-card--team" delay={0.1} distance={24} scale={0.97}>
            <Buildings size={30} weight="duotone" />
            <div><span>{t('scoring.team')}</span><strong>{renaissTeamWeight}%</strong></div>
            <p>{t('scoring.teamBody')}</p>
          </Reveal>
        </div>
        <Reveal className="scoring-meter" delay={0.16} distance={14}>
          <span style={{ '--score-width': `${communityWeight}%` }} />
          <span style={{ '--score-width': `${renaissTeamWeight}%` }} />
        </Reveal>
      </section>

      <section className="awards-section page-shell" id="awards">
        <Reveal className="section-heading" distance={28}>
          <div>
            <span className="section-kicker">{t('awards.kicker')}</span>
            <h2>{t('awards.title', { label: event.prizePool.label })}</h2>
            <p>{t('awards.intro', { date: formatLongDate(event.winnerAnnouncement, intlLocale) })}</p>
          </div>
        </Reveal>
        <div className="award-grid">
          {awards.map((award, index) => {
            const Icon = award.name === 'Champion' ? Trophy : Star;
            return (
              <Reveal
                as="article"
                className={`award-card ${award.name === 'Champion' ? 'award-card--champion' : ''}`}
                delay={index * 0.09}
                distance={22}
                key={award.key}
                scale={0.97}
              >
                <Icon size={award.name === 'Champion' ? 44 : 40} weight="duotone" />
                <span>{award.name === 'Champion' ? t('awards.champion') : t('awards.excellence')}</span>
                <strong>${new Intl.NumberFormat(intlLocale).format(award.amount)} {event.prizePool.currency}</strong>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" className="award-note" delay={0.12} distance={14}>{t('awards.note')}</Reveal>
      </section>
    </>
  );
}

function formatLongDate(value, locale) {
  if (!value) return '';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}
