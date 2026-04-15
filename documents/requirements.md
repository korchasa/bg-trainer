# SRS

## 1. Intro
- **Desc:** bg-trainer — browser-based gamified grammar trainer for Bulgarian A0 learners. UI in Russian or Ukrainian (user-selectable). Single-page React app hosted on GitHub Pages.
- **Def/Abbr:** SPA = Single Page App. Engine = interaction component for one quiz type. Mode = one drill config (data + engine). Category = group of related modes. Session = one playthrough of N questions (N = `SESSION_SIZE_BY_PACE[pace]`). Lesson = textbook unit grouping a curated list of modes. Pace = user-selected session length (`quick`/`standard`/`deep`). Round = 3 consecutive N-question games from one lesson (N = pace size).

## 2. General
- **Context:** Self-study tool for East-Slavic speakers (RU/UK) at A0. No accounts, no backend. All state is client-side.
- **Assumptions/Constraints:**
  - Modern evergreen browser with `localStorage` and ES2020+.
  - Mobile-first, max-width `md`, portrait-friendly.
  - Static hosting only (GitHub Pages at base `/bg-trainer/`).
  - No server, no analytics backend.
  - i18n: 2 locales (`ru`, `uk`), client-side only, no external i18n library.

## 3. Functional Reqs

### 3.1 FR-MENU
- **Desc:** Entry screen = list of lessons. Lessons carry a curated `modeIds` list. Available lessons open a per-lesson screen; upcoming lessons shown disabled with "Скоро" label.
- **Scenario:** User opens app → sees lessons list → taps available lesson → lesson screen with round button + grid of lesson's games → taps a game → game starts.
- **Acceptance:**
  - [x] Lessons list rendered with two sections (available / upcoming). Evidence: `src/components/screens/LessonsScreen.tsx:16-62`, `src/data/lessons.ts`
  - [x] Only `available=true` lessons are tappable. Evidence: `src/App.tsx:89-94`, `src/components/screens/LessonsScreen.tsx:35-52`
  - [x] Lesson screen lists its modes + primary "Раунд" button. Evidence: `src/components/screens/LessonScreen.tsx`

### 3.2 FR-GAME-SESSION
- **Desc:** Session = N questions from the selected mode's data, where N = `SESSION_SIZE_BY_PACE[pace]` (see FR-PACE). `qsTotal` is fixed at session start. Wrong answers are re-queued 3–5 positions later within the same session (`retryBuffer`, non-mutating). Progress UI and history use `answered / qsTotal`. `errors` counts unique wrong indices (repeat-fails on the same item do not increment).
- **Scenario:** User plays → answers `qsTotal` questions (some repeated via re-queue) → `ResultsScreen` shows score/errors/time (single game) or round aggregates.
- **Acceptance:**
  - [x] Session size = `SESSION_SIZE_BY_PACE[pace]` for both single and round games. Evidence: `src/utils/sliceData.ts:6-33`, `src/App.tsx:199-201`, `src/constants.ts:10-14`
  - [x] `useGame` tracks `cur`, `sel`, `corr`, `reaction`, `score`, `answered`, `qsTotal`. Evidence: `src/hooks/useGame.ts:27-35,110-120`
  - [x] Wrong answers re-queued via `retryBuffer` without mutating `qs`. Evidence: `src/hooks/useGame.ts:39,85-89,43-55`
  - [x] Progress component reads `answered/qsTotal`. Evidence: `src/components/engines/PickEngine.tsx:32`, `src/components/engines/PickOptEngine.tsx:33`, `src/components/engines/PickFromEngine.tsx:38`, `src/components/engines/TimedEngine.tsx:60`, `src/components/engines/NegEngine.tsx:41`
  - [x] Unique-index error counting via `errSet: Set<number>`. Evidence: `src/hooks/useGame.ts:29,87`
  - [x] On completion → `onComplete(score, time, errors)` fires once. Evidence: `src/hooks/useGame.ts:59-63`

