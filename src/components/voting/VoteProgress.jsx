import { Check } from '@phosphor-icons/react';

export function VoteProgress({ phase, chooseLabel, submitLabel, ariaLabel, compact = false }) {
  const submitActive = phase !== 'choose';
  const complete = phase === 'success' || phase === 'receipt';

  return (
    <div className={`vote-progress${compact ? ' vote-progress--compact' : ''}`} role="list" aria-label={ariaLabel}>
      <div role="listitem" className={complete ? 'is-complete' : phase === 'choose' ? 'is-current' : 'is-complete'}>
        <span>{phase === 'choose' ? '1' : <Check weight="bold" />}</span>
        <small>{chooseLabel}</small>
      </div>
      <span className={`vote-progress__line ${submitActive ? 'is-active' : ''}`} aria-hidden="true" />
      <div role="listitem" className={complete ? 'is-complete' : submitActive ? 'is-current' : ''}>
        <span>{complete ? <Check weight="bold" /> : '2'}</span>
        <small>{submitLabel}</small>
      </div>
    </div>
  );
}
