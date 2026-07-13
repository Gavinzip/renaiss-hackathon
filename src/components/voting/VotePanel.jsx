import { useEffect, useMemo, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { trackEligibleSbtVoter } from '../../lib/analytics.js';
import { MobileVoteGuide } from './MobileVoteGuide.jsx';

const KNOWN_ERROR_CODES = new Set([
  'service_unreachable',
  'auth_not_configured',
  'sso_not_configured',
  'session_required',
  'safe_wallet_not_ready',
  'sbt_vote_requirement_not_met',
  'bscscan_not_configured',
  'sbt_contract_not_configured',
  'bscscan_request_failed',
  'bscscan_request_timeout',
  'bscscan_http_error',
  'bscscan_invalid_response',
  'bscscan_invalid_transfer_row',
  'bscscan_pagination_limit',
  'csrf_invalid',
  'origin_not_allowed',
  'voting_window_not_configured',
  'voting_not_open',
  'voting_closed',
  'project_not_found',
  'rate_limited',
]);

export function VotePanel({
  project,
  recordedProject,
  session,
  event,
  resumeConfirmation,
  onResumeHandled,
  onSignIn,
  onCheckEligibility,
  onConfirm,
  onClear,
  onClearSelection,
}) {
  const { intlLocale, t } = useI18n();
  const [interaction, setInteraction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const phase = useMemo(() => {
    if (interaction && project && interaction.projectId === project.id) return interaction.phase;
    if (project && recordedProject?.id === project.id) return 'receipt';
    if (project) return 'selected';
    if (recordedProject) return 'receipt';
    return 'choose';
  }, [interaction, project, recordedProject]);

  const displayProject = phase === 'receipt' && !project ? recordedProject : project;
  const canWrite = event?.voting?.status === 'open';

  useEffect(() => {
    setError(null);
    setReceipt(null);
  }, [project?.id]);

  useEffect(() => {
    if (!resumeConfirmation || !project) return;
    if (!session.authenticated || !canWrite) {
      onResumeHandled();
      return;
    }

    let active = true;
    setSubmitting(true);
    setError(null);
    onCheckEligibility()
      .then((eligibility) => {
        if (!active) return;
        if (eligibility.status !== 'eligible') {
          setError(sbtEligibilityError(eligibility));
          return;
        }
        trackEligibleSbtVoter();
        setInteraction({ projectId: project.id, phase: 'confirm' });
      })
      .catch((caught) => {
        if (active) setError(caught);
      })
      .finally(() => {
        if (!active) return;
        setSubmitting(false);
        onResumeHandled();
      });
    return () => { active = false; };
  }, [canWrite, onCheckEligibility, onResumeHandled, project, resumeConfirmation, session.authenticated]);

  const submit = async () => {
    if (!project || !canWrite) return;
    setError(null);
    if (!session.authenticated) {
      onSignIn();
      return;
    }
    setSubmitting(true);
    try {
      const eligibility = await onCheckEligibility();
      if (eligibility.status !== 'eligible') {
        throw sbtEligibilityError(eligibility);
      }
      trackEligibleSbtVoter();
      setInteraction({ projectId: project.id, phase: 'confirm' });
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  const confirm = async () => {
    if (!project || submitting || !canWrite) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = await onConfirm(project.id);
      setReceipt(payload.vote || null);
      setInteraction({ projectId: project.id, phase: 'success' });
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  const clearVote = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await onClear();
      setInteraction(null);
      setReceipt(null);
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  const clearSelection = () => {
    setInteraction(null);
    setError(null);
    onClearSelection();
  };

  return (
    <aside className={`vote-panel vote-panel--${phase}`} aria-label={t('vote.panelLabel')}>
      <MobileVoteGuide
        phase={phase}
        project={project}
        recordedProject={recordedProject}
        canWrite={canWrite}
        submitting={submitting}
        errorMessage={error ? localizeError(error, event, t) : null}
        statusText={eventStatusCopy(event, intlLocale, t)}
        recordedAt={receipt?.updatedAt ? t('vote.recordedAt', { date: formatReceiptTime(receipt.updatedAt, intlLocale) }) : null}
        t={t}
        onSubmit={submit}
        onConfirm={confirm}
        onBack={() => setInteraction({ projectId: displayProject?.id, phase: 'selected' })}
        onClearSelection={clearSelection}
        onClearVote={clearVote}
      />
    </aside>
  );
}

function eventStatusCopy(event, locale, t) {
  if (event?.voting?.prelaunch) return t('vote.status.prelaunch', { date: formatReceiptTime(event.voting.opensAt, locale) });
  if (event?.voting?.status === 'upcoming') return t('vote.status.upcoming', { date: formatReceiptTime(event.voting.opensAt, locale) });
  if (event?.voting?.status === 'closed') return t('vote.status.closed');
  return t('vote.status.configuration');
}

function formatReceiptTime(value, locale) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Taipei',
  }).format(new Date(value));
}

function sbtEligibilityError(eligibility) {
  const error = new Error('SBT eligibility requirement not met.');
  error.code = 'sbt_vote_requirement_not_met';
  error.minimumBadgeCount = eligibility.minimumBadgeCount;
  return error;
}

function localizeError(error, event, t) {
  if (!KNOWN_ERROR_CODES.has(error?.code)) return t('vote.error.generic');
  if (error.code !== 'sbt_vote_requirement_not_met') return t(`vote.error.${error.code}`);

  const minimum = error.minimumBadgeCount ?? event?.voteEligibility?.minimumSbtBadgeCount;
  return Number.isInteger(minimum)
    ? t('vote.error.sbt_vote_requirement_not_met', { minimum })
    : t('vote.error.generic');
}
