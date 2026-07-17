import { useEffect, useMemo, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { trackEligibleSbtVoter } from '../../lib/analytics.js';
import { localizeVoteError, sbtEligibilityError } from '../../lib/voteEligibility.js';
import { MobileVoteGuide } from './MobileVoteGuide.jsx';

export function VotePanel({
  selectedProjects,
  recordedProjects,
  session,
  event,
  selectionLock,
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
  const selectedProjectIds = selectedProjects.map((project) => project.id).join(',');
  const selectionLimit = event.votePolicy.selectionsPerVoter;
  const recordedSelectionCount = Number(session.vote?.selectionCount || recordedProjects.length);
  const readyToSubmit = selectedProjects.length === selectionLimit;
  const isComplete = recordedSelectionCount >= selectionLimit;

  const phase = useMemo(() => {
    if (interaction?.phase === 'confirm' || interaction?.phase === 'success') return interaction.phase;
    if (isComplete) return 'receipt';
    if (selectedProjects.length) return 'selected';
    return 'choose';
  }, [interaction?.phase, isComplete, selectedProjects.length]);

  const displayedProjects = phase === 'receipt' ? recordedProjects : selectedProjects;
  const canWrite = event?.voting?.status === 'open';
  const selectionBlocked = Boolean(selectionLock);

  useEffect(() => {
    setError(null);
    setReceipt(null);
    if (interaction?.phase !== 'success') setInteraction(null);
  }, [selectedProjectIds]);

  const submit = async () => {
    if (!readyToSubmit || !canWrite || selectionBlocked) return;
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
      setInteraction({ phase: 'confirm' });
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  const confirm = async () => {
    if (!readyToSubmit || submitting || !canWrite || selectionBlocked) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = await onConfirm(selectedProjects.map((project) => project.id));
      setReceipt(payload.vote || null);
      setInteraction({ phase: 'success' });
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
        projects={displayedProjects}
        selectionCount={selectedProjects.length}
        selectionLimit={selectionLimit}
        readyToSubmit={readyToSubmit}
        canWrite={canWrite}
        selectionBlocked={selectionBlocked}
        submitting={submitting}
        errorMessage={error ? localizeVoteError(error, event, t) : null}
        statusText={eventStatusCopy(event, intlLocale, t)}
        recordedAt={receipt?.updatedAt ? t('vote.recordedAt', { date: formatReceiptTime(receipt.updatedAt, intlLocale) }) : null}
        t={t}
        onSubmit={submit}
        onConfirm={confirm}
        onBack={() => setInteraction(null)}
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
