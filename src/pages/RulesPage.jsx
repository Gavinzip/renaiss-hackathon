import { ScoringAwards } from '../components/ScoringAwards.jsx';
import { VotingRules } from '../components/VotingRules.jsx';

export function RulesPage({ event }) {
  return (
    <div className="rules-page">
      <VotingRules event={event} />
      <ScoringAwards event={event} />
    </div>
  );
}
