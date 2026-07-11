import { Buildings, Info, Star, Trophy, UsersThree } from '@phosphor-icons/react';

export function ScoringAwards({ event }) {
  const communityWeight = event.scoring.communityWeight;
  const renaissTeamWeight = event.scoring.renaissTeamWeight;
  const awards = event.prizePool.awards.flatMap((award) => (
    Array.from({ length: award.count }, (_, index) => ({ ...award, key: `${award.name}-${index}` }))
  ));

  return (
    <>
      <section className="scoring-section page-shell" id="scoring">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Official result weighting</span>
            <h2>Community voice, backed by official review.</h2>
            <p>The final result combines two weighted components. Community voting influences the outcome, but does not determine it on its own.</p>
          </div>
        </div>
        <div className="scoring-split" aria-label={`Community Vote ${communityWeight} percent, Renaiss Team Evaluation ${renaissTeamWeight} percent`}>
          <article className="scoring-card scoring-card--community">
            <UsersThree size={30} weight="duotone" />
            <div><span>Community Vote</span><strong>{communityWeight}%</strong></div>
            <p>Verified Renaiss members support one active project selection during the official voting window.</p>
          </article>
          <article className="scoring-card scoring-card--team">
            <Buildings size={30} weight="duotone" />
            <div><span>Renaiss Team Evaluation</span><strong>{renaissTeamWeight}%</strong></div>
            <p>The project team evaluates eligible submissions under the official hackathon criteria.</p>
          </article>
        </div>
        <div className="scoring-meter" aria-hidden="true">
          <span style={{ '--score-width': `${communityWeight}%` }} />
          <span style={{ '--score-width': `${renaissTeamWeight}%` }} />
        </div>
        <div className="rules-boundary" role="note">
          <Info size={21} weight="fill" />
          <p><strong>Official weighting:</strong> Community Vote contributes {communityWeight}% and Renaiss Team Evaluation contributes {renaissTeamWeight}% of the final result.</p>
        </div>
      </section>

      <section className="awards-section page-shell" id="awards">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Three award recipients</span>
            <h2>{event.prizePool.label} prize pool</h2>
            <p>One Champion and two Excellence Award recipients will be announced on {formatLongDate(event.winnerAnnouncement)} after the official review.</p>
          </div>
        </div>
        <div className="award-grid">
          {awards.map((award) => {
            const Icon = award.name === 'Champion' ? Trophy : Star;
            return (
              <article className={`award-card ${award.name === 'Champion' ? 'award-card--champion' : ''}`} key={award.key}>
                <Icon size={award.name === 'Champion' ? 44 : 40} weight="duotone" />
                <span>{award.name}</span>
                <strong>${award.amount.toLocaleString('en-US')} {event.prizePool.currency}</strong>
              </article>
            );
          })}
        </div>
        <p className="award-note">Additional winner rewards include a Community Dev SBT, Tool Directory listing, and limited merch for the top three builders.</p>
      </section>
    </>
  );
}

function formatLongDate(value) {
  if (!value) return 'July 17, 2026';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}
