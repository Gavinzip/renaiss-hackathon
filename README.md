# Renaiss Tech Hackathon S1 — Community Vote

Official project gallery and Renaiss-authenticated community voting surface for Hackathon Season 1.

## Site routes

- `/` — official event home and primary entry points.
- `/vote` — dedicated project gallery, filtering, project detail, selection, and vote confirmation flow.
- `/rules` — redirects to the official rules section at `/#rules`.

## Local development

1. Copy `.env.example` to `.env.local` and provide a dedicated Renaiss client, an allowlisted `http://localhost:4173/auth/callback`, and an `AUTH_SESSION_SECRET` of at least 32 characters.
2. Run `npm install`.
3. Run `npm run dev`.

The public gallery remains available when SSO or the voting window is not configured. Vote confirmation does not fall back: it stays unavailable and reports the missing configuration.

## Static submission catalog

- The 45 submitted projects are stored in `shared/projects.mjs`; the running site never reads Google Sheets or requests Google permissions.
- Approved project preview images are local WebP assets in `public/assets/projects/`. Entries without an approved image use the built-in typographic event cover and do not fetch participant-site screenshots.
- A submission marked `BLOCK` by the organizer's security re-review remains visible for catalog transparency, but its external links and voting action stay disabled until re-audit.
- To update the official list, edit the static catalog and matching locale chunk; only add a local cover when the organizer has approved the image.

## Production requirements

- Publish public media to the dedicated Cloudflare R2 bucket with `npm run assets:publish`. It creates a content-addressed release and records it in `src/generated/staticAssetRelease.js`. The production build deliberately fails until `VITE_STATIC_ASSET_CDN_BASE_URL` is set to an HTTPS custom Cloudflare R2 hostname; `r2.dev` is not accepted because it has no production CDN cache. The Dockerfile declares this as a build-stage `ARG`, so set the same variable in Zeabur before the multi-stage image is built. Validate live objects with `npm run assets:verify -- --base=https://media.example.com`.
- `public/assets/` is available only to Vite development. Production builds do not copy it into `dist`; all media URLs resolve to the published R2 release. Content images must be WebP or AVIF. Platform icons may remain PNG where WebP is not reliably supported.
- Set `PUBLIC_APP_ORIGIN` to the exact HTTPS origin and allowlist `${PUBLIC_APP_ORIGIN}/auth/callback` with Renaiss.
- Store `RENAISS_CLIENT_SECRET` and `AUTH_SESSION_SECRET` only in the server environment.
- Set exact `VOTING_OPENS_AT` and `VOTING_CLOSES_AT` timestamps before launch.
- Mount `/data` as persistent storage and run a single application instance when using the bundled SQLite store. Move sessions and votes to shared Postgres/Redis-backed storage before horizontal scaling.
- Keep `RESULTS_PUBLISHED=false` until the organizer intentionally publishes results.
- Define the official community-score normalization, team-score input, tie-breaking, and result aggregation process before calculating the final combined score. The current vote store records the community selection truth; it does not invent the organizer's 60% scoring data.

## Zeabur offsite backup

The live service stores its SQLite database in the Zeabur Volume mounted at `/data`. The application can create a consistent SQLite snapshot and encrypt it with restic before uploading it through an rclone remote. It never copies the live WAL database files directly.

1. In Zeabur, keep the existing `/data` Volume mounted. Do not re-mount it while vote data exists.
2. Configure a dedicated Google Drive rclone remote named `gdrive` with a published OAuth client of type `TVs and Limited Input devices`. Use the `drive.file` scope, create a dedicated backup folder through that client, set it as `RCLONE_CONFIG_GDRIVE_ROOT_FOLDER_ID`, and store only `RCLONE_CONFIG_GDRIVE_CLIENT_ID`, `RCLONE_CONFIG_GDRIVE_CLIENT_SECRET`, and `RCLONE_CONFIG_GDRIVE_TOKEN` in Zeabur Variables or Config Files. The refresh token renews access automatically; Drive access remains limited to files created through this backup client.
3. Set `BACKUP_REPOSITORY`, `RESTIC_PASSWORD`, and a 48+-character `BACKUP_TRIGGER_SECRET` together. The `/healthz` payload reports `not_configured`, `incomplete`, or `ready`; no backup fallback is used.
4. On the first successful backup, the service initializes the empty repository only if its restic config is absent. A wrong password, unreachable Drive remote, or any other error is not treated as an initialization condition.
5. Configure the GitHub Actions secrets `ZEABUR_BACKUP_BASE_URL` and `ZEABUR_BACKUP_TRIGGER_SECRET`. The scheduled workflow calls `POST /api/internal/backup` daily. The endpoint is bearer-token protected, rate-limited, and creates a SQLite online backup before restic uploads it.
6. Keep an independent copy of `RESTIC_PASSWORD` in a password manager. Losing it makes encrypted snapshots unrecoverable.

The temporary SQLite snapshot is deleted after each successful or failed upload. Restic applies 14 daily, 8 weekly, and 12 monthly snapshots by default, while the scheduled workflow asks the repository to verify 5% of encrypted data monthly. Neither operation uses a sync fallback or blindly deletes Google Drive files.

Official results use Community Vote at 40% and Renaiss Team Evaluation at 60%. The prize structure has three recipients: one Champion at $2,000 USDT and two Excellence Awards at $1,000 USDT each.
