const KNOWN_ERROR_CODES = new Set([
  'service_unreachable',
  'auth_not_configured',
  'sso_not_configured',
  'session_required',
  'safe_wallet_not_ready',
  'sbt_vote_requirement_not_met',
  'bscscan_not_configured',
  'sbt_contract_not_configured',
  'bscscan_request_failed',
  'bscscan_request_timeout',
  'bscscan_http_error',
  'bscscan_invalid_response',
  'bscscan_invalid_transfer_row',
  'bscscan_pagination_limit',
  'csrf_invalid',
  'origin_not_allowed',
  'voting_window_not_configured',
  'voting_not_open',
  'voting_closed',
  'project_not_found',
  'rate_limited',
]);

export function voteSelectionLockStatus(session, eligibility) {
  if (!session?.authenticated || eligibility?.status === 'eligible') return null;
  return eligibility?.status || 'idle';
}

export function sbtEligibilityError(eligibility) {
  const error = new Error('SBT eligibility requirement not met.');
  error.code = 'sbt_vote_requirement_not_met';
  error.minimumBadgeCount = eligibility.minimumBadgeCount;
  error.sbtBadgeCount = eligibility.sbtBadgeCount;
  return error;
}

export function localizeVoteError(error, event, t) {
  if (!KNOWN_ERROR_CODES.has(error?.code)) return t('vote.error.generic');
  if (error.code !== 'sbt_vote_requirement_not_met') return t(`vote.error.${error.code}`);

  const minimum = error.minimumBadgeCount ?? event?.voteEligibility?.minimumSbtBadgeCount;
  return Number.isInteger(minimum)
    ? t('vote.error.sbt_vote_requirement_not_met', { minimum })
    : t('vote.error.generic');
}
