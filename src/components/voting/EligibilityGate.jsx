import { SpinnerGap, WarningCircle } from '@phosphor-icons/react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { localizeVoteError, sbtEligibilityError } from '../../lib/voteEligibility.js';
import { Modal } from '../Modal.jsx';
import { Reveal } from '../motion/Reveal.jsx';

export function EligibilityGate({ eligibility, event, promptRequested, onPromptHandled, session }) {
  const { t } = useI18n();
  if (!session.authenticated || eligibility.status === 'idle' || eligibility.status === 'eligible') return null;

  const checking = eligibility.status === 'checking';
  const unqualified = eligibility.status === 'unqualified';
  const error = unqualified ? sbtEligibilityError(eligibility.eligibility) : eligibility.error;
  const title = checking
    ? t('vote.eligibility.checkingTitle')
    : unqualified
      ? t('vote.eligibility.unqualifiedTitle')
      : t('vote.eligibility.unavailableTitle');
  const body = checking
    ? t('vote.eligibility.checkingBody')
    : unqualified
      ? t('vote.eligibility.unqualifiedBody', {
        count: eligibility.eligibility?.sbtBadgeCount ?? 0,
        minimum: eligibility.eligibility?.minimumBadgeCount ?? event?.voteEligibility?.minimumSbtBadgeCount,
      })
      : localizeVoteError(error, event, t);

  return (
    <>
      <Reveal
        className={`eligibility-gate eligibility-gate--${eligibility.status}`}
        distance={12}
        role={checking ? 'status' : 'alert'}
      >
        {checking ? <SpinnerGap className="eligibility-gate__icon" aria-hidden="true" /> : <WarningCircle className="eligibility-gate__icon" weight="fill" aria-hidden="true" />}
        <div>
          <strong>{title}</strong>
          <p>{body}</p>
        </div>
      </Reveal>
      <Modal
        open={Boolean(promptRequested && unqualified)}
        onClose={onPromptHandled}
        title={t('vote.eligibility.dialogTitle')}
        className="eligibility-dialog"
      >
        <div className="eligibility-dialog__body">
          <WarningCircle weight="fill" aria-hidden="true" />
          <div>
            <p>{body}</p>
            <small>{t('vote.eligibility.dialogHint')}</small>
          </div>
        </div>
        <button className="button button--secondary" type="button" onClick={onPromptHandled}>{t('common.close')}</button>
      </Modal>
    </>
  );
}
