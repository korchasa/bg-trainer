# SRS

## 1. Intro
- **Desc:** bg-trainer — gamified grammar trainer for Bulgarian A0 learners. UI in Russian or Ukrainian (user-selectable). Single React/TS codebase shipped as 3 surfaces: web (GitHub Pages, fully free), iOS (Capacitor WKWebView shell, freemium IAP), Android (Capacitor WebView shell, freemium IAP). Mobile gating: 3 of 8 lessons free, $4.99 lifetime unlock for the rest.
- **Def/Abbr:** SPA = Single Page App. Engine = interaction component for one quiz type. Mode = one drill config (data + engine). Category = group of related modes. Session = one playthrough of N questions (N = `SESSION_SIZE_BY_PACE[pace]`). Lesson = textbook unit grouping a curated list of modes. Pace = user-selected session length (`quick`/`standard`/`deep`). Round = 3 consecutive N-question games from one lesson (N = pace size). IAP = In-App Purchase. KVS = `NSUbiquitousKeyValueStore` (iCloud key-value sync). Tier = lesson access class (`free` | `pro`).

## 2. General
- **Context:** Self-study tool for East-Slavic speakers (RU/UK) at A0. No accounts, no backend. All state is client-side. Shipped as web (GitHub Pages, free), native iOS (Capacitor WKWebView shell, freemium IAP), native Android (Capacitor WebView shell, freemium IAP). Freemium gate is mobile-only; web ignores tier.
- **Assumptions/Constraints:**
  - Modern evergreen browser with `localStorage` and ES2020+.
  - Mobile-first, max-width `md`, portrait-friendly.
  - Static hosting for web (GitHub Pages at base `/bg-trainer/`); iOS/Android builds use relative base `./`.
  - iOS deployment target 15.0+, Bundle ID `dev.korchasa.bgtrainer`, Capacitor 8.
  - Android minSdk 24 (Android 7.0), targetSdk 34, package `dev.korchasa.bgtrainer`, Capacitor 8.
  - IAP via RevenueCat (free tier ≤ $2.5k MTR/mo). Single non-consumable product `bgtrainer_pro_lifetime`.
  - No server, no analytics backend, no auth.
  - i18n: 2 locales (`ru`, `uk`), client-side only, no external i18n library.

## 3. Functional Reqs

