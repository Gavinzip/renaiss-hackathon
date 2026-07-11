import { ArrowRight, CheckCircle, Info, ShieldCheck } from '@phosphor-icons/react';

export function VotePanel({ project, recorded, event, onReview }) {
  return (
    <aside className="vote-panel" aria-label="Your vote">
      <div className="vote-panel__heading">
        <div>
          <span>Your vote</span>
          <h3>{project ? project.name : 'Choose a project'}</h3>
        </div>
        {recorded ? <CheckCircle size={26} weight="fill" /> : <ShieldCheck size={26} weight="duotone" />}
      </div>
      {project ? (
        <div className="vote-panel__selection">
          <span className={`track-badge track-badge--${project.track.toLowerCase()}`}>{project.track}</span>
          <p>{project.pitch}</p>
          <small>{recorded ? 'Recorded in the official vote store.' : 'Selected locally. Review and confirm to record it.'}</small>
        </div>
      ) : (
        <div className="vote-panel__empty">
          <span>+</span>
          <p>Explore the official list and choose the project you want to support.</p>
        </div>
      )}
      <button className="button button--primary button--full" type="button" onClick={onReview} disabled={!project}>
        {recorded ? 'View vote receipt' : 'Review vote'} <ArrowRight weight="bold" />
      </button>
      <div className="vote-panel__note"><Info size={18} /><span>{event?.voting?.status === 'open' ? 'You may change your vote until voting closes.' : eventStatusCopy(event)}</span></div>
    </aside>
  );
}

function eventStatusCopy(event) {
  if (event?.voting?.status === 'upcoming') return `Voting opens ${formatDate(event.voting.opensAt)}.`;
  if (event?.voting?.status === 'closed') return 'Community voting has closed. The gallery remains open.';
  return 'The official voting window must be configured before votes can be recorded.';
}

function formatDate(value) {
  if (!value) return 'soon';
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Taipei' }).format(new Date(value));
}
