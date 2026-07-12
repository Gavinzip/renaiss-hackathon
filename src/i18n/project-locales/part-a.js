export const PROJECT_TRANSLATIONS_A = Object.freeze({
  'zh-Hant': Object.freeze({
    'renaiss-card-dna': Object.freeze({
      pitch: '以視覺、行為與市場 DNA 為核心的 AI 卡牌性格與收藏家配對引擎。',
      description: 'Renaiss Card DNA 是一款為收藏家打造、由 AI 驅動的卡牌性格與配對引擎。它透過視覺 DNA、行為 DNA 與市場 DNA 分析收藏卡，協助使用者探索卡牌性格、比較卡牌、了解自己的收藏風格，並透過對話式 AI 顧問取得個人化推薦。',
      renaissRelation: 'Renaiss Card DNA 是專為 Renaiss 收藏家生態系打造的工具。此專案在收藏卡資料之上加入 AI 驅動的探索層，協助使用者超越價格與稀有度等原始指標，進一步理解卡牌身分、風格，以及它與收藏家的契合度。它被設計成 Renaiss 相關收藏工具的原型，未來版本可延伸整合真實的 Renaiss 生態系資料、交易活動與協議功能。',
      testInstructions: `評審可直接透過線上 Demo 測試此專案：https://renaiss-card-dna.vercel.app
主要頁面：
Home：總覽與導覽
Analyzer：分析卡牌 DNA 與性格
Portfolio：查看收藏家個人檔案與投資組合洞察
Chat：向 AI 顧問詢問卡牌洞察與推薦
Repository：
https://github.com/tranhop26/renaiss-card-dna
後端 API 文件：
https://renaiss-card-dna.onrender.com/docs
目前的 Demo 為原型用途使用模擬卡牌資料與合成交易歷史，應用程式中已清楚標示。`,
      judgeNotes: '此專案專注於讓收藏品探索變得更個人化、更直覺，並以品味為導向。它不只顯示價格與稀有度，而是導入一套以性格為基礎的架構，用來理解卡牌並將卡牌與收藏家配對。目前版本是一個可運作的原型，具備線上前端、後端 API、AI 聊天體驗，以及清楚的真實 Renaiss 生態系整合擴充路徑。',
    }),
    'renaiss-intelligence': Object.freeze({
      pitch: '以 Renaiss CLI 與 Index API 資料打造的價格信心度、卡包 EV 與市場情報層。',
      description: `Renaiss Intelligence — Price Confidence Engine + Pack EV Analyzer
這是一個建立在 Renaiss CLI 與 Index API 之上的統計情報層。它不只向收藏家顯示單一價格數字，而是使用共形推論，為任何 PSA 評級卡計算校準至 80% 的信賴區間，並依據真實的近期抽卡資料，計算 Renaiss 扭蛋卡包（OMEGA、RenaCrypt、Eden）的實際期望值，判斷卡包是否真的值得其成本。它也會追蹤即時市場銷售，並即時標示定價過高與定價過低的上架項目。此工具是為希望在買入、賣出或抽卡時依據資料建立信心，而不只是依賴行銷用 FMV 數字的收藏家與卡包買家所打造。`,
      renaissRelation: `此專案如何連結 Renaiss Protocol：

本專案完全建構在 Renaiss 為黑客松開發者釋出的自有開發基礎設施之上：





Renaiss CLI (npx renaiss) — 用於取得 OMEGA、RenaCrypt Pack 與 Eden Pack 的即時卡包詳細資料與近期抽卡資料，以及即時市場上架資訊（ask、FMV、售出活動）。



Renaiss Index API (api.renaissos.com) — 透過 /v1/graded/{cert} 查詢 PSA 憑證，回傳 FMV、信心等級與資料新鮮度，並將這些資料直接送入我們的共形推論引擎。



收藏家／交易資料 — 直接從 Renaiss 取得近期抽卡 FMV 與市場 ask/FMV 配對資料，並儲存以建立歷史價格脈絡，為 Price Confidence Engine 與 Pack EV Analyzer 提供資料基礎。



卡包／扭蛋資料 — 由 npx renaiss packs {slug} 取得每個卡包的真實抽卡資料（稀有度等級、FMV），供期望值計算使用，因此卡包判定反映的是 Renaiss 卡池的實際行為，而不是假設。

簡而言之：Renaiss 提供原始市場與卡包資料；我們的工具直接在其上加入統計情報層（校準信賴區間、實際 EV、價差偵測），讓 Renaiss 收藏家無須離開生態系，就能獲得更深入且更可靠的訊號。`,
      testInstructions: `線上 Demo（建議使用，無須設定）
前端：https://renaiss-intelligence-frontend.vercel.app
後端 API：https://renaiss-glass-insight-main.vercel.app
直接開啟前端連結即可，不需要登入或帳號。
可嘗試以下操作：

搜尋 PSA 憑證（例如 PSA151238633，或使用 UI 顯示的建議憑證編號之一），查看具有 80% 校準區間的 Price Confidence 引擎
捲動至 Pack Expected Values，查看 OMEGA、RenaCrypt Pack 與 Eden Pack 的即時 EV 計算
捲動至 Recent Sales Activity，查看附有價差判定的即時市場上架項目

注意：資料會在載入時即時取得，因此首次造訪時請等待數秒讓頁面完成填入。

選項 1 — 線上 Demo（建議使用，無須設定）
前端：https://renaiss-intelligence-frontend.vercel.app
後端 API：https://renaiss-glass-insight-main.vercel.app
直接開啟前端連結即可，不需要登入或帳號。
可嘗試以下操作：

搜尋 PSA 憑證（例如 PSA151238633，或使用 UI 顯示的建議憑證編號之一），查看具有 80% 校準區間的 Price Confidence 引擎
捲動至 Pack Expected Values，查看 OMEGA、RenaCrypt Pack 與 Eden Pack 的即時 EV 計算
捲動至 Recent Sales Activity，查看附有價差判定的即時市場上架項目

注意：資料會在載入時即時取得，因此首次造訪時請等待數秒讓頁面完成填入。

選項 2 — 直接測試後端 API
bashcurl https://renaiss-glass-insight-main.vercel.app/health
curl https://renaiss-glass-insight-main.vercel.app/search?cert=PSA151238633
curl https://renaiss-glass-insight-main.vercel.app/pack-ev?pack=omega
curl https://renaiss-glass-insight-main.vercel.app/recent-sales

選項 3 — 本機設定（用於程式碼審查）
完整設定指示、環境變數與架構均記錄於 GitHub repository README：
https://github.com/samixrd/renaiss-intelligence

給評審的重要說明：本專案使用目前仍處於 beta 階段的 Renaiss CLI 與 Index API。依照 Renaiss 自身說明，部分資料可能不完整、缺失、延遲或仍在更新；所有輸出皆為實驗性參考，而非最終驗證的市場事實。應用程式內透過持續顯示的橫幅清楚揭露此點。`,
      judgeNotes: `RenaCrypt Pack 顯示 0.96x EV 比率，是由資料得出的真實發現，而不是預先編排的 Demo 數字。它自然產生於針對直接從 Renaiss 即時取得的近期真實抽卡資料計算期望值，這正是此工具希望呈現的訊號。
當特定卡牌的歷史價格資料仍有限時（考量 API 尚處於 beta，這在預期之內），工具會透明地改用已標示的 bootstrap 估計，而不會假裝自己已具備尚不存在的完整統計信心。隨著 Renaiss 累積更多交易歷史，共形預測引擎會自動產生更緊密、更可靠的區間；此架構被設計成隨生態系資料持續改善，而不需要重新建置。
畫面所顯示的一切——FMV、抽卡結果、市場上架項目——都是從 Renaiss 自有 CLI 與 Index API 取得的真實資料。最終產品中沒有任何模擬、預先植入或占位數字。
本專案由一人在數天內專為這次黑客松衝刺打造，重點是交付一個對 Renaiss 收藏家真正有用的工具，而不只是外觀精美的 Demo。

感謝你們為我們提供 Index API 存取權限——這讓我們得以打造一個在統計上誠實的工具，而不是另一個普通的價格追蹤器。`,
    }),
    tcgclaw: Object.freeze({
      pitch: '協助 TCG 玩家快速理解卡牌資訊、價值與市場預期，縮小新手與資深收藏家之間的認知差距。',
      description: '許多 TCG 玩家其實對自己抽到的卡牌一無所知。因此，我們需要一個工具，幫助他們更快了解這張卡牌。對於希望更快在 Renaiss 了解市場上每張卡牌價值與預期的新手來說，我的工具就是要拉近新手與資深玩家在卡牌認知上的差距。',
      renaissRelation: '我在與 CTO 開會時找到了一個整合方向：這個工具可以嵌入每一張卡牌的頁面；點進該卡牌後，就能取得這張卡牌全方位的介紹。',
      testInstructions: '我可以直接展示。',
      judgeNotes: '沒有。',
    }),
    'barzakh-ai': Object.freeze({
      pitch: '用於 Renaiss 市場搜尋、FMV 分析、價格提醒與可驗證扭蛋的對話式 Web3 agent。',
      description: `Barzakh AI 是一個整合 Renaiss Protocol 收藏卡經濟（BNB Chain）的智慧 Web3 agent 平台。此 agent 運用即時 indexer 與市場 API，搜尋及分析由實體資產支持、存放於保管庫中的交易卡（Pokémon 與 One Piece）。它會自動比較上架價格與 Fair Market Value (FMV)，藉此辨識被低估的資產；追蹤經驗證的保管庫託管地點；監控目標價格觀察清單；並查詢具備 100% 密碼學透明度、可由零知識證明驗證的扭蛋抽取結果。

適合哪些人？此整合是為希望以資料建立信心、探索高價值評級卡生態系的收藏家、玩家與二級市場交易者打造。它提供即時且可驗證的估值細節、自動化價格提醒，以及透明的鏈上抽取工具，藉此消除市場臆測。`,
      renaissRelation: `Barzakh AI 是直接建構於 Renaiss Protocol 資料層與 API 之上的智慧對話封裝層與自動化引擎，透過以下整合提升收藏與交易體驗：

1. 核心 API 整合（Index 與 Marketplace API）

• Renaiss Index API (api.renaissos.com)：Barzakh AI 查詢 Index API，以解析公開參考價格資料、取得經驗證的 slab 掃描（PSA/CGC/BGS）、取得歷史價格圖表，並計算 Fair Market Value (FMV)。
• Renaiss Marketplace API (api.renaiss.xyz)：agent 取得即時交易資料，包括有效上架項目的 token ID、USDT 要價、保管庫位置與鏈上所有權詳細資訊。

2. 智慧收藏家與交易資料合併

• 自動估值與好價搜尋器：Barzakh AI 合併兩個 API 的資料，自動比較卡牌目前上架價格與其歷史 FMV 指數。它會動態計算溢價／折價百分比，協助收藏家找出被低估的「隱藏寶石」。
• 已上架與未上架篩選：agent 會排除只有 index 記錄、但不存在於市場上的項目。已上架卡牌顯示即時價格；目前未出售的保管庫資產則清楚標示為「Unlisted」或「Vaulted (Unlisted)」，並使用其 FMV 作為估值參考。

3. 可驗證扭蛋與遊戲體驗

• 零知識 Booster Packs：Barzakh AI 整合 Renaiss 的永久扭蛋卡包，例如 Eden、OMEGA 與 RenaCrypt 卡池。
• Expected Value (EV) 分析：使用者可以要求 agent 取得卡包 Expected Value (EV)、計算頂級卡牌掉落率、檢視近期抽取歷史，並說明協議如何使用鏈上零知識 Merkle Proof，以密碼學方式驗證抽取公平性。`,
      testInstructions: `開啟我們的專案：https://chat.barzakh.tech

測試提示與使用案例
開啟聊天介面後，只要複製並貼上下列提示，即可與 Renaiss Protocol 工具互動：

• 市場搜尋與定價：

1/「在 Renaiss 市場搜尋評級至少為 9 的 Luffy 卡牌。」
2/「尋找 Roronoa Zoro 卡牌」
3/「尋找被低估的 Pokemon 卡牌。」

• Booster Packs 與扭蛋分析：

4/「Renaiss 目前有哪些扭蛋卡包可用？」
5/「顯示 Eden 卡包的詳細資料、期望值與近期抽取結果。」`,
      judgeNotes: `給評審的重點特色

• 透過實體驗證達成零幻覺：Barzakh AI 提供的所有卡牌資料、評級與價格，皆對應以 1:1 方式存放於機構級保管庫中的真實實體交易卡。agent 提供可直接點擊的市場連結，以證明資料真實性。

• 可驗證公平性（零知識）：當使用者詢問扭蛋 Booster Packs 時，agent 會說明並連結至鏈上零知識 Merkle Proof。這確保每次抽卡都能以密碼學方式證明公平、透明且可在區塊鏈上稽核。

• 高正式環境可用性（動態金鑰輪替）：我們實作了自動金鑰輪替系統。若某個金鑰達到速率限制（429 或「rate_limited」回應），agent 會在背景無縫切換至下一組已設定的合作夥伴憑證並重試請求。

• 智慧意圖路由：我們更新了中央意圖分類器。使用者不需要手動調整設定或選擇工具；像「Eden 卡包的價格是多少？」這類提示會自動分類並直接導向 Renaiss API，而不會預設改用網路搜尋。`,
    }),
    'renaiss-lens': Object.freeze({
      pitch: '涵蓋估價、市場展望、交易策略、slab 照片估值與投資組合分析的 AI 收藏家 agent。',
      description: 'Renaiss Lens 是為 Renaiss 生態系打造、由 AI 驅動的收藏家情報 agent。它提供收藏家、交易者與新手單一對話介面，用來估價收藏品、預測市場趨勢、建立交易策略、搜尋 Renaiss 生態系知識，並透過 Renaiss OS Index API 查詢真實鏈上資料。使用者以自然語言輸入後，agent 會將查詢導向正確的情報層，回傳結構化估價卡、市場展望報告、交易行動方案、憑證驗證卡牌資料與投資組合健康分析。它也包含 Slab Photo Valuator，可從照片辨識任何評級卡並取得 Renaiss index 價格；Live Market Feed 可呈現真實收藏家經濟訊號；Collection Tracker 則提供 AI 投資組合分析。',
      renaissRelation: `Renaiss Lens 直接整合 Renaiss OS Index API。每次 RENAISS 意圖呼叫都會查詢 api.renaissos.com 的即時 index；使用者可以貼上任何 PSA、BGS 或 CGC 憑證編號，取得真實卡牌辨識、index 價格、信心等級，以及指向 Renaiss Index 頁面的直接連結。

Slab Photo Valuator 會呼叫 /v1/graded/by-image endpoint；使用者上傳 slab 照片後，Renaiss AI 無須憑證編號即可辨識卡牌並回傳其 index 價格。

每張估價卡都包含 List this on Renaiss CTA，將收藏家直接導向 Renaiss 平台。

SEARCH 意圖使用 Renaiss Protocol 知識訓練，涵蓋保管庫託管、Merkle proof 來源證明、零知識驗證與 BNB Chain 所有權移轉。

Market Feed 包含專用 RENAISS 分類，用來呈現即時生態系新聞。

Collection Tracker 協助收藏家了解他們可能在 Renaiss 上代幣化之資產的真實世界價值。所有 Renaiss OS Index 資料都依其署名要求清楚標示來源。`,
      testInstructions: `無須設定。使用任何瀏覽器直接造訪 https://renaiss-lens.vercel.app。

Chat 分頁——測試全部 6 種意圖：

1. APPRAISE——輸入「為我的 PSA 10 Charizard Base Set 1st Edition 估價」
2. PREDICT——輸入「Naruto TCG 在 2027 年前的市場展望如何？」
3. TRADE——輸入「給我本季評級 Pokemon holo 卡的轉售策略」
4. SEARCH——輸入「Renaiss 保管庫託管如何運作？」
5. RENAISS——輸入「在 Renaiss 查詢 PSA76729777」——會回傳真實保管庫卡牌的即時 Renaiss OS Index 資料
6. CHAT——輸入「什麼讓收藏品變得稀有？」

Slab Scan 分頁——上傳任何正面拍攝的 PSA/BGS/CGC slab 照片；Renaiss AI 會辨識卡牌並回傳 index 價格

My Collection 分頁——加入包含購入價格與估計價值的項目，然後點擊 Get AI Portfolio Analysis

Market Feed 分頁——點擊 Refresh，並以 RENAISS 分類篩選以查看生態系專屬訊號

注意：Renaiss OS Index 目前處於 beta 階段，部分卡牌可能尚無價格資料。RENAISS 意圖與 Slab Scan 均清楚標示為 beta 並附有來源署名。`,
      judgeNotes: `Renaiss Lens 由一人在黑客松期間不到 7 天內完成，其中也包含在開發工具於黑客松中途公布後，完整整合 Renaiss OS Index API。

核心洞察是，多數收藏工具只有單一用途。Renaiss Lens 將估價、預測、交易策略、生態系搜尋、憑證查詢、影像估值、投資組合追蹤與市場訊號整合進單一對話 agent，成為 Renaiss 收藏家經濟所需要的情報層。

每則 AI 回應都透過 Claude API 加入即時網路搜尋資料，使估值與市場訊號以真實的當前資料為基礎。Renaiss OS Index 整合更進一步：憑證查詢與 slab 照片辨識會直接從 Renaiss 基礎設施回傳經驗證的鏈上資料。

此產品以伴隨 Renaiss 成長為目標。隨著協議擴充 API 範圍，Renaiss Lens 可以直接串接保管庫持有資料、即時地板價與錢包層級投資組合資料，進一步提升精準度。

技術堆疊：Next.js 14、Tailwind CSS、Claude API（claude-sonnet-4-6 搭配網路搜尋）、Renaiss OS Index API、Serper API、Vercel。

資料署名：所有 Renaiss OS Index 資料均依 Renaiss 署名要求清楚標示。AI 輸出清楚標示為估計值。每次 Renaiss 資料回應中都會揭露 beta 限制。`,
    }),
    'liquidity-quest': Object.freeze({
      pitch: '將 Renaiss 市場掃描器紀錄轉化為可執行偵察路線的任務式收藏家情報工具。',
      description: 'Liquidity Quest 是一款收藏家情報工具，將真實的 Renaiss 市場掃描器紀錄轉化為偵察任務，包括被低估的上架項目、出價機會、價格警示與連續配對路線。',
      renaissRelation: '此專案直接建構於 Renaiss 收藏家經濟之上，使用真實市場掃描器資料，並將其轉化為有來源依據的流程，以改善探索與資訊充分的收藏活動。',
      testInstructions: '開啟 https://liquidity-quest.vercel.app/，點擊 start scouting、產生任務、使用篩選／搜尋功能，並檢查來源卡片，以確認每個任務都連結至真實的掃描器欄位，例如 FMV、ask price 等。',
      judgeNotes: '不適用',
    }),
    'fairdraw-suite': Object.freeze({
      pitch: '使用即時 Renaiss 資料檢查扭蛋卡包健康度、比較 EV，並驗證近期抽取結果的透明度套件。',
      description: 'FairDraw 是一款服務 Renaiss 扭蛋生態系的透明度與決策支援工具。它使用即時 Renaiss 資料，協助收藏家、實況主與開發者在開包前了解卡包品質，並在開包後驗證抽取結果。產品結合三個層次：提供卡包健康度與 EV 洞察的 PoolPulse、提供抽取驗證的 PullProof，以及進行卡包並排分析的 Compare。',
      renaissRelation: `FairDraw 直接建構於 Renaiss 生態系之上，並以官方 Renaiss 開發工具作為基礎。它整合 Renaiss CLI 以取得即時扭蛋卡包資料、近期抽取活動與卡牌查詢資料，架構上也能搭配 Renaiss OS Index API 處理估值相關流程。

更具體而言，本專案透過以下方式與 Renaiss Protocol 連結：

它透過 Renaiss CLI 讀取 OMEGA、Eden Pack 與 RenaCrypt Pack 的即時扭蛋卡包資訊。
它運用近期已開啟卡包的活動，推導收藏家可用的等級分布、EV 離散程度與健康度指標。
它使用 Renaiss 扭蛋活動資料驗證抽取一致性，而不是使用不相關的外部來源。
它提供 API 層與 Swagger 文件，因此也能延伸成 Renaiss 生態系內的 bot、dashboard 或其他社群工具。
目標不是取代 Renaiss，而是讓真實使用者更容易運用 Renaiss 的透明度與收藏品資料。`,
      testInstructions: `此專案是一個包含 React 前端與 Node.js/Express 後端的全端應用程式。

設定
npm run install:all
npm run dev
本機 URL
App: http://localhost:5173
API: http://localhost:3001
Swagger Docs: http://localhost:3001/api/docs
評審可以測試的內容
開啟首頁並瀏覽各個模組。
前往 PoolPulse，檢查以下卡包的即時健康度資料：
OMEGA
Eden Pack
RenaCrypt Pack
前往 Compare，查看哪個卡包目前具有最強的 EV 離散程度與健康分數。
前往 PullProof，以兩種方式測試驗證：
點擊 PoolPulse 中的近期抽取結果並直接驗證
手動將 collectible token ID 貼入 PullProof
重要說明
目前應用程式在使用 collectible token ID 驗證抽取結果時效果最佳。
目前尚未完整支援以 transaction hash 驗證，因為現行 Renaiss CLI 尚未提供完整的 tx-hash 驗證流程。
當資料是從近期抽取視窗取樣，而非完整庫存狀態時，應用程式會在 UI 中清楚顯示限制／免責聲明。
環境／工具說明
目前 Renaiss CLI 套件建議使用 Node.js 22+。專案已在開發環境中測試，但評審使用 Node 22 或更新版本可能會獲得最佳相容性。`,
      judgeNotes: `FairDraw 被設計成真正的收藏家工具，而不只是 Demo dashboard。我們刻意聚焦於 Renaiss 生態系內的實際用途：

協助使用者判斷目前哪個卡包看起來較強
協助他們理解近期抽取行為
提供驗證與說明抽取結果的方法
公開具備文件的 API 層，讓其他開發者可以重複利用
我們也刻意讓專案對其假設保持透明：

EV 與 FMV 數值均視為實驗性參考
等級組成是從近期抽取樣本推導
應用程式清楚區分即時 CLI 支援的資料與任何 fallback 行為
若有幫助，評審可以將 FairDraw 視為 Renaiss Protocol 的扭蛋情報與透明度層。`,
    }),
    'renaiss-intelligence-agent': Object.freeze({
      pitch: '結合即時 Renaiss 卡牌資料與 LLM 生成市場分析的 AI 金融終端。',
      description: 'Renaiss Intelligence Agent 是一款由 AI 驅動的金融終端，使用即時資料與 LLM 驅動的市場分析，協助收藏家與投資人判斷實體交易卡的公平市場價值。',
      renaissRelation: `Renaiss Intelligence Agent 完全建構於 Renaiss Index API 之上，並將它作為平台的核心資料骨幹。我們深入整合多項 API 功能來驅動此終端：
 1. Index API 與搜尋：我們使用 /v1/search endpoint，讓使用者能即時在 Renaiss 生態系中動態查詢特定實體資產，例如 Pokémon 與 One Piece 卡牌。
 2. 收藏家與交易資料：選定資產後，應用程式會呼叫 /v1/cards/... endpoints，取得完整且即時的市場資料。我們擷取資產的結構化 metadata、近期交易歷史（trades），以及 30 天歷史價格趨勢（fmvSeries）。
 3. AI 協同：本專案不只顯示這些原始 Renaiss 資料，而是將 Index API 的交易與定價資料直接提供給 LLM (Gemini)。AI 會分析 Renaiss protocol 的價格變化量與觀測次數，整合出獨特且易讀的市場洞察，並為收藏家產生自訂的「Conviction Rating」與「Buy Window」。
 透過運用 Renaiss Index API，我們得以將原始區塊鏈與市場資料，轉化為面向收藏品社群、精緻且由 AI 驅動的金融工具。`,
      testInstructions: `線上部署測試（建議）：
 你不需要在本機安裝或執行任何內容！本專案已完整部署並上線。
 1. 造訪線上 URL：https://renaiss-agent.vercel.app/
 2. 首頁會顯示直接從 Renaiss Index API 取得的即時「Featured Assets」網格。點擊任一卡牌，例如「Luffy & Ace」。
 3. 或者，使用搜尋列查詢「Charizard」或「Pikachu」等角色，並從下拉選單選擇結果。
 4. 進入資產 dashboard 後，探索即時 Trade History 與 Fair Market Value 圖表。
 5. 測試 AI：查看右側的「Ready for AI Analysis」面板，點擊「Generate Insight」按鈕。應用程式會將該資產的即時交易資料傳送給 Gemini，以產生自訂市場評估。

 AI 測試說明：我們刻意將 AI 放在手動「Generate Insight」按鈕之後，而不是自動執行。由於我們使用 Gemini Free Tier API（全域限制為每分鐘 15 次請求），這能確保評審可以自由瀏覽 UI，而不會耗盡配額！若看到閃動的「Free Tier API」badge，請針對每項資產只點擊一次 generate 按鈕。

本機設定（選用）：
 若偏好在本機執行程式碼：
 1. Clone repository 並執行 npm install
 2. 在根目錄建立 .env 檔案。你必須提供自己的 API keys 才能在本機測試：
    VITE_RENAISS_API_KEY=your_key
    VITE_RENAISS_API_SECRET=your_secret
    VITE_GEMINI_API_KEY=your_google_ai_key
 3. 執行 npm run dev，然後前往 http://localhost:5173。`,
      judgeNotes: `我們希望此專案不像典型的黑客松原型，而更像已準備好進入正式環境的企業級產品。為此，我們高度專注於三個領域：

高級設計與 UX：我們建立了一套自訂設計系統，使用 glassmorphism、動態 mesh gradient 與細緻的 micro-animation。我們的目標是打造一個視覺驚艷且反應靈敏的金融終端，證明資料密集的 Web3 工具不必看起來無聊。

穩健的錯誤處理：我們建立了完整的 UI 錯誤狀態，妥善處理 API 缺失、404 與嚴格的速率限制，例如區分 404 Not Found 與 429 Rate Limit Exceeded。若 API 失敗，使用者會看到美觀且可採取行動的 fallback 畫面，而不是損壞的版面。`,
    }),
    'flip-or-fold': Object.freeze({
      pitch: '一款 60 秒跑道交易遊戲，利用卡牌價格與市場脈絡教收藏家辨識好價。',
      description: `Flip or Fold 是一款為 TCG 收藏家與交易者打造、在瀏覽器中遊玩的跑道交易遊戲。在每局 60 秒的遊戲中，兩張附有商店價格的真實卡牌（Pokémon 和／或 One Piece）會朝你移動；你可以選擇跑道買下卡牌，或讓它通過，試著找出市場價值高於你支付價格的好交易。

它為收藏家經濟使用者打造：包括想體驗快速、有趣「flip or fold」循環的休閒玩家，以及希望透過 Card Dex（Renaiss 評級 slab、SilphCo 銷售／TV-WAP）取得真實市場脈絡的進階收藏家。遊戲內也包含可升級加成、skin 等內容的商店；選用的 BSC wallet checkout 會為已使用加密貨幣的玩家解鎖高級遊戲內加成。`,
      renaissRelation: `Flip or Fold 是一款以 Renaiss 真實世界評級收藏品資料為核心打造的收藏家經濟遊戲與研究工具。

Renaiss OS Index API

玩家可以在遊戲中使用 Renaiss 評級卡池進行遊戲（其中包含高價值 slab，可提供更多市場脈絡），而不只是使用一般 TCG 圖像。
Card Dex 使用 Renaiss 進行隨選評級搜尋與卡牌詳細資料查詢；每個結果都會連結至 index.renaissos.com。
收藏家與交易資料

遊戲損益以市場價值對比商店價格計算，教導玩家收藏家會使用的相同「成交或放棄」直覺。
Card Dex 將 Renaiss 評級價格疊加在原始市場 API（SilphCo、TCGdex）之上，讓使用者可以並排查看原始市場資料與 Renaiss index 的 slab 價值。
Renaiss 生態系遊戲體驗

60 秒跑道交易回合，讓新手能具體且有趣地體驗收藏品定價。
Meta progression（coin、shop、leaderboard）讓玩家持續參與循環，同時接觸來自 Renaiss index 的真實卡牌名稱、系列與價值。
BNB Chain／收藏家付款

選用的 BSC wallet checkout（testnet）可取得高級加成；它與 Renaiss 的 BNB Chain RWA／收藏家經濟一致，並具備伺服器端 tx 驗證。
我們不做的事情

我們不會從 Renaiss 取得私人使用者資料；只會使用公開 Index API endpoints，並在瀏覽器中以速率限制及按鈕觸發方式呼叫。
遊戲內美元金額會為遊戲性進行縮放；Card Dex 清楚區分即時 Renaiss 評級資料與模擬回合價格。
簡而言之：Flip or Fold 將 Renaiss Index 評級收藏品資料轉化為人們可以遊玩、瀏覽與學習的內容，成為通往 Renaiss 收藏家經濟的遊戲型入口。`,
      testInstructions: 'https://flip-or-fold.vercel.app/',
      judgeNotes: `遊戲內美元價格是為了樂趣而模擬，但收益是依據專案完成時的真實價格計算。
Card Dex 顯示真實市場／Renaiss 評級資料，並標示來源。
Renaiss 即時搜尋由按鈕觸發（受 API 配額限制）。
此外，我曾多次要求加入 allowlist，因為每天 10 次請求對黑客松而言實在太少，但始終沒有成功……

非財務建議——僅為黑客松 Demo。`,
    }),
    tessera: Object.freeze({
      pitch: '在即時 Renaiss Index 資料之上加入透明分類風險分數的市場情報終端。',
      description: `Tessera 是一款評級交易卡市場情報終端，基本上就是 Renaiss 收藏家經濟的精簡版 Bloomberg terminal。它顯示來自 Renaiss Index 的即時分類指數，並加入一項 Renaiss 未提供的功能：每個分類透明的 0–100 風險分數，細分為流動性、波動度、集中度與資料信心度。

它適合在買賣前檢查公平價值合理性的收藏家、監控動能與風險變化的交易者，以及留意市場健康度的社群營運者。畫面上的每個數字都附有來源、時間戳與信心度；資料不足時會顯示「資料不足」，而不是捏造數值。`,
      renaissRelation: `整個資料層都在 Renaiss Index API 上運作。我從 /v1/indices 取得 game 層級 index tile、從 /v1/indices/{game} 取得各分類詳細資料與成分，並從 /v1/health 取得存活狀態；接著在真實資料上計算可重現的 index（重新基準化為 100）與風險分數。Renaiss 提供價格、信心與新鮮度訊號，Tessera 則加入 Renaiss 尚未提供的風險視角。

公開層級每天限制 10 次請求，因此正式環境提供即時 API 的快取快照，而不是為每位訪客代理請求；這既遵守速率限制，也維持 Demo 的可靠性。評分資料會重新公開為公共 JSON API，且每項指標都附有來源資訊，讓其他 Renaiss 開發者能夠使用。adapter 是單一接線點，因此加入合作夥伴金鑰或新的 Renaiss game 時，不需要變更其他部分。`,
      testInstructions: `無須設定：開啟 https://www.tesseraindex.xyz（無須登入、無須 wallet）。點擊 Enter Terminal，開啟 Pokemon 或 One Piece，將游標停在 index chart 上，並展開 risk panel，觀察四個因素如何與主要分數對應。

公開 API 也值得查看：https://www.tesseraindex.xyz/api/overview.json；它會顯示每項指標如何包裹在來源資訊 envelope 中。

若要在本機執行：clone https://github.com/Chimdalu-Ofoegbu/Tessera，接著執行 pnpm install 與 pnpm dev（localhost:5173）。pnpm test 會執行涵蓋風險與 index engine 的 49 項 unit tests。

本機開發預設使用清楚標示的 seed fixture，因此絕不會消耗 Renaiss 速率限制；設定 USE_RENAISS=1 則會切換至即時 API。`,
      judgeNotes: '無其他補充。',
    }),
    'taste-sentinel': Object.freeze({
      pitch: '為 Renaiss 上架項目評分、偵測可疑憑證重複使用，並傳送可信提醒的市場完整性 agent。',
      description: `Taste Sentinel：服務 Renaiss 收藏家經濟的市場完整性 agent。
它每 10 分鐘掃描完整的 Renaiss 市場，使用兩個獨立 Renaiss 來源交叉驗證每個價格，並給予每個潛在交易項目一個確定性的 0–100 Integrity Score；評分結合憑證重複使用詐騙偵測、跨來源價格驗證、自建價格歷史與定價過高檢查。系統透過 Telegram bot 提供服務，包括 Claude 驅動的 Q&A、自動化交易與 watchlist 提醒，以及用於完整來源追溯的 SHA-256 hash chain 稽核紀錄。
此工具是為希望在購買前不只知道什麼便宜，更想知道什麼真正值得信任的 Renaiss 收藏家而打造。`,
      renaissRelation: `核心資料層在 Renaiss CLI 上運作：npx renaiss marketplace 驅動每 10 分鐘一次的全市場掃描（約 4,000+ 個上架項目；在發現 live sort 會回傳重疊列後，進行分頁與去重），npx renaiss packs 則提供卡包 EV 監控資料。
每個潛在交易項目都會使用從各上架項目取得的 graded-cert serial，與 Renaiss Index API (api.renaissos.com/v1/graded/{cert}) 交叉驗證；這讓雙來源驗證成為可能，可以比較 CLI 的 FMV 與 Renaiss 的獨立 index 價格，而不是只信任單一數字。
Integrity Score 完全依據 Renaiss 自有資料結構建立：來自 CLI 的 ownerAddress 與 cert serial 用於憑證重複使用詐騙偵測；askPriceInUSDT/fmvPriceInUSD 驅動價格與定價過高訊號；重複掃描相同 CLI 資料則建立 Renaiss 自身未提供的價格歷史。
在使用即時 beta 工具建置的過程中，我們發現並回報團隊三個真實問題：每個 token 的收藏品查詢損壞（所有 flags 都回傳 COLLECTIBLE_GET_FAILED）、市場 live sort 分頁會回傳重複列，以及 Index API 的憑證涵蓋缺口；最後一項促使 CTO 在活動中途確認並推出每日 10K 次請求的黑客松速率限制層級。`,
      testInstructions: `線上 dashboard（無須設定，隨時可看）：https://taste-sentinel.vercel.app/
真實掃描的快照——深色／淺色主題、Integrity Score 分項、稽核紀錄。

若要執行包含 Telegram bot 的完整 agent：

git clone https://github.com/webski101/Taste-Sentinel
cd Taste-Sentinel


設定 4 個環境變數：
CLAUDE_API_KEY=your_anthropic_key      # console.anthropic.com
TELEGRAM_BOT_TOKEN=your_bot_token      # create via @BotFather
TELEGRAM_CHAT_ID=your_chat_id          # from @userinfobot
POLL_INTERVAL_MS=600000


接著執行：
node index.js


Dashboard 會在 http://localhost:3000 運作。首次掃描約需 5 分鐘。npm dependencies 為零——只使用 Node.js 18+ built-ins，除了 Node 本身以外無須安裝任何內容。

安全且無須設定的測試模式：
node index.js --dry-run   # one scan, prints results, no writes/alerts
node index.js --verify    # verifies the audit log's hash chain and exits

完整技術說明與已知限制記錄於 README。`,
      judgeNotes: `Renaiss Index API 公開層級有速率限制，因此依目前涵蓋範圍不同，經雙來源確認的交易數量可能偏低；Integrity Score 直接針對此情況設計，使用「unverified」懲罰層級，而不是假裝具備不存在的信心。

Renaiss CLI 的每 token 收藏品查詢（npx renaiss card <tokenId>）目前在 beta 版的所有 flags 上皆無法運作，且已回報團隊；因此，本專案所有單卡詳細資料都來自市場上架資料與 Index API。`,
    }),
  }),
  ko: Object.freeze({
    'renaiss-card-dna': Object.freeze({
      pitch: 'Visual, Behavioral, Market DNA를 중심으로 구축한 AI 카드 성격 분석 및 컬렉터 매칭 엔진입니다.',
      description: 'Renaiss Card DNA는 컬렉터를 위한 AI 기반 카드 성격 분석 및 매칭 엔진입니다. 수집용 카드를 Visual DNA, Behavioral DNA, Market DNA로 분석하고, 사용자가 카드의 성격을 탐색하고 카드를 비교하며 자신의 수집 스타일을 이해할 수 있도록 돕습니다. 또한 대화형 AI 어드바이저를 통해 개인화된 추천을 제공합니다.',
      renaissRelation: 'Renaiss Card DNA는 Renaiss 컬렉터 생태계를 위해 특별히 구축되었습니다. 이 프로젝트는 수집용 카드 데이터 위에 AI 기반 탐색 계층을 더해, 사용자가 가격과 희소성 같은 원시 지표를 넘어 카드의 정체성, 스타일, 컬렉터와의 적합도를 이해하도록 돕습니다. Renaiss 관련 컬렉터 도구의 프로토타입으로 설계되었으며, 향후 버전에서는 실제 Renaiss 생태계 데이터, 거래 활동, 프로토콜 통합으로 확장할 수 있습니다.',
      testInstructions: `심사위원은 라이브 데모에서 프로젝트를 바로 테스트할 수 있습니다: https://renaiss-card-dna.vercel.app
주요 페이지:
Home: 개요 및 탐색
Analyzer: 카드 DNA와 성격 분석
Portfolio: 컬렉터 프로필과 포트폴리오 인사이트 확인
Chat: AI 어드바이저에게 카드 인사이트와 추천 질문
Repository:
https://github.com/tranhop26/renaiss-card-dna
Backend API 문서:
https://renaiss-card-dna.onrender.com/docs
현재 데모는 프로토타입 용도로 mock 카드 데이터와 합성 거래 이력을 사용하며, 앱 안에 이 사실을 명확히 표시합니다.`,
      judgeNotes: '이 프로젝트는 수집품 탐색을 더 개인적이고 직관적이며 취향 중심적으로 만드는 데 초점을 둡니다. 가격과 희소성만 보여주는 대신, 카드를 이해하고 컬렉터와 연결하는 성격 기반 프레임워크를 도입합니다. 현재 버전은 라이브 프런트엔드, 백엔드 API, AI 채팅 경험, 실제 Renaiss 생태계 통합을 향한 명확한 확장 경로를 갖춘 작동 가능한 프로토타입입니다.',
    }),
    'renaiss-intelligence': Object.freeze({
      pitch: 'Renaiss CLI와 Index API 데이터를 기반으로 구축한 가격 신뢰도, 팩 EV, 마켓플레이스 인텔리전스 계층입니다.',
      description: `Renaiss Intelligence — Price Confidence Engine + Pack EV Analyzer
Renaiss CLI와 Index API 위에 구축한 통계 인텔리전스 계층입니다. 컬렉터에게 하나의 가격 숫자만 보여주는 대신, conformal inference를 사용해 모든 PSA 등급 카드에 대해 80% 보정 신뢰 구간을 계산합니다. 또한 실제 최근 뽑기 데이터를 바탕으로 Renaiss 가챠 팩(OMEGA, RenaCrypt, Eden)의 실제 Expected Value를 계산해, 해당 팩이 정말 비용만큼 가치가 있는지 판별합니다. 실시간 마켓플레이스 판매도 추적해 과대평가 및 저평가된 리스팅을 즉시 강조합니다. 구매, 판매, 뽑기 결정을 내릴 때 마케팅용 FMV 숫자만이 아니라 데이터에 기반한 확신을 원하는 컬렉터와 팩 구매자를 위해 만들었습니다.`,
      renaissRelation: `이 프로젝트가 Renaiss Protocol과 연결되는 방식:

이 프로젝트는 해커톤 빌더를 위해 공개된 Renaiss 자체 개발자 인프라 위에 전적으로 구축되었습니다.





Renaiss CLI (npx renaiss) — OMEGA, RenaCrypt Pack, Eden Pack의 실시간 팩 상세 정보와 최근 뽑기 데이터, 그리고 실시간 마켓플레이스 리스팅(ask, FMV, 판매 활동)을 가져오는 데 사용합니다.



Renaiss Index API (api.renaissos.com) — /v1/graded/{cert}를 통한 PSA 인증번호 조회에 사용합니다. 반환되는 FMV, 신뢰도 등급, 데이터 최신성 정보를 conformal inference 엔진에 직접 입력합니다.



컬렉터／거래 데이터 — 최근 뽑기 FMV와 마켓플레이스 ask/FMV 쌍을 Renaiss에서 직접 가져와 저장하고, 과거 가격 맥락을 구축해 Price Confidence Engine과 Pack EV Analyzer를 모두 구동합니다.



팩／가챠 데이터 — npx renaiss packs {slug}에서 가져온 팩별 실제 뽑기 데이터(희소성 등급, FMV)를 Expected Value 계산에 사용합니다. 따라서 팩 판정은 가정이 아니라 실제 Renaiss 풀의 동작을 반영합니다.

요약하면 Renaiss가 원시 시장 및 팩 데이터를 제공하고, 이 도구는 그 위에 통계 인텔리전스 계층(보정 신뢰 구간, 실제 EV, 가격 차이 탐지)을 직접 더합니다. 이를 통해 Renaiss 컬렉터는 생태계를 벗어나지 않고도 더 깊고 신뢰할 수 있는 신호를 얻을 수 있습니다.`,
      testInstructions: `라이브 데모(권장, 설정 불필요)
Frontend: https://renaiss-intelligence-frontend.vercel.app
Backend API: https://renaiss-glass-insight-main.vercel.app
프런트엔드 링크에 바로 접속하면 됩니다. 로그인이나 계정은 필요하지 않습니다.
다음을 시도해 보세요:

PSA 인증번호를 검색합니다(예: PSA151238633 또는 UI에 표시된 추천 인증번호 중 하나). 80% 보정 구간이 적용된 Price Confidence 엔진을 확인할 수 있습니다.
Pack Expected Values로 스크롤해 OMEGA, RenaCrypt Pack, Eden Pack의 실시간 EV 계산을 확인합니다.
Recent Sales Activity로 스크롤해 가격 차이 판정이 표시된 실시간 마켓플레이스 리스팅을 확인합니다.

참고: 페이지 로드 시 데이터를 실시간으로 가져오므로, 처음 방문할 때 페이지가 채워질 때까지 몇 초 기다려 주세요.

옵션 1 — 라이브 데모(권장, 설정 불필요)
Frontend: https://renaiss-intelligence-frontend.vercel.app
Backend API: https://renaiss-glass-insight-main.vercel.app
프런트엔드 링크에 바로 접속하면 됩니다. 로그인이나 계정은 필요하지 않습니다.
다음을 시도해 보세요:

PSA 인증번호를 검색합니다(예: PSA151238633 또는 UI에 표시된 추천 인증번호 중 하나). 80% 보정 구간이 적용된 Price Confidence 엔진을 확인할 수 있습니다.
Pack Expected Values로 스크롤해 OMEGA, RenaCrypt Pack, Eden Pack의 실시간 EV 계산을 확인합니다.
Recent Sales Activity로 스크롤해 가격 차이 판정이 표시된 실시간 마켓플레이스 리스팅을 확인합니다.

참고: 페이지 로드 시 데이터를 실시간으로 가져오므로, 처음 방문할 때 페이지가 채워질 때까지 몇 초 기다려 주세요.

옵션 2 — Backend API 직접 테스트
bashcurl https://renaiss-glass-insight-main.vercel.app/health
curl https://renaiss-glass-insight-main.vercel.app/search?cert=PSA151238633
curl https://renaiss-glass-insight-main.vercel.app/pack-ev?pack=omega
curl https://renaiss-glass-insight-main.vercel.app/recent-sales

옵션 3 — 로컬 설정(코드 리뷰용)
전체 설정 안내, 환경 변수, 아키텍처는 GitHub repository README에 문서화되어 있습니다:
https://github.com/samixrd/renaiss-intelligence

심사위원을 위한 중요 안내: 이 프로젝트는 현재 beta 단계인 Renaiss CLI와 Index API를 사용합니다. Renaiss의 안내에 따라 일부 데이터는 불완전하거나 누락되거나 지연되거나 아직 업데이트 중일 수 있습니다. 모든 출력은 실험적 참고 자료이며 최종 검증된 시장 사실이 아닙니다. 앱 안의 상시 배너에서 이를 명확히 고지합니다.`,
      judgeNotes: `RenaCrypt Pack에 표시되는 0.96x EV 비율은 각본에 맞춘 데모 숫자가 아니라 데이터에서 실제로 도출된 결과입니다. Renaiss에서 실시간으로 가져온 실제 최근 뽑기 데이터로 Expected Value를 계산하는 과정에서 자연스럽게 나타났으며, 바로 이런 신호를 드러내는 것이 이 도구의 목적입니다.
특정 카드의 과거 가격 데이터가 아직 제한적인 경우(API가 beta이므로 예상되는 상황), 도구는 아직 존재하지 않는 완전한 통계적 신뢰도를 가장하지 않고 명확히 표시된 bootstrap 추정값으로 투명하게 전환합니다. Renaiss에 더 많은 거래 이력이 축적되면 conformal prediction 엔진은 자동으로 더 좁고 신뢰할 수 있는 구간을 생성합니다. 이 아키텍처는 생태계 데이터와 함께 개선되도록 설계되었으며 재구축이 필요하지 않습니다.
표시되는 모든 것—FMV, 뽑기 결과, 마켓플레이스 리스팅—은 Renaiss 자체 CLI와 Index API에서 가져온 실제 데이터입니다. 최종 제품에는 mock, seed, placeholder 숫자가 전혀 없습니다.
이 프로젝트는 이번 해커톤 스프린트를 위해 며칠 동안 1인이 만들었으며, 단지 보기 좋은 데모가 아니라 Renaiss 컬렉터에게 실제로 유용한 것을 출시하는 데 집중했습니다.

Index API 접근 권한을 제공해 주셔서 감사합니다. 덕분에 또 하나의 단순 가격 추적기가 아니라 통계적으로 정직한 도구를 만들 수 있었습니다.`,
    }),
    tcgclaw: Object.freeze({
      pitch: 'TCG 플레이어가 카드 정보, 가치, 시장 전망을 빠르게 이해하도록 도와 초보자와 숙련 컬렉터 사이의 인식 격차를 줄입니다.',
      description: '많은 TCG 플레이어는 자신이 뽑은 카드에 대해 사실상 아무것도 모릅니다. 따라서 카드를 더 빠르게 이해할 수 있도록 돕는 도구가 필요합니다. Renaiss에서 시장에 있는 각 카드의 가치와 전망을 빨리 파악하고 싶은 초보자에게 이 도구는 초보자와 숙련자 사이의 카드 지식 격차를 줄여 줍니다.',
      renaissRelation: 'CTO와 회의하는 과정에서 한 가지 통합 방향을 찾았습니다. 이 도구를 각 카드 페이지에 삽입하면, 사용자가 카드를 클릭했을 때 해당 카드에 대한 종합적인 소개를 확인할 수 있습니다.',
      testInstructions: '제가 직접 시연할 수 있습니다.',
      judgeNotes: '없음',
    }),
    'barzakh-ai': Object.freeze({
      pitch: 'Renaiss 마켓플레이스 검색, FMV 분석, 가격 알림, 검증 가능한 가챠를 위한 대화형 Web3 agent입니다.',
      description: `Barzakh AI는 Renaiss Protocol 수집용 카드 경제(BNB Chain)를 통합한 지능형 Web3 agent 플랫폼입니다. 이 agent는 실시간 indexer와 마켓플레이스 API를 활용해 실물 자산이 뒷받침되고 보관소에 보관된 트레이딩 카드(Pokémon 및 One Piece)를 검색하고 분석합니다. 리스팅 가격을 Fair Market Value (FMV)와 자동으로 비교해 저평가 자산을 식별하고, 검증된 보관소 수탁 위치를 추적하며, 목표 가격 watchlist를 모니터링하고, 100% 암호학적 투명성을 갖춘 영지식 증명 기반의 검증 가능한 가챠 뽑기를 조회합니다.

누구를 위한 것인가요? 이 통합은 데이터에 기반한 확신을 가지고 고가치 등급 카드 생태계를 탐색하려는 컬렉터, 게이머, 2차 시장 트레이더를 위해 만들어졌습니다. 즉각적이고 검증 가능한 가치 평가 정보, 자동 가격 알림, 투명한 온체인 뽑기 도구를 제공하여 시장 추측을 줄입니다.`,
      renaissRelation: `Barzakh AI는 Renaiss Protocol의 데이터 계층과 API 위에 직접 구축한 스마트한 대화형 wrapper이자 자동화 엔진입니다. 다음 통합을 통해 컬렉터 및 거래 경험을 향상합니다.

1. 핵심 API 통합(Index 및 Marketplace API)

• Renaiss Index API (api.renaissos.com): Barzakh AI는 Index API를 조회해 공개 참고 가격 데이터를 해석하고, 검증된 slab 스캔(PSA/CGC/BGS)을 가져오며, 과거 가격 차트를 불러오고, Fair Market Value (FMV)를 계산합니다.
• Renaiss Marketplace API (api.renaiss.xyz): agent가 활성 리스팅 token ID, USDT ask 가격, 보관소 위치, 온체인 소유권 세부 정보 등 실시간 거래 데이터를 가져옵니다.

2. 지능형 컬렉터 및 거래 데이터 병합

• 자동 가치 평가 및 딜 탐색기: Barzakh AI는 두 API의 데이터를 병합해 카드의 현재 리스팅 가격을 과거 FMV index와 자동 비교합니다. 프리미엄／할인 비율을 동적으로 계산해 컬렉터가 저평가된 ‘숨은 보석’을 찾도록 돕습니다.
• 리스팅／미리스팅 필터링: agent는 index에만 존재하는 레코드를 걸러내어 카드가 실제 마켓플레이스에 존재하도록 보장합니다. 리스팅된 카드는 실시간 가격을 표시하고, 현재 판매되지 않는 보관 자산은 FMV를 가치 평가 참고값으로 사용하면서 ‘Unlisted’ 또는 ‘Vaulted (Unlisted)’로 명확히 표시합니다.

3. 검증 가능한 가챠 및 게임 경험

• 영지식 Booster Packs: Barzakh AI는 Eden, OMEGA, RenaCrypt 풀과 같은 Renaiss의 영구 가챠 팩을 통합합니다.
• Expected Value (EV) 분석: 사용자는 agent에게 팩의 Expected Value (EV)를 가져오고, 최상위 카드 드롭률을 계산하고, 최근 뽑기 기록을 검토하며, 프로토콜이 온체인 영지식 Merkle Proof를 사용해 뽑기의 공정성을 암호학적으로 검증하는 방식을 설명해 달라고 요청할 수 있습니다.`,
      testInstructions: `프로젝트 열기: https://chat.barzakh.tech

테스트 프롬프트 및 사용 사례
채팅 인터페이스를 연 뒤 다음 프롬프트를 복사해 붙여 넣으면 Renaiss Protocol 도구와 상호작용할 수 있습니다.

• 마켓플레이스 검색 및 가격:

1/ ‘Renaiss 마켓플레이스에서 등급이 최소 9인 Luffy 카드를 검색해 줘.’
2/ ‘Roronoa Zoro 카드를 찾아 줘.’
3/ ‘저평가된 Pokemon 카드를 찾아 줘.’

• Booster Packs 및 가챠 분석:

4/ ‘현재 Renaiss에서 이용할 수 있는 가챠 카드 팩은 무엇이야?’
5/ ‘Eden 팩의 세부 정보, Expected Value, 최근 뽑기 결과를 보여 줘.’`,
      judgeNotes: `심사위원을 위한 핵심 사항

• 실물 검증을 통한 제로 환각: Barzakh AI가 제공하는 모든 카드 데이터, 등급, 가격은 기관급 보관소에 1:1로 보관된 실제 실물 트레이딩 카드에 대응합니다. agent는 데이터의 진위를 증명할 수 있도록 마켓플레이스로 바로 이동하는 링크를 제공합니다.

• 검증 가능한 공정성(영지식): 사용자가 가챠 Booster Packs에 대해 질문하면 agent는 온체인 영지식 Merkle Proof를 설명하고 링크를 제공합니다. 이를 통해 모든 카드 뽑기가 암호학적으로 공정하고 투명하며 블록체인에서 감사 가능함을 보장합니다.

• 높은 프로덕션 가동률(동적 키 순환): 자동 키 순환 시스템을 구현했습니다. 키가 rate limit에 도달하면(429 또는 ‘rate_limited’ 응답), agent는 백그라운드에서 다음에 설정된 파트너 자격 증명으로 동적으로 전환하고 요청을 원활하게 재시도합니다.

• 지능형 의도 라우팅: 중앙 의도 분류기를 업데이트했습니다. 사용자는 설정을 수동으로 구성하거나 도구를 선택할 필요가 없습니다. ‘Eden 팩 가격이 얼마야?’ 같은 프롬프트는 자동으로 분류되어 기본 웹 검색 대신 Renaiss API로 바로 전달됩니다.`,
    }),
    'renaiss-lens': Object.freeze({
      pitch: '감정, 시장 전망, 거래 전략, slab 사진 가치 평가, 포트폴리오 분석을 제공하는 AI 컬렉터 agent입니다.',
      description: 'Renaiss Lens는 Renaiss 생태계를 위해 구축한 AI 기반 컬렉터 인텔리전스 agent입니다. 컬렉터, 트레이더, 신규 사용자에게 수집품 감정, 시장 추세 예측, 거래 전략 수립, Renaiss 생태계 지식 검색, Renaiss OS Index API를 통한 실제 온체인 데이터 조회를 하나의 대화형 인터페이스로 제공합니다. 사용자가 자연어로 입력하면 agent가 쿼리를 적합한 인텔리전스 계층으로 라우팅하여 구조화된 감정 카드, 시장 전망 보고서, 거래 플레이북, 인증번호로 검증된 카드 데이터, 포트폴리오 건전성 분석을 반환합니다. 사진에서 모든 등급 카드를 식별하고 Renaiss index 가격을 가져오는 Slab Photo Valuator, 실제 컬렉터 경제 신호를 보여 주는 실시간 Market Feed, AI 포트폴리오 분석 기능을 갖춘 Collection Tracker도 포함합니다.',
      renaissRelation: `Renaiss Lens는 Renaiss OS Index API와 직접 통합됩니다. 모든 RENAISS 의도 호출은 api.renaissos.com의 실시간 index를 조회합니다. 사용자는 PSA, BGS, CGC 인증번호를 붙여 넣어 실제 카드 식별 정보, index 가격, 신뢰도 등급, Renaiss Index 페이지로 가는 직접 링크를 받을 수 있습니다.

Slab Photo Valuator는 /v1/graded/by-image endpoint를 호출합니다. 사용자가 slab 사진을 업로드하면 Renaiss AI가 인증번호 없이 카드를 식별하고 index 가격을 반환합니다.

각 감정 카드에는 컬렉터를 Renaiss 플랫폼으로 바로 보내는 List this on Renaiss CTA가 포함됩니다.

SEARCH 의도는 보관소 수탁, Merkle proof 출처, 영지식 검증, BNB Chain 소유권 이전을 다루는 Renaiss Protocol 지식으로 학습되었습니다.

Market Feed에는 실시간 생태계 뉴스를 보여 주는 전용 RENAISS 카테고리가 있습니다.

Collection Tracker는 컬렉터가 Renaiss에서 토큰화할 수 있는 자산의 실물 가치를 이해하도록 돕습니다. 모든 Renaiss OS Index 데이터는 해당 출처 표기 요구 사항에 따라 명확히 표시됩니다.`,
      testInstructions: `설정이 필요하지 않습니다. 브라우저에서 https://renaiss-lens.vercel.app에 바로 접속하세요.

Chat 탭 — 6개 의도를 모두 테스트합니다.

1. APPRAISE — ‘내 PSA 10 Charizard Base Set 1st Edition을 감정해 줘’ 입력
2. PREDICT — ‘2027년 전 Naruto TCG의 시장 전망은 어때?’ 입력
3. TRADE — ‘이번 분기 등급 Pokemon holo 카드 플리핑 전략을 알려 줘’ 입력
4. SEARCH — ‘Renaiss 보관소 수탁은 어떻게 작동해?’ 입력
5. RENAISS — ‘Renaiss에서 PSA76729777을 확인해 줘’ 입력 — 실제 보관 카드의 실시간 Renaiss OS Index 데이터를 반환합니다.
6. CHAT — ‘수집품을 희귀하게 만드는 요소는 무엇이야?’ 입력

Slab Scan 탭 — 정면에서 촬영한 PSA/BGS/CGC slab 사진을 업로드하면 Renaiss AI가 카드를 식별하고 index 가격을 반환합니다.

My Collection 탭 — 구매 가격과 예상 가치가 포함된 항목을 추가하고 Get AI Portfolio Analysis를 클릭합니다.

Market Feed 탭 — Refresh를 클릭하고 RENAISS 카테고리로 필터링해 생태계 전용 신호를 확인합니다.

참고: Renaiss OS Index는 beta 단계이므로 일부 카드는 아직 가격 데이터가 없을 수 있습니다. RENAISS 의도와 Slab Scan은 출처 표기와 함께 beta임을 명확히 표시합니다.`,
      judgeNotes: `Renaiss Lens는 해커톤 기간 중 7일 이내에 1인이 개발했으며, 빌더 도구가 해커톤 중간에 공개된 뒤 진행한 전체 Renaiss OS Index API 통합도 포함합니다.

핵심 통찰은 대부분의 컬렉터 도구가 단일 목적에 머문다는 점입니다. Renaiss Lens는 감정, 예측, 거래 전략, 생태계 검색, 인증번호 조회, 이미지 가치 평가, 포트폴리오 추적, 시장 신호를 하나의 대화형 agent로 통합합니다. 이는 Renaiss 컬렉터 경제에 필요한 인텔리전스 계층입니다.

모든 AI 응답은 Claude API를 통한 실시간 웹 검색 데이터로 보강되어, 가치 평가와 시장 신호가 실제 최신 데이터에 기반하도록 합니다. Renaiss OS Index 통합은 한 단계 더 나아가 인증번호 조회와 slab 사진 식별 시 Renaiss 인프라에서 검증된 온체인 데이터를 직접 반환합니다.

제품은 Renaiss와 함께 성장하도록 구축되었습니다. 프로토콜이 API 범위를 확장하면 Renaiss Lens는 보관소 보유 자산, 실시간 floor price, wallet 수준 포트폴리오 데이터에 직접 연결해 더욱 정밀해질 수 있습니다.

Stack: Next.js 14, Tailwind CSS, Claude API(claude-sonnet-4-6 및 웹 검색), Renaiss OS Index API, Serper API, Vercel.

데이터 출처 표기: 모든 Renaiss OS Index 데이터는 Renaiss 출처 표기 요구 사항에 따라 명확히 표시합니다. AI 출력은 추정값임을 명확히 표시합니다. 모든 Renaiss 데이터 응답에 beta 제한 사항을 공개합니다.`,
    }),
    'liquidity-quest': Object.freeze({
      pitch: 'Renaiss 마켓플레이스 scanner 기록을 실행 가능한 정찰 경로로 바꾸는 퀘스트형 컬렉터 인텔리전스 도구입니다.',
      description: 'Liquidity Quest는 실제 Renaiss 마켓플레이스 scanner 기록을 저평가된 리스팅, 오퍼 기회, 가격 경고, 연속 페어 경로 등의 정찰 퀘스트로 바꾸는 컬렉터 인텔리전스 도구입니다.',
      renaissRelation: '이 프로젝트는 실제 마켓플레이스 scanner 데이터를 사용하고 이를 출처가 뒷받침된 흐름으로 전환함으로써 Renaiss 컬렉터 경제 위에 직접 구축됩니다. 이를 통해 탐색과 정보에 기반한 컬렉터 활동을 개선할 수 있습니다.',
      testInstructions: 'https://liquidity-quest.vercel.app/을 열고 start scouting을 클릭한 뒤 퀘스트를 생성하세요. 필터／검색을 사용하고 출처 카드를 살펴보며 각 항목이 FMV, ask price 등 실제 scanner 필드와 연결되어 있는지 확인하세요.',
      judgeNotes: '해당 없음',
    }),
    'fairdraw-suite': Object.freeze({
      pitch: '실시간 Renaiss 데이터로 가챠 팩 건전성을 확인하고, EV를 비교하며, 최근 뽑기 결과를 검증하는 투명성 도구 모음입니다.',
      description: 'FairDraw는 Renaiss 가챠 생태계를 위한 투명성 및 의사결정 지원 도구입니다. 실시간 Renaiss 데이터를 사용해 컬렉터, 스트리머, 빌더가 팩을 열기 전에 품질을 이해하고, 개봉 후에는 뽑기 결과를 검증할 수 있도록 돕습니다. 제품은 팩 건전성과 EV 인사이트를 제공하는 PoolPulse, 뽑기 검증을 위한 PullProof, 팩을 나란히 분석하는 Compare의 세 계층을 결합합니다.',
      renaissRelation: `FairDraw는 Renaiss 생태계 위에 직접 구축되었으며 공식 Renaiss 개발자 도구를 기반으로 사용합니다. Renaiss CLI를 통합해 실시간 가챠 팩 데이터, 최근 뽑기 활동, 카드 조회 데이터를 가져오며, 가치 평가 관련 워크플로에서는 Renaiss OS Index API와 함께 작동하도록 구성되어 있습니다.

구체적으로 이 프로젝트는 다음 방식으로 Renaiss Protocol과 연결됩니다.

Renaiss CLI에서 OMEGA, Eden Pack, RenaCrypt Pack의 실시간 가챠 팩 정보를 읽습니다.
최근 개봉된 팩 활동을 사용해 컬렉터를 위한 등급 분포, EV 분산, 건전성 지표를 도출합니다.
관련 없는 외부 출처가 아니라 Renaiss 가챠 활동 데이터로 뽑기 일관성을 검증합니다.
API 계층과 Swagger 문서를 제공하므로 Renaiss 생태계 안의 bot, dashboard, 기타 커뮤니티 도구로 확장할 수 있습니다.
목표는 Renaiss를 대체하는 것이 아니라 실제 사용자가 Renaiss의 투명성과 수집품 데이터를 더 쉽게 활용하도록 만드는 것입니다.`,
      testInstructions: `이 프로젝트는 React 프런트엔드와 Node.js/Express 백엔드로 구성된 full-stack 앱입니다.

설정
npm run install:all
npm run dev
로컬 URL
App: http://localhost:5173
API: http://localhost:3001
Swagger Docs: http://localhost:3001/api/docs
심사위원이 테스트할 수 있는 항목
홈페이지를 열고 각 모듈을 탐색합니다.
PoolPulse로 이동해 다음 팩의 실시간 건전성 데이터를 확인합니다.
OMEGA
Eden Pack
RenaCrypt Pack
Compare로 이동해 현재 EV 분산과 건전성 점수가 가장 강한 팩을 확인합니다.
PullProof로 이동해 두 가지 방식으로 검증을 테스트합니다.
PoolPulse의 최근 뽑기 결과를 클릭해 바로 검증
collectible token ID를 PullProof에 수동으로 붙여 넣기
중요 안내
현재 앱의 뽑기 검증은 collectible token ID를 사용할 때 가장 잘 작동합니다.
현행 Renaiss CLI가 완전한 tx-hash 검증 흐름을 제공하지 않으므로 transaction hash 기반 검증은 아직 완전히 지원되지 않습니다.
데이터가 전체 재고 상태가 아니라 최근 뽑기 구간에서 샘플링된 경우, 앱은 UI에서 제한 사항／면책 조항을 명확히 표시합니다.
환경／도구 안내
현재 Renaiss CLI package는 Node.js 22+를 권장합니다. 프로젝트는 개발 환경에서 테스트되었지만, 심사위원은 Node 22 이상에서 최상의 호환성을 얻을 수 있습니다.`,
      judgeNotes: `FairDraw는 단순한 데모 dashboard가 아니라 실제 컬렉터 도구로 설계되었습니다. Renaiss 생태계 안에서의 실용성에 의도적으로 집중했습니다.

사용자가 지금 더 강해 보이는 팩을 판단하도록 지원
최근 뽑기 동작을 이해하도록 지원
뽑기 결과를 검증하고 설명하는 방법 제공
다른 빌더가 재사용할 수 있는 문서화된 API 계층 공개
또한 프로젝트의 가정을 의도적으로 투명하게 공개했습니다.

EV와 FMV 값은 실험적 참고 자료로 취급
등급 구성은 최근 뽑기 샘플에서 도출
앱에서 실시간 CLI 기반 데이터와 모든 fallback 동작을 명확히 구분
심사에 도움이 된다면 FairDraw를 Renaiss Protocol을 위한 가챠 인텔리전스 및 투명성 계층으로 이해할 수 있습니다.`,
    }),
    'renaiss-intelligence-agent': Object.freeze({
      pitch: '실시간 Renaiss 카드 데이터와 LLM 생성 시장 분석을 결합한 AI 금융 터미널입니다.',
      description: 'Renaiss Intelligence Agent는 실시간 데이터와 LLM 기반 시장 분석을 사용해 컬렉터와 투자자가 실물 트레이딩 카드의 Fair Market Value를 판단하도록 돕는 AI 금융 터미널입니다.',
      renaissRelation: `Renaiss Intelligence Agent는 Renaiss Index API 위에 전적으로 구축되었으며, 이를 플랫폼의 핵심 데이터 기반으로 사용합니다. 터미널을 구동하기 위해 여러 API 기능을 깊이 통합했습니다.
 1. Index API 및 검색: /v1/search endpoint를 사용해 사용자가 Pokémon, One Piece 카드와 같은 특정 실물 자산을 Renaiss 생태계에서 실시간으로 동적 조회할 수 있습니다.
 2. 컬렉터 및 거래 데이터: 자산을 선택하면 앱이 /v1/cards/... endpoints를 호출해 포괄적인 실시간 시장 데이터를 가져옵니다. 자산의 구조 metadata, 최근 거래 이력(trades), 30일 과거 가격 추세(fmvSeries)를 추출합니다.
 3. AI 시너지: 원시 Renaiss 데이터를 표시하는 데 그치지 않고, Index API의 거래 및 가격 데이터를 LLM (Gemini)에 직접 입력합니다. AI는 Renaiss protocol의 가격 delta와 관측 횟수를 분석해 고유하고 사람이 읽기 쉬운 시장 인사이트를 만들고, 컬렉터를 위한 맞춤형 ‘Conviction Rating’과 ‘Buy Window’를 생성합니다.
 Renaiss Index API를 활용함으로써 원시 블록체인 및 시장 데이터를 수집품 커뮤니티를 위한 완성도 높은 AI 기반 금융 도구로 전환할 수 있었습니다.`,
      testInstructions: `라이브 배포 테스트(권장):
 로컬에서 아무것도 설치하거나 실행할 필요가 없습니다! 프로젝트는 완전히 배포되어 라이브로 운영 중입니다.
 1. 라이브 URL 방문: https://renaiss-agent.vercel.app/
 2. 홈페이지에는 Renaiss Index API에서 직접 가져온 실시간 ‘Featured Assets’ 그리드가 표시됩니다. 아무 카드나 클릭하세요(예: ‘Luffy & Ace’).
 3. 또는 검색창에서 ‘Charizard’나 ‘Pikachu’ 같은 캐릭터를 검색하고 dropdown에서 결과를 선택합니다.
 4. 자산 dashboard에서 실시간 Trade History 및 Fair Market Value 차트를 살펴봅니다.
 5. AI 테스트: 오른쪽의 ‘Ready for AI Analysis’ 패널을 확인하고 ‘Generate Insight’ 버튼을 클릭합니다. 앱이 자산의 실시간 거래 데이터를 Gemini로 보내 맞춤형 시장 평가를 생성합니다.

 AI 테스트 안내: AI를 자동 실행하지 않고 의도적으로 수동 ‘Generate Insight’ 버튼 뒤에 배치했습니다. Gemini Free Tier API를 사용하며 전 세계적으로 분당 15회 요청으로 제한되므로, 심사위원이 할당량을 소진하지 않고 UI를 자유롭게 탐색할 수 있도록 하기 위함입니다. ‘Free Tier API’ badge가 깜박이면 자산당 generate 버튼을 한 번만 클릭해 주세요.

로컬 설정(선택 사항):
 코드를 로컬에서 실행하려면 다음을 따르세요.
 1. repository를 clone하고 npm install 실행
 2. 루트에 .env 파일 생성. 로컬 테스트에는 본인의 API keys가 필요합니다.
    VITE_RENAISS_API_KEY=your_key
    VITE_RENAISS_API_SECRET=your_secret
    VITE_GEMINI_API_KEY=your_google_ai_key
 3. npm run dev를 실행하고 http://localhost:5173으로 이동합니다.`,
      judgeNotes: `이 프로젝트가 일반적인 해커톤 프로토타입보다 프로덕션 준비가 된 엔터프라이즈급 제품처럼 느껴지기를 원했습니다. 이를 위해 세 가지 영역에 집중했습니다.

프리미엄 디자인 및 UX: glassmorphism, 동적 mesh gradient, 섬세한 micro-animation을 활용하는 맞춤형 디자인 시스템을 구축했습니다. 시각적으로 뛰어나고 반응성이 높은 금융 터미널을 만들어, 데이터가 많은 Web3 도구도 지루해 보일 필요가 없음을 입증하는 것이 목표였습니다.

견고한 오류 처리: 누락된 API, 404, 엄격한 rate limit를 우아하게 처리하는 포괄적인 UI 오류 상태를 구축했습니다(예: 404 Not Found와 429 Rate Limit Exceeded 구분). API가 실패하면 깨진 레이아웃 대신 보기 좋고 조치 가능한 fallback 화면을 사용자에게 제공합니다.`,
    }),
    'flip-or-fold': Object.freeze({
      pitch: '카드 가격과 시장 맥락을 활용해 컬렉터에게 좋은 거래를 찾는 법을 가르치는 60초 lane-trading 게임입니다.',
      description: `Flip or Fold는 TCG 컬렉터와 트레이더를 위한 브라우저 기반 lane-trading 게임입니다. 60초 동안 실제 카드 두 장(Pokémon 및／또는 One Piece)이 상점 가격과 함께 다가옵니다. 플레이어는 lane을 선택해 구매하거나 그냥 지나가게 하면서, 지불 가격보다 시장 가치가 높은 거래를 찾아야 합니다.

컬렉터 경제 사용자를 위해 만들었습니다. 빠르고 재미있는 ‘flip or fold’ 루프를 원하는 캐주얼 플레이어와 Card Dex(Renaiss 등급 slab, SilphCo 판매／TV-WAP)를 통해 실제 시장 맥락을 원하는 진지한 컬렉터가 대상입니다. 업그레이드 가능한 보너스, skin 등을 갖춘 게임 내 상점도 포함합니다. 선택형 BSC wallet checkout은 이미 암호화폐를 사용하는 플레이어에게 프리미엄 게임 내 보너스를 해제합니다.`,
      renaissRelation: `Flip or Fold는 Renaiss의 실물 등급 수집품 데이터를 중심으로 구축한 컬렉터 경제 게임 겸 연구 도구입니다.

Renaiss OS Index API

플레이어는 일반적인 TCG 그림뿐 아니라, 더 많은 시장 맥락을 제공하는 고가치 slab이 포함된 Renaiss 등급 카드 풀로 게임을 플레이할 수 있습니다.
Card Dex는 Renaiss를 사용해 필요할 때 등급 검색과 카드 상세 정보를 제공하며, 모든 결과는 index.renaissos.com으로 연결됩니다.
컬렉터 및 거래 데이터

게임 손익은 시장 가치와 상점 가격의 비교를 기반으로 하며, 컬렉터가 사용하는 것과 같은 ‘거래 또는 패스’ 감각을 가르칩니다.
Card Dex는 원시 시장 API(SilphCo, TCGdex) 위에 Renaiss 등급 가격을 더해, 사용자가 원시 시장 데이터와 Renaiss index 기반 slab 가치를 나란히 볼 수 있게 합니다.
Renaiss 생태계를 위한 게임 경험

60초 lane-trading 플레이는 수집품 가격을 신규 사용자에게 구체적이고 재미있게 전달합니다.
Meta progression(coin, shop, leaderboard)은 플레이어가 반복 루프에 머물게 하면서 Renaiss index의 실제 카드 이름, 세트, 가치를 접하게 합니다.
BNB Chain／컬렉터 결제

프리미엄 보너스를 위한 선택형 BSC wallet checkout(testnet)을 제공합니다. 서버 측 tx 검증을 갖추고 있으며 Renaiss의 BNB Chain RWA／컬렉터 경제와 일치합니다.
제공하지 않는 것

Renaiss의 비공개 사용자 데이터는 수집하지 않습니다. 공개 Index API endpoints만 사용하며 브라우저에서 rate limit 및 버튼 트리거 방식으로 호출합니다.
게임 내 달러 금액은 플레이를 위해 조정됩니다. Card Dex는 실시간 Renaiss 등급 데이터와 시뮬레이션된 플레이 가격을 명확히 구분합니다.
요약하면 Flip or Fold는 Renaiss Index의 등급 수집품 데이터를 사람들이 플레이하고 탐색하고 학습할 수 있는 형태로 바꾸며, Renaiss 컬렉터 경제로 향하는 게임형 진입로가 됩니다.`,
      testInstructions: 'https://flip-or-fold.vercel.app/',
      judgeNotes: `게임 내 달러 가격은 재미를 위해 시뮬레이션되지만, 수익은 프로젝트 제작 당시의 실제 가격을 기반으로 합니다.
Card Dex는 출처가 표시된 실제 시장／Renaiss 등급 데이터를 보여 줍니다.
Renaiss 실시간 검색은 버튼으로 트리거됩니다(API 할당량).
또한 하루 10회 요청은 해커톤에 매우 부족해 allowlist 접근을 여러 번 요청했지만 받아들여지지 않았습니다…

금융 조언이 아니며 해커톤 데모 전용입니다.`,
    }),
    tessera: Object.freeze({
      pitch: '실시간 Renaiss Index 데이터에 투명한 카테고리 위험 점수를 더하는 시장 인텔리전스 터미널입니다.',
      description: `Tessera는 등급 트레이딩 카드를 위한 시장 인텔리전스 터미널로, Renaiss 컬렉터 경제를 위한 경량 Bloomberg terminal과 같습니다. Renaiss Index의 실시간 카테고리 index와 함께 Renaiss가 제공하지 않는 한 가지 기능을 더합니다. 바로 카테고리별 투명한 0–100 위험 점수이며, 유동성, 변동성, 집중도, 데이터 신뢰도로 세분화됩니다.

구매나 판매 전에 Fair Value가 타당한지 점검하는 컬렉터, 모멘텀과 위험 변화를 관찰하는 트레이더, 시장 건전성을 살피는 커뮤니티 운영자를 위한 도구입니다. 화면의 모든 숫자에는 출처, timestamp, 신뢰도가 표시되며, 데이터가 부족한 경우 지어낸 값 대신 ‘데이터 부족’을 표시합니다.`,
      renaissRelation: `전체 데이터 계층은 Renaiss Index API에서 작동합니다. /v1/indices에서 game 수준 index tile을, /v1/indices/{game}에서 카테고리별 상세 정보와 구성 요소를, /v1/health에서 liveness를 가져옵니다. 그런 다음 실제 데이터 위에서 재현 가능한 index(100으로 rebasing)와 위험 점수를 계산합니다. Renaiss가 가격, 신뢰도, 최신성 신호를 제공하고, Tessera는 Renaiss에 없는 위험 관점을 더합니다.

공개 tier는 하루 10회 요청으로 제한되므로, 프로덕션에서는 방문자마다 proxy 요청을 보내는 대신 실시간 API의 cache snapshot을 제공합니다. 이를 통해 rate limit를 준수하고 데모 신뢰성을 유지합니다. 점수 데이터는 모든 지표에 provenance가 포함된 공개 JSON API로 다시 제공되어 다른 Renaiss 빌더가 사용할 수 있습니다. adapter가 단일 연결 지점이므로 partner key나 새로운 Renaiss game을 추가할 때 다른 부분을 변경할 필요가 없습니다.`,
      testInstructions: `설정 불필요: https://www.tesseraindex.xyz을 여세요(로그인 및 wallet 불필요). Enter Terminal을 클릭하고 Pokemon 또는 One Piece를 연 뒤 index chart에 마우스를 올리고 risk panel을 펼쳐 네 가지 요소가 최종 점수와 어떻게 일치하는지 확인합니다.

공개 API도 확인할 가치가 있습니다: https://www.tesseraindex.xyz/api/overview.json에서 모든 지표가 provenance envelope로 감싸진 모습을 볼 수 있습니다.

로컬 실행: https://github.com/Chimdalu-Ofoegbu/Tessera를 clone한 다음 pnpm install과 pnpm dev를 실행합니다(localhost:5173). pnpm test는 위험 및 index engine을 다루는 unit test 49개를 실행합니다.

로컬 개발은 Renaiss rate limit를 소모하지 않도록 기본적으로 명확히 표시된 seed fixture를 사용하며, USE_RENAISS=1을 설정하면 실시간 API로 전환됩니다.`,
      judgeNotes: '추가 참고 사항은 없습니다.',
    }),
    'taste-sentinel': Object.freeze({
      pitch: 'Renaiss 리스팅을 채점하고, 의심스러운 인증번호 재사용을 감지하며, 신뢰할 수 있는 알림을 전달하는 시장 무결성 agent입니다.',
      description: `Taste Sentinel은 Renaiss 컬렉터 경제를 위한 시장 무결성 agent입니다.
전체 Renaiss 마켓플레이스를 10분마다 스캔하고, 서로 독립적인 두 Renaiss 출처로 모든 가격을 교차 검증합니다. 각 거래 후보에는 인증번호 재사용 사기 탐지, 출처 간 가격 검증, 자체 구축한 가격 이력, 과대평가 검사를 결합한 결정론적 0–100 Integrity Score를 부여합니다. Claude 기반 Q&A, 자동 거래 및 watchlist 알림, 완전한 provenance를 위한 SHA-256 hash-chain 감사 로그를 Telegram bot으로 제공합니다.
단순히 무엇이 싼지뿐 아니라 구매 전에 무엇이 실제로 신뢰할 만한지 알고 싶은 Renaiss 컬렉터를 위해 만들었습니다.`,
      renaissRelation: `핵심 데이터 계층은 Renaiss CLI에서 작동합니다. npx renaiss marketplace가 10분마다 전체 시장 스캔을 수행하고(약 4,000+ 리스팅, live sort에서 중복 행이 반환되는 것을 발견한 뒤 pagination 및 deduplication 적용), npx renaiss packs가 팩 EV 모니터링에 데이터를 제공합니다.
각 거래 후보는 리스팅에서 가져온 graded-cert serial을 사용해 Renaiss Index API (api.renaissos.com/v1/graded/{cert})와 교차 검증됩니다. 이를 통해 단일 숫자를 신뢰하는 대신 CLI의 FMV와 Renaiss의 독립 index 가격을 비교하는 이중 출처 검증이 가능합니다.
Integrity Score는 전적으로 Renaiss 자체 데이터 구조로 구축됩니다. CLI의 ownerAddress와 cert serial은 인증번호 재사용 사기 탐지에, askPriceInUSDT/fmvPriceInUSD는 가격 및 과대평가 신호에 사용됩니다. 동일한 CLI 데이터를 반복 스캔해 Renaiss 자체에는 없는 가격 이력을 구축합니다.
실시간 beta 도구로 개발하는 과정에서 세 가지 실제 문제를 발견해 팀에 보고했습니다. 모든 flags에서 작동하지 않는 token별 수집품 조회(COLLECTIBLE_GET_FAILED), live sort의 마켓플레이스 pagination이 중복 행을 반환하는 문제, Index API 인증번호 범위 공백입니다. 마지막 문제는 CTO가 행사 중간에 해커톤용 일일 10K rate-limit tier를 확인하고 출시하는 계기가 되었습니다.`,
      testInstructions: `라이브 dashboard(설정 없이 언제든 확인): https://taste-sentinel.vercel.app/
실제 스캔 snapshot — dark／light theme, Integrity Score 세부 항목, audit trail.

Telegram bot을 포함한 전체 agent 실행:

git clone https://github.com/webski101/Taste-Sentinel
cd Taste-Sentinel


환경 변수 4개 설정:
CLAUDE_API_KEY=your_anthropic_key      # console.anthropic.com
TELEGRAM_BOT_TOKEN=your_bot_token      # create via @BotFather
TELEGRAM_CHAT_ID=your_chat_id          # from @userinfobot
POLL_INTERVAL_MS=600000


그다음 실행:
node index.js


Dashboard는 http://localhost:3000에서 실행됩니다. 첫 스캔에는 약 5분이 걸립니다. npm dependencies는 0개이며 Node.js 18+ built-ins만 사용하므로 Node 외에는 설치할 것이 없습니다.

안전하고 설정이 필요 없는 테스트 모드:
node index.js --dry-run   # one scan, prints results, no writes/alerts
node index.js --verify    # verifies the audit log's hash chain and exits

전체 기술 설명과 알려진 제한 사항은 README에 있습니다.`,
      judgeNotes: `Renaiss Index API 공개 tier에는 rate limit가 있으므로 현재 범위에 따라 이중 출처로 확인된 거래 수가 적게 표시될 수 있습니다. Integrity Score는 이를 직접 고려해 설계되었으며, 존재하지 않는 신뢰도를 가장하는 대신 ‘unverified’ penalty tier를 사용합니다.

Renaiss CLI의 token별 수집품 조회(npx renaiss card <tokenId>)는 현재 beta의 모든 flags에서 작동하지 않으며 팀에 보고했습니다. 따라서 이 프로젝트의 모든 카드별 상세 정보는 마켓플레이스 리스팅 데이터와 Index API에서 가져옵니다.`,
    }),
  }),
});
