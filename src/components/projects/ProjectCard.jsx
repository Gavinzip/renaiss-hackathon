import { ArrowRight, ArrowSquareOut, CheckCircle, GithubLogo, XLogo } from '@phosphor-icons/react';
import { motion } from 'motion/react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import {
  PROJECT_DIALOG_SHARED_TRANSITION,
  projectDialogLayoutId,
  projectDialogTitleLayoutId,
  projectDialogImageLayoutId,
} from '../../lib/dialogMotion.js';
import { RenaissMetalButton } from '../metal/RenaissMetalButton.jsx';
import { ProjectCover } from './ProjectCover.jsx';
import { ProjectShareButton } from './ProjectShareButton.jsx';
import { ProjectTeamIdentity } from './ProjectTeamIdentity.jsx';

export function ProjectCard({ project, coverLoading, coverFetchPriority, selected, recorded, selectionLimitReached, teamAlreadySelected, authenticated, selectionLock, dialogOpen, onOpen, onSelect, onSignIn, onShare }) {
  const { t } = useI18n();
  const securityBlocked = project.auditStatus === 'BLOCK';
  const loginRequired = !authenticated;
  const selectionBlocked = Boolean(selectionLock);
  const actionLabel = securityBlocked
    ? t('project.securityReview')
    : loginRequired
      ? t('project.signIn')
    : selectionBlocked
      ? t(`project.selectionLock.${selectionLock}`)
    : recorded
      ? t('project.voteRecorded')
      : selected
        ? t('project.removeSelection')
        : selectionLimitReached
          ? t('project.selectionLimitReached')
          : teamAlreadySelected
            ? t('project.teamAlreadySelected')
        : t('project.select');
  const trackLabel = t(`tracks.${project.track.toLowerCase()}`);
  const layoutDependency = `${project.id}:${dialogOpen ? 'open' : 'closed'}`;

  return (
    <motion.div
      className={`project-card project-card--${project.track.toLowerCase()} ${selected || recorded ? 'project-card--selected' : ''}`}
      data-project-dialog-card-id={project.id}
      layoutId={projectDialogLayoutId(project.id)}
      layoutDependency={layoutDependency}
      transition={PROJECT_DIALOG_SHARED_TRANSITION}
      style={{ borderRadius: 18 }}
    >
      <article>
        <button
          className="project-card__main"
          type="button"
          onClick={() => onOpen(project)}
          aria-label={t('project.view', { name: project.name })}
        >
          <span className="project-card__cover">
            <ProjectCover
              project={project}
              context="card"
              loading={coverLoading}
              fetchPriority={coverFetchPriority}
              layoutId={projectDialogImageLayoutId(project.id)}
              layoutDependency={layoutDependency}
              transition={PROJECT_DIALOG_SHARED_TRANSITION}
            />
            <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{trackLabel}</span>
          </span>
          <span className="project-card__content">
            <span className="project-card__heading">
              <motion.strong layoutId={projectDialogTitleLayoutId(project.id)} layoutDependency={layoutDependency} transition={PROJECT_DIALOG_SHARED_TRANSITION}>{project.name}</motion.strong>
            </span>
            <ProjectTeamIdentity project={project} className="project-card__team" />
            <span className="project-card__pitch">{project.pitch}</span>
          </span>
        </button>
        <div className="project-card__footer">
          {securityBlocked ? (
            <div className="project-links project-links--security" aria-label={t('project.linksLabel', { name: project.name })}>
              <span className="project-security-note">{t('project.securityReview')}</span>
              <ProjectShareButton projectId={project.id} onShare={onShare} />
            </div>
          ) : (
            <div className="project-links" aria-label={t('project.linksLabel', { name: project.name })}>
              {project.demoUrls.slice(0, 1).map((url) => <a className="project-link" key={url} href={url} target="_blank" rel="noreferrer">{t('project.demo')} <ArrowSquareOut /></a>)}
              {project.repoUrl ? <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">{t('project.github')} <GithubLogo weight="fill" /></a> : null}
              {project.xUrl ? <a className="project-link project-link--icon" href={project.xUrl} target="_blank" rel="noreferrer" aria-label={t('project.xProfile', { name: project.name })}><XLogo weight="fill" /></a> : null}
              <ProjectShareButton projectId={project.id} onShare={onShare} />
            </div>
          )}
          <RenaissMetalButton
            className={`button--vote ${selected || recorded ? 'project-vote-action--selected' : ''}`}
            type="button"
            onClick={() => (loginRequired ? onSignIn() : onSelect(project))}
            disabled={securityBlocked || (!loginRequired && (selectionBlocked || recorded || (!selected && (selectionLimitReached || teamAlreadySelected))))}
            leading={selected || recorded ? <CheckCircle weight="fill" /> : null}
            trailing={selected || recorded ? null : <ArrowRight weight="bold" />}
          >
            {actionLabel}
          </RenaissMetalButton>
        </div>
      </article>
    </motion.div>
  );
}
