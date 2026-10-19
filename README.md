# Renaiss Tech Hackathon S1 — Community Vote

Official project gallery and Renaiss-authenticated community voting surface for Hackathon Season 1.

## Site routes

- `/` — official event home and primary entry points.
- `/vote` — dedicated project gallery, filtering, project detail, selection, and vote confirmation flow.
- `/rules` — redirects to the official rules section at `/#rules`.
- `/results` — final community-vote ranking, limited to the top ten projects. Before publication, it is available only to authenticated wallets on the server-side administrator allowlist. It becomes public only after the voting window has closed and `RESULTS_PUBLISHED=true` is set in the server environment; it contains project-level totals only.

## Local development

1. Use Node 24, copy `.env.example` to `.env.local`, and configure `DATABASE_URL` for a dedicated PostgreSQL database, a Renaiss client, an allowlisted `http://localhost:4173/auth/callback`, and an `AUTH_SESSION_SECRET` of at least 32 characters. Apply the schema with an owner connection using `DATABASE_URL_UNPOOLED` and `APP_DATABASE_ROLE` before starting the app.
2. Run `npm install`.
3. Run `npm run dev`.

The public gallery remains available when SSO or the voting window is not configured. Vote confirmation does not fall back: it stays unavailable and reports the missing configuration.

## Static submission catalog

- The 45 submitted projects are stored in `shared/projects.mjs`; the running site never reads Google Sheets or requests Google permissions.
- Approved project preview images are local WebP assets in `public/assets/projects/`. Entries without an approved image use the built-in typographic event cover and do not fetch participant-site screenshots.
- A submission marked `BLOCK` by the organizer's security re-review remains visible for catalog transparency, but its external links and voting action stay disabled until re-audit.
- To update the official list, edit the static catalog and matching locale chunk; only add a local cover when the organizer has approved the image.

## Production requirements

- Publish public media to the dedicated Cloudflare R2 bucket with `npm run assets:publish`. It creates a content-addressed release and records it in `src/generated/staticAssetRelease.js`. The production build deliberately fails until `VITE_STATIC_ASSET_CDN_BASE_URL` is set to the active HTTPS R2 asset origin. Use the enabled public R2 URL for approved public media; a custom R2 hostname is optional when branded URLs, Cloudflare cache rules, WAF, or similar controls are needed. The Dockerfile declares this as a build-stage `ARG`, so set the same variable in the server environment before the multi-stage image is built. Validate live objects with `npm run assets:verify -- --base=https://pub-8bdb536dc8a0416b965c03a1493f1b29.r2.dev`.

## Analytics

Set `VITE_GA_MEASUREMENT_ID` in the server **build environment** to the Google Analytics 4 web-stream Measurement ID. The browser sends ordinary page views and one anonymous `sbt_eligible_vote_access` event per browser session only after the server confirms the SBT voting requirement. It never sends wallet addresses, Renaiss SSO subjects, project selections, vote writes, or raw SBT balances to Google Analytics. To report eligible visitors by country, use the `sbt_eligible_vote_access` event with the `Country` dimension in a GA exploration.
- `public/assets/` is available only to Vite development. Production builds do not copy it into `dist`; all media URLs resolve to the published R2 release. Content images must be WebP or AVIF. Platform icons may remain PNG where WebP is not reliably supported.
- Set `PUBLIC_APP_ORIGIN` to the exact HTTPS origin and allowlist `${PUBLIC_APP_ORIGIN}/auth/callback` with Renaiss.
- Store `RENAISS_CLIENT_SECRET` and `AUTH_SESSION_SECRET` only in the server environment.
- Set `ADMIN_SAFE_WALLET_ADDRESSES` to the comma-separated Safe wallets that may view the private live vote dashboard. The browser never receives this allowlist or individual voter identities.
- Set `BSCSCAN_API_KEY`, `ONCHAIN_SBT_CONTRACT`, and the BNB Chain settings in `.env.example`. Every vote write verifies the Renaiss SSO Safe wallet against the official ERC-1155 transfer history and requires at least `VOTE_MINIMUM_SBT_BADGES=10` distinct token IDs with a positive balance. This is an environment variable: change it in the server environment to adjust the live threshold without altering the rule text. BscScan errors, missing Safe-wallet claims, and missing configuration block a vote; there is no eligibility fallback.
- Set the exact `VOTING_OPENS_AT` timestamp before launch. Season 1 closes at `2026-07-20T23:59:59+08:00`; set the same `VOTING_CLOSES_AT` value in the server environment when the variable is present so the deployed override stays aligned with the official event policy.
- Each identity may submit up to three choices from three different teams, one vote at a time or together. A recorded choice is final: a voter may only append an eligible choice from a different team until all three votes are used; existing choices cannot be replaced or removed.
- Use the pooled Neon connection for application traffic and a direct owner connection for migrations/imports. The application role must have no parent-role memberships or schema-creation privileges. Session challenges use atomic `DELETE RETURNING`; votes use one PostgreSQL transaction with subject and idempotency locks. Request limits and BscScan concurrency/rate reservations are shared through PostgreSQL.
- Keep `RESULTS_PUBLISHED=false` until the organizer intentionally publishes results. While it remains false, the final ranking is available only to the existing server-side administrator wallet allowlist. Set it to `true` in the server environment when the top-ten ranking should appear publicly; no deploy-time timestamp is hard-coded for publication.
- Define the official community-score normalization, team-score input, tie-breaking, and result aggregation process before calculating the final combined score. The current vote store records the community selection truth; it does not invent the organizer's 60% scoring data.

