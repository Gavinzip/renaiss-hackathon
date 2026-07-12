import { ArrowRight, ArrowSquareOut, CheckCircle, GithubLogo, XLogo } from '@phosphor-icons/react';
import { motion } from 'motion/react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import {
  PROJECT_DIALOG_RETURN_TRANSITION,
  projectDialogLayoutId,
  projectDialogTitleLayoutId,
  projectDialogImageLayoutId,
} from '../../lib/dialogMotion.js';
import { RenaissMetalButton } from '../metal/RenaissMetalButton.jsx';
import { ProjectCover } from './ProjectCover.jsx';
import { ProjectTeamIdentity } from './ProjectTeamIdentity.jsx';

export function ProjectCard({ project, selected, recorded, onOpen, onSelect }) {
  const { t } = useI18n();
  const securityBlocked = project.auditStatus === 'BLOCK';
  const actionLabel = securityBlocked
    ? t('project.securityReview')
    : recorded
      ? t('project.voteRecorded')
      : selected
        ? t('project.selected')
        : t('project.select');
  const trackLabel = t(`tracks.${project.track.toLowerCase()}`);

  return (
    <motion.div
      className={`project-card project-card--${project.track.toLowerCase()} ${selected || recorded ? 'project-card--selected' : ''}`}
      layoutId={projectDialogLayoutId(project.id)}
      layoutDependency={project.id}
      transition={PROJECT_DIALOG_RETURN_TRANSITION}
    >
      <article>
        <button className="project-card__main" type="button" onClick={() => onOpen(project)} aria-label={t('project.view', { name: project.name })}>
          <span className="project-card__cover">
            <ProjectCover
              project={project}
              context="card"
              layoutId={projectDialogImageLayoutId(project.id)}
              layoutDependency={project.id}
              transition={PROJECT_DIALOG_RETURN_TRANSITION}
            />
            <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{trackLabel}</span>
          </span>
          <span className="project-card__content">
            <span className="project-card__heading">
              <motion.strong layoutId={projectDialogTitleLayoutId(project.id)} layoutDependency={project.id} transition={PROJECT_DIALOG_RETURN_TRANSITION}>{project.name}</motion.strong>
            </span>
            <ProjectTeamIdentity project={project} className="project-card__team" />
            <span className="project-card__pitch">{project.pitch}</span>
          </span>
        </button>
        <div className="project-card__footer">
          {securityBlocked ? (
            <span className="project-security-note">{t('project.securityReview')}</span>
          ) : (
            <div className="project-links" aria-label={t('project.linksLabel', { name: project.name })}>
              {project.demoUrls.slice(0, 1).map((url) => <a className="project-link" key={url} href={url} target="_blank" rel="noreferrer">{t('project.demo')} <ArrowSquareOut /></a>)}
              {project.repoUrl ? <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">{t('project.github')} <GithubLogo weight="fill" /></a> : null}
              {project.xUrl ? <a className="project-link project-link--icon" href={project.xUrl} target="_blank" rel="noreferrer" aria-label={t('project.xProfile', { name: project.name })}><XLogo weight="fill" /></a> : null}
            </div>
          )}
          <RenaissMetalButton
            className={`button--vote ${selected || recorded ? 'project-vote-action--selected' : ''}`}
            type="button"
            onClick={() => onSelect(project)}
            disabled={securityBlocked}
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
