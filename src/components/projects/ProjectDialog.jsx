import { ArrowRight, CheckCircle, GithubLogo, GlobeSimple, XLogo } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import {
  PROJECT_DIALOG_EXPAND_TRANSITION,
  PROJECT_DIALOG_RETURN_TRANSITION,
  projectDialogReturnPose,
  projectDialogLayoutId,
  projectDialogTitleLayoutId,
  projectDialogImageLayoutId,
} from '../../lib/dialogMotion.js';
import { Modal } from '../Modal.jsx';
import { RenaissMetalButton } from '../metal/RenaissMetalButton.jsx';
import { MOTION_EASE } from '../motion/motionTokens.js';
import { ProjectCover } from './ProjectCover.jsx';
import { ProjectTeamIdentity } from './ProjectTeamIdentity.jsx';

export function ProjectDialog({ project, open, onClose, onSelect, selected, recorded, returnTarget, selectionLock }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [returnPose, setReturnPose] = useState(null);
  const [returning, setReturning] = useState(false);
  const afterReturnRef = useRef(null);
  if (!project) return null;
  const securityBlocked = project.auditStatus === 'BLOCK';
  const selectionBlocked = Boolean(selectionLock);
  const actionLabel = securityBlocked
    ? t('project.securityReview')
    : selectionBlocked
      ? t(`project.selectionLock.${selectionLock}`)
      : recorded
        ? t('project.voteRecorded')
        : selected
          ? t('project.selected')
          : t('project.select');
  const actionNotice = securityBlocked
    ? t('project.securityReviewNotice')
    : selectionBlocked
      ? t(`project.selectionLockNotice.${selectionLock}`)
      : recorded
        ? t('project.recordedNotice')
        : selected
          ? t('project.selectedNotice')
          : t('project.readyNotice');
  const layoutTransition = open
    ? PROJECT_DIALOG_EXPAND_TRANSITION
    : PROJECT_DIALOG_RETURN_TRANSITION;
  const startReturn = (afterReturn) => {
    if (returning) return;
    const sourceRect = document.querySelector('.modal-panel--linear')?.getBoundingClientRect();
    const pose = projectDialogReturnPose(sourceRect, returnTarget);
    if (!pose || reduceMotion) {
      afterReturn();
      return;
    }
    afterReturnRef.current = afterReturn;
    setReturnPose(pose);
    setReturning(true);
  };
  const closeDialog = () => {
    startReturn(onClose);
  };
  const selectProject = () => {
    startReturn(() => onSelect(project));
  };
  const completeReturn = () => {
    if (!returning) return;
    const afterReturn = afterReturnRef.current;
    afterReturnRef.current = null;
    setReturning(false);
    afterReturn?.();
  };

  return (
    <Modal
      open={open}
      onClose={closeDialog}
      title={project.name}
      className="project-dialog"
      layoutId={projectDialogLayoutId(project.id)}
      titleLayoutId={projectDialogTitleLayoutId(project.id)}
      layoutDependency={open}
      returnPose={returnPose}
      returning={returning}
      onReturnComplete={completeReturn}
      transition={layoutTransition}
    >
      <ProjectCover
        project={project}
        context="dialog"
        layoutId={returning ? undefined : projectDialogImageLayoutId(project.id)}
        layoutDependency={open}
        transition={layoutTransition}
      />
      <motion.div
        className="project-dialog__revealed-content"
        variants={CONTENT_CONTAINER}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        exit={reduceMotion ? undefined : { opacity: 0.94, transition: { duration: 0.3, ease: MOTION_EASE } }}
      >
        <motion.div className="project-dialog__intro" variants={CONTENT_ITEM}>
          <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{t(`tracks.${project.track.toLowerCase()}`)}</span>
          <ProjectTeamIdentity project={project} className="project-dialog__team" />
          {!securityBlocked && project.xUrl ? <a href={project.xUrl} target="_blank" rel="noreferrer"><XLogo weight="fill" /> {project.xLabel}</a> : null}
        </motion.div>
        <motion.p className="project-dialog__lead" variants={CONTENT_ITEM}>{project.pitch}</motion.p>
        {securityBlocked ? (
          <motion.p className="project-security-notice" variants={CONTENT_ITEM}>{t('project.securityReviewNotice')}</motion.p>
        ) : (
          <motion.div className="project-dialog__links" variants={CONTENT_ITEM}>
            {project.demoUrls.map((url, index) => (
              <a className="text-link project-dialog__site-link" key={url} href={url} target="_blank" rel="noreferrer">
                <GlobeSimple weight="duotone" aria-hidden="true" />
                {index === 0 ? t('project.demo') : t('project.demoLink', { number: index + 1 })}
              </a>
            ))}
            {project.repoUrl ? <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer"><GithubLogo weight="fill" /> {t('project.viewRepository')}</a> : null}
          </motion.div>
        )}
        <motion.div className="project-dialog__body" variants={CONTENT_ITEM}>
          <DetailSection title={t('project.about')} text={project.description} />
          <DetailSection title={t('project.forRenaiss')} text={project.renaissRelation} />
          {securityBlocked ? null : <DetailSection title={t('project.test')} text={project.testInstructions} />}
          {project.judgeNotes ? <DetailSection title={t('project.notes')} text={project.judgeNotes} /> : null}
        </motion.div>
        <motion.div className="project-dialog__sticky-action" variants={CONTENT_ITEM}>
          <span>{actionNotice}</span>
          <RenaissMetalButton
            className={`project-dialog__vote-action ${selected || recorded ? 'project-vote-action--selected' : ''}`}
            type="button"
            onClick={selectProject}
            disabled={securityBlocked || selectionBlocked || selected || recorded}
            leading={selected || recorded ? <CheckCircle weight="fill" /> : null}
            trailing={selected || recorded ? null : <ArrowRight weight="bold" />}
          >
            {actionLabel}
          </RenaissMetalButton>
        </motion.div>
      </motion.div>
    </Modal>
  );
}

const CONTENT_CONTAINER = {
  hidden: { opacity: 0.42, scale: 0.94, y: -20, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.34,
      delayChildren: 0.12,
      staggerChildren: 0.07,
      ease: MOTION_EASE,
    },
  },
};

const CONTENT_ITEM = {
  hidden: { opacity: 0.48, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.28, ease: MOTION_EASE },
  },
};

function DetailSection({ title, text }) {
  return (
    <section>
      <h3>{title}</h3>
      {String(text).split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph.slice(0, 80)}>{paragraph}</p>)}
    </section>
  );
}
