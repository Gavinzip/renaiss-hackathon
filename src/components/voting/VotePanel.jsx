import { useEffect, useMemo, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { MobileVoteGuide } from './MobileVoteGuide.jsx';

const KNOWN_ERROR_CODES = new Set([
  'service_unreachable',
  'auth_not_configured',
  'sso_not_configured',
  'session_required',
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
    if (session.authenticated && canWrite) {
      setInteraction({ projectId: project.id, phase: 'confirm' });
    }
    onResumeHandled();
  }, [canWrite, onResumeHandled, project, resumeConfirmation, session.authenticated]);

  const submit = () => {
    if (!project || !canWrite) return;
    setError(null);
    if (!session.authenticated) {
      onSignIn();
      return;
    }
    setInteraction({ projectId: project.id, phase: 'confirm' });
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
        errorMessage={error ? localizeError(error, t) : null}
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

function localizeError(error, t) {
  return KNOWN_ERROR_CODES.has(error?.code) ? t(`vote.error.${error.code}`) : t('vote.error.generic');
}