### 3.10 FR-LESSONS
- **Desc:** 8 lessons aligned with textbook `documents/lessons/lesson-1..8.md`. Each lesson has `id`, `num`, `title`, `modeIds[]`, `available`. Lesson 1 is fully playable in debug scope; lessons 2–8 show as "Скоро" placeholders.
- **Scenario:** User picks lesson 1 → sees 19 games specific to lesson-1 content (съм, казвам се, говоря, имам/нямам, страна→язык, национальность, профессия, приветствия, ответные реплики, Как си, Това е/са, предметы, нито/и, нали, ли-вопрос, отрицание).
- **Acceptance:**
  - [x] `LESSONS` defined with 8 entries; only L1 `available=true`. Evidence: `src/data/lessons.ts:3-38`
  - [x] L1 `modeIds` cover L1 grammar topics. Evidence: `src/data/lessons.ts:9-29`
  - [x] Each new L1 mode backed by ≥6 data items. Evidence: `src/data/index.ts` (DATA_KAZVAM, DATA_GOVORYA, DATA_IMAM, DATA_NYAMAM, DATA_COUNTRY_LANG, DATA_NATIONALITY, DATA_PROFESSION, DATA_GREETING, DATA_NALI, DATA_NITO_I, DATA_KAK_SI, DATA_TOVA, DATA_OBJECTS, DATA_REPLY)

### 3.11 FR-ROUND
- **Desc:** Round = `ROUND_GAMES` (=3) random games from a lesson, each of `SESSION_SIZE_BY_PACE[pace]` questions, played consecutively without returning to menu. Round size is fixed at start (snapshot `size` into `RoundState`), so changing pace mid-round has no effect. On completion, one aggregated `HistoryEntry` written with `mode="round:<lessonId>"`, `round=true`, `qsTotal = ROUND_GAMES × size`. Single results screen shows summed score/time/errors.
- **Scenario:** User picks pace → taps "Раунд" → plays 3 games in sequence → results screen with sums → history shows one `round:l1` entry.
- **Acceptance:**
  - [x] Round state machine advances through queue without screen change. Evidence: `src/App.tsx`
  - [x] `RoundState.size` snapshots pace at start; per-game qsTotal uses `round.size`. Evidence: `src/App.tsx` (`startRound`, `handleComplete`)
  - [x] On completion writes single history entry with `round=true`, `qsTotal`, `lessonId`. Evidence: `src/App.tsx` (`handleComplete`)
  - [x] Abort via inline `ConfirmBar` (not `window.confirm`). Evidence: `src/components/ui/ConfirmBar.tsx`, `src/App.tsx`

### 3.16 FR-PACE
- **Desc:** User selects session pace on `LessonScreen`: `quick`=3, `standard`=5 (default), `deep`=8 questions per game. Pace applies uniformly to single games and rounds (round total = `ROUND_GAMES × size`). Persisted in `localStorage` under `bg-trainer-pace-v1`. Scientific anchors: Cowan WM (4±1), Cepeda distributed practice, Duolingo 5-min microlearning norm, Bjork desirable difficulty (~80% success).
- **Scenario:** User opens lesson → sees 3-button pace segment with per-pace question count → taps pace → choice persists across reloads → subsequent round/game uses selected size.
- **Acceptance:**
  - [x] `SessionPace` type = `"quick" | "standard" | "deep"`. Evidence: `src/types.ts`
  - [x] `SESSION_SIZE_BY_PACE = {quick:3, standard:5, deep:8}`. Evidence: `src/constants.ts`
  - [x] Pace persisted under `bg-trainer-pace-v1`, default `standard`. Evidence: `src/utils/pace.ts`, `src/constants.ts`
  - [x] 3-button pace selector on `LessonScreen` shows question count. Evidence: `src/components/screens/LessonScreen.tsx`
  - [x] Round button label reflects pace (`3 × N = 3N вопросов`). Evidence: `src/components/screens/LessonScreen.tsx`

