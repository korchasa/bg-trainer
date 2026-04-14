# SDS

## 1. Intro
- **Purpose:** Describe the client-side architecture of bg-trainer: how screens, hooks, engines, and data combine to deliver quiz sessions and analytics.
- **Rel to SRS:** Implements FR-MENU, FR-GAME-SESSION, FR-SCORING, FR-ENGINES, FR-REACTION, FR-HISTORY, FR-ANALYTICS, FR-RESULTS, FR-NAV, FR-LESSONS, FR-ROUND, FR-MASTERY.

## 2. Arch
- **Diagram:**
  ```mermaid
  flowchart LR
    User((User)) --> App[App.tsx]
    App -->|screen=lessons| Lessons[LessonsScreen]
    App -->|screen=lesson| Lesson[LessonScreen]
    App -->|screen=game| Engine[Engine*]
    App -->|screen=results| Results[ResultsScreen]
    App -->|screen=analytics| Analytics[AnalyticsScreen]
    Engine --> useGame[(useGame hook)]
    Engine -.timed.-> useTimer[(useTimer hook)]
    App --> History[(localStorage\n bg-trainer-v3)]
    App --> Mastery[(localStorage\n bg-trainer-mastery-v1)]
    Analytics --> History
    Lessons --> Mastery
    Lesson --> Mastery
    App --> Data[(data/index.ts)]
    App --> Lessons2[(data/lessons.ts)]
    App --> Slice[(utils/sliceData)]
  ```
- **Subsystems:**
  - **Shell (`App.tsx`):** screen router + session lifecycle + history persistence.
  - **Engines (`components/engines/*`):** one React component per `EngineType`. Consumes `useGame`.
  - **State hooks (`hooks/*`):** `useGame` (scoring, advance, reaction), `useTimer` (countdown for timed mode).
  - **Data layer (`data/index.ts`):** all exercises + `Category`/`Mode` definitions (static).
  - **Lessons layer (`data/lessons.ts`):** `LESSONS` array (8 textbook units) + `LESSON_BY_ID`.
  - **Slicer (`utils/sliceData.ts`):** type-aware wrapper around `mode.data()` that shuffles+slices to round size while preserving `pickOpt.opts`.
  - **Persistence (`utils/history.ts`):** thin wrapper over `localStorage` with size cap + error swallow.
  - **Mastery (`utils/mastery.ts`, `utils/itemKey.ts`):** per-item level store + stable item identity helper. Separate `localStorage` key `bg-trainer-mastery-v1`.
  - **UI atoms (`components/ui/*`):** `AnswerBtn`, `Progress`, `Reaction`, `Correction`, `NavHeader`, `BackButton`.
  - **Screens (`components/screens/*`):** `ResultsScreen`, `AnalyticsScreen`.

## 3. Components

### 3.1 App.tsx
- **Purpose:** Root component. Owns `screen`, `lessonId`, `modeId`, `round`, `result`, `history`. Dispatches to screens/engines. Round machine: queue of 3 random `modeIds`, per-game completion accumulates totals; final game emits aggregated `HistoryEntry` with `mode="round:<lessonId>"`.
- **Interfaces:** `screen: Screen`, lesson lookup via `data/lessons.ts`, mode lookup via `data/index.ts`, data slicing via `utils/sliceData.ts`, history r/w via `utils/history`.
- **Deps:** All screens, all engines, `data/index.ts`, `data/lessons.ts`, `utils/sliceData.ts`, `utils/history.ts`, `utils/shuffle.ts`, `types.ts`.

### 3.2 useGame hook
- **Purpose:** Encapsulate per-session state: `cur`, `sel`, `corr`, `reaction`, `score` + `answer()` + `advance()`.
- **Interfaces:** `useGame(qs, onComplete, pts=10, delay=1000)`.
- **Deps:** `types.DataItem`, `utils/shuffle` (`pickOK`, `pickFail`).

### 3.3 useTimer hook
- **Purpose:** Countdown for `TimedEngine`, exposes remaining time and bonus calculation hook.
- **Deps:** None.

### 3.4 Engines (7)
- **Purpose:** Render one question and produce answer events for `useGame.answer()`.
- **Interfaces:** Props `{ qs, onComplete }` (shape varies slightly per engine). Engine-specific data types (`DataItem`, `BuildItem`, `LiItem`).
- **Deps:** `useGame` (all), `useTimer` (timed only), UI atoms.
- **List:** `PickEngine`, `TimedEngine`, `PickOptEngine`, `PickFromEngine`, `NegEngine`, `BuildEngine`, `LiEngine`.

### 3.5 ResultsScreen
- **Purpose:** Show session outcome: score, errors, time. Offer "play again" / "menu".
- **Deps:** `types.HistoryEntry` (implicit).

### 3.6 AnalyticsScreen
- **Purpose:** Aggregate history + render charts (Recharts).
- **Deps:** `recharts`, `utils/history.ts`, `constants.CHART_COLORS`.

### 3.7 UI atoms
- `AnswerBtn`, `Progress`, `Reaction`, `Correction`, `NavHeader`, `BackButton`, `ConfirmBar` — small presentational components with Tailwind classes. `ConfirmBar` = bottom-anchored inline confirm panel (two buttons) used for round-abort.

