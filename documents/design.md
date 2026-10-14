# SDS

## 1. Intro
- **Purpose:** Describe the client-side architecture of bg-trainer: how screens, hooks, engines, and data combine to deliver quiz sessions and analytics.
- **Rel to SRS:** Implements FR-MENU, FR-GAME-SESSION, FR-RETRY, FR-SCORING, FR-ENGINES, FR-MATCH, FR-ODD, FR-PARADIGM, FR-BUILD, FR-FRAME, FR-FRAME-LADDER, FR-TYPE, FR-FEEDBACK-RULE, FR-TASK-MODEL, FR-HINT-MODAL, FR-QUESTION-PINNED, FR-FEEDBACK-CENTRED, FR-REACTION, FR-HISTORY, FR-ANALYTICS, FR-RESULTS, FR-NAV, FR-LESSONS, FR-ROUND, FR-PACE, FR-MASTERY, FR-SCHED, FR-LANG, FR-A11Y-TEXT, FR-A11Y-CONTRAST, FR-RESPONSIVE-LAYOUT, FR-IOS-SHELL, FR-IOS-UX, FR-IOS-STORAGE, FR-PAID. FR-PAID is met by absence: the app has no purchase, entitlement or tier layer, so every lesson is open on every platform.

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
    App --> Storage[(utils/storage\n localStorage / Capacitor Preferences)]
    Storage --> History[(bg-trainer-v3)]
    Storage --> Mastery[(bg-trainer-mastery-v1)]
    useGame -.native only.-> NativeUx[(utils/nativeUx\n haptics, splash, status bar)]
    Analytics --> History
    Lessons --> Mastery
    Lesson --> Mastery
    App --> Data[(data/index.ts\n + lesson1..8.ts)]
    App --> LessonsData[(data/lessons.ts)]
    App --> Slice[(utils/sliceData)]
  ```
- **Subsystems:**
  - **Shell (`App.tsx`):** screen router + session lifecycle + history persistence. No gating: every `available` lesson opens on every platform (FR-PAID).
  - **Platform flag (`utils/platform.ts`):** `PLATFORM: "web" | "ios" | "android"` from the `VITE_PLATFORM` build flag (default `"web"`), plus `IS_WEB` / `IS_IOS` / `IS_ANDROID` / `IS_NATIVE`. Only the storage adapter, the native UX adapter and the keyboard viewport branch on it; content and navigation are the same everywhere.
  - **Storage adapter (`utils/storage.ts`, FR-IOS-STORAGE):** one synchronous `getRaw` / `setRaw` / `removeRaw` API for every persisted key — `localStorage` on web, Capacitor Preferences behind an in-memory cache on native (§3.12).
  - **Native UX adapter (`utils/nativeUx.ts`, FR-IOS-UX):** haptics, native splash and status-bar style; every call is a no-op on web (§3.13).
  - **Keyboard viewport (`utils/keyboardViewport.ts`, FR-IOS-UX):** on iOS the shell follows the visual viewport so the keyboard cannot pan the nav header off screen (§3.13a).
  - **Engines (`components/engines/*`):** one React component per `EngineType`. Consumes `useGame`.
  - **State hooks (`hooks/*`):** `useGame` (scoring, advance, reaction), `useTimer` (countdown for timed mode).
  - **Data layer (`data/index.ts` + `data/lesson1.ts` + `data/lesson2.ts` + `data/lesson3.ts` + `data/lesson4.ts` + `data/lesson5.ts` + `data/lesson6.ts` + `data/lesson7.ts` + `data/lesson8.ts`):** exercises split per-lesson; `index.ts` is composition root — imports datasets from lesson files, re-exports via `export *`, defines `CATEGORIES` + `ALL_MODES`. Shared labels (`LABEL_M/F/N/PL`) live in `lesson1.ts` and are imported by later lessons. L10n fields stored as `Localized<string>`. Translation pairs inside `DataItem.q` use convention `"<ru> / <uk>"` — engines render via `Lq` helper which splits on " / " and picks side by current locale.
  - **Lessons layer (`data/lessons.ts`):** `LESSONS` array (8 textbook units, localized titles) + `LESSON_BY_ID`.
  - **Slicer (`utils/sliceData.ts`):** type-aware wrapper around `mode.data()` that shuffles+slices to round size while preserving `pickOpt.opts`.
  - **Persistence (`utils/history.ts`):** thin wrapper over the storage adapter with a 200-entry cap; a parse error reads as empty history.
  - **Mastery (`utils/mastery.ts`, `utils/itemKey.ts`):** per-item level store + stable item identity helper. Separate storage key `bg-trainer-mastery-v1`. `itemKey` uses Bulgarian-stable keys (`q` / `result` / `words.join("|")`); `paradigm` stores one record per form (`paradigmFormKey` → `<verb>#<i>`) and `itemCount` counts that mode in forms, so the level sum and the total it is divided by stay in the same unit. `migrateParadigmKeys` copies an old per-verb level onto each of its forms — both sides of the ratio grow by the same factor, so the displayed progress does not move.
  - **i18n (`src/i18n/*`):** `LocaleProvider` + `useI18n` hook expose `t` (plain UI strings), `f` (parametric strings), `L` (resolves `Localized<T>`), `Lq` (splits `"<ru> / <uk>"` convention in `DataItem.q`). `STRINGS`/`FORMATS` dictionaries enforce locale completeness via `Record<Locale, …>`. Locale persisted under `bg-trainer-lang-v1`; first-run detection from `navigator.language` (only literal `uk` prefix triggers UK).
  - **UI atoms (`components/ui/*`):** `AnswerBtn`, `Progress`, `Reaction`, `Correction`, `NavHeader`, `BackButton`, `TaskPrompt`, `InfoModal`.
  - **Hint channel (`hooks/useHintChannel.tsx`):** `HintProvider` context carrying the current question's hint from the engine to the header button (FR-HINT-MODAL).
  - **Screens (`components/screens/*`):** `LessonsScreen`, `LessonScreen`, `ResultsScreen`, `AnalyticsScreen` (lazy-loaded).

## 3. Components

### 3.1 App.tsx
- **Purpose:** Root component. Owns `screen`, `lessonId`, `modeId`, `round`, `result`, `history`, `showRef`. Renders the game header's two reference buttons and their modals (FR-HINT-MODAL): 💡 shown while `hintCh.content` is set, 📖 in verb modes outside a Round; both open `InfoModal`. Dispatches to screens/engines. Passes `currentMode.desc` as `prompt` and `currentMode.example` as `example` to the active engine, which renders both via `TaskPrompt` directly above the question in its centered block (FR-TASK-MODEL). Round machine: queue of 3 random `modeIds`, per-game completion accumulates totals; final game emits aggregated `HistoryEntry` with `mode="round:<lessonId>"`. Scroll: inner `max-w-md` wrapper is `overflow-y-auto no-scrollbar` (single scroll container for all screens); outer wrapper has `onWheel` forwarder that redirects wheel events from side gutters (viewport wider than `md`) into the inner scroll container.
- **Interfaces:** `screen: Screen`, lesson lookup via `data/lessons.ts`, mode lookup via `data/index.ts`, data slicing via `utils/sliceData.ts`, history r/w via `utils/history`.
- **Deps:** All screens, all engines, `data/index.ts`, `data/lessons.ts`, `utils/sliceData.ts`, `utils/history.ts`, `utils/shuffle.ts`, `types.ts`.

### 3.2 useGame hook
- **Purpose:** Encapsulate per-session state: `cur`, `sel`, `corr`, `reaction`, `score`, `answered`, `qsTotal`, `errorPending` + `answer()` + `advance()` + `dismissError()`. Owns `indexPlan`, `errSet`, `firstWrongRef`, `lockedRef` to drive immediate-retry-on-wrong, single-counted scoring/mastery/error per question.
- **Interfaces:** `useGame(qs, onComplete, reactions, pts=10, delay=1000, onItemAnswer?)`, where `onComplete` is the shared `SessionComplete = (score, time, errors, qsTotal) => void` — one type rather than twelve copies of the signature, so an argument added to it reaches every engine. `errors` and `qsTotal` are both in answers. `answer(val, correctVal, opts | extraPts)` where `opts = { extraPts?, hinted? }`. `onItemAnswer(itemId, ok, fast, hinted?)`. `dismissError()` clears visual state to allow another attempt at the same question without unsetting `firstWrongRef`.
- **Deps:** `types.DataItem`, `utils/shuffle` (`pickOK`), `utils/itemKey`. Not `pickFail`: a wrong answer belongs to the retry dialog, and every engine on this hook renders one.

### 3.2a Tailwind class names
- **Rule:** no class is assembled from a variable. Tailwind generates CSS by scanning source text, so `` `bg-[${ACCENT}]` `` produces no rule and fails silently — the element still carries a plausible class and the build succeeds.
- **How it hid:** three files (`AnswerBtn`, `NegEngine`, `LiEngine`) built their wrong-answer colour this way and all three looked right, because four other files spell `bg-[#E60023]`/`border-[#E60023]` out in full and those rules reach the bundle for everyone. Removing the last literal use elsewhere would have stopped «Вставь ли» turning red, with cause and effect in unrelated files.
- **Guard:** `scripts/classnames.ts` scans for an arbitrary-value bracket opened straight into an interpolation. Choosing between whole class strings stays legal — both are there for the scanner. `ACCENT` survives for inline `style` objects only, and says so at its definition.

### 3.3 useTimer hook
- **Purpose:** Countdown for `TimedEngine`, exposes remaining time and bonus calculation hook.
- **Deps:** None.

### 3.4 Engines (12)
- **Purpose:** Render one question and produce answer events for `useGame.answer()` (or directly, for engines with custom session shapes).
- **Interfaces:** Props `{ data, onComplete, onItemAnswer?, levelLookup?, prompt?, example? }` (shape varies slightly per engine). `prompt` = `Mode.desc`, `example` = `Mode.example`; both come from the single `<Engine>` dispatch in `App.tsx` and render through `TaskPrompt` on every question (FR-TASK-MODEL). `ParadigmEngine` takes no `example`: its pre-filled 1sg row is the model. Engine-specific data types (`DataItem`, `BuildItem`, `LiItem`, `MatchItem`, `OddItem`, `ParadigmItem`, `PickOptData`).
- **Hint channel:** The engines that carry an L1 hint (`pick`, `pickOpt`, `pickFrom`, `timed`, `type`, `frame`) keep no hint UI of their own. On every question change they `hintCh.publish({ hint, rule })` and on unmount `publish(null)`; at answer time they read `hintCh.wasUsed()` into `useGame.answer({ hinted })`, which reaches `onItemAnswer(..., hinted=true)` (FR-HINT-MODAL). The header renders the button and the modal. Engines that print the translation as part of the task itself (`negation`, `build`, `li`, `match`, `odd`, `paradigm`) publish nothing, so no lamp appears. `FrameEngine` publishes `null` when its item has no hint — which today is every frame item — so the same rule covers optional hints without a second code path.
- **Speed-gate:** `TimedEngine` receives `levelLookup(itemId)` and disables the timer + speed bonus when `level < 5`.
- **Normalization:** `TypeEngine` normalizes user input with a strict whitelist (trim + lowercase + whitespace collapse). No character substitutions.
- **Focus marker:** `LiEngine` parses `*word*` in `translation` and renders the wrapped word with underline — disambiguates which word is questioned when L1 word order hides focus.
- **Custom session shapes:**
  - `MatchEngine` — single board with all pairs; session ends when matched count == pairs.length. Score = +10 per first-try correct pair; errors counted as unique wrong-left ids.
  - `ParadigmEngine` — one item = one 6-slot paradigm; +5 per correct slot; advances on full fill.
  - `OddOneOutEngine` — uses `useGame` with a `DataItem[]` cast over `OddItem[]` to inherit retry/scoring.
  - `FrameEngine` (FR-FRAME, FR-FRAME-LADDER) — same `DataItem[]` cast over `FrameItem[]`. One item = one sentence the learner produces from an L1 translation; `data().step` decides the scaffolding (see §3.21). Load-bearing details: the next-empty slot is read from `filledRef`, not from state, so two taps in one React batch cannot target the same slot; `filled` is reset **during render** via a `filledFor` guard, because an effect commits one frame first and that frame paints the previous sentence's words into the new slots; the sentence-initial capital is applied by `cap()` at render, so the bank keeps one lower-case tile per word instead of a capitalised twin; and an accepted `alt` order is submitted to `useGame` **as the canonical string on both sides**, so variants work without teaching `useGame` about variants (`sel === canonical` then means "this attempt was right").
- **Deps:** `useGame` (most), `useTimer` (timed only), UI atoms.
- **List:** `PickEngine`, `TimedEngine`, `PickOptEngine`, `PickFromEngine`, `NegEngine`, `BuildEngine`, `LiEngine`, `TypeEngine`, `MatchEngine`, `OddOneOutEngine`, `ParadigmEngine`, `FrameEngine`.

### 3.5 ResultsScreen
- **Purpose:** Show session outcome: score, `errors/qsTotal`, time, accuracy. Offer "play again" / "menu".
- **Accuracy (FR-RESULTS):** `1 - errors / qsTotal` — the share answered right on the first attempt. It replaced `1 - errors / (errors + 8)`, whose 8 was a constant rather than the session's length: that formula could not reach 0, showed 50% for an eight-question `frame` session answered entirely wrong, and gave the same 73% to a 35-question `build` session with three errors and a three-item `paradigm` with three. The badge is chosen from the same share (🏆 ≥ 80%, 👍 ≥ 50%, 💪 below) rather than from points, because points per answer differ by mode — at 15 a piece the old 80-point trophy came for six answers right out of thirty-five, while at 10 a piece an eight-question mode needed all eight.
- **Deps:** `types.GameResult` (`score`, `time`, `errors`, `qsTotal`).

### 3.6 AnalyticsScreen
- **Purpose:** Aggregate history + render charts (Recharts).
- **Accuracy (FR-ANALYTICS):** same formula, summed over the entries that carry `qsTotal`. Entries written before the field existed are left out of both sides of the fraction and the figure reads `—`; they used to be assumed eight answers long, which turned a 35-answer session with 12 errors into 12 errors out of 8 and clamped it to 0%. The raw error card still counts every entry — a count needs no denominator.
- **Deps:** `recharts`, `utils/history.ts`, `constants.CHART_COLORS`.

### 3.7 UI atoms
- `AnswerBtn`, `AnswerGrid`, `Progress`, `Reaction`, `Correction`, `TaskPrompt` (instruction + «Образец» line), `ErrorDialog`, `InfoModal`, `TextSizeControl`, `NavHeader`, `BackButton`, `ConfirmBar` — small presentational components with Tailwind classes. `ConfirmBar` = bottom-anchored inline confirm panel (two buttons) used for round-abort.
- **InfoModal** = learner-opened reference sheet over the game (hint, verb table). Unlike `ErrorDialog` it has no accent frame and closes on a backdrop tap as well as the button, because nothing is being corrected (FR-HINT-MODAL).
- **NavHeader** right slot is `min-w-10 flex items-center justify-end gap-1` so it holds the two reference buttons side by side.
- **AnswerBtn** owns padding, min height and wrapping (`px-4 py-3 min-h-[3.5rem] break-words`). Call sites pass only font size — the earlier split, where four of five engines passed height alone, is what made text touch the borders (FR-A11Y-TEXT).
- **AnswerGrid** picks the column count from the longest option (≤5 chars → 3, ≤11 → 2, else 1). Every choice engine routes its options through it, so the rule lives in one place (FR-RESPONSIVE-LAYOUT).
- **TextSizeControl** = collapsed "Aa" button expanding to 4 options; sits next to the language switch on `LessonsScreen`.

### 3.8 LessonsScreen / LessonScreen
- **LessonsScreen:** root screen. Two sections: "Доступно" (available lessons, tappable) and "В разработке" (upcoming, disabled). Taps emit `onPickLesson(id)`. Renders per-lesson mastery progress bar + `K/M · X%`. Titles wrap (no truncation). Hosts the language and text-size controls.
- **LessonScreen:** lesson details. Primary button "Раунд" + the lesson's modes as full-width rows (icon, title, progress bar, `K/M · X%`). Pace = 3 single-line segments with the question count on its own row below. Taps emit `onPickGame(modeId)` / `onStartRound()`.
- **Deps:** `data/lessons.ts`, `data/index.ts` (`ALL_MODES`), `utils/mastery.ts`.

### 3.9 utils/mastery.ts
- **Purpose:** Persist per-item mastery levels and provide the SRS-like scheduler. Pure functions: `loadMastery`, `saveMastery`, `clearMastery`, `applyAnswer(store, modeId, itemId, ok, fast, now, hinted=false)`, `lessonStats`, `modeStats`, `pickDueItems(store, modeId, items, n, now)`.
- **Interfaces:** `MasteryStore = Record<modeId, Record<itemId, ItemMastery>>`; `ItemMastery = { level, lastTs, attempts }`.
- **Scheduler:** `pickDueItems` scores each item by `(overdue + weakBonus if level<7)`, where `dueAt = lastTs + DAY_MS · 2^level`; unseen items get top priority. Top-K (K = 2n) is shuffled and sliced to n. When all scores are zero, fallback to `shuffle(items).slice(0, n)`.
- **Example cleanup:** `dropExampleRecords` (`utils/exampleItem.ts`, §3.18) runs right after the two migrations and removes records of items the worked example now keeps out of the pools.
- **Key migration:** `migrateDottedKeys(store, modes)` re-points records stranded by the punctuation pass (§3.17), run once at load in `App.tsx`. A record moves only when its key matches no live item AND exactly one live key equals it with every period stripped from both; ambiguity is left alone, and legitimately dotted keys (`1 stot.`) match a live item so they never move. Colliding records keep the newer `lastTs`. Idempotent, and cost scales with the stored keys, not with the 232 modes.
- **Why migrate rather than accept orphans:** `lessonStats` counts entries in the store against a total from `itemCount()`, so stale keys do not merely lose progress — they inflate `atSeven / total` past 1 and falsely mark a lesson mastered.
- **Deps:** `types.ts`, `utils/itemKey`, `utils/shuffle`, `utils/storage`.

### 3.10 utils/itemKey.ts
- **Purpose:** Stable natural key for any engine item + mode item-count resolution. `itemKey(item)` → `q` / `translation`. `itemCount(mode)` handles 3 data shapes.
- **Hazard:** `useGame` calls `itemKey` inside a `try/catch` and skips mastery on failure. A new item shape without its own branch therefore loses progress silently instead of erroring — `FrameItem` gets the `frame:` namespace, and `scripts/lexicon.ts` asserts the branch resolves.
- **Deps:** `types.ts`.

### 3.16 utils/textScale.ts
- **Purpose:** One multiplier (`--fs-scale` on `:root`) drives the whole type ramp, since every Tailwind size is rem-based and the root is `calc(16px * var(--fs-scale))`.
- **Interfaces:** `TextScale = "system" | "normal" | "large" | "xlarge"`; `measureSystemScale()`, `resolveScale()`, `applyTextScale()`, `loadTextScale()`, `saveTextScale()`.
- **Dynamic Type:** `measureSystemScale()` appends a hidden probe styled `font: -apple-system-body`, reads its computed size and divides by the 17px "Large" baseline. That shorthand is the only channel through which a WKWebView exposes the iOS text-size setting; rem units alone do not follow it. Non-WebKit engines return 1, so the web build keeps its designed size.
- **Cap:** clamped to [1, 1.4]. At accessibility sizes the shorthand reaches ~53px (3.1x), which would break fixed-height controls and force horizontal scrolling.
- **Lifecycle:** applied in `main.tsx` before first paint; `App.tsx` re-measures on `visibilitychange` while in `system` mode. Persisted under `bg-trainer-textscale-v1` (registered in `storage.ts` `TRACKED_KEYS`).
- **Deps:** `utils/storage.ts`.

### 3.17 Exercise punctuation (data, not render)
- **Rule:** meaningless sentence-final periods are absent from the data itself; nothing trims punctuation at render. A period in a drill string is noise on a 60px stimulus, but only the exercise reveals whether it is noise, so the decision is made per item when the item is written.
- **Kept:** abbreviations (`ул.`, `бул.`, `ет.`, `ап.`, `1 stot.`, `м.р., ед.`, `На 29.08.1979 г.`), `?`, `!`, `…`, prose `translation`/`rule` text, and the `"."` word tiles in `DATA_L7_BUILD` / `DATA_PROFILE_BUILD` that the learner drags into place. 22 such strings remain.
- **Why not a render-time helper:** a blanket strip cannot see any of the above. An earlier `stripFinalPeriod()` did exactly that and ate the period of 24 grammar hints (`ж.р.`, `мн.ч.`, `няма да + гл.`); it was removed once the data was cleaned.
- **`NegEngine` dependency:** its decoys are word-order permutations of `answer`, so those answers must stay unpunctuated or the dot lands mid-sentence (`студент. Аз не съм`).
- **Migration:** `migrateDottedKeys()` (§3.9) re-points mastery records whose key still carries a removed period.

### 3.18 Worked examples (`Mode.example`, FR-TASK-MODEL)
- **Rule:** every mode carries one model answer, shown under the instruction on every question. Exception: `paradigm` — `ParadigmEngine` pre-fills the 1sg row and labels it «пример», so that row is the model and the mode stores no `example`.
- **Format:** `stimulus → answer`; `↔` for `match` (pairing, not transformation); `build` states the finished sentence. Prose spacing, not `words[]` spacing — `Емилия Иванова е студентка.`, never `студентка .`.
- **Source:** the textbook's own model where it prints one (`documents/lessons/lesson-N.md`: «Примерен образец», «Работете по модела»); otherwise a typical item of that mode written out.
- **No free answers:** where a mode's own material can be stepped outside, the model steps outside it. `paradigm` uses an undrilled verb (`съм` for L3/L4/L6/L7, `ще бъда` for L5, `чел съм` for L8) — a drilled verb would hand over three slots of the next question.
- **Model's item never asked (`utils/exampleItem.ts`):** where the model is an item of its own mode (93 modes: pronoun tables, `match` pairs, `build` sentences, `pickFrom` words…), that item leaves the question pool. One rule, applied at the composition root: `data/index.ts` keeps the authored literal as `AUTHORED_CATEGORIES` and exports `CATEGORIES` (and so `ALL_MODES`) mapped through `withoutExampleItem`, which replaces `data` with a filtered copy and keeps the authored list as `Mode.authoredData`. Every consumer — `sliceData`, `pickDueItems`, `itemCount`, `lessonStats`/`modeStats` — reads `data`, so sessions and progress totals both lose the item; only the verb-form table reads `authoredData`, because it lists forms and asks nothing. Data files are untouched: the model stays the textbook's.
  - **Matching (`isExampleItem`):** split the model at its first `→`/`↔`; the item matches when its prompt equals the stimulus and its answer occurs as a word run in the model's answer side (so a gloss like `-ът (моливът)` still matches), after folding case, spacing and `, . ? ! …`. Per engine: `q`/`answer`; `match` `left`/`right`; `li` `words`/`result`; `odd` `words.join("/")`/`odd`; `build` the whole sentence; `frame` the Bulgarian side against the slot words and `alt`; `paradigm` never. Both ru and uk models are tried. Same prompt, different answer stays (`Ние сме ___ → гладни` vs `жадни`).
  - **Closed sets:** a six-row pronoun table becomes five questions (owner's decision, 2026-10-14), so a `deep` session there plays 5 instead of 6. The model's `ние` form is still drilled where the table is assembled whole (`paradigm`) — for 29 of the 30 such verbs.
  - **Mastery:** `dropExampleRecords` runs at load after the two key migrations (§3.9) and deletes records of dropped items, matching keys with periods stripped; a key shared with a live item survives.
- **Invariants:** `scripts/examples.ts` scans `src/data/index.ts` as text and asserts: non-empty ru + uk, never a copy of `desc`, an arrow outside `build`, no space before a mark. `scripts/exampleitem.ts` imports `ALL_MODES` and `CATEGORIES` and asserts: no pool holds an item `isExampleItem` accepts, no pool is empty, a pool lost nothing but the model's items, an anchor item per affected engine (`sym_pick`, `sym_fill`, `sym_type`, `l7_aspect_future_pick`, `kak_si_pick`, `match_possess`, `q_build`, `q_li`) is recognised — the pool check shares the matcher, so only the anchors catch a matcher gone blind — `dropExampleRecords` drops a dotted stale record and keeps a live one, and no file under `src/` besides `App.tsx`, `types.ts` and the module itself mentions `authoredData`. Both run in `deno task test`.

### 3.18a Pinned question (`components/ui/StickyQuestion.tsx`, FR-QUESTION-PINNED)
- **Rule:** the question stays at the top of the play area while the answers scroll under it. Ten engines wrap their question in `<StickyQuestion>`; `MatchEngine` and `LiEngine` do not, because in both the thing that changes per question is the answer area itself.
- **What is pinned and what is not:** the question, plus the answer area in `BuildEngine` and `FrameEngine`. `TaskPrompt` (instruction + worked example) is never pinned — constant for the whole session and the tallest part of the header, 120–155 px against the question's 63–126 px at scale 1.3 — so it stays in the flow and is allowed to scroll away.
- **Why the two sentence engines differ:** their answer is assembled from a word bank below the fold, so the tap happens at the foot of the screen and the result lands in slots above it. Pinning the question alone would show the task and hide the work. The cost is measured and accepted: 398 px of 594 in `build`, 213 px in a typical `frame` step-1 item and 269 px in the worst one in the app, all at 375x667, scale 1.3. The remainder — 325 px in the worst case — is what the bank scrolls through.
- **Two facts the call site cannot see.** A sticky element is confined to its parent's box, so `<StickyQuestion>` has to be a direct child of the engine's scroll root; moved back inside the centred block — where it reads more naturally — it comes unstuck the moment that block scrolls past, which is when the answers appear. And a sticky child sticks to the **scrollport's padding edge**, not to the visible top, so with `p-4 xs:p-6` on the scroll root a `top-0` block leaves a padding-tall band above itself for content to ride through; `-top-4 xs:-top-6` cancels it and the block's own `pt-4 xs:pt-6` puts the text back inside. Both are rem-based and so track `--fs-scale` together. Full-bleed width (`-mx-4` plus `w-[calc(100%+2rem)]`) exists for the matching reason: narrower than the scrollport, an opaque block lets tiles show through the side gutters.
- **Vertical rhythm:** a bare `flex-1` spacer above the pinned block mirrors the one below, so a screen with room to spare still centres the question group; when it overflows both collapse to nothing. No shadow under the block — on a screen that never scrolls it reads as a divider drawn across the layout for no reason.
- **Invariant:** `scripts/sticky.ts` (run by `deno task test`) scans the ten engines as text, asserts `<StickyQuestion>` is present at the scroll root's own indentation and that the pinned block renders the per-question expression, and checks the component still carries the negative offset, the full-bleed width and an opaque background.
- **Replaced:** `FR-STIMULUS-NEAR-BANK` and `scripts/stimulus.ts`, which put the sentence next to the word bank instead. That bought adjacency, not visibility — a 940 px bank scrolls past a stimulus at its head just the same — and it only ever applied to the two engines that have a bank.

### 3.18a-bis Pinned pool (`components/ui/StickyPool.tsx`, FR-QUESTION-PINNED)
- **Rule:** `ParadigmEngine` pins its pool of forms to the **bottom** of the play area — the mirror of `StickyQuestion`, and the only engine that does it.
- **Why the mirror:** the drill runs 895–1029 px in a 594 px play area at scale 1.3, and its rows (429–456 px) plus the pinned verb (125 px) exceed the area on their own, so the answer area cannot be pinned the way `frame` and `build` pin theirs. Pinning the pool costs 151–213 px and keeps the tap targets reachable from any scroll position. It works here and nowhere else because this drill's size is fixed at six pronouns and six forms; `frame`'s bank grows to 39 words.
- **Same two invisible rules** as the top-pinned block (direct child of the scroll root; a negative offset to cancel the root's padding), plus one that flips: it must be the **last child in the flow**, because a bottom-sticky element settles into its natural position once reached and anything after it would sit unreachable behind it. `scripts/sticky.ts` asserts all of it.
- **What the top pins:** the verb, its hint, and the 1sg worked-example row, which `row(p, i)` renders for the pinned header and the scrolling block alike — the map skips `GIVEN`. Measured at 375x667, scale 1.3: pinned header 203 px, pinned pool 151–213 px, and a band that settles at 240 px holding three of the five working rows.
- **Landing animation:** slot buttons are keyed by the form they hold, so a placement mounts a new node and `.slot-drop` plays. The worked-example row keeps a constant key — it is filled before the learner acts, so animating it would announce a placement that never happened.

### 3.18b Verdict overlay (`components/ui/Reaction.tsx`, FR-FEEDBACK-CENTRED)
- **Shape:** `absolute inset-0 z-40 flex items-center justify-center pointer-events-none`, holding a coloured pill with white bold text. Carries no flow height, so the 36 px spacer the inline version reserved in all twelve engines is gone.
- **Anchor:** the game wrapper in `App.tsx` is the only positioned ancestor, so the overlay covers the area below the header and does not move while the play area scrolls. `overflow-y-auto` on an engine root does not create a containing block; an added `relative` there would, and would silently centre the verdict in the scrollable content instead. `scripts/feedback.ts` asserts no engine root is positioned.
- **Colour:** `bg-emerald-700` for a right answer, `bg-[#E60023]` for a wrong one — the same green/accent pair the answer tiles use. Moving the pill onto white content is only half the fix: a white pill there is visible and still missed, so the colour carries the verdict faster than the word does.
- **Where the flag comes from:** `ok` is a required prop, so every call site has to state the verdict and a forgotten one is a compile error. Eight engines read `reactionOk` from `useGame`, which sets it beside `reaction` and clears it in `advance` and `dismissError` — there it is only ever true, since the hook produces a verdict for correct answers only and leaves wrong ones to the dialog. The four that hold their own reaction (`Build`, `Li`, `Match`, `Paradigm`) have no dialog and so keep a local `reactionOk` next to each `setReaction` call, red included.
- **Layering:** z-40, under `ErrorDialog` and `InfoModal` at z-50 — a wrong answer's explanation must cover the verdict, not compete with it.
- **Announcement:** the `role="status" aria-live="polite"` region stays mounted and only its content changes; a region that appears together with its text is announced unreliably.

### 3.19 Hint channel (`hooks/useHintChannel.tsx`, FR-HINT-MODAL)
- **Problem:** the button belongs in the header, which `App` renders; the hint belongs to the question, which only the engine knows. Prop-drilling through the engine dispatch would mean every engine forwarding a hint it does not display, and a per-engine button would mean five copies of the same UI.
- **Shape:** `HintProvider` (mounted in `main.tsx` above `App`) holds `content: {hint, rule} | null`, `isOpen`, and a `usedRef`. Engine → `publish(content)` per question and `publish(null)` on unmount; header → `open()` / `close()`; engine → `wasUsed()` at answer time. `publish` also resets `isOpen` and `usedRef`, so a new question starts unhinted with the modal closed.
- **Why a ref for "used":** `wasUsed()` is read inside a click handler, not during render — a state value would re-render every engine on hint open for nothing.
- **Consequences:** the lamp is present exactly when a hint is published, so it disappears by itself on the results screen and never appears in engines that print the translation in the task. `open()` marks the item hinted, so mastery softens the same way the old inline reveal did (FR-MASTERY).
- **Invariant:** `scripts/hint.ts` (run by `deno task test`) scans the engines and `App.tsx`: no engine may keep inline-hint code (`hintBtn`, `showHint`, `revealHint`, `hintedRef`, `shownHint`), and every engine that uses the channel must publish per question, clear on unmount, and pass `hinted: hintCh.wasUsed()`.
### 3.20 Cumulative lesson lexicon (FR-FRAME)
- **Rule:** a frame drill in lesson N may only use words the learner has already met. The permitted set is derived from the code, never hand-listed: union of the Bulgarian strings of every mode registered in lessons 1..N.
- **Fields read:** `answer`, `decoys`, `opts`, `words`, `result`, `left`/`right`, `verb`, `forms`, `pronouns`. `q` is excluded — in some modes it carries a Russian prompt, and a whitelist polluted with Russian would weaken the check instead of tightening it.
- **Self-approval guard:** frame modes are excluded from the source set, so a frame can never license its own vocabulary.
- **Enforcement:** `deno task test` (and so `deno task check`, which CI runs on every PR and push to `main`); `deno run -A scripts/lexicon.ts --dump <lessonId>` prints the lexicon when authoring. It also asserts one frame mode per lesson, ≥6 items, bank ≥ 4× the longest sentence, no duplicate or case-twin bank entries, no sentence (or `alt`) repeating a word — the bank offers one tile per word, so a repeat is unfillable — both locales on every role and translation, and that `itemKey` resolves the shape.
- **Evaluating the data:** unlike the other invariants this one runs `mode.data()`, so it imports the app's sources instead of scanning them. `deno.json` enables `sloppy-imports`, which is what lets a script resolve the app's extensionless imports.

### 3.21 Frame scaffolding ladder (FR-FRAME-LADDER)
- **Landing animation:** a tile is keyed by the word it holds, so placing one mounts a new node and the `.slot-drop` keyframes play; re-colouring a slot green or red at the end of the question leaves the content alone and does not replay them. `build` does the same. Where the line has no fixed length the key is the word rather than the index, so removing a word does not make everything after it re-animate.
- **Steps:** all of 1–3 render the same template line; 1 names every empty slot → 2 drops the names → 3 starts the line empty → 4 typing, no line and no bank. Lessons L1–L2 / L3–L4 / L5–L6 / L7–L8.
- **State shape:** steps 1–2 keep `filled` as a fixed-length `(string|null)[]` with holes and auto-submit when full; steps 3–4 grow (`filled` appends, or `typed` holds the text) and need an explicit "Проверить". One `fixed = step <= 2` flag drives both the state shape and the render branch.
- **Error marking:** per slot at steps 1–2, where a slot maps to a known word; whole-line at steps 3–4, where lengths may differ and no such mapping exists.
- **Alternatives:** `FrameItem.alt` lists full sentences that are also correct Bulgarian. Meaningful only from step 3, where the learner picks order and length — the checker rejects an `alt` below that as dead data. Mostly pro-drop variants (`искам да отида`) and clitic-driven reorderings (`ял съм`, `пил е вино`).
- **Bank at step 4:** never rendered, still required in the data — it defines the mode's vocabulary and is what the lexicon checker validates every slot and `alt` word against.
- **Why fading rather than one fixed level:** production practice transfers to production, not comprehension practice (DeKeyser 1997); a difficulty helps only when it is actually overcome (retrieval effort / desirable difficulties); and support that outlives competence turns into a cost (expertise reversal, assistance dilemma). A single level would be wrong at one end of the course or the other.

### 3.11 iOS shell (Capacitor 8)
- **Purpose:** Wrap the React SPA in a native iOS app (WKWebView at `capacitor://localhost`). Same JS bundle as web, relative asset base `./`.
- **Layout:** `capacitor.config.ts` (root) + `ios/App/` Xcode project. `cap sync` copies `dist/` → `ios/App/App/public/` (gitignored).
- **Lifecycle:** `AppDelegate` + `SceneDelegate` (UIScene adopted — avoids ~20s iOS 17+ stall). `UIApplicationSceneManifest` in `Info.plist` points `UISceneStoryboardFile=Main`, `UISceneDelegateClassName=App.SceneDelegate`.
- **Viewport:** `contentInset: 'never'` + CSS `env(safe-area-inset-*)` padding on `body`; layout uses `height: 100%` chain (no `100vh`).
- **Startup:** Inline HTML splash in `index.html` shown until React mounts (`main.tsx` hides via `requestAnimationFrame`). `AnalyticsScreen` lazy-loaded via `React.lazy` → main chunk 360 KB / gzip 94 KB.
- **Scripts:** `deno task build:ios` (`VITE_BASE_PATH=./` for relative paths) → `ios:sync` → `ios:open`. `deno task dist` (`scripts/dist.ts`): `build:ios` → `cap sync ios` → `xcodebuild archive` (Release, signing disabled) → `ios/App/build/App.xcarchive` (gitignored). Signing + `.ipa` export + ASC upload happen outside this repository; the repo produces the unsigned archive only.
- **Deps:** Capacitor 8 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`), Swift Package Manager (no CocoaPods runtime deps). `Package.resolved` is gitignored — `cap sync`/Xcode regenerate it from the pinned `@capacitor` versions, so committing it only adds churn.
- **Known gotchas:**
  - iOS 17+ stalls ~20s at launch on Capacitor apps without UIScene adoption (symptom: `UIScene lifecycle will soon be required` in console, black screen ~20s). Fix requires `SceneDelegate.swift` + `UIApplicationSceneManifest` in Info.plist + 4 entries in `project.pbxproj` (PBXBuildFile, PBXFileReference, PBXGroup, PBXSourcesBuildPhase).
  - Capacitor 8 uses SPM exclusively. `pod install` never runs. `ios/App/Pods/` gitignores are defensive-only.
  - Using `100vh` on WKWebView breaks with safe-area padding on `body` (double-counts insets). Always use `height: 100%` chain.
  - `limitsNavigationsToAppBoundDomains: true` requires matching `WKAppBoundDomains` array in Info.plist — without it iOS applies strict defaults that may block/slow resources. Do NOT enable without the Info.plist entry.
  - Capacitor's default cold-start frame is black; mask with inline HTML splash in `index.html` shown until React mounts.
  - WKWebView `localStorage` path (simulator): `~/Library/Developer/CoreSimulator/Devices/<DEVICE>/data/Containers/Data/Application/<APP>/Library/WebKit/WebsiteData/LocalStorage/capacitor_localhost_0.localstorage`. Locate via `xcrun simctl get_app_container booted <bundle-id> data`.
  - `VITE_BASE_PATH=./` is mandatory for iOS build (relative paths for `capacitor://localhost`). Web build uses base `/` — the app owns the root of `app.bgtrainer.korchasa.dev`; the marketing site is a separate repo on Cloudflare Pages.

### 3.12 Storage adapter (`utils/storage.ts`, FR-IOS-STORAGE)
- **Purpose:** Keep progress out of WebKit storage on iOS, where "Offload Unused Apps" and cache eviction can wipe it, without making every caller asynchronous.
- **Interfaces:** `initStorage(): Promise<void>`, `getRaw(key)`, `setRaw(key, value)`, `removeRaw(key)`. Callers: `utils/history.ts`, `utils/mastery.ts`, `utils/pace.ts`, `utils/textScale.ts`, `i18n/storage.ts`.
- **Web:** straight `localStorage`; `initStorage()` resolves at once.
- **Native:** `initStorage()` reads every key in `TRACKED_KEYS` from Capacitor Preferences into an in-memory cache. Reads hit the cache; writes update the cache and mirror to Preferences fire-and-forget.
- **Migration:** the first native boot copies each legacy `localStorage` value into Preferences when Preferences has none, deletes the legacy key and sets a per-key `__migrated__:<key>` flag, so a rerun does nothing.
- **Boot order:** `main.tsx` awaits `initStorage()` before mounting React, behind the HTML splash, so the first render sees persisted state.
- **Fault tolerance:** every storage call is wrapped; a failed write keeps the value in the cache and the next boot rehydrates from disk.
- **Hazard:** a new persisted key must be added to `TRACKED_KEYS`, or on native it is never loaded into the cache and reads as empty after a restart.
- **Deps:** `@capacitor/preferences`, `utils/platform`.

### 3.13 Native UX adapter (`utils/nativeUx.ts`, FR-IOS-UX)
- **Purpose:** Native touches on top of the web UI; each function returns at once on web, and native failures are swallowed so a flaky plugin cannot block boot.
- **Interfaces:** `hideNativeSplash()` and `applyStatusBarStyle()` (called from `main.tsx`), `hapticCorrect()` / `hapticWrong()` (first attempt only, from `useGame`), `hapticRoundFinished()` (from `App.tsx`).
- **Status bar:** dark glyphs to match the white app shell; an Android-only branch also paints the bar white.
- **Deps:** `@capacitor/haptics`, `@capacitor/splash-screen`, `@capacitor/status-bar`, `utils/platform`.

### 3.13a Keyboard viewport (`utils/keyboardViewport.ts`, FR-IOS-UX)
- **Purpose:** keep the nav header on screen while the keyboard is up. iOS shrinks the visual viewport for the keyboard and pans it until the focused field is clear — a pan, not a document scroll, so `overflow: hidden` does not stop it. Measured in a typing drill on iPhone 17 / iOS 26.5: visual viewport 874 → 498px, offset 374px, header 312px above the screen top.
- **Mechanism:** `pinShellToVisualViewport()` (iOS only, from `main.tsx`) listens to `visualViewport` `resize`/`scroll`; at zoom 1 it sets `<html>` height to the visual viewport height, toggles `html.keyboard-open` (CSS drops the bottom safe-area padding, which the keyboard covers) and resets any pan with `scrollTo(0, 0)`. While pinch-zoomed (FR-A11Y-TEXT) it restores `100%` and leaves panning alone.
- **Engines:** `onKeyboardOpen(cb)` fires after each shrink; `hooks/useScrollToEndOnKeyboard` uses it in `TypeEngine` and `FrameEngine` to scroll the play area to its end, so the field and the check button sit above the keyboard while the question stays pinned (FR-QUESTION-PINNED).
- **Rejected:** `ios.scrollEnabled: false` (no effect — the pan is not a scroll-view scroll); `@capacitor/keyboard` resize modes (a new dependency, not needed).
- **Deps:** `utils/platform`.

## 4. Data
- **Entities:**
  - `DataItem = { q, answer, hint, label?, decoys?, rule? }`
  - `BuildItem = { words, translation }`
  - `LiItem = { words, liPosition, result, translation }`
  - `MatchItem = { left, right, hint }`
  - `OddItem = { words, odd, hint, rule? }`
  - `ParadigmItem = { verb, pronouns, forms, hint, rule? }`
  - `Mode = { id, icon, label, desc, example, authoredData?, type: EngineType, data: () => Item[] }` — `example` is the required worked model (FR-TASK-MODEL), `stimulus → answer` (`↔` for match, finished sentence for build); exported modes' `data` omits the model's own item, `authoredData` keeps it for the verb-form table (§3.18)
  - `SessionPace = "quick" | "standard" | "deep"` → `SESSION_SIZE_BY_PACE = {quick:3, standard:5, deep:8}`
  - `Category = { id, name, modes: Mode[] }`
  - `Lesson = { id, num, title: Localized<string>, modeIds: string[], available: boolean }` — no tier or entitlement field (FR-PAID)
  - `Platform = "web" | "ios" | "android"` (`utils/platform.ts`, build-time only)
  - `Screen = "lessons" | "lesson" | "game" | "results" | "analytics"`
  - `HistoryEntry = { mode, score, time, errors, ts, lessonId?, round?, qsTotal? }`
  - `ItemMastery = { level: 0..10, lastTs: ms, attempts }`
  - `ModeMastery = Record<itemId, ItemMastery>`; `MasteryStore = Record<modeId, ModeMastery>`
- **ERD:** None (no relational data). `Category 1—n Mode 1—n Item` in-memory.
- **Migration:** Storage keys = `bg-trainer-v3` (history) + `bg-trainer-mastery-v1` (mastery) + `bg-trainer-pace-v1` (pace) + `bg-trainer-lang-v1` (locale) + `bg-trainer-textscale-v1` (text size), all listed in `TRACKED_KEYS` (§3.12). Bumping the `v*` suffix effectively resets; older keys are left orphaned. All schemas are independent. On native, legacy `localStorage` values move into Capacitor Preferences once per key (§3.12). `itemKey()` migration: `BuildItem`/`LiItem` keys switched from Russian `translation` to Bulgarian `words.join("|")` / `result` — pre-existing mastery for build/li modes is silently orphaned (acceptable: small data subset, transparent re-learning). Nothing leaves the device: there is no cloud mirror and no sync.

## 5. Logic
- **Algos:**
  - **Session flow:** `useGame` owns `indexPlan` (initial order), `planPos`, `answered` (counter), `qsTotalRef` (fixed at mount). `advance()` picks the next physical index via `pickNext()` = `indexPlan[planPos++]` or `-1`. Each plan slot is consumed only when the user finally answers correctly; session completes when `answered ≥ qsTotal` or `pickNext` returns `-1`.
  - **Retry-until-correct (FR-RETRY):** On a wrong answer, `firstWrongRef` is set, `errorPending=true` raises the `ErrorDialog` overlay, and the same `cur` stays. `dismissError()` clears `sel`/`corr`/`reaction` so the user can re-answer; on retry-correct, `lockedRef` flips and `advance()` is scheduled. Only the first attempt per question writes to `errSet`, awards score, and emits an `onItemAnswer` mastery event; retries are silent. `errors` at completion = `errSet.size`.
  - **Answer handling:** `answer(val, correctVal, { extraPts, hinted })`; legacy numeric third arg still supported. First selection sets `sel` and either locks for advance (correct) or arms `errorPending` (wrong). Subsequent calls return `false` while `lockedRef`, `errorPending`, or `sel !== null`. Auto-advance after `delay` on correct.
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
- **Scale:** Single user, in-memory + storage adapter (`localStorage` on web, Capacitor Preferences on native). 200-entry cap prevents unbounded growth.
- **Fault tolerance:** Storage errors → silent no-op. Parse errors → empty history.
- **Sec:** No PII, no external requests, static deploy.
- **Logs:** None — browser console only during dev.

## 7. Constraints
- **Simplified:**
  - No unit-test framework. `deno task test` runs invariant scripts (`scripts/*.ts`) that scan or evaluate the app's sources; `deno task check` adds format, lint, type-check and bundle.
  - `deno lint` covers `scripts/` only; `src/` has no linter (ESLint not installed).
  - i18n covers only `ru` and `uk`. Bulgarian content shared: every mode's answers are Bulgarian forms, so no answer set needs translating.
  - Accessibility covered for type size and contrast (FR-A11Y-TEXT, FR-A11Y-CONTRAST); no formal audit, no VoiceOver rotor walkthrough on device.
  - Text scale capped at 1.4x. Beyond that the fixed-height controls (`min-h-[3.5rem]`, `h-14`, `w-12 h-12`) would need a reflow pass.
  - Column count uses character length, not measured text width — a proxy that holds for Cyrillic at the current ramp but would drift if the font or ramp changed.
  - iOS deployment target 15.0+, iPhone only, portrait only (FR-IOS-APPSTORE, FR-IOS-POLISH).
  - Web and iOS are both free (iOS since 2026-08-16, FR-PAID) — no paywall, no IAP, no tier enforcement.
  - No cloud sync of any kind: history, mastery, pace, locale and text size stay on the device (FR-IOS-STORAGE). Cross-device sync would need a backend and was ruled out by product.
  - No store-release CI in this repo (FR-IOS-CICD). Its workflows publish the web app only; signing, `.ipa` packaging and ASC upload run outside the repository, so no signing or App Store Connect credential is stored here.
- **Deferred:**
  - Test harness (Vitest/Playwright) — to add when regressions appear.
  - ESLint + Prettier — for consistent code quality.
  - Mode-level settings (session length, difficulty).
  - Export/import history.
  - Crash reporting for production builds — FR-IOS-POLISH, pending `VITE_SENTRY_DSN`.
  - On-device check that progress survives backgrounding, storage pressure and backup — FR-IOS-STORAGE.
  - Android shell, Play Store assets and release build — FR-ANDROID-SHELL, FR-ANDROID-PLAYSTORE, FR-ANDROID-CICD. Nothing is built yet: no `android/` project, no `@capacitor/android` dependency, no Android build task. Only the build flag and the status-bar branch in `utils/nativeUx.ts` know about Android. When the shell is built, Auto Backup has to include the SharedPrefs file `CapacitorStorage` (Capacitor Preferences) in `backup_rules.xml` explicitly, or progress is not backed up.