### 3.3 FR-SCORING
- **Desc:** Correct = +10 pts. Timed mode adds speed bonus. Wrong answer increments error count, 0 pts. Second answer on the same question ignored.
- **Acceptance:**
  - [x] Base +10 pts on correct. Evidence: `src/hooks/useGame.ts:36`
  - [x] Speed bonus applied in `TimedEngine` via `extraPts`. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useGame.ts:31`
  - [x] Duplicate selections rejected. Evidence: `src/hooks/useGame.ts:32`

### 3.4 FR-ENGINES
- **Desc:** 11 engine types implement distinct interaction patterns. Multiple-choice engines hide L1 hints by default and expose a "Подсказка" reveal button; reveal sets `hinted=true` which is forwarded to `onItemAnswer` and softens mastery effects (see FR-MASTERY).
- **Acceptance:**
  - [x] `pick` — 3 shuffled options, hint-on-demand. Evidence: `src/components/engines/PickEngine.tsx:11,18,39-45`
  - [x] `timed` — timed quiz + speed bonus, hint-on-demand. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useTimer.ts`
  - [x] `pickOpt` — fixed option set (articles, gender), hint-on-demand. Evidence: `src/components/engines/PickOptEngine.tsx`
  - [x] `pickFrom` — pick correct form from decoys, hint-on-demand. Evidence: `src/components/engines/PickFromEngine.tsx`
  - [x] `negation` — build negation from word tiles. Evidence: `src/components/engines/NegEngine.tsx`
  - [x] `build` — drag-to-order sentence. Evidence: `src/components/engines/BuildEngine.tsx`
  - [x] `li` — tap position to insert particle "ли". Evidence: `src/components/engines/LiEngine.tsx`
  - [x] `type` — keyboard input with whitelist normalization (trim, lowercase, whitespace collapse — no char substitutions). Evidence: `src/components/engines/TypeEngine.tsx:13-16`
  - [x] `match` — tap-pair 2-column matching, relational encoding. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] `odd` — tap the intruder word, category-boundary drill. Evidence: `src/components/engines/OddOneOutEngine.tsx`
  - [x] `paradigm` — 6-slot paradigm completion via tile bank. Evidence: `src/components/engines/ParadigmEngine.tsx`

### 3.4.1 FR-MATCH
- **Desc:** Relational encoding: user taps a left-column tile then a right-column tile to pair them. Correct pairs lock green; wrong attempts flash red on the two tapped cells and reset. Session ends when all pairs matched. Data: `MatchItem[]` = `{ left, right, hint }`. Score = +10 per first-try correct pair.
- **Acceptance:**
  - [x] Separate left/right state so flash-fail only lights the two tapped cells. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] Item answer event fired per attempt via `itemKey(pairs[selLeft])`. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] At least one mode: `match_country_lang`, `match_country_nat`, `match_profession`. Evidence: `src/data/index.ts`

### 3.4.2 FR-ODD
- **Desc:** Category-boundary drill. User sees 4 tiles and taps the one that does not belong. Correct → green, wrong → red + highlights correct. Session = `SESSION_SIZE_BY_PACE[pace]` items. Data: `OddItem[]` = `{ words, odd, hint, rule? }`.
- **Acceptance:**
  - [x] Engine reuses `useGame` via `DataItem[]` cast for scoring/retry parity. Evidence: `src/components/engines/OddOneOutEngine.tsx`
  - [x] At least one mode: `odd_mixed`. Evidence: `src/data/index.ts`

### 3.4.3 FR-PARADIGM
- **Desc:** Schema formation via whole-paradigm completion. User sees a verb + 6 pronoun rows + a shuffled form bank, taps a form to fill the next empty slot (taps a filled slot to return the form). When all 6 filled, engine marks each row green/red, reveals correct form under wrong rows, and advances. Score = +5 per correct slot. Data: `ParadigmItem[]` = `{ verb, pronouns, forms, hint, rule? }`.
- **Acceptance:**
  - [x] 6 pronoun slots, tile bank below, tap-fill + tap-unfill. Evidence: `src/components/engines/ParadigmEngine.tsx`
  - [x] Per-slot check + correct-form reveal on wrong rows. Evidence: `src/components/engines/ParadigmEngine.tsx`
  - [x] `paradigm_fill` mode over 6 verbs (съм, имам, нямам, искам, казвам се, говоря). Evidence: `src/data/index.ts`

