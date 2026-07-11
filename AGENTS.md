# Renaiss Tech Hackathon Vote

- This is the official Season 1 community-voting surface, not a demo-only landing page.
- Never commit participant email addresses or wallet addresses. Public project data comes from the approved submission sheet fields only.
- Keep community voting separate from judging. Do not claim it decides Champion or Excellence Awards unless the organizer updates the official rules.
- Do not add authentication, vote, project-data, or result fallbacks. Missing runtime configuration must stay visible.
- Renaiss SSO uses server-side Authorization Code + PKCE. Never expose client secrets or persist OIDC tokens.
- Vote writes must use the verified session `sub`, CSRF and Origin checks, an idempotency key, and one SQLite transaction.
- Do not run git push without explicit user approval.