### 3.1 FR-MENU
- **Desc:** Entry screen = list of lessons. Lessons carry a curated `modeIds` list and a `tier`. Available lessons open a per-lesson screen; upcoming lessons (`available=false`) shown disabled with "Скоро" label. On iOS/Android, tapping a `tier="pro"` lesson while Pro is locked routes to paywall (FR-PAYWALL); the tile shows lock icon + price. On web, all `available` lessons are tappable regardless of `tier`.
- **Scenario:** User opens app → sees lessons list → taps available+unlocked lesson → lesson screen with round button + grid of lesson's games → taps a game → game starts. Free user on mobile taps pro lesson → paywall.
- **Acceptance:**
  - [x] Lessons list rendered with two sections (available / upcoming). Evidence: `src/components/screens/LessonsScreen.tsx:16-62`, `src/data/lessons.ts`
  - [x] Only `available=true` lessons are tappable. Evidence: `src/App.tsx:89-94`, `src/components/screens/LessonsScreen.tsx:35-52`
  - [x] Lesson screen lists its modes + primary "Раунд" button. Evidence: `src/components/screens/LessonScreen.tsx`
  - [ ] Mobile build: pro+locked lesson tile shows lock + price; tap → paywall. Web: tier ignored.

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
- **Desc:** 8 lessons aligned with textbook `documents/lessons/lesson-1..8.md`. Each lesson has `id`, `num`, `title`, `modeIds[]`, `available`, `tier`. Lessons 1–4 are fully playable (`available=true`); lessons 5–8 are stubs (`available=false`, "Скоро"). Tier split for mobile gating (FR-FREEMIUM): L1–L3 = `free`, L4–L8 = `pro`. Web ignores tier.
- **Scenario:** User picks lesson 1 → sees games for L1 grammar (съм, казвам се, говоря, имам/нямам, страна→язык, национальность, профессия, приветствия, ответные реплики, Как си, Това е/са, предметы, нито/и, нали, ли-вопрос, отрицание). User picks lesson 2 → sees games for L2 grammar (род, артикль, мн.ч., согласование прил., полные притежательные, антонимы, предлоги места, има/няма, един/една/едно, счётная форма, Ето го/я/ги, словарь комнаты, север→северен). User picks lesson 3 → sees games for L3 (жильё, семья, краткие притежательные ми/ти/му/й/ни/ви/им/си, артикль+родство, показательные този/онзи, живея/зная/следвам/занимавам се, этажность, дни/месяцы, наречия места, числа 11–1000, порядковые, «на кого», время, вопросительные, даты). User picks lesson 4 → sees games for L4 (спряжения I/II/III: чета, уча, казвам, оправям, правя + ям; возвратный глагол мия се; словарь распорядка дня; время суток и указатели прошлого; частотные наречия; никога + не; антонимы рано/късно, бързо/бавно, често/рядко, влизам/излизам; предлоги времени в / преди / след / към / около / до / от / между; часы «Часът е…»; прошедшее бях; будущее ще бъда / няма да бъда).
- **Acceptance:**
  - [x] `LESSONS` defined with 8 entries; L1, L2, L3, L4 `available=true`. Evidence: `src/data/lessons.ts`
  - [x] L1 `modeIds` cover L1 grammar topics. Evidence: `src/data/lessons.ts:12-41`
  - [x] L2 `modeIds` cover L2 grammar topics (26 modes). Evidence: `src/data/lessons.ts:49-76`
  - [x] L3 `modeIds` cover L3 grammar topics (31 modes; pickFrom/pickOpt for recognition + type for productive recall + timed for automaticity + build/paradigm/match/odd). Evidence: `src/data/lessons.ts` (l3 block)
  - [x] L4 `modeIds` cover L4 grammar topics (28 modes: 6 conjugation paradigms + conj-type recognition + reflexive paradigm + routine vocab pickFrom/type + time-period + past-time markers + frequency + никога-transform + antonyms + time prepositions + clock pickFrom/type + бях pickOpt/type + ще бъда pick + ще/няма да + combined paradigm + build + hours build + match antonyms + match 1sg↔3sg + odd). Evidence: `src/data/lessons.ts` (l4 block), `src/data/index.ts` (l4_extra category)
  - [x] Each new L1 mode backed by ≥6 data items. Evidence: `src/data/lesson1.ts` (DATA_KAZVAM, DATA_GOVORYA, DATA_IMAM, DATA_NYAMAM, DATA_COUNTRY_LANG, DATA_NATIONALITY, DATA_PROFESSION, DATA_GREETING, DATA_NALI, DATA_NITO_I, DATA_KAK_SI, DATA_TOVA, DATA_OBJECTS, DATA_REPLY)
  - [x] Each new L2 mode backed by ≥10 data items. Evidence: `src/data/lesson2.ts` (DATA_AGREE, DATA_POSSESS_FULL, DATA_PREP_PLACE, DATA_DIR_ADJ, DATA_ANTONYMS, DATA_IMA_NYAMA, DATA_EDIN, DATA_COUNT, DATA_ETO, DATA_ROOM, DATA_ART_M_FULL_SHORT, DATA_NUMBERS, DATA_DVAMA, DATA_NYAMA_GO, DATA_SPACE, DATA_PRONOUN_ACC, DATA_KOLKO_KUDE, DATA_ROOM_PLURAL, DATA_MATCH_POSSESS, DATA_MATCH_ARTICLE_ROOM, DATA_ODD_L2, DATA_ROOM_BUILD, DATA_PARADIGM_POSSESS)
  - [x] Each new L3 mode backed by ≥6 data items. Evidence: `src/data/lesson3.ts` (DATA_L3_HOUSE, DATA_L3_FAMILY, DATA_L3_POSS_SHORT, DATA_L3_POSS_ART, DATA_L3_DEMO, DATA_L3_ZHIVEYA, DATA_L3_ZNAYA, DATA_L3_SLEDVAM, DATA_L3_FLOOR, DATA_L3_DAYS, DATA_L3_MONTHS, DATA_L3_LOC_ADV, DATA_L3_NUM, DATA_L3_ORD, DATA_L3_MATCH_FAMILY, DATA_L3_MATCH_SHORT_POSS, DATA_L3_BUILD, DATA_L3_PARADIGM, DATA_L3_ODD, DATA_L3_NA_KOGO, DATA_L3_TIME, DATA_L3_QWORDS, DATA_L3_ZANIMAVAM, DATA_L3_DATE_BUILD)
  - [x] Each new L4 mode backed by ≥6 data items. Evidence: `src/data/lesson4.ts` (DATA_L4_CHETA, DATA_L4_UCHA, DATA_L4_KAZVAM, DATA_L4_OPRAVYAM, DATA_L4_PRAVYA, DATA_L4_YAM, DATA_L4_CONJ_TYPE, DATA_L4_MIYA_SE, DATA_L4_REFL_VOCAB, DATA_L4_TIME_PERIOD, DATA_L4_PAST_TIME, DATA_L4_FREQ, DATA_L4_NEVER, DATA_L4_ANT, DATA_L4_PREP_TIME, DATA_L4_HOURS, DATA_L4_HOURS_TYPE, DATA_L4_BYAH, DATA_L4_BYAH_TYPE, DATA_L4_SHTE_BADA, DATA_L4_SHTE_NEG, DATA_L4_PARADIGM, DATA_L4_BUILD, DATA_L4_HOURS_BUILD, DATA_L4_MATCH_ANT, DATA_L4_MATCH_CONJ, DATA_L4_ODD)
  - [x] Data split into per-lesson modules with composition root. Evidence: `src/data/index.ts`, `src/data/lesson1.ts`, `src/data/lesson2.ts`, `src/data/lesson3.ts`, `src/data/lesson4.ts`
  - [ ] `Lesson.tier: "free" | "pro"` field added; L1–L3 = `free`, L4–L8 = `pro`.

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