### 3.13 FR-SCHED
- **Desc:** Session item selection uses an SRS-like scheduler (`pickDueItems`) over the mastery store. Items are scored by `(overdue + weakBonus_if_level<7)` where `dueAt = lastTs + DAY_MS · 2^level`; unseen items get top priority. The top-K (K = 2n) are shuffled and sliced to n to avoid monotone order. When mastery is empty or all scores are zero → fallback to `shuffle(items).slice(0, n)`. The scheduler is applied by `sliceData` when mastery is provided; Round sessions also use it.
- **Acceptance:**
  - [x] `pickDueItems(store, modeId, items, n, now)` selects by due/weak score with shuffled top-K. Evidence: `src/utils/mastery.ts:74-99`
  - [x] Shuffle fallback when all scores are zero. Evidence: `src/utils/mastery.ts:93`
  - [x] `sliceData(mode, size, mastery, now?)` uses scheduler when `mastery` is defined. Evidence: `src/utils/sliceData.ts:10-33`
  - [x] `App.tsx` passes current `mastery` to `sliceData` for both single-mode and round sessions. Evidence: `src/App.tsx:193-196`

### 3.14 FR-TYPE
- **Desc:** `TypeEngine` accepts keyboard input. Normalization is **whitelist-only**: `trim`, `toLowerCase`, collapse internal whitespace. No character substitutions — `ѝ` vs `и`, stress marks, punctuation kept intact to preserve orthographic distinctions. Submit blocked when normalized input is empty.
- **Acceptance:**
  - [x] Whitelist normalization only. Evidence: `src/components/engines/TypeEngine.tsx:13-16`
  - [x] Empty-after-normalize submit blocked. Evidence: `src/components/engines/TypeEngine.tsx:41-45`
  - [x] Registered in engine dispatch. Evidence: `src/components/engines/index.ts:10,22`
  - [x] At least one mode uses `type`: `sym_type`. Evidence: `src/data/index.ts:298`

### 3.15 FR-FEEDBACK-RULE
- **Desc:** Elaborative feedback: `DataItem.rule?` may carry a short rule explanation. On wrong answer, engines show the rule under the correct form in `Correction` (or inline for `PickEngine`). Required: rule strings defined for `DATA_SYM`, `DATA_IMAM`, `DATA_ISKAM`, `DATA_ARTICLE` (minimum).
- **Acceptance:**
  - [x] `DataItem.rule?: string` field exists. Evidence: `src/types.ts:26`
  - [x] `Correction` renders `rule` when provided. Evidence: `src/components/ui/Correction.tsx:1-10`
  - [x] Rules defined for core paradigms/articles. Evidence: `src/data/index.ts:3-10,12-19,21-28,30-54`

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
- **Desc:** Per-item mastery level (0–10) persisted in `localStorage` (key `bg-trainer-mastery-v1`). Independent from history. Update rule: correct `+1`, fast-correct (timed, within timer bonus) `+2`, wrong `−3`. Hinted answers soften the update: `ok+hinted = +0`, `fail+hinted = −1`. Lazy decay: correct answers on items untouched ≥7 days first drop 1 level, then apply reward. Speed-gate: `TimedEngine` disables the timer and speed bonus when the current item's level `< 5` to prevent System-1 guessing on undermastered items. Session item selection uses FR-SCHED (`pickDueItems`). Lesson-level aggregation: `ratio = sum(level) / (10 × totalItems)`. Lesson "полностью изучено" = ≥90% items at level ≥7 AND ≥60% at level 10.
- **Scenario:** User plays a mode → every answered item updates its level → `LessonsScreen` shows per-lesson progress bar + "K/M освоено · X%" → `LessonScreen` shows per-mode mini bar → `AnalyticsScreen` has separate reset for mastery.
- **Acceptance:**
  - [x] Mastery persisted under `bg-trainer-mastery-v1`, independent of `bg-trainer-v3`. Evidence: `src/utils/mastery.ts:4`, `src/constants.ts:7`
  - [x] Level bounded `[0, 10]`; correct `+1`, timed-fast `+2`, wrong `−3`. Evidence: `src/utils/mastery.ts:43-63`
  - [x] Hinted softening: `ok+hinted = +0`, `fail+hinted = −1`. Evidence: `src/utils/mastery.ts:51-62`
  - [x] Speed-gate: `TimedEngine` disables timer+bonus when item level < 5. Evidence: `src/components/engines/TimedEngine.tsx:25,32-43`
  - [x] Decay: stale-correct path reduces 1 level before reward. Evidence: `src/utils/mastery.ts:44,47`
  - [x] All 11 engines forward item identity via `onItemAnswer(itemId, ok, fast)`. Evidence: `src/hooks/useGame.ts:47-55`, `src/components/engines/PickEngine.tsx`, `src/components/engines/TimedEngine.tsx`, `src/components/engines/PickOptEngine.tsx`, `src/components/engines/PickFromEngine.tsx`, `src/components/engines/NegEngine.tsx`, `src/components/engines/BuildEngine.tsx`, `src/components/engines/LiEngine.tsx`, `src/components/engines/TypeEngine.tsx`, `src/components/engines/MatchEngine.tsx`, `src/components/engines/OddOneOutEngine.tsx`, `src/components/engines/ParadigmEngine.tsx`
  - [x] Mastery persisted once per session (on complete + on abort), not per answer. Evidence: `src/App.tsx:56-66,78-82,165,170`
  - [x] `LessonsScreen` shows progress bar + `K/M · X%`; mastered badge when criteria met. Evidence: `src/components/screens/LessonsScreen.tsx`
  - [x] `LessonScreen` shows per-mode mastery bars. Evidence: `src/components/screens/LessonScreen.tsx`
  - [x] `AnalyticsScreen` offers "Сбросить освоение" separate from history reset. Evidence: `src/components/screens/AnalyticsScreen.tsx`, `src/App.tsx:288`
  - [x] Existing `bg-trainer-v3` history preserved. Evidence: `src/constants.ts:7`, `src/utils/history.ts`

