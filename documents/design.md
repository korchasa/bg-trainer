# SDS

## 1. Intro
- **Purpose:** Describe the client-side architecture of bg-trainer: how screens, hooks, engines, and data combine to deliver quiz sessions and analytics.
- **Rel to SRS:** Implements FR-MENU, FR-GAME-SESSION, FR-SCORING, FR-ENGINES, FR-MATCH, FR-ODD, FR-PARADIGM, FR-REACTION, FR-HISTORY, FR-ANALYTICS, FR-RESULTS, FR-NAV, FR-LESSONS, FR-ROUND, FR-MASTERY, FR-SCHED, FR-TYPE, FR-FEEDBACK-RULE.

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
    App --> Data[(data/index.ts\n + lesson1.ts + lesson2.ts)]
    App --> Lessons2[(data/lessons.ts)]
    App --> Slice[(utils/sliceData)]
  ```
- **Subsystems:**
  - **Shell (`App.tsx`):** screen router + session lifecycle + history persistence.
  - **Engines (`components/engines/*`):** one React component per `EngineType`. Consumes `useGame`.
  - **State hooks (`hooks/*`):** `useGame` (scoring, advance, reaction), `useTimer` (countdown for timed mode).
  - **Data layer (`data/index.ts` + `data/lesson1.ts` + `data/lesson2.ts`):** exercises split per-lesson; `index.ts` is composition root — imports datasets from lesson files, re-exports via `export *`, defines `CATEGORIES` + `ALL_MODES`. Shared labels (`LABEL_M/F/N/PL`) live in `lesson1.ts` and are imported by `lesson2.ts`. L10n fields stored as `Localized<string>`.
  - **Lessons layer (`data/lessons.ts`):** `LESSONS` array (8 textbook units, localized titles) + `LESSON_BY_ID`.
  - **Slicer (`utils/sliceData.ts`):** type-aware wrapper around `mode.data()` that shuffles+slices to round size while preserving `pickOpt.opts`.
  - **Persistence (`utils/history.ts`):** thin wrapper over `localStorage` with size cap + error swallow.
  - **Mastery (`utils/mastery.ts`, `utils/itemKey.ts`):** per-item level store + stable item identity helper. Separate `localStorage` key `bg-trainer-mastery-v1`. `itemKey` uses Bulgarian-stable keys (`q` / `result` / `words.join("|")`).
  - **i18n (`src/i18n/*`):** `LocaleProvider` + `useI18n` hook expose `t` (plain UI strings), `f` (parametric strings), `L` (resolves `Localized<T>`). `STRINGS`/`FORMATS` dictionaries enforce locale completeness via `Record<Locale, …>`. Locale persisted under `bg-trainer-lang-v1`; first-run detection from `navigator.language` (only literal `uk` prefix triggers UK).
  - **UI atoms (`components/ui/*`):** `AnswerBtn`, `Progress`, `Reaction`, `Correction`, `NavHeader`, `BackButton`, `TaskPrompt`.
  - **Screens (`components/screens/*`):** `ResultsScreen`, `AnalyticsScreen`.

## 3. Components

### 3.1 App.tsx
- **Purpose:** Root component. Owns `screen`, `lessonId`, `modeId`, `round`, `result`, `history`. Dispatches to screens/engines. Passes `currentMode.desc` as `prompt` prop to the active engine, which renders it via `TaskPrompt` directly above the question in its centered block. Round machine: queue of 3 random `modeIds`, per-game completion accumulates totals; final game emits aggregated `HistoryEntry` with `mode="round:<lessonId>"`.
- **Interfaces:** `screen: Screen`, lesson lookup via `data/lessons.ts`, mode lookup via `data/index.ts`, data slicing via `utils/sliceData.ts`, history r/w via `utils/history`.
- **Deps:** All screens, all engines, `data/index.ts`, `data/lessons.ts`, `utils/sliceData.ts`, `utils/history.ts`, `utils/shuffle.ts`, `types.ts`.

### 3.2 useGame hook
- **Purpose:** Encapsulate per-session state: `cur`, `sel`, `corr`, `reaction`, `score`, `answered`, `qsTotal` + `answer()` + `advance()`. Owns `indexPlan`, `retryBuffer`, `errSet` to drive non-mutating re-queue of wrong answers and unique-index error counting.
- **Interfaces:** `useGame(qs, onComplete, pts=10, delay=1000, onItemAnswer?)`. `answer(val, correctVal, opts | extraPts)` where `opts = { extraPts?, hinted? }`. `onItemAnswer(itemId, ok, fast, hinted?)`.
- **Deps:** `types.DataItem`, `utils/shuffle` (`pickOK`, `pickFail`), `utils/itemKey`.

### 3.3 useTimer hook
- **Purpose:** Countdown for `TimedEngine`, exposes remaining time and bonus calculation hook.
- **Deps:** None.

### 3.4 Engines (11)
- **Purpose:** Render one question and produce answer events for `useGame.answer()` (or directly, for engines with custom session shapes).
- **Interfaces:** Props `{ data, onComplete, onItemAnswer?, levelLookup?, prompt? }` (shape varies slightly per engine). Engine-specific data types (`DataItem`, `BuildItem`, `LiItem`, `MatchItem`, `OddItem`, `ParadigmItem`, `PickOptData`).
- **Hint toggle:** Multiple-choice engines (`pick`, `pickOpt`, `pickFrom`, `timed`, `type`) hide the L1 hint by default behind a "Подсказка" button; revealing sets a local `hintedRef` that is forwarded to `useGame.answer({ hinted: true })` and then to `onItemAnswer(..., hinted=true)`.
- **Speed-gate:** `TimedEngine` receives `levelLookup(itemId)` and disables the timer + speed bonus when `level < 5`.
- **Normalization:** `TypeEngine` normalizes user input with a strict whitelist (trim + lowercase + whitespace collapse). No character substitutions.
- **Focus marker:** `LiEngine` parses `*word*` in `translation` and renders the wrapped word with underline — disambiguates which word is questioned when L1 word order hides focus.
- **Custom session shapes:**
  - `MatchEngine` — single board with all pairs; session ends when matched count == pairs.length. Score = +10 per first-try correct pair; errors counted as unique wrong-left ids.
  - `ParadigmEngine` — one item = one 6-slot paradigm; +5 per correct slot; advances on full fill.
  - `OddOneOutEngine` — uses `useGame` with a `DataItem[]` cast over `OddItem[]` to inherit retry/scoring.
- **Deps:** `useGame` (most), `useTimer` (timed only), UI atoms.
- **List:** `PickEngine`, `TimedEngine`, `PickOptEngine`, `PickFromEngine`, `NegEngine`, `BuildEngine`, `LiEngine`, `TypeEngine`, `MatchEngine`, `OddOneOutEngine`, `ParadigmEngine`.

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
- **Purpose:** Persist per-item mastery levels and provide the SRS-like scheduler. Pure functions: `loadMastery`, `saveMastery`, `clearMastery`, `applyAnswer(store, modeId, itemId, ok, fast, now, hinted=false)`, `lessonStats`, `modeStats`, `pickDueItems(store, modeId, items, n, now)`.
- **Interfaces:** `MasteryStore = Record<modeId, Record<itemId, ItemMastery>>`; `ItemMastery = { level, lastTs, attempts }`.
- **Scheduler:** `pickDueItems` scores each item by `(overdue + weakBonus if level<7)`, where `dueAt = lastTs + DAY_MS · 2^level`; unseen items get top priority. Top-K (K = 2n) is shuffled and sliced to n. When all scores are zero, fallback to `shuffle(items).slice(0, n)`.
- **Deps:** `types.ts`, `utils/itemKey`, `utils/shuffle`, `localStorage`.

### 3.10 utils/itemKey.ts
- **Purpose:** Stable natural key for any engine item + mode item-count resolution. `itemKey(item)` → `q` / `translation`. `itemCount(mode)` handles 3 data shapes.
- **Deps:** `types.ts`.

## 4. Data
- **Entities:**
  - `DataItem = { q, answer, hint, label?, decoys?, rule? }`
  - `BuildItem = { words, translation }`
  - `LiItem = { words, liPosition, result, translation }`
  - `MatchItem = { left, right, hint }`
  - `OddItem = { words, odd, hint, rule? }`
  - `ParadigmItem = { verb, pronouns, forms, hint, rule? }`
  - `Mode = { id, icon, label, desc, type: EngineType, data: () => Item[] }`
  - `SessionPace = "quick" | "standard" | "deep"` → `SESSION_SIZE_BY_PACE = {quick:3, standard:5, deep:8}`
  - `Category = { id, name, modes: Mode[] }`
  - `Lesson = { id, num, title, modeIds: string[], available: boolean }`
  - `HistoryEntry = { mode, score, time, errors, ts, lessonId?, round?, qsTotal? }`
  - `ItemMastery = { level: 0..10, lastTs: ms, attempts }`
  - `ModeMastery = Record<itemId, ItemMastery>`; `MasteryStore = Record<modeId, ModeMastery>`
- **ERD:** None (no relational data). `Category 1—n Mode 1—n Item` in-memory.
- **Migration:** `localStorage` keys = `bg-trainer-v3` (history) + `bg-trainer-mastery-v1` (mastery) + `bg-trainer-pace-v1` (pace) + `bg-trainer-lang-v1` (locale). Bumping the `v*` suffix effectively resets; older keys are left orphaned. All four schemas are independent. `itemKey()` migration: `BuildItem`/`LiItem` keys switched from Russian `translation` to Bulgarian `words.join("|")` / `result` — pre-existing mastery for build/li modes is silently orphaned (acceptable: small data subset, transparent re-learning).

## 5. Logic
- **Algos:**
  - **Session flow:** `useGame` owns `indexPlan` (initial order), `planPos`, `retryBuffer[{ idx, dueAt }]`, `answered` (counter), `qsTotalRef` (fixed at mount). `advance()` picks the next physical index via `pickNext(answered)`: prefer any due retry (`dueAt ≤ answered`), else `indexPlan[planPos++]`, else earliest-due retry. Session completes when `answered ≥ qsTotal` and `retryBuffer` is empty, or when `pickNext` returns `-1`.
  - **Re-queue:** On a wrong answer, push `{ idx: cur, dueAt: answered + 1 + 3 + rand(0..2) }` (3–5 positions later). `qs` is never mutated. `errSet` records unique wrong indices; `errors` at completion = `errSet.size`.
  - **Answer handling:** first selection locks input; correct → `score += pts + extraPts`; incorrect → correct value stored in `corr`, item re-queued. `answer(val, correctVal, { extraPts, hinted })`; legacy numeric third arg still supported. Auto-advance after `delay`.
  - **Timed bonus + speed-gate:** `TimedEngine` passes `extraPts = max(0, timeLeft · 2)` on correct. When `levelLookup(itemId) < 5` the timer is disabled, `extraPts = 0`, and `fast` is reported as `false` to mastery.
  - **Shuffle:** Fisher-Yates (`utils/shuffle.ts`) for answer options and reaction picks.
  - **History cap:** `saveHistory` keeps only `h.slice(-200)`.
  - **sliceData(mode, size?, mastery?, now?)**: type-aware wrapper. When `mastery` is provided, selection goes through `pickDueItems(mastery, mode.id, items, n, now)`; otherwise `shuffle(items).slice(0, n)`. For `pickOpt`, `opts` is preserved.
  - **Scheduler (`pickDueItems`):** see §3.9. Used for both single-mode sessions and round sessions (round is the primary loop; skipping SRS there would nullify it in practice).
  - **Round flow:** `startRound` → `shuffle(lesson.modeIds).slice(0, ROUND_GAMES=3)` → snapshot `size = SESSION_SIZE_BY_PACE[pace]` into `RoundState` → play each with `sliceData(mode, round.size, mastery)`. `handleComplete` in round branch accumulates `totals` and swaps `modeId` to next entry until queue drained, then writes single history entry and jumps to results. `qsTotal` of the aggregated round entry = `ROUND_GAMES × round.size` (3/9, 5/15, 8/24 for quick/standard/deep).
  - **Mastery update (`applyAnswer`):** `prev = store[modeId]?[itemId] ?? {level:0, lastTs:0, attempts:0}`. `stale = prev.lastTs > 0 AND now - prev.lastTs ≥ 7d`. If `ok`: if `hinted` → `next = prev.level` (no reward); else `base = stale ? max(0, prev.level - 1) : prev.level`; `next = min(10, base + (fast ? 2 : 1))`. Else: `next = max(0, prev.level - (hinted ? 1 : 3))`. Write `{level:next, lastTs:now, attempts:prev.attempts+1}`. `fast` is only `true` when `TimedEngine` reports `extraPts > 0` (never fires under the speed-gate).
  - **Mastery buffer:** `App` buffers per-answer events `{ modeId, itemId, ok, fast, ts, hinted? }` in a ref and flushes once — on `onComplete` and on round-abort — to avoid 1 write per answer.
  - **Lesson mastery (`lessonStats`):** `total = sum over modeIds of itemCount(mode)`. `sumLevel = sum over items of level`. `ratio = sumLevel / (10 × total)`. `mastered = atSeven/total ≥ 0.9 AND atTen/total ≥ 0.6`.
- **Rules:**
  - Session length = `SESSION_SIZE_BY_PACE[pace]` for both single games and round sub-games. Pace defaults to `standard` (5). Persisted under `bg-trainer-pace-v1`.
  - Round total = `ROUND_GAMES × size` = 9 (quick) / 15 (standard) / 24 (deep). Snapshotted at round start — changing pace mid-round has no effect.
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
  - i18n covers only `ru` and `uk`. Bulgarian content shared. `DATA_GENDER` answers/options remain Russian (`мужской`/`женский`/`средний`) for v1 — Ukrainian users see Russian gender labels there.
  - No accessibility audit formalized.
- **Deferred:**
  - Test harness (Vitest/Playwright) — to add when regressions appear.
  - ESLint + Prettier — for consistent code quality.
  - Mode-level settings (session length, difficulty).
  - Export/import history.
