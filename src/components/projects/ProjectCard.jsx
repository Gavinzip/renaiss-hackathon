import { ArrowRight, ArrowSquareOut, CheckCircle, GithubLogo, UsersThree, XLogo } from '@phosphor-icons/react';
import { motion } from 'motion/react';

import {
  LINEAR_DIALOG_TRANSITION,
  projectDialogImageLayoutId,
  projectDialogLayoutId,
  projectDialogTitleLayoutId,
} from '../../lib/dialogMotion.js';

export function ProjectCard({ project, selected, recorded, onOpen, onSelect }) {
  const actionLabel = recorded ? 'Vote recorded' : selected ? 'Selected' : 'Vote for project';

  return (
    <motion.div
      className={`project-card project-card--${project.track.toLowerCase()} ${selected || recorded ? 'project-card--selected' : ''}`}
      layoutId={projectDialogLayoutId(project.id)}
      transition={LINEAR_DIALOG_TRANSITION}
      whileHover={{ y: -2 }}
    >
      <article>
        <button className="project-card__main" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.name}`}>
          <span className="project-card__cover">
            <motion.img
              layoutId={projectDialogImageLayoutId(project.id)}
              transition={LINEAR_DIALOG_TRANSITION}
              src={project.coverUrl}
              alt={`${project.name} product preview`}
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
            />
            <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{project.track}</span>
          </span>
          <span className="project-card__content">
            <span className="project-card__heading">
              <motion.strong layoutId={projectDialogTitleLayoutId(project.id)} transition={LINEAR_DIALOG_TRANSITION}>{project.name}</motion.strong>
            </span>
            <span className="project-card__team"><UsersThree weight="duotone" /> {project.team}</span>
            <span className="project-card__pitch">{project.pitch}</span>
          </span>
        </button>
        <div className="project-card__footer">
          <div className="project-links" aria-label={`${project.name} links`}>
            {project.demoUrls.slice(0, 1).map((url) => <a key={url} href={url} target="_blank" rel="noreferrer">Demo <ArrowSquareOut /></a>)}
            <a href={project.repoUrl} target="_blank" rel="noreferrer">GitHub <GithubLogo weight="fill" /></a>
            {project.xUrl ? <a href={project.xUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} on X`}><XLogo weight="fill" /></a> : null}
          </div>
          <button
            className={`button button--vote ${selected || recorded ? 'button--selected' : ''}`}
            type="button"
            onClick={() => onSelect(project)}
          >
            {selected || recorded ? <CheckCircle weight="fill" /> : null}{actionLabel}{selected || recorded ? null : <ArrowRight weight="bold" />}
          </button>
        </div>
      </article>
    </motion.div>
  );
}
