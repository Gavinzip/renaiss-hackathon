import { useEffect, useMemo, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { trackEligibleSbtVoter } from '../../lib/analytics.js';
import { localizeVoteError, sbtEligibilityError } from '../../lib/voteEligibility.js';
import { MobileVoteGuide } from './MobileVoteGuide.jsx';

export function VotePanel({
  project,
  recordedProject,
  session,
  event,
  selectionLock,
  resumeConfirmation,
  onResumeHandled,
  onSignIn,
  onCheckEligibility,
  onConfirm,
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
  const selectionBlocked = Boolean(selectionLock);

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
    if (!project || !canWrite || selectionBlocked) return;
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
    if (!project || submitting || !canWrite || selectionBlocked) return;
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
        selectionBlocked={selectionBlocked}
        submitting={submitting}
        errorMessage={error ? localizeVoteError(error, event, t) : null}
        statusText={eventStatusCopy(event, intlLocale, t)}
        recordedAt={receipt?.updatedAt ? t('vote.recordedAt', { date: formatReceiptTime(receipt.updatedAt, intlLocale) }) : null}
        t={t}
        onSubmit={submit}
        onConfirm={confirm}
        onBack={() => setInteraction({ projectId: displayProject?.id, phase: 'selected' })}
        onClearSelection={clearSelection}
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
