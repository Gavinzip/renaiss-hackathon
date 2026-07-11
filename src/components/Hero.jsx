import { ArrowRight, BookOpenText, CalendarBlank, CardsThree, Cube, Ticket, Trophy } from '@phosphor-icons/react';

import { RenaissMetalButton } from './metal/RenaissMetalButton.jsx';
import { Iridescence } from './react-bits/Iridescence.jsx';

const IRIDESCENCE_COLOR = [0.52, 0.34, 0.78];

export function Hero({ event, projectCount }) {
  const trackCount = Object.keys(event?.trackCounts || {}).length || 3;
  const prizeTotal = event?.prizePool?.total || 4_000;
  const winnerDate = event?.winnerAnnouncement ? formatShortDate(event.winnerAnnouncement) : 'Jul 17';
  return (
    <section className="hero" id="top">
      <div className="hero__image" aria-hidden="true" />
      <Iridescence className="hero__iridescence" color={IRIDESCENCE_COLOR} speed={0.22} amplitude={0.06} mouseReact={false} />
      <div className="hero__veil" aria-hidden="true" />
      <div className="page-shell hero__inner">
        <div className="hero__copy">
          <h1>Discover the builds. Cast your vote.</h1>
          <p>Explore {projectCount} final submissions across AI, Tool, and Game. Review what each team shipped, then sign in with Renaiss to support your pick.</p>
          <div className="hero__actions">
            <RenaissMetalButton
              to="/vote#projects"
              tone="light"
              leading={<Ticket size={18} weight="bold" />}
              trailing={<ArrowRight size={17} weight="bold" />}
            >
              Start to vote
            </RenaissMetalButton>
            <RenaissMetalButton
              to="/rules#rules"
              leading={<BookOpenText size={18} weight="bold" />}
            >
              Read voting rules
            </RenaissMetalButton>
          </div>
        </div>
      </div>
      <div className="page-shell hero__stats-wrap">
        <div className="stats-rail" aria-label="Hackathon facts">
          <Stat icon={CardsThree} value={projectCount} label="Projects" />
          <Stat icon={Cube} value={trackCount} label="Tracks" />
          <Stat icon={Trophy} value={`$${prizeTotal.toLocaleString('en-US')}`} label={`${event?.prizePool?.currency || 'USDT'} prize pool`} />
          <Stat icon={CalendarBlank} value={winnerDate} label="Winners announced" />
        </div>
        <p className="integrity-note">Project descriptions, demos, and external links are supplied by participants. Inclusion confirms a final submission was received; it does not independently verify every project claim.</p>
        {event?.voting?.status === 'configuration_required' ? (
          <p className="configuration-note">Community voting is not open yet. Renaiss will publish the official opening and closing times before voting begins.</p>
        ) : null}
      </div>
    </section>
  );
}

function formatShortDate(value) {
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return 'Jul 17';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="stat">
      <Icon size={23} weight="duotone" />
      <span><strong>{value}</strong><small>{label}</small></span>
    </div>
  );
}
