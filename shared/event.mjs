const OFFICIAL_SCORING = Object.freeze({
  communityWeight: 40,
  renaissTeamWeight: 60,
  communityLabel: "Community Vote",
  renaissTeamLabel: "Renaiss Team Evaluation",
});

export const EVENT = Object.freeze({
  id: "renaiss-tech-hackathon-s1",
  name: "Renaiss Tech Hackathon S1",
  projectCount: 22,
  trackCounts: Object.freeze({
    AI: 8,
    Tool: 9,
    Game: 5,
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
  voteEffectConfirmed: true,
  voteEffect: OFFICIAL_SCORING,
  voteWindow: Object.freeze({
    startsAt: null,
    endsAt: null,
    timezone: "Asia/Taipei",
  }),
  copy: Object.freeze({
    eyebrow: "Official project gallery",
    title: "Built for the collector economy.",
    summary:
      "Explore 22 submissions across AI, Tool, and Game, created for Renaiss Tech Hackathon S1.",
    reviewPrompt:
      "Review what each builder shipped, how it connects to Renaiss, and the instructions provided for testing it.",
    voteNotice:
      "Official results combine Community Vote (40%) and Renaiss Team Evaluation (60%). Voting dates will be published here when confirmed by Renaiss.",
    resultsNotice:
      "The judging team will review eligible projects using usability, innovation, ecosystem relevance, clarity, and safety. Winners are scheduled to be announced on July 17, 2026.",
  }),
});
