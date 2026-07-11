import { ArrowRight, CheckCircle, ShieldCheck, WarningCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Modal } from '../Modal.jsx';

export function VoteDialog({
  open,
  project,
  session,
  recordedProject,
  onClose,
  onSignIn,
  onConfirm,
  onClear,
  onClearSelection,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!open) return;
    setSuccess(false);
    setError(null);
    setReceipt(null);
  }, [open, project?.id]);

  if (!project) return null;
  const alreadyRecorded = recordedProject?.id === project.id;
  const canWrite = session.event?.voting?.status === 'open';

  const confirm = async () => {
    if (alreadyRecorded) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = await onConfirm(project.id);
      setReceipt(payload.vote || null);
      setSuccess(true);
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  const clear = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await onClear();
      onClose();
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={success ? 'Vote recorded' : alreadyRecorded ? 'Your vote receipt' : 'Review your vote'} className="vote-dialog">
      {success ? (
        <div className="vote-success">
          <CheckCircle size={56} weight="fill" />
          <h3>Your vote is recorded.</h3>
          <p>You voted for <strong>{project.name}</strong>. You may replace this selection while community voting remains open.</p>
          {receipt?.updatedAt ? <small className="vote-receipt-meta">Recorded {formatReceiptTime(receipt.updatedAt)}</small> : null}
          <button className="button button--primary" type="button" onClick={onClose}>Back to projects</button>
        </div>
      ) : (
        <>
          <div className="vote-review-card">
            <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{project.track}</span>
            <h3>{project.name}</h3>
            <p>{project.pitch}</p>
            <small>Submitted by {project.team}</small>
          </div>
          {recordedProject && !alreadyRecorded ? (
            <div className="replacement-note"><WarningCircle size={22} /><span>Confirming will replace your current vote for <strong>{recordedProject.name}</strong>.</span></div>
          ) : null}
          {!session.authenticated && !canWrite ? (
            <div className="confirm-actions">
              <p>{eventMessage(session.event)}</p>
            </div>
          ) : !session.authenticated ? (
            <div className="auth-step">
              <ShieldCheck size={30} weight="duotone" />
              <div><h3>Sign in to continue</h3><p>Renaiss SSO verifies one community identity without exposing your credentials to this site.</p></div>
              <button className="button button--primary" type="button" onClick={onSignIn}>Continue with Renaiss <ArrowRight /></button>
            </div>
          ) : alreadyRecorded ? (
            <div className="recorded-actions">
              <div><p><CheckCircle weight="fill" /> This is your active recorded vote.</p>{session.vote?.updatedAt ? <small className="vote-receipt-meta">Last recorded {formatReceiptTime(session.vote.updatedAt)}</small> : null}</div>
              {canWrite ? <button className="text-button text-button--danger" type="button" onClick={clear} disabled={submitting}>Remove vote</button> : null}
            </div>
          ) : (
            <div className="confirm-actions">
              <p>{canWrite ? 'Your verified Renaiss account will be used as the voting identity.' : eventMessage(session.event)}</p>
              <button className="button button--primary" type="button" onClick={confirm} disabled={submitting || !canWrite}>{submitting ? 'Recording…' : 'Confirm vote'}</button>
            </div>
          )}
          {!alreadyRecorded ? <button className="text-button vote-clear-selection" type="button" onClick={onClearSelection}>Clear selection</button> : null}
          {error ? <p className="form-error" role="alert"><WarningCircle /> {error.message}</p> : null}
        </>
      )}
    </Modal>
  );
}

function eventMessage(event) {
  if (event?.voting?.status === 'upcoming') return 'Voting is not open yet.';
  if (event?.voting?.status === 'closed') return 'Community voting has closed.';
  return 'Community voting is not open yet. The opening and closing times will be published before voting begins.';
}

function formatReceiptTime(value) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Taipei',
  }).format(new Date(value)) + ' (UTC+8)';
}
