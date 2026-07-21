import { ArrowRight } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { staticAssetUrl } from '../lib/staticAssets.js';

export function ResultsPage({ event, projects }) {
  const { intlLocale, t } = useI18n();
  const number = useMemo(() => new Intl.NumberFormat(intlLocale), [intlLocale]);
  const leaderboard = useMemo(
    () => rankProjects(projects, event?.results?.projects, intlLocale),
    [event?.results?.projects, intlLocale, projects],
  );
  const maxVotes = Math.max(1, leaderboard[0]?.votes || 0);

  return (
    <section className="results-page page-shell">
      <header className="results-page__heading">
        <h1>{t('results.title')}</h1>
      </header>

      <ol className="results-leaderboard" aria-label={t('results.title')}>
        {leaderboard.map((entry) => {
          const percentage = Math.round((entry.votes / maxVotes) * 100);
          return (
            <li key={entry.project.id} className={entry.rank === 1 && entry.votes > 0 ? 'is-leading' : ''}>
              <span className="results-leaderboard__rank">{String(entry.rank).padStart(2, '0')}</span>
              <div className="results-leaderboard__project">
                <Link className="results-leaderboard__project-link" to={`/vote?project=${encodeURIComponent(entry.project.id)}#projects`}>
                  <ProjectThumbnail project={entry.project} />
                  <strong>{entry.project.name}</strong>
                  <span className="results-leaderboard__open-project">{t('results.openProject')} <ArrowRight weight="bold" /></span>
                </Link>
                <span className="results-leaderboard__bar"><i style={{ width: `${percentage}%` }} /></span>
              </div>
              <strong className="results-leaderboard__count">{number.format(entry.votes)} <small>{t('results.votes')}</small></strong>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function rankProjects(projects, resultProjects, intlLocale) {
  const votesByProject = new Map((resultProjects || []).map(({ projectId, votes }) => [projectId, Number(votes) || 0]));
  const ordered = projects
    .filter((project) => project.auditStatus !== 'BLOCK')
    .map((project) => ({ project, votes: votesByProject.get(project.id) || 0 }))
    .sort((left, right) => right.votes - left.votes || left.project.name.localeCompare(right.project.name, intlLocale));

  let previousVotes = null;
  let rank = 0;
  return ordered.map((entry, index) => {
    if (entry.votes !== previousVotes) rank = index + 1;
    previousVotes = entry.votes;
    return { ...entry, rank };
  }).slice(0, 10);
}

function ProjectThumbnail({ project }) {
  if (project.coverUrl) {
    return <img className="results-leaderboard__thumbnail" src={staticAssetUrl(project.coverUrl)} alt="" width="52" height="38" loading="lazy" decoding="async" />;
  }

  return <span className="results-leaderboard__thumbnail results-leaderboard__thumbnail--fallback" aria-hidden="true">{project.track?.slice(0, 1) || 'R'}</span>;
}
