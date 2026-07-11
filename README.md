# Renaiss Tech Hackathon S1 — Community Vote

Official project gallery and Renaiss-authenticated community voting surface for Hackathon Season 1.

## Site routes

- `/` — official event home and primary entry points.
- `/vote` — dedicated project gallery, filtering, project detail, selection, and vote confirmation flow.
- `/rules` — voting rules, official 40/60 result weighting, and the three-award structure.

## Local development

1. Copy `.env.example` to `.env.local` and provide a dedicated Renaiss client, an allowlisted `http://localhost:4173/auth/callback`, and an `AUTH_SESSION_SECRET` of at least 32 characters.
2. Run `npm install`.
3. Run `npm run dev`.

The public gallery remains available when SSO or the voting window is not configured. Vote confirmation does not fall back: it stays unavailable and reports the missing configuration.

## Static submission catalog

- The 22 submitted projects are stored in `shared/projects.mjs`; the running site never reads Google Sheets or requests Google permissions.
- Project preview covers are local WebP assets in `public/assets/projects/` and are mapped by the same stable project IDs.
- To update the official list, edit the static catalog and its matching local cover, then rebuild the site.

## Production requirements

- Set `PUBLIC_APP_ORIGIN` to the exact HTTPS origin and allowlist `${PUBLIC_APP_ORIGIN}/auth/callback` with Renaiss.
- Store `RENAISS_CLIENT_SECRET` and `AUTH_SESSION_SECRET` only in the server environment.
- Set exact `VOTING_OPENS_AT` and `VOTING_CLOSES_AT` timestamps before launch.
- Mount `/data` as persistent storage and run a single application instance when using the bundled SQLite store. Move sessions and votes to shared Postgres/Redis-backed storage before horizontal scaling.
- Keep `RESULTS_PUBLISHED=false` until the organizer intentionally publishes results.
- Define the official community-score normalization, team-score input, tie-breaking, and result aggregation process before calculating the final combined score. The current vote store records the community selection truth; it does not invent the organizer's 60% scoring data.

Official results use Community Vote at 40% and Renaiss Team Evaluation at 60%. The prize structure has three recipients: one Champion at $2,000 USDT and two Excellence Awards at $1,000 USDT each.