### 3.18 FR-IOS-SHELL
- **Desc:** Native iOS shell via Capacitor 8 wrapping the same React SPA. Target iOS 15.0+. Bundle ID `dev.korchasa.bgtrainer`. Shared codebase with web; iOS build uses relative asset base (`./`). WKWebView hosts the app at `capacitor://localhost`.
- **Scenario:** `npm run ios:sync` rebuilds web assets with relative base and copies them into `ios/App/App/public/`. Xcode opens the project, runs it on simulator or device.
- **Acceptance:**
  - [x] Capacitor core/cli/ios v8 installed. Evidence: `package.json:17-19`
  - [x] `capacitor.config.ts` with `appId`, `appName`, `webDir=dist`. Evidence: `capacitor.config.ts`
  - [x] `build:ios`, `ios:sync`, `ios:open` npm scripts. Evidence: `package.json:10-12`
  - [x] iOS Xcode project generated at `ios/App/`. Evidence: `ios/App/App.xcodeproj/project.pbxproj`
  - [x] UIScene lifecycle adopted (eliminates ~20s cold-start stall on iOS 17+). Evidence: `ios/App/App/SceneDelegate.swift`, `ios/App/App/AppDelegate.swift:48-52`, `ios/App/App/Info.plist:29-46`
  - [x] Safe-area insets respected via `env(safe-area-inset-*)` + `contentInset: 'never'`. Evidence: `src/index.css:10-21`, `capacitor.config.ts:7-10`
  - [x] Container sized via `height: 100%` chain (no `100vh`). Evidence: `src/index.css:5-8`, `src/App.tsx:194,218,226`
  - [x] Inline splash in HTML shown until React mounts. Evidence: `index.html:11-22`, `src/main.tsx:15-17`
  - [x] Analytics screen code-split via `React.lazy` (main bundle 360 KB / gzip 94 KB). Evidence: `src/App.tsx:1,14,309-315`

