# SRS

## 1. Intro
- **Desc:** bg-trainer — browser-based gamified grammar trainer for Bulgarian A0 learners. UI in Russian. Single-page React app hosted on GitHub Pages.
- **Def/Abbr:** SPA = Single Page App. Engine = interaction component for one quiz type. Mode = one drill config (data + engine). Category = group of related modes. Session = one playthrough of N questions (default = full data set). Lesson = textbook unit grouping a curated list of modes. Round = 3 consecutive 5-question games from one lesson.

## 2. General
- **Context:** Self-study tool for Russian speakers at A0. No accounts, no backend. All state is client-side.
- **Assumptions/Constraints:**
  - Modern evergreen browser with `localStorage` and ES2020+.
  - Mobile-first, max-width `md`, portrait-friendly.
  - Static hosting only (GitHub Pages at base `/bg-trainer/`).
  - No server, no analytics backend, no i18n — Russian UI hardcoded.

## 3. Functional Reqs

### 3.1 FR-MENU
- **Desc:** Entry screen = list of lessons. Lessons carry a curated `modeIds` list. Available lessons open a per-lesson screen; upcoming lessons shown disabled with "Скоро" label.
- **Scenario:** User opens app → sees lessons list → taps available lesson → lesson screen with round button + grid of lesson's games → taps a game → game starts.
- **Acceptance:**
  - [x] Lessons list rendered with two sections (available / upcoming). Evidence: `src/components/screens/LessonsScreen.tsx:16-62`, `src/data/lessons.ts`
  - [x] Only `available=true` lessons are tappable. Evidence: `src/App.tsx:89-94`, `src/components/screens/LessonsScreen.tsx:35-52`
  - [x] Lesson screen lists its modes + primary "Раунд" button. Evidence: `src/components/screens/LessonScreen.tsx`

### 3.2 FR-GAME-SESSION
- **Desc:** Session = N questions from the selected mode's data. Default N = mode's full data set (per-engine internal cap still applies). Round sessions use N = 5 per game.
- **Scenario:** User plays → N questions answered → `ResultsScreen` shows score/errors/time (single game) or round aggregates.
- **Acceptance:**
  - [x] Default session uses full data set; round override via `sliceData(mode, 5)`. Evidence: `src/utils/sliceData.ts`, `src/App.tsx:151-154`
  - [x] `useGame` tracks `cur`, `sel`, `corr`, `reaction`, `score`. Evidence: `src/hooks/useGame.ts:5-49`
  - [x] On last answer → `onComplete(score, time, errors)` fires. Evidence: `src/hooks/useGame.ts:26-28`

### 3.10 FR-LESSONS
- **Desc:** 8 lessons aligned with textbook `documents/lessons/lesson-1..8.md`. Each lesson has `id`, `num`, `title`, `modeIds[]`, `available`. Lesson 1 is fully playable in debug scope; lessons 2–8 show as "Скоро" placeholders.
- **Scenario:** User picks lesson 1 → sees 11 games specific to lesson-1 content (съм, казвам се, говоря, страна→язык, национальность, профессия, приветствия, нали, ли-вопрос, отрицание).
- **Acceptance:**
  - [x] `LESSONS` defined with 8 entries; only L1 `available=true`. Evidence: `src/data/lessons.ts:3-29`
  - [x] L1 `modeIds` cover L1 grammar topics. Evidence: `src/data/lessons.ts:6-20`
  - [x] Each new L1 mode backed by ≥6 data items. Evidence: `src/data/index.ts` (DATA_KAZVAM, DATA_GOVORYA, DATA_COUNTRY_LANG, DATA_NATIONALITY, DATA_PROFESSION, DATA_GREETING, DATA_NALI)

### 3.11 FR-ROUND
- **Desc:** Round = 3 random games from a lesson, 5 questions each, played consecutively without returning to menu. On completion, one aggregated `HistoryEntry` written with `mode="round:<lessonId>"`, `round=true`, `qsTotal=15`. Single results screen shows summed score/time/errors.
- **Scenario:** User taps "Раунд" → plays 3 games in sequence → results screen with sums → history shows one `round:l1` entry.
- **Acceptance:**
  - [x] Round state machine advances through queue without screen change. Evidence: `src/App.tsx:44-77`
  - [x] On completion writes single history entry with `round=true`, `qsTotal`, `lessonId`. Evidence: `src/App.tsx:59-69`
  - [x] Abort via inline `ConfirmBar` (not `window.confirm`). Evidence: `src/components/ui/ConfirmBar.tsx`, `src/App.tsx:114-129,190-198`

