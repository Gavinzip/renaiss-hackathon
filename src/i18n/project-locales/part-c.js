export const PROJECT_TRANSLATIONS_C = Object.freeze({
  'zh-Hant': Object.freeze({
    'team-index': Object.freeze({
      pitch: '一個 AI agent 層，將 Renaiss 的 marketplace、pack、portfolio、FMV 與鏈上資料轉化為研究、估值、驗證及更安全的交易工具。',
      description: `Index 是建構於 Renaiss 之上的 AI 驅動層，可協助收藏家與 agent 研究、估值、驗證並安全交易真實世界收藏品。它將分散的 marketplace、定價、pack 與鏈上資料，轉換成可供人類與 AI 使用的結構化工具。

透過 Index，收藏家可以：

◉評估錢包內資產的價值
◉尋找定價過低的上架項目
◉比較直接購買與從 pack 抽取
◉計算 pack 的預期價值
◉驗證保管及鏈上資料
◉產生安全的交易提案

Renaiss 將收藏品帶上鏈，Index 則賦予它們智慧。`,
      renaissRelation: `Index 是一個以 Renaiss Protocol 資料為基礎的 AI agent 層。

它將 Renaiss 上架資料、pack 機率、portfolio、FMV 歷史及鏈上資金池承諾資料，轉換成 9 項可讓 AI agent 透過開放式 MCP server 使用的工具。

主要工具包括：

* Pack 預期價值與風險
* Rip-or-buy 建議
* 錯價上架偵測
* Portfolio 估值
* 市場洞察
* 鏈上 Merkle root 驗證

每項結果都包含其資料來源、時間戳與限制。Index 也包含 The Curator——一個以收藏家為核心的 AI agent——以及 agent-to-agent 交易示範。

提供 API access 時，它會使用即時 Renaiss 資料；離線評審時，則使用有清楚標示的 snapshot 資料。`,
      testInstructions: `需求：Node.js 20+。無需帳號或 API key。

git clone https://github.com/Enoch208/Index
cd Index
npm install
npm test
npm run dev

測試套件應顯示 42 項測試通過。開啟：

http://localhost:3000/dashboard

評審可以測試：

* Curator 對話
* Portfolio 估值
* 錯價掃描器
* Rip-or-buy 分析
* Pack EV
* 公平性驗證

範例資料：

* Wallet: 0xdemo
* Pack: eden-pack
* Cards: charizard-base-psa9-014, eevee-heroes-psa10-001

使用以下命令執行 MCP server：

npm run mcp

選用的環境變數可啟用即時 Renaiss 資料、AI 對話及鏈上驗證。

線上示範：https://useindex.vercel.app`,
      judgeNotes: '無',
    }),
    dokipoki: Object.freeze({
      pitch: '一款商家 copilot，將 Renaiss 市場與庫存資料轉化為交易卡牌商店的 Promote、Hold 和 Clear 決策。',
      description: 'Merchant Copilot 是一個面向交易卡牌商店的商家儀表板，可將 Renaiss 市場資料轉化為可執行的銷售決策。它協助店主掌握市場狀況、將自身庫存與整體市場比較、找出應主打或推廣的卡牌，並辨識哪些卡牌較適合持有或清倉。',
      renaissRelation: `Index 資料：顯示卡牌商店的整體市場狀況。
FMV 時間序列：將店內庫存表現與整體市場比較。
卡牌層級市場資料：找出適合主打與推廣的高潛力卡牌。
交易資料：呈現真正具備動能與流動性的卡牌。
評級卡查詢：支援快速估值與商家決策。
市場信號：將即時卡牌資料轉換為 Promote、Hold 和 Clear 行動。
市場基礎設施：驅動面向商家的情報與庫存決策工具。`,
      testInstructions: `此應用程式由兩個頁面組成完整的商家體驗：

1. Dashboard：顯示市場狀況、主打卡牌、推廣候選卡牌、快速售出的卡牌，以及表現優於市場或出現在 index movers 中的庫存卡牌。
2. Inventory：顯示商家庫存的成本、定價、市場比較、相對強度、交易歷史示範，以及 Push / Hold / Clear 建議。

---
評審可以使用預先載入的黑客松資料探索示範。

建議測試流程：
1. 開啟 Dashboard，檢視市場指數與推薦卡牌。
2. 查看哪些卡牌被標示為適合推廣、快速售出或需要特別關注。
3. 開啟 Inventory，檢視個別卡牌、市場比較圖表與建議行動。
4. 檢視庫存卡牌如何被分類為 Promote、Hold 和 Clear。`,
      judgeNotes: '',
    }),
    'renaiss-collector-console': Object.freeze({
      pitch: '一個 Telegram 與儀表板營運層，將社群參與轉化為 Renaiss Credits、活動卡包、收藏、排行榜與分析。',
      description: 'Renaiss Collector Console 是一款用於收藏家活動的社群營運工具。參與 Telegram 活動可賺取 Renaiss Credits，Credits 可用來開啟 Campaign Packs，而卡包會建立虛構的 Renaiss Slab Card 收藏紀錄。收藏家可使用視覺化開包流程、分組收藏、排行榜，以及僅供顯示的 BNB Chain 錢包連結；社群管理員則可透過 bot DM 管理活動機率與資格規則，並在儀表板中檢視結果。',
      renaissRelation: '本專案是為 Renaiss 收藏家經濟打造的社群營運層。它將社群互動轉化為可衡量的收藏循環：Credits、Campaign Packs、虛構的 Slab Card 掉落、收藏、排行榜與活動分析。儀表板也整合公開的 Renaiss OS Index featured-cards endpoint，作為清楚標示來源的 beta 市場參考背景。Renaiss Index 資料與原型中虛構的 off-chain 掉落會保持分離，UI 也會記錄其來源、假設與限制。',
      testInstructions: `快速 live demo：開啟 https://t.me/RenaissPackBot 並傳送 /start。建立或使用一個 Telegram 群組、加入 bot，並以該群組的 Telegram 管理員身分執行 /allowchat。在群組中傳送 'renaiss settings'，接著在 bot DM 中傳送 'renaiss settings' 並選擇該群組。DM 面板可設定 Activity Credit chance、card-tier chances、Pack Booster bonus/duration、cooldown、minimum message length、card names、stock 與 duplicate-win rules。在群組中可使用 'renaiss'、'renaiss credits'、'renaiss open pack'、'renaiss collection'、'renaiss drops' 與 'renaiss rank'。完整操作指南：https://github.com/YounJae-H/renaiss-collector-console/blob/main/docs/COMMAND_REFERENCE.md#dm-settings-panel 。本機網頁 demo：複製 repo，執行 'cd dashboard'、'npm install' 與 'npm run dev'，再開啟 http://127.0.0.1:3001/guide。內建 demo 資料不需要 database。也可透過 'python demo_bot_flow.py' 查看離線 bot 操作紀錄。`,
      judgeNotes: '所有 demo 卡牌與美術皆為原創、虛構的 Renaiss 活動素材。此 MVP 刻意採用 off-chain 設計：不涉及 minting、wallet signing、custody、token transfer、physical-card claim 或 marketplace listing。BNB Chain 錢包支援僅供顯示。Renaiss OS Index API 仍處於 beta／實驗階段，資料可能不完整、延遲或無法取得；儀表板會安全地處理失敗，並將其標示為參考資料。repository 不含 bot token、database URL、私人社群資料或 production credentials。',
    }),
    'vinci-appraiser': Object.freeze({
      pitch: '一款像素藝術動作 RPG，透過即時 Renaiss 卡牌、FMV 檢查、SBT 來源證明與 multi-signature custody 教導 RWA 盡職調查。',
      description: 'Vinci Appraiser 是一款將 Web3 onboarding 遊戲化的像素藝術動作 RPG。玩家不必閱讀 whitepaper，而是在競技場中戰鬥賺取金幣，並到商店購買從 Renaiss marketplace API 即時取得的真實收藏卡。為了安全購買，玩家必須執行三項 on-chain 檢查：FMV Oracle、SBT provenance 與 multi-sig custody，並以白話了解這些概念的意義。通過驗證的卡牌會提升能力值，假卡則會削弱玩家。我們將 RWA 盡職調查從繁瑣工作轉化為核心遊戲機制。',
      renaissRelation: `Vinci Appraiser 直接建構於 Renaiss Index API 之上，取得即時 marketplace listings，讓遊戲內的卡牌商店陳列真實收藏卡，而非 placeholder。每張卡牌都帶有來自 Renaiss 的真實資料，包括 fair market value、owner address、vault location、PSA grade、grading company 與 ask price。這些資料同時驅動遊戲玩法與其中的學習內容。

遊戲將三個核心 Renaiss 概念建模為遊戲內檢查。FMV Oracle 檢查會比較卡牌價格與其 fair market value，教導玩家 price oracle 如何避免買貴。SBT provenance 檢查會查看卡牌的 owner address，說明 soulbound token 如何證明所有權歷史。vault multi-sig 檢查則將 custody requirements 與卡牌 grade 連結，展示 multi-signature vault 如何保護更高價值的資產。

卡牌圖片直接來自 Renaiss marketplace data，只有在缺少圖片時才以 Pokemon TCG API 作為備用來源。grade 與 price 資料也會決定商店的 pricing tiers，以及裝備卡牌後獲得的 stat bonuses，因此遊戲內經濟反映的是 Renaiss 的真實 marketplace，而非虛構市場。

未來階段將進一步深化這項連結，包括真實的 SBT registry lookups、實際的 Gnosis Safe multi-sig checks，並最終讓遊戲內購買觸發 Vinci World smart contract 上真正的 RWA mint，使本遊戲成為實際進入 protocol 的入口。`,
      testInstructions: `評審可直接前往 https://vinciappraiser.creates.works/ 試玩 Vinci Appraiser。不需要任何 login、wallet 或 credentials，只要開啟連結即可遊玩。

快速導覽：
1. 在 Town 中使用 WASD 移動，並進入 Arena、Shop 或 Home（Space）。
2. 在 Arena 中選擇樓層，使用 WASD 戰鬥，以 click/Space 攻擊，並以 Shift 閃避。
3. 賺取金幣後前往 Shop，瀏覽從 Renaiss marketplace API 即時取得的真實卡牌。
4. 點擊卡牌上的 Inspect，依序執行 FMV Oracle、SBT Provenance 與 Vault Multi-Sig 檢查，再選擇 Buy 或 Pass。
5. 前往 Home 裝備卡牌並查看 Power Level 更新，接著回到 Arena，確認更高難度的樓層已解鎖。`,
      judgeNotes: 'Vinci Appraiser 起初是我想讓 Web3 驗證概念對新手真正容易理解的一次嘗試，因為我自己也是新手。我不是只閱讀文件，而是透過實際建構來學習 Renaiss 及其驗證系統的運作方式，這也塑造了整個遊戲設計：玩家執行的每一項檢查，也都是我必須先學會的一個概念。這是一個可運作的 prototype，用來證明核心循環，並由真實資料同時驅動遊戲玩法與教育內容；我也已有清楚的 roadmap，未來將加入真實 SBT lookups、Gnosis Safe integration 與 on-chain minting。我想肯定這項倡議，因為它為像我一樣的新手提供了真正容易親近的方式，進入一個原本可能令人感到畏懼的領域；而這正是我希望透過本專案進一步延伸的易用性。',
    }),
    cardscene: Object.freeze({
      pitch: '一間互動式 3D 收藏家房間，將 Renaiss 卡牌、SBT、社交拜訪與小遊戲轉化為沉浸式空間展示。',
      description: `CardScene 是一款專為 TCG 卡牌收藏家設計的互動式 3D 空間收藏展示網頁應用程式。

CardScene 擺脫傳統清單或網格式 UI 的僵化形式，讓使用者在完整打造、氛圍舒適的玩家房間中探索自己的收藏。使用者可以自然地與房內各種物件互動，例如卡牌收納櫃、電腦、相簿與留言簿，在會依即時日夜週期改變氛圍的環境中，體驗自己的卡牌收藏、SBT、小遊戲等內容。

CardScene 不只展示卡牌，更希望為收藏家建立次世代社交空間，帶來真正的擁有感（我實際擁有的房間）與深度沉浸感（造訪朋友的房間）。`,
      renaissRelation: `CardScene 是一個 UI/UX 層專案，積極使用 Renaiss Protocol 的公開 API，將鏈上與鏈下資料自然地連結到互動式 3D 空間。

收藏家資料整合：
透過 User API (/v0/users/{id})，我們會同步使用者的個人資料與頭像 (avatarUrl)，確保任何個人資料變更都會自動反映在房間內。

我們會取得使用者指定的 Showcase 卡牌 (favoritedCollectibles) 與 Favorite SBT (favoritedSBTs)，把它們放在房間的核心展示位置，呈現由 100% 真實資料驅動的個人化空間。（對尚未設定 Showcase 的使用者，我們也支援以 tokenId 載入。）

若找不到 Favorite SBT 資料，我們已實作 fallback 邏輯，直接查詢 BNB Smart Chain 上的 SBT 合約，以確保資料連續性。

卡牌工具與實體卡牌支援：
我們使用 Marketplace API (/v0/marketplace) 與 Card API (/v0/cards/{tokenId}) 取得完整收藏與 metadata，例如卡牌圖片、稀有度與 FMV (Fair Market Value)，再將其無縫映射到房內的相框與相簿物件。

除了數位收藏，應用程式也支援登錄與展示 Physical Cards。我們另提供獨立的「Gallery Mode」工具，讓使用者只專注沉浸於卡牌視覺與 metadata。

社群工具與遊戲體驗 (Multi-room)：
我們提供 Multi-room 環境；使用者只要輸入另一位 Renaiss 使用者的個人資料 UUID，就能造訪對方的房間。

這讓 CardScene 成為 Renaiss 生態系中的社交與社群中心。使用者可以造訪朋友的房間、探索其真實 Showcase 與 SBT、留下留言簿訊息，並一起享受小遊戲。`,
      testInstructions: `1. 存取線上 Demo

可透過以下連結立即測試線上應用程式：https://cardscene.vercel.app/

若希望在本機執行專案，請參閱 GitHub 儲存庫中的 README：https://github.com/dadaclub/renaiss

2. 驗證與進入

為讓評審順暢體驗，我們實作了 Mock Authentication 系統。你可以略過複雜的錢包連線或註冊步驟，只要點擊主畫面的登入按鈕，即可使用示範帳號立即進入儀表板與 3D 房間。

3. 核心測試情境

書桌公仔（社群生態系連結）：點擊電腦螢幕右側排成一列的各個公仔，會分別前往 Renaiss 生態系及其相關社群頻道。

連結：Renaiss Official Site (https://www.renaiss.xyz/)、Founder Winchman's X (https://x.com/Plus_Ultra_715)、Renaiss Discord (https://x.com/Plus_Ultra_715)、Renaiss Community X (https://x.com/Renaiss_cmty)，以及 Vinci World X (https://x.com/vinciwld)。

電腦螢幕（小遊戲）：點擊書桌上的 PC 螢幕，即可啟動並遊玩經典街機風格的「Winchman Run」2D 平台小遊戲。

左下方地板上的攤開筆記本（留言簿與 Multi-room）：點擊椅子左側地板上的攤開筆記本以開啟留言簿。點擊任何留言使用者的個人資料（首頁）圖示，環境會立即切換至該使用者的房間，並動態載入其真實 Renaiss Showcase 與 SBT 資料。

右下方地板上的 SBT 相簿書堆（SBT 檢視器）：點擊椅子右側地板上的書堆，即可查看使用者實際獲得的 SBT 收藏。

Showcase 展示架與相框（卡牌收藏）：點擊左側大型展示架上的卡牌或牆面相框，可探索由 Renaiss API 驅動的卡牌 metadata，並進入專用 Gallery Mode。`,
      judgeNotes: `隨時間變化的視覺細節（即時日夜週期）

為了讓使用者感覺這個空間真正是「自己的房間」，我們自行實作了一套視覺系統，會依照使用者實際的即時時鐘，在白天與夜間模式間自動調整房間照明與色溫。

實體卡牌價格資料處理（克服限制）

本專案支援登錄與視覺化數位及實體卡牌。然而，在查詢實體卡牌即時價格時，我們遇到外部專業 API 的付費方案限制。為避免 UI 損壞，並確保評審期間維持高擬真的視覺體驗，我們針對 Demo 策略性地 hard-code 部分核心價格資料點，敬請理解此實作細節。

專案的最終願景

CardScene 不重複既有的錢包或交易功能，而是著重運用 Renaiss Protocol 強健的資料基礎設施，呈現次世代社交 UI/UX 典範，讓收藏家能以最具吸引力、最沉浸的方式視覺化並分享自己的資產。`,
    }),
    pullprophet: Object.freeze({
      pitch: '一套針對即時鏈上扭蛋池、loot box 與 Renaiss 卡包的確定性預期價值引擎與 AI 分析師。',
      description: `PullProphet 是一套運行於 BNB Chain、面向鏈上扭蛋池、loot box 與卡包的即時預期價值引擎與 AI 分析師。有限池一開始消耗，宣稱的機率便可能失真，因此 PullProphet 會讀取各池的即時鏈上庫存與真實次級市場底價，持續重新計算下一抽的真實預期價值，再提供白話的 +EV / −EV 判斷。它的核心保證是：AI 絕不負責數學計算；每個數字都由確定性引擎產生，並在鏈上留下追蹤與密碼學簽章。本工具適合需要判斷是否值得抽取的收藏家與交易者，也可作為日益受到監管機關檢視之鏈上 loot-box 經濟的透明度層。
`,
      renaissRelation: `PullProphet 透過兩種互補方式整合 Renaiss Protocol。第一，它使用 Renaiss CLI 與 Packs API (api.renaiss.xyz/v0/packs) 分析真實 Renaiss 卡包，讀取每個卡包的宣稱價格、公開預期價值 (EV)、精選卡牌公平市場價值 (FMV) 與近期抽取串流。它會比較 Renaiss 公開指標與玩家實際抽取結果，提供有根據的 +EV / −EV 判斷，說明真實卡包目前是否值得開啟。
第二，PullProphet 直接建構於 Renaiss OS Index API 之上，並以它作為系統內所有卡牌價格的 source of truth。Market Data 模組透過查詢 GET /v1/cards/{game}/{set}/{card} 並讀取 priceUsdCents，解析各卡牌的即時次級市場底價；卡牌 slug 則透過 GET /v1/search 解析。整合使用 API key 驗證，並以批次與快取請求遵守 Index 的速率限制。
這些即時市場價格透過以下公式驅動 PullProphet 的確定性預期價值引擎：EV = Σ (remainingᵢ / total_remaining × Renaiss floorᵢ) − pack_cost。隨著有限池逐漸消耗、高價值卡牌被抽出，引擎會依剩餘庫存與目前 Renaiss 底價持續重新計算真實預期價值。線上 Demo 池「Charizard Line」使用由 Renaiss OS Index 解析的真實 PSA 10 Pokémon 卡牌建立，其中包括一張真實、價值約 US$431 的 Charizard chase，確保每項判斷都建立在真實市場資料而非虛構數值之上。
兩種整合都支援 live 與可重現的 snapshot 模式；每項數值皆由確定性計算產生、可透過密碼學追蹤，並能直接歸因至 Renaiss 資料。AI 會以白話解釋結果，但絕不生成或捏造底層數字。`,
      testInstructions: `不需要安裝、錢包或測試帳號；應用程式已上線且為唯讀。

使用提交的 Vercel 連結開啟應用程式。第一次造訪時，請預留約 30–60 秒讓免費方案後端從休眠中喚醒；之後應用程式會正常回應。

Market 頁面會依即時鏈上預期價值優勢排列全部四個池，並提供 AI 產生的市場摘要。每個數值都會醒目顯示，且可追溯回確定性引擎。

開啟任一池，例如 Pokémon Base Set, Unlimited。你會先看到白話的 +EV 或 −EV 判斷，接著是 Proof 區段，證明 AI 從不執行計算。該區段會同時呈現引擎 fact sheet 與判斷、驗證每個數值、追蹤 AI 引用的每項數字，並顯示由瀏覽器即時驗證的鏈上 EIP-712 attestation。

使用 What-if Simulator，將卡包數量調整為 5、20 或 50，觀察預估損益 confidence cone 與結果分布即時更新。

嘗試 Ask the Prophet，提出「How many pulls until this becomes −EV?」或「What happens if the chase card's floor price falls by 30%?」等問題。AI 會呼叫確定性引擎工具作答，回覆中的每個數值都會連結回底層引擎輸出。

前往 Pack Prophet 分析真實 Renaiss 卡包，包括 Eden Pack、OMEGA 與 RenaCrypt。頁面會比較各卡包的宣稱價格、預期價值與觀察到的抽取資料，以判斷目前開包是正或負預期價值。

最後，開啟 BNB Chain Testnet 合約連結以驗證鏈上部署。每個池合約都已驗證原始碼，並直接連結至對應的 BscScan 頁面。

連接錢包完全是選用功能，只用於顯示你符合資格參與的池。無需連接錢包即可評估所有核心功能。若判斷標示為「deterministic narrator」，表示 Groq 的免費每日 API 額度已用盡。計算、proof trace 與判斷會保持完全相同，因為每個數字都由確定性引擎產生；只有措辭不同。線上 Simulate Crossing 功能與 Telegram 提醒依賴本機 blockchain instance 與持續運作的背景 worker，因此會在專案 walkthrough 中展示。若要自行執行完整互動版本，請依照儲存庫 README 的 Run it locally 說明操作。`,
      judgeNotes: `AI narration (Groq / Llama)。PullProphet 使用 Groq 免費方案上的 Llama 3.3 70B Versatile，將確定性輸出轉化為白話判斷。由於 Groq 免費方案有每日請求上限，額度用盡時，應用程式會自動 fallback 至 deterministic template narrator。底層引擎仍會計算每個數字，因此判斷、計算、proof trace 與鏈上 attestation 完全相同。唯一差異是 Proof 面板會顯示「deterministic narrator」，而非「phrased by llama-3.3-70b-versatile」。
Whale Sniper (Telegram alerts)。雙向預期價值 crossing detector 與 Telegram notification bot 已完整實作並通過測試。不過 Render 免費託管方案無法提供持續運作的背景 worker，因此即時 Telegram 通知會在專案 walkthrough 中展示，而不會於已部署應用程式上持續執行。託管儀表板仍透過 Market view 提供相同功能：持續重新計算預期價值、重新排序各池，並使用驅動提醒系統的同一套確定性引擎，標記剛跨入 +EV 或 −EV 的池。`,
    }),
    'pullcast': Object.freeze({
      pitch: '一個橫跨 Discord、web 與 CLI 的唯讀 Renaiss community client，提供 pack share cards、Cert Bridge pricing、trade alerts 與 leaderboards。',
      description: `PullCast 是為 Renaiss 收藏家打造的唯讀 community client。它會監看 BSC mainnet 上的 Renaiss pack openings，將每次抽卡轉換為永久的 share card，自動發布到 Discord，並在 web 上呈現為公開 gallery。最核心的功能是 Cert Bridge，它在單一 command 中串接 Renaiss main API 與 Renaiss OS Index API，讓收藏家可從 tokenId 或 cert serial 查詢 graded FMV，不必手動執行兩次 curl calls。此外，我們還執行 Big Trade Alert cron，每五分鐘輪詢一次即時 graded trades，並在每個已訂閱的 Discord server 中發布 alert embed；另有 Pull of the Day leaderboard，會對所有已訂閱 servers 在過去 24 小時內 net-gain 最高的三次 pulls 進行排名、加上獎牌，並每小時更新。

本產品適合想在 pack 開啟當下、不離開 Discord 就立即獲得炫耀時刻的 Pokemon 與 One Piece 收藏家，也適合希望在 guilds 中創造被動參與、又不想每天管理 bot 的 Discord server admins。它也服務想取得 reference client 的 Renaiss builders：把 Hackathon S1 推出的每個 builder surface——main API、全新的 OS Index API，以及 official CLI——組合進同一個帶有來源引用的 envelope。整套產品以唯讀方式交付於三個 channels：具備十九個 slash commands 的 Discord bot、具備十二條 server-rendered routes 的 web app，以及鏡像 official renaiss CLI read verbs 的 npx pullcast CLI。`,
      renaissRelation: `PullCast 是第一個組合 Hackathon S1 期間推出之全部三個 Renaiss builder surfaces 的 community client。在 main API 這一側，我們接上六個 read endpoints，六個全部涵蓋。GET v0 collectibles by tokenId 是 indexer 偵測到每次 pull 時所採用的 source of truth，因為它帶有 buyer address，以及會成為 Cert Bridge 輸入值的 slab serial。GET v0 marketplace 驅動 Discord 中的 browse slash command 與 web 上的 marketplace page，並鏡像 official renaiss marketplace CLI verb 的 flag surface。GET v0 packs 為 tracked-packs list 與 packs slash command 提供初始資料。GET v0 wallets by address 會傳回某個 wallet 的 pulls，進而驅動 pullcast.vercel.app slash address 上的 public gallery。GET v0 graded by cert 是 Cert Bridge chain 的後半段，並以 grade 與 condition metadata 豐富 Discord embed。POST v0 report 是我們允許的 write path，因為它是一個有助於 beta corpus 的 data-quality feedback loop。

在 OS Index API 這一側，我們以 partner-tier authentication 接上二十八個以上的 endpoints，因此每把 key 每天可獲得一萬次 requests，而非 anonymous callers 每個 IP 每天僅有十次。indices tile group 驅動 market slash command 與 web 上的 Market page，呈現三十日 sparkline，以及七日、三十日與三百六十五日各個 window 的 deltas。featured endpoint 驅動 homepage hero 中由三張 share cards 組成的扇形排列，以及 featured slash command。card slug family 涵蓋完整 card detail，包括 sparklines、per-grade table、similar cards 與 recent trades；這些內容全部會在 card detail page 上呈現，並採用四次 requests 的 serialized waterfall，確保永遠不會超過 Renaiss 尚未文件化的 per-second burst limit。trades feed 驅動 trades slash command、web 上的 Live trades page，以及每五分鐘輪詢一次的 Big Trade Alert worker。graded cert endpoint 是 Index 端 Cert Bridge 的前半段，並由一個以 Postgres 為後端、TTL 為六小時的 cache 提供緩存。Search 驅動 search slash command 與 search page。Set listing 驅動 set slash command，提供依價格排序的 top-five 與 aggregate FMV。

Cert Bridge 是我們的核心整合功能，也是 PullCast 存在的理由。Renaiss main API 以 tokenId 識別 cards，而 tokenId 是 BSC 上的七十八位數 uint256。OS Index API 則以 cert serial 識別 graded cards，例如 PSA73628064。在 PullCast 出現以前，串接這兩者需要手動執行兩步驟 curl script。PullCast 將它們串接為單一 endpoint：GET api slash price slash cert slash PSA73628064 會傳回具有 variance flag 的 blended FMV，並在 response envelope 中引用兩個 upstreams。相同 primitive 也驅動 Discord 中的 price token：它從 tokenId 開始，自 Renaiss main API attributes 擷取 serial，再串接至 Index；Discord 中的 price cert 則從 cert 開始，並串接兩個 graded endpoints；web 上的 Card Lens page 可在 browser 中執行任一流程。

進行 on-chain reads 時，我們透過 ethers v6 直接連到 chain ID fifty-six 的 BSC mainnet，primary RPC 位於 bsc.publicnode.com，fallback 位於 rpc.ankr.com/bsc。我們持有三個 Renaiss contracts 的唯讀 handles：位於 0xF864 的 Registry V3 collectible ERC-721、位於 0x9215 且負責鑄造 packs 的 TokenVendingMachine，以及位於 0xdb44 的 Orderbook。整個 process 中沒有載入任何 signer、wallet 或 private key，因此 PullCast 即使意外發生，也確實不可能送出 transaction。

我們也以明確方式涵蓋 collector data、trading data、card tools、community tools 與 game experiences。collector data 是指我們在 submission time 追蹤三個真實 wallets，並在 pullcast.vercel.app slash the address 為每個 wallet 顯示具有 infinite-scroll gallery 與 OG meta images 的頁面，供可分享的 link previews 使用。trading data 是指 Big Trade Alert cron；它每五分鐘輪詢一次 Index trades feed，且已在 build window 期間向我們的 test channel 發布過一則真實 alert。card tools 是指 Discord 與 browser 中的 Card Lens，以及每個 card detail page 上的三十日 FMV sparkline 與 per-grade table。community tools 是指 channel-level subscribe 與 unsubscribe flows、alerts 的 per-channel threshold overrides、供不希望被追蹤之 wallets 使用的 opt-out registry，以及在收藏家選擇加入時，將 Discord identity 連結至 Renaiss identity 的 profile lookup。game experiences 是指 Pull of the Day，也就是對過去二十四小時內 net-gain 最高的三次 pulls 加上獎牌的 leaderboard；以及 CardOfTheDay，它會在 Asia Hong Kong time 的午夜，將排名最高的 graded featured mover 發布到每個已訂閱 channel。

在 grounded AI 方面，我們透過 OpenAI-compatible endpoint 使用 Groq Llama 3.3 seventy billion。explain slash command 會執行嚴格的 citation guard；任何沒有至少兩個 cited sources，且未做到每段至少一個 citation 的答案，都會被拒絕發布。像 should I buy 或 will it moon 這類 predictive questions 會在呼叫 model 之前就被拒絕，這同時是 cost saver 與 safety boundary。listing slash command 會依真實 Renaiss trades，以 deterministic 方式計算 low、mid 與 high range，只要求 LLM 撰寫數字周圍的 reasoning。backend 傳回的每個 response envelope 都帶有 BETA warning code 並引用其 upstream URLs，因此 consumers 不必信任我們，也能對照 Renaiss 重新驗證每一個數字。`,
      testInstructions: `共有兩條測試路徑，兩者都已記錄在 repo 中。最快的是不需要安裝任何東西的 live web app。開啟 browser，前往 http localhost 3200；若 deployed URL 正在運作，也可使用該 URL。landing page 的 hero 右側會顯示三張 share cards 組成的扇形排列。將游標移到上方後，它們會以協調一致的動畫在 three-D 中展開；這是最快能顯示此 app 是真實產品而非 demo 的方式。向下捲動即可看到 Pull of the Day section，其中有三張帶獎牌的 cards——一金、一銀、一銅——顯示由真實 BSC-indexed data 得出的過去二十四小時內 net-gain 最高 pulls。接著可以點入 slash market，查看 Renaiss OS Index tiles 與可展開的 What is a Renaiss OS Index 說明；點入 slash trades，查看帶 card thumbnails 的即時 cross-market graded trade feed；點入 slash featured，查看 top-mover grid；點入 slash stats，查看 adoption counters 與 Pull of the Day leaderboard；點入 slash ecosystem，查看列出我們所接每個 Renaiss endpoint 的 integration matrix；以及點入 slash 0x72a5c69fb393b81e1cf96255453072a1348b9532，查看具有四次 indexed pulls 之真實 address 的 wallet gallery。

較深入的路徑是 local install，從頭到尾約需五分鐘。Prerequisites 為 Bun one point x、PostgreSQL sixteen、從 Discord developer portal 取得的 Discord bot token，以及 Renaiss OS Index partner keys；其格式看起來像 rk underscore twenty-seven characters 與 rsk underscore fifty-two characters。使用 git clone https github.com slash louissarvin slash PullCast 複製 repo，切換到其中，接著設定 backend。Change directory to backend，執行 bun install，copy env dot example to env，並填入 DATABASE_URL、DISCORD_BOT_TOKEN、DISCORD_APP_ID、DISCORD_DEV_GUILD_ID——也就是供 instant slash command registration 使用的 test-server snowflake——RENAISS_INDEX_KEY_ID——也就是 twenty-seven character key——RENAISS_INDEX_SECRET——它必須正好是 fifty-two characters，因為少一個 character 就會在沒有提示的情況下降級到 public tier，使你從每把 key 每天一萬次 requests，變成每個 IP 每天十次——以及 GROQ_API_KEY；只有在要測試 explain、listing 或 valuate photo 時才需要它。接著執行 bun run db push，將 Prisma schema push 到 Postgres，再執行 bun dev 啟動 backend。繼續之前，log 中必須看到四類資訊。第一是 boot log line renaiss-index partner_auth true。第二是五行 warmed OK，分別為 indices、indices pokemon、indices one-piece、featured limit twenty-four，以及 trades recent。第三是 discord registered nineteen commands scope guild your ID。第四是 Server started successfully on port 3700。若其中任何一項缺少，原因幾乎一定是 secret 只有 fifty-one characters，而非 fifty-two。

在第二個 terminal 中 change to the web directory，執行 bun install，再執行 bun dev。web app 會在 http localhost 3200 啟動。若要測試我們最精采的 Cert Bridge，請將 Discord bot 邀請到你的 test server，然後輸入 slash price cert PSA73628064。等待約三秒，就會收到 Charizard PSA ten embed，當中包含 FMV、confidence tier、last-sale timestamp，以及引用 Renaiss main API 與 Renaiss OS Index 的 source footer。同一套 Cert Bridge 也位於 web 的 slash price，你可以貼上 PSA73628064 並按下 search。

若要測試完整的十九個 command surface，只要在 Discord 中輸入一個 slash，讓 autocomplete dropdown 彈出。你會看到列出的每一個 PullCast command。接著依序嘗試其中一些：slash help、slash market、slash market game pokemon、slash featured limit three、slash trades limit five、slash search query luffy、slash browse query charizard、slash packs、slash packs slug eden-pack、slash leaderboard daily、slash valuate cert PSA73628064、slash explain cert cert PSA73628064 question what is the current price and confidence、slash listing cert cert PSA73628064，以及用於 ecosystem reference embed 的 slash renaiss。每個 command 都會在五秒內傳回，因為第二次 cert lookup 已被 cache，而 market 與 featured routes 分別以十與五分鐘作為 fresh cache，並在 upstream jitter 期間使用 twenty-four times multiplier 進行 stale-serve。

CLI 是 Tool track proof。Change directory to backend slash cli，執行 bun run build，然後執行 PULLCAST_API_URL http localhost 3700 node dist slash pullcast dot mjs trades dash dash limit three。你會看到一行 JSON envelope，其中 success true，並帶有 sources array。它與 REST API 使用相同 envelope。再分別以 marketplace、search luffy 與 price PSA73628064 重複測試。

若要進行 raw REST verification，依序執行 curl http localhost 3700 slash health、curl the api slash featured limit three、api slash trades slash recent limit three、api slash marketplace limit three、api slash price slash cert slash PSA73628064、api slash leaderboard slash daily，以及 api slash market。每個 response 都遵循相同 envelope，包含 data field、sources array、至少包含 BETA warning 的 warnings array，以及 generated_at timestamp。若將其中任何一個結果 pipe through jq dot success，應會全面看到 true。

以下是幾個可節省時間的常見 setup issues。若 boot log 對每個 endpoint 都顯示 warmed FAILED with status four hundred twenty-nine，代表 partner secret 錯誤。它必須正好是 fifty-two characters，以 rsk underscore 開頭並以 underscore I 結尾。少一個 character 就會在沒有提示的情況下降級到 public tier，而 public tier 是每個 IP 每天十次 requests，因此只要幾分鐘就會觸及 daily quota。若 slash commands 沒有出現在 Discord，表示 DISCORD_DEV_GUILD_ID 尚未設定。Global commands 最多需要一小時才會 propagate；guild-scoped commands 則會立即出現。若每條 route 都傳回 Live data paused，表示 Renaiss upstream 正在對你的 IP 進行 rate-limiting。如果你正在使用 Cloudflare Warp，請切換至 DNS only HTTPS mode，因為 Warp exit IPs 由數千名 users 共用，會遭到 Renaiss edge throttling。若 Pull of the Day 為空，leaderboard cron 是每小時計算一次，因此請等待一小時；也可捲動到直接讀取 local Postgres 的 Recent pulls section。`,
      judgeNotes: `你需要加入我的 DISCORD，我們才能測試我建立的 BOT，這是 DISCORD 連結：
https://discord.gg/5eRP4efhqa

讓我們來試試所有 SLASH

所有內容都是真實的，而且全都可以驗證。位於 github.com/louissarvin/PullCast 的 GitHub repository 包含在九天 build 期間完成的兩百零五個 commits。真實 partner keys 所在的 dot env file 存在於 disk，但已被 git-ignored，checked in 的只有 env dot example 與 env dot test。在 submission time，我們已有四次由 cron worker 建立 index 的真實 BSC pulls、三個 tracked wallets、一則已發布到 test channel 的真實 Big Trade Alert，以及由實際 LeaderboardSnapshot table 計算出的四筆 Pull of the Day leaderboard entries。九十秒 demo video 中顯示的一切都即時運作於 BSC mainnet，沒有 testnet、mocks 或 seed data。

產品端到端皆為唯讀，這是刻意的選擇。不進行 wallet signing、custody、gacha pulls 或 listing writes。若要購買或上架，users 會轉交給 npx renaiss version 0.0.3-beta.2，也就是 official CLI，而 official CLI 會維持為 state-changing actions 的 source of truth。這正是我們所說 PullCast 擴充 Renaiss 而非取代它的含義。每個 price surface 都在 response envelope 中內嵌 BETA warning code。每個 AI answer 都會通過 citation guard；它會拒絕沒有引用的 output，且要求至少兩個 sources。Predictive questions 在 model 被呼叫之前就會被拒絕，因此不會把 tokens 浪費在不良問題上。Rate limiting 使用 Postgres-backed token buckets，依每位 user、每個 command 以 atomic 方式執行。

讓這個 build 具備 production-shaped、而非 demo-shaped 特性的，是我們在追查 Renaiss upstream 真實拋出的 bugs 時加入的 hardening。Partner-tier auth boot probe 會在任何 user request 到達前，證明 keys 可正常運作。Boot warmup 會在五個 hot endpoints 之間間隔兩秒來預熱 cache，因此 backend restart 後第一位使用 slash market 的 user 可立即取得 response。circuit breaker 會把 cooldown 上限設為五分鐘，不論 upstream 傳來的 Retry-After 為何；這是因為 Renaiss 偶爾會在暫時性的 per-IP burst limits 上傳回長達數小時的 Retry-After，而當 daily quota 其實仍是 fresh 時，我們拒絕將自己鎖在系統外十五小時。採用 twenty-four times TTL multiplier 的 Stale-serve，意味著部分 upstream outage 在 tiles 上只會呈現稍舊的 data，而不是壞掉的 app。card detail routes 上的 In-flight coalescing 會對四個 waterfall requests——main plus overview plus fmv plus trades——進行 deduplicate，因此快速在 cards 間 navigation 永遠不會觸發 burst four hundred twenty-nine。Schema drift tolerance 表示每個 zod schema 都使用 passthrough with optional fields；因此當 Renaiss 在 beta 中途加入 prime confidence tier 時，我們只需提升一個 enum，所有使用 confidence 的 commands 就能繼續運作。

若 judge 詢問希望他們記住的一件事是什麼，答案取決於是哪一類 judge。若是 builder judge，我們解決了 Cert Bridge，並且是第一個以單一 command 串接 Renaiss main API tokenIds 與 OS Index certs、同時提供帶來源引用 responses 的 client。若是 design judge，hero fan 會在 hover 時以 three-D 動畫展開，market page 具備以 plain-English 說明 Index 實際意義的 explainer，empty states 使用帶有真實 copy 的 dashed panels 而非 spinners，而且每個 surface 都在 envelope 中內建 beta disclaimers，而非事後附加於 footer。若是 business judge，Pull of the Day 是 retention hook，Big Trade Alerts 是 passive engagement layer，而且兩者都會在每個已訂閱的 Discord server 內自動觸發，創造 zero-effort virality。若是 safety judge，端到端唯讀、AI answers 必須具備 citations 否則就拒絕、每條 route 都有 rate-limiting、每個 price envelope 都有 beta warnings，並且我們是擴充 Renaiss 而非取代它。

關於 Discord auto share-card，有一項誠實揭露。最具殺手級 UX 的時刻，是已訂閱 channel 在某個 wallet 開啟 Renaiss pack 的當下，立即收到自動發布的 share card。這需要兩件事：對一個具有 active buyer 的真實 address 執行 slash pullcast subscribe wallet，以及在九十秒 demo window 內真的發生一次 live pack opening。對 live judge session 而言，這種時間點很不穩定，因此 demo 中我們改以 Big Trade Alerts 為重點，因為該 cron 每五分鐘會依 indexed BSC trade data 觸發，而且已在 test window 期間發布過一則真實 alert。若 judges 想觀看端到端的 auto share-card，我們可以安排 live session，使用我們控制的 wallet 配合時間進行展示。

聯絡方式是向 bot owner 傳送 Discord DM，或在 GitHub repository 上建立 issue。其餘所有內容都在 repo README 中。`,
    }),
    'pullcast': Object.freeze({
      pitch: 'Discord, web, CLI 전반에서 작동하며 pack share cards, Cert Bridge pricing, trade alerts와 leaderboards를 제공하는 read-only Renaiss community client입니다.',
      description: `PullCast는 Renaiss collector를 위한 read-only community client입니다. BSC mainnet에서 Renaiss pack openings를 감시하고, 모든 pull을 영구적인 share card로 변환하여 Discord에 자동 게시하고 web의 public gallery로 렌더링합니다. 대표 기능은 Cert Bridge입니다. 하나의 command에서 Renaiss main API와 Renaiss OS Index API를 연결하므로, collector는 두 번의 curl calls를 직접 실행하지 않고도 tokenId 또는 cert serial로 graded FMV를 조회할 수 있습니다. 여기에 더해 live graded trades를 5분마다 polling하고 모든 subscribed Discord server에 alert embed를 게시하는 Big Trade Alert cron과, 모든 subscribed servers를 대상으로 최근 24시간의 net-gain pull 상위 세 개를 메달과 함께 순위화하고 매시간 업데이트하는 Pull of the Day leaderboard를 운영합니다.

이 제품은 pack이 열리는 즉시 Discord를 벗어나지 않고 자랑할 순간을 얻고 싶은 Pokemon 및 One Piece collector를 위한 것이며, 매일 bot을 관리하지 않고도 guild 안에서 수동적인 참여를 유도하고 싶은 Discord server admins를 위한 것이기도 합니다. 또한 Hackathon S1에서 출시된 모든 builder surface, 즉 main API, 완전히 새로운 OS Index API와 official CLI를 출처가 인용된 하나의 envelope 안에서 조합하는 reference client를 원하는 Renaiss builders를 위한 제품이기도 합니다. 하나의 read-only product를 세 개의 channels로 제공합니다. 열아홉 개 slash commands를 갖춘 Discord bot, 열두 개 server-rendered routes를 갖춘 web app, 그리고 official renaiss CLI의 read verbs를 그대로 반영하는 npx pullcast CLI입니다.`,
      renaissRelation: `PullCast는 Hackathon S1 기간에 출시된 세 가지 Renaiss builder surfaces를 모두 조합한 최초의 community client입니다. main API 측에서는 여섯 개 read endpoints 중 여섯 개 모두를 연결합니다. GET v0 collectibles by tokenId는 indexer가 감지한 모든 pull의 source of truth입니다. buyer address와 Cert Bridge의 입력이 되는 slab serial이 포함되어 있기 때문입니다. GET v0 marketplace는 Discord의 browse slash command와 web의 marketplace page를 구동하며, official renaiss marketplace CLI verb의 flag surface를 반영합니다. GET v0 packs는 tracked-packs list와 packs slash command의 초기 자료를 제공합니다. GET v0 wallets by address는 wallet의 pulls를 반환하고, 이를 통해 pullcast.vercel.app slash address의 public gallery가 작동합니다. GET v0 graded by cert는 Cert Bridge chain의 두 번째 절반이며, Discord embed에 grade와 condition metadata를 추가합니다. POST v0 report는 우리가 허용하는 write path입니다. beta corpus 개선에 도움을 주는 data-quality feedback loop이기 때문입니다.

OS Index API 측에서는 partner-tier authentication으로 스물여덟 개 이상의 endpoints를 연결합니다. 그 결과 anonymous callers가 받는 IP당 하루 열 번이 아니라 key당 하루 만 번의 requests를 사용할 수 있습니다. indices tile group은 market slash command와 web의 Market page를 구동하며, 30일 sparkline과 7일, 30일, 365일 각 window의 deltas를 제공합니다. featured endpoint는 homepage hero에 표시되는 세 장의 share cards fan과 featured slash command를 구동합니다. card slug family는 sparklines, per-grade table, similar cards와 recent trades를 포함한 전체 card detail을 처리합니다. 이 모든 것은 card detail page에서 네 번의 requests로 이루어진 serialized waterfall로 렌더링되어 Renaiss의 문서화되지 않은 per-second burst limit을 넘지 않게 합니다. trades feed는 trades slash command, web의 Live trades page, 그리고 5분마다 polling하는 Big Trade Alert worker를 구동합니다. graded cert endpoint는 Index 측 Cert Bridge의 첫 번째 절반이며, 6시간의 Postgres-backed TTL cache 뒤에 저장됩니다. Search는 search slash command와 search page를 구동합니다. Set listing은 가격 기준 top-five와 aggregate FMV를 제공하는 set slash command를 구동합니다.

Cert Bridge는 우리의 대표 integration이며 PullCast가 존재하는 이유입니다. Renaiss main API는 BSC의 78자리 uint256인 tokenId로 cards를 식별합니다. OS Index API는 PSA73628064와 같은 cert serial로 graded cards를 식별합니다. PullCast 이전에는 두 체계를 연결하려면 수동으로 2단계 curl script를 실행해야 했습니다. PullCast는 이를 하나의 endpoint로 연결합니다. GET api slash price slash cert slash PSA73628064는 variance flag가 포함된 blended FMV를 반환하고 response envelope에서 두 upstreams를 모두 인용합니다. 동일한 primitive가 Discord의 price token에도 사용됩니다. tokenId로 시작해 Renaiss main API attributes에서 serial을 추출한 다음 Index에 연결합니다. Discord의 price cert는 cert로 시작해 두 graded endpoints를 연결합니다. web의 Card Lens page에서는 browser에서 어느 flow든 수행할 수 있습니다.

on-chain reads는 ethers v6를 사용해 chain ID fifty-six의 BSC mainnet에 직접 연결합니다. primary RPC는 bsc.publicnode.com이고 fallback은 rpc.ankr.com/bsc입니다. 세 개 Renaiss contracts에 대해 read-only handles를 유지합니다. 0xF864의 Registry V3 collectible ERC-721, packs를 mint하는 0x9215의 TokenVendingMachine, 그리고 0xdb44의 Orderbook입니다. process 어디에서도 signer, wallet 또는 private key를 불러오지 않으므로 PullCast는 실수로라도 transaction을 전송하는 것이 문자 그대로 불가능합니다.

collector data, trading data, card tools, community tools와 game experiences도 구체적인 방식으로 다룹니다. collector data란 submission time에 실제 wallets 세 개를 추적하고 pullcast.vercel.app slash the address에서 각 wallet을 infinite-scroll gallery와 공유 가능한 link previews용 OG meta images와 함께 표시하는 것을 뜻합니다. trading data란 Index trades feed를 5분마다 polling하고 build window 동안 test channel에 실제 alert 하나를 이미 게시한 Big Trade Alert cron을 뜻합니다. card tools란 Discord와 browser의 Card Lens, 그리고 모든 card detail page에 표시되는 30일 FMV sparkline 및 per-grade table을 뜻합니다. community tools란 channel-level subscribe 및 unsubscribe flows, alerts의 per-channel threshold overrides, 추적을 원하지 않는 wallets를 위한 opt-out registry, 그리고 collector가 동의하면 Discord identity를 Renaiss identity에 연결하는 profile lookup을 뜻합니다. game experiences란 최근 24시간 net-gain pull 상위 세 개를 메달과 함께 보여주는 leaderboard인 Pull of the Day와, Asia Hong Kong time 자정마다 상위 graded featured mover를 모든 subscribed channel에 게시하는 CardOfTheDay를 뜻합니다.

grounded AI에는 OpenAI-compatible endpoint를 통해 Groq Llama 3.3 seventy billion을 사용합니다. explain slash command는 최소 두 개의 cited sources와 문단당 하나의 citation이 없는 답변을 게시하지 않는 엄격한 citation guard를 실행합니다. should I buy 또는 will it moon 같은 predictive questions는 model을 호출하기 전에 거절됩니다. 이는 cost saver이자 safety boundary입니다. listing slash command는 실제 Renaiss trades를 바탕으로 low, mid, high range를 deterministic하게 계산하며, LLM에는 수치에 대한 reasoning 작성만 요청합니다. backend의 모든 response envelope에는 BETA warning code와 upstream URLs가 포함되므로, consumers는 우리를 신뢰하지 않고도 Renaiss를 기준으로 모든 수치를 다시 검증할 수 있습니다.`,
      testInstructions: `두 가지 경로가 있으며 모두 repo에 문서화되어 있습니다. 가장 빠른 방법은 설치가 전혀 필요 없는 live web app입니다. browser를 열고 http localhost 3200으로 이동하거나, deployed URL이 작동 중이라면 그 URL을 엽니다. landing page hero 오른쪽에는 세 장의 share cards가 fan 형태로 표시됩니다. hover하면 조율된 애니메이션과 함께 three-D로 벌어집니다. 이는 app이 demo가 아니라 실제 제품임을 가장 빠르게 보여주는 방법입니다. 아래로 scroll하면 세 장의 메달 card가 있는 Pull of the Day section을 볼 수 있습니다. gold 하나, silver 하나, bronze 하나로 구성되며, 실제 BSC-indexed data를 기준으로 최근 24시간의 net-gain pull 상위 항목을 보여줍니다. 여기서 slash market으로 이동하면 What is a Renaiss OS Index expandable explainer와 Renaiss OS Index tiles를 볼 수 있습니다. slash trades에서는 card thumbnails가 포함된 live cross-market graded trade feed를, slash featured에서는 top-mover grid를, slash stats에서는 adoption counters와 Pull of the Day leaderboard를, slash ecosystem에서는 우리가 연결한 모든 Renaiss endpoint가 나열된 integration matrix를 확인할 수 있습니다. slash 0x72a5c69fb393b81e1cf96255453072a1348b9532에서는 네 개의 indexed pulls가 있는 실제 address의 wallet gallery를 확인할 수 있습니다.

더 깊이 살펴보는 방법은 처음부터 끝까지 약 5분이 걸리는 local install입니다. Prerequisites는 Bun one point x, PostgreSQL sixteen, Discord developer portal에서 발급한 Discord bot token, 그리고 rk underscore twenty-seven characters 및 rsk underscore fifty-two characters처럼 생긴 Renaiss OS Index partner keys입니다. git clone https github.com slash louissarvin slash PullCast로 repo를 clone하고 해당 directory로 이동한 다음 backend를 설정합니다. Change directory to backend, bun install을 실행하고 copy env dot example to env한 다음 DATABASE_URL, DISCORD_BOT_TOKEN, DISCORD_APP_ID, DISCORD_DEV_GUILD_ID를 입력합니다. DISCORD_DEV_GUILD_ID는 instant slash command registration에 사용하는 test-server snowflake입니다. 또한 twenty-seven character key인 RENAISS_INDEX_KEY_ID, 정확히 fifty-two characters여야 하는 RENAISS_INDEX_SECRET을 입력합니다. 한 character라도 빠지면 아무런 알림 없이 public tier로 downgrade되어 key당 하루 만 번이 아니라 IP당 하루 열 번의 requests만 받게 됩니다. explain, listing 또는 valuate photo를 테스트하려면 GROQ_API_KEY도 입력합니다. 그런 다음 bun run db push를 실행해 Prisma schema를 Postgres에 push하고 bun dev로 backend를 시작합니다. 계속하기 전에 log에서 네 가지를 반드시 확인해야 합니다. 첫째, boot log line renaiss-index partner_auth true. 둘째, indices, indices pokemon, indices one-piece, featured limit twenty-four, trades recent에 대한 다섯 개의 warmed OK lines. 셋째, discord registered nineteen commands scope guild your ID. 넷째, Server started successfully on port 3700. 이 가운데 하나라도 없다면 거의 항상 secret이 fifty-two가 아니라 fifty-one characters이기 때문입니다.

두 번째 terminal에서 change to the web directory한 뒤 bun install과 bun dev를 실행합니다. web app은 http localhost 3200에서 시작됩니다. 가장 핵심적인 장면인 Cert Bridge를 테스트하려면 Discord bot을 test server에 초대하고 slash price cert PSA73628064를 입력합니다. 약 3초를 기다리면 FMV, confidence tier, last-sale timestamp, 그리고 Renaiss main API와 Renaiss OS Index를 모두 인용하는 source footer가 포함된 Charizard PSA ten embed를 받게 됩니다. 동일한 Cert Bridge는 web의 slash price에도 있으며, PSA73628064를 붙여 넣고 search를 누르면 됩니다.

전체 열아홉 개 command surface를 테스트하려면 Discord에서 slash 하나만 입력해 autocomplete dropdown을 표시합니다. 모든 PullCast command가 나열됩니다. 이어서 다음 항목을 순서대로 일부 실행합니다. slash help, slash market, slash market game pokemon, slash featured limit three, slash trades limit five, slash search query luffy, slash browse query charizard, slash packs, slash packs slug eden-pack, slash leaderboard daily, slash valuate cert PSA73628064, slash explain cert cert PSA73628064 question what is the current price and confidence, slash listing cert cert PSA73628064, 그리고 ecosystem reference embed를 표시하는 slash renaiss입니다. 두 번째 cert lookup은 cached 상태이고 market 및 featured routes는 각각 10분과 5분 동안 fresh하게 cache되며 upstream jitter 중 stale-serve에 twenty-four times multiplier를 사용하므로, 모든 command는 5초 이내에 응답합니다.

CLI는 Tool track proof입니다. Change directory to backend slash cli, bun run build를 실행한 다음 PULLCAST_API_URL http localhost 3700 node dist slash pullcast dot mjs trades dash dash limit three를 실행합니다. success true와 sources array가 포함된 한 줄짜리 JSON envelope가 표시됩니다. REST API와 동일한 envelope입니다. marketplace, search luffy, price PSA73628064에 대해서도 반복합니다.

raw REST verification을 위해 curl http localhost 3700 slash health, curl the api slash featured limit three, api slash trades slash recent limit three, api slash marketplace limit three, api slash price slash cert slash PSA73628064, api slash leaderboard slash daily, api slash market을 실행합니다. 모든 response는 data field, sources array, 최소한 BETA warning을 포함하는 warnings array, generated_at timestamp로 이루어진 동일한 envelope를 따릅니다. 그중 어느 것이든 pipe through jq dot success하면 모두 true가 표시되어야 합니다.

시간을 절약하기 위한 몇 가지 일반적인 setup issues가 있습니다. boot log가 모든 endpoint에서 warmed FAILED with status four hundred twenty-nine를 표시한다면 partner secret이 잘못된 것입니다. 정확히 fifty-two characters여야 하고 rsk underscore로 시작해 underscore I로 끝나야 합니다. 한 character가 빠지면 아무런 알림 없이 IP당 하루 열 번의 requests만 제공하는 public tier로 downgrade되므로, 몇 분 안에 daily quota에 도달합니다. slash commands가 Discord에 나타나지 않으면 DISCORD_DEV_GUILD_ID가 설정되지 않은 것입니다. Global commands는 propagate되는 데 최대 한 시간이 걸리지만 guild-scoped commands는 즉시 나타납니다. 모든 route가 Live data paused를 반환하면 Renaiss upstream이 해당 IP를 rate-limiting하는 것입니다. Cloudflare Warp를 사용 중이라면 DNS only HTTPS mode로 전환하십시오. Warp exit IPs는 수천 명의 users가 공유하므로 Renaiss edge에서 throttling되기 때문입니다. Pull of the Day가 비어 있다면 leaderboard cron이 매시간 계산되므로 한 시간을 기다리거나, local Postgres에서 직접 읽는 Recent pulls section으로 scroll하십시오.`,
      judgeNotes: `제가 만든 BOT을 테스트하려면 제 DISCORD에 참여해야 합니다. DISCORD 링크는 다음과 같습니다.
https://discord.gg/5eRP4efhqa

모든 SLASH를 함께 시험해 봅시다.

모든 것이 실제이며 모든 것을 검증할 수 있습니다. github.com/louissarvin/PullCast의 GitHub repository에는 9일간의 build에 걸친 이백다섯 개 commits가 포함되어 있습니다. 실제 partner keys가 들어 있는 dot env file은 disk에 존재하지만 git-ignored 처리되어 있으며 env dot example과 env dot test만 checked in되어 있습니다. submission time 기준으로 cron worker가 index한 실제 BSC pulls 네 개, tracked wallets 세 개, test channel에 이미 게시된 실제 Big Trade Alert 하나, 그리고 실제 LeaderboardSnapshot table에서 계산한 Pull of the Day leaderboard entries 네 개가 있습니다. 90초 demo video에 표시되는 모든 것은 testnet, mocks 또는 seed data 없이 BSC mainnet에서 live로 작동합니다.

제품은 의도적으로 end-to-end read-only입니다. wallet signing, custody, gacha pulls 또는 listing writes가 없습니다. 구매 또는 listing에는 official CLI인 npx renaiss version 0.0.3-beta.2로 users를 넘기며, official CLI가 state-changing actions의 source of truth로 유지됩니다. 이것이 PullCast가 Renaiss를 대체하는 것이 아니라 확장한다고 말하는 의미입니다. 모든 price surface는 response envelope 안에 BETA warning code를 포함합니다. 모든 AI answer는 인용되지 않은 output을 거절하고 최소 두 개 sources를 요구하는 citation guard를 거칩니다. Predictive questions는 model을 호출하기 전에 거절되므로 잘못된 질문에 tokens를 소비하지 않습니다. Rate limiting은 Postgres-backed token buckets를 통해 user별, command별로 atomic하게 적용됩니다.

이 build가 demo-shaped가 아니라 production-shaped인 이유는 Renaiss upstream이 실제로 던지는 bugs를 추적하면서 추가한 hardening에 있습니다. Partner-tier auth boot probe는 user request가 도착하기 전에 keys가 작동함을 증명합니다. 다섯 개 hot endpoints 사이에 2초의 간격을 두는 Boot warmup은 cache를 채우므로 backend restart 이후 slash market을 처음 사용하는 user도 즉시 response를 받습니다. circuit breaker는 upstream이 어떤 Retry-After를 보내더라도 cooldown을 최대 5분으로 제한합니다. Renaiss가 일시적인 per-IP burst limits에 대해 여러 시간짜리 Retry-After를 보내는 경우가 있고, daily quota가 실제로 fresh한데도 15시간 동안 접근이 막히는 상황을 허용하지 않기 때문입니다. twenty-four times TTL multiplier를 사용하는 Stale-serve 덕분에 부분적인 upstream outage는 app이 고장 나는 대신 tiles에 약간 오래된 data가 표시되는 정도로 느껴집니다. card detail routes의 In-flight coalescing은 네 개 waterfall requests인 main plus overview plus fmv plus trades를 deduplicate하므로 cards 사이를 빠르게 navigation해도 burst four hundred twenty-nine가 발생하지 않습니다. Schema drift tolerance를 위해 모든 zod schema는 passthrough with optional fields를 사용합니다. 그래서 Renaiss가 beta 도중 prime confidence tier를 추가했을 때 enum 하나만 bump하면 confidence를 사용하는 모든 command가 계속 작동했습니다.

judge가 기억했으면 하는 한 가지가 무엇이냐고 묻는다면 judge 유형에 따라 답이 달라집니다. builder judge라면, 우리는 Cert Bridge를 해결했고 Renaiss main API tokenIds와 OS Index certs를 출처가 인용된 responses와 함께 하나의 command로 연결한 최초의 client입니다. design judge라면, hero fan은 hover 시 three-D로 움직이고 market page에는 Index가 실제로 무엇인지 설명하는 plain-English explainer가 있으며, empty states는 spinners 대신 실제 copy가 들어간 dashed panels입니다. 또한 모든 surface는 beta disclaimers를 footer에 나중에 붙이는 대신 envelope에 내장합니다. business judge라면, Pull of the Day는 retention hook이고 Big Trade Alerts는 passive engagement layer이며 둘 다 모든 subscribed Discord server 안에서 자동 실행되므로 zero-effort virality를 만듭니다. safety judge라면, end-to-end read-only이고 AI answers는 citations가 없으면 거절되며 모든 route에 rate-limiting이 있고 모든 price envelope에 beta warnings가 있으며, 우리는 Renaiss를 대체하지 않고 확장합니다.

Discord auto share-card에 대해 한 가지 솔직히 공개할 사항이 있습니다. 가장 강력한 UX 순간은 subscribed channel에서 wallet이 Renaiss pack을 여는 즉시 auto-posted share card를 받는 것입니다. 이를 위해서는 active buyer가 있는 실제 address로 slash pullcast subscribe wallet을 실행하는 것과 90초 demo window 안에 live pack opening이 발생하는 것, 두 가지가 필요합니다. live judge session에서 이 timing은 불안정하므로 demo에서는 대신 Big Trade Alerts에 집중합니다. 해당 cron은 indexed BSC trade data를 바탕으로 5분마다 실행되고 test window 중 실제 alert 하나를 이미 게시했기 때문입니다. judges가 auto share-card의 end-to-end 과정을 보고 싶다면 우리가 제어하는 wallet과 시간을 맞춘 live session을 준비할 수 있습니다.

연락은 bot owner에게 Discord DM을 보내거나 GitHub repository에 issue를 등록하면 됩니다. 나머지는 모두 repo README에 있습니다.`,
    }),
    'renaiss-nexus': Object.freeze({
      pitch: '一位收藏家 copilot，提供交易檢查、分級 cert 情報、價格監看、市場提醒、Telegram 推送與 FMV 學習遊戲。',
      description: `Renaiss Nexus 是專為買賣與關注分級卡牌的人打造的收藏家 copilot。

收藏家可以檢查賣家報價、查閱 PSA、CGC 或 BGS cert、詢問一般市場問題、建立目標價格，並直接透過 Telegram 接收重要市場變化。

核心理念是減少重複的手動檢查。收藏家不應每天搜尋同一張卡牌，也不必讓市場儀表板一直開著。Nexus 會運用可取得的 Renaiss 資料立即回答問題，之後也能持續監看所選條件。

本專案也包含 FMV Duel，這是一款使用可取得的已索引卡牌圖片與參考價值的小遊戲，協助收藏家建立對市場的熟悉度。`,
      renaissRelation: `Renaiss Nexus 以 Renaiss 作為產品背後的收藏家資料層。

我們使用 Renaiss OS Index API 進行卡牌搜尋、精選卡牌查詢、近期交易查詢、市場指數查詢、分級 cert 查詢、卡牌參考資料查詢、卡牌詳細資料查詢、交易背景查詢、價格序列查詢與 FMV 序列查詢。

Nexus 不會向使用者直接呈現原始 API 結果，而是將資料轉化為實用的收藏家工作流程。

在 Deal Check 中，使用者可以向 Nexus 提供分級 cert 或卡牌，以及賣家的開價。Nexus 會檢查可取得的 Renaiss 參考資料、計算開價與參考值之間的差距，並說明該報價低於、接近或高於目前可取得的參考值。

在 Price Drop Watch 中，使用者可以透過 Telegram 設定目標。Nexus 會儲存該監看條件，並依排程檢查可取得的 Renaiss 參考值。達到目標條件時，使用者會收到 Telegram 訊息。

Market Mover Alerts 與 New Card Radar 會比較目前的精選 Renaiss Index snapshot 與先前儲存的 snapshot，再將重要變化帶回給收藏家。

Cert Intelligence 使用分級卡牌資料，以收藏家日常使用的語言說明 PSA、CGC 或 BGS cert。

FMV Duel 使用可取得的精選 Renaiss 卡牌圖片與參考價值，建立一款簡單的市場學習遊戲。

我們作為開發者，使用 Renaiss developer tools 作為資料基礎設施。一般使用者只會看到收藏家體驗。`,
      testInstructions: `開啟線上 Demo：

https://renaiss-nexus.netlify.app/

簡單的測試流程如下：

1. 向 Nexus 詢問：
check PSA52269439

2. 接著追問：
seller wants $900 for this is that expensive

Nexus 應保留最近的對話脈絡，並運用可取得的 Renaiss 資料說明賣家報價。

你也可以嘗試：

show trending cards

show recent trades

is Pikachu PSA 10 moving right now

what about recent trades

網站也提供 Deal Check 頁面，可輸入卡牌或 cert，以及賣家的開價。

若要使用 Telegram，請開啟：

@renaiss_nexus_bots

傳送 /start 以開啟指令選單。

此 bot 也支援一般對話，因此你可以直接詢問：

what can you do

is Pikachu PSA 10 moving right now

what about recent trades

is it expensive at $900

實用的 Telegram 快捷指令包括：

/deal PSA52269439 900

/cert PSA52269439

/watch Pikachu PSA 10 700

/watchlist

/movers

/movers_on

/radar_on

/daily_on

價格監看條件與提醒偏好會儲存在該 Telegram chat。監控功能會依排程執行，並檢查可取得的 Renaiss 資料。

可從 Play 區段開啟 FMV Duel。它會載入可取得的精選 Renaiss 卡牌資料、顯示兩張卡牌圖片，並請玩家選出參考價值較高的卡牌。

Renaiss Index 資料目前處於 beta 階段，因此部分卡牌的資料可能不完整或無法取得。`,
      judgeNotes: `本專案始於一個非常簡單的收藏家問題。

人們會反覆詢問「what is this card」、「is this seller asking too much」、「has the market moved」和「can someone tell me when this card gets cheaper」這類問題。

一般查詢網站只能回答一次。

我們希望 Nexus 能處理這套工作流程的兩個部分。

網站是收藏家研究卡牌或檢查報價的地方。

Telegram 則是收藏家離開網站後，Nexus 仍持續工作的地方。

使用者只需設定一次目標價格，之後等待訊息即可。他們可以啟用 market mover alerts 或 New Card Radar，直接在自己原本就使用的 chat 中接收變化。

網站與 Telegram bot 使用同一套 Nexus AI 流程，因此對話可以自然進行，而不會只剩下指令操作。

我們特別避免將 Renaiss 參考值描述為保證成交價或保證獲利。Renaiss Index 資料目前處於 beta 階段，Nexus 會將其明確標示為具有限制的參考資料。

New Card Radar 專門監控精選 Renaiss Index snapshot 中新出現的卡牌，並不會被描述為涵蓋每個新收藏品的完整 feed。

我們的目標並不是再打造一個通用 AI chatbot，而是將 Renaiss 收藏家資料轉化為實用助手，用於檢查交易、理解卡牌、監控目標，並在不必反覆查看同一個儀表板的情況下接收重要變化。`,
    }),
  }),
  ko: Object.freeze({
    'team-index': Object.freeze({
      pitch: 'Renaiss의 marketplace, pack, portfolio, FMV 및 온체인 데이터를 조사, 가치평가, 검증 및 더 안전한 거래 도구로 전환하는 AI agent 계층입니다.',
      description: `Index는 Renaiss 위에 구축된 AI 기반 계층으로, 수집가와 agent가 실물 수집품을 조사하고, 가치를 평가하고, 검증하고, 안전하게 거래할 수 있도록 돕습니다. 분산된 marketplace, 가격, pack 및 온체인 데이터를 인간과 AI가 모두 사용할 수 있는 구조화된 도구로 전환합니다.

Index를 통해 수집가는 다음 작업을 수행할 수 있습니다.

◉wallet 내 자산 가치 평가
◉저평가된 listing 탐색
◉직접 구매와 pack 개봉 비교
◉pack 기대값 계산
◉custody 및 온체인 데이터 검증
◉안전한 거래 제안 생성

Renaiss가 수집품을 온체인으로 가져오고, Index는 그 수집품에 인텔리전스를 더합니다.`,
      renaissRelation: `Index는 Renaiss Protocol 데이터를 기반으로 구축된 AI agent 계층입니다.

Renaiss listing, pack 확률, portfolio, FMV 이력 및 온체인 pool commitment 데이터를 AI agent가 개방형 MCP server를 통해 사용할 수 있는 9개 도구로 전환합니다.

주요 도구는 다음과 같습니다.

* Pack 기대값 및 리스크
* Rip-or-buy 추천
* 잘못 책정된 listing 탐지
* Portfolio 가치평가
* 시장 인사이트
* 온체인 Merkle root 검증

모든 결과에는 출처, timestamp 및 한계가 포함됩니다. Index에는 수집가 중심의 AI agent인 The Curator와 agent-to-agent 거래 데모도 포함되어 있습니다.

API access가 제공되면 실시간 Renaiss 데이터를 사용하고, 오프라인 심사에서는 명확하게 표시된 snapshot 데이터를 사용합니다.`,
      testInstructions: `요구 사항: Node.js 20+. 계정이나 API key는 필요하지 않습니다.

git clone https://github.com/Enoch208/Index
cd Index
npm install
npm test
npm run dev

테스트 모음에 42개 테스트가 통과했다고 표시되어야 합니다. 다음 주소를 엽니다.

http://localhost:3000/dashboard

심사위원은 다음 기능을 테스트할 수 있습니다.

* Curator 채팅
* Portfolio 가치평가
* 오가격 스캐너
* Rip-or-buy 분석
* Pack EV
* 공정성 검증

샘플 데이터:

* Wallet: 0xdemo
* Pack: eden-pack
* Cards: charizard-base-psa9-014, eevee-heroes-psa10-001

다음 명령으로 MCP server를 실행합니다.

npm run mcp

선택적 환경 변수로 실시간 Renaiss 데이터, AI 채팅 및 온체인 검증을 활성화할 수 있습니다.

라이브 데모: https://useindex.vercel.app`,
      judgeNotes: '없음',
    }),
    dokipoki: Object.freeze({
      pitch: 'Renaiss 시장 및 재고 데이터를 트레이딩 카드 매장을 위한 Promote, Hold 및 Clear 결정으로 전환하는 merchant copilot입니다.',
      description: 'Merchant Copilot은 트레이딩 카드 매장을 위한 merchant-facing dashboard로, Renaiss 시장 데이터를 실행 가능한 판매 결정으로 전환합니다. 매장 운영자가 시장 상황을 파악하고, 자신의 재고를 전체 시장과 비교하고, 어떤 카드를 주요 상품으로 내세우거나 홍보할지 식별하며, 어떤 카드를 보유하거나 정리하는 편이 나은지 찾을 수 있도록 돕습니다.',
      renaissRelation: `Index 데이터: 카드 매장의 전반적인 시장 상황을 보여줍니다.
FMV 시계열: 매장 재고의 성과를 전체 시장과 비교합니다.
카드별 시장 데이터: 주요 상품 및 프로모션에 적합한 잠재력 높은 카드를 식별합니다.
거래 데이터: 실제 모멘텀과 유동성이 있는 카드를 보여줍니다.
등급 카드 조회: 빠른 가치평가와 merchant 의사결정을 지원합니다.
시장 신호: 실시간 카드 데이터를 Promote, Hold 및 Clear 조치로 전환합니다.
시장 인프라: merchant-facing 인텔리전스 및 재고 의사결정 도구를 구동합니다.`,
      testInstructions: `이 앱은 두 페이지로 구성된 merchant 경험으로 설계되었습니다.

1. Dashboard: 시장 상황, 주요 카드, 프로모션 후보, 빠르게 판매되는 카드, 시장보다 우수한 성과를 내거나 index movers에 등장하는 재고 카드를 보여줍니다.
2. Inventory: merchant 재고의 원가, 가격, 시장 비교, 상대 강도, 거래 이력 데모 및 Push / Hold / Clear 제안을 보여줍니다.

---
심사위원은 미리 로드된 해커톤 데이터를 사용해 데모를 살펴볼 수 있습니다.

권장 테스트 흐름:
1. Dashboard를 열고 시장 지수와 추천 카드를 확인합니다.
2. 프로모션, 빠른 판매 또는 특별한 주의 대상으로 표시된 카드를 확인합니다.
3. Inventory를 열고 개별 카드, 시장 비교 차트 및 제안된 조치를 살펴봅니다.
4. 재고 카드가 Promote, Hold 및 Clear로 어떻게 분류되는지 확인합니다.`,
      judgeNotes: '',
    }),
    'renaiss-collector-console': Object.freeze({
      pitch: '커뮤니티 참여를 Renaiss Credits, campaign pack, collection, ranking과 analytics로 전환하는 Telegram 및 dashboard 운영 layer입니다.',
      description: 'Renaiss Collector Console은 collector campaign을 위한 community operations tool입니다. Telegram 참여로 Renaiss Credits를 얻고, Credits로 Campaign Packs를 열며, pack은 가상의 Renaiss Slab Card collection record를 생성합니다. 수집가는 시각적인 pack-opening flow, grouped collection, ranking과 display-only BNB Chain wallet link를 이용할 수 있고, community administrator는 bot DM에서 campaign probability와 eligibility rule을 관리하고 dashboard에서 결과를 검토할 수 있습니다.',
      renaissRelation: '이 프로젝트는 Renaiss collector economy를 위한 community operations layer로 구축되었습니다. 커뮤니티 참여를 Credits, Campaign Packs, 가상의 Slab Card drop, collection, ranking과 campaign analytics로 이어지는 측정 가능한 collector loop로 전환합니다. dashboard는 공개 Renaiss OS Index featured-cards endpoint도 통합하여 출처가 명확히 표시된 beta market-reference context로 제공합니다. Renaiss Index data는 prototype의 가상 off-chain drop과 분리되며, UI에는 source, assumption과 limitation이 명시됩니다.',
      testInstructions: `빠른 live demo: https://t.me/RenaissPackBot 을 열고 /start를 보냅니다. Telegram group을 새로 만들거나 기존 group을 사용해 bot을 추가한 뒤, 해당 group의 Telegram administrator 권한으로 /allowchat를 실행합니다. group에서 'renaiss settings'를 보낸 다음 bot DM에서 'renaiss settings'를 보내고 해당 group을 선택합니다. DM panel에서 Activity Credit chance, card-tier chances, Pack Booster bonus/duration, cooldown, minimum message length, card names, stock과 duplicate-win rules를 설정할 수 있습니다. group에서는 'renaiss', 'renaiss credits', 'renaiss open pack', 'renaiss collection', 'renaiss drops', 'renaiss rank'를 사용합니다. 전체 운영 가이드: https://github.com/YounJae-H/renaiss-collector-console/blob/main/docs/COMMAND_REFERENCE.md#dm-settings-panel . 로컬 web demo: repo를 clone하고 'cd dashboard', 'npm install', 'npm run dev'를 실행한 뒤 http://127.0.0.1:3001/guide 를 엽니다. 내장 demo data에는 database가 필요하지 않습니다. 'python demo_bot_flow.py'로 offline bot transcript도 확인할 수 있습니다.`,
      judgeNotes: '모든 demo card와 artwork는 독창적으로 제작한 가상의 Renaiss campaign asset입니다. MVP는 의도적으로 off-chain으로 설계되어 minting, wallet signing, custody, token transfer, physical-card claim 또는 marketplace listing을 수행하지 않습니다. BNB Chain wallet 지원은 display-only입니다. Renaiss OS Index API는 beta/experimental 상태이므로 불완전하거나 지연되거나 이용할 수 없을 수 있습니다. dashboard는 오류를 안전하게 처리하고 이를 reference data로 표시합니다. repository에는 bot token, database URL, private community data 또는 production credentials가 포함되어 있지 않습니다.',
    }),
    'vinci-appraiser': Object.freeze({
      pitch: 'live Renaiss card, FMV check, SBT provenance와 multi-signature custody를 통해 RWA due diligence를 가르치는 pixel-art action RPG입니다.',
      description: 'Vinci Appraiser는 Web3 onboarding을 게임화한 pixel-art action RPG입니다. whitepaper를 읽는 대신 플레이어는 arena에서 싸워 gold를 얻고, Renaiss marketplace API에서 live로 가져온 실제 collectible card가 진열된 shop에서 이를 사용합니다. 안전하게 구매하려면 FMV Oracle, SBT provenance, multi-sig custody라는 세 가지 on-chain check를 수행하고 각각의 의미를 쉬운 말로 배워야 합니다. 검증된 card는 stat을 높이고 가짜 card는 플레이어를 약화시킵니다. RWA due diligence를 번거로운 작업에서 핵심 gameplay mechanic으로 바꿉니다.',
      renaissRelation: `Vinci Appraiser는 Renaiss Index API 위에 직접 구축되어 live marketplace listings를 가져오므로, 게임 내 card shop에는 placeholder 대신 실제 collectible card가 진열됩니다. 각 card에는 fair market value, owner address, vault location, PSA grade, grading company와 ask price를 포함한 실제 Renaiss data가 담깁니다. 이 data는 gameplay와 그 안의 학습 콘텐츠를 모두 구동합니다.

게임은 세 가지 핵심 Renaiss 개념을 게임 내 check로 구현합니다. FMV Oracle check는 card 가격을 fair market value와 비교하여 price oracle이 과도한 지불을 방지하는 방식을 가르칩니다. SBT provenance check는 card의 owner address를 확인하여 soulbound token이 ownership history를 증명하는 방식을 보여줍니다. vault multi-sig check는 custody requirements를 card grade와 연결하여 multi-signature vault가 더 높은 가치의 asset을 보호하는 방식을 보여줍니다.

card image는 Renaiss marketplace data에서 직접 가져오며, 이미지가 없을 때만 Pokemon TCG API를 backup으로 사용합니다. grade와 price data는 shop의 pricing tiers와 card 장착 시 제공되는 stat bonuses도 결정하므로, 게임 내 economy는 가상의 시장이 아니라 Renaiss의 실제 marketplace를 반영합니다.

향후 단계에서는 real SBT registry lookups, actual Gnosis Safe multi-sig checks를 추가하고, 최종적으로 게임 내 구매가 Vinci World smart contract에서 실제 RWA mint를 trigger하도록 하여 이 게임을 protocol로 들어가는 실질적인 entry point로 발전시킬 예정입니다.`,
      testInstructions: `심사위원은 https://vinciappraiser.creates.works/ 에서 Vinci Appraiser를 바로 플레이할 수 있습니다. login, wallet 또는 어떤 credentials도 필요하지 않으며, 링크를 열고 플레이하면 됩니다.

빠른 walkthrough:
1. Town에서 WASD로 이동하고 Arena, Shop 또는 Home에 들어갑니다(Space).
2. Arena에서 floor를 고르고 WASD로 이동하며 click/Space로 공격하고 Shift로 dodge합니다.
3. gold를 얻은 뒤 Shop으로 가서 Renaiss marketplace API에서 live로 가져온 실제 card를 둘러봅니다.
4. card의 Inspect를 클릭하여 FMV Oracle, SBT Provenance와 Vault Multi-Sig checks를 실행한 다음 Buy 또는 Pass를 선택합니다.
5. Home으로 가서 card를 장착하고 Power Level이 업데이트되는 것을 확인한 뒤 Arena로 돌아가 더 어려운 floor가 unlock되었는지 확인합니다.`,
      judgeNotes: 'Vinci Appraiser는 Web3 verification concept를 newcomer가 실제로 이해할 수 있게 만들려는 시도에서 시작했습니다. 저 자신도 newcomer이기 때문입니다. 문서만 읽는 대신 직접 구축하면서 Renaiss와 verification system이 작동하는 방식을 배웠고, 그 과정이 게임 전체의 design을 만들었습니다. 플레이어가 수행하는 모든 check는 제가 먼저 배워야 했던 concept이기도 합니다. 이 프로젝트는 실제 data가 gameplay와 education을 모두 구동하는 core loop를 증명하는 working prototype이며, 향후 real SBT lookups, Gnosis Safe integration과 on-chain minting으로 이어지는 명확한 roadmap도 갖고 있습니다. 저와 같은 newcomer에게 자칫 위협적으로 느껴질 수 있는 공간에 진입할 수 있는 진정으로 친근한 방법을 제공한 이 initiative를 높이 평가하며, 바로 그 접근성을 이 프로젝트를 통해 더 확장하고 싶습니다.',
    }),
    cardscene: Object.freeze({
      pitch: 'Renaiss 카드, SBT, 소셜 방문, 미니게임을 몰입형 공간 전시로 바꾸는 인터랙티브 3D 수집가 방입니다.',
      description: `CardScene은 TCG 카드 수집가를 위해 설계된 인터랙티브 3D 공간형 컬렉션 전시 웹 애플리케이션입니다.

CardScene은 경직된 전통적 list 또는 grid UI를 벗어나, 완성도 높고 아늑한 게이머 방 안에서 사용자가 자신의 컬렉션을 탐색하게 합니다. 카드 보관함, 컴퓨터, 앨범, 방명록 등 방 안의 여러 오브젝트와 자연스럽게 상호작용하며, 실시간 낮과 밤 주기에 따라 분위기가 변하는 환경에서 카드 컬렉션, SBT, 미니게임 등을 경험할 수 있습니다.

CardScene은 단순히 카드를 보여주는 데 그치지 않고, 진정한 소유감(실제로 나의 방)과 깊은 몰입감(친구의 방 방문)을 제공하는 차세대 수집가 소셜 공간을 목표로 합니다.`,
      renaissRelation: `CardScene은 Renaiss Protocol의 public API를 적극적으로 활용해 온체인과 오프체인 데이터를 인터랙티브 3D 공간에 자연스럽게 연결하는 UI/UX layer 프로젝트입니다.

수집가 데이터 통합:
User API (/v0/users/{id})를 사용해 사용자 profile과 avatar (avatarUrl)를 동기화하므로, profile 변경 사항이 방 안에 자동으로 반영됩니다.

사용자가 지정한 Showcase 카드 (favoritedCollectibles)와 Favorite SBT (favoritedSBTs)를 가져와 방의 핵심 전시 요소로 배치하고, 100% 실제 데이터 기반의 개인화 공간을 구현합니다. (아직 Showcase를 설정하지 않은 사용자를 위해 tokenId 기반 로딩도 지원합니다.)

Favorite SBT 데이터가 없으면 BNB Smart Chain의 온체인 SBT contract를 직접 조회하는 fallback logic을 구현해 데이터 연속성을 보장합니다.

카드 도구 및 실물 카드 지원:
Marketplace API (/v0/marketplace)와 Card API (/v0/cards/{tokenId})를 사용해 전체 컬렉션과 카드 이미지, 희귀도, FMV (Fair Market Value) 등의 metadata를 가져오고, 방 안의 액자와 앨범 오브젝트에 자연스럽게 매핑합니다.

디지털 컬렉션뿐 아니라 Physical Cards 등록 및 전시도 지원합니다. 또한 독립형 "Gallery Mode" 도구를 제공해 사용자가 카드의 시각 요소와 metadata에만 온전히 몰입할 수 있습니다.

커뮤니티 도구 및 게임 경험 (Multi-room):
다른 Renaiss 사용자의 profile UUID를 입력하는 것만으로 다른 방을 방문할 수 있는 Multi-room 환경을 제공합니다.

이를 통해 CardScene은 Renaiss 생태계의 소셜 및 커뮤니티 hub로 확장됩니다. 사용자는 친구의 방을 방문하고 실제 Showcase와 SBT를 둘러보며, 방명록 메시지를 남기고 미니게임을 함께 즐길 수 있습니다.`,
      testInstructions: `1. Live Demo 접속

다음 링크에서 live application을 즉시 테스트할 수 있습니다: https://cardscene.vercel.app/

로컬에서 실행하려면 GitHub repository의 README를 참고하세요: https://github.com/dadaclub/renaiss

2. 인증 및 입장

원활한 심사를 위해 Mock Authentication 시스템을 구현했습니다. 복잡한 wallet 연결이나 등록 절차를 건너뛰고 main screen의 login button을 클릭하기만 하면 demo account로 dashboard와 3D room에 바로 입장할 수 있습니다.

3. 핵심 테스트 시나리오

책상 위 피규어(커뮤니티 생태계 링크): 컴퓨터 모니터 오른쪽에 줄지어 놓인 각 피규어를 클릭하면 Renaiss 생태계 및 해당 커뮤니티 채널로 이동합니다.

링크: Renaiss Official Site (https://www.renaiss.xyz/), Founder Winchman's X (https://x.com/Plus_Ultra_715), Renaiss Discord (https://x.com/Plus_Ultra_715), Renaiss Community X (https://x.com/Renaiss_cmty), Vinci World X (https://x.com/vinciwld).

컴퓨터 모니터(미니게임): 책상 위 PC monitor를 클릭하면 고전 arcade 스타일의 "Winchman Run" 2D platformer 미니게임을 실행하고 플레이할 수 있습니다.

왼쪽 아래 바닥의 펼쳐진 notebook(방명록 및 Multi-room): 의자 왼쪽 바닥에 놓인 펼쳐진 notebook을 클릭해 Guestbook을 엽니다. 메시지를 남긴 사용자의 profile(home) icon을 클릭하면 해당 사용자의 방으로 즉시 전환되고 실제 Renaiss Showcase와 SBT 데이터가 동적으로 로드됩니다.

오른쪽 아래 바닥의 SBT 앨범 책더미(SBT Viewer): 의자 오른쪽 바닥의 책더미를 클릭하면 사용자가 실제로 획득한 SBT 컬렉션을 볼 수 있습니다.

Showcase 선반 및 액자(카드 컬렉션): 왼쪽 큰 선반의 카드 또는 벽의 액자를 클릭해 Renaiss API 기반 카드 metadata를 탐색하고 전용 Gallery Mode로 들어갑니다.`,
      judgeNotes: `시간에 따라 변하는 시각적 디테일(실시간 낮/밤 주기)

이 공간이 정말 "자신의 방"처럼 느껴지도록, 사용자의 실제 실시간 시계를 기준으로 방의 조명과 색온도가 낮과 밤 모드 사이에서 자동으로 바뀌는 시각 시스템을 직접 구현했습니다.

실물 카드 가격 데이터 처리(제약 극복)

프로젝트는 디지털 카드와 실물 카드의 등록 및 시각화를 모두 지원합니다. 다만 실물 카드의 live price lookup에서는 외부 전문 API의 유료 tier 제한에 부딪혔습니다. UI가 깨지는 것을 방지하고 심사 중 높은 시각적 완성도를 유지하기 위해 demo의 일부 핵심 가격 데이터 포인트를 전략적으로 hard-code했습니다. 이 구현 세부사항을 양해해 주시기 바랍니다.

프로젝트의 궁극적 비전

CardScene은 기존 wallet 또는 trading 기능을 복제하는 대신 Renaiss Protocol의 견고한 데이터 인프라를 활용해, 수집가가 자산을 가장 매력적이고 몰입감 있게 시각화하고 공유할 수 있는 차세대 소셜 UI/UX 패러다임을 제시하는 데 집중합니다.`,
    }),
    pullprophet: Object.freeze({
      pitch: 'live 온체인 gacha pool, loot box, Renaiss card pack을 위한 deterministic expected-value engine이자 AI analyst입니다.',
      description: `PullProphet은 BNB Chain의 온체인 gacha pool, loot box, card pack을 위한 실시간 expected-value engine이자 AI analyst입니다. finite pool이 소진되기 시작하는 순간 광고된 확률은 현실과 달라질 수 있으므로, PullProphet은 각 pool의 live 온체인 inventory와 실제 secondary market floor price를 읽어 다음 pull의 진짜 expected value를 계속 재계산하고, 이를 이해하기 쉬운 +EV / −EV verdict로 전달합니다. 핵심 보장은 AI가 수학 계산을 절대 하지 않는다는 점입니다. 모든 수치는 deterministic engine에서 나오며 온체인에서 추적되고 암호학적으로 서명됩니다. pull의 가치 여부를 판단하려는 수집가와 trader를 위해 만들어졌으며, 규제 기관의 검토가 강화되는 온체인 loot-box 경제를 위한 transparency layer이기도 합니다.
`,
      renaissRelation: `PullProphet은 두 가지 상호보완적 방식으로 Renaiss Protocol과 통합됩니다. 첫째, Renaiss CLI와 Packs API (api.renaiss.xyz/v0/packs)를 통해 실제 Renaiss pack을 분석하고, 각 pack의 광고 가격, 공개 expected value (EV), featured-card fair market value (FMV), recent pull stream을 읽습니다. Renaiss가 공개한 지표와 플레이어가 실제로 뽑은 결과를 비교해 실제 pack을 열 가치가 있는지 근거 있는 +EV / −EV verdict를 제공합니다.
둘째, PullProphet은 시스템 내 모든 카드 가격의 source of truth인 Renaiss OS Index API 위에 직접 구축되었습니다. Market Data module은 GET /v1/cards/{game}/{set}/{card}를 조회하고 priceUsdCents를 읽어 각 카드의 live secondary market floor price를 확인하며, card slug는 GET /v1/search를 통해 해석합니다. API key로 인증하고 요청을 batch 및 cache해 Index의 rate limit을 준수합니다.
이 live market price는 다음 공식으로 PullProphet의 deterministic expected-value engine을 구동합니다: EV = Σ (remainingᵢ / total_remaining × Renaiss floorᵢ) − pack_cost. finite pool이 소진되고 고가 카드가 뽑히면 engine은 남은 inventory와 현재 Renaiss floor price를 기준으로 진짜 expected value를 계속 재계산합니다. live demo pool인 "Charizard Line"은 Renaiss OS Index에서 확인한 실제 PSA 10 Pokémon 카드로 구성되며, 약 US$431 가치의 진짜 Charizard chase도 포함합니다. 따라서 모든 verdict는 조작된 값이 아니라 실제 market data에 기반합니다.
두 integration 모두 live 및 재현 가능한 snapshot mode를 지원합니다. 모든 수치는 deterministic하게 계산되고 암호학적으로 추적 가능하며 Renaiss 데이터에 직접 귀속됩니다. AI는 결과를 쉬운 언어로 설명하지만 underlying number를 생성하거나 꾸며내지 않습니다.`,
      testInstructions: `설치, wallet, test account가 필요하지 않습니다. application은 live이며 read-only입니다.

제출된 Vercel link로 app을 엽니다. 첫 방문 시 free-tier backend가 sleep에서 깨어나도록 약 30–60초 기다려 주세요. 이후에는 정상적으로 응답합니다.

Market page는 네 개 pool 모두를 live 온체인 expected-value edge 기준으로 순위화하고 AI-generated market summary를 제공합니다. 모든 수치는 강조 표시되며 deterministic engine까지 추적할 수 있습니다.

Pokémon Base Set, Unlimited 같은 pool을 엽니다. 쉬운 +EV 또는 −EV verdict 다음에 Proof section이 나타나 AI가 계산을 하지 않는다는 사실을 보여줍니다. engine fact sheet와 verdict를 함께 제시하고, 모든 numerical value를 검증하며, AI가 참조한 수치를 추적하고, browser가 live로 검증하는 온체인 EIP-712 attestation을 표시합니다.

What-if Simulator에서 pack 수를 5, 20, 50으로 조정하고 projected profit-and-loss confidence cone과 outcome distribution이 실시간으로 업데이트되는지 확인합니다.

Ask the Prophet에서 "How many pulls until this becomes −EV?" 또는 "What happens if the chase card's floor price falls by 30%?" 같은 질문을 시도합니다. AI는 deterministic engine tool을 호출해 답하고, response의 모든 numerical value는 underlying engine output으로 연결됩니다.

Pack Prophet에서 Eden Pack, OMEGA, RenaCrypt 등 실제 Renaiss pack을 분석합니다. 각 pack의 advertised price와 expected value를 observed pull data와 비교해 현재 pack opening이 positive expected value인지 negative expected value인지 판단합니다.

마지막으로 BNB Chain Testnet contract link를 열어 온체인 deployment를 검증합니다. 각 pool contract는 source-verified 상태이며 해당 BscScan page로 직접 연결됩니다.

Wallet connection은 완전히 선택 사항이며 자신이 eligible한 pool을 표시하는 데만 사용됩니다. wallet을 연결하지 않아도 모든 core functionality를 평가할 수 있습니다. verdict에 "deterministic narrator"가 표시되면 Groq의 무료 일일 API quota가 소진된 것입니다. 모든 수치는 deterministic engine이 생성하므로 calculation, proof trace, verdict는 동일하고 wording만 달라집니다. live Simulate Crossing 기능과 Telegram alert는 local blockchain instance와 always-on background worker에 의존하므로 project walkthrough에서 시연됩니다. complete interactive version을 직접 실행하려면 repository README의 Run it locally 지침을 따르세요.`,
      judgeNotes: `AI narration (Groq / Llama). PullProphet은 Groq free tier의 Llama 3.3 70B Versatile을 사용해 deterministic output을 plain-language verdict로 바꿉니다. Groq free tier에는 일일 request limit이 있으므로 한도가 소진되면 application이 deterministic template narrator로 자동 fallback합니다. underlying engine은 여전히 모든 수치를 계산하므로 verdict, calculation, proof trace, 온체인 attestation은 동일합니다. 유일한 차이는 Proof panel에 "phrased by llama-3.3-70b-versatile" 대신 "deterministic narrator"가 표시된다는 점입니다.
Whale Sniper (Telegram alerts). 양방향 expected-value crossing detector와 Telegram notification bot은 완전히 구현되고 테스트되었습니다. 하지만 Render free hosting tier에서는 continuous background worker를 사용할 수 없어 live Telegram notification은 deployed application에서 상시 실행되는 대신 project walkthrough에서 시연됩니다. hosted dashboard는 Market view를 통해 같은 기능을 제공합니다. expected value를 계속 재계산하고 pool 순위를 다시 매기며, alert system과 동일한 deterministic engine으로 방금 +EV 또는 −EV로 넘어간 pool을 표시합니다.`,
    }),
    pullcast: Object.freeze({
      pitch: 'Discord, web, CLI 전반에서 pack share card, Cert Bridge pricing, trade alert와 leaderboard를 제공하는 read-only Renaiss community client입니다.',
      description: `PullCast는 Renaiss collector를 위한 read-only community client입니다. BSC mainnet에서 Renaiss pack opening을 감시하고, 모든 pull을 영구적인 share card로 만들어 Discord에 자동 게시하며 web의 public gallery에도 표시합니다. 대표 기능인 Cert Bridge는 Renaiss main API와 Renaiss OS Index API를 하나의 command로 연결해 tokenId 또는 cert serial로 graded FMV를 조회합니다.

Big Trade Alert cron은 live graded trade를 5분마다 확인해 subscribed Discord server에 알림을 게시하고, Pull of the Day leaderboard는 최근 24시간의 net-gain pull 상위 3개를 매시간 갱신합니다. 제품은 열아홉 개 slash command가 있는 Discord bot, 열두 개 server-rendered route가 있는 web app, official renaiss CLI의 read verb를 반영한 npx pullcast CLI 등 세 채널로 제공됩니다.`,
      renaissRelation: `PullCast는 Hackathon S1에서 제공된 세 가지 Renaiss builder surface인 main API, OS Index API, official CLI를 함께 사용하는 community client입니다. Main API의 collectibles, marketplace, packs, wallets, graded cert, report endpoint와 OS Index의 indices, featured, card detail, recent trades, search, set listing을 연결합니다.

Cert Bridge는 main API의 tokenId와 OS Index의 cert serial을 하나의 흐름으로 묶고, 결과에 두 upstream source를 모두 표시합니다. 온체인 read는 ethers v6로 BSC mainnet의 Registry V3, TokenVendingMachine, Orderbook을 조회하지만 signer, wallet, private key를 로드하지 않아 transaction을 전송할 수 없습니다.

collector gallery, Card Lens, 30일 FMV sparkline, per-grade table, Big Trade Alert, Pull of the Day, CardOfTheDay를 제공하며, AI 설명은 Groq Llama 3.3 70B를 사용합니다. Predictive question은 model 호출 전에 거절하고, AI answer는 최소 두 개 source와 paragraph별 citation이 없으면 게시하지 않습니다. 모든 response envelope에는 BETA warning과 upstream URL이 포함됩니다.`,
      testInstructions: `가장 빠른 확인 방법은 https://pullcast.vercel.app/ 과 demo video https://youtu.be/CkyrCXgSS1c 를 여는 것입니다. homepage의 share-card fan, Pull of the Day, /market, /trades, /featured, /stats, /ecosystem, wallet gallery를 확인합니다. Discord demo는 https://discord.gg/5eRP4efhqa 에서 진행합니다.

로컬 실행에는 Bun 1.x, PostgreSQL 16, Discord bot token, Renaiss OS Index partner key가 필요합니다. repo를 clone한 뒤 backend에서 bun install, env.example 복사, DATABASE_URL, DISCORD_BOT_TOKEN, DISCORD_APP_ID, DISCORD_DEV_GUILD_ID, RENAISS_INDEX_KEY_ID, RENAISS_INDEX_SECRET을 설정하고 bun run db push, bun dev를 실행합니다. GROQ_API_KEY는 explain, listing, valuate photo를 테스트할 때만 필요합니다. RENAISS_INDEX_SECRET은 정확히 52 characters여야 합니다.

두 번째 terminal에서 web directory로 이동해 bun install, bun dev를 실행합니다. Discord에서 /price cert PSA73628064, /market, /featured, /trades, /search, /packs, /leaderboard daily를 테스트할 수 있습니다. CLI는 backend/cli에서 bun run build 후 PULLCAST_API_URL=http://localhost:3700 node dist/pullcast.mjs trades --limit 3 형태로 확인합니다. REST response에는 data, sources, warnings, generated_at이 포함되어야 합니다.`,
      judgeNotes: `PullCast는 end-to-end read-only이며 wallet signing, custody, gacha pull, listing write를 수행하지 않습니다. 상태 변경은 official npx renaiss CLI에 맡기고, 가격 화면에는 BETA warning과 source citation을 유지합니다. 실제 partner key가 들어 있는 .env는 git-ignored이고 env.example과 env.test만 repository에 포함됩니다.

Discord auto share-card는 active buyer wallet의 실제 pack opening timing에 의존하므로 judge session에서 재현이 불안정할 수 있습니다. 따라서 demo에서는 5분마다 indexed BSC trade data를 확인하는 Big Trade Alert를 주요 증거로 사용합니다. 연락은 bot owner의 Discord DM 또는 GitHub issue를 이용합니다.`,
    }),
    'renaiss-nexus': Object.freeze({
      pitch: '거래 확인, 등급 cert 정보, 가격 모니터링, 시장 알림, Telegram 전달, FMV 학습 게임을 제공하는 수집가용 copilot입니다.',
      description: `Renaiss Nexus는 등급 카드를 사고팔고 시장 동향을 추적하는 사람들을 위한 수집가용 copilot입니다.

수집가는 판매자 제안을 확인하고, PSA, CGC 또는 BGS cert를 살펴보고, 일반적인 시장 질문을 하고, 목표 가격을 설정하고, 중요한 시장 변화를 Telegram으로 직접 받을 수 있습니다.

핵심 아이디어는 반복적인 수동 확인을 줄이는 것입니다. 수집가가 매일 같은 카드를 검색하거나 시장 dashboard를 계속 열어 둘 필요가 없어야 합니다. Nexus는 이용 가능한 Renaiss 데이터를 사용해 지금 질문에 답하고, 이후에도 선택한 조건을 계속 모니터링할 수 있습니다.

이 프로젝트에는 이용 가능한 indexed card 이미지와 reference value를 활용해 수집가가 시장 감각을 익히도록 돕는 작은 게임인 FMV Duel도 포함됩니다.`,
      renaissRelation: `Renaiss Nexus는 제품을 뒷받침하는 수집가 data layer로 Renaiss를 사용합니다.

Renaiss OS Index API를 사용해 카드 검색, featured card, recent trade, market index, graded cert 조회, card reference data, card detail, trade context, price series, FMV series를 확인합니다.

Nexus는 raw API result를 사용자에게 그대로 보여주는 대신 데이터를 실용적인 수집가 workflow로 바꿉니다.

Deal Check에서는 사용자가 Nexus에 graded cert 또는 카드와 판매자 희망 가격을 제공할 수 있습니다. Nexus는 이용 가능한 Renaiss reference data를 확인하고, 희망 가격과 reference 사이의 차이를 계산한 뒤, 해당 제안이 이용 가능한 reference보다 낮은지, 비슷한지 또는 높은지 설명합니다.

Price Drop Watch에서는 사용자가 Telegram을 통해 목표를 설정할 수 있습니다. Nexus는 해당 watch를 저장하고 일정에 따라 이용 가능한 Renaiss reference를 확인합니다. 목표 조건에 도달하면 사용자는 Telegram message를 받습니다.

Market Mover Alerts와 New Card Radar는 현재의 featured Renaiss Index snapshot을 이전에 저장된 snapshot과 비교하고, 중요한 변화를 수집가에게 전달합니다.

Cert Intelligence는 graded card data를 사용해 PSA, CGC 또는 BGS cert를 수집가가 일상적으로 사용하는 언어로 설명합니다.

FMV Duel은 이용 가능한 featured Renaiss card 이미지와 reference value를 사용해 간단한 시장 학습 게임을 만듭니다.

우리는 개발자이자 데이터 인프라 구축자로서 Renaiss developer tools를 사용합니다. 일반 사용자는 수집가 경험만 보게 됩니다.`,
      testInstructions: `live demo를 엽니다:

https://renaiss-nexus.netlify.app/

간단한 테스트 흐름은 다음과 같습니다:

1. Nexus에 질문합니다:
check PSA52269439

2. 이어서 질문합니다:
seller wants $900 for this is that expensive

Nexus는 최근 대화 맥락을 유지하고 이용 가능한 Renaiss 데이터를 사용해 판매자 제안을 설명해야 합니다.

다음 질문도 시도할 수 있습니다:

show trending cards

show recent trades

is Pikachu PSA 10 moving right now

what about recent trades

웹사이트에는 카드 또는 cert와 판매자 희망 가격을 입력할 수 있는 Deal Check page도 있습니다.

Telegram에서는 다음을 엽니다:

@renaiss_nexus_bots

/start를 보내 command menu를 엽니다.

bot은 일반 대화도 지원하므로 다음과 같이 바로 질문할 수 있습니다:

what can you do

is Pikachu PSA 10 moving right now

what about recent trades

is it expensive at $900

유용한 Telegram shortcut은 다음과 같습니다:

/deal PSA52269439 900

/cert PSA52269439

/watch Pikachu PSA 10 700

/watchlist

/movers

/movers_on

/radar_on

/daily_on

가격 watch와 alert preference는 해당 Telegram chat에 저장됩니다. monitoring function은 일정에 따라 실행되며 이용 가능한 Renaiss 데이터를 확인합니다.

Play section에서 FMV Duel을 열 수 있습니다. 이용 가능한 featured Renaiss card data를 불러오고 두 장의 카드 이미지를 보여 준 뒤, 어느 카드의 reference value가 더 높은지 선택하게 합니다.

Renaiss Index data는 beta 상태이므로 일부 카드의 데이터가 불완전하거나 제공되지 않을 수 있습니다.`,
      judgeNotes: `이 프로젝트는 매우 단순한 수집가의 문제에서 시작되었습니다.

사람들은 「what is this card」, 「is this seller asking too much」, 「has the market moved」, 「can someone tell me when this card gets cheaper」 같은 질문을 반복해서 합니다.

일반적인 조회 웹사이트는 그 질문을 한 번만 해결합니다.

우리는 Nexus가 workflow의 두 부분을 모두 해결하기를 원했습니다.

웹사이트는 수집가가 카드를 조사하거나 제안을 확인하는 곳입니다.

Telegram은 수집가가 웹사이트를 떠난 뒤에도 Nexus가 계속 일하는 곳입니다.

사용자는 목표 가격을 한 번 설정하고 메시지를 기다릴 수 있습니다. market mover alerts 또는 New Card Radar를 활성화해 이미 사용하고 있는 chat에서 직접 변화를 받을 수도 있습니다.

웹사이트와 Telegram bot은 같은 Nexus AI flow를 사용하므로, 대화가 command only 방식이 아니라 자연스럽게 느껴질 수 있습니다.

우리는 Renaiss reference value를 보장된 판매 가격이나 보장된 수익으로 표현하지 않도록 주의했습니다. Renaiss Index data는 beta 상태이며, Nexus는 명확한 제한 사항과 함께 이를 reference data로 제시합니다.

New Card Radar는 featured Renaiss Index snapshot에 새로 나타나는 카드를 구체적으로 모니터링합니다. 모든 신규 collection을 포함하는 완전한 feed로 설명하지 않습니다.

우리의 목표는 또 하나의 범용 AI chatbot을 만드는 것이 아니었습니다. 목표는 Renaiss 수집가 데이터를 활용해 거래를 확인하고, 카드를 이해하고, 목표를 모니터링하고, 같은 dashboard를 반복해서 확인하지 않아도 중요한 변화를 받을 수 있는 실용적인 assistant로 바꾸는 것이었습니다.`,
    }),
  }),
});