### 3.19 FR-IOS-APPSTORE
- **Desc:** Assets and metadata required for App Store submission. Blockers for `xcodebuild archive` + review.
- **Acceptance:**
  - [ ] AppIcon set (1024×1024 + 17 size variants) in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`.
  - [ ] `LaunchScreen.storyboard` replaced with branded white screen (prevents black flash pre-WebView).
  - [ ] `PrivacyInfo.xcprivacy` with API usage reasons (`UserDefaults` CA92.1; `FileTimestamp` C617.1 if applicable).
  - [ ] `ITSAppUsesNonExemptEncryption: false` in Info.plist.
  - [ ] Orientation locked to `UIInterfaceOrientationPortrait` only. Evidence target: `ios/App/App/Info.plist:35-40`
  - [ ] Apple Developer account active ($99/year); Bundle ID `dev.korchasa.bgtrainer` registered.
  - [ ] Code signing configured (automatic signing with team).
  - [ ] Publicly hosted Privacy Policy (localStorage-only, no data transmission).
  - [ ] App Store Connect listing: title, description (RU/UK/EN), keywords, Education category, 4+ rating, support URL.
  - [ ] Screenshots for iPhone 6.7" (1290×2796); optional 6.5" and 5.5" for older devices.
  - [ ] TestFlight build uploaded via `xcodebuild archive` + `xcodebuild -exportArchive` or `fastlane pilot`.

### 3.20 FR-IOS-UX
- **Desc:** Native-feel tweaks on top of the web UX.
- **Acceptance:**
  - [ ] `@capacitor/splash-screen` plugin for native splash during WebView load (replaces HTML splash for true cold start).
  - [ ] `@capacitor/status-bar` for programmatic status-bar style control (light/dark per screen).
  - [ ] `@capacitor/haptics` — light impact on correct/wrong answer; notification feedback on round completion.
  - [ ] Inter font self-hosted in `public/fonts/Inter-*.woff2` (removes runtime Google Fonts fetch; works offline).
  - [ ] Back-swipe gesture: either wire app navigation to `window.history` so WKWebView edge-swipe works, or disable `allowsBackForwardNavigationGestures` in `CAPBridgeViewController` config.
  - [ ] `prefers-reduced-motion` honored (disable auto-advance animations).

### 3.21 FR-IOS-STORAGE
- **Desc:** Migrate persistent state off `localStorage` to survive iOS "Offload Unused Apps" and WebKit cache eviction. Keys unchanged; adapter provides fallback for web build.
- **Scenario:** On first launch after upgrade, app reads legacy `localStorage` keys, writes them into `@capacitor/preferences`, deletes legacy keys. Subsequent reads/writes hit Preferences (native) or `localStorage` (web).
- **Acceptance:**
  - [ ] `@capacitor/preferences` plugin installed.
  - [ ] Storage adapter with unified API for web (localStorage) and native (Preferences).
  - [ ] One-time migration for keys `bg-trainer-v3`, `bg-trainer-mastery-v1`, `bg-trainer-pace-v1`, `bg-trainer-lang-v1`.
  - [ ] History/mastery survive app backgrounding + device storage pressure.
  - [ ] Documents folder or `NSUserDefaults` included in iTunes/iCloud backup (non-`WebKit/` location).

### 3.22 FR-IOS-POLISH
- **Desc:** Optional native-integration niceties.
- **Acceptance:**
  - [ ] Dark mode: either opt-out via `UIUserInterfaceStyle: Light` in Info.plist, or add `prefers-color-scheme: dark` CSS variants.
  - [ ] iPad layout: either drop iPad (`TARGETED_DEVICE_FAMILY = "1"`) or widen container past `max-w-md` on `min-width: 768px`.
  - [ ] VoiceOver labels on answer tiles, progress, navigation buttons.
  - [ ] Dynamic Type: respect system font size via `font-size: max(1rem, env(safe-area-inset-top)*0 + ...)` or rem-based scaling.
  - [ ] Crash reporting (Sentry or Firebase Crashlytics) for production builds.

### 3.23 FR-IOS-CICD
- **Desc:** Automated build + TestFlight delivery on release tags.
- **Acceptance:**
  - [ ] GitHub Actions workflow `ios-release.yml` triggered on tag `v*`.
  - [ ] `npm run build:ios && cap sync ios && xcodebuild archive -exportArchive` producing `.ipa`.
  - [ ] App Store Connect API key stored as GitHub secret; upload via `fastlane pilot` or `xcrun altool`.
  - [ ] Auto-bump `CURRENT_PROJECT_VERSION` (build number) from CI run number.
  - [ ] `MARKETING_VERSION` sourced from git tag.

### 3.9 FR-NAV
- **Desc:** Screens: `lessons` (root), `lesson`, `game`, `results`, `analytics`, `paywall` (mobile only). Flow: `lessons → lesson → game → results → lesson`. Back from `game` during a round opens an inline confirm bar. Tap on locked pro lesson (mobile) → `paywall`; close paywall → back to `lessons`.
- **Acceptance:**
  - [x] Screen state owned by `App.tsx`. Evidence: `src/App.tsx:29-38`
  - [x] Initial screen on load = `lessons`. Evidence: `src/App.tsx:29`
  - [x] Back during round shows `ConfirmBar` instead of browser confirm. Evidence: `src/App.tsx:114-129,190-198`
  - [x] `NavHeader` + `BackButton` provide navigation. Evidence: `src/components/ui/NavHeader.tsx`, `src/components/ui/BackButton.tsx`
  - [ ] `paywall` screen registered in mobile builds; not reachable on web.

### 3.24 FR-FREEMIUM
- **Desc:** Mobile-only content gating. `Lesson.tier: "free" | "pro"`. `free` lessons (L1–L3) always playable. `pro` lessons (L4–L8) gated on iOS/Android: tap when Pro is locked → paywall (FR-PAYWALL). Web ignores `tier` entirely — all `available` lessons playable everywhere on web. Tier is data, not platform-conditional content; only the gate is platform-conditional. Analytics never filters by tier — history of pro-tier plays (e.g., from web, or after subsequent purchase) always visible regardless of current platform/state.
- **Scenario:** Free user on iOS taps L4 → paywall ($4.99 + Restore). Same user on web taps L4 → game starts. After purchase on iOS, all iOS devices on same Apple ID unlock; Android requires separate purchase (no cross-platform IAP).
- **Acceptance:**
  - [ ] `Lesson.tier: "free" | "pro"` in `src/types.ts`.
  - [ ] L1, L2, L3 set `tier="free"`; L4–L8 set `tier="pro"` in `src/data/lessons.ts`.
  - [ ] Build-time platform flag (`VITE_PLATFORM=web|ios|android`) drives gate enforcement; web build short-circuits to "always free".
  - [ ] iOS/Android: tapping pro lesson when `proUnlocked=false` → `screen="paywall"`.
  - [ ] Analytics shows entries for all lessons regardless of current tier or platform.

### 3.25 FR-IAP
- **Desc:** RevenueCat SDK on iOS and Android. One non-consumable product `bgtrainer_pro_lifetime` (~$4.99 USD, App Store tier 5; €4.99 EUR equivalent). Pro entitlement (`pro`) cached locally; offline use respects last known status. Restore Purchases reachable from paywall and from analytics screen settings affordance. Web build is IAP no-op.
- **Acceptance:**
  - [ ] RevenueCat project configured; product `bgtrainer_pro_lifetime` registered in App Store Connect and Google Play Console under matching SKU.
  - [ ] `@revenuecat/purchases-capacitor` plugin installed.
  - [ ] App initializes RevenueCat with platform-specific public API key on cold start (iOS/Android only).
  - [ ] `proUnlocked = customerInfo.entitlements.active["pro"] !== undefined`, persisted to local storage as backup.
  - [ ] Purchase flow: paywall "Купить" → `Purchases.purchasePackage(pkg)` → on success update `proUnlocked` → close paywall → unlock taps.
  - [ ] Restore flow: triggers `Purchases.restorePurchases()`; user-visible toast on success/failure.
  - [ ] Offline tolerance: cached `proUnlocked` honored when RevenueCat fetch fails; verified at next online launch.
  - [ ] Web build: IAP service is a stub returning `proUnlocked=true` (web is fully free).

### 3.26 FR-PAYWALL
- **Desc:** Paywall screen on iOS/Android shown when free user taps a pro lesson, or via "Pro" affordance on analytics. Lists Pro benefits (L4–L8 access + cross-device sync), one-button purchase showing localized price from RevenueCat, Restore Purchases link, EULA + Privacy Policy links (App Store mandatory).
- **Acceptance:**
  - [ ] `PaywallScreen` component rendered when `screen="paywall"`.
  - [ ] Localized in `ru`/`uk` via existing `useI18n`.
  - [ ] Buy button shows `Package.product.priceString` (currency-formatted by store).
  - [ ] Restore Purchases button always visible (Apple guideline 3.1.1).
  - [ ] Locked-lesson tile on `LessonsScreen` (mobile only) shows lock icon + price hint.
  - [ ] EULA + Privacy Policy links open in-app browser or external browser.
  - [ ] Web does not render paywall.

### 3.27 FR-ANDROID-SHELL
- **Desc:** Native Android shell via Capacitor 8 wrapping the React SPA. minSdk 24, targetSdk 34, package `dev.korchasa.bgtrainer`. Single Activity (`MainActivity`) hosting the WebView at `https://localhost`. Shared codebase with web/iOS; same `VITE_BASE_PATH=./` build.
- **Scenario:** `npm run android:sync` rebuilds web assets with relative base and copies to `android/app/src/main/assets/public/`. Android Studio opens project, runs on emulator or device.
- **Acceptance:**
  - [ ] `@capacitor/android` v8 added.
  - [ ] `build:android`, `android:sync`, `android:open` npm scripts.
  - [ ] Android Studio project at `android/`.
  - [ ] Edge-to-edge layout respects `WindowInsets` (parity with iOS safe-area handling).
  - [ ] Status-bar style controlled (light content on dark background).
  - [ ] Hardware back-button maps to in-app navigation (or default WebView back).
  - [ ] App icon set in `android/app/src/main/res/mipmap-*/` (adaptive foreground + background).

