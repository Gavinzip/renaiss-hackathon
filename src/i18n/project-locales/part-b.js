export const PROJECT_TRANSLATIONS_B = Object.freeze({
  'zh-Hant': Object.freeze({
    chainsight: Object.freeze({
      pitch: '一款 AI 市場助理，可透過自然語言探索卡牌、掌握市場異動、交易、價格歷史與鑑定卡估值。',
      description: 'ChainSight 是一款專為收藏家與交易者打造的 AI 卡牌市場情報助理。使用者可以提出自然語言問題、探索卡牌、查看市場異動標的與近期交易，並深入檢視個別卡牌的市場分析。ChainSight 彙整 Renaiss Index API 的多種信號，包括卡牌搜尋、市場指數、精選異動標的、近期交易、價格歷史與鑑定卡估值，並透過互動式、方便評審操作的介面呈現。',
      renaissRelation: `ChainSight 直接建構於 Renaiss Index API 之上，並以 Renaiss 市場資料作為核心資料層。

本專案使用 Renaiss 端點搜尋已收錄的卡牌、取得市場指數、探索精選異動標的、檢視近期交易、分析 30 天價格歷史，以及存取鑑定卡估值資料。

ChainSight 並非僅呈現原始 API 回應，而是把這些 Renaiss 資料信號整合為互動式 AI 輔助市場情報體驗。使用者先透過自然語言查詢探索相關卡牌，再選擇個別卡牌，檢視更深入的市場信號與分析。

ChainSight 的目標，是展示如何運用 Renaiss 開發者基礎設施，為收藏家與交易者打造容易使用的 AI 分析工具。

由於 Renaiss Index API 目前仍處於 beta 階段，ChainSight 會清楚標示 Renaiss 為資料來源，並將 API 輸出視為實驗性市場參考，而非經驗證的財務建議。`,
      testInstructions: `測試 ChainSight 最簡單的方式是使用託管的示範連結，不需要帳號或本機設定。

1. 開啟示範網站。

2. 嘗試以下自然語言問題：
「Charizard 值多少錢？」
「哪些卡牌正在上漲？」
「搜尋 Pikachu 卡牌。」
「提供一份 Pikachu 的 AI 分析師報告。」

3. ChainSight 會查詢 Renaiss Index API 資料並顯示相關卡牌結果。

4. 點擊任一卡牌結果，即可開啟該卡牌更深入的市場情報，包括可用的估值資料、市場背景、近期交易信號、30 天價格歷史與相關卡牌信號。

5. 嘗試其他建議提示，探索市場指數、精選異動標的、近期交易、價格趨勢與鑑定卡估值流程。

6. 在互動式示範中使用全螢幕按鈕，以獲得最佳展示體驗。

若要在本機測試，請複製 GitHub 儲存庫，依照 README 說明設定所需的 Renaiss API 憑證、啟動本機伺服器，再於瀏覽器開啟應用程式。

Renaiss Index API 目前仍處於 beta 階段，因此部分卡牌或信號的資料可能不完整、延遲或無法取得。`,
      judgeNotes: `ChainSight 的設計源自一個簡單的問題：如何讓 Renaiss 市場資料更容易理解與使用？

ChainSight 並未打造只顯示原始 API 回應的傳統儀表板，而是在 Renaiss Index API 之上提供對話式探索層與互動式分析流程。

多信號分析是本專案的重要部分。卡牌搜尋、市場指數、精選異動標的、近期交易、價格歷史與鑑定卡資料可以相互結合，在使用者檢視卡牌時提供更豐富的背景資訊。

本專案是建構於 beta 版 Renaiss 基礎設施上的實驗性原型。市場輸出可能不完整或有所延遲，應視為資訊參考，而非財務建議。

感謝您審閱 ChainSight。`,
    }),
    arenaiss: Object.freeze({
      pitch: '一款瀏覽器卡牌對戰遊戲，將 Renaiss 卡包探索與鑑定卡資料轉化為模擬選牌與對戰循環。',
      description: 'Arenaiss 是一款瀏覽器卡牌對戰遊戲，將 Renaiss 風格的卡包探索轉化為可遊玩的選牌與對戰循環。玩家可以開啟模擬卡包、收集根據真實鑑定卡 metadata 製作的虛構卡牌、組成 5 張卡牌的陣容，並進行講求技巧的 Top Trumps 式對決以獲得虛擬點數，之後還能開啟任一卡牌的真實資料 Card Passport。本作適合想透過遊戲而非靜態頁面了解 Renaiss 生態系（鑑定收藏品、託管與價格參考）的收藏家與新手。所有內容皆為唯讀與模擬：不需要錢包、不涉及真實金錢，也沒有鏈上交易。',
      renaissRelation: 'Arenaiss 直接建構於 Renaiss 資料之上，並重現其核心機制。遊戲透過伺服器端唯讀代理使用三種 Renaiss 資料來源。第一，Marketplace API（api.renaiss.xyz）提供真實鑑定卡牌池、卡牌 metadata、真實卡包目錄，以及 Card Passport 的來源與託管資訊。第二，官方 @renaiss-protocol/client 公開 client 負責 Renaiss 唯讀查詢。第三，Renaiss OS Index API（api.renaissos.com）提供 Passport 中顯示的參考價格、信心水準與市場變動，並標示資料來源為「Renaiss OS Index」。扭蛋式選牌循環重現真實 Renaiss 卡包：遊戲中的 Eden、OMEGA 與 RenaCrypt 卡包皆以真實卡包為模型，每張卡牌的 Card Passport 也會連回真實的 Renaiss 卡包與市場。因此，本遊戲是引導使用者進入生態系的入口，而非獨立存在的玩具。',
      testInstructions: `最簡單的方式是使用線上示範：開啟 https://arena-card.xyz，點擊 Register 並建立示範帳號（只需使用者名稱與密碼，不需要電子郵件）；開啟免費 Welcome Pack（5 張卡牌）；前往 Lineup，選擇 Pokemon 或 One Piece 競技場並挑選 5 張卡牌；開始對戰，每回合選擇 ATK、DEF 或 AURA（注意屬性優勢顏色與戰鬥紀錄）；最後開啟任一卡牌的 Card Passport 查看真實參考資料。開卡包功能需要登入，才能將進度儲存在伺服器端。

本機執行：git clone https://github.com/duclucky/arenaiss && cd arenaiss && npm install，接著從 .env.example 建立 .env.local（設定 AUTH_SECRET；如需即時 Index 定價，可選擇加入 RENAISS_INDEX_API_KEY 與 RENAISS_INDEX_API_SECRET；如需 AI 洞察，可加入 PASSPORT_AI_*），然後執行 npm run dev 並開啟 http://localhost:3000。驗證命令：npm run typecheck、npm run build、npm run test:unit。`,
      judgeNotes: '安全性從設計初期就納入，而非事後補強。應用程式嚴格維持唯讀（只使用 GET 與公開 client，絕不使用 signer、private key、pullGacha、buyback 或 createSecureClient）；所有 API key 都保留在伺服器端（已透過掃描正式環境 client bundle 驗證）；經濟系統完全虛擬；遊戲數值也明確標示為虛構，絕不被呈現為估值或建議。戰鬥講求技巧而非付費取勝：屬性優勢是最重要的勝負因素，而自我對戰測試顯示，操作得宜的低階陣容約有 42% 的機率擊敗高階陣容。Repo：https://github.com/duclucky/arenaiss。正式產品方向：未來將讓同一套循環由模擬卡牌升級為使用錢包驗證的真實 Renaiss 卡牌，打造錢包原生競技場。',
    }),
    steel: Object.freeze({
      pitch: '一款 Telegram 機器人與即時儀表板，提供個人化市場提醒及即時扭蛋卡包 EV 追蹤。',
      description: 'Aether Scanner 是一款 Telegram 機器人與即時網頁儀表板，為 Renaiss 收藏家提供個人化市場提醒與即時卡包 EV 追蹤。使用者可以建立自訂關注清單（系列／等級／價格）並接收精準提醒，也能在購買前監控各扭蛋卡包的預期價值趨勢。',
      renaissRelation: 'Aether Scanner 建構於官方 renaiss CLI 之上。它透過 CLI 取得市場資料、卡包資訊與持有人索引，以提供即時個人化提醒與 EV 分析。它把原始協議資料轉化為可採取行動、低雜訊的洞察，深入連結 Renaiss 收藏家工具，協助收藏家做出更好的購買與開包決策。',
      testInstructions: `快速測試：
前往 Telegram 機器人：https://t.me/aether_scanner_bot
輸入 /start
使用按鈕探索各項功能

自行架設：
git clone https://github.com/youthisguy/Aether-backend.git
cd Aether-backend
cp .env.example .env
# Add your Telegram BOT_TOKEN
npm install
npm start`,
      judgeNotes: `核心理念：個人化關注清單加上主動式卡包 EV 追蹤（大多數現有工具都是被動回應）。
系統透過 REST API 設計，方便後續擴充。
專注解決收藏家的真實痛點：資訊過載與不理想的卡包購買決策。`,
    }),
    'renaiss-collector-arena': Object.freeze({
      pitch: '一款多人迷你遊戲，讓玩家在進入真實資產市場之前，先練習收藏品交易。',
      description: '這是一款讓玩家模擬 TCG 交易方式的迷你遊戲。',
      renaissRelation: 'Renaiss 聚焦收藏品 RWA，因此我認為這款遊戲非常適合這個品牌。使用者可以在進入真實資產世界之前，先學習如何交易收藏品。',
      testInstructions: '只需透過網站遊玩，不必安裝任何項目。前往 Profile 儲存名稱，接著建立房間或與 AI 對戰，盡情享受。',
      judgeNotes: '沒有。',
    }),
    'renaiss-rwa-sniper': Object.freeze({
      pitch: '一款 AI 探索終端，可掃描鑑定卡上架項目，找出稀有度模式與 FMV 機會。',
      description: 'RENAISS RWA Sniper Terminal 是一款由 AI 驅動的數位資產情報與探索平台，專為 Renaiss 市場使用者、收藏家與交易者打造。它會掃描鑑定卡市場資產、分析證書序號與稀有度模式，並找出包括 Grail Cards、Fancy Numbers 與 Consecutive Chains 在內的高價值機會。平台透過比較市場上架資訊與估算 FMV 信號，協助使用者發現被低估的資產，將人工搜尋轉化為自動化情報流程。',
      renaissRelation: `本專案以 Renaiss 鑑定卡 RWA 市場生態系為核心。它透過 Renaiss Marketplace API 連接 Renaiss 市場資料，收集可用的卡牌上架項目並分析資產資訊。

平台會處理證書序號、卡牌 metadata 與市場信號，運用 Renaiss 收藏家與交易資料概念來識別隱藏的價值模式。它在 Renaiss 資產資料之上套用自訂情報邏輯，以發掘可能具有市場溢價的 Grail Cards、Fancy Numbers 與 Consecutive Chains。

RENAISS RWA Sniper Terminal 提供情報層，協助收藏家與交易者更有效率地發現機會，進一步擴充 Renaiss 體驗。`,
      testInstructions: `評審可以透過線上示範、示範影片與 GitHub 儲存庫評估本專案。

線上示範：
https://cool-ui-design-459a56.surf.computer/

示範影片：
https://youtu.be/QT0b-Oj8tH0

GitHub 儲存庫：
https://github.com/lenmu168/renaiss-rwa-sniper

線上示範提供主要使用者體驗，評審可以探索 RENAISS RWA Sniper Terminal 介面、資產探索流程、稀有度偵測邏輯，以及以 FMV 為導向的機會分析。

若要進行技術審查，評審可以查看 GitHub 儲存庫，其中包含：
- README.md：專案概覽與文件
- frontend/：使用者介面
- backend/：應用程式服務
- psa_sniper.py：核心資產掃描與分析引擎
- market_cache.json：供分析使用的市場範例資料

若要在本機執行專案：

1. 複製儲存庫：
git clone https://github.com/lenmu168/renaiss-rwa-sniper.git

2. 安裝 frontend 與 backend 的相依套件。

3. 依照 README.md 的設定說明啟動 frontend 與 backend 服務。

4. 若要測試獨立分析流程，請執行 Python 掃描引擎：

python psa_sniper.py

不需要測試帳號或其他憑證。評審無須註冊即可直接使用線上示範。`,
      judgeNotes: `RENAISS RWA Sniper Terminal 專注解決數位資產市場的一項關鍵挑戰：從大量交易資料中找出隱藏的高價值機會。

本系統不只依賴人工研究，而是結合市場情報、稀有度模式識別與 FMV 導向分析，協助收藏家更快速、更聰明地做出決策。

本專案展示 AI 分析如何把原始市場資料轉化為可採取行動的洞察，進而強化 Renaiss 生態系。`,
    }),
    'renaiss-card-story': Object.freeze({
      pitch: '一款卡牌查詢與展示工具，可將 Renaiss 卡牌資料轉化為 AI 生成的收藏故事。',
      description: `專案功能

Renaiss Card Story 是一個數位收藏卡牌展示平台，主要提供收藏卡牌資訊查詢、卡牌詳情展示與 AI 內容生成等功能。使用者輸入 PSA 編號或 Token ID，即可快速查詢收藏卡牌資訊，查看卡牌圖片、名稱、等級與相關屬性；也能根據卡牌內容，利用 AI 生成不同風格的文字故事，提升數位收藏卡牌的互動體驗。系統亦支援儲存生成內容，方便日後查看與管理。

目標使用者

本專案主要面向以下使用者族群：

數位收藏卡牌愛好者：快速查詢並瀏覽詳細的收藏卡牌資訊，豐富收藏體驗。

NFT 與數位收藏品使用者：了解數位收藏卡牌的基本資訊，並透過 AI 取得更有趣的內容。`,
      renaissRelation: `目前使用：

Renaiss Card Data API

PSA 編號／Token ID 查詢

卡牌 metadata 顯示（圖片、名稱、等級等）

根據卡牌資料生成 AI 內容

未來擴充：

Renaiss Index API

Card Tools

Trading Data

Community Tools

Game Experience`,
      testInstructions: `環境需求

Node.js 18.x 或更新版本

npm 9.x 或更新版本

步驟

1. 複製專案

git clone <project repository address>

2. 安裝專案相依套件

Frontend：

cd frontend
npm install

Backend：

cd backend
npm install

3. 設定環境變數（選用）

若要體驗 AI 內容生成功能，請在 backend 目錄建立 .env 檔案，並設定相應的 AI 介面資訊：

PORT=3000
AI_API_KEY=your API_KEY

若未設定 AI API，專案仍可正常使用收藏卡牌查詢與展示功能，但無法使用 AI 內容生成功能。

4. 啟動 backend

npm run dev

5. 啟動 frontend

cd frontend
npm run dev

6. 開啟瀏覽器並前往

http://localhost:5173

測試流程
在首頁輸入 PSA 編號或 Token ID。

點擊 Query 查看收藏卡牌詳細資訊。

選擇 AI 內容生成風格。

點擊「Generate Content」，體驗 AI 根據您喜愛的卡牌生成文字故事。

體驗本專案不需要註冊帳號或登入。`,
      judgeNotes: `Renaiss Card Story 是一個採用 React + Express 前後端分離架構開發的數位收藏卡牌展示平台，旨在提升數位收藏卡牌的展示與互動體驗。

本專案以 Renaiss Protocol 提供的收藏卡牌資料為基礎，實作收藏卡牌搜尋、卡牌資訊展示與 AI 內容生成等核心功能。透過結合 AI 與數位收藏卡牌，靜態的收藏卡牌資訊可以轉化為富有創意且有趣的文字內容，提升使用者參與度與收藏體驗。

整個專案採用模組化設計，程式碼結構清晰，具備良好的可維護性與擴充性。未來可整合更多 Renaiss Protocol 能力，例如 Index API、交易資料與社群工具，持續改善數位收藏生態系體驗。

感謝所有評審體驗本專案；期待收到各位寶貴的意見與建議。`,
    }),
    collectiq: Object.freeze({
      pitch: '一款價格、風險與真實 EV 儀表板，可用獨立市場資料交叉驗證 Renaiss FMV。',
      description: 'CollectIQ 是一款針對 Renaiss 收藏卡牌資產的價格情報與風險儀表板；這些資產是以 BSC 上的扭蛋「pack machines」交易的 Pokémon／One-Piece 鑑定卡。它會用獨立第三方市場價格交叉驗證 Renaiss 官方 FMV、計算每個卡包的真實預期價值（EV）、近乎即時地追蹤鏈上開包結果，並把經驗證的價格轉化為 RWA／抵押品基礎元件。本工具適合希望在購買或開包前取得可信估值的收藏家與交易者，也適合需要獨立價格資料源、以卡牌提供借貸服務的 DeFi 開發者。它只提供唯讀分析，不涉及交易、轉帳或任何鏈上寫入。',
      renaissRelation: `本專案直接建構於 Renaiss 的兩個公開 API——api.renaiss.xyz/v0（pack machines、市場、持有資料）與 api.renaissos.com/v1（卡牌索引、定價、銷售歷史）——並讀取 BSC 上公開 Renaiss pool contracts 的 Transfer logs，以取得 Renaiss 鏈上開包事件。

它使用 Renaiss 收藏家與交易資料（卡包內容、各等級回購價格、官方 EV/FMV、市場上架項目、持有人帳本），並在其上建構多項工具：

獨立價格 Oracle——用 PriceCharting（彙整 eBay 已售價格）驗證 Renaiss Index FMV 並呈現價差；所有資料皆標示來源，避免把獨立價格與自行申報的價格混在一起。
CDP 抵押品模擬器——根據經驗證的價格動態推導 LTV／清算價格。
RWA 指數——像股票指數一樣追蹤卡牌系列；提供各卡包 True-EV、巨鯨錢包風險，以及即時 pool EV 反推計算。
它也修正實際的 Renaiss 資料陷阱（例如 *InUsd 欄位實際以美分為單位，必須除以 100；luck value 必須使用各等級回購價）。為更廣泛的社群提供完整國際化支援（預設 EN · 中 · 日 · 한）。`,
      testInstructions: `公開 Repo：https://github.com/sanjassan/CollectIQ

git clone https://github.com/sanjassan/CollectIQ
cd CollectIQ
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # defaults are fine — no secrets needed to run the dashboard
python3 dashboard.py        # http://localhost:5000  (override with DASHBOARD_PORT)
開啟 http://localhost:5000，並使用頂部導覽列：Price Verify · Price Intel · CDP · RWA Index · Oracle · On-chain Holdings · Live Pool。語言切換器位於右上角（預設為英文）。

注意事項：

不需要登入、錢包或測試帳號；不需要簽署任何內容，也沒有交易。
應用程式會即時讀取 Renaiss 公開 API，因此 API 支援的檢視畫面可立即使用。資料庫已加入 gitignore（檔案大且可重新生成）；若要填入 on-chain／holdings 檢視畫面的資料，請執行一次：python3 scripts/grab_pack_contents.py --daily，接著執行 python3 scripts/build_holdings.py（選用：若需鏈上同步，請在 .env 將 BNB_RPC 設為 BSC RPC endpoint）。即使未預先填入資料，頁面仍會載入；部分資料面板只會顯示空白狀態。
python3 renaiss_api.py 會執行 API wrapper 的快速自我測試。`,
      judgeNotes: `信任優先是核心洞察：鏈上 RWA 借貸需要獨立價格，而不是自行申報的 FMV。CollectIQ 中的每個數值都會標示來源（renaiss_index = 非獨立，pricecharting_ebay = 獨立，並附上可驗證連結）。
Oracle／CDP 頁面是最終目標的可運作模擬：把經驗證的價格推送到鏈上，讓 Renaiss 卡牌成為抵押品等級的「軟貨幣」。
所有引用的合約地址都是公開 Renaiss pool contracts，可在 BscScan 驗證。
Roadmap 與架構說明位於 Repo（README.md、COLLECTIQ_ROADMAP.md）。
提交確認

我確認這是我們參加 Renaiss Tech Hackathon S1 的最終提交版本，而且 GitHub 儲存庫（https://github.com/sanjassan/CollectIQ）已公開，可供審查。`,
    }),
    'team-arr': Object.freeze({
      pitch: '一款可在瀏覽器遊玩的卡牌對戰遊戲，玩家可開啟卡包、建立星級上限牌組，並在收藏家金庫中戰鬥。',
      description: 'Vinci Vault Battle 是一款為 Renaiss 社群使用者打造、可在瀏覽器遊玩的收藏卡牌對戰原型。玩家可以開啟卡包、收集以 FMV 為基礎的卡牌、建立具有星級上限的牌組、在金庫內對戰、獲得 VP 獎勵、解鎖外觀，並匯出回饋供未來社群迭代使用。',
      renaissRelation: '本專案探索如何把 Renaiss 風格的收藏家資料轉化為可遊玩的遊戲循環。它將開包、稀有度、FMV、卡牌估值、市場掃描信號、金庫託管、proof logs 與收藏儀表板作為核心遊戲系統。目前的示範使用本機 mock 資料，但 UI 的設計可在未來連接 Renaiss Index API、卡牌詳情、估值資料、上架項目、銷售歷史，以及社群／遊戲工具。',
      testInstructions: `不需要安裝。請在瀏覽器開啟示範連結：
https://arrkr.github.io/vinci-vault-battle/

建議測試流程：
1. 點擊「ENTER THE VAULT」。
2. 使用「Load demo kit」以最快速度進行審查。
3. 開啟卡包並揭曉卡牌。
4. 在「My Collection」檢視卡牌。
5. 查看具有星級上限的自動牌組預覽。
6. 開始戰鬥、使用 Market Scan，並完成一場比賽。
7. 開啟 Profile、Leaderboard、Tutorial 與 Feedback 畫面。

遊戲使用 localStorage 將進度儲存在瀏覽器本機。`,
      judgeNotes: '這是黑客松原型，也是非官方 Renaiss 概念同人專案。重點是展示一段完整可遊玩的體驗：開啟卡包、收藏價值、牌組策略、戰鬥獎勵、個人檔案成長與回饋收集。在正式 API 欄位與存取方式確定後，真實伺服器同步、即時 PvP、交易與官方 Renaiss API 整合將是未來規劃的擴充項目。',
    }),
    'renaiss-collector-table': Object.freeze({
      pitch: '一套收藏家遊戲組合，將 PSA、FMV、稀有度與價值信號轉化為撲克、夾娃娃機、拉霸機與輪盤體驗。',
      description: 'Renaiss Collector Table 是為卡牌收藏家與遊戲使用者打造的可遊玩收藏家遊戲體驗。它把 PSA 等級、FMV、稀有度與收藏價值等卡牌信號，轉化為德州撲克風格牌桌、Collection Vault、夾娃娃機、拉霸機、輪盤，以及最終比賽摘要。',
      renaissRelation: `本專案探索如何把 Renaiss 風格的收藏家資料轉化為互動式遊戲玩法。在這次黑客松示範中，我使用本機 mock 卡牌資料，並建構未來整合 Renaiss Index API 所需的 UI／資料結構。

Collection Vault 包含 Index Signal 面板，可顯示 FMV、PSA 等級、稀有度層級、收藏強度、資料來源，以及 API-ready 參考標章。目前版本尚未完整整合即時 API，但已建立適當結構；待穩定 endpoint 與必要欄位可用後，即可用 Renaiss Index API 或 CLI 驅動的收藏家資料取代本機 mock 欄位。

本專案的目標，是展示與 Renaiss Protocol 相關的卡牌、收藏家與市場信號如何驅動遊戲體驗，而不只是停留在靜態資料。`,
      testInstructions: `評審可以透過 Vercel 連結測試線上示範。

建議示範流程：
1. 開啟應用程式。
2. 啟動 Hold’em Table。
3. 進行幾手撲克，並查看 Match Summary。
4. 開啟 Collection Vault 並點擊卡牌，檢視 PSA、FMV、稀有度與 Index Signal 資料。
5. 從主畫面嘗試 Collection Crane、Slot Machine 與 Renaiss Roulette。
6. 如有需要，可使用右上角的 BGM 開關。

本機設定：
npm install
npm run dev

正式環境建置：
npm run build

不需要測試帳號。Collector Chips 只是虛構的遊戲內點數。`,
      judgeNotes: `此示範不包含真實金錢下注、存款、提款、交易或財務建議。市場價值使用本機 mock 資料，只作為遊戲玩法／參考信號。

本專案聚焦 Game Track 的概念：讓收藏家與市場信號變得可遊玩。Renaiss Index API 整合目前透過 API-ready Index Signal UI 與本機 data adapter 結構呈現；下一步會在穩定欄位與 endpoint 確認後，用真實 Renaiss API 資料取代 mock 資料。`,
    }),
    'team-slabscan': Object.freeze({
      pitch: '一款鑑定卡照片掃描器，可辨識卡牌、透過 Renaiss OS Index 定價，並解釋市場背景。',
      description: `SlabScan 能立即為任何鑑定交易卡提供智慧估值。只要把手機對準 PSA、CGC 或 BGS 鑑定卡盒，SlabScan 就會從照片讀取卡牌、依照 Renaiss OS Index 定價，並在其上加入 AI 分析師解讀，告訴您該等級相較低一級的溢價是否值得、卡牌在該價格的實際流動性，以及明確結論：持有、出售、追入或放棄。

本工具專為已厭倦掃描器應用程式只吐出數字、卻沒有背景說明的收藏家打造。SlabScan 不只提供價格，還會給出如同精明收藏家朋友般的推理；內容以 Renaiss 跨來源估值資料為依據，而非猜測，並整理為可分享的分析，讓您能直接貼到社群中。`,
      renaissRelation: 'SlabScan 完全依靠 Renaiss OS Index API（/v1/graded/by-image）運作：鑑定卡盒照片會透過 OCR 與 Renaiss 證書資料庫比對，以取得權威的卡牌／等級辨識結果，再透過 Renaiss 即時市場爬取（SNKRDunk、Alt）進行定價，提供帶有信心評分的即時公平市場價值，而不是靜態價格指南。Renaiss 自有 pipeline stages 會透過 SSE 直接串流至 UI，讓使用者即時觀看辨識與定價過程。其上還可選擇使用 Claude 驅動的「taste call」（HOLD/SELL/CHASE/PASS），根據 Renaiss 估值的價格、信心與資料新鮮度進行推理。',
      testInstructions: `只需前往線上應用程式，不需設定：https://slabscan-pi.vercel.app

不需要登入或測試帳號。在行動裝置上，點擊「Scan a card」，拍攝任一 PSA/BGS/CGC 鑑定卡盒，並確保標籤與卡牌都清楚可見；在桌面裝置上，同一按鈕會開啟檔案選擇器，供您上傳照片。應用程式目前以完整即時模式運作，包含真實 Renaiss OS Index 辨識與定價，以及 Claude 生成的 taste call（HOLD/SELL/CHASE/PASS）。

注意：若某張卡牌近期尚未由 Renaiss 定價，首次掃描可能需要 1 至 2 分鐘，因為 Renaiss 會即時爬取市場銷售資料；這是預期行為，並非錯誤。之後再次掃描同一張卡牌，通常會因快取而幾乎立即回傳結果。若要測試這條快速路徑，可連續掃描同一張常見卡牌兩次。

（程式碼審查：Repo 位於 https://github.com/Chekwube-Peters/SlabScan；api/value-card.js 是 Renaiss proxy；api/taste.js 是 Claude 整合；src/SlabScan.jsx 是主要掃描流程。）`,
      judgeNotes: '沒有。',
    }),
    'renaiss-alpha-radar': Object.freeze({
      pitch: '面向 Renaiss RWA 生態系的 AI 資金情報系統，用於發現低估資產、追蹤巨鯨並生成即時 Alpha 預警。',
      description: `Renaiss Alpha Radar 是一款專為 Renaiss RWA 生態系打造的 AI 智慧資金情報系統。

它監控市場活動、收藏品走勢與市場信號，以發現被低估的資產、追蹤巨鯨行為，並為收藏家、交易者與社群生成即時 Alpha 預警。`,
      renaissRelation: `Renaiss Alpha Radar 以 Renaiss 生態系為核心，利用生態系資料、市場活動、收藏品資訊與交易信號建構而成。

本專案結合 Renaiss 資料來源與 AI 驅動分析，將原始生態系活動轉化為可採取行動的情報。

它展示如何運用 Renaiss 開發工具、CLI 功能與收藏品資料，打造全新的原生 AI RWA 體驗。`,
      testInstructions: `評審可以複製 GitHub 儲存庫來測試本專案：

git clone https://github.com/ifallout101i-renaiss/renaiss-alpha-radar.git

安裝相依套件：

pip install -r requirements.txt

執行：

python renaiss-alpha-radar.py

終端機將啟動 Renaiss Alpha Radar 監控引擎，並顯示即時掃描活動。

也可以透過所提供的示範影片驗證本專案。`,
      judgeNotes: `Renaiss Alpha Radar 致力於為 Renaiss RWA 生態系建構智慧層。

它不僅展示區塊鏈資料，更透過 AI 分析、機會偵測與社群警報，將生態系活動轉化為可採取行動的洞察。

本專案旨在讓 RWA 市場更容易理解，也讓收藏家與交易者更方便參與。`,
    }),
    tilik: Object.freeze({
      pitch: '一套針對 Renaiss 扭蛋卡包的獨立 EV、機率透明度、價格掃描與鏈上來源追蹤工具。',
      description: 'Tilik 是 Renaiss 扭蛋卡包的獨立 EV 與機率透明度工具。Renaiss 卡包只宣傳最高獎項，卻不公開期望值或機率；Tilik 會呈現較貼近現實的 EV、最近 30 次真實抽卡分布、同時考量獲利機率而非只有平均值的誠實判定，並以獨立成交資料估值交叉檢查 Renaiss FMV。它也提供 Monte Carlo「該不該抽？」模擬器、可輸入憑證或 slab 照片的獨立價格掃描器，以及鏈上來源紀錄，讓收藏家在抽卡前先理解風險與價值。',
      renaissRelation: 'Tilik 完全建立在 Renaiss 開發工具之上。它透過官方 Renaiss CLI（npx renaiss）讀取卡包抽取價格、官方 EV、主打卡、最近 30 次真實抽卡與市場上架資料，再以 Renaiss OS Index API（/v1/graded/{cert} 與圖片辨識 SSE endpoint）的獨立成交估值交叉檢查 Renaiss FMV。工具也顯示每張卡在 BNB Chain 上真實的 transfer、mint、sell 事件並連至 BscScan，驗證 Renaiss「鏈上可驗證」主張。所有獨立估值均註明 Renaiss OS Index 出處，所有數字也清楚標示為估計值。',
      testInstructions: `無須設定，直接開啟線上 Demo：https://tilikrip.vercel.app
• Landing → 點擊「Check a Pack」進入儀表板。
• Packs：切換 OMEGA／RenaCrypt／Eden，查看 EV 與官方 EV、誠實判定、價值直方圖、各 tier 機率與卡包比較表。
• Scanner：點擊憑證捷徑、貼上任何 PSA／CGC／BGS 憑證，或上傳 slab 照片進行即時串流辨識。
• Simulator：拖曳抽卡次數滑桿，查看 Monte Carlo 損益分布。
• On-chain：查看連至 BscScan 的事件。
Demo 使用已提交的資料快照，因此離線也能運作。本機執行：npm install && npm run dev；npm run check 執行引擎自我測試。若有合作夥伴 Index 權限，可選擇設定 RENAISS_API_KEY／RENAISS_API_SECRET。`,
      judgeNotes: '「Tilik」在爪哇語／印尼語中意為仔細查看、先偷看一下，也就是「nilik dulu sebelum rip」。所有結果都清楚標為估計值，不會宣稱是經驗證事實；語氣站在收藏家一方，而非監管者。資料來源、假設與限制均記錄於應用程式、README 與 SUBMISSION.md。專案由一人完成，與 Renaiss 無官方關係，也不構成財務建議。',
    }),
    'wurp-arena': Object.freeze({
      pitch: '把鏈上 Renaiss NFT 轉化為戰鬥配置，支援排名對戰與 CPU 練習的 2D 競技場格鬥遊戲。',
      description: 'Wurp 會將使用者鏈上的 Renaiss NFT 變成 2D 競技場角色。卡牌 tier、grade 與收藏深度決定戰鬥配置；玩家可以排入 classic 或 chaos 排名賽，ELO 結果結算於 BSC testnet，也能與 CPU 練習。它為想真正用自己的卡牌戰鬥的 Renaiss 收藏家而打造。',
      renaissRelation: 'Wurp 讀取 BSC mainnet 的 RenaissRegistry 來限制排名賽資格，只有玩家實際持有的卡牌才能排隊。系統從鏈上 tokenURI metadata 取得 grade／set／tier，並將其轉成配對條件與戰鬥配置；也整合 Renaiss OS Index API 的實驗性 slab signal，高／elite band 可提供額外 Damage 次數。開發過程使用 Renaiss CLI，並提供 pnpm slab:inspect 命令，以相同演算法預覽 Index slab band 如何映射到戰鬥配置。',
      testInstructions: `快速練習（無錢包、無設定）：
pnpm install && pnpm dev
開啟 http://localhost:5173，點擊 Quick Spar，選擇模擬卡並與 CPU 對戰。伺服器預設 OWNERSHIP_MODE=testnet，因此可立即使用 Mona Lisa diamond、Starry Night platinum 等 4 張模擬卡。

完整功能（錢包）：
1. 將 .env.example 複製為 .env（預設值即可本機開發）。
2. pnpm dev 會啟動 server（:3000）與 web（:5173）。
3. 連接 BSC mainnet chain 56 錢包；任何持有 Renaiss NFT 的錢包都可排入排名賽。
4. CPU 練習使用與錢包卡牌相同的配置邏輯。
5. pnpm test 執行 sim、protocol、renaiss、server 與 Foundry contract 單元測試。
6. pnpm slab:inspect 預覽 Renaiss OS Index slab band 對戰鬥配置的映射。`,
      judgeNotes: '無其他補充。',
    }),
    'tgpoke-renaiss': Object.freeze({
      pitch: '一款由 Renaiss Index 資料驅動、可在 Telegram 群組捕捉卡牌並累積持久收藏的社群遊戲。',
      description: 'Renaiss Collector Bot 是為 TCG 收藏社群打造的 Telegram 群組遊戲。玩家輸入「c」即可加入公開盲抓卡牌，可選擇猜測隱藏市場參考值，與群組一起觀看揭曉，並建立持久保存的遊戲內收藏。它把卡牌市場學習變成輕量社交遊戲，不包含交易、現金餘額或實體／NFT 所有權。',
      renaissRelation: `機器人直接建立在 Renaiss Index API 與收藏家資料上。它透過 /v1/search 與卡牌詳細 endpoint 解析卡牌身分及市場參考值，並審核公開 sitemap 與每個 /v1/sets/{game}/{set} 列表，建立 8,600 多項具正價格的 Pokémon 與 One Piece PSA 10 目錄。/v1/cards/{game}/{set}/{card}/trades 的 90 日成交量會驅動配額式 1,000 張季節卡池，涵蓋高價值、高成交量、低價但活躍及多樣性，因此遊戲反映真實市場活動，而不只看價格。

市場參考值必須通過精確身分、新鮮度、信心度、來源數量、HTTPS 來源與估值方法檢查，才能影響任何計分體驗。已驗證價格與圖片快取於 PostgreSQL，並透過 lease 每日更新兩次，使即時遊戲循環不會阻塞 API，也能遵守合作夥伴 rate limit。每次揭曉都會深連結回 Renaiss 卡牌頁，把群組遊戲流量導回 Renaiss 生態系。`,
      testInstructions: `需要 Python 3.10 以上。標準審查與測試路徑不需要 Telegram、PostgreSQL 或 Renaiss 憑證。

git clone --branch codex/renaiss-collector-pilot-hardening https://github.com/yys5584/renaiss-tcg-bot.git
cd renaiss-tcg-bot
python -m venv .venv

# macOS / Linux
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python -m pytest tests -q

# Windows
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.\.venv\Scripts\python.exe -m pytest tests -q

若要做無憑證功能 smoke test，設定 RENAISS_SKIP_DB=1，並依 renaiss_bot/RUNBOOK.md 的 Local smoke test 操作。模擬 API 資料一律標為非競賽資料，無法影響計分功能。

執行即時 Telegram 體驗則需要專用 Telegram bot、官方測試 supergroup、隔離的 PostgreSQL database，以及選用的 Renaiss Partner API 憑證。將 renaiss_bot/.env.example 複製為 .env，並依 RUNBOOK 的資料庫 fingerprint、準備、preflight 與 release gate 步驟操作；專案不公開測試 token 或正式憑證。`,
      judgeNotes: '這是獨立的 Renaiss 社群協作原型，並非官方 Renaiss 產品。卡牌只代表遊戲內收藏紀錄，不授予實體卡或 NFT 所有權、不執行交易、不保管資金，也不提供投資建議。市場參考仍屬實驗性，必須通過精確身分、新鮮度、信心度、來源數量、HTTPS 來源與估值方法檢查後才能影響計分，否則只作收藏用途。專案具備 fail-closed feature flag、資料庫目標 fingerprint pinning、PostgreSQL concurrency protection、idempotent 結果處理、release gate、health check 與 600 多項自動測試。韓文優先且可切換英文的收藏 companion website 也包含匿名完成度排行榜與新手指南，位於同一 repo 的 renaiss_bot/web，線上網址為 https://tgpoke.com/renaiss。',
    }),
    'renaiss-air': Object.freeze({
      pitch: '整合扭蛋模擬、卡包 EV、跨市場比價、Watchlist 與投資組合的一站式平台。',
      description: '這個一站式平台集合團隊認為能提升 Renaiss 體驗的功能。使用者可透過互動模擬器探索 Renaiss 扭蛋，並在同一處查看 Infinite Gacha Pack EV、目前內容與近期抽卡。平台也比較 Renaiss 上架與 SNKRDUNK、ALT 等主要市場，協助使用者做出更有資訊基礎的交易決策；Watchlist 提醒可追蹤目標卡牌與價格，而個人投資組合則能同時管理 Renaiss 與私人持有卡牌，追蹤買入價格、估值與報酬。',
      renaissRelation: '本專案透過整合扭蛋分析、市場比較、Watchlist 與投資組合管理，改善整體 Renaiss 使用體驗。平台連接 Renaiss 相關資料與工具，讓使用者操作互動式扭蛋模擬器，同時查看 Infinite Gacha Pack EV、卡包內容與近期抽卡活動；卡牌與交易資料也用於比較 Renaiss 上架與 SNKRDUNK、ALT 等 Web2 市場。使用者可建立卡牌及價格目標 Watchlist，降低持續盯盤需求，並在個人投資組合中管理 Renaiss 資產與私人卡牌的買入價、估值和報酬。整體上，它是建立在 Renaiss 生態系周邊、以收藏家為核心的分析與管理層。',
      testInstructions: '網站位於 https://renaissair.xyz/。建立帳號後可測試 Watchlist、Portfolio 與 Renaiss World；Renaiss 上架資料和 Web2 市場比價等其他功能無須登入即可使用。',
      judgeNotes: 'One Piece 市場的 BGS 評級卡占比較高，因此目前來自 ALT 的價格資料可能較不準確。團隊計畫持續改善與調整此功能。',
    }),
    'renaisslens-oojae': Object.freeze({
      pitch: '具備公平性分析、上架異常偵測與來源證書的可重現卡包 EV 與市場情報儀表板。',
      description: 'RenaissLens 是為準備抽 Renaiss 扭蛋卡包的收藏家打造的期望值與市場情報儀表板。它誠實回答「這包是正 EV，還是在捐錢？」：EV 永遠呈現 P10–P90 區間，來自會重新抽樣機率本身的雙層 Monte Carlo；每個參數都標示 observed／inferred／assumed，觀察抽卡少於 20 次便回傳「資料不足」，不捏造數字。核心功能之外還有市場工作台、雙向上架異常雷達、公平性觀測站、必須引用頁面數據且拒絕買賣建議的選用 AI 解說，以及讓每筆評級卡上架都可產生可分享來源證書的 /vault → /proof 品牌層。',
      renaissRelation: '專案完全建立在 Renaiss Protocol 的唯讀介面上。Renaiss public API（api.renaiss.xyz，也是官方 npx renaiss CLI 封裝的 API）的 /v0/packs、/v0/packs/{slug} 與 /v0/marketplace 提供卡包價格、實際抽卡 feed 與評級卡上架資料，client 只暴露 GET。首頁 Latest Activities 成交 feed 會被解析成分類 sales pulse 與雙向上架異常雷達。Renaiss OS Index API（api.renaissos.com，合作夥伴金鑰）則以 company、grade、set、number、language 的完全相符條件交叉檢查每筆上架，呈現 Renaiss FMV 與 Index 價格差異並註明出處。同時，每張卡的鏈上 token_id 會形成包含身分、評級、託管、價格歷史、Index 比對與 SHA-256 內容封印的來源證書。Fairness 頁先呈現具信賴區間的實際結果，待 Renaiss 公開可驗證公平 commitment scheme 後再啟用密碼學抽卡驗證。所有請求使用 RenaissLens-Hackathon/1.0 UA、至少間隔 2 秒的序列 queue 與尊重 Retry-After 的有限 backoff。',
      testInstructions: `無須設定，線上服務在評審期間由每 15 分鐘 uptime canary 維持：
1. 從 https://renaisslens-production.up.railway.app/studio 開始，捲動頁面讓 slab 完成驗證後點擊 Enter the vault。
2. 開啟 https://renaisslens-production.up.railway.app/；注意 EV 是區間，部分卡包會誠實顯示資料不足。/packs/omega 可查看 Monte Carlo 直方圖、五種情境敏感度階梯、已標示假設與 Explain it like a collector AI 解說。
3. 測試 /market、/fairness、/vault → 任一 slab → /proof、/standard、/methodology 與 /api/health。

本機無帳號、金鑰、環境變數或網路也能執行：git clone https://github.com/OoJae/renaisslens && cd renaisslens && pnpm i && pnpm dev。Node 22+、pnpm；預設從已提交的 Demo 快照啟動。pnpm scrape 可選擇執行一次禮貌的即時擷取；pnpm test 執行 195 項測試；只有設定 .env.example 的 explainer 變數後才會顯示 AI 解說按鈕。`,
      judgeNotes: '誠實是設計原則，而不只是免責聲明：EV 不會是單一數字；「資料不足」是工具願意主動回傳的判定；錯價上架只稱為 anomaly，不宣稱套利或提供建議；AI 解說的非財務建議聲明由伺服器強制附加；固定 seed RNG 讓同一資料狀態下的所有公開數字都可重現。服務不使用錢包、登入、cookie 或追蹤。',
    }),
    'card-platform-analysis': Object.freeze({
      pitch: '涵蓋開包合約、金流追蹤、機器人偵測與自刷量估算的卡牌平台鏈上分析框架。',
      description: '卡牌平台的鏈上分析框架，從開包合約抓取、金流追蹤、機器人偵測到自刷量估算。',
      renaissRelation: '收集並分析 Renaiss 卡牌平台的鏈上交易資料。',
      testInstructions: '請參考 ANALYSIS_SOP.md 的詳細流程。',
      judgeNotes: 'Renaiss 分析：https://docs.google.com/document/d/1p9Hff0U1inbvNoYXX2eixH6g4q_K5Dj3RmFHhHkgYEk/edit?tab=t.0#heading=h.8tt154mdot0f\nMNSTR 分析：https://docs.google.com/document/d/1-21BM7BsYXogbRyJfNasQKtXHxg4uy1BOJBlcTmEuu8/edit?tab=t.0',
    }),
    'renaiss-dashboard': Object.freeze({
      pitch: '呈現價格、上架、歷史成交、活動、趨勢圖與卡牌詳情的 Renaiss 卡牌市場儀表板。',
      description: 'Renaiss Card Market Dashboard 是為 Renaiss 生態系卡牌收藏家與交易者打造的市場分析工具。它使用 Renaiss CLI 取得卡牌價格、市場上架、歷史成交與活動資料，再透過直覺的價格圖、趨勢分析和卡牌詳細頁呈現，協助使用者快速評估目前卡價、理解價格變化，並發現更合適的收藏與交易機會。',
      renaissRelation: '專案以 Renaiss Protocol 生態資料為基礎，透過 Renaiss CLI 的 marketplace、card <tokenId>、packs 等命令取得上架、卡牌詳情、價格、交易歷史與活動資料，將分散資訊整理成可搜尋、篩選與視覺化的介面。現行上架價格、FMV、歷史成交及活動紀錄會轉成價格圖與趨勢分析，也會顯示評級、系列、持有人、卡包與市場流通資訊。未來規劃整合 Renaiss Index API 及更多收藏家、成交和市場深度資料，加入價格提醒、異常波動通知、投資組合估值與社群熱門卡排名。',
      testInstructions: `1. 複製 GitHub repo 並進入專案：
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Renaiss-card-market-dashboard
2. 建立虛擬環境：python -m venv .venv
3. Windows 啟用 .venv\Scripts\activate；macOS／Linux 執行 source .venv/bin/activate。
4. 安裝：python -m pip install -r requirements.txt
5. 啟動：python -m streamlit run app.py
6. 開啟終端機顯示的網址，通常是 http://localhost:8501。

若要以真實 Renaiss 資料測試，先確認 renaiss --version 可執行；應用程式會使用 renaiss marketplace、renaiss card <tokenId>、renaiss packs 取得上架、卡牌、價格、活動歷史與卡包資訊。不需要額外測試帳號。若評審環境沒有 Renaiss CLI，可在側邊欄選擇 Mock Data mode，仍可操作卡牌篩選、價格圖、趨勢、市場資料與詳細頁。`,
      judgeNotes: '祝 Renaiss 持續成功並成長。',
    }),
    'csr-renaiss-slab-king': Object.freeze({
      pitch: '使用真實 Renaiss 卡牌資料，透過多人配對解謎遊戲介紹 PSA 評級、卡價與數位所有權。',
      description: 'Renaiss Slab King 是使用真實 Renaiss 卡牌資料的多人卡牌配對解謎遊戲。使用者在短而直覺的遊戲中，自然學習 PSA 評級、卡牌價值與數位所有權等收藏概念，並能立即前往 Renaiss Marketplace 查看感興趣的卡牌。它面向對 TCG 或卡牌收藏有興趣、但不熟悉評級、市價與鏈上所有權的新使用者，也適合第一次接觸 Renaiss 的休閒玩家。',
      renaissRelation: '未來更新將支援以連結 Renaiss 的 X 帳號或 Web3 錢包登入遊玩。遊戲內卡牌圖片與資訊經由 Renaiss API 取得；Card Dex 顯示每張卡的 FMV、詳細資料和 Renaiss Marketplace 連結，玩家可從遊戲中發現卡牌後直接前往相應市場頁。',
      testInstructions: '1. 開啟 Demo。\n2. Create Room 建立可與社群成員遊玩的房間，並選擇 Pokémon 或 One Piece。\n3. 在包含各種內容的地圖中使用道具並收集卡牌。\n5. 回到 lobby 的 Card Dex 查看遊戲中收集的卡牌。\n6. 選擇 Pokémon 或 One Piece，體驗 Normal、Rolling、Victory、Shanghai 等五種地圖模式。',
      judgeNotes: 'Web3 專案的關鍵是吸引新使用者並讓他們持續使用產品；團隊希望這款遊戲能在其中扮演重要角色。',
    }),
    resona: Object.freeze({
      pitch: '結合情緒推薦、電影式揭曉、Renaiss 即時驗證與精確上架連結的收藏品探索平台。',
      description: 'Resona 是重新想像收藏家探索交易卡方式的沉浸式平台。它結合以情緒為核心的推薦、電影式互動設計，以及透過 Renaiss Index API 完成的即時市場驗證，把傳統瀏覽變成令人印象深刻的探索體驗。平台提供精選卡牌推薦、高質感揭曉動畫與直接連至個別 Renaiss 上架的深連結，展示敘事與細緻 UX 如何深化使用者與數位收藏品的互動。',
      renaissRelation: 'Resona 探索 Renaiss 生態系的新互動層，而不是再打造一個市場。它使用 Renaiss Index API 驗證收藏品、以即時市場資料補充推薦，並將使用者直接深連結到精確的 Renaiss 上架頁。Renaiss 基礎設施與電影式、情緒驅動探索的結合，示範協議如何支援收藏家發現、互動及取得卡牌的全新方式，也為未來遊戲化與社群導向體驗奠定基礎。',
      testInstructions: '1. 開啟線上 Vercel 部署。\n2. 點擊「How do you feel?」，選擇任一可用心情。\n3. 應用程式會以電影式動畫策展並揭曉相符收藏品。\n4. 點擊「Acquire」，確認相應 Renaiss 收藏品頁會在新分頁開啟。\n\n本機開發：npm install，接著 npm run dev，開啟 http://localhost:3000。無須驗證或測試帳號。',
      judgeNotes: 'Resona 探索收藏品發現如何超越傳統市場介面。此次投稿聚焦使用者體驗、情緒參與和 Renaiss 生態的無縫整合，展示協議基礎設施如何支援全新收藏體驗。現階段 MVP 著重探索，但也為更大的遊戲化收藏旅程、互動敘事與社群體驗願景奠定基礎。',
    }),
    pullev: Object.freeze({
      pitch: '為 Renaiss Infinite Gacha 打造的具來源 EV 引擎與獨立瀏覽器端 Merkle proof 驗證器。',
      description: 'PullEV 讓 Renaiss Infinite Gacha 具備可證明公平性與透明 EV，讓使用者用數學與證明做決定，而非只靠信任。它回答抽卡者最常問的兩個問題，且每個數字都有清楚來源：第一，「該不該抽？」— 由 PullEV 確定性引擎使用 100% 真實 Renaiss Index 價格，計算 EV 與成本、完整價值分布及獲利機率；第二，「我的抽卡公平嗎？」— 獨立的 client-side Merkle proof verifier 會在使用者瀏覽器中重算 inclusion proof，並與 Renaiss 真實鏈上 merkle root 比對。它適合收藏家／抽卡者、Tool Directory 開發者、RenaissOS node／vault operator，以及希望取得已標示獨立證據的社群。',
      renaissRelation: 'PullEV 直接處理 Renaiss 核心營收機制 Infinite Gacha 的透明度。Renaiss Index API（beta）是 FMV oracle：每張卡價來自憑證查詢、結構化卡牌查詢與搜尋，也使用市場 index 與價格歷史，為約 148 張 One Piece／Pokémon 真實評級卡資料庫定價。對 12 個 sealed pack，PullEV 透過 BNB Chain 扭蛋合約的 getMerkleRoot(packId) 讀取 Renaiss 真實 commitment root，並提供 BscScan 連結；瀏覽器端 verifier 直接對應 Renaiss Merkle proof 與 ZK 公平性結構。整個專案唯讀、無錢包、無寫入或交易，安全地補充 SBT 身分及 RenaissOS verification node 等鏈上層。',
      testInstructions: `App：https://pullev.vercel.app
Engine health：https://pullev-engine-production.up.railway.app/api/health

建議 90 秒流程：
1. Landing：查看主打卡包的即時 EV console，包括 edge、獲利機率與分布；所有數字均有標示。
2. Launch app → The Floor：15 個真實卡包（3 個 live Infinite、Champion、11 個售罄舊包），各自都有即時 edge。
3. X-Ray Bay：查看 EV 與成本、價值分布、draw band、每張卡 LIVE 價格；打開 Under the hood 查看 glass-box EV 計算（EV = Σ chance × avg sum）與輸入 fingerprint hash。
4. Rip → Proof Vault：在瀏覽器內觀看 Merkle proof 重算並顯示 VERIFIED；切換竄改範例則顯示 MISMATCH。sealed pack 也顯示真實鏈上 root 與 BscScan。
5. AI advisor orb：詢問「should I rip this pack?」確認回答有引用；輸入無關問題確認會拒絕。
6. /vault：查看約 148 張真實卡牌與價格 sparkline；/value：查詢任何 PSA／CGC／BGS 憑證。`,
      judgeNotes: '無其他補充。',
    }),
    jcompany: Object.freeze({
      pitch: 'Vault 是結合置中量測、瑕疵與仿冒風險偵測、卡牌辨識、市價及 PDF 報告的 AI 輔助評級工作台。',
      description: 'Vault 是由 AI 驅動的交易卡評級助手，可從 One Piece、Pokémon 等卡牌照片預測 PSA、BGS 與 CGC 等級。使用者上傳圖片後，系統以電腦視覺在像素層級精確量測左右與上下邊界，偵測刮痕、白化、凹痕等表面瑕疵，支援手動修正與原圖比較，也分析邊緣及角落磨損。Gemini AI 會辨識卡牌並取得 SNKRDUNK 即時市場價格與 PSA Population Report，最後整合成可匯出 PDF 的評級預測報告。Vault 在瀏覽器內運作，支援英文、韓文、日文與中文。團隊不只做一般置中量測，也加入白化／刮痕／仿冒偵測、即時市場價格與 PSA 10 Population。構想來自卡店中只有幾秒可做購買決定的真實情境，面向送交專業評級前想先估級、交易前想快速評估狀況與市價，以及不想先支付評級費並等待數週的使用者。',
      renaissRelation: 'Vault 以 Renaiss Index API 作為卡牌定價與辨識的主要來源。Gemini 先辨識卡號、名稱等資訊，再立即查詢 Index：已評級卡可用 /v1/graded/{cert} 取得官方評級與市值；原卡使用 /v1/cards/search 以卡號／名稱搜尋；文字辨識不確定時則使用 /v1/graded/by-image 進行圖片比對。Renaiss 回傳的名稱、set、grade 與估值會優先顯示於 Card Info。由於 Renaiss Index 對日本市場 One Piece／Pokémon 的涵蓋仍有限，查無結果時才補充 SNKRDUNK 即時價格，並加入 alt.xyz population data，形成以 Renaiss 為主要來源、其他供應商補充缺口的混合定價系統。',
      testInstructions: `注意：本專案目前僅支援 Windows，且需要 PowerShell 5.1 以上；macOS／Linux 請先觀看 Demo 影片。
先安裝 .NET 8 SDK 並取得免費 Google AI Studio Gemini API key：https://aistudio.google.com/app/apikey。

git clone https://github.com/SSiberry/07-03renaiss.git
cd 07-03renaiss
將 .env.example 複製為 .env.local，設定 GEMINI_API_KEY，選用 GOOGLE_CLOUD_PROJECT，並將 GOOGLE_CLOUD_LOCATION 設為 us-central1。

需同時開啟兩個 terminal：
1. powershell -ExecutionPolicy Bypass -File serve.ps1（http://localhost:7000）
2. dotnet run --project centering-engine/CenteringEngine.csproj --urls http://localhost:5080

開啟 http://localhost:7000，選擇語言並上傳卡牌圖片。應用程式會進行圖片品質、置中、表面／邊緣／角落檢查及報告產生；測試過程兩個 server 都要保持執行。到 Report 分頁點擊 Identify Card with Google AI，驗證 Gemini 辨識、Renaiss Index 查詢與適用時的 SNKRDUNK 補充資料，再點擊 Export PDF。無須測試帳號或登入。`,
      judgeNotes: '開發過程顯示「讓 AI 合理猜測」與「精確量測」差異很大。原先以 AI 估計和 JavaScript pixel scan 實作置中，但與真實量測常有落差，因此改成以 OpenCV 為基礎的確定性 C# computer vision engine，直接量測印刷邊界像素。單張照片的 heuristic 仍無法在 holographic 或 Secret Rare 複雜圖面上完美區分刮痕、反光與背景，因此加入原圖 before／after slider 及亮度差異標示，讓人工驗證更可信。Renaiss Index 卡牌涵蓋有限時會補充 SNKRDUNK 即時價格，隨 Index 擴大，此需求應降低。原始願景是 mobile-first 的即拍即評，但期限內先完成穩定桌面版；相機與水平輔助已採 responsive 設計，後續仍會改善手機 UI。現階段本機僅支援 Windows，表面瑕疵演算法仍持續改善；重點不是快速做出炫目的 Demo，而是建立使用者真正能信任的量測。',
    }),
    'renaiss-collector-assistant': Object.freeze({
      pitch: '以自然語言提供卡牌查詢、錢包分析、開包追蹤、PSA 連號發現與 FMV／Index 價差掃描的 AI Agent Skill。',
      description: 'Renaiss Collector Assistant 是面向 Renaiss 收藏家和社群成員的 AI Agent Skill。使用者可用自然語言查詢卡牌、分析錢包、追蹤開包、尋找 PSA 連號機會，並掃描 FMV／Index 價差，讓不懂程式的使用者也能透過對話使用 Renaiss 資料與工具。',
      renaissRelation: '專案連接 Renaiss CLI、Marketplace 卡牌資料、Renaiss OS Index API、FMV／top offer／last sale，以及 BSC 鏈上錢包資料。它可查詢 Renaiss 卡牌、掃描市場折價、尋找 Sequential Cert／PSA 連號、使用 Index API 比較參考價格，也能分析 Renaiss 錢包的開包、buyback、marketplace 買賣、遷移與 SBT 持倉。',
      testInstructions: '建議讓 AI Agent 讀取安裝文件：先閱讀並遵守 https://github.com/blueskylh/Renaiss-Collector-Assistant/blob/main/AGENT.md，再閱讀 https://github.com/blueskylh/Renaiss-Collector-Assistant/blob/main/AGENT_INSTALL.md 協助安裝 Renaiss-Collector-Assistant skill。接著執行 README 的錢包分析、PSA 連號掃描、Index 查詢等範例命令；README 首頁也有宣傳影片與 Demo 截圖。',
      judgeNotes: '核心目標是降低 Renaiss 生態資料的使用門檻。使用者不需要理解 API、鏈上交易或複雜腳本，只要用自然語言提問，即可取得卡牌、錢包、市場機會與 SBT 分析。',
    }),
    tasteforge: Object.freeze({
      pitch: '把即時持倉與收藏信號轉成收藏家 archetype、十維 taste vector 與個人化 Renaiss 市場探索的 AI 品味層。',
      description: 'TasteForge 是 Renaiss 的 AI 品味層。收藏家貼上 BNB 錢包，也可加入社群備註或簡短品味表單；應用程式會依即時持倉與信號建立十維品味向量及收藏家 archetype，再從即時 Renaiss marketplace 推薦 Best Overall 與 Best Value 卡牌，提供解釋、投資組合摘要與前往 Renaiss 購買的路徑。它適合想更聰明挑選下一張卡的 Renaiss 持卡者，也讓尚未持卡的新使用者可先依個人品味探索。',
      renaissRelation: 'TasteForge 透過即時 marketplace API（listing、FMV、ask、owner）與唯讀 BNB wallet check 接入 Renaiss Protocol。系統掃描收藏家持倉與即時目錄，以 AI taste vector 為卡牌評分，再把使用者導向 Renaiss 卡牌頁購買。serial-pair 類探索靈感來自 Renaiss 社群卡牌工具；TasteForge 只負責品味層，Renaiss 仍是市場與協議的紀錄來源。',
      testInstructions: '開啟 https://tasteforge.vercel.app，或使用預填分析網址 https://tasteforge.vercel.app/?wallet=0x378ffaaf220ac102ea5c29bddcff1a16a2cab731&analyze=1。等待分析後查看 archetype、持倉 portfolio、Best Overall／Best Value 與 Ask AI Any Question。無須帳號。Repo：https://github.com/emer-eth/tasteforge。',
      judgeNotes: 'TasteForge 不是推薦器，而是一面鏡子：它不直接告訴你買什麼，而是讀取鏈上卡牌、描述你是哪一類收藏家，再指出符合你品味的 Renaiss 卡牌。服務完全以即時資料運作；沒有卡牌的新手也可只分享品味；每項推薦都開啟真實 Renaiss 上架，將需求導入 marketplace。整合成本為零、無須 API key，能直接接入 Renaiss。',
    }),
    'renaiss-library': Object.freeze({
      pitch: '可拍攝 PSA slab、驗證憑證、透過 Renaiss Index 定價並追蹤即時價值與損益的 Pokémon 評級卡投資組合。',
      description: 'Renaiss Library 是評級 Pokémon 卡牌的投資組合追蹤器。使用者拍攝 PSA slab 後，應用程式會找到 label、向 PSA 官方資料庫驗證憑證、透過 Renaiss Index 定價，再把卡牌加入收藏並顯示即時價值及損益。它為持有真實 slab、想在單一乾淨介面查看持有項目、價值與市場動向的收藏家而設計，不需要試算表、註冊或猜測。',
      renaissRelation: 'Renaiss 位於應用程式每一層的核心。卡牌搜尋、憑證查詢與估值都透過 Renaiss Index API，UI 直接顯示 confidence tier；一鍵 Sync with Renaiss 會將整個收藏重新與 Index 配對並更新全部價格。Market 頁會以 server-side 方式解析 renaiss.xyz 的即時上架 feed，自動標示低於 Renaiss FMV 的卡牌；featured cards、indices 與 recent trades 也由 Renaiss endpoint 驅動。',
      testInstructions: '最簡單的方式是開啟線上 Demo；無須帳號或設定，資料只儲存在瀏覽器。於 Collections 點擊 Load demo data 立即載入完整 portfolio；前往 Add Card 上傳任一 PSA slab 照片（也可用 repo 內圖片）觀察自動 PSA 驗證；或以 cert 115965538 測試 Add by Cert #。在收藏內點擊 Sync with Renaiss 查看即時重新定價，再到 Market 查看 renaiss.xyz feed。本機執行：npm install，將 .env.local.example 複製為 .env.local 並填入 Renaiss API key，接著 npm run dev；README 包含 typecheck、security scan 與 build gate。',
      judgeNotes: '願景是讓 Renaiss Library 成為鏈上與鏈下 TCG 收藏家的單一首頁。現實收藏通常混合了家中實體 slab 與 Renaiss 保管、tokenize 的鏈上卡牌；本工具讓收藏家在一處查看、控制並估值所有持有項目，以 PSA 憑證驗證實體卡，再透過 Renaiss Index 與 marketplace 匹配鏈上卡牌，且每個數字都有清楚來源。即時 Renaiss marketplace feed、低於 FMV 的自動標示與 TCG 新聞 ticker 讓使用者持續掌握市場。Roadmap 包括 portfolio 歷史快照、連接錢包自動匯入 tokenized cards，以及從收藏直接一鍵上架。Demo 全部使用即時 Renaiss Index、renaiss.xyz listing 與 PSA 驗證資料，沒有 mock。',
    }),
    'renaisslens-yanyuan': Object.freeze({
      pitch: '整合卡牌搜尋、異常偵測、評級損益平衡、Watchlist、收藏分析與唯讀 MCP 的 Renaiss Index 研究套件。',
      description: '搜尋卡牌、找出市場異常、建立評級損益平衡模型、比較 Watchlist，並透過 MCP 將相同情報提供給 AI agent；所有功能均由 Renaiss Index 資料驅動。',
      renaissRelation: 'RenaissLens 直接建立在 Renaiss Index API 之上，把卡牌搜尋、參考價格、信心度、grade、recent trade、market index 與 certificate lookup 等收藏家及交易資料，轉為實用市場研究工具。除了展示資料，它還衍生 Deal Quality Score、grade comparison、anomaly signal、grading break-even、watchlist comparison、collection scan 與 data-quality report。唯讀 MCP endpoint 讓 AI agent 安全存取相同情報；Renaiss 仍是底層資料來源，而 RenaissLens 讓資料更容易理解、比較和使用，且不提供財務建議。',
      testInstructions: `無須帳號或連接錢包，開啟 https://renaisslens.vercel.app/。
建議流程：查看首頁 live Market Pulse；搜尋 pikachu 並開啟 Pikachu with Grey Felt Hat；操作 Deal Quality Score、anomaly signal、Grade Ladder 與 Grading Break-even calculator；調整假設 PSA 10 機率；將多張卡加入 Watchlist，再使用 Research Comparison、Collection Scan 和 Data Doctor；以 PSA99170568 測試憑證查詢。

若要測試 agent integration，開啟 MCP 頁並點擊 Check endpoint，應回傳六項唯讀工具，涵蓋 card search、snapshot、grading break-even、certificate lookup、indices 與 recent trades。點擊 Copy JSON，可將 https://renaisslens.vercel.app/api/mcp 以 streamable-http 加入 Claude、Codex、OpenClaw 等相容 agent，再嘗試搜尋卡牌、分析 anomaly、以 25 美元費用計算 grading break-even、查詢 Pokémon index 與 recent trades。無須 API key、測試帳號、付款或交易簽名。`,
      judgeNotes: 'RenaissLens 刻意採取 tool-first、AI-assisted 設計，而不是 chatbot 或 trading bot。研究功能、score、anomaly detection、grading break-even 與 batch analysis 都是確定性且可檢查的，AI 只用來清楚解釋證據。評級計算器不預測 grade；機率滑桿代表收藏家自己的假設，損益平衡依 Renaiss 追蹤價格計算，也不提供買、賣或報酬建議。即時 Renaiss 資料會變動；AI 解說含確定性補充路徑，因此 provider 不可用時核心體驗仍能使用。唯讀 MCP endpoint 讓同一套 Renaiss 情報可成為 Claude、Codex、OpenClaw 等 agent 的可重用基礎設施。',
    }),
  }),
  ko: Object.freeze({
    chainsight: Object.freeze({
      pitch: '자연어로 카드 탐색, 시장 변동 종목, 거래, 가격 이력, 등급 카드 가치평가를 지원하는 AI 시장 어시스턴트입니다.',
      description: 'ChainSight는 수집가와 트레이더를 위해 구축된 AI 기반 카드 시장 인텔리전스 어시스턴트입니다. 사용자는 자연어로 질문하고, 카드를 찾고, 시장 변동 종목과 최근 거래를 살펴본 뒤 개별 카드의 심층 시장 분석을 확인할 수 있습니다. ChainSight는 카드 검색, 시장 지수, 주요 변동 종목, 최근 거래, 가격 이력, 등급 카드 가치평가 등 Renaiss Index API의 여러 신호를 통합하여 상호작용이 가능하고 심사위원이 사용하기 편한 인터페이스로 제공합니다.',
      renaissRelation: `ChainSight는 Renaiss Index API 위에 직접 구축되었으며 Renaiss 시장 데이터를 핵심 데이터 계층으로 사용합니다.

이 프로젝트는 Renaiss endpoint를 사용해 인덱싱된 카드를 검색하고, 시장 지수를 가져오며, 주요 변동 종목을 찾고, 최근 거래를 살펴보고, 30일 가격 이력을 분석하며, 등급 카드 가치평가 데이터에 접근합니다.

ChainSight는 원시 API 응답을 그대로 보여주는 대신 이러한 Renaiss 데이터 신호를 상호작용형 AI 보조 시장 인텔리전스 경험으로 결합합니다. 사용자는 먼저 자연어 질의로 관련 카드를 찾은 다음 개별 카드를 선택해 더 깊이 있는 시장 신호와 분석을 확인합니다.

ChainSight의 목표는 Renaiss 개발자 인프라를 활용해 수집가와 트레이더가 쉽게 사용할 수 있는 AI 분석 도구를 구축하는 방법을 보여주는 것입니다.

Renaiss Index API는 현재 beta 단계이므로 ChainSight는 Renaiss를 데이터 출처로 명확히 표시하며, API 결과를 검증된 금융 조언이 아닌 실험적인 시장 참고 자료로 취급합니다.`,
      testInstructions: `ChainSight를 가장 쉽게 테스트하는 방법은 호스팅된 데모 링크를 이용하는 것입니다. 계정이나 로컬 설정은 필요하지 않습니다.

1. 데모 웹사이트를 엽니다.

2. 다음과 같은 자연어 질문을 시도해 보세요.
“Charizard의 가치는 얼마인가요?”
“어떤 카드가 상승세인가요?”
“Pikachu 카드를 검색해 주세요.”
“Pikachu에 대한 AI 애널리스트 보고서를 작성해 주세요.”

3. ChainSight가 Renaiss Index API 데이터를 조회해 관련 카드 결과를 표시합니다.

4. 카드 결과를 클릭하면 이용 가능한 가치평가 데이터, 시장 맥락, 최근 거래 신호, 30일 가격 이력, 연관 카드 신호 등 해당 카드의 더 깊이 있는 시장 인텔리전스를 확인할 수 있습니다.

5. 다른 추천 prompt도 시도해 시장 지수, 주요 변동 종목, 최근 거래, 가격 추세, 등급 카드 가치평가 workflow를 살펴보세요.

6. 최상의 프레젠테이션 경험을 위해 상호작용형 데모의 전체 화면 버튼을 사용하세요.

로컬에서 테스트하려면 GitHub 저장소를 clone하고, README의 설명에 따라 필요한 Renaiss API 자격 증명을 설정한 다음 로컬 서버를 시작하고 브라우저에서 애플리케이션을 여세요.

Renaiss Index API는 현재 beta 단계이므로 일부 카드나 신호의 데이터가 불완전하거나 지연되거나 제공되지 않을 수 있습니다.`,
      judgeNotes: `ChainSight는 “Renaiss 시장 데이터를 어떻게 더 쉽게 이해하고 사용할 수 있게 만들 수 있을까?”라는 간단한 질문을 탐구하기 위해 설계되었습니다.

ChainSight는 원시 API 응답만 표시하는 전통적인 대시보드 대신 Renaiss Index API 위에 대화형 탐색 계층과 상호작용형 분석 workflow를 제공합니다.

다중 신호 분석은 이 프로젝트의 핵심 요소입니다. 카드 검색, 시장 지수, 주요 변동 종목, 최근 거래, 가격 이력, 등급 카드 데이터를 결합해 사용자가 카드를 살펴볼 때 더 풍부한 맥락을 제공할 수 있습니다.

이 프로젝트는 beta 단계의 Renaiss 인프라를 기반으로 구축된 실험적 prototype입니다. 시장 결과는 불완전하거나 지연될 수 있으며 금융 조언이 아닌 정보 참고 자료로 취급해야 합니다.

ChainSight를 검토해 주셔서 감사합니다.`,
    }),
    arenaiss: Object.freeze({
      pitch: 'Renaiss 팩 탐색과 등급 카드 데이터를 모의 draft-and-battle 순환 구조로 바꾸는 브라우저 카드 배틀 게임입니다.',
      description: 'Arenaiss는 Renaiss 스타일의 팩 탐색을 플레이 가능한 draft-and-battle 순환 구조로 바꾸는 브라우저 카드 배틀 게임입니다. 플레이어는 모의 팩을 열고, 실제 등급 카드 metadata를 바탕으로 만든 가상 카드를 수집하고, 5장 lineup을 구성한 뒤 기술 중심의 Top Trumps 대결에서 가상 credit을 획득하며 싸울 수 있습니다. 이후 어떤 카드든 실제 데이터가 담긴 Card Passport를 열어 볼 수 있습니다. 정적인 페이지가 아니라 게임을 통해 Renaiss 생태계의 등급 수집품, 보관, 가격 참고 정보를 이해하고 싶은 수집가와 입문자를 위한 작품입니다. 모든 기능은 읽기 전용이며 시뮬레이션입니다. 지갑, 실제 돈, 온체인 거래가 전혀 없습니다.',
      renaissRelation: 'Arenaiss는 Renaiss 데이터 위에 직접 구축되었으며 그 핵심 메커니즘을 재현합니다. 세 가지 Renaiss 데이터 소스를 모두 서버 측 읽기 전용 proxy를 통해 사용합니다. 첫째, Marketplace API(api.renaiss.xyz)는 실제 등급 카드 pool, 카드 metadata, 실제 팩 catalog, Card Passport의 provenance와 custody 정보를 제공합니다. 둘째, 공식 @renaiss-protocol/client public client가 Renaiss 읽기 작업을 처리합니다. 셋째, Renaiss OS Index API(api.renaissos.com)는 Passport에 표시되는 참고 가격, 신뢰도, 시장 움직임을 제공하며 출처는 “Renaiss OS Index”로 명시됩니다. gacha-as-draft 순환 구조는 실제 Renaiss 팩을 반영합니다. 게임 속 Eden, OMEGA, RenaCrypt 팩은 실제 팩을 모델로 하며, 각 카드의 Card Passport는 실제 Renaiss 팩과 marketplace로 연결됩니다. 따라서 이 게임은 독립된 장난감이 아니라 생태계로 사용자를 안내하는 onboarding funnel입니다.',
      testInstructions: `가장 쉬운 방법은 live demo입니다. https://arena-card.xyz 를 열고 Register를 클릭해 데모 계정을 만드세요(사용자 이름과 비밀번호만 필요하며 이메일은 필요하지 않습니다). 무료 Welcome Pack(카드 5장)을 열고 Lineup으로 이동해 Pokemon 또는 One Piece arena를 고른 뒤 카드 5장을 선택합니다. 전투를 시작하고 매 round마다 ATK, DEF, AURA 중 하나를 선택하세요(type-advantage 색상과 battle log를 확인하세요). 마지막으로 아무 카드의 Card Passport를 열어 실제 참고 데이터를 확인합니다. 팩 열기는 로그인 후 사용할 수 있으며 진행 상황은 서버에 저장됩니다.

로컬 실행: git clone https://github.com/duclucky/arenaiss && cd arenaiss && npm install을 실행한 뒤 .env.example로부터 .env.local을 만드세요(AUTH_SECRET 설정, live Index 가격을 사용하려면 RENAISS_INDEX_API_KEY와 RENAISS_INDEX_API_SECRET을 선택적으로 추가하고, AI insight를 사용하려면 PASSPORT_AI_*를 추가). 이후 npm run dev를 실행하고 http://localhost:3000 을 여세요. 검증 명령: npm run typecheck, npm run build, npm run test:unit.`,
      judgeNotes: '안전은 나중에 덧붙인 것이 아니라 처음부터 설계에 포함되었습니다. 앱은 엄격한 읽기 전용이며 GET과 public client만 사용하고 signer, private key, pullGacha, buyback, createSecureClient는 절대 사용하지 않습니다. 모든 API key는 서버 측에만 보관되며 production client bundle 스캔으로 이를 검증했습니다. 경제 시스템은 가상이고 게임 수치는 명확히 허구로 표시되며 가치평가나 조언으로 제시되지 않습니다. 전투는 pay-to-win이 아니라 기술 중심입니다. type-advantage가 가장 강력한 변수이며 self-play 테스트에서는 숙련되게 운용한 low-tier lineup이 high-tier lineup을 약 42% 확률로 이겼습니다. Repo: https://github.com/duclucky/arenaiss. Production 방향: 향후 같은 순환 구조를 모의 카드에서 지갑으로 검증한 실제 Renaiss 카드로 확장해 wallet-native arena로 발전시키도록 설계했습니다.',
    }),
    steel: Object.freeze({
      pitch: '개인화된 marketplace 알림과 실시간 gacha 팩 EV 추적을 제공하는 Telegram bot 및 live dashboard입니다.',
      description: 'Aether Scanner는 Renaiss 수집가를 위해 개인화된 marketplace 알림과 실시간 팩 EV 추적을 제공하는 Telegram bot + live web dashboard입니다. 사용자는 set/grade/price 조건으로 맞춤 watchlist를 만들고 원하는 알림을 받을 수 있으며, 구매 전에 gacha 팩별 Expected Value 추세를 모니터링할 수 있습니다.',
      renaissRelation: 'Aether Scanner는 공식 renaiss CLI 위에 구축되었습니다. CLI를 활용해 marketplace 데이터, 팩 정보, owner indexing을 가져와 실시간 개인화 알림과 EV 분석을 제공합니다. 원시 protocol 데이터를 실행 가능한 저소음 insight로 전환하여 Renaiss 수집가 도구와 깊이 연결하며, 수집가가 구매와 팩 개봉에 관해 더 나은 결정을 내리도록 돕습니다.',
      testInstructions: `빠른 테스트:
Telegram bot으로 이동: https://t.me/aether_scanner_bot
/start 입력
버튼을 사용해 기능 탐색

직접 호스팅 설정:
git clone https://github.com/youthisguy/Aether-backend.git
cd Aether-backend
cp .env.example .env
# Add your Telegram BOT_TOKEN
npm install
npm start`,
      judgeNotes: `핵심 전제: 개인화 watchlist + 선제적 팩 EV 추적(기존 도구 대부분은 사후 대응형입니다).
REST API를 통해 확장할 수 있도록 구축했습니다.
정보 과부하와 좋지 않은 팩 구매 결정이라는 실제 수집가의 문제 해결에 집중했습니다.`,
    }),
    'renaiss-collector-arena': Object.freeze({
      pitch: '플레이어가 실제 자산 시장에 들어가기 전에 수집품 거래를 연습할 수 있는 멀티플레이어 미니게임입니다.',
      description: '플레이어가 TCG 거래 방식을 시뮬레이션할 수 있는 미니게임입니다.',
      renaissRelation: 'Renaiss는 수집품 RWA를 다루기 때문에 이 게임이 브랜드에 매우 잘 어울린다고 생각합니다. 사용자는 실제 자산 세계에 들어가기 전에 수집품 거래 방법을 배울 수 있습니다.',
      testInstructions: '아무것도 설치하지 않고 웹사이트에서 바로 이용할 수 있습니다. Profile로 이동해 이름을 저장하고, 방을 만들거나 AI와 플레이하세요. 즐기세요.',
      judgeNotes: '없습니다.',
    }),
    'renaiss-rwa-sniper': Object.freeze({
      pitch: '등급 카드 listing을 스캔하고 희소성 패턴과 FMV 기회를 찾아내는 AI 탐색 terminal입니다.',
      description: 'RENAISS RWA Sniper Terminal은 Renaiss marketplace 사용자, 수집가, 트레이더를 위해 구축된 AI 기반 디지털 자산 인텔리전스 및 탐색 플랫폼입니다. 등급 카드 marketplace 자산을 스캔하고 인증서 일련번호와 희소성 패턴을 분석해 Grail Cards, Fancy Numbers, Consecutive Chains를 포함한 고가치 기회를 식별합니다. 플랫폼은 시장 listing과 추정 FMV 신호를 비교하여 저평가 자산을 찾도록 돕고, 수동 검색을 자동화된 인텔리전스 workflow로 전환합니다.',
      renaissRelation: `이 프로젝트는 Renaiss 등급 카드 RWA marketplace 생태계를 중심으로 구축되었습니다. Renaiss Marketplace API를 통해 Renaiss marketplace 데이터와 연결하고, 이용 가능한 카드 listing을 수집해 자산 정보를 분석합니다.

플랫폼은 인증서 일련번호, 카드 metadata, marketplace 신호를 처리하여 Renaiss 수집가 및 거래 데이터 개념을 활용하고 숨겨진 가치 패턴을 식별합니다. Renaiss 자산 데이터 위에 맞춤형 인텔리전스 로직을 적용해 시장 premium 가치가 있을 수 있는 Grail Cards, Fancy Numbers, Consecutive Chains를 찾아냅니다.

RENAISS RWA Sniper Terminal은 수집가와 트레이더가 더 효율적으로 기회를 발견하도록 돕는 인텔리전스 계층을 제공해 Renaiss 경험을 확장합니다.`,
      testInstructions: `심사위원은 live demo, demo video, GitHub 저장소를 통해 프로젝트를 평가할 수 있습니다.

Live Demo:
https://cool-ui-design-459a56.surf.computer/

Demo Video:
https://youtu.be/QT0b-Oj8tH0

GitHub Repository:
https://github.com/lenmu168/renaiss-rwa-sniper

live demo는 주요 사용자 경험을 제공하며, 심사위원은 RENAISS RWA Sniper Terminal 인터페이스, 자산 탐색 workflow, 희소성 탐지 로직, FMV 중심 기회 분석을 살펴볼 수 있습니다.

기술 검토를 위해 심사위원은 다음 항목이 포함된 GitHub 저장소를 확인할 수 있습니다.
- README.md: 프로젝트 개요 및 문서
- frontend/: 사용자 인터페이스
- backend/: 애플리케이션 서비스
- psa_sniper.py: 핵심 자산 스캔 및 분석 엔진
- market_cache.json: 분석용 marketplace 샘플 데이터

프로젝트를 로컬에서 실행하려면:

1. 저장소를 clone합니다.
git clone https://github.com/lenmu168/renaiss-rwa-sniper.git

2. frontend와 backend의 dependency를 설치합니다.

3. README.md의 설정 안내에 따라 frontend와 backend 서비스를 시작합니다.

4. 독립형 분석 workflow를 테스트하려면 Python 스캔 엔진을 실행합니다.

python psa_sniper.py

테스트 계정이나 추가 자격 증명은 필요하지 않습니다. 심사위원은 등록 없이 live demo에 바로 접근할 수 있습니다.`,
      judgeNotes: `RENAISS RWA Sniper Terminal은 디지털 자산 marketplace의 핵심 과제인 대량의 거래 데이터 속에서 가치 있는 기회를 찾는 문제를 해결하는 데 집중합니다.

우리 시스템은 수동 조사에만 의존하지 않고 marketplace 인텔리전스, 희소성 패턴 인식, FMV 중심 분석을 결합해 수집가가 더 빠르고 현명한 결정을 내리도록 돕습니다.

이 프로젝트는 AI 기반 분석이 원시 marketplace 데이터를 실행 가능한 insight로 전환함으로써 Renaiss 생태계를 어떻게 강화할 수 있는지 보여줍니다.`,
    }),
    'renaiss-card-story': Object.freeze({
      pitch: 'Renaiss 카드 데이터를 AI가 생성한 수집품 이야기로 바꾸는 카드 조회 및 표시 도구입니다.',
      description: `프로젝트 기능

Renaiss Card Story는 디지털 수집 카드 표시 플랫폼으로, 주로 수집 카드 정보 조회, 카드 상세 정보 표시, AI 콘텐츠 생성 기능을 제공합니다. 사용자는 PSA 번호 또는 Token ID를 입력해 수집 카드 정보를 빠르게 조회하고 카드 이미지, 이름, 등급, 관련 속성을 확인할 수 있습니다. 또한 카드 내용을 바탕으로 AI를 활용해 다양한 스타일의 텍스트 이야기를 생성하여 디지털 수집 카드의 상호작용 경험을 향상할 수 있습니다. 시스템은 생성된 콘텐츠 저장도 지원해 나중에 편리하게 확인하고 관리할 수 있습니다.

대상 사용자

이 프로젝트는 주로 다음 사용자 그룹을 대상으로 합니다.

디지털 수집 카드 애호가: 자세한 수집 카드 정보를 빠르게 조회하고 살펴보며 수집 경험을 풍부하게 할 수 있습니다.

NFT 및 디지털 수집품 사용자: 디지털 수집 카드의 기본 정보를 이해하고 AI를 통해 더욱 흥미로운 콘텐츠를 얻을 수 있습니다.`,
      renaissRelation: `현재 사용 중:

Renaiss Card Data API

PSA 번호/Token ID 조회

카드 metadata 표시(이미지, 이름, 등급 등)

카드 데이터 기반 AI 콘텐츠 생성

향후 확장:

Renaiss Index API

Card Tools

Trading Data

Community Tools

Game Experience`,
      testInstructions: `환경 요구 사항

Node.js 18.x 이상

npm 9.x 이상

단계

1. 프로젝트 clone

git clone <project repository address>

2. 프로젝트 dependency 설치

Frontend:

cd frontend
npm install

Backend:

cd backend
npm install

3. 환경 변수 설정(선택 사항)

AI 콘텐츠 생성 기능을 사용하려면 backend 디렉터리에 .env 파일을 만들고 해당 AI interface 정보를 설정하세요.

PORT=3000
AI_API_KEY=your API_KEY

AI API를 설정하지 않아도 수집 카드 조회 및 표시 기능은 정상적으로 사용할 수 있지만 AI 콘텐츠 생성 기능은 사용할 수 없습니다.

4. backend 시작

npm run dev

5. frontend 시작

cd frontend
npm run dev

6. 브라우저를 열고 접속

http://localhost:5173

테스트 절차
홈페이지에서 PSA 번호 또는 Token ID를 입력합니다.

Query를 클릭해 수집 카드 상세 정보를 확인합니다.

AI 콘텐츠 생성 스타일을 선택합니다.

“Generate Content”를 클릭해 AI가 좋아하는 카드를 바탕으로 텍스트 이야기를 생성하는 기능을 체험합니다.

프로젝트 이용에는 계정 등록이나 로그인이 필요하지 않습니다.`,
      judgeNotes: `Renaiss Card Story는 React + Express 기반의 frontend/backend 분리 architecture로 개발된 디지털 수집 카드 표시 플랫폼이며, 디지털 수집 카드의 표시와 상호작용 경험을 향상하는 것을 목표로 합니다.

Renaiss Protocol이 제공하는 수집 카드 데이터를 바탕으로 수집 카드 검색, 카드 정보 표시, AI 콘텐츠 생성 등의 핵심 기능을 구현했습니다. AI와 디지털 수집 카드를 결합함으로써 정적인 수집 카드 정보에서 창의적이고 흥미로운 텍스트 콘텐츠를 생성해 사용자 참여와 수집 경험을 높일 수 있습니다.

전체 프로젝트는 명확한 코드 구조를 갖춘 modular design을 적용하여 유지보수성과 확장성이 뛰어납니다. 향후 Index API, 거래 데이터, community tools 등 Renaiss Protocol의 더 많은 기능을 통합해 디지털 수집품 생태계 경험을 지속적으로 개선할 수 있습니다.

프로젝트를 체험해 주신 모든 심사위원께 감사드리며, 소중한 의견과 제안을 기다리겠습니다.`,
    }),
    collectiq: Object.freeze({
      pitch: 'Renaiss FMV를 독립 시장 데이터와 교차 검증하는 가격, 위험, true-EV dashboard입니다.',
      description: 'CollectIQ는 Renaiss 수집 카드 자산을 위한 가격 인텔리전스 및 위험 dashboard입니다. 해당 자산은 BSC의 gacha “pack machines”에서 거래되는 Pokémon / One-Piece 등급 카드입니다. Renaiss 공식 FMV를 독립적인 제3자 시장 가격과 교차 검증하고, 모든 팩의 실제 기대값(EV)을 계산하며, 온체인 팩 뽑기를 거의 실시간으로 추적하고, 검증된 가격을 RWA / 담보 primitive로 전환합니다. 팩을 구매하거나 열기 전에 신뢰할 수 있는 가치평가를 원하는 수집가와 트레이더, 카드 담보 대출에 필요한 독립 가격 feed가 필요한 DeFi builder를 위한 도구입니다. 읽기 전용 분석만 제공하며 거래, transfer, 온체인 쓰기는 수행하지 않습니다.',
      renaissRelation: `Renaiss의 두 공개 API인 api.renaiss.xyz/v0(pack machines, marketplace, holdings)과 api.renaissos.com/v1(card index, pricing, sales history), 그리고 공개 Renaiss pool contracts의 BSC Transfer logs에서 읽은 Renaiss 온체인 팩 뽑기 event 위에 직접 구축했습니다.

Renaiss 수집가 및 거래 데이터(팩 내용물, tier별 buyback 가격, 공식 EV/FMV, marketplace listing, holder ledger)를 사용해 다음과 같은 여러 도구를 구축합니다.

독립 가격 Oracle — PriceCharting(eBay 판매 완료 가격 집계)을 기준으로 Renaiss Index FMV를 검증하고 차이를 보여줍니다. 각 데이터의 출처를 표시해 독립 가격이 자체 보고 가격과 섞이지 않도록 합니다.
CDP 담보 시뮬레이터 — 검증된 가격으로부터 동적 LTV / liquidation price를 산출합니다.
RWA index — 카드 series를 주가 지수처럼 추적하고 팩별 True-EV, whale-wallet 위험, live-pool EV 역산을 제공합니다.
또한 실제 Renaiss 데이터의 함정도 수정합니다(예: *InUsd 필드는 실제로 cent 단위이므로 100으로 나누어야 하며, luck value는 tier별 buyback을 사용해야 합니다). 더 넓은 community를 위해 완전한 국제화를 지원합니다(EN 기본 · 中 · 日 · 한).`,
      testInstructions: `공개 repo: https://github.com/sanjassan/CollectIQ

git clone https://github.com/sanjassan/CollectIQ
cd CollectIQ
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # defaults are fine — no secrets needed to run the dashboard
python3 dashboard.py        # http://localhost:5000  (override with DASHBOARD_PORT)
http://localhost:5000 을 열고 상단 nav의 Price Verify · Price Intel · CDP · RWA Index · Oracle · On-chain Holdings · Live Pool을 사용하세요. language switcher는 오른쪽 위에 있으며 기본값은 English입니다.

참고:

로그인, 지갑, 테스트 계정이 필요하지 않으며 서명이나 transaction도 없습니다.
앱은 Renaiss public API에서 실시간으로 데이터를 가져오므로 API 기반 view를 즉시 사용할 수 있습니다. database는 gitignore 처리되어 있습니다(크기가 크고 재생성 가능). on-chain / holdings view를 채우려면 python3 scripts/grab_pack_contents.py --daily를 한 번 실행한 다음 python3 scripts/build_holdings.py를 실행하세요(선택 사항: 온체인 동기화를 위해 .env의 BNB_RPC를 BSC RPC endpoint로 설정). seeding하지 않아도 페이지는 로드되지만 일부 데이터 panel은 빈 상태로 표시됩니다.
python3 renaiss_api.py는 API wrapper의 빠른 self-test를 실행합니다.`,
      judgeNotes: `신뢰 우선이 핵심 insight입니다. 온체인 RWA 대출에는 자체 보고 FMV가 아니라 독립 가격이 필요합니다. CollectIQ의 모든 값에는 출처가 표시됩니다(renaiss_index = 비독립, pricecharting_ebay = 독립, 검증 가능한 링크 포함).
Oracle / CDP 페이지는 검증된 가격을 온체인에 올려 Renaiss 카드를 담보 등급의 soft money로 만드는 최종 목표를 실제로 작동하는 형태로 시뮬레이션합니다.
참조된 모든 contract address는 공개 Renaiss pool contracts이며 BscScan에서 검증할 수 있습니다.
Roadmap과 architecture note는 repo(README.md, COLLECTIQ_ROADMAP.md)에 있습니다.
제출 확인

이 제출물이 Renaiss Tech Hackathon S1의 최종 제출임을 확인하며, GitHub 저장소(https://github.com/sanjassan/CollectIQ)는 공개되어 검토할 수 있습니다.`,
    }),
    'team-arr': Object.freeze({
      pitch: '플레이어가 팩을 열고 별 제한 deck을 구성한 뒤 수집가 vault 안에서 전투하는 브라우저 카드 배틀 게임입니다.',
      description: 'Vinci Vault Battle은 Renaiss community 사용자를 위한 브라우저 플레이형 수집 카드 배틀 prototype입니다. 플레이어는 팩을 열고 FMV 기반 카드를 수집하며, 별 제한 deck을 구성하고, vault 안에서 전투하고, VP 보상을 얻고, skin을 잠금 해제하며, 향후 community iteration을 위한 feedback을 export할 수 있습니다.',
      renaissRelation: '이 프로젝트는 Renaiss 스타일 수집가 데이터가 플레이 가능한 game loop로 바뀌는 방법을 탐구합니다. 팩 열기, 희소성, FMV, 카드 가치평가, 시장 스캔 신호, vault custody, proof logs, collection dashboard를 핵심 gameplay system으로 사용합니다. 현재 demo는 로컬 mock 데이터를 사용하지만 UI는 Renaiss Index API, 카드 상세 정보, 가치평가 데이터, listing, 판매 이력, 향후 community/game tools와 연결할 수 있도록 설계되었습니다.',
      testInstructions: `설치가 필요하지 않습니다. 브라우저에서 demo 링크를 여세요.
https://arrkr.github.io/vinci-vault-battle/

권장 테스트 경로:
1. “ENTER THE VAULT”를 클릭합니다.
2. 가장 빠른 검토 경로를 위해 “Load demo kit”를 사용합니다.
3. 팩을 열고 카드를 공개합니다.
4. “My Collection”에서 카드를 살펴봅니다.
5. 별 제한 auto deck preview를 확인합니다.
6. 전투를 시작하고 Market Scan을 사용해 match를 완료합니다.
7. Profile, Leaderboard, Tutorial, Feedback 화면을 엽니다.

게임 진행 상황은 localStorage를 사용해 브라우저에 로컬로 저장됩니다.`,
      judgeNotes: '이 작품은 hackathon prototype이며 비공식 Renaiss concept fan project입니다. 팩 열기, collection value, deck strategy, battle reward, profile progression, feedback collection으로 구성된 완전한 플레이 가능 구간을 보여주는 데 초점을 맞췄습니다. production API field와 access가 확정되면 실제 server sync, live PvP, trading, 공식 Renaiss API integration을 향후 확장할 예정입니다.',
    }),
    'renaiss-collector-table': Object.freeze({
      pitch: 'PSA, FMV, 희소성, 가치 신호를 poker, crane, slot, roulette 경험으로 바꾸는 수집가 게임 모음입니다.',
      description: 'Renaiss Collector Table은 카드 수집가와 게임 사용자를 위한 플레이 가능한 수집가 게임 경험입니다. PSA 등급, FMV, 희소성, 수집 가치 같은 카드 신호를 Hold’em 스타일 poker table, Collection Vault, crane machine, slot machine, roulette, 최종 match summary로 전환합니다.',
      renaissRelation: `이 프로젝트는 Renaiss 스타일 수집가 데이터가 상호작용형 gameplay로 바뀌는 방법을 탐구합니다. 이번 hackathon demo에서는 로컬 mock 카드 데이터를 사용하고, 향후 Renaiss Index API integration에 필요한 UI/data 구조를 구축했습니다.

Collection Vault에는 FMV, PSA 등급, 희소성 tier, collector strength, 데이터 출처, API-ready 참고 badge를 보여주는 Index Signal panel이 포함되어 있습니다. 현재 버전은 아직 완전한 live API integration이 아니지만, 안정적인 endpoint와 필수 field가 제공되면 로컬 mock field를 Renaiss Index API 또는 CLI 기반 수집가 데이터로 교체할 수 있는 구조를 갖췄습니다.

목표는 Renaiss Protocol 관련 카드, 수집가, 시장 신호가 정적 데이터에 머물지 않고 게임 경험을 구동하는 방법을 보여주는 것입니다.`,
      testInstructions: `심사위원은 Vercel 링크를 통해 live demo를 테스트할 수 있습니다.

권장 demo flow:
1. 앱을 엽니다.
2. Hold’em Table을 시작합니다.
3. poker hand를 몇 번 플레이하고 Match Summary를 확인합니다.
4. Collection Vault를 열고 카드를 클릭해 PSA, FMV, 희소성, Index Signal 데이터를 살펴봅니다.
5. main screen에서 Collection Crane, Slot Machine, Renaiss Roulette를 체험합니다.
6. 필요한 경우 오른쪽 위의 BGM toggle을 사용합니다.

로컬 설정:
npm install
npm run dev

Production build:
npm run build

테스트 계정은 필요하지 않습니다. Collector Chips는 가상의 게임 내 point일 뿐입니다.`,
      judgeNotes: `이 demo에는 실제 돈을 이용한 betting, deposit, withdrawal, trading, 금융 조언이 포함되지 않습니다. 시장 가치는 로컬 mock 데이터를 사용한 gameplay/reference 신호입니다.

이 프로젝트는 수집가와 시장 신호를 플레이 가능하게 만든다는 Game Track 아이디어에 집중합니다. Renaiss Index API integration은 API-ready Index Signal UI와 로컬 data adapter 구조로 표현되어 있으며, 다음 단계는 안정적인 field와 endpoint가 확정되면 mock 데이터를 실제 Renaiss API 데이터로 교체하는 것입니다.`,
    }),
    'team-slabscan': Object.freeze({
      pitch: '등급 카드 사진을 인식하고 Renaiss OS Index로 가격을 산정하며 시장 맥락을 설명하는 slab 사진 scanner입니다.',
      description: `SlabScan은 어떤 등급 trading card든 즉시 지능적으로 가치평가합니다. 휴대전화를 PSA, CGC, BGS slab에 비추면 SlabScan이 사진에서 카드를 읽고 Renaiss OS Index 기준으로 가격을 산정한 뒤 AI analyst의 해석을 덧붙입니다. 해당 등급이 바로 아래 등급보다 지불할 premium만큼 가치가 있는지, 그 가격에서 실제 유동성이 어느 정도인지, 그리고 hold, sell, chase, pass 중 명확한 결론을 알려줍니다.

맥락 없이 숫자만 내놓는 scanner app에 지친 수집가를 위해 만들었습니다. SlabScan은 가격만 제공하는 대신 영리한 수집가 친구가 해 줄 법한 reasoning을 제공합니다. 추측이 아니라 Renaiss의 교차 출처 가치평가 데이터에 근거하며, community에 바로 공유할 수 있는 형태로 분석을 구성합니다.`,
      renaissRelation: 'SlabScan은 전적으로 Renaiss OS Index API(/v1/graded/by-image)에서 작동합니다. slab 사진을 OCR로 읽고 Renaiss 인증서 database와 대조해 권위 있는 카드/등급 식별 결과를 얻은 다음, Renaiss의 live marketplace crawl(SNKRDunk, Alt)을 통해 가격을 산정하여 정적 가격 안내서가 아닌 신뢰도 점수가 포함된 실시간 fair-market-value를 제공합니다. Renaiss 자체 pipeline stage가 SSE를 통해 UI로 바로 실시간 전송되므로 사용자는 식별과 가격 산정 과정을 실시간으로 볼 수 있습니다. 그 위에 선택적으로 Claude 기반 “taste call”(HOLD/SELL/CHASE/PASS)을 사용해 Renaiss 가치평가의 가격, 신뢰도, 최신성을 바탕으로 reasoning할 수 있습니다.',
      testInstructions: `설정 없이 live app을 방문하세요: https://slabscan-pi.vercel.app

로그인이나 테스트 계정은 필요하지 않습니다. 모바일에서는 “Scan a card”를 누르고 label과 카드가 모두 보이도록 PSA/BGS/CGC slab 사진을 촬영하세요. desktop에서는 같은 버튼이 file picker를 열어 사진을 upload할 수 있게 합니다. 앱은 실제 Renaiss OS Index 식별과 가격 산정, Claude가 생성한 taste call(HOLD/SELL/CHASE/PASS)을 포함한 완전한 live mode로 실행 중입니다.

참고: Renaiss가 최근에 가격을 산정하지 않은 카드는 첫 scan에서 Renaiss가 live marketplace sales를 crawl하는 동안 1~2분이 걸릴 수 있습니다. 이는 예상된 동작이며 bug가 아닙니다. 이후 같은 카드를 다시 scan하면 cache에서 거의 즉시 결과가 반환됩니다. 빠른 경로를 테스트하려면 흔한 카드를 연속으로 두 번 scan하세요.

(코드 검토: repo는 https://github.com/Chekwube-Peters/SlabScan 에 있으며, api/value-card.js는 Renaiss proxy, api/taste.js는 Claude integration, src/SlabScan.jsx는 main scan flow입니다.)`,
      judgeNotes: '없습니다.',
    }),
    'renaiss-alpha-radar': Object.freeze({
      pitch: '저평가 자산을 발견하고 whale을 추적하며 실시간 Alpha 알림을 생성하는 Renaiss RWA 생태계용 AI 자금 인텔리전스 시스템입니다.',
      description: `Renaiss Alpha Radar는 Renaiss RWA 생태계를 위해 특별히 구축된 AI 스마트 자금 인텔리전스 시스템입니다.

시장 활동, 수집품 추세, 시장 신호를 모니터링하여 저평가 자산을 발견하고 whale의 행동을 추적하며 수집가, 트레이더, community에 실시간 Alpha 알림을 생성합니다.`,
      renaissRelation: `Renaiss Alpha Radar는 Renaiss 생태계를 중심으로 생태계 데이터, 시장 활동, 수집품 정보, 거래 신호를 활용해 구축되었습니다.

이 프로젝트는 Renaiss 데이터 소스와 AI 기반 분석을 결합하여 원시 생태계 활동을 실행 가능한 인텔리전스로 전환합니다.

Renaiss 개발자 도구, CLI 기능, 수집품 데이터를 활용해 완전히 새로운 native AI RWA 경험을 만드는 방법을 보여줍니다.`,
      testInstructions: `심사위원은 GitHub 저장소를 clone하여 프로젝트를 테스트할 수 있습니다.

git clone https://github.com/ifallout101i-renaiss/renaiss-alpha-radar.git

dependency 설치:

pip install -r requirements.txt

실행:

python renaiss-alpha-radar.py

terminal에서 Renaiss Alpha Radar monitoring engine이 시작되고 실시간 scanning activity가 표시됩니다.

제공된 demo video를 통해서도 프로젝트를 확인할 수 있습니다.`,
      judgeNotes: `Renaiss Alpha Radar는 Renaiss RWA 생태계를 위한 intelligence layer를 구축하는 데 주력합니다.

blockchain 데이터를 보여주는 데 그치지 않고 AI 분석, 기회 탐지, community alert를 통해 생태계 활동을 실행 가능한 insight로 전환합니다.

이 프로젝트는 RWA 시장을 더 쉽게 이해하고 수집가와 트레이더가 더 편리하게 참여할 수 있도록 하는 것을 목표로 합니다.`,
    }),
    tilik: Object.freeze({
      pitch: 'Renaiss 가챠 팩을 위한 독립 EV, 확률 투명성, 가격 스캔, 온체인 provenance 도구입니다.',
      description: 'Tilik은 Renaiss 가챠 카드 팩의 독립적인 EV 및 확률 투명성 도구입니다. Renaiss 팩은 최고 상품만 홍보하고 기대값이나 확률은 공개하지 않지만, Tilik은 현실적인 EV, 최근 30회 실제 pull 분포, 평균뿐 아니라 P(profit)까지 반영한 정직한 판정, Renaiss FMV와 독립적인 실거래 기반 추정치의 공정성 교차 검증을 제공합니다. Monte Carlo “should I rip?” simulator, 인증번호 또는 slab 사진 기반 독립 가격 scanner, 온체인 provenance도 포함되어 수집가가 뽑기 전에 위험과 가치를 알 수 있습니다.',
      renaissRelation: 'Tilik은 전적으로 Renaiss 개발자 도구 위에 구축되었습니다. 공식 Renaiss CLI(npx renaiss)에서 팩 가격, 명시된 EV, 대표 카드, 최근 30회 실제 pull, marketplace listing을 읽고, Renaiss OS Index API의 /v1/graded/{cert} 및 사진 식별용 by-image SSE endpoint에서 얻은 독립 실거래 가치와 Renaiss FMV를 교차 검증합니다. 각 카드의 BNB Chain transfer/mint/sell event와 BscScan 링크도 제공해 Renaiss의 “verifiable on-chain” 주장을 뒷받침합니다. 독립 가치는 Renaiss OS Index로 출처를 표시하고 모든 수치를 추정치로 명시합니다.',
      testInstructions: `설정 없이 https://tilikrip.vercel.app 을 여세요.
• Landing → “Check a Pack”으로 dashboard를 엽니다.
• Packs: OMEGA / RenaCrypt / Eden을 전환해 EV와 Renaiss 명시 EV, 판정, 가치 histogram, tier 확률, 전체 팩 비교를 확인합니다.
• Scanner: cert chip을 누르거나 PSA/CGC/BGS cert를 붙여 넣거나 slab 사진으로 실시간 식별합니다.
• Simulator: rip slider를 움직여 Monte Carlo P&L 분포를 봅니다.
• On-chain: BscScan-linked event를 확인합니다.
커밋된 snapshot이어서 demo는 offline에서도 작동합니다. 로컬 실행은 npm install && npm run dev, engine self-test는 npm run check입니다. 파트너 Index 접근은 선택적으로 RENAISS_API_KEY / RENAISS_API_SECRET을 설정합니다.`,
      judgeNotes: '“Tilik”은 자바어/인도네시아어로 꼼꼼히 살펴본다는 뜻이며 “nilik dulu sebelum rip”이라는 의미입니다. 모든 결과는 검증 사실이 아닌 추정치로 명확히 표시되고 감시자보다 수집가 친화적인 어조를 유지합니다. 데이터 출처, 가정, 한계는 앱과 README, SUBMISSION.md에 기록되어 있습니다. 1인 개발이며 Renaiss 공식 제품이 아니고 금융 조언을 제공하지 않습니다.',
    }),
    'wurp-arena': Object.freeze({
      pitch: '온체인 Renaiss NFT를 전투 loadout으로 바꾸어 ranked 또는 CPU 전투를 즐기는 2D arena fighter입니다.',
      description: 'Wurp는 사용자의 온체인 Renaiss NFT를 2D arena fighter로 전환합니다. 카드 tier, grade, collection depth가 전투 loadout을 결정합니다. classic 또는 chaos ranked match에 참가하고 ELO를 BSC testnet에서 정산하거나 CPU와 연습할 수 있습니다. 자신의 카드를 실제로 전투에 쓰고 싶은 Renaiss 수집가를 위해 만들었습니다.',
      renaissRelation: 'Wurp는 BSC mainnet의 RenaissRegistry를 읽어 ranked play를 제한하므로 실제 소유 카드만 queue에 들어갈 수 있습니다. 온체인 tokenURI metadata에서 grade/set/tier를 가져와 matchmaking과 loadout에 반영하며, Renaiss OS Index API의 실험적 slab signal을 통합해 high/elite band에 추가 Damage charge를 부여합니다. 개발 중 Renaiss CLI를 사용했고 server loadout 수학과 동일한 pnpm slab:inspect 명령으로 Index band mapping을 미리 확인할 수 있습니다.',
      testInstructions: `빠른 연습(지갑과 설정 불필요):
pnpm install && pnpm dev
http://localhost:5173 에서 Quick Spar를 누르고 mock card를 골라 CPU와 싸웁니다. server의 기본 OWNERSHIP_MODE=testnet으로 Mona Lisa diamond, Starry Night platinum 등 4장 mock card를 즉시 사용할 수 있습니다.

전체 기능(지갑):
1. .env.example을 .env로 복사합니다.
2. pnpm dev가 server(:3000)와 web(:5173)을 시작합니다.
3. BSC mainnet chain 56 지갑을 연결합니다. Renaiss NFT 보유 지갑은 ranked queue에 들어갈 수 있습니다.
4. CPU practice도 지갑 카드와 같은 loadout logic을 사용합니다.
5. pnpm test로 sim, protocol, renaiss, server, Foundry contract unit test를 실행합니다.
6. pnpm slab:inspect로 Renaiss OS Index slab band와 combat loadout mapping을 봅니다.`,
      judgeNotes: '추가 참고 사항은 없습니다.',
    }),
    'tgpoke-renaiss': Object.freeze({
      pitch: 'Renaiss Index 데이터로 카드 포획과 지속형 collection을 운영하는 Telegram 그룹 게임입니다.',
      description: 'Renaiss Collector Bot은 TCG 수집 커뮤니티를 위한 Telegram 그룹 게임입니다. 플레이어는 “c”를 입력해 공개 blind card catch에 참여하고, 선택적으로 숨겨진 시장 참고값을 추측하며, 그룹 reveal을 본 뒤 지속형 게임 내 collection을 구축합니다. 거래, 현금 잔액, 실물/NFT 소유권 없이 카드 시장 학습을 가벼운 social game으로 바꿉니다.',
      renaissRelation: `bot은 Renaiss Index API와 수집가 데이터 위에 직접 구축되었습니다. /v1/search와 카드 상세 endpoint로 카드 identity와 시장 참고값을 확인하고, 공개 sitemap과 모든 /v1/sets/{game}/{set} listing을 audit하여 양의 가격을 가진 Pokémon 및 One Piece PSA 10 자산 8,600개 이상의 catalog를 구축했습니다. /v1/cards/{game}/{set}/{card}/trades의 90일 거래량으로 고가치, 고거래량, 저가 활성, 다양성을 포함한 quota 기반 1,000장 season pool을 구성해 가격뿐 아니라 실제 시장 활동을 반영합니다.

시장 참고값은 정확한 identity, freshness, confidence, source count, HTTPS source, valuation method 검사를 통과해야 scored experience에 반영됩니다. 검증 가격과 이미지는 PostgreSQL에 cache되고 lease로 하루 두 번 갱신되어 live game loop가 API를 막지 않고 파트너 rate limit을 지킵니다. 모든 reveal은 Renaiss 카드 페이지로 deep-link되어 그룹 플레이가 Renaiss 생태계 traffic으로 이어집니다.`,
      testInstructions: `Python 3.10 이상이 필요합니다. 표준 검토와 테스트에는 Telegram, PostgreSQL, Renaiss credential이 필요하지 않습니다.

git clone --branch codex/renaiss-collector-pilot-hardening https://github.com/yys5584/renaiss-tcg-bot.git
cd renaiss-tcg-bot
python -m venv .venv

# macOS / Linux
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python -m pytest tests -q

# Windows
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.\.venv\Scripts\python.exe -m pytest tests -q

credential 없는 smoke test는 RENAISS_SKIP_DB=1을 설정하고 renaiss_bot/RUNBOOK.md의 Local smoke test를 따릅니다. mock API 데이터는 항상 non-competitive로 표시되어 점수 기능에 영향을 줄 수 없습니다.

live Telegram 경험에는 전용 Telegram bot, 공식 test supergroup, 격리 PostgreSQL DB, 선택적 Renaiss Partner API credential이 필요합니다. renaiss_bot/.env.example을 .env로 복사한 뒤 RUNBOOK의 database fingerprint, preparation, preflight, release gate 단계를 따르며 token과 production credential은 공개하지 않습니다.`,
      judgeNotes: '독립 Renaiss 커뮤니티 협업 prototype이며 공식 제품이 아닙니다. 카드는 게임 내 collection record일 뿐 실물/NFT 소유권, 거래, 자금 보관, 투자 조언을 제공하지 않습니다. 시장 참고값은 실험적이며 모든 검사를 통과해야 scoring에 반영되고, 그렇지 않으면 collection-only입니다. fail-closed feature flag, database target fingerprint pinning, PostgreSQL concurrency protection, idempotent result handling, release gate, health check, 600개 이상의 자동 테스트가 포함됩니다. 한국어 우선/영어 전환 collection companion website, 익명 완성도 leaderboard, beginner guide는 같은 repo의 renaiss_bot/web에서 제공되며 https://tgpoke.com/renaiss 에서 이용할 수 있습니다.',
    }),
    'renaiss-air': Object.freeze({
      pitch: '가챠 simulator, 팩 EV, 시장 비교, Watchlist, portfolio를 결합한 all-in-one 플랫폼입니다.',
      description: 'Renaiss 경험을 개선할 기능을 한곳에 모은 플랫폼입니다. 사용자는 interactive simulator로 Renaiss 가챠를 체험하면서 Infinite Gacha Pack EV, 현재 구성, 최근 pull을 확인할 수 있습니다. Renaiss listing을 SNKRDUNK, ALT 같은 주요 marketplace와 비교해 더 나은 판단을 돕고, Watchlist alert로 원하는 카드와 목표 가격을 추적하며, 개인 portfolio에서 Renaiss 및 개인 소유 카드의 구매가, 추정 가치, 수익률을 관리합니다.',
      renaissRelation: '가챠 분석, 시장 비교, Watchlist, portfolio management를 결합해 Renaiss 사용자 경험을 개선합니다. Renaiss 관련 데이터와 도구를 연결해 simulator, Infinite Gacha Pack EV, 현재 팩 구성, 최근 pull을 제공하며 카드와 거래 데이터로 Renaiss listing을 SNKRDUNK 및 ALT와 비교합니다. 특정 카드와 목표 가격 watchlist로 지속적인 시장 확인을 줄이고 Renaiss 자산과 개인 카드의 구매가, 가치, 수익률을 함께 관리합니다. 즉 Renaiss 생태계를 중심으로 한 수집가용 analytics 및 management layer입니다.',
      testInstructions: 'https://renaissair.xyz/ 에서 이용할 수 있습니다. 계정을 만든 뒤 Watchlist, Portfolio, Renaiss World를 테스트할 수 있으며 Renaiss listing과 Web2 marketplace 가격 비교 등 다른 기능은 로그인 없이 이용할 수 있습니다.',
      judgeNotes: 'One Piece listing은 BGS 등급 카드가 더 우세하므로 ALT 기반 가격 데이터가 현재는 덜 정확할 수 있습니다. 향후 계속 개선하고 정교화할 예정입니다.',
    }),
    'renaisslens-oojae': Object.freeze({
      pitch: '공정성 분석, listing anomaly, provenance certificate를 갖춘 재현 가능한 팩 EV 및 시장 intelligence dashboard입니다.',
      description: 'RenaissLens는 가챠 팩을 뽑을지 판단하는 수집가를 위한 expected-value 및 market-intelligence dashboard입니다. “이 팩이 +EV인가, 아니면 기부하는가?”에 공개 데이터로 정직하게 답합니다. EV는 확률 자체를 재표본화하는 2단계 Monte Carlo의 P10–P90 범위이며 모든 parameter는 observed/inferred/assumed로 표시됩니다. 관측 pull이 20개 미만이면 수치를 꾸며내지 않고 “insufficient data”라고 판정합니다. market desk, 양방향 listing anomaly radar, Wilson confidence interval 기반 fairness observatory, 페이지 수치를 반드시 인용하고 매수/매도 조언을 거부하는 선택형 AI explainer, 모든 등급 listing의 공유 가능한 provenance certificate(/vault → /proof)를 제공합니다.',
      renaissRelation: 'Renaiss Protocol의 read-only surface 위에 구축되었습니다. api.renaiss.xyz의 /v0/packs, /v0/packs/{slug}, /v0/marketplace에서 팩 가격, empirical pull feed, 등급 listing을 읽고 client는 GET만 노출합니다. Latest Activities sales feed를 sales pulse와 양방향 anomaly radar로 만들며, Renaiss OS Index API를 사용해 company·grade·set·number·language exact match로 각 listing을 교차 검증하고 FMV와 Index 가격 차이를 출처와 함께 표시합니다. token_id마다 identity, grade, custody, price history, Index cross-check, snapshot SHA-256 seal을 담은 /proof certificate를 만듭니다. Fairness 탭은 우선 confidence interval이 있는 관측 결과를 제공하고 Renaiss가 provably-fair commitment scheme을 공개하면 cryptographic pull verification을 활성화할 수 있습니다. RenaissLens-Hackathon/1.0 UA, 2초 이상 간격의 serial queue, Retry-After를 지키는 제한 backoff를 사용합니다.',
      testInstructions: `설정 없이 이용할 수 있으며 심사 기간에는 15분 uptime canary로 유지됩니다.
1. https://renaisslens-production.up.railway.app/studio 에서 scroll하여 slab을 인증하고 Enter the vault를 누릅니다.
2. https://renaisslens-production.up.railway.app/ 에서 EV range와 일부 팩의 “insufficient data”를 확인합니다. /packs/omega의 Monte Carlo histogram, 5개 scenario sensitivity ladder, 표시된 가정, Explain it like a collector 버튼을 봅니다.
3. /market, /fairness, /vault → slab → /proof, /standard, /methodology, /api/health를 테스트합니다.

로컬은 계정, key, env, network 없이 실행됩니다: git clone https://github.com/OoJae/renaisslens && cd renaisslens && pnpm i && pnpm dev. Node 22+와 pnpm이 필요하며 커밋된 demo snapshot으로 offline 부팅합니다. pnpm scrape는 선택적 live ingestion, pnpm test는 195개 test를 실행합니다. AI explainer는 .env.example의 관련 변수를 설정할 때만 표시됩니다.`,
      judgeNotes: '정직함은 disclaimer가 아니라 설계 원칙입니다. EV는 단일 숫자가 아니고 “insufficient data”를 자랑스럽게 반환하며, 잘못 가격 책정된 listing은 arbitrage나 조언이 아닌 anomaly로 부릅니다. AI explainer의 not-financial-advice 문구는 server가 강제로 추가하고 seeded RNG로 동일 데이터 상태의 공개 수치를 재현할 수 있습니다. wallet, auth, cookie, tracking이 없습니다.',
    }),
    'card-platform-analysis': Object.freeze({
      pitch: '팩 개봉 contract 수집, 자금 흐름 추적, bot 탐지, wash volume 추정을 포함한 카드 플랫폼 온체인 분석 framework입니다.',
      description: '팩 개봉 contract 수집부터 자금 흐름 추적, bot 탐지, wash volume 추정까지 다루는 카드 플랫폼 온체인 분석 framework입니다.',
      renaissRelation: 'Renaiss 카드 플랫폼의 온체인 거래 데이터를 수집하고 분석합니다.',
      testInstructions: '자세한 절차는 ANALYSIS_SOP.md를 참고하세요.',
      judgeNotes: 'Renaiss 분석: https://docs.google.com/document/d/1p9Hff0U1inbvNoYXX2eixH6g4q_K5Dj3RmFHhHkgYEk/edit?tab=t.0#heading=h.8tt154mdot0f\nMNSTR 분석: https://docs.google.com/document/d/1-21BM7BsYXogbRyJfNasQKtXHxg4uy1BOJBlcTmEuu8/edit?tab=t.0',
    }),
    'renaiss-dashboard': Object.freeze({
      pitch: '가격, listing, 과거 판매, activity, chart, trend, 카드 상세를 제공하는 Renaiss 카드 시장 dashboard입니다.',
      description: 'Renaiss Card Market Dashboard는 Renaiss 생태계 수집가와 트레이더를 위한 시장 분석 도구입니다. Renaiss CLI로 카드 가격, marketplace listing, 과거 판매와 activity 데이터를 가져와 직관적인 price chart, trend analysis, 개별 카드 상세 페이지로 제공합니다. 사용자가 현재 카드 가치와 가격 움직임을 빠르게 이해하고 더 나은 수집·거래 기회를 찾도록 돕습니다.',
      renaissRelation: 'Renaiss Protocol 데이터 중심의 카드 시장 시각화 도구입니다. Renaiss CLI의 marketplace, card <tokenId>, packs 명령으로 listing, 카드 상세, 가격, 거래 이력, activity를 가져와 검색·필터·시각화 가능한 interface로 정리합니다. listing price, FMV, 과거 판매, activity를 price chart와 trend로 변환하고 grade, set, owner, pack, 시장 유통도 표시합니다. 향후 Renaiss Index API와 추가 수집가·판매·market-depth 데이터를 통합해 price alert, unusual movement notification, portfolio valuation, community trending-card ranking을 추가할 계획입니다.',
      testInstructions: `1. git clone <YOUR_GITHUB_REPOSITORY_URL> && cd Renaiss-card-market-dashboard
2. python -m venv .venv
3. Windows는 .venv\Scripts\activate, macOS/Linux는 source .venv/bin/activate
4. python -m pip install -r requirements.txt
5. python -m streamlit run app.py
6. 보통 http://localhost:8501 을 엽니다.

실제 Renaiss 데이터 테스트 전 renaiss --version을 확인하세요. 앱은 renaiss marketplace, renaiss card <tokenId>, renaiss packs를 사용해 listing, 카드 상세, 가격, activity history, pack 정보를 가져옵니다. 별도 test account는 필요 없습니다. Renaiss CLI를 사용할 수 없으면 sidebar의 Mock Data mode로 카드 filtering, price chart, trend, marketplace, 상세 페이지를 확인할 수 있습니다.`,
      judgeNotes: 'Renaiss의 지속적인 성공과 성장을 기원합니다.',
    }),
    'csr-renaiss-slab-king': Object.freeze({
      pitch: '실제 Renaiss 카드 데이터로 PSA 등급, 카드 가치, 디지털 소유권을 알려주는 multiplayer matching puzzle game입니다.',
      description: 'Renaiss Slab King은 실제 Renaiss 카드 데이터를 사용하는 multiplayer card-matching puzzle game입니다. 짧고 직관적인 게임을 하면서 PSA grade, 카드 가치, digital ownership 같은 수집 개념을 자연스럽게 배우고, 관심 있는 카드는 Renaiss Marketplace에서 바로 확인할 수 있습니다. grading, market price, on-chain ownership에 익숙하지 않은 TCG/카드 수집 신규 사용자와 Renaiss를 처음 접하는 casual user를 위한 게임 기반 수집 경험입니다.',
      renaissRelation: '향후 업데이트에서는 Renaiss와 연결된 X account 또는 Web3 wallet으로 로그인하고 플레이할 수 있습니다. 게임 내 카드 이미지와 정보는 Renaiss API에서 가져오며, Card Dex에서 각 카드의 FMV, 상세 정보, Renaiss Marketplace 링크를 확인합니다. 게임에서 발견한 카드에 관심이 생기면 해당 Renaiss listing으로 바로 이동할 수 있습니다.',
      testInstructions: '1. Demo 링크를 엽니다.\n2. Create Room에서 커뮤니티와 플레이할 방을 만들고 Pokémon 또는 One Piece를 선택합니다.\n3. 여러 content가 있는 map에서 item을 사용하고 카드를 수집합니다.\n5. lobby의 Card Dex에서 수집한 카드 목록을 봅니다.\n6. Pokémon 또는 One Piece를 선택하고 Normal, Rolling, Victory, Shanghai 등을 포함한 5개 map mode를 플레이합니다.',
      judgeNotes: 'Web3 프로젝트의 핵심은 신규 사용자를 유치하고 지속적으로 제품을 사용하게 만드는 것이며, 팀은 이 게임이 그 역할을 하길 바랍니다.',
    }),
    resona: Object.freeze({
      pitch: '감정 기반 추천, cinematic reveal, live Renaiss 검증, 정확한 listing link를 결합한 수집품 discovery 플랫폼입니다.',
      description: 'Resona는 수집가가 trading card를 탐색하는 방식을 새롭게 해석한 immersive collectible discovery 플랫폼입니다. emotion-driven recommendation, cinematic interaction design, Renaiss Index API를 통한 실시간 marketplace 검증을 결합해 일반적인 browsing을 기억에 남는 discovery 경험으로 바꿉니다. 선별 카드 추천, premium reveal animation, 개별 Renaiss listing으로 직접 연결되는 deep link를 통해 storytelling과 세심한 UX가 digital collectible engagement를 어떻게 높이는지 보여줍니다.',
      renaissRelation: 'Resona는 또 하나의 marketplace가 아니라 Renaiss 생태계의 새로운 interaction layer를 탐구합니다. Renaiss Index API로 collectible을 검증하고 live market data로 추천을 보강하며 사용자를 정확한 Renaiss listing으로 deep-link합니다. Renaiss 인프라와 cinematic emotion-driven discovery를 결합해 protocol이 카드 발견, 참여, 획득의 새로운 방식을 지원할 수 있음을 보여주고 향후 gamified/community-driven 경험의 기반을 마련합니다.',
      testInstructions: '1. live Vercel deployment를 엽니다.\n2. “How do you feel?”을 누르고 mood를 고릅니다.\n3. 앱이 맞는 collectible을 골라 cinematic animation으로 공개합니다.\n4. “Acquire”를 눌러 해당 Renaiss collectible page가 새 탭에서 열리는지 확인합니다.\n\n로컬은 npm install, npm run dev 후 http://localhost:3000 을 엽니다. 인증이나 test account는 필요 없습니다.',
      judgeNotes: 'Resona는 collectible discovery가 전통적 marketplace interface를 넘어 어떻게 발전할 수 있는지 탐구합니다. UX, emotional engagement, Renaiss 생태계와의 seamless integration에 집중하며 protocol infrastructure가 완전히 새로운 수집가 경험을 지원하는 방식을 보여줍니다. 현재 MVP는 discovery에 집중하지만 gamified collectible journey, interactive storytelling, community-driven experience라는 더 큰 비전의 기반이기도 합니다.',
    }),
    pullev: Object.freeze({
      pitch: 'Renaiss Infinite Gacha를 위한 출처 기반 팩 EV engine과 독립 client-side Merkle proof verifier입니다.',
      description: 'PullEV는 Renaiss Infinite Gacha를 provably fair하고 EV-transparent하게 만들어 신뢰가 아니라 수학과 증명으로 결정하게 합니다. 모든 수치에 출처를 붙여 두 질문에 답합니다. 첫째 “이 팩을 뽑아야 하나?”에는 100% 실제 Renaiss Index 가격을 사용하는 deterministic engine으로 EV 대비 비용, 전체 가치 분포, 수익 확률을 계산합니다. 둘째 “내 pull은 공정했나?”에는 브라우저에서 inclusion proof를 다시 계산하고 Renaiss 실제 온체인 merkle root와 비교하는 독립 client-side verifier를 제공합니다. 수집가, Tool Directory builder, operator/vault/RenaissOS node, wider community를 위한 투명성 layer입니다.',
      renaissRelation: 'PullEV는 Renaiss 핵심 수익 메커니즘인 Infinite Gacha의 투명성을 다룹니다. Renaiss Index API(beta)를 FMV oracle로 사용하며 cert lookup, structured-card lookup, search, market index, price-history로 약 148장의 실제 One Piece/Pokémon graded-card library를 가격 책정합니다. 12개 sealed pack은 BNB Chain gacha contract의 getMerkleRoot(packId)에서 실제 committed root를 읽고 BscScan 링크를 제공하며 client verifier가 Renaiss Merkle-proof + ZK fairness 구조를 직접 검증합니다. read-only이고 wallet, write, transaction이 없어 SBT identity와 RenaissOS verification node 같은 온체인 layer를 안전하게 보완합니다.',
      testInstructions: `App: https://pullev.vercel.app
Engine health: https://pullev-engine-production.up.railway.app/api/health

권장 90초 flow:
1. Landing의 live EV console에서 edge, profit chance, distribution과 source label을 확인합니다.
2. Launch app → The Floor에서 15개 실제 팩(3 live Infinite + Champion + 11 sold-out)의 live edge를 봅니다.
3. X-Ray Bay에서 EV vs cost, value distribution, draw band, per-card LIVE price를 확인하고 Under the hood에서 EV = Σ chance × avg sum과 input fingerprint hash를 봅니다.
4. Rip → Proof Vault에서 Merkle proof가 browser에서 재계산되어 VERIFIED가 되는지, tampered example이 MISMATCH가 되는지 확인합니다. sealed pack은 실제 on-chain root와 BscScan도 표시합니다.
5. AI advisor에 “should I rip this pack?”을 물어 cited answer를 보고 off-topic 질문 거부를 확인합니다.
6. /vault에서 약 148장 real library와 sparkline, /value에서 PSA/CGC/BGS cert를 조회합니다.`,
      judgeNotes: '추가 참고 사항은 없습니다.',
    }),
    jcompany: Object.freeze({
      pitch: 'Vault는 centering, defect, 위조 위험, 카드 식별, 시장가, PDF report를 결합한 AI 보조 grading workspace입니다.',
      description: 'Vault는 One Piece와 Pokémon 등 카드 사진으로 PSA, BGS, CGC grade를 예측하는 AI 기반 trading-card grading assistant입니다. 사진을 upload하면 computer vision으로 좌우/상하 centering을 pixel 단위 측정하고 scratch, whitening, dent를 자동 탐지하며 manual correction과 원본 비교를 지원합니다. edge와 corner wear도 분석하고 Gemini AI로 카드를 식별한 뒤 SNKRDUNK 실시간 가격과 PSA Population Report를 가져와 PDF로 export 가능한 종합 grade prediction report를 만듭니다. browser에서 작동하며 영어, 한국어, 일본어, 중국어를 지원합니다. 단순 centering app을 넘어 whitening/scratch/counterfeit detection, 즉시 시장가, PSA 10 population을 한곳에 모았습니다. 카드숍에서 몇 초 안에 구매 결정을 내려야 했던 경험을 바탕으로 professional grading 전 사전 평가, 거래 전 condition/value 확인, 유료 grading 전에 무료 preliminary assessment가 필요한 사용자를 위해 만들었습니다.',
      renaissRelation: 'Vault는 Renaiss Index API를 카드 가격과 식별의 primary source로 사용합니다. Gemini가 카드 번호와 이름을 식별한 뒤 /v1/graded/{cert}로 PSA/BGS/CGC 인증과 공식 grade/value를 확인하고, raw card는 /v1/cards/search, text recognition이 불확실하면 /v1/graded/by-image를 사용합니다. Renaiss가 반환한 name, set, grade, estimated value가 Card Info에 우선 표시됩니다. 일본 시장 One Piece/Pokémon coverage가 아직 제한적이어서 Renaiss가 match를 찾지 못할 때만 SNKRDUNK real-time price를 보완하고 alt.xyz population data를 추가합니다. 즉 Renaiss를 우선 사용하고 coverage gap만 다른 provider가 보충하는 hybrid system입니다.',
      testInstructions: `주의: 현재 Windows 전용이며 PowerShell 5.1 이상이 필요합니다. macOS/Linux에서는 demo video를 먼저 보세요. .NET 8 SDK와 무료 Gemini API key(https://aistudio.google.com/app/apikey)가 필요합니다.

git clone https://github.com/SSiberry/07-03renaiss.git
cd 07-03renaiss
.env.example을 .env.local로 복사하고 GEMINI_API_KEY, 선택적 GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION=us-central1을 설정합니다.

두 terminal을 동시에 실행합니다.
1. powershell -ExecutionPolicy Bypass -File serve.ps1 → http://localhost:7000
2. dotnet run --project centering-engine/CenteringEngine.csproj --urls http://localhost:5080

http://localhost:7000 에서 언어를 고르고 카드 이미지를 upload합니다. image quality, centering, surface/edge/corner inspection, report generation 동안 두 server를 유지합니다. Report 탭에서 Identify Card with Google AI를 눌러 Gemini recognition, Renaiss Index lookup, 필요한 경우 SNKRDUNK 보완을 확인하고 Export PDF를 누릅니다. 계정과 로그인은 필요 없습니다.`,
      judgeNotes: '개발 과정에서 AI의 합리적 추정과 정확한 측정은 다르다는 점을 확인했습니다. 초기 AI/JavaScript pixel scan centering은 실제 측정과 차이가 있어 OpenCV 기반 deterministic C# engine으로 교체해 인쇄 border를 pixel 단위로 측정했습니다. 홀로그램과 Secret Rare의 복잡한 이미지에서 한 장의 사진만으로 scratch, reflection, background를 완벽히 구분할 수 없어 원본 before/after slider와 brightness-difference highlight를 추가해 human verification을 더 신뢰할 수 있게 했습니다. Renaiss Index coverage가 부족할 때만 SNKRDUNK를 보완하며 생태계 확장에 따라 이 경로는 줄어들 것입니다. 원래 mobile-first였지만 기한 내 안정적인 desktop version에 집중했고 camera capture와 leveling assistance는 responsive하게 준비했습니다. 현재 local은 Windows 전용이며 surface defect algorithm은 계속 개선 중입니다. 빠르고 화려한 demo보다 신뢰할 수 있는 측정을 우선했습니다.',
    }),
    'renaiss-collector-assistant': Object.freeze({
      pitch: '자연어 카드 검색, wallet 분석, pack 추적, PSA 연번 발견, FMV/Index spread scan을 제공하는 AI Agent Skill입니다.',
      description: 'Renaiss Collector Assistant는 Renaiss 수집가와 커뮤니티 구성원을 위한 AI Agent Skill입니다. 자연어로 카드 조회, wallet 분석, pack opening 추적, PSA sequential cert 기회 발견, FMV/Index 가격 차이 scan을 수행해 코드를 모르는 사용자도 대화로 Renaiss 데이터와 도구를 이용할 수 있습니다.',
      renaissRelation: 'Renaiss CLI, Marketplace 카드 데이터, Renaiss OS Index API, FMV/top offer/last sale, BSC 온체인 wallet 데이터를 연결합니다. Renaiss 카드 조회, 시장 discount scan, Sequential Cert/PSA 연번 탐색, Index API reference price 비교, wallet의 pack opening, buyback, marketplace 매매, migration, SBT holding 분석을 지원합니다.',
      testInstructions: 'AI Agent에게 먼저 https://github.com/blueskylh/Renaiss-Collector-Assistant/blob/main/AGENT.md 를 읽고 준수하게 한 뒤 https://github.com/blueskylh/Renaiss-Collector-Assistant/blob/main/AGENT_INSTALL.md 를 읽어 Renaiss-Collector-Assistant skill 설치를 요청하세요. 이후 README의 wallet analysis, PSA sequential scan, Index lookup 예제 명령을 실행합니다. README 첫 화면에 홍보 video와 demo screenshot도 있습니다.',
      judgeNotes: '핵심 목표는 Renaiss 생태계 데이터의 사용 장벽을 낮추는 것입니다. 사용자는 API, 온체인 거래, 복잡한 script를 이해하지 않아도 자연어 질문만으로 카드, wallet, 시장 기회, SBT 분석을 받을 수 있습니다.',
    }),
    tasteforge: Object.freeze({
      pitch: 'live holding과 수집가 signal을 archetype, 10차원 taste vector, 개인화 Renaiss market discovery로 바꾸는 AI taste layer입니다.',
      description: 'TasteForge는 Renaiss용 AI taste layer입니다. 수집가는 BNB wallet을 입력하고 선택적으로 social note나 짧은 taste form을 추가합니다. 앱은 live holding과 signal에서 10차원 taste vector와 collector archetype을 만들고 live Renaiss marketplace의 Best Overall 및 Best Value 카드를 설명, portfolio snapshot, Renaiss 구매 경로와 함께 추천합니다. 더 나은 다음 구매를 원하는 Renaiss 카드 보유자와 아직 카드가 없어도 개인화 discovery를 원하는 신규 사용자 모두를 위한 도구입니다.',
      renaissRelation: 'live marketplace API의 listing, FMV, ask, owner와 read-only BNB wallet check로 Renaiss Protocol에 연결됩니다. collector holding과 live catalog를 scan하고 AI taste vector로 카드에 score를 매긴 뒤 Renaiss 카드 구매 페이지로 보냅니다. serial-pair style discovery는 Renaiss community tool에서 영감을 얻었습니다. TasteForge는 taste layer이고 Renaiss는 marketplace와 protocol의 source of record로 남습니다.',
      testInstructions: 'https://tasteforge.vercel.app 또는 https://tasteforge.vercel.app/?wallet=0x378ffaaf220ac102ea5c29bddcff1a16a2cab731&analyze=1 을 엽니다. 분석을 기다린 뒤 archetype, holdings portfolio, Best Overall/Best Value, Ask AI Any Question을 확인합니다. 계정은 필요 없습니다. Repo: https://github.com/emer-eth/tasteforge',
      judgeNotes: 'TasteForge는 추천기가 아니라 거울입니다. 무엇을 사라고 말하는 대신 온체인 카드를 읽고 사용자가 어떤 수집가인지 설명한 다음 맞는 Renaiss 카드를 보여줍니다. 전적으로 live data로 작동하고 카드가 없는 신규 사용자도 taste만 공유하면 이용할 수 있습니다. 모든 pick은 실제 Renaiss listing으로 이동해 marketplace demand를 유도합니다. integration cost와 API key 없이 바로 Renaiss에 연결할 수 있습니다.',
    }),
    'renaiss-library': Object.freeze({
      pitch: 'PSA slab 사진을 scan하고 cert를 검증하며 Renaiss Index로 가격과 live P&L을 추적하는 Pokémon graded-card portfolio입니다.',
      description: 'Renaiss Library는 graded Pokémon card portfolio tracker입니다. PSA slab 사진을 찍으면 label을 찾고 PSA 공식 database로 cert를 검증한 뒤 Renaiss Index로 가격을 산정하고 live value와 P&L을 포함해 collection에 추가합니다. 실제 slab을 보유한 수집가가 spreadsheet, signup, 추측 없이 무엇을 보유했고 얼마의 가치가 있으며 시장이 어떻게 움직이는지 한곳에서 확인하도록 만들었습니다.',
      renaissRelation: '앱의 모든 계층 중심에 Renaiss가 있습니다. 카드 검색, cert lookup, valuation은 모두 Renaiss Index API를 사용하고 confidence tier를 UI에 표시합니다. “Sync with Renaiss” 한 번으로 전체 collection을 Index와 다시 match하고 가격을 갱신합니다. Market 페이지는 renaiss.xyz의 live listing feed를 server-side로 parse해 FMV보다 낮은 카드를 자동 표시하며 featured card, index, recent trade panel도 Renaiss endpoint로 구동됩니다.',
      testInstructions: 'live demo를 여는 것이 가장 쉽습니다. 계정이나 설정 없이 모든 데이터가 browser에 저장됩니다. Collections의 Load demo data로 즉시 전체 portfolio를 불러오고 Add Card에서 PSA slab 사진 또는 repo sample을 upload해 자동 PSA verification을 확인합니다. Add by Cert #에 115965538을 입력해 PSA database lookup을 테스트하고 collection의 Sync with Renaiss로 live re-pricing, Market에서 renaiss.xyz feed를 봅니다. 로컬은 npm install 후 .env.local.example을 .env.local로 복사해 Renaiss API key를 넣고 npm run dev를 실행합니다. README에 typecheck, security scan, build gate가 있습니다.',
      judgeNotes: 'Renaiss Library의 비전은 온체인과 오프체인 TCG 수집가의 단일 home이 되는 것입니다. 실제 collection은 집의 physical slab과 Renaiss에서 vaulted/tokenized된 card가 섞여 있습니다. PSA cert로 실물을 검증하고 Renaiss Index 및 marketplace로 온체인 카드를 match하며 모든 수치의 provenance를 표시해 한곳에서 전체 자산을 확인·관리·평가합니다. live Renaiss marketplace feed, undervalued-vs-FMV 표시, TCG news ticker도 제공합니다. roadmap은 portfolio value snapshot, wallet auto-import, collection에서 Renaiss로 one-tap listing입니다. demo는 mock 없이 live Renaiss Index API, renaiss.xyz listing, PSA cert verification을 사용합니다.',
    }),
    'renaisslens-yanyuan': Object.freeze({
      pitch: '카드 검색, anomaly 탐지, grading break-even, Watchlist, collection 분석, read-only MCP를 결합한 Renaiss Index research suite입니다.',
      description: 'Renaiss Index 데이터로 카드를 검색하고 시장 anomaly를 찾으며 grading break-even을 모델링하고 Watchlist를 비교하고 MCP를 통해 같은 intelligence를 AI agent에 제공합니다.',
      renaissRelation: 'RenaissLens는 Renaiss Index API 위에 직접 구축되었습니다. card search, reference price, confidence, grade, recent trade, market index, certificate lookup을 수집가용 market-research tool로 전환합니다. Deal Quality Score, grade comparison, anomaly signal, grading break-even scenario, watchlist comparison, collection scan, data-quality report를 파생하고 read-only MCP endpoint로 AI agent가 안전하게 사용할 수 있게 합니다. Renaiss가 underlying data source로 남고 RenaissLens는 데이터 해석과 비교를 쉽게 하며 금융 조언을 제공하지 않습니다.',
      testInstructions: `계정이나 wallet 없이 https://renaisslens.vercel.app/ 을 엽니다. live Market Pulse를 보고 pikachu를 검색해 Pikachu with Grey Felt Hat을 엽니다. Deal Quality Score, anomaly signal, Grade Ladder, Grading Break-even calculator를 확인하고 PSA 10 가정 확률을 조절합니다. 여러 카드를 Watchlist에 추가해 Research Comparison, Collection Scan, Data Doctor를 실행하고 PSA99170568로 cert lookup을 테스트합니다.

agent integration은 MCP 페이지의 Check endpoint를 누릅니다. card search, snapshot, grading break-even, certificate lookup, indices, recent trades 등 6개 read-only tool이 반환되어야 합니다. Copy JSON으로 https://renaisslens.vercel.app/api/mcp 를 streamable-http 방식으로 Claude, Codex, OpenClaw 등에 추가한 뒤 카드 검색, anomaly 분석, $25 fee grading break-even, Pokémon index/recent trade 질문을 시도합니다. API key, test account, payment, transaction signing은 필요 없습니다.`,
      judgeNotes: 'RenaissLens는 chatbot이나 trading bot이 아니라 의도적으로 tool-first, AI-assisted입니다. research feature, score, anomaly detection, grading break-even, batch analysis는 deterministic하고 inspectable하며 AI는 증거를 설명하는 데만 사용됩니다. grading calculator는 grade를 예측하지 않고 slider는 수집가 자신의 가정이며 break-even은 Renaiss tracked price로 계산됩니다. buy/sell/return recommendation을 제공하지 않습니다. live market value는 변할 수 있고 AI 설명에는 deterministic 보완 경로가 있어 provider 장애에도 core experience가 유지됩니다. read-only MCP endpoint로 같은 Renaiss intelligence를 Claude, Codex, OpenClaw 등 MCP agent의 reusable infrastructure로 제공합니다.',
    }),
  }),
});