## Isolated Vercel / Neon pilot

This branch deploys Vite output and one Node 24 API function through `vercel.json`. `/api/*`, `/auth/*`, and `/healthz` keep the existing Express routes. The original Zeabur service, domains, variables, deployment, volume, and scheduled workflow remain unchanged. Do not deploy this PostgreSQL branch to that SQLite service.

- Canonical website: https://build.renaisscltb.com
- Pilot URL: https://renaiss-hackathon-vercel-pilot.vercel.app
- OAuth starts on the canonical host so the httpOnly challenge cookie reaches the callback. The preview host stays noindex while the canonical host follows the original production indexing behavior.
- Preserve the original R2 release and voting window; the pilot does not reopen voting.
- `npm run db:migrate`: requires a direct `DATABASE_URL_UNPOOLED` and an ordinary SQL-created `APP_DATABASE_ROLE`. Neon CLI-created management roles are not suitable application roles.
- `npm run db:import -- /private/path/snapshot.json`: imports the four historical vote tables into empty tables atomically. It refuses to overwrite data. Existing session/challenge credentials remain in the private source backup; the pilot has a new session secret and separate host cookies.
- Keep owner credentials out of Vercel. Vercel receives only the restricted pooled application connection.
- Hashed JS/CSS/fonts use immutable caching; HTML, APIs, callbacks and missing assets do not. Public media remains on R2.
- The pilot omits the production GA measurement ID to avoid adding migration checks to production analytics. Frontend source and media are unchanged.

## PostgreSQL offsite backup

The existing protected `POST /api/internal/backup` and `POST /api/internal/backup/check` endpoints remain available. The PostgreSQL runner takes a repeatable-read logical snapshot, encrypts it using AES-256-GCM, and writes it to an independent Google Drive folder. The check endpoint downloads the latest file, validates its SHA-256 and authenticated encryption, and checks its snapshot format. No SQLite, restic executable, or local volume is used by Vercel.

Configure all `BACKUP_DRIVE_*`, `BACKUP_ENCRYPTION_KEY`, and `BACKUP_TRIGGER_SECRET` values together. The encryption key is a random 32-byte key encoded as 64 hexadecimal characters; store a separate secure recovery copy. Backup failures remain errors. Both endpoints share the original one-operation-per-ten-minutes trigger limit.

The original `.github/workflows/offsite-backup.yml` and its Zeabur secrets are unchanged. This pilot has on-demand backups and Neon's retained history; no new recurring trigger or automatic retention deletion was enabled. Restic retention on the original Zeabur service remains separate. A production cutover must explicitly choose the new backup schedule and retention policy.

`server/backup/snapshot.mjs` exports authenticated snapshot decryption for recovery. Restore only into an empty, isolated database with the checked-in schema, insert the tables in `SNAPSHOT_TABLES` order, then compare canonical row hashes before any cutover. The migration evidence includes an actual Drive download/decryption/restore verification.

Official results use Community Vote at 40% and Renaiss Team Evaluation at 60%. Prize awards include one Champion at $2,000 USDT, two Excellence Awards at $1,000 USDT each, and a $100 to $500 USDT participation award for every team.