### 3.3 FR-SCORING
- **Desc:** Correct = +10 pts. Timed mode adds speed bonus. Wrong answer increments error count, 0 pts. Second answer on the same question ignored.
- **Acceptance:**
  - [x] Base +10 pts on correct. Evidence: `src/hooks/useGame.ts:36`
  - [x] Speed bonus applied in `TimedEngine` via `extraPts`. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useGame.ts:31`
  - [x] Duplicate selections rejected. Evidence: `src/hooks/useGame.ts:32`

### 3.4 FR-ENGINES
- **Desc:** 7 engine types implement distinct interaction patterns.
- **Acceptance:**
  - [x] `pick` — 3 shuffled options. Evidence: `src/components/engines/PickEngine.tsx`
  - [x] `timed` — timed quiz + speed bonus. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useTimer.ts`
  - [x] `pickOpt` — fixed option set (articles, gender). Evidence: `src/components/engines/PickOptEngine.tsx`
  - [x] `pickFrom` — pick correct form from decoys. Evidence: `src/components/engines/PickFromEngine.tsx`
  - [x] `negation` — build negation from word tiles. Evidence: `src/components/engines/NegEngine.tsx`
  - [x] `build` — drag-to-order sentence. Evidence: `src/components/engines/BuildEngine.tsx`
  - [x] `li` — tap position to insert particle "ли". Evidence: `src/components/engines/LiEngine.tsx`

### 3.5 FR-REACTION
- **Desc:** After each answer, show a Russian-language reaction (OK or FAIL) and, on wrong, reveal the correct answer.
- **Acceptance:**
  - [x] Reaction picked from `OK` / `FAIL` arrays. Evidence: `src/constants.ts:1-2`, `src/utils/shuffle.ts`
  - [x] Auto-advance after `delay` ms (default 1000). Evidence: `src/hooks/useGame.ts:45`

### 3.6 FR-HISTORY
- **Desc:** Game history persists in `localStorage` (key `bg-trainer-v3`), capped at 200 entries. Newest entries retained; oldest dropped. Optional fields `lessonId`, `round`, `qsTotal` extend schema without breaking legacy entries.
- **Acceptance:**
  - [x] Save trims to last 200. Evidence: `src/utils/history.ts:15`
  - [x] Load returns `[]` on parse failure. Evidence: `src/utils/history.ts:8`
  - [x] Storage key = `bg-trainer-v3`. Evidence: `src/constants.ts:7`
  - [x] `HistoryEntry` extended with optional `lessonId`, `round`, `qsTotal`. Evidence: `src/types.ts:1-10`

### 3.7 FR-ANALYTICS
- **Desc:** Analytics screen shows history dashboard with charts (score history, accuracy stats, mode distribution).
- **Acceptance:**
  - [x] Renders charts via Recharts. Evidence: `src/components/screens/AnalyticsScreen.tsx`
  - [ ] Clear-history action available.
  - [ ] Mode distribution chart color-cycles through `CHART_COLORS`.
  - [x] Mode distribution excludes `round:*` entries; rounds aggregated in dedicated "Раунды" section. Evidence: `src/components/screens/AnalyticsScreen.tsx:34-41,92-120`
  - [x] Accuracy uses per-entry `qsTotal` (fallback = 8). Evidence: `src/components/screens/AnalyticsScreen.tsx:33,54`

### 3.8 FR-RESULTS
- **Desc:** End-of-game screen shows score, time, error count; offers "Play again" and "Back to menu".
- **Acceptance:**
  - [x] Screen component exists. Evidence: `src/components/screens/ResultsScreen.tsx`
  - [x] Appends `HistoryEntry` on completion. Evidence: `src/App.tsx`, `src/utils/history.ts`

