const PROJECT_DATA = [
  {
    "id": "renaiss-card-dna",
    "name": "Renaiss Card DNA",
    "track": "AI",
    "team": "tdh8386",
    "xLabel": "@bella_summerss",
    "xUrl": "https://x.com/bella_summerss",
    "repoUrl": "https://github.com/tranhop26/renaiss-card-dna",
    "demoUrls": [
      "https://renaiss-card-dna.vercel.app",
      "https://renaiss-card-dna.onrender.com/docs"
    ],
    "pitch": "An AI card-personality and collector-matching engine built around Visual, Behavioral, and Market DNA.",
    "description": "Renaiss Card DNA is an AI-powered card personality and matching engine for collectors. It analyzes collectible cards through Visual DNA, Behavioral DNA, and Market DNA, then helps users explore card personality, compare cards, understand their collection style, and get personalized recommendations through a conversational AI advisor.",
    "renaissRelation": "Renaiss Card DNA is built specifically for the Renaiss collector ecosystem. The project adds an AI-powered discovery layer on top of collectible card data by helping users understand card identity, style, and collector fit beyond raw metrics like price and rarity. It is designed as a prototype for Renaiss-related collector tools and can be extended with real Renaiss ecosystem data, trading activity, and protocol integrations in future versions.",
    "testInstructions": "Judges can test the project directly through the live demo: https://renaiss-card-dna.vercel.app\nMain pages:\nHome: overview and navigation\nAnalyzer: analyze card DNA and personality\nPortfolio: view collector profile and portfolio insights\nChat: ask the AI advisor for card insights and recommendations\nRepository:\nhttps://github.com/tranhop26/renaiss-card-dna\nBackend API docs:\nhttps://renaiss-card-dna.onrender.com/docs\nThe current demo uses mock card data and synthetic trading history for prototype purposes, and this is clearly labeled in the app.",
    "judgeNotes": "This project focuses on making collectible discovery more personal, intuitive, and taste-driven. Instead of only showing price and rarity, it introduces a personality-based framework for understanding cards and matching them to collectors. The current version is a working prototype with a live frontend, backend API, AI chat experience, and clear expansion path toward real Renaiss ecosystem integration."
  },
  {
    "id": "renaiss-intelligence",
    "name": "Spellman/Renaiss-intelligence",
    "track": "AI",
    "team": "prometheus_010",
    "xLabel": "@wizz_spellman",
    "xUrl": "https://x.com/wizz_spellman",
    "repoUrl": "https://github.com/samixrd/renaiss-intelligence",
    "demoUrls": [
      "https://renaiss-intelligence-frontend.vercel.app/",
      "https://www.youtube.com/watch?si=ZRYtn85LY5-c5sXH&v=3DnbtPyxPIc&feature=youtu.be"
    ],
    "pitch": "A price-confidence, pack EV, and marketplace intelligence layer built on Renaiss CLI and Index API data.",
    "description": "Renaiss Intelligence — Price Confidence Engine + Pack EV Analyzer\nA statistical intelligence layer built on top of Renaiss's CLI and Index API. Instead of showing collectors a single price number, it calculates an 80% calibrated confidence interval for any PSA-graded card using conformal inference, and computes real Expected Value for Renaiss gacha packs (OMEGA, RenaCrypt, Eden) from actual recent pull data — flagging whether a pack is genuinely worth its cost. It also tracks live marketplace sales, highlighting overpriced and underpriced listings in real time. Built for collectors and pack buyers who want data-backed confidence, not just a marketing FMV number, when deciding what to buy, sell, or pull.",
    "renaissRelation": "How this project connects to Renaiss Protocol:\n\nThis project is built entirely on top of Renaiss's own developer infrastructure, released for hackathon builders:\n\n\n\n\n\nRenaiss CLI (npx renaiss) — used to fetch real-time pack details and recent pull data for OMEGA, RenaCrypt Pack, and Eden Pack, plus live marketplace listings (asks, FMVs, sold activity).\n\n\n\nRenaiss Index API (api.renaissos.com) — used for PSA cert lookups via /v1/graded/{cert}, returning FMV, confidence tier, and freshness data that feeds directly into our conformal inference engine.\n\n\n\nCollector/trading data — recent pull FMVs and marketplace ask/FMV pairs are pulled directly from Renaiss and stored to build historical price context, powering both the Price Confidence Engine and the Pack EV Analyzer.\n\n\n\nPack/gacha data — real per-pack pull data (rarity tiers, FMVs) from npx renaiss packs {slug} feeds our Expected Value calculations, so pack verdicts reflect actual Renaiss pool behavior, not assumptions.\n\nIn short: Renaiss provides the raw market and pack data; our tool adds a statistical intelligence layer (calibrated confidence intervals, real EV, price-gap detection) directly on top of it, giving Renaiss collectors deeper, more reliable signal without needing to leave the ecosystem.",
    "testInstructions": "Live Demo (Recommended, no setup needed)\nFrontend: https://renaiss-intelligence-frontend.vercel.app\nBackend API: https://renaiss-glass-insight-main.vercel.app\nJust visit the frontend link directly. No login or account required.\nTry these:\n\nSearch a PSA cert (e.g. PSA151238633 or use one of the suggested cert numbers shown in the UI) to see the Price Confidence engine with 80% calibrated interval\nScroll to Pack Expected Values to see live EV calculations for OMEGA, RenaCrypt Pack, and Eden Pack\nScroll to Recent Sales Activity to see live marketplace listings with price-gap verdicts\n\nNote: Data is fetched live on load, so please allow a few seconds for the page to populate on first visit.\n\nOption 1 — Live Demo (Recommended, no setup needed)\nFrontend: https://renaiss-intelligence-frontend.vercel.app\nBackend API: https://renaiss-glass-insight-main.vercel.app\nJust visit the frontend link directly. No login or account required.\nTry these:\n\nSearch a PSA cert (e.g. PSA151238633 or use one of the suggested cert numbers shown in the UI) to see the Price Confidence engine with 80% calibrated interval\nScroll to Pack Expected Values to see live EV calculations for OMEGA, RenaCrypt Pack, and Eden Pack\nScroll to Recent Sales Activity to see live marketplace listings with price-gap verdicts\n\nNote: Data is fetched live on load, so please allow a few seconds for the page to populate on first visit.\n\nOption 2 — Test Backend API Directly\nbashcurl https://renaiss-glass-insight-main.vercel.app/health\ncurl https://renaiss-glass-insight-main.vercel.app/search?cert=PSA151238633\ncurl https://renaiss-glass-insight-main.vercel.app/pack-ev?pack=omega\ncurl https://renaiss-glass-insight-main.vercel.app/recent-sales\n\nOption 3 — Local Setup (for code review)\nFull setup instructions, environment variables, and architecture are documented in the GitHub repo README:\nhttps://github.com/samixrd/renaiss-intelligence\n\nImportant note for judges: This project uses the Renaiss CLI and Index API, both currently in beta. As per Renaiss's own guidance, some data may be incomplete, missing, delayed, or still updating — all outputs are experimental references, not final verified market facts. This is clearly disclosed in-app via a persistent banner.",
    "judgeNotes": "The RenaCrypt Pack showing a 0.96x EV ratio is a genuine, data-derived finding — not a scripted demo number. It emerged naturally from calculating expected value against actual recent pull data pulled live from Renaiss, which is exactly the kind of signal this tool is meant to surface.\nWhere historical price data for a specific card is still limited (expected, given the API is in beta), the tool transparently falls back to a labeled bootstrap estimate rather than pretending to have full statistical confidence it doesn't have yet. As more trade history accumulates through Renaiss, the conformal prediction engine will automatically produce tighter, more reliable intervals — the architecture is designed to improve with the ecosystem's data, not require rebuilding.\nEverything shown — FMVs, pulls, marketplace listings — is real data fetched from Renaiss's own CLI and Index API. No mock, seeded, or placeholder numbers anywhere in the final product.\nThis was built solo in a few days specifically for this hackathon sprint, with a focus on shipping something genuinely useful to Renaiss collectors rather than just a polished-looking demo.\n\nThank you for building the Index API access for us — it made a statistically honest tool possible instead of just another price tracker."
  },
  {
    "id": "tcgclaw",
    "name": "tcgclaw",
    "track": "Tool",
    "team": "start5816+amar1316",
    "xLabel": "@AWeb3Going",
    "xUrl": "https://x.com/AWeb3Going",
    "repoUrl": "https://github.com/euplive/tcgclaw",
    "demoUrls": [
      "http://47.93.36.132/tcgclaw/"
    ],
    "pitch": "帮助 TCG 玩家快速理解卡牌信息、价值与市场预期，缩小新手与资深收藏家的认知差距。",
    "description": "很多 tcg 玩家其实对于它抽到的卡牌一无所知。所以，我们需要一个工具帮助他更快的了解这张卡牌。或者对于一个新人想要更快的在 renaiss 了解市场上每一张卡牌的价值及预期，我的这个工具就是拉平新人与老人对于卡牌认知差的。",
    "renaissRelation": "我在和 cto 开会的时候，获得一个维度的结合，就是这个工具可以嵌套到每一个卡牌的页面里，点击进入这张卡牌，即可获得这张卡全方位的介绍。",
    "testInstructions": "我可以直接展示",
    "judgeNotes": "没有"
  },
  {
    "id": "barzakh-ai",
    "name": "Barzakh AI",
    "track": "AI",
    "team": "kafir",
    "xLabel": "@Bacchetta0",
    "xUrl": "https://x.com/Bacchetta0",
    "repoUrl": "https://github.com/sirath-network/barzakh-ai/#-renaiss-protocol--collectibles-marketplace--zero-knowledge-gacha",
    "demoUrls": [
      "https://chat.barzakh.tech",
      "https://youtu.be/ekiU2QWYqsY"
    ],
    "pitch": "A conversational Web3 agent for Renaiss marketplace search, FMV analysis, price alerts, and verifiable gacha.",
    "description": "Barzakh AI is an intelligent web3 agent platform that integrates the Renaiss Protocol collectible card economy (BNB Chain). The agent leverages live indexers and marketplace APIs to search and analyze vaulted physical-backed trading cards (Pokémon and One Piece). It automatically evaluates listing prices against Fair Market Value (FMV) to identify undervalued assets, tracks verified vault custody locations, watches target price watchlists, and queries zero-knowledge verifiable gacha pulls with 100% cryptographic transparency.\n\nWho it is for? This integration is built for collectors, gamers, and secondary-market traders who want to navigate the high-value graded card ecosystem with data-driven confidence. It eliminates market speculation by providing instantaneous, verifiable valuation details, automated price alerts, and transparent on-chain drawing tools.",
    "renaissRelation": "Barzakh AI acts as a smart, conversational wrapper and automation engine built directly on top of Renaiss Protocol's data layers and APIs, enhancing the collector and trading experience through the following integrations:\n\n1. Core API Integration (Index & Marketplace APIs)\n\n• Renaiss Index API (api.renaissos.com): Barzakh AI queries the Index API to resolve public reference-price data, retrieve verified slab scans (PSA/CGC/BGS), fetch historical price charts, and calculate Fair Market Value (FMV).\n• Renaiss Marketplace API (api.renaiss.xyz): The agent pulls real-time trading data, including active listing token IDs, ask prices in USDT, vault locations, and on-chain ownership details.\n\n2. Intelligent Collector & Trading Data Merging\n\n• Automated Valuation & Deal Finder: Barzakh AI merges data from both APIs to automatically compare a card's current listed price against its historical FMV index. It calculates premium/discount percentages dynamically to help collectors identify undervalued \"hidden gems.\"\n• Listed vs. Unlisted Filtering: The agent filters out index-only records to guarantee card existence on the marketplace. Listed cards display live prices, while vaulted assets not currently for sale are clearly labeled as \"Unlisted\" or \"Vaulted (Unlisted)\" using their FMV for valuation reference.\n\n3. Verifiable Gacha & Game Experiences\n\n• Zero-Knowledge Booster Packs: Barzakh AI integrates with Renaiss’s perpetual gacha packs (such as the Eden, OMEGA, and RenaCrypt pools).\n• Expected Value (EV) Analytics: Users can ask the agent to fetch a pack's Expected Value (EV), calculate top-card drop rates, review recent draw histories, and explain how the protocol uses on-chain Zero-Knowledge Merkle Proofs to cryptographically verify draw fairness.",
    "testInstructions": "Open Our Project: https://chat.barzakh.tech\n\nTest Prompts & Usecases\nOnce the chat interface is open, just copy and paste the following prompts to interact with the Renaiss Protocol tools:\n\n• Marketplace Search & Pricing:\n\n1/ \"Search the Renaiss marketplace for Luffy cards with a minimum grade of 9.\"\n2/ \"Find Roronoa Zoro card\"\n3/ \"Find Undervalued Pokemon card.\"\n\n• Booster Packs & Gacha Analytics:\n\n4/ \"What gacha card packs are available on Renaiss right now?\"\n5/ \"Show details, expected value, and recent pulls for the Eden pack.\"",
    "judgeNotes": "Key Highlights for Judges\n\n• Zero Hallucinations with Physical Verification: All card data, grades, and prices provided by Barzakh AI correspond to real physical trading cards secured 1-to-1 in institutional-grade vaults. The agent provides direct click-through marketplace links to prove data authenticity.\n\n• Verifiable Fairness (Zero-Knowledge): When users ask about gacha booster packs, the agent explains and links to on-chain Zero-Knowledge Merkle Proofs. This ensures that every card draw is cryptographically fair, transparent, and auditable on the blockchain.\n\n• High Production Uptime (Dynamic Key Rotation): We implemented an automatic key rotation system. If a key hits a rate limit (429 or \"rate_limited\" response), the agent dynamically switches to the next configured partner credential and retries the request seamlessly in the background.\n\n• Intelligent Intent Routing: We updated the central intent classifier. Users do not need to manually configure settings or select tools; prompts like \"what is the price of the Eden pack?\" are automatically classified and routed straight to the Renaiss API instead of defaulting to web searches."
  },
  {
    "id": "renaiss-lens",
    "name": "Renaiss Lens",
    "track": "AI",
    "team": "larryclues",
    "xLabel": "@zek_eth",
    "xUrl": "https://x.com/zek_eth",
    "repoUrl": "https://github.com/ezekiel6262/renaiss-lens",
    "demoUrls": [
      "https://renaiss-lens.vercel.app"
    ],
    "pitch": "An AI collector agent for appraisal, market outlooks, trade strategy, slab-photo valuation, and portfolio analysis.",
    "description": "Renaiss Lens is an AI-powered collector intelligence agent built for the Renaiss ecosystem. It gives collectors, traders, and newcomers a single conversational interface to appraise collectibles, predict market trends, build trade strategies, search Renaiss ecosystem knowledge, and look up real on-chain data via the Renaiss OS Index API. Users type naturally and the agent routes their query to the right intelligence layer - returning structured appraisal cards, market outlook reports, trade playbooks, cert-verified card data, and portfolio health analysis. It also features a Slab Photo Valuator that identifies any graded card from a photo and pulls the Renaiss index price, a live Market Feed surfacing real collector economy signals, and a Collection Tracker with AI portfolio analysis.",
    "renaissRelation": "Renaiss Lens is directly integrated with the Renaiss OS Index API. Every RENAISS intent call queries the live index at api.renaissos.com - users can paste any PSA, BGS, or CGC cert number and get real card identification, index price, confidence tier, and a direct link to the Renaiss Index page. \n\nThe Slab Photo Valuator calls the /v1/graded/by-image endpoint - users upload a slab photo and the Renaiss AI identifies the card and returns its index price with no cert number needed. \n\nEvery appraisal card includes a List this on Renaiss CTA driving collectors directly to the Renaiss platform. \n\nThe SEARCH intent is trained on Renaiss Protocol knowledge covering vault custody, Merkle proof provenance, zero-knowledge validation, and BNB Chain ownership transfer. \n\nThe Market Feed includes a dedicated RENAISS category surfacing live ecosystem news. \n\nThe Collection Tracker helps collectors understand the real-world value of assets they might tokenize on Renaiss. All Renaiss OS Index data is clearly attributed per their attribution requirements.",
    "testInstructions": "No setup required. Visit https://renaiss-lens.vercel.app directly in any browser.\n\nChat tab - test all 6 intents:\n\n1. APPRAISE - type \"Appraise my PSA 10 Charizard Base Set 1st Edition\"\n2. PREDICT - type \"What is the market outlook for Naruto TCG before 2027?\"\n3. TRADE - type \"Give me a flipping strategy for graded Pokemon holos this quarter\"\n4. SEARCH - type \"How does Renaiss vault custody work?\"\n5. RENAISS - type \"Check PSA76729777 on Renaiss\" - returns live Renaiss OS Index data for a real vaulted card\n6. CHAT - type \"What makes a collectible rare?\"\n\nSlab Scan tab - upload any front-facing PSA/BGS/CGC slab photo - the Renaiss AI identifies the card and returns the index price\n\nMy Collection tab - add items with purchase price and estimated value, click Get AI Portfolio Analysis\n\nMarket Feed tab - click Refresh, filter by RENAISS category to see ecosystem-specific signals\n\nNote: Renaiss OS Index is in beta - some cards may not have price data yet. The RENAISS intent and Slab Scan are clearly labeled as beta with attribution.",
    "judgeNotes": "Renaiss Lens was built solo in under 7 days during the hackathon window, including full Renaiss OS Index API integration after the builder tools were announced mid-hackathon.\n\nThe core insight is that most collector tools are single-purpose. Renaiss Lens collapses appraisal, prediction, trade strategy, ecosystem search, cert lookup, image valuation, portfolio tracking, and market signals into one conversational agent - the intelligence layer the Renaiss collector economy needs.\n\nEvery AI response is enriched with live web search data via the Claude API, grounding valuations and market signals in real current data. The Renaiss OS Index integration goes further - cert lookups and slab photo identification return verified on-chain data directly from Renaiss infrastructure.\n\nThe product is built to grow with Renaiss. As the protocol expands its API surface, Renaiss Lens can plug directly into vault holdings, live floor prices, and wallet-level portfolio data to become even more precise.\n\nStack: Next.js 14, Tailwind CSS, Claude API (claude-sonnet-4-6 with web search), Renaiss OS Index API, Serper API, Vercel.\n\nData attribution: All Renaiss OS Index data is clearly attributed per Renaiss attribution requirements. AI outputs are clearly labeled as estimates. Beta limitations are disclosed on every Renaiss data response."
  },
  {
    "id": "liquidity-quest",
    "name": "Liquidity Quest ( Project name)",
    "track": "Tool",
    "team": "Magnus0361",
    "xLabel": "@magnuskrypt",
    "xUrl": "https://x.com/magnuskrypt",
    "repoUrl": "https://github.com/0xNexuz/liquidity-quest",
    "demoUrls": [
      "https://liquidity-quest.vercel.app/",
      "https://youtu.be/nAxtoM-b3Yk"
    ],
    "pitch": "A quest-style collector intelligence tool that turns Renaiss marketplace scanner records into actionable scouting routes.",
    "description": "Liquidity Quest, is a collector intelligence tool that turns real Renaiss marketplace scammer records into scouting quests including undervalued listings, offer opportunities, price warnings and consecutive pair routes",
    "renaissRelation": "This project builds directly on the Renaiss collector economy by using real marketplace scammer data and turning it into source-backed flows that can improve discovery Nf informed collector activity",
    "testInstructions": "Open (https://liquidity-quest.vercel.app/) click start scouting, generate quests, use the filters/search and inspect source cards to verify each is tied to a real scanner fields e.g FMV, ask price e.t.c",
    "judgeNotes": "N/A"
  },
  {
    "id": "fairdraw-suite",
    "name": "FairDraw Suite",
    "track": "Tool",
    "team": "yeesil",
    "xLabel": "@yesilcrypto",
    "xUrl": "https://x.com/yesilcrypto",
    "repoUrl": "https://github.com/aydnOktay/fairDraw-suite-renaiss-hackathon-s1",
    "demoUrls": [],
    "pitch": "A transparency suite for checking gacha pack health, comparing EV, and verifying recent pulls with live Renaiss data.",
    "description": "FairDraw is a transparency and decision-support tool for the Renaiss gacha ecosystem. It helps collectors, streamers, and builders understand pack quality before opening and verify pull outcomes after opening using live Renaiss data. The product combines three layers: PoolPulse for pack health and EV insights, PullProof for pull verification, and Compare for side-by-side pack analysis",
    "renaissRelation": "FairDraw is built directly on top of the Renaiss ecosystem and uses official Renaiss developer tooling as its foundation. It integrates the Renaiss CLI to fetch live gacha pack data, recent pull activity, and card lookup data, and it is structured to work alongside the Renaiss OS Index API for valuation-related workflows.\n\nMore specifically, the project is connected to Renaiss Protocol in these ways:\n\nIt reads live gacha pack information from the Renaiss CLI for OMEGA, Eden Pack, and RenaCrypt Pack.\nIt uses recent opened pack activity to derive tier distribution, EV spread, and health indicators for collectors.\nIt verifies pull consistency using Renaiss gacha activity data rather than unrelated external sources.\nIt provides an API layer and Swagger docs so the tool can also be extended into bots, dashboards, or other community tools inside the Renaiss ecosystem.\nThe goal is not to replace Renaiss, but to make Renaiss's transparency and collectible data more usable for real users",
    "testInstructions": "The project is a full-stack app with a React frontend and a Node.js/Express backend.\n\nSetup\nnpm run install:all\nnpm run dev\nLocal URLs\nApp: http://localhost:5173\nAPI: http://localhost:3001\nSwagger Docs: http://localhost:3001/api/docs\nWhat judges can test\nOpen the homepage and navigate through the modules.\nGo to PoolPulse and inspect live pack health data for:\nOMEGA\nEden Pack\nRenaCrypt Pack\nGo to Compare to see which pack currently has the strongest EV spread and health score.\nGo to PullProof and test verification in two ways:\nClick a recent pull from PoolPulse and verify it directly\nPaste a collectible token ID manually into PullProof\nImportant note\nThe app currently works best with collectible token IDs for pull verification.\nTransaction-hash-based verification is not fully supported yet, because the current Renaiss CLI does not expose a complete tx-hash verification flow.\nThe app includes clear limitations/disclaimers in the UI where data is sampled from recent pull windows rather than full inventory state.\nEnvironment / tooling note\nThe current Renaiss CLI package recommends Node.js 22+. The project has been tested in development, but judges may get the best compatibility with Node 22 or newer.",
    "judgeNotes": "FairDraw is designed as a real collector tool, not just a demo dashboard. We intentionally focused on practical utility inside the Renaiss ecosystem:\n\nhelping users decide which pack looks stronger right now\nhelping them understand recent pull behavior\ngiving them a way to verify and explain pull outcomes\nexposing a documented API layer that can be reused by other builders\nWe also made the project intentionally transparent about its assumptions:\n\nEV and FMV values are treated as experimental references\ntier mix is derived from recent pull samples\nthe app clearly distinguishes between live CLI-backed data and any fallback behavior\nIf helpful, judges can think of FairDraw as a gacha intelligence and transparency layer for Renaiss Protocol."
  },
  {
    "id": "renaiss-intelligence-agent",
    "name": "Renaiss-Intelligence-Agent",
    "track": "AI",
    "team": "Habuskid",
    "xLabel": "@habuskiid",
    "xUrl": "https://x.com/habuskiid",
    "repoUrl": "https://github.com/Habuskid/Renaiss-Intelligence-Agent",
    "demoUrls": [
      "https://renaiss-agent.vercel.app/"
    ],
    "pitch": "An AI financial terminal that combines live Renaiss card data with LLM-generated market analysis.",
    "description": "Renaiss Intelligence Agent is an AI-powered financial terminal that helps collectors and investors determine the fair market value of physical trading cards using real-time data and LLM-driven market analysis.",
    "renaissRelation": "Renaiss Intelligence Agent is built entirely on top of the Renaiss Index API, utilizing it as the core data backbone for our platform. We deeply integrated several API features to power the terminal:\n 1. Index API & Search: We utilize the `/v1/search` endpoint to allow users to dynamically query the Renaiss ecosystem for specific physical assets (like Pokémon and One Piece cards) in real-time.\n 2. Collector & Trading Data: Once an asset is selected, our app calls the `/v1/cards/...` endpoints to fetch comprehensive, live market data. We extract the asset's structural metadata, recent transaction history (`trades`), and 30-day historical pricing trends (`fmvSeries`).\n 3. AI Synergy: Rather than just displaying this raw Renaiss data, our project takes the Index API's trading and pricing data and feeds it directly into an LLM (Gemini). The AI analyzes the Renaiss protocol's pricing deltas and observation counts to synthesize a unique, human-readable market insight, generating a custom \"Conviction Rating\" and \"Buy Window\" for the collector.\n By leveraging the Renaiss Index API, we were able to transform raw blockchain and market data into a polished, AI-driven financial tool for the collectible community.",
    "testInstructions": "Live Deployment Testing (Recommended):\n You do not need to install or run anything locally! The project is fully deployed and live.\n 1. Visit our live URL: `https://renaiss-agent.vercel.app/`\n 2. On the home page, you will see a grid of live \"Featured Assets\" pulled directly from the Renaiss Index API. Click on any card (e.g., \"Luffy & Ace\").\n 3. Alternatively, use the search bar to look up a character like \"Charizard\" or \"Pikachu\" and select a result from the dropdown.\n 4. Once on the asset's dashboard, explore the real-time Trade History and Fair Market Value charts. \n 5. To test the AI: Look at the \"Ready for AI Analysis\" panel on the right side. Click the   \"Generate Insight\" button. The app will send the asset's live trading data to Gemini to generate a custom market evaluation.\n\n Note on AI Testing: We purposely placed the AI behind a manual \"Generate Insight\" button rather than running it automatically. Because we are using the Gemini Free Tier API (limited to 15 requests/minute globally), this ensures judges can browse the UI freely without exhausting the quota! If you see the \"Free Tier API\" badge pulsing, please just click the generate button once per asset.\n\nLocal Setup (Optional):\n  If you prefer to run the code locally:\n  1. Clone the repository and run `npm install`\n  2. Create a `.env` file at the root. You must provide your own API keys to test locally:\n    `VITE_RENAISS_API_KEY=your_key`\n    `VITE_RENAISS_API_SECRET=your_secret`\n    `VITE_GEMINI_API_KEY=your_google_ai_key`\n 3. Run `npm run dev` and navigate to `http://localhost:5173`.",
    "judgeNotes": "We wanted this project to feel less like a typical hackathon prototype and more like a production-ready, enterprise-grade product. To achieve this, we focused heavily on three areas:\n\nPremium Design & UX: We built a custom design system utilizing glassmorphism, dynamic mesh gradients, and subtle micro-animations. Our goal was to make a financial terminal that feels visually stunning and highly responsive, proving that data-heavy web3 tools don't have to look boring.\n\nRobust Error Handling: We built comprehensive UI error states to gracefully handle missing APIs, 404s, and strict rate limits (e.g., differentiating between a 404 Not Found and a 429 Rate Limit Exceeded). If an API fails, the user is presented with a beautiful, actionable fallback screen rather than a broken layout."
  },
  {
    "id": "flip-or-fold",
    "name": "FlipOrFold",
    "track": "Game",
    "team": "adn18",
    "xLabel": "@degenanddev",
    "xUrl": "https://x.com/degenanddev",
    "repoUrl": "https://github.com/degenanddev/flipOrFold",
    "demoUrls": [
      "https://flip-or-fold.vercel.app/"
    ],
    "pitch": "A 60-second lane-trading game that teaches collectors to spot deals using card prices and market context.",
    "description": "Flip or Fold is a browser-based lane-trading game for TCG collectors and traders. In 60-second runs, two real cards (Pokémon and/or One Piece) roll toward you with shop prices — you pick a lane to buy or let it pass, trying to spot deals where market value beats what you pay.\n\nIt’s built for collector-economy users: casual players who want a fast, fun “flip or fold” loop, and more serious collectors who want real market context via the Card Dex ( Renaiss graded slabs,SilphCo sales/TV-WAP,). Include in-game shop with upgradable bonus, skins etc Optional BSC wallet checkout unlocks premium in-game bonuses for players who already use crypto.",
    "renaissRelation": "Flip or Fold is a collector-economy game + research tool built around Renaiss’s real-world graded collectible data.\n\nRenaiss OS Index API\n\nPlayers can run with a Renaiss graded card pool in-game (contains high-value slabs for more market context), not just generic TCG art.\nCard Dex uses Renaiss for on-demand graded search and card detail; every hit links out to index.renaissos.com.\nCollector & trading data\n\nGame profit/loss is based on market value vs shop price — teaching the same “deal or pass” instinct collectors use.\nCard Dex layers Renaiss graded pricing on top of raw market APIs (SilphCo, TCGdex), so users see raw market data and Renaiss-indexed slab values side by side.\nGame experience for the Renaiss ecosystem\n\n60-second lane-trading runs make collectible pricing tangible and fun for newcomers.\nMeta progression (coins, shop, leaderboard) keeps players in a loop while exposing them to real card names, sets, and values from the Renaiss index.\nBNB Chain / collector payments\n\nOptional BSC wallet checkout (testnet) for premium bonuses — aligned with Renaiss’s BNB Chain RWA/collector economy, with server-side tx verification.\nWhat we don’t do\n\nWe don’t ingest private user data from Renaiss; we only use public Index API endpoints, rate-limited and button-triggered in the browser.\nIn-game dollar amounts are scaled for play; Card Dex clearly separates live Renaiss graded data from simulated run prices.\nIn short: Flip or Fold turns Renaiss Index graded collectible data into something people can play, browse, and learn from — a game-shaped on-ramp to the Renaiss collector economy.",
    "testInstructions": "https://flip-or-fold.vercel.app/",
    "judgeNotes": "In-game $ prices are simulated for fun ( but the profit is based on real price from when the project has been done)\nCard Dex shows real market / Renaiss graded data with sources labeled.\nRenaiss live search is button-triggered (API quota).\nAlso, i asked many time for a whitelisted access as 10 request a day is terrible for a hackathon, in vain...\n\nNot financial advice — hackathon demo only."
  },
  {
    "id": "tessera",
    "name": "Tessera",
    "track": "Tool",
    "team": "bensage",
    "xLabel": "@bensage",
    "xUrl": "https://x.com/bensage",
    "repoUrl": "https://github.com/Chimdalu-Ofoegbu/Tessera",
    "demoUrls": [
      "https://www.tesseraindex.xyz/"
    ],
    "pitch": "A market intelligence terminal that adds transparent category risk scores to live Renaiss Index data.",
    "description": "Tessera is a market intelligence terminal for graded trading cards, basically a Bloomberg terminal lite for the Renaiss collector economy. It shows live category indices from the Renaiss Index plus the one thing Renaiss doesn't give you: a transparent 0-100 risk score per category, broken into liquidity, volatility, concentration and data confidence.\n\nIt's for collectors sanity-checking fair value before buying or selling, traders watching momentum and risk shifts, and community operators keeping an eye on market health. Every number on screen carries its source, timestamp and confidence, and thin data renders as \"insufficient data\" instead of a made up value.",
    "renaissRelation": "The entire data layer runs on the Renaiss Index API. I pull the game level index tiles from /v1/indices, per category detail and constituents from /v1/indices/{game}, and liveness from /v1/health, then compute a reproducible index (rebased to 100) and the risk score on top of that real data. Renaiss provides the price, confidence and freshness signals, Tessera adds the risk lens it doesn't have.\n\nThe public tier is capped at 10 requests a day, so production serves a cached snapshot of the live API instead of proxying every visitor, which respects the rate limit and keeps the demo reliable. The scored data is re-exposed as a public JSON API with provenance on every metric, so other Renaiss builders can consume it. The adapter is one wiring point, so partner keys or new Renaiss games drop in without touching anything else.",
    "testInstructions": "No setup needed: open https://www.tesseraindex.xyz (no login, no wallet). Click Enter Terminal, open Pokemon or One Piece, hover the index chart, and expand the risk panel to watch the four factors reconcile to the headline score. \n\nThe public API is worth a look too: https://www.tesseraindex.xyz/api/overview.json shows every metric wrapped in a provenance envelope.\n\nTo run locally: clone https://github.com/Chimdalu-Ofoegbu/Tessera, then pnpm install and pnpm dev (localhost:5173). pnpm test runs 49 unit tests covering the risk and index engines.\n\nLocal dev uses clearly labeled seed fixtures by default so it never burns the Renaiss rate limit, and USE_RENAISS=1 switches it to the live API.",
    "judgeNotes": ""
  },
  {
    "id": "taste-sentinel",
    "name": "Taste Sentinel",
    "track": "AI",
    "team": "@chivest1",
    "xLabel": "@Chiboy0123",
    "xUrl": "https://x.com/Chiboy0123",
    "repoUrl": "https://github.com/webski101/Taste-Sentinel",
    "demoUrls": [
      "https://x.com/chiboy0123/status/2075213107505377326?s=20"
    ],
    "pitch": "A market-integrity agent that scores Renaiss listings, detects suspicious cert reuse, and delivers trusted alerts.",
    "description": "Taste Sentinel; the market integrity agent for the Renaiss collector economy.\nIt scans the full Renaiss marketplace every 10 minutes, cross-validates every price against two independent Renaiss sources, and gives each deal candidate a deterministic 0–100 Integrity Score combining cert-reuse fraud detection, cross-source price validation, self-built price history, and overpricing checks. Delivered through a Telegram bot with Claude-powered Q&A, automated deal and watchlist alerts, and a SHA-256 hash-chained audit trail for full provenance.\nBuilt for Renaiss collectors who want to know not just what's cheap, but what's actually trustworthy, before they buy.",
    "renaissRelation": "The core data layer runs on the Renaiss CLI: npx renaiss marketplace powers the full-market scan every 10 minutes (~4,000+ listings, paginated and deduplicated after discovering the live sort returns overlapping rows), and npx renaiss packs feeds the pack EV monitoring.\nEvery deal candidate is cross-validated against the Renaiss Index API (api.renaissos.com/v1/graded/{cert}) using the graded-cert serial pulled from each listing — this is what makes dual-source validation possible, comparing the CLI's FMV against Renaiss's independent index price rather than trusting a single number.\nThe Integrity Score is built entirely from Renaiss's own data shapes: ownerAddress and cert serials from the CLI power cert-reuse fraud detection, askPriceInUSDT/fmvPriceInUSD power the price and overpricing signals, and repeated scans of the same CLI data build price history Renaiss doesn't expose anywhere itself.\nAlong the way, building on live beta tooling surfaced three real issues reported back to the team: a broken per-token collectible lookup (COLLECTIBLE_GET_FAILED on all flags), marketplace pagination returning duplicate rows on the live sort, and Index API cert coverage gaps — the last of which led to the CTO confirming and shipping a 10K/day hackathon rate-limit tier mid-event.",
    "testInstructions": "Live dashboard (no setup, view anytime): https://taste-sentinel.vercel.app/\nSnapshot from a real scan — dark/light themes, Integrity Score breakdowns, audit trail.\n\nTo run the full agent, including the Telegram bot:\n\ngit clone https://github.com/webski101/Taste-Sentinel\ncd Taste-Sentinel\n\n\nSet 4 environment variables:\nCLAUDE_API_KEY=your_anthropic_key      # console.anthropic.com\nTELEGRAM_BOT_TOKEN=your_bot_token      # create via @BotFather\nTELEGRAM_CHAT_ID=your_chat_id          # from @userinfobot\nPOLL_INTERVAL_MS=600000\n\n\nThen:\nnode index.js\n\n\nDashboard runs at http://localhost:3000. First scan takes ~5 minutes. Zero npm dependencies — Node.js 18+ built-ins only, nothing to install beyond Node itself.\n\nSafe no-setup test modes:\nnode index.js --dry-run   # one scan, prints results, no writes/alerts\nnode index.js --verify    # verifies the audit log's hash chain and exits\n\nFull technical writeup and known limitations are in the README.",
    "judgeNotes": "The Renaiss Index API's public tier is rate-limited, so dual-source-confirmed deals may show low counts depending on current coverage at test time — the Integrity Score is designed for this directly, with an \"unverified\" penalty tier rather than pretending confidence it doesn't have.\n\n The Renaiss CLI's per-token collectible lookup (npx renaiss card <tokenId>) is broken in the current beta on all flags — reported to the team — so all per-card detail in this project comes from the marketplace listing data and the Index API instead."
  },
  {
    "id": "chainsight",
    "name": "ChainSight",
    "track": "AI",
    "team": "hancrypto_2fa",
    "xLabel": "@Hancrypto_2fa",
    "xUrl": "https://x.com/Hancrypto_2fa",
    "repoUrl": "https://github.com/Hanhoclamdev/chainsight",
    "demoUrls": [
      "https://chainsight-xi.vercel.app/"
    ],
    "pitch": "An AI market assistant for natural-language card discovery, movers, trades, price history, and graded valuation.",
    "description": "ChainSight is an AI-powered card market intelligence assistant built for collectors and traders. Users can ask natural-language questions, discover cards, explore market movers and recent trades, and inspect individual cards for deeper market analysis. ChainSight aggregates multiple signals from the Renaiss Index API, including card search, market indices, featured movers, recent trades, price history, and graded-card valuation, and presents them through an interactive, judge-friendly interface.",
    "renaissRelation": "ChainSight is built directly on top of the Renaiss Index API and uses Renaiss market data as its core data layer.\n\nThe project uses Renaiss endpoints to search indexed cards, retrieve market indices, discover featured movers, inspect recent trades, analyze 30-day price history, and access graded-card valuation data.\n\nInstead of presenting raw API responses, ChainSight combines these Renaiss data signals into an interactive AI-assisted market intelligence experience. Users first discover relevant cards through natural-language queries, then select individual cards to inspect deeper market signals and analysis.\n\nThe goal of ChainSight is to demonstrate how Renaiss developer infrastructure can be used to build accessible AI-powered analytics tools for collectors and traders.\n\nBecause the Renaiss Index API is currently in beta, ChainSight clearly identifies Renaiss as the data source and treats API outputs as experimental market references rather than verified financial advice.",
    "testInstructions": "The easiest way to test ChainSight is through the hosted demo link. No account or local setup is required.\n\n1. Open the demo website.\n\n2. Try a natural-language question such as:\n\"How much is Charizard worth?\"\n\"Which cards are trending?\"\n\"Search for Pikachu cards.\"\n\"Give me an AI analyst report for Pikachu.\"\n\n3. ChainSight will query Renaiss Index API data and display relevant card results.\n\n4. Click any card result to open deeper market intelligence for that card, including available valuation data, market context, recent trade signals, 30-day price history, and related card signals.\n\n5. Try the other suggested prompts to explore market indices, featured movers, recent trades, price trends, and graded-card valuation workflows.\n\n6. Use the fullscreen button in the interactive demo for the best presentation experience.\n\nFor local testing, clone the GitHub repository, configure the required Renaiss API credentials as described in the README, start a local server, and open the application in a browser.\n\nRenaiss Index API data is currently in beta, so some cards or signals may have incomplete, delayed, or unavailable data.",
    "judgeNotes": "ChainSight was designed to explore a simple question: how can Renaiss market data become easier to understand and use?\n\nRather than building a traditional dashboard that only displays raw API responses, ChainSight provides a conversational discovery layer and an interactive analysis workflow on top of the Renaiss Index API.\n\nA key part of the project is multi-signal analysis. Card search, market indices, featured movers, recent trades, price history, and graded-card data can be combined to provide richer context when users inspect a card.\n\nThe project is an experimental prototype built on beta Renaiss infrastructure. Market outputs may be incomplete or delayed and should be treated as informational references, not financial advice.\n\nThank you for reviewing ChainSight."
  },
  {
    "id": "arenaiss",
    "name": "Arenaiss",
    "track": "Game",
    "team": "ducky_56789",
    "xLabel": "@Ducky1st",
    "xUrl": "https://x.com/Ducky1st",
    "repoUrl": "https://github.com/duclucky/arenaiss",
    "demoUrls": [
      "https://arena-card.xyz/"
    ],
    "pitch": "A browser card battler that turns Renaiss pack discovery and graded-card data into a simulated draft-and-battle loop.",
    "description": "Arenaiss is a browser card-battler that turns Renaiss-style pack discovery into a playable draft-and-battle loop. Players open simulated packs, collect fictional cards built from real graded-card metadata, assemble a 5-card lineup, and fight a skill-based Top-Trumps duel for virtual credits, then open any card's real-data Card Passport. It is made for collectors and newcomers who want to understand the Renaiss ecosystem (graded collectibles, custody, pricing references) through play instead of a static page. Everything is read-only and simulated: no wallet, no real money, no on-chain transactions.",
    "renaissRelation": "Arenaiss is built directly on Renaiss data and mirrors its core mechanic. It uses three Renaiss sources, all through server-side read-only proxies. First, the Marketplace API (api.renaiss.xyz) supplies the real graded-card pool, card metadata, the real pack catalog, and Card Passport provenance and custody. Second, the official @renaiss-protocol/client public client handles Renaiss reads. Third, the Renaiss OS Index API (api.renaissos.com) provides the reference pricing, confidence, and market movement shown in the Passport (attributed to \"Renaiss OS Index\"). The gacha-as-draft loop mirrors real Renaiss packs: the in-game Eden, OMEGA, and RenaCrypt packs are modeled on the real ones, and every card's Card Passport links back to the real Renaiss packs and marketplace. This makes the game an onboarding funnel into the ecosystem rather than a standalone toy.",
    "testInstructions": "Easiest path, the live demo: open https://arena-card.xyz, click Register and create a demo account (just a username and password, no email), open the free Welcome Pack (5 cards), go to Lineup, pick a Pokemon or One Piece arena and select 5 cards, start a battle and choose ATK, DEF, or AURA each round (watch the type-advantage colors and the battle log), then open any card's Card Passport to see real reference data. Pack opening is login-gated so progress saves server-side.\n\nRun locally: git clone https://github.com/duclucky/arenaiss && cd arenaiss && npm install, then create .env.local from .env.example (set AUTH_SECRET; optionally add RENAISS_INDEX_API_KEY and RENAISS_INDEX_API_SECRET for live Index pricing, and PASSPORT_AI_* for the AI insight), then run npm run dev and open http://localhost:3000. Verification commands: npm run typecheck, npm run build, npm run test:unit.",
    "judgeNotes": "Safety was designed in, not added on. The app is strictly read-only (only GET and the public client, never a signer, private key, pullGacha, buyback, or createSecureClient), all API keys stay server-side (verified by scanning the production client bundle), the economy is virtual, and game stats are explicitly fictional (never presented as valuation or advice). The battle is skill-based, not pay-to-win: type-advantage is the strongest lever, and self-play tests show a skilfully played low-tier lineup beats a high-tier one about 42% of the time. Repo: https://github.com/duclucky/arenaiss. Production direction: the same loop is designed to graduate from simulated cards to wallet-verified real Renaiss cards in a future wallet-native arena."
  },
  {
    "id": "steel",
    "name": "Steel",
    "track": "Tool",
    "team": "youthisman",
    "xLabel": "@youthisman",
    "xUrl": "https://x.com/youthisman",
    "repoUrl": "https://github.com/youthisguy/Aether-backend",
    "demoUrls": [
      "https://t.me/aether_scanner_bot",
      "https://aether-backend-vs0i.onrender.com/dashboard"
    ],
    "pitch": "A Telegram bot and live dashboard for personalized marketplace alerts and real-time gacha pack EV tracking.",
    "description": "Aether Scanner is a Telegram bot + live web dashboard that provides personalized marketplace alerts and real-time pack EV tracking for Renaiss collectors. Users can create custom watchlists (set/grade/price) and receive targeted alerts, while monitoring Expected Value trends across gacha packs before buying.",
    "renaissRelation": "Aether Scanner is built on the official renaiss CLI. It leverages the CLI for marketplace data, pack information, and owner indexing to deliver real-time personalized alerts and EV analytics. It connects deeply with Renaiss collector tools by turning raw protocol data into actionable, low-noise insights, helping collectors make better buying and pack-opening decisions.",
    "testInstructions": "Quick Test:\nGo to the Telegram bot: https://t.me/aether_scanner_bot\nType /start\nUse the buttons to explore features\n\nSelf-Host Setup:\ngit clone https://github.com/youthisguy/Aether-backend.git\ncd Aether-backend\ncp .env.example .env\n# Add your Telegram BOT_TOKEN\nnpm install\nnpm start",
    "judgeNotes": "Core premise: Personalized watchlists + proactive pack EV tracking (most existing tools are reactive).\nbuilt to be extensible via REST API.\nFocused on solving real collector pain points: information overload and poor pack-buying decisions."
  },
  {
    "id": "renaiss-collector-arena",
    "name": "Renaiss Collector Arena",
    "track": "Game",
    "team": "karu_chibi",
    "xLabel": "@edwordkaru",
    "xUrl": "https://x.com/edwordkaru",
    "repoUrl": "https://github.com/edwordkaru/Renaiss-Collector-Arena",
    "demoUrls": [
      "https://renaiss-collectors-arena.onrender.com"
    ],
    "pitch": "A multiplayer mini-game that lets players practice collectible trading before entering real-asset markets.",
    "description": "It's a mini games that let player simulate how trading with TCG",
    "renaissRelation": "Renaiss about RWA in collectibles, so i guess my games is very suit for the brand. Because user can learn how to trading collectibles items, before they're entering the real asset worlds",
    "testInstructions": "thru website only without installing anything. Move to profile save names, and create a room or play with AI, ENJOY",
    "judgeNotes": "nope"
  },
  {
    "id": "renaiss-rwa-sniper",
    "name": "RENAISS RWA Sniper Terminal · 狙击终端",
    "track": "Tool",
    "team": "cyberpunk_._",
    "xLabel": "@brc20_btc_",
    "xUrl": "https://x.com/brc20_btc_",
    "repoUrl": "https://github.com/lenmu168/renaiss-rwa-sniper",
    "demoUrls": [
      "https://cool-ui-design-459a56.surf.computer/"
    ],
    "pitch": "An AI discovery terminal for scanning graded-card listings and surfacing rarity patterns and FMV opportunities.",
    "description": "RENAISS RWA Sniper Terminal is an AI-powered digital asset intelligence and discovery platform built for Renaiss marketplace users, collectors, and traders. It scans graded-card marketplace assets, analyzes certificate serial numbers and rarity patterns, and identifies high-value opportunities including Grail Cards, Fancy Numbers, and Consecutive Chains. The platform helps users discover undervalued assets by comparing market listings with estimated FMV signals, turning manual searching into an automated intelligence workflow.",
    "renaissRelation": "Our project is built around the Renaiss graded-card RWA marketplace ecosystem. It connects with Renaiss marketplace data through the Renaiss Marketplace API to collect available card listings and analyze asset information.\n\nThe platform leverages Renaiss collector and trading data concepts by processing certificate serial numbers, card metadata, and marketplace signals to identify hidden value patterns. It applies custom intelligence logic on top of Renaiss asset data to discover Grail Cards, Fancy Numbers, and Consecutive Chains that may have premium market value.\n\nRENAISS RWA Sniper Terminal extends the Renaiss experience by providing an intelligence layer that helps collectors and traders discover opportunities more efficiently.",
    "testInstructions": "Judges can evaluate the project through the live demo, demo video, and GitHub repository.\n\nLive Demo:\nhttps://cool-ui-design-459a56.surf.computer/\n\nDemo Video:\nhttps://youtu.be/QT0b-Oj8tH0\n\nGitHub Repository:\nhttps://github.com/lenmu168/renaiss-rwa-sniper\n\nThe live demo provides the primary user experience, allowing judges to explore the RENAISS RWA Sniper Terminal interface, asset discovery workflow, rarity detection logic, and FMV-oriented opportunity analysis.\n\nFor technical review, judges can inspect the GitHub repository, which contains:\n- README.md with project overview and documentation\n- frontend/ for the user interface\n- backend/ for application services\n- psa_sniper.py containing the core asset scanning and analysis engine\n- market_cache.json containing sample marketplace data for analysis\n\nTo run the project locally:\n\n1. Clone the repository:\ngit clone https://github.com/lenmu168/renaiss-rwa-sniper.git\n\n2. Install dependencies for the frontend and backend.\n\n3. Start the frontend and backend services according to the setup instructions in README.md.\n\n4. Run the Python scanning engine if testing the standalone analysis workflow:\n\npython psa_sniper.py\n\nNo test account or additional credentials are required. Judges can directly access the live demo without registration.",
    "judgeNotes": "RENAISS RWA Sniper Terminal focuses on solving a key challenge in digital asset marketplaces: finding valuable opportunities hidden inside large amounts of trading data.\n\nInstead of relying only on manual research, our system combines marketplace intelligence, rarity pattern recognition, and FMV-oriented analysis to help collectors make faster and smarter decisions.\n\nThe project demonstrates how AI-powered analysis can enhance the Renaiss ecosystem by transforming raw marketplace data into actionable insights."
  },
  {
    "id": "renaiss-card-story",
    "name": "Renaiss Card Story",
    "track": "Tool",
    "team": "dada_64060",
    "xLabel": "@dugd127411",
    "xUrl": "https://x.com/dugd127411",
    "repoUrl": "https://github.com/Mario11761/Renaiss-Card-Story",
    "demoUrls": [
      "https://youtu.be/Jwf34no3iHc?si=FuYS4Oo8QhKB1Ong"
    ],
    "pitch": "A card lookup and display tool that turns Renaiss card data into AI-generated collectible stories.",
    "description": "Project Functionality\n\nRenaiss Card Story is a digital collectible card display platform, primarily offering functions such as collectible card information query, card detail display, and AI content generation. Users can quickly query collectible card information by entering the PSA number or Token ID, view card images, names, grades, and related attributes, and utilize AI to generate different styles of text stories based on the card content, enhancing the interactive experience of digital collectible cards. The system also supports saving generated content for convenient later viewing and management.\n\nTarget Users\n\nThis project primarily targets the following user groups:\n\nDigital collectible card enthusiasts: Quickly query and browse detailed collectible card information to enrich the collecting experience.\n\nNFT and digital collectible users: Understand the basic information of digital collectible cards and obtain more engaging content through AI.",
    "renaissRelation": "Currently in use:\n\nRenaiss Card Data API\n\nPSA Number/Token ID Query\n\nCard metadata display (image, name, level, etc.)\n\nAI content generation based on card data\n\nFuture expansion:\n\nRenaiss Index API\n\nCard Tools\n\nTrading Data\n\nCommunity Tools\n\nGame Experience",
    "testInstructions": "Environment Requirements\n\nNode.js 18.x or later\n\nnpm 9.x or later\n\nSteps\n\n1. Clone the project\n\ngit clone <project repository address>\n\n2. Install project dependencies\n\nFrontend:\n\ncd frontend\nnpm install\n\nBackend:\n\ncd backend\nnpm install\n\n3. Configure environment variables (optional)\n\nTo experience the AI ​​content generation function, create a .env file in the backend directory and configure the corresponding AI interface information:\n\nPORT=3000\nAI_API_KEY=your API_KEY\n\nIf the AI ​​API is not configured, the project can still use the collection card query and display function normally, but the AI ​​content generation function will not be available.\n\n4. Start the backend\n\nnpm run dev\n\n5. Start the frontend\n\ncd frontend\nnpm run dev\n\n6. Open your browser and access\n\nhttp://localhost:5173\n\nTest Process\nEnter the PSA number or Token ID on the homepage.\n\nClick Query to view the collection card details.\n\nChoose an AI content generation style.\n\nClick \"Generate Content\" to experience AI generating text stories based on your favorite cards.\n\nNo account registration or login is required to experience this project.",
    "judgeNotes": "Renaiss Card Story is a digital collectible card display platform developed using a React + Express front-end/back-end separation architecture, aiming to enhance the display and interactive experience of digital collectible cards.\n\nBased on collectible card data provided by the Renaiss Protocol, the project implements core functions such as collectible card search, card information display, and AI content generation. By combining AI with digital collectible cards, static collectible card information can generate creative and engaging text content, enhancing user engagement and the collecting experience.\n\nThe entire project adopts a modular design with a clear code structure, exhibiting good maintainability and scalability. Future development will allow for the integration of more capabilities from the Renaiss Protocol, such as the Index API, transaction data, and community tools, continuously improving the digital collectible ecosystem experience.\n\nThank you to all the judges for experiencing this project; we look forward to receiving your valuable feedback and suggestions."
  },
  {
    "id": "collectiq",
    "name": "CollectIQ",
    "track": "AI",
    "team": "sanjay331/hcylks1",
    "xLabel": "@sanjay_sonny",
    "xUrl": "https://x.com/sanjay_sonny",
    "repoUrl": "https://github.com/sanjassan/CollectIQ",
    "demoUrls": [
      "https://collectiq.hunghung.xyz"
    ],
    "pitch": "A pricing, risk, and true-EV dashboard that cross-checks Renaiss FMV against independent market data.",
    "description": "CollectIQ is a pricing-intelligence and risk dashboard for Renaiss collectible-card assets — Pokémon / One-Piece graded cards traded as gacha \"pack machines\" on BSC. It cross-checks Renaiss's official FMV against independent third-party market prices, computes the true expected value (EV) of every pack, tracks on-chain pack pulls in near real time, and turns verified prices into RWA / collateral primitives. It's for collectors and traders who want a trustworthy valuation before they buy or open a pack, and for DeFi builders who need an independent price feed to lend against cards. It is read-only analytics — no trading, transfers, or on-chain writes.",
    "renaissRelation": "Built directly on Renaiss's two public APIs — api.renaiss.xyz/v0 (pack machines, marketplace, holdings) and api.renaissos.com/v1 (card index, pricing, sales history) — plus Renaiss on-chain pack-pull events read from BSC Transfer logs on the public Renaiss pool contracts.\n\nIt consumes Renaiss collector & trading data (pack contents, per-tier buyback prices, official EV/FMV, marketplace listings, holder ledgers) and builds several tools on top:\n\nIndependent price oracle — verifies Renaiss's index FMV against PriceCharting (aggregated eBay sold prices) and surfaces the gap, with source labeling so an independent price is never blended with a self-reported one.\nCDP collateral simulator — dynamic LTV / liquidation price derived from verified prices.\nRWA index — track card series like a stock index; True-EV per pack; whale-wallet risk; live-pool EV back-calculation.\nIt also fixes real Renaiss data pitfalls (e.g. *InUsd fields are actually cents → divide by 100; luck value must use per-tier buyback). Fully internationalized (EN default · 中 · 日 · 한) for the wider community.",
    "testInstructions": "Public repo: https://github.com/sanjassan/CollectIQ\n\ngit clone https://github.com/sanjassan/CollectIQ\ncd CollectIQ\npython3 -m venv venv && source venv/bin/activate\npip install -r requirements.txt\ncp .env.example .env        # defaults are fine — no secrets needed to run the dashboard\npython3 dashboard.py        # http://localhost:5000  (override with DASHBOARD_PORT)\nOpen http://localhost:5000 and use the top nav: Price Verify · Price Intel · CDP · RWA Index · Oracle · On-chain Holdings · Live Pool. Language switcher is top-right (defaults to English).\n\nNotes:\n\nNo login, wallet, or test account required — nothing to sign, no transactions.\nThe app pulls live from Renaiss's public APIs, so API-backed views work immediately. Databases are gitignored (large/regenerable); to populate the on-chain / holdings views, run once: python3 scripts/grab_pack_contents.py --daily then python3 scripts/build_holdings.py (optional — set BNB_RPC in .env to a BSC RPC endpoint for on-chain sync). Without seeding, pages still load; some data panels just show empty states.\npython3 renaiss_api.py runs a quick self-test of the API wrappers.",
    "judgeNotes": "Trust-first is the core insight: on-chain RWA lending needs an independent price, not a self-reported FMV. Every value in CollectIQ is labeled by source (renaiss_index = non-independent vs pricecharting_ebay = independent, with a verifiable link).\nThe Oracle / CDP pages are a working simulation of the end goal: push verified prices on-chain so Renaiss cards become collateral-grade soft money.\nAll referenced contract addresses are public Renaiss pool contracts, verifiable on BscScan.\nRoadmap and architecture notes are in the repo (README.md, COLLECTIQ_ROADMAP.md).\nSubmission Confirmation\n\nI confirm this is our final submission for Renaiss Tech Hackathon S1, and the GitHub repository (https://github.com/sanjassan/CollectIQ) is public and accessible for review."
  },
  {
    "id": "team-arr",
    "name": "Team ARR",
    "track": "Game",
    "team": "@arr_kr",
    "xLabel": "@arr_kr",
    "xUrl": "https://x.com/arr_kr",
    "repoUrl": "https://github.com/Arrkr/vinci-vault-battle",
    "demoUrls": [
      "https://arrkr.github.io/vinci-vault-battle/"
    ],
    "pitch": "A browser-playable card battle where players open packs, build a star-limited deck, and fight inside a collector vault.",
    "description": "Vinci Vault Battle is a browser-playable collector card battle prototype for Renaiss community users. Players open packs, collect FMV-based cards, build a star-limited deck, battle inside a vault, earn VP rewards, unlock skins, and export feedback for future community iteration.",
    "renaissRelation": "The project explores how Renaiss-style collector data can become a playable game loop. It uses pack opening, rarity, FMV, card valuation, market scan signals, vault custody, proof logs, and collection dashboards as core gameplay systems. The current demo uses local mock data, but the UI is designed to connect with Renaiss Index API, card details, valuation data, listings, sales history, and future community/game tools.",
    "testInstructions": "No installation is required. Open the demo link in a browser:\nhttps://arrkr.github.io/vinci-vault-battle/\n\nRecommended test path:\n1. Click “ENTER THE VAULT”.\n2. Use “Load demo kit” for the fastest review path.\n3. Open a pack and reveal cards.\n4. Inspect cards in “My Collection”.\n5. Review the star-limited auto deck preview.\n6. Start a battle, use Market Scan, and finish a match.\n7. Open Profile, Leaderboard, Tutorial, and Feedback screens.\n\nThe game stores progress locally in the browser with localStorage.",
    "judgeNotes": "This is a hackathon prototype and unofficial Renaiss-concept fan project. The focus is to show a complete playable slice: pack opening, collection value, deck strategy, battle rewards, profile progression, and feedback collection. Real server sync, live PvP, trading, and official Renaiss API integration are planned future extensions once production API fields and access are finalized."
  },
  {
    "id": "renaiss-collector-table",
    "name": "mg",
    "track": "Game",
    "team": "_._mingyu_._",
    "xLabel": "@mingyu_wtf",
    "xUrl": "https://x.com/mingyu_wtf",
    "repoUrl": "https://github.com/mingyu-wtf/renaiss-collector-table",
    "demoUrls": [
      "https://renaiss-collector-table.vercel.app/"
    ],
    "pitch": "A collector game suite that turns PSA, FMV, rarity, and value signals into poker, crane, slot, and roulette experiences.",
    "description": "Renaiss Collector Table is a playable collector game experience for card collectors and game users. It turns card signals such as PSA grade, FMV, rarity, and collector value into a Hold’em-style poker table, Collection Vault, crane machine, slot machine, roulette, and final match summary.",
    "renaissRelation": "The project explores how Renaiss-style collector data can become interactive gameplay. For this hackathon demo, I used local mock card data and built the UI/data structure needed for future Renaiss Index API integration.\n\nThe Collection Vault includes an Index Signal panel that shows FMV, PSA grade, rarity tier, collector strength, data source, and API-ready reference badges. The current version is not a full live API integration yet, but it is structured so local mock fields can later be replaced with Renaiss Index API or CLI-powered collector data once stable endpoints and required fields are available.\n\nThe goal is to show how Renaiss Protocol-related card, collector, and market signals can power game experiences instead of staying as static data.",
    "testInstructions": "Judges can test the live demo through the Vercel link.\n\nRecommended demo flow:\n1. Open the app.\n2. Start Hold’em Table.\n3. Play a few poker hands and view the Match Summary.\n4. Open Collection Vault and click cards to inspect PSA, FMV, rarity, and Index Signal data.\n5. Try Collection Crane, Slot Machine, and Renaiss Roulette from the main screen.\n6. Use the BGM toggle in the top-right area if needed.\n\nLocal setup:\nnpm install\nnpm run dev\n\nProduction build:\nnpm run build\n\nNo test account is required. Collector Chips are fictional in-game points only.",
    "judgeNotes": "This demo does not include real-money betting, deposits, withdrawals, trading, or financial advice. Market values are gameplay/reference signals using local mock data.\n\nThe project focuses on the Game Track idea: making collector and market signals playable. The Renaiss Index API integration is represented through an API-ready Index Signal UI and local data adapter structure, with the next step being replacement of mock data with real Renaiss API data when stable fields and endpoints are confirmed."
  },
  {
    "id": "team-slabscan",
    "name": "Team SlabScan",
    "track": "Tool",
    "team": "chekwubepeters",
    "xLabel": "@ChekwubePeters",
    "xUrl": "https://x.com/ChekwubePeters",
    "repoUrl": "https://github.com/Chekwube-Peters/SlabScan",
    "demoUrls": [
      "https://slabscan-pi.vercel.app/"
    ],
    "pitch": "A slab-photo scanner that identifies graded cards, prices them through Renaiss OS Index, and explains the market context.",
    "description": "SlabScan turns any graded trading card into an instant, intelligent valuation. Point your phone at a PSA, CGC, or BGS slab and SlabScan reads the card off the photo, prices it against the Renaiss OS Index, and layers an AI analyst read on top, telling you whether the grade is worth its premium over the grade below, how liquid the card actually is at that price, and a clear verdict: hold, sell, chase, or pass.\n\nIt's built for collectors who are tired of scanner apps that spit out a number with no context. Instead of just a price, SlabScan gives you the reasoning a sharp collector friend would, grounded in Renaiss's cross-sourced valuation data, not guesswork, and packages it into a shareable read you can drop straight into your community.",
    "renaissRelation": "SlabScan runs entirely on the Renaiss OS Index API (/v1/graded/by-image): a photo of a slab gets OCR'd against Renaiss's cert database for authoritative card/grade identification, then priced via Renaiss's live marketplace crawl (SNKRDunk, Alt) for a real-time fair-market-value with confidence scoring, not a static price guide. Renaiss's own pipeline stages stream live via SSE straight into the UI, so users watch identification and pricing happen in real time. An optional Claude-powered \"taste call\" (HOLD/SELL/CHASE/PASS) sits on top, reasoning over the Renaiss valuation's price, confidence, and freshness.",
    "testInstructions": "Just visit the live app, no setup needed: https://slabscan-pi.vercel.app\n\nNo login or test account required. On mobile, tap \"Scan a card\" and take a photo of any graded slab (PSA/BGS/CGC) with the label and card both visible; on desktop, the same button opens a file picker to upload a photo instead. The app is running in full live mode, real Renaiss OS Index identification and pricing, plus a Claude-generated taste call (HOLD/SELL/CHASE/PASS).\n\nNote: if a card hasn't been priced by Renaiss recently, the first scan of it can take 1–2 minutes while Renaiss crawls live marketplace sales, that's expected, not a bug; a repeat scan of the same card afterward returns almost instantly from cache. To test that fast path, scan a common card twice in a row.\n\n(For code review: the repo is at https://github.com/Chekwube-Peters/SlabScan, api/value-card.js is the Renaiss proxy, api/taste.js is the Claude integration, src/SlabScan.jsx is the main scan flow.)",
    "judgeNotes": "No"
  },
  {
    "id": "renaiss-alpha-radar",
    "name": "Renaiss Alpha Radar",
    "track": "Tool",
    "team": "falloutfushe",
    "xLabel": "@crypto_fallout",
    "xUrl": "https://x.com/crypto_fallout",
    "repoUrl": "https://github.com/ifallout101i-renaiss/renaiss-alpha-radar",
    "demoUrls": [
      "https://youtube.com/shorts/pQobmyCMXOE?feature=share"
    ],
    "pitch": "面向 Renaiss RWA 生态的 AI 资金情报系统，用于发现低估资产、追踪巨鲸并生成实时 Alpha 预警。",
    "description": "Renaiss Alpha Radar 是一款专为 Renaiss RWA 生态系统打造的 AI 智能资金情报系统。\n\n它监控市场活动、收藏品走势和市场信号，以发现被低估的资产、追踪巨鲸的行为，并为收藏家、交易者和社群生成实时 Alpha 预警。",
    "renaissRelation": "Renaiss Alpha Radar 以 Renaiss 生态系统为核心，利用生态系统数据、市场活动、可收集信息和交易信号构建而成。\n\n该项目将 Renaiss 数据源与人工智能驱动的分析相结合，将原始的生态系统活动转化为可执行的情报。\n\n它展示了如何利用 Renaiss 开发工具、CLI 功能和可收集数据来创建全新的原生人工智能 RWA 体验。",
    "testInstructions": "Judges can test the project by cloning the GitHub repository:\n\ngit clone https://github.com/ifallout101i-renaiss/renaiss-alpha-radar.git\n\nInstall dependencies:\n\npip install -r requirements.txt\n\nRun:\n\npython renaiss-alpha-radar.py\n\nThe terminal will start the Renaiss Alpha Radar monitoring engine and display real-time scanning activity.\n\nThe project can also be verified through the provided demo video.",
    "judgeNotes": "Renaiss Alpha Radar 致力于为 Renaiss RWA 生态系统构建智能层。\n\n它不仅展示区块链数据，更通过人工智能分析、机会检测和社区警报，将生态系统活动转化为可执行的洞察。\n\n该项目旨在让 RWA 市场更易于理解，并方便收藏家和交易者参与。"
  }
];

export const PROJECTS = Object.freeze(
  PROJECT_DATA.map((project) =>
    Object.freeze({
      ...project,
      coverUrl: `/assets/projects/${project.id}.webp`,
      demoUrls: Object.freeze([...project.demoUrls]),
    }),
  ),
);

export const PROJECT_IDS = Object.freeze(PROJECTS.map(({ id }) => id));