### 3.28 FR-ANDROID-PLAYSTORE
- **Desc:** Assets and metadata required for Google Play Console submission.
- **Acceptance:**
  - [ ] Google Play Console developer account ($25 one-time).
  - [ ] Adaptive launcher icons (foreground + background layers, 108×108 dp).
  - [ ] Feature graphic 1024×500.
  - [ ] Phone screenshots (320–3840 px, 16:9 to 9:16).
  - [ ] Short description ≤80 chars; full description ≤4000 chars (RU/UK/EN).
  - [ ] Publicly hosted Privacy Policy URL.
  - [ ] Data Safety form completed (no data collection beyond local storage + IAP receipts).
  - [ ] Content rating questionnaire (target: Everyone).
  - [ ] Internal Testing → Closed Testing → Production rollout.

### 3.29 FR-ANDROID-CICD
- **Desc:** Automated Android build + Play Store delivery on release tags.
- **Acceptance:**
  - [ ] GitHub Actions workflow `android-release.yml` triggered on tag `v*`.
  - [ ] `./gradlew bundleRelease` produces signed `.aab`.
  - [ ] Signing keystore stored as base64 GitHub secret + passwords in secrets.
  - [ ] `versionCode` auto-bumped from CI run number; `versionName` from git tag.
  - [ ] Upload via `gradle-play-publisher` (default track: Internal Testing).

