import { ArrowSquareOut, GithubLogo, UsersThree, XLogo } from '@phosphor-icons/react';
import { motion } from 'motion/react';

import {
  LINEAR_DIALOG_TRANSITION,
  projectDialogImageLayoutId,
  projectDialogLayoutId,
  projectDialogTitleLayoutId,
} from '../../lib/dialogMotion.js';
import { Modal } from '../Modal.jsx';

export function ProjectDialog({ project, open, onClose, onSelect, selected, recorded }) {
  if (!project) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project.name}
      className="project-dialog"
      layoutId={projectDialogLayoutId(project.id)}
      titleLayoutId={projectDialogTitleLayoutId(project.id)}
      transition={LINEAR_DIALOG_TRANSITION}
    >
      <motion.img
        className="project-dialog__cover"
        layoutId={projectDialogImageLayoutId(project.id)}
        transition={LINEAR_DIALOG_TRANSITION}
        src={project.coverUrl}
        alt={`${project.name} product preview`}
        width="1200"
        height="675"
        decoding="async"
      />
      <motion.div
        className="project-dialog__revealed-content"
        initial={{ opacity: 0, scale: 0.8, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -50 }}
        transition={{ duration: 0.34, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="project-dialog__intro">
          <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{project.track}</span>
          <span><UsersThree weight="duotone" /> {project.team}</span>
          {project.xUrl ? <a href={project.xUrl} target="_blank" rel="noreferrer"><XLogo weight="fill" /> {project.xLabel}</a> : null}
        </div>
        <p className="project-dialog__lead">{project.pitch}</p>
        <div className="project-dialog__links">
          {project.demoUrls.map((url, index) => <a className="button button--secondary" key={url} href={url} target="_blank" rel="noreferrer">{index === 0 ? 'Open demo' : `Demo link ${index + 1}`} <ArrowSquareOut /></a>)}
          <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer"><GithubLogo weight="fill" /> View repository</a>
        </div>
        <div className="project-dialog__body">
          <DetailSection title="About the project" text={project.description} />
          <DetailSection title="Built for Renaiss" text={project.renaissRelation} />
          <DetailSection title="How to test it" text={project.testInstructions} />
          {project.judgeNotes ? <DetailSection title="Participant notes" text={project.judgeNotes} /> : null}
        </div>
        <div className="project-dialog__sticky-action">
          <span>{recorded ? 'This is your recorded vote.' : selected ? 'Selected for review.' : 'Ready to support this project?'}</span>
          <button className={`button button--primary ${selected || recorded ? 'button--selected' : ''}`} type="button" onClick={() => onSelect(project)}>{recorded ? 'Vote recorded' : selected ? 'Review vote' : 'Vote for project'}</button>
        </div>
      </motion.div>
    </Modal>
  );
}

function DetailSection({ title, text }) {
  return (
    <section>
      <h3>{title}</h3>
      {String(text).split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph.slice(0, 80)}>{paragraph}</p>)}
    </section>
  );
}
