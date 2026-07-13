import { ArrowRight, ChartBar, CrownSimple, LockKey, ShieldCheck, SpinnerGap, UsersThree } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { RenaissMetalButton } from '../components/metal/RenaissMetalButton.jsx';
import { ApiError, apiRequest } from '../lib/api.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { staticAssetUrl } from '../lib/staticAssets.js';

const REFRESH_INTERVAL_MS = 15_000;

export function AdminPage({ projects, session, onSignIn }) {
  const { intlLocale, t } = useI18n();
  const [dashboard, setDashboard] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects]);

  const refresh = useCallback(async ({ quiet = false } = {}) => {
    if (!session.authenticated) return;
    if (!quiet) setStatus('loading');

    try {
      const payload = await apiRequest('/api/admin/votes');
      setDashboard(payload);
      setError(null);
      setStatus('ready');
    } catch (requestError) {
      setError(requestError);
      setStatus('error');
    }
  }, [session.authenticated]);

  useEffect(() => {
    if (!session.authenticated) return undefined;
    refresh();
    const intervalId = window.setInterval(() => refresh({ quiet: true }), REFRESH_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [refresh, session.authenticated]);

  const leader = dashboard?.leaderboard.find((project) => project.votes > 0) || null;
  const leaderProject = leader ? projectById.get(leader.projectId) : null;
  const number = new Intl.NumberFormat(intlLocale);
  const dateTime = new Intl.DateTimeFormat(intlLocale, { dateStyle: 'medium', timeStyle: 'medium' });

  return (
    <section className="admin-page page-shell">
      <div className="admin-page__heading">
        <div>
          <span className="admin-page__eyebrow"><ShieldCheck weight="fill" /> {t('admin.eyebrow')}</span>
          <h1>{t('admin.title')}</h1>
          <p>{t('admin.summary')}</p>
        </div>
        {status === 'ready' ? (
          <RenaissMetalButton onClick={() => refresh()} leading={<SpinnerGap size={18} weight="bold" />}>
            {t('admin.refresh')}
          </RenaissMetalButton>
        ) : null}
      </div>

      {session.loading ? <AdminStatus icon={<SpinnerGap />} title={t('admin.checkingTitle')} body={t('admin.checkingBody')} /> : null}
      {!session.loading && !session.authenticated ? (
        <AdminStatus
          icon={<LockKey />}
          title={t('admin.signInTitle')}
          body={t('admin.signInBody')}
          action={<RenaissMetalButton onClick={onSignIn} leading={<LockKey size={18} weight="bold" />}>{t('admin.signInAction')}</RenaissMetalButton>}
        />
      ) : null}
      {session.authenticated && status === 'loading' && !dashboard ? <AdminStatus icon={<SpinnerGap />} title={t('admin.loadingTitle')} body={t('admin.loadingBody')} /> : null}
      {session.authenticated && status === 'error' ? <AdminError error={error} t={t} /> : null}
      {session.authenticated && dashboard ? (
        <div className="admin-dashboard">
          <div className="admin-dashboard__metrics">
            <article className="admin-metric-card admin-metric-card--total">
              <span className="admin-metric-card__icon"><UsersThree weight="duotone" /></span>
              <span>{t('admin.totalVotes')}</span>
              <strong>{number.format(dashboard.totalVotes)}</strong>
            </article>
            <article className="admin-metric-card admin-metric-card--leader">
              <span className="admin-metric-card__icon"><CrownSimple weight="fill" /></span>
              <span>{t('admin.currentLeader')}</span>
              <strong>{leader ? leaderProject?.name || leader.projectId : t('admin.noLeader')}</strong>
              <small>{leader ? t('admin.leaderVotes', { count: number.format(leader.votes) }) : t('admin.noLeaderBody')}</small>
            </article>
          </div>

          <section className="admin-leaderboard" aria-labelledby="admin-leaderboard-title">
            <div className="admin-leaderboard__header">
              <div>
                <span className="admin-page__eyebrow"><ChartBar weight="fill" /> {t('admin.liveResults')}</span>
                <h2 id="admin-leaderboard-title">{t('admin.leaderboardTitle')}</h2>
              </div>
              <p>{t('admin.updatedAt', { date: dateTime.format(new Date(dashboard.serverTime)) })}</p>
            </div>
            <ol className="admin-leaderboard__list">
              {dashboard.leaderboard.map((entry) => {
                const maxVotes = Math.max(1, dashboard.leaderboard[0]?.votes || 0);
                const percentage = Math.round((entry.votes / maxVotes) * 100);
                const project = projectById.get(entry.projectId);
                return (
                  <li key={entry.projectId} className={entry.rank === 1 && entry.votes > 0 ? 'is-leading' : ''}>
                    <span className="admin-leaderboard__rank">{String(entry.rank).padStart(2, '0')}</span>
                    <div className="admin-leaderboard__project">
                      <Link className="admin-leaderboard__project-link" to={`/vote?project=${encodeURIComponent(entry.projectId)}#projects`}>
                        <AdminProjectThumbnail project={project} />
                        <strong>{project?.name || entry.projectId}</strong>
                        <span className="admin-leaderboard__open-project">{t('admin.openProject')} <ArrowRight weight="bold" /></span>
                      </Link>
                      <span className="admin-leaderboard__bar"><i style={{ width: `${percentage}%` }} /></span>
                    </div>
                    <strong className="admin-leaderboard__count">{number.format(entry.votes)} <small>{t('admin.votes')}</small></strong>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      ) : null}
    </section>
  );
}

function AdminProjectThumbnail({ project }) {
  if (project?.coverUrl) {
    return <img className="admin-leaderboard__thumbnail" src={staticAssetUrl(project.coverUrl)} alt="" width="52" height="38" loading="lazy" decoding="async" />;
  }

  return <span className="admin-leaderboard__thumbnail admin-leaderboard__thumbnail--fallback" aria-hidden="true">{project?.track?.slice(0, 1) || 'R'}</span>;
}

function AdminStatus({ action, body, icon, title }) {
  return (
    <div className="admin-status">
      <span className="admin-status__icon">{icon}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function AdminError({ error, t }) {
  if (error instanceof ApiError && error.code === 'admin_access_denied') {
    return <AdminStatus icon={<LockKey />} title={t('admin.deniedTitle')} body={t('admin.deniedBody')} />;
  }
  if (error instanceof ApiError && error.code === 'admin_not_configured') {
    return <AdminStatus icon={<ShieldCheck />} title={t('admin.configurationTitle')} body={t('admin.configurationBody')} />;
  }
  return <AdminStatus icon={<ShieldCheck />} title={t('admin.failedTitle')} body={t('admin.failedBody')} />;
}
