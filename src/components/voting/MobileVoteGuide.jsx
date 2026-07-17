import {
  ArrowLeft,
  CheckCircle,
  Compass,
  CursorClick,
  SignIn,
  WarningCircle,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { createPortal } from 'react-dom';

import { VoteProgress } from './VoteProgress.jsx';
import { MOTION_EASE, MOTION_EXIT_EASE, SURFACE_HIDDEN, SURFACE_VISIBLE } from '../motion/motionTokens.js';

const GUIDE_STEPS = [
  { icon: Compass, titleKey: 'vote.guide.exploreTitle', bodyKey: 'vote.guide.exploreBody' },
  { icon: CursorClick, titleKey: 'vote.guide.selectTitle', bodyKey: 'vote.guide.selectBody' },
  { icon: SignIn, titleKey: 'vote.guide.submitTitle', bodyKey: 'vote.guide.submitBody' },
];

export function MobileVoteGuide({
  phase,
  projects,
  selectionCount,
  selectionLimit,
  readyToSubmit,
  canWrite,
  selectionBlocked,
  submitting,
  errorMessage,
  statusText,
  recordedAt,
  t,
  onSubmit,
  onConfirm,
  onBack,
  onClearSelection,
}) {
  const reduceMotion = useReducedMotion();
  const projectNames = projects.map((project) => project.name).join('、');
  const guide = (
    <AnimatePresence initial={false}>
      <motion.section
        className={`mobile-vote-guide mobile-vote-guide--${phase}`}
        aria-label={phase === 'choose' ? t('vote.guide.label') : t('vote.panelLabel')}
        initial={reduceMotion ? false : { opacity: 0.42, y: 18, scale: 0.985, filter: 'blur(6px)' }}
        animate={SURFACE_VISIBLE}
        exit={reduceMotion ? undefined : { opacity: 0.54, y: 12, scale: 0.99, filter: 'blur(2px)', transition: { duration: 0.16, ease: MOTION_EXIT_EASE } }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: MOTION_EASE }}
      >
        <div className="mobile-vote-guide__surface">
          {phase === 'choose' ? null : (
            <VoteProgress
              compact
              phase={phase}
              chooseLabel={t('vote.stepChoose')}
              submitLabel={t('vote.stepSubmit')}
              ariaLabel={t('vote.panelLabel')}
            />
          )}

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={phase}
              className="mobile-vote-guide__content"
              data-phase={phase}
              aria-live="polite"
              initial={reduceMotion ? false : SURFACE_HIDDEN}
              animate={SURFACE_VISIBLE}
              exit={reduceMotion ? undefined : { opacity: 0.56, y: -8, scale: 0.99, filter: 'blur(2px)', transition: { duration: 0.14, ease: MOTION_EXIT_EASE } }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: MOTION_EASE }}
            >
              {phase === 'choose' ? <VoteGuidePrompt t={t} /> : null}
              {phase === 'selected' ? (
                <div className="mobile-vote-guide__selected">
                  <VoteProjectList projects={projects} t={t} />
                  <div className="mobile-vote-guide__selection-actions">
                    <strong>{t('vote.selectionProgress', { count: selectionCount, total: selectionLimit })}</strong>
                    <span>{readyToSubmit ? t('vote.selectionReady') : t('vote.selectionRemaining', { count: selectionLimit - selectionCount })}</span>
                    <button className="button button--primary mobile-vote-guide__primary" type="button" onClick={onSubmit} disabled={!readyToSubmit || !canWrite || selectionBlocked || submitting}>
                      {submitting ? t('vote.checkingEligibility') : t('vote.submit')}
                    </button>
                    <button className="mobile-vote-guide__text-action" type="button" onClick={onClearSelection}>
                      {t('vote.clearSelection')}
                    </button>
                  </div>
                  {!canWrite ? <small className="mobile-vote-guide__status">{statusText}</small> : null}
                </div>
              ) : null}

              {phase === 'confirm' ? (
                <div className="mobile-vote-guide__confirm">
                  <div className="mobile-vote-guide__confirm-copy">
                    <strong>{t('vote.confirmTitle')}</strong>
                    <span>{t('vote.confirmBody', { projects: projectNames })}</span>
                  </div>
                  <div className="mobile-vote-guide__actions">
                    <button className="button button--secondary" type="button" onClick={onBack} disabled={submitting} aria-label={t('common.back')}>
                      <ArrowLeft aria-hidden="true" />
                    </button>
                    <button className="button button--primary" type="button" onClick={onConfirm} disabled={submitting || !readyToSubmit || !canWrite || selectionBlocked}>
                      {submitting ? t('vote.recording') : t('vote.confirm')}
                    </button>
                  </div>
                </div>
              ) : null}

              {phase === 'success' ? (
                <div className="mobile-vote-guide__success">
                  <CheckCircle size={25} weight="fill" aria-hidden="true" />
                  <div>
                    <strong>{t('vote.successTitle')}</strong>
                    <span>{t('vote.successBody', { projects: projectNames })}</span>
                    {recordedAt ? <small>{recordedAt}</small> : null}
                  </div>
                  <button className="button button--secondary" type="button" onClick={onClearSelection}>
                    {t('vote.backToProjects')}
                  </button>
                </div>
              ) : null}

              {phase === 'receipt' ? (
                <div className="mobile-vote-guide__receipt">
                  <VoteProjectList projects={projects} t={t} />
                  <div className="mobile-vote-guide__receipt-state">
                    <CheckCircle size={20} weight="fill" aria-hidden="true" />
                    <strong>{t('vote.receiptTitle')}</strong>
                  </div>
                </div>
              ) : null}

              {errorMessage ? (
                <p className="mobile-vote-guide__error" role="alert">
                  <WarningCircle aria-hidden="true" />
                  {errorMessage}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </AnimatePresence>
  );

  return createPortal(guide, document.body);
}

function VoteGuidePrompt({ t }) {
  return (
    <div className="mobile-vote-guide__prompt">
      <div className="mobile-vote-guide__prompt-intro">
        <span>{t('vote.guide.kicker')}</span>
        <strong>{t('vote.guide.title')}</strong>
      </div>
      <ol className="mobile-vote-guide__prompt-steps">
        {GUIDE_STEPS.map(({ icon: Icon, titleKey, bodyKey }, index) => (
          <li key={titleKey}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Icon weight="duotone" aria-hidden="true" />
            <div>
              <strong>{t(titleKey)}</strong>
              <p>{t(bodyKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function VoteProjectList({ projects, t }) {
  return (
    <ol className="mobile-vote-guide__project-list" aria-label={t('vote.selectedLabel')}>
      {projects.map((project, index) => (
        <li key={project.id}>
          <span>{index + 1}</span>
          <div>
            <strong>{project.name}</strong>
            <small>{project.team}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
