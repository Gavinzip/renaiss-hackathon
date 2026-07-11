import {
  ArrowRight,
  CheckCircle,
  EyeSlash,
  Info,
  ShieldCheck,
  Swap,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const RULES = [
  {
    icon: ShieldCheck,
    title: 'Sign in with Renaiss',
    body: 'Use the official Renaiss sign-in flow. This voting site never stores your Renaiss access, ID, or refresh tokens.',
  },
  {
    icon: CheckCircle,
    title: 'Choose one project',
    body: 'Each verified Renaiss identity has one active project selection in this Season 1 community vote.',
  },
  {
    icon: Swap,
    title: 'Change or remove it before close',
    body: 'You may replace or remove your active selection while the official voting window remains open.',
  },
  {
    icon: EyeSlash,
    title: 'Live totals stay hidden',
    body: 'Vote totals are not shown during voting. Results appear only when Renaiss intentionally publishes them.',
  },
];

export function VotingRules({ event }) {
  const voting = event?.voting;
  const scoring = event?.scoring;
  return (
    <section className="rules-section page-shell" id="rules">
      <div className="rules-section__heading">
        <div>
          <span className="section-kicker">Official voting guide</span>
          <h2>Know the rules before you vote.</h2>
        </div>
        <p>Review each team’s submitted materials and any available demo or repository links, then confirm the project you want to support.</p>
      </div>

      <div className="rules-layout">
        <div className="rules-list">
          {RULES.map(({ icon: Icon, title, body }, index) => (
            <article key={title}>
              <span className="rules-list__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="rules-list__icon"><Icon size={22} weight="duotone" /></span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>

        <aside className="voting-status-panel" aria-live="polite">
          <span>Voting status</span>
          <strong>{statusTitle(voting?.status)}</strong>
          <p>{statusDetail(voting)}</p>
          <dl>
            <div><dt>Identity</dt><dd>Renaiss SSO</dd></div>
            <div><dt>Ballot</dt><dd>One active project</dd></div>
            <div><dt>Visibility</dt><dd>Totals hidden</dd></div>
            <div><dt>Scoring</dt><dd>Community {scoring.communityWeight}% · Renaiss {scoring.renaissTeamWeight}%</dd></div>
          </dl>
          <Link className="button button--primary button--full" to="/vote#projects">Review all projects <ArrowRight weight="bold" /></Link>
        </aside>
      </div>

      <div className="rules-boundary" role="note">
        <Info size={21} weight="fill" />
        <p><strong>Community voting contributes {scoring.communityWeight}% of the official result.</strong> Renaiss Team Evaluation contributes the remaining {scoring.renaissTeamWeight}%, so neither component determines the result on its own.</p>
      </div>
    </section>
  );
}

function statusTitle(status) {
  if (status === 'open') return 'Voting is open';
  if (status === 'upcoming') return 'Voting opens soon';
  if (status === 'closed') return 'Voting has closed';
  if (status === 'loading') return 'Checking the official window';
  return 'Official schedule pending';
}

function statusDetail(voting) {
  if (voting?.status === 'open') return `You may confirm or replace your selection until ${formatDate(voting.closesAt)}.`;
  if (voting?.status === 'upcoming') return `Voting opens ${formatDate(voting.opensAt)} and closes ${formatDate(voting.closesAt)}.`;
  if (voting?.status === 'closed') return `The gallery remains available after voting closed ${formatDate(voting.closesAt)}.`;
  if (voting?.status === 'loading') return 'The server is checking the official voting configuration.';
  return 'Exact opening and closing times must be published by the organizer before vote recording can begin.';
}

function formatDate(value) {
  if (!value) return 'at the published deadline';
  const formatted = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Taipei',
  }).format(new Date(value));
  return `${formatted} (UTC+8)`;
}