### 3.30 FR-SYNC-PAID
- **Desc:** Optional cross-device sync of progress (history + mastery + pace + lang) for Pro users only. Per-platform native sync; no backend; no cross-platform iOS↔Android sync. Web unaffected (always local). Conflict resolution: last-write-wins per item (mastery: max `lastTs`; history: dedupe by `ts`).
- **iOS:** Mirror persistent state to `NSUbiquitousKeyValueStore` (iCloud KVS). Quotas: 1 MB total, 1024 keys, ≤ 1 MB per value. Active only when user signed into iCloud and Pro entitlement true.
- **Android:** Use Auto Backup to Google Drive (manifest `android:allowBackup="true"`, `fullBackupContent` rules covering Capacitor `Preferences` SharedPrefs). Quota: 25 MB per app per Google account.
- **Acceptance:**
  - [ ] iCloud KVS bridge plugin installed (custom Capacitor plugin or community plugin).
  - [ ] On Pro unlock event, history + mastery + pace + lang keys mirrored to KVS on every write.
  - [ ] On launch (Pro active), KVS values reconciled with local: max `lastTs` wins per mastery item; history merged + deduped by `ts`; pace/lang last-write-wins by KVS metadata.
  - [ ] Free users on iOS: zero KVS writes.
  - [ ] Android `fullBackupContent` rules at `android/app/src/main/res/xml/backup_rules.xml` include Capacitor `Preferences` SharedPrefs.
  - [ ] Auto Backup verified via `adb shell bmgr backupnow <package>`.
  - [ ] Depends on FR-IOS-STORAGE (preferences abstraction must precede sync layer).