### 3.17 FR-LANG
- **Desc:** UI and L1 content available in 2 locales: `ru` (Russian) and `uk` (Ukrainian). User selects locale via segmented switcher on `LessonsScreen` header. Choice persists in `localStorage` under `bg-trainer-lang-v1`. First-run detection: `navigator.language.toLowerCase().startsWith("uk")` → `uk`, else `ru`. Bulgarian content (`q`, `answer`, `decoys`, `result`, `words`) is shared and never localized — Ukrainian/Russian only varies on `hint`, `rule`, `label`, `translation`, `Mode.label`/`desc`, `Category.name`, `Lesson.title`, `OK`/`FAIL` arrays, and UI strings. Resolved at render-time via `useI18n()` (`t`, `f`, `L`). Type-safe: `Localized<T> = Record<Locale, T>`; missing keys = compile error. Mid-session locale switch only re-resolves visible text — game state (`cur`, `corr`, `score`, `answered`) survives.
- **Scenario:** User opens app first time on UK browser → Ukrainian UI auto-selected. User taps `РУ` in switcher → all UI re-renders in Russian; choice saved. Reload → choice restored.
- **Acceptance:**
  - [x] `Locale = "ru" | "uk"`. Evidence: `src/i18n/types.ts:1`
  - [x] Locale persisted under `bg-trainer-lang-v1`; `navigator.language` fallback `uk` only when prefix `uk`. Evidence: `src/i18n/storage.ts`
  - [x] `LocaleProvider` mounted at root. Evidence: `src/main.tsx:8-10`
  - [x] `useI18n()` exposes `t`, `f`, `L`, `locale`, `setLocale`. Evidence: `src/i18n/context.tsx`
  - [x] UI strings dictionary has matching keys in both locales (compiler-enforced via `Record<StringKey, string>`). Evidence: `src/i18n/strings.ts`
  - [x] `Localized<T>` fields on `DataItem.hint/rule/label`, `BuildItem.translation`, `LiItem.translation`, `Mode.label/desc`, `Category.name`, `Lesson.title`. Evidence: `src/types.ts`
  - [x] `OK`/`FAIL` reactions are `Localized<string[]>`; passed into `useGame` via `reactions` prop. Evidence: `src/constants.ts:3-10`, `src/hooks/useGame.ts:23,95,99`
  - [x] Language switcher rendered on `LessonsScreen`. Evidence: `src/components/screens/LessonsScreen.tsx:28-43`
  - [x] `AnalyticsScreen` resolves mode label via `ALL_MODES.find(...).label` + `L()`, not raw modeId. Evidence: `src/components/screens/AnalyticsScreen.tsx:33-46`
  - [x] Glossary maintained. Evidence: `documents/i18n-glossary.md`
  - [x] `npm run build` passes. Evidence: build output zero TS errors.

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
