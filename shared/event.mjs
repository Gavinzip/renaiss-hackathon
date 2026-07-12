const OFFICIAL_SCORING = Object.freeze({
  communityWeight: 40,
  renaissTeamWeight: 60,
  communityLabel: "Community Vote",
  renaissTeamLabel: "Renaiss Team Review",
});

export const EVENT = Object.freeze({
  id: "renaiss-tech-hackathon-s1",
  name: "Renaiss Tech Hackathon S1",
  projectCount: 45,
  trackCounts: Object.freeze({
    AI: 12,
    Tool: 17,
    Game: 8,
  }),
  prizePool: Object.freeze({
    total: 4_000,
    currency: "USDT",
    label: "$4,000 USDT",
    awards: Object.freeze([
      Object.freeze({ name: "Champion", amount: 2_000, count: 1 }),
      Object.freeze({ name: "Excellence Award", amount: 1_000, count: 2 }),
    ]),
  }),
  winnerAnnouncement: "2026-07-17",
  judgingCriteria: Object.freeze([
    "Usability",
    "Innovation",
    "Ecosystem relevance",
    "Clarity",
    "Safety",
  ]),
  scoring: OFFICIAL_SCORING,
  voteWindow: Object.freeze({
    startsAt: null,
    endsAt: null,
    prelaunchStartsAt: "2026-07-12T21:00:00+08:00",
    timezone: "Asia/Taipei",
  }),
});