## 4. Non-Functional
- **Perf:** Initial bundle small enough for mobile networks (Vite tree-shake + code-split). Interaction latency < 50ms on mid-range mobile.
- **Reliability:** `localStorage` failures (quota, disabled) must not crash the app — silent no-op. Evidence: `src/utils/history.ts:17, 23`.
- **Sec:** No PII, no external API, no user auth. Static assets only.
- **Scale:** Single user per browser. Max 200 session records.
- **UX:** Mobile-first, accent `#E60023`, dark `#111111`, centered `md` container.

## 5. Interfaces
- **UI:** Custom React components. No external UI library. Tailwind utility classes.
- **Storage:** Browser `localStorage` JSON-serialized `HistoryEntry[]`. Key `bg-trainer-v3`. Mobile target: migrate to `@capacitor/preferences` (FR-IOS-STORAGE) + cloud sync for Pro (FR-SYNC-PAID).
- **IAP:** RevenueCat SDK (`@revenuecat/purchases-capacitor`). Single non-consumable product `bgtrainer_pro_lifetime` ($4.99 / €4.99). Web stub returns unlocked.
- **Deploy:**
  - **Web:** GitHub Pages. Vite base path `/bg-trainer/`. Branch previews at `/bg-trainer/preview/{branch}/`. All lessons free.
  - **iOS:** Capacitor-wrapped WKWebView. Xcode project at `ios/App/`. Build via `npm run ios:sync` + `xcodebuild`. Distribution via TestFlight / App Store. Freemium IAP (FR-FREEMIUM, FR-IAP).
  - **Android:** Capacitor-wrapped Android WebView. Gradle project at `android/`. Build via `npm run android:sync` + `./gradlew bundleRelease`. Distribution via Google Play Console (Internal → Closed → Production). Freemium IAP (FR-FREEMIUM, FR-IAP).

## 6. Acceptance
- **Criteria:**
  - [x] `npm run build` completes without TS errors. Evidence: `package.json:7`
  - [x] App deploys to GH Pages on push to `main`. Evidence: `.github/workflows/deploy.yml`
  - [x] Preview deploys on PR branches. Evidence: `.github/workflows/preview.yml`
  - [x] Preview cleaned up on branch delete. Evidence: `.github/workflows/cleanup-preview.yml`
  - [ ] No test suite — gap to close if correctness regressions appear.