### 3.8 LessonsScreen / LessonScreen
- **LessonsScreen:** root screen. Two sections: "Доступно" (available lessons, tappable) and "В разработке" (upcoming, disabled). Taps emit `onPickLesson(id)`. Renders per-lesson mastery progress bar + `K/M · X%`.
- **LessonScreen:** lesson details. Primary button "Раунд" + grid of the lesson's modes. Taps emit `onPickGame(modeId)` / `onStartRound()`. Renders per-mode mastery mini bars.
- **Deps:** `data/lessons.ts`, `data/index.ts` (`ALL_MODES`), `utils/mastery.ts`.

### 3.9 utils/mastery.ts
- **Purpose:** Persist per-item mastery levels. Pure functions `loadMastery`, `saveMastery`, `clearMastery`, `applyAnswer(store, modeId, itemId, ok, fast, now)`, `lessonStats(store, lesson, itemCount)`.
- **Interfaces:** `MasteryStore = Record<modeId, Record<itemId, ItemMastery>>`; `ItemMastery = { level, lastTs, attempts }`.
- **Deps:** `types.ts`, `localStorage`.

### 3.10 utils/itemKey.ts
- **Purpose:** Stable natural key for any engine item + mode item-count resolution. `itemKey(item)` → `q` / `translation`. `itemCount(mode)` handles 3 data shapes.
- **Deps:** `types.ts`.

## 4. Data
- **Entities:**
  - `DataItem = { q, answer, hint, label?, decoys? }`
  - `BuildItem = { words, translation }`
  - `LiItem = { words, liPosition, result, translation }`
  - `Mode = { id, icon, label, desc, type: EngineType, data: () => Item[], sessionSize? }`
  - `Category = { id, name, modes: Mode[] }`
  - `Lesson = { id, num, title, modeIds: string[], available: boolean }`
  - `HistoryEntry = { mode, score, time, errors, ts, lessonId?, round?, qsTotal? }`
  - `ItemMastery = { level: 0..10, lastTs: ms, attempts }`
  - `ModeMastery = Record<itemId, ItemMastery>`; `MasteryStore = Record<modeId, ModeMastery>`
- **ERD:** None (no relational data). `Category 1—n Mode 1—n Item` in-memory.
- **Migration:** `localStorage` keys = `bg-trainer-v3` (history) + `bg-trainer-mastery-v1` (mastery). Bumping the `v*` suffix effectively resets; older keys are left orphaned. Mastery schema v1 is independent of history.

## 5. Logic
- **Algos:**
  - **Session flow:** `advance()` increments `cur` until `cur+1 === qs.length`, then fires `onComplete(score, time, errors)`.
  - **Answer handling:** first selection locks input; correct → `score += pts + extraPts`; incorrect → `errors++`, correct value stored in `corr`. Auto-advance after `delay`.
  - **Timed bonus:** `TimedEngine` passes `extraPts` proportional to remaining time.
  - **Shuffle:** Fisher-Yates (`utils/shuffle.ts`) for answer options and reaction picks.
  - **History cap:** `saveHistory` keeps only `h.slice(-200)`.
  - **sliceData(mode, size)**: type-aware wrapper. For `pickOpt` slices `items` only, preserves `opts`. For other engines, shuffles + slices the array. Returns original `mode.data` when `size` is undefined.
  - **Round flow:** `startRound` → `shuffle(lesson.modeIds).slice(0, 3)` → play each with `sliceData(mode, 5)`. `handleComplete` in round branch accumulates `totals` and swaps `modeId` to next entry until queue drained, then writes single history entry and jumps to results.
  - **Mastery update (`applyAnswer`):** `prev = store[modeId]?[itemId] ?? {level:0, lastTs:0, attempts:0}`. `stale = prev.lastTs > 0 AND now - prev.lastTs ≥ 7d`. If `ok`: `base = stale ? max(0, prev.level - 1) : prev.level`; `next = min(10, base + (fast ? 2 : 1))`. Else: `next = max(0, prev.level - 3)`. Write `{level:next, lastTs:now, attempts:prev.attempts+1}`. `fast` only true when `TimedEngine` reports `extraPts > 0`.
  - **Mastery buffer:** `App` buffers per-answer events in a ref and flushes once — on `onComplete` and on round-abort — to avoid 1 write per answer.
  - **Lesson mastery (`lessonStats`):** `total = sum over modeIds of itemCount(mode)`. `sumLevel = sum over items of level`. `ratio = sumLevel / (10 × total)`. `mastered = atSeven/total ≥ 0.9 AND atTen/total ≥ 0.6`.
- **Rules:**
  - Default session length = full `data()` set (per-engine internal slice cap still applies).
  - Round session size = 5 per game × 3 games = 15 questions total.
  - Duplicate answer selections ignored (`sel !== null` guard).
  - `localStorage` failures caught and swallowed — app never throws due to storage.

## 6. Non-Functional
- **Scale:** Single user, in-memory + `localStorage`. 200-entry cap prevents unbounded growth.
- **Fault tolerance:** Storage errors → silent no-op. Parse errors → empty history.
- **Sec:** No PII, no external requests, static deploy.
- **Logs:** None — browser console only during dev.

## 7. Constraints
- **Simplified:**
  - No test suite (not configured).
  - No linter (ESLint not installed).
  - No i18n — UI strings Russian/Bulgarian hardcoded.
  - No accessibility audit formalized.
- **Deferred:**
  - Test harness (Vitest/Playwright) — to add when regressions appear.
  - ESLint + Prettier — for consistent code quality.
  - Mode-level settings (session length, difficulty).
  - Export/import history.