### 3.12 FR-MASTERY
- **Desc:** Per-item mastery level (0–10) persisted in `localStorage` (key `bg-trainer-mastery-v1`). Independent from history. Update rule: correct `+1`, fast-correct (timed, within timer bonus) `+2`, wrong `−3`. Lazy decay: correct answers on items untouched ≥7 days first drop 1 level, then apply reward. Lesson-level aggregation: `ratio = sum(level) / (10 × totalItems)`. Lesson "полностью изучено" = ≥90% items at level ≥7 AND ≥60% at level 10.
- **Scenario:** User plays a mode → every answered item updates its level → `LessonsScreen` shows per-lesson progress bar + "K/M освоено · X%" → `LessonScreen` shows per-mode mini bar → `AnalyticsScreen` has separate reset for mastery.
- **Acceptance:**
  - [x] Mastery persisted under `bg-trainer-mastery-v1`, independent of `bg-trainer-v3`. Evidence: `src/utils/mastery.ts:4`, `src/constants.ts:7`
  - [x] Level bounded `[0, 10]`; correct `+1`, timed-fast `+2`, wrong `−3`. Evidence: `src/utils/mastery.ts:43-51`
  - [x] Decay: stale-correct path reduces 1 level before reward. Evidence: `src/utils/mastery.ts:44,47`
  - [x] All 7 engines forward item identity via `onItemAnswer(itemId, ok, fast)`. Evidence: `src/hooks/useGame.ts:47-55`, `src/components/engines/PickEngine.tsx`, `src/components/engines/TimedEngine.tsx`, `src/components/engines/PickOptEngine.tsx`, `src/components/engines/PickFromEngine.tsx`, `src/components/engines/NegEngine.tsx`, `src/components/engines/BuildEngine.tsx`, `src/components/engines/LiEngine.tsx`
  - [x] Mastery persisted once per session (on complete + on abort), not per answer. Evidence: `src/App.tsx:56-66,78-82,165,170`
  - [x] `LessonsScreen` shows progress bar + `K/M · X%`; mastered badge when criteria met. Evidence: `src/components/screens/LessonsScreen.tsx`
  - [x] `LessonScreen` shows per-mode mastery bars. Evidence: `src/components/screens/LessonScreen.tsx`
  - [x] `AnalyticsScreen` offers "Сбросить освоение" separate from history reset. Evidence: `src/components/screens/AnalyticsScreen.tsx`, `src/App.tsx:288`
  - [x] Existing `bg-trainer-v3` history preserved. Evidence: `src/constants.ts:7`, `src/utils/history.ts`

### 3.9 FR-NAV
- **Desc:** Screens: `lessons` (root), `lesson`, `game`, `results`, `analytics`. Flow: `lessons → lesson → game → results → lesson`. Back from `game` during a round opens an inline confirm bar.
- **Acceptance:**
  - [x] Screen state owned by `App.tsx`. Evidence: `src/App.tsx:29-38`
  - [x] Initial screen on load = `lessons`. Evidence: `src/App.tsx:29`
  - [x] Back during round shows `ConfirmBar` instead of browser confirm. Evidence: `src/App.tsx:114-129,190-198`
  - [x] `NavHeader` + `BackButton` provide navigation. Evidence: `src/components/ui/NavHeader.tsx`, `src/components/ui/BackButton.tsx`

## 4. Non-Functional
- **Perf:** Initial bundle small enough for mobile networks (Vite tree-shake + code-split). Interaction latency < 50ms on mid-range mobile.
- **Reliability:** `localStorage` failures (quota, disabled) must not crash the app — silent no-op. Evidence: `src/utils/history.ts:17, 23`.
- **Sec:** No PII, no external API, no user auth. Static assets only.
- **Scale:** Single user per browser. Max 200 session records.
- **UX:** Mobile-first, accent `#E60023`, dark `#111111`, centered `md` container.

## 5. Interfaces
- **UI:** Custom React components. No external UI library. Tailwind utility classes.
- **Storage:** Browser `localStorage` JSON-serialized `HistoryEntry[]`. Key `bg-trainer-v3`.
- **Deploy:** GitHub Pages. Vite base path `/bg-trainer/`. Branch previews at `/bg-trainer/preview/{branch}/`.

## 6. Acceptance
- **Criteria:**
  - [x] `npm run build` completes without TS errors. Evidence: `package.json:7`
  - [x] App deploys to GH Pages on push to `main`. Evidence: `.github/workflows/deploy.yml`
  - [x] Preview deploys on PR branches. Evidence: `.github/workflows/preview.yml`
  - [x] Preview cleaned up on branch delete. Evidence: `.github/workflows/cleanup-preview.yml`
  - [ ] No test suite — gap to close if correctness regressions appear.
