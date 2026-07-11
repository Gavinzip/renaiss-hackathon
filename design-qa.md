# Design QA — Renaiss Tech Hackathon S1 Community Vote

## Source references

- Hackathon visual: `/Users/gavin/Library/Application Support/CleanShot/media/media_SRIsEzk17d/CleanShot 2026-07-11 at 12.37.22@2x.png`
- Transparent header: `/Users/gavin/Library/Application Support/CleanShot/media/media_6EarBTIhev/CleanShot 2026-07-11 at 14.53.15@2x.png`
- Metallic CTA: `/Users/gavin/renaiss_bnb_football/src/app/components/control-room/HomeRoom.jsx` and `.renaiss-metal-button` in its `src/app/styles.css`
- Product-card structure supplied by the user in this task

No new screenshots were captured for this pass, following the user's request. QA used the open in-app browser, rendered DOM, computed layout, route transitions, and console state.

## Information architecture

- `/` contains the event Hero and activity facts only; it does not render projects, voting rules, judging, or FAQ content.
- `/vote` is a dedicated route containing the project gallery and vote workflow.
- `/rules` is a dedicated route containing voting procedure, 40% Community Vote / 60% Renaiss Team Evaluation, and the three award recipients.
- Header, mobile navigation, Hero CTAs, footer links, direct URLs, and Renaiss auth return targets use the separate routes.
- Judging and FAQ sections are not mounted.

## Visual and responsive checks

- Header remains transparent over the Hero and gains its glass surface only after scrolling or opening a menu.
- The Hero event eyebrow was removed and the content block was moved lower.
- The Hero uses the source-copied Renaiss light/dark metal buttons with prismatic edge, liquid sheen, Magnet motion, and reduced-motion handling.
- Vote cards now use a taller 16:9 cover, a Track pill at the image's top-right, clearer title/team/pitch hierarchy, and a stronger footer action.
- Removed the full-card `GlareHover` sweep and the unexplained top-left sequence number; card depth now comes from its border, restrained shadow, image crop, and hover lift.
- Project details now use the supplied Linear-style shared-layout transition: the selected card, cover, and title expand into the dialog with the requested `{ type: 'spring', bounce: 0.05, duration: 0.5 }` motion and reverse along the same path when closed.
- At the normal 718px in-app viewport: separate routes render correctly and there is no horizontal overflow.
- At `390x844`: Vote cards collapse to one 343px column, Track pills remain 13px from the cover edge, Header uses the mobile menu, Hero CTAs fill the available width, and horizontal overflow is zero.

## Functional checks

- `Start to vote` changes the URL to `/vote#projects`; the home Hero is no longer mounted.
- Header and mobile navigation reach `/vote` and `/rules` as independent pages.
- `/vote` renders the project filters, search, sort, eight initial cards, details modal, local selection, and mobile review tray.
- `/rules` renders `40%` and `60%`, one `$2,000 USDT` Champion, and two `$1,000 USDT` Excellence Awards.
- Project detail opens from the redesigned card and selection updates the card plus review tray.
- Shared-layout dialog QA confirmed the animated panel grows from the card bounds, settles at the dialog bounds, closes in reverse, removes the portal after exit, restores body scrolling, and returns focus to the originating card.
- Current local build passes.

## Production boundaries

- Real Renaiss login requires production client credentials and an allowlisted callback.
- Exact voting opening and closing timestamps must be configured by the organizer.
- Community-score normalization, Renaiss team score ingestion, tie-breaking, and combined-result calculation must be officially defined before final result publication; the UI does not invent them.

Final result: passed for the requested local route, layout, and interaction scope.
