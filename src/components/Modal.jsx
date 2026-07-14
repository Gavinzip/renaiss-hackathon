import { X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { MOTION_EASE, MOTION_EXIT_EASE } from './motion/motionTokens.js';

export function Modal({
  open,
  onClose,
  title,
  children,
  className = '',
  layoutId,
  titleLayoutId,
  layoutDependency,
  returnPose,
  returning = false,
  onReturnComplete,
  transition,
}) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef(null);
  const hasReturnPose = Boolean(returnPose);
  const isReturning = hasReturnPose && returning;
  const linearExit = isReturning
    ? {
      ...returnPose,
      opacity: 0.98,
      filter: 'blur(0px)',
      transition,
    }
    : {
      opacity: 0.97,
      filter: 'blur(0px)',
      transition: { duration: reduceMotion ? 0 : 0.34, ease: MOTION_EXIT_EASE },
    };

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById('root');
    const previousInert = appRoot?.inert || false;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (appRoot) appRoot.inert = true;
    panelRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
      if (!focusable.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previousInert;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose, open]);

  if (layoutId) {
    return createPortal(
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="modal-backdrop modal-backdrop--linear"
            role="presentation"
            initial={{ opacity: 0.42 }}
            exit={{
              opacity: 0,
              transition: isReturning
                ? transition
                : { duration: reduceMotion ? 0 : 0.32, ease: MOTION_EXIT_EASE },
            }}
            animate={{ opacity: isReturning ? 0 : 1 }}
            transition={isReturning ? transition : { duration: 0.2, ease: [0.4, 0, 0.4, 1] }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          >
            <motion.section
              ref={panelRef}
              className={`modal-panel modal-panel--linear ${className}`}
              layoutId={isReturning ? undefined : layoutId}
              layoutDependency={layoutDependency}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex="-1"
              initial={{ scale: 0.95, opacity: 0.42, filter: 'blur(7px)' }}
              animate={isReturning
                ? { ...returnPose, opacity: 0.98, filter: 'blur(0px)' }
                : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={linearExit}
              transition={transition}
              onAnimationComplete={() => { if (isReturning) onReturnComplete?.(); }}
              style={{ willChange: 'transform, opacity, border-radius' }}
            >
              <div className="modal-panel__header">
                <motion.h2 id={titleId} layoutId={isReturning ? undefined : titleLayoutId} layoutDependency={layoutDependency} layout="position" transition={transition}>{title}</motion.h2>
                <button className="icon-button" type="button" onClick={onClose} aria-label={t('common.closeDialog')}><X size={22} /></button>
              </div>
              {children}
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );
  }

  return createPortal(
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0.42 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0.56, transition: { duration: 0.14, ease: MOTION_EXIT_EASE } }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: MOTION_EASE }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.section
            ref={panelRef}
            className={`modal-panel ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex="-1"
            initial={reduceMotion ? false : { opacity: 0.42, y: 14, scale: 0.985, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={reduceMotion ? undefined : { opacity: 0.56, y: 8, scale: 0.99, filter: 'blur(2px)', transition: { duration: 0.14, ease: MOTION_EXIT_EASE } }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: MOTION_EASE }}
          >
            <div className="modal-panel__header">
              <h2 id={titleId}>{title}</h2>
              <button className="icon-button" type="button" onClick={onClose} aria-label={t('common.closeDialog')}><X size={22} /></button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
