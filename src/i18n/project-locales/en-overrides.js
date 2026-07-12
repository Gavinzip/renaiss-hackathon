export const PROJECT_EN_OVERRIDES = Object.freeze({
  tcgclaw: Object.freeze({
    pitch: 'Helps TCG players quickly understand card information, value, and market expectations, narrowing the knowledge gap between newcomers and experienced collectors.',
    description: 'Many TCG players know very little about the cards they pull. We therefore need a tool that helps them understand each card more quickly. For newcomers who want to learn the value and outlook of every card on the Renaiss market, this tool is designed to close the card-knowledge gap between new and experienced collectors.',
    renaissRelation: 'During a meeting with the CTO, I identified a way to integrate the tool: it can be embedded in every card page, allowing users to open a card and immediately access a comprehensive introduction to it.',
    testInstructions: 'I can demonstrate it directly.',
    judgeNotes: 'None.',
  }),
  collectiq: Object.freeze({
    renaissRelation: `Built directly on Renaiss's two public APIs — api.renaiss.xyz/v0 (pack machines, marketplace, holdings) and api.renaissos.com/v1 (card index, pricing, sales history) — plus Renaiss on-chain pack-pull events read from BSC Transfer logs on the public Renaiss pool contracts.

It consumes Renaiss collector and trading data (pack contents, per-tier buyback prices, official EV/FMV, marketplace listings, holder ledgers) and builds several tools on top:

Independent price oracle — verifies Renaiss's index FMV against PriceCharting (aggregated eBay sold prices) and surfaces the gap, with source labeling so an independent price is never blended with a self-reported one.
CDP collateral simulator — dynamic LTV and liquidation prices derived from verified prices.
RWA index — tracks card series like a stock index; calculates True-EV per pack, whale-wallet risk, and live-pool EV back-calculation.
It also addresses real Renaiss data pitfalls (for example, *InUsd fields are actually cents and must be divided by 100; luck value must use per-tier buyback). It is fully internationalized (English default · Chinese · Japanese · Korean) for the wider community.`,
  }),
  'renaiss-alpha-radar': Object.freeze({
    pitch: 'An AI capital-intelligence system for the Renaiss RWA ecosystem that discovers undervalued assets, tracks whales, and generates real-time Alpha alerts.',
    description: `Renaiss Alpha Radar is an AI-powered capital-intelligence system built specifically for the Renaiss RWA ecosystem.

It monitors market activity, collectible trends, and market signals to discover undervalued assets, track whale behavior, and generate real-time Alpha alerts for collectors, traders, and communities.`,
    renaissRelation: `Renaiss Alpha Radar is built around the Renaiss ecosystem, using ecosystem data, market activity, collectible information, and trading signals.

The project combines Renaiss data sources with AI-driven analysis to turn raw ecosystem activity into actionable intelligence.

It demonstrates how Renaiss developer tools, CLI capabilities, and collectible data can be used to create an entirely new, native AI-powered RWA experience.`,
    judgeNotes: `Renaiss Alpha Radar is dedicated to building an intelligence layer for the Renaiss RWA ecosystem.

It goes beyond displaying blockchain data by using AI analysis, opportunity detection, and community alerts to turn ecosystem activity into actionable insights.

The project aims to make RWA markets easier to understand and more accessible to collectors and traders.`,
  }),
});
