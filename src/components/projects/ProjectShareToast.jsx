import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { MOTION_EASE } from '../motion/motionTokens.js';

export function ProjectShareToast({ status }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const copied = status === 'copied';
  const message = copied ? t('project.shareLinkCopied') : t('project.shareLinkCopyFailed');

  return (
    <div className="project-share-toast-region" aria-live="polite" aria-atomic="true">
      <AnimatePresence initial={false}>
        {status ? (
          <motion.div
            key={status}
            className={`project-share-toast ${copied ? 'project-share-toast--copied' : 'project-share-toast--failed'}`}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -3, transition: { duration: 0.16, ease: MOTION_EASE } }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: MOTION_EASE }}
          >
            <span>{message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
