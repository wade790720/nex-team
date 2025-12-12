# NexTeam 專案

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 如何啟動專案

### 前置需求
- npm
- Node.js (建議版本 16 以上)

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm start
```
專案會在 [http://localhost:3000](http://localhost:3000) 啟動，瀏覽器會自動開啟。

### 執行測試
```bash
npm test
```
執行所有單元測試，並進入互動式監看模式。

### 建置生產版本
```bash
npm run build
```
建置優化後的生產版本到 `build` 資料夾。

---

## 考題解答說明

本專案包含三個考題的解答：

### 考題 1: LikeDislike - 按鈕元件

**位置**: `src/components/LikeDislike.tsx`

**題目說明**:
實作一個新聞文章用的讚/不讚按鈕元件，包含以下功能：
- Like 按鈕：初始 100 個讚，可切換按讚狀態
- Dislike 按鈕：初始 25 個不讚，可切換不讚狀態
- 兩個按鈕互斥：點擊其中一個會取消另一個的狀態

**功能特點**:
- 點擊 Like 按鈕時，如果已經按讚則取消讚，否則按讚
- 點擊 Dislike 按鈕時，如果已經按不讚則取消不讚，否則按不讚
- 當啟用 Like 時，如果 Dislike 已啟用則自動取消 Dislike（反之亦然）
- 數字會根據狀態自動增減

**實作重點**:
- 使用 React Hooks (`useState`, `useCallback`) 管理狀態
- 使用 `classnames` 套件動態切換 CSS 類別
- 確保兩個按鈕的互斥邏輯正確運作

**使用方式**:
```tsx
import LikeDislike from './components/LikeDislike';

<LikeDislike />
```

---

### 考題 2: RunningClock - 倒數計時器

**位置**: `src/components/RunningClock.tsx`

**題目說明**:
實作一個倒數計時器元件，包含以下功能：
- 設定初始時間（分鐘和秒數）
- 開始倒數
- 暫停與恢復
- 重置計時器

**功能特點**:
- **START**: 開始倒數計時，按下後會禁用輸入欄位
- **PAUSE / RESUME**: 暫停或恢復計時器
- **RESET**: 重置所有狀態，清空輸入並重新啟用輸入欄位
- 時間顯示格式為 `mm:ss`（例如：05:30）
- 倒數結束時自動停止
- 重新開始時會使用最初輸入的時間

**實作重點**:
- 使用 `useState` 管理多個狀態（時間、運行狀態、暫停狀態等）
- 使用 `useEffect` 和 `setInterval` 處理倒數邏輯
- 使用 `useRef` 確保計時器正確清理，避免記憶體洩漏
- 處理輸入欄位的啟用/禁用狀態

**使用方式**:
```tsx
import RunningClock from './components/RunningClock';

<RunningClock />
```

---

### 考題 3: IsCycle - 判斷有向圖是否為單一環

**位置**: `src/utils/IsCycle.ts`

**題目說明**:
判斷一個有向圖是否為單一環（cycle）；單一環的定義是：可以從某一點出發，走訪所有其他節點一次，最後回到起點。

**輸入**:
- `A`: 起點陣列，`A[K]` 表示第 K 條邊的起點
- `B`: 終點陣列，`B[K]` 表示第 K 條邊的終點

**輸出**: 
- `true`: 圖為單一環
- `false`: 圖不是單一環

**解答思路**:
1. **輸入驗證**: 檢查陣列長度是否相等，且不為空
2. **一次遍歷建立資料結構**: 在一次遍歷中同時完成：
   - 收集所有頂點到 `vertices` Set
   - 建立 `nextNode` Map（鄰接表），同時檢查出度是否為 1
     - 如果某個節點已經有出邊，則出度 > 1，不是單一環
   - 計算每個節點的入度到 `inDegree` Map
3. **邊數檢查**: 邊數必須等於頂點數（單一環的必要條件）
   - 邊數 = `A.length`（或 `B.length`）
   - 頂點數 = `vertices.size`
4. **度數檢查**: 每個頂點的出度和入度都必須為 1
   - 檢查 `inDegree.get(v) === 1` 確保入度為 1
   - 檢查 `nextNode.has(v)` 確保出度為 1（每個頂點都有出邊）
5. **連通性檢查**: 從任意節點開始追蹤，檢查是否能走訪所有節點並回到起點
   - 沿著 `nextNode` 走訪 `vCount` 步
   - 必須不重複訪問任何節點
   - 走訪完所有節點後必須回到起點

**範例**:
```typescript
// 例子 1: 單一環
A = [1, 3, 2, 4]
B = [4, 1, 3, 2]
// 路徑: 1 → 4 → 2 → 3 → 1 (回到起點)
// 結果: true

// 例子 2: 兩個分離的環
A = [1, 2, 3, 4]
B = [2, 1, 4, 3]
// 形成兩個小環: 1↔2 和 3↔4
// 結果: false
```

**測試檔案**: `src/__tests__/IsCycle.test.ts`

---

## 專案結構

```
src/
├── __tests__/          # 測試檔案
│   ├── App.test.tsx
│   └── IsCycle.test.ts
├── components/         # React 元件
│   ├── LikeDislike.tsx
│   └── RunningClock.tsx
├── utils/             # 工具函數
│   └── IsCycle.ts
├── App.tsx            # 主應用元件
└── index.tsx          # 應用程式入口
```

---