BEGIN;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
CREATE TABLE IF NOT EXISTS auth_challenges (
  id_hash TEXT PRIMARY KEY, state_hash TEXT NOT NULL, code_verifier TEXT NOT NULL,
  nonce TEXT NOT NULL, redirect_uri TEXT NOT NULL, return_to TEXT NOT NULL,
  created_at BIGINT NOT NULL, expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_challenges_expires_at_idx ON auth_challenges(expires_at);
CREATE TABLE IF NOT EXISTS auth_sessions (
  id_hash TEXT PRIMARY KEY, user_sub TEXT NOT NULL, name TEXT, picture TEXT,
  safe_wallet_address TEXT, legacy_wallet_address TEXT, chain_id TEXT, twitter_username TEXT,
  created_at BIGINT NOT NULL, expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_sessions_user_sub_idx ON auth_sessions(user_sub);
CREATE INDEX IF NOT EXISTS auth_sessions_expires_at_idx ON auth_sessions(expires_at);
CREATE TABLE IF NOT EXISTS vote_allocations (
  event_id TEXT NOT NULL, voter_sub TEXT NOT NULL, project_id TEXT NOT NULL,
  created_at BIGINT NOT NULL, updated_at BIGINT NOT NULL, PRIMARY KEY(event_id,voter_sub)
);
CREATE INDEX IF NOT EXISTS vote_allocations_project_idx ON vote_allocations(event_id,project_id);
CREATE TABLE IF NOT EXISTS vote_ballots (
  event_id TEXT NOT NULL, voter_sub TEXT NOT NULL,
  selection_count INTEGER NOT NULL CHECK(selection_count BETWEEN 1 AND 3),
  created_at BIGINT NOT NULL, updated_at BIGINT NOT NULL, PRIMARY KEY(event_id,voter_sub)
);
CREATE TABLE IF NOT EXISTS vote_choices (
  event_id TEXT NOT NULL, voter_sub TEXT NOT NULL,
  selection_index INTEGER NOT NULL CHECK(selection_index BETWEEN 1 AND 3),
  project_id TEXT NOT NULL, team_key TEXT NOT NULL, created_at BIGINT NOT NULL,
  PRIMARY KEY(event_id,voter_sub,project_id), UNIQUE(event_id,voter_sub,selection_index),
  UNIQUE(event_id,voter_sub,team_key),
  FOREIGN KEY(event_id,voter_sub) REFERENCES vote_ballots(event_id,voter_sub) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS vote_choices_project_idx ON vote_choices(event_id,project_id);
CREATE TABLE IF NOT EXISTS vote_events (
  id TEXT PRIMARY KEY, event_id TEXT NOT NULL, voter_sub TEXT NOT NULL, action TEXT NOT NULL,
  previous_project_id TEXT, project_id TEXT, project_ids_json TEXT, request_id TEXT NOT NULL,
  request_fingerprint TEXT NOT NULL, result_json TEXT NOT NULL, created_at BIGINT NOT NULL,
  UNIQUE(event_id,request_id)
);
CREATE INDEX IF NOT EXISTS vote_events_voter_idx ON vote_events(event_id,voter_sub,created_at);
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY, timestamps BIGINT[] NOT NULL, expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_limits_expires_at_idx ON rate_limits(expires_at);
CREATE TABLE IF NOT EXISTS provider_requests (
  id TEXT PRIMARY KEY, provider_key TEXT NOT NULL, state TEXT NOT NULL CHECK(state IN ('queued','active')),
  queued_at BIGINT NOT NULL, expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS provider_requests_queue_idx ON provider_requests(provider_key,state,queued_at);
CREATE INDEX IF NOT EXISTS provider_requests_expiry_idx ON provider_requests(expires_at);
CREATE OR REPLACE FUNCTION reject_vote_mutation() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Vote history is immutable' USING ERRCODE='42501'; END;
$$;
CREATE OR REPLACE TRIGGER vote_ballots_immutable BEFORE UPDATE OR DELETE ON vote_ballots FOR EACH ROW EXECUTE FUNCTION reject_vote_mutation();
CREATE OR REPLACE TRIGGER vote_choices_immutable BEFORE UPDATE OR DELETE ON vote_choices FOR EACH ROW EXECUTE FUNCTION reject_vote_mutation();
CREATE OR REPLACE TRIGGER vote_events_immutable BEFORE UPDATE OR DELETE ON vote_events FOR EACH ROW EXECUTE FUNCTION reject_vote_mutation();
COMMIT;
