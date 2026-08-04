# SDS

## 1. Intro
- **Purpose:** Describe the client-side architecture of bg-trainer: how screens, hooks, engines, and data combine to deliver quiz sessions and analytics.
- **Rel to SRS:** Implements FR-MENU, FR-GAME-SESSION, FR-SCORING, FR-ENGINES, FR-MATCH, FR-ODD, FR-PARADIGM, FR-REACTION, FR-HISTORY, FR-ANALYTICS, FR-RESULTS, FR-NAV, FR-LESSONS, FR-ROUND, FR-MASTERY, FR-SCHED, FR-TYPE, FR-FEEDBACK-RULE, FR-IOS-SHELL, FR-FREEMIUM, FR-IAP, FR-PAYWALL, FR-ANDROID-SHELL, FR-SYNC-PAID.

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
    App -->|screen=paywall mobile only| Paywall[PaywallScreen]
    Engine --> useGame[(useGame hook)]
    Engine -.timed.-> useTimer[(useTimer hook)]
    App --> Storage[(StorageAdapter\n localStorage / Capacitor.Preferences)]
    Storage --> History[(bg-trainer-v3)]
    Storage --> Mastery[(bg-trainer-mastery-v1)]
    App --> IAP[(IapService\n RevenueCat / web stub)]
    Paywall --> IAP
    Storage -.pro only.-> Sync[(SyncAdapter\n iCloud KVS / Auto Backup)]
    Analytics --> History
    Lessons --> Mastery
    Lesson --> Mastery
    App --> Data[(data/index.ts\n + lesson1..8.ts)]
    App --> LessonsData[(data/lessons.ts)]
    App --> Slice[(utils/sliceData)]
  ```
- **Subsystems:**
  - **Shell (`App.tsx`):** screen router + session lifecycle + history persistence + tier-gating dispatch (paywall on locked-pro tap, mobile only).
  - **Platform service (`services/platform.ts`):** `getPlatform()` returns `"web" | "ios" | "android"` from `VITE_PLATFORM` build flag (default `"web"`). All gating + IAP + sync paths branch on it.
  - **IAP service (`services/iap.ts`):** abstracts RevenueCat. Native: `@revenuecat/purchases-capacitor`. Web: stub returning `proUnlocked=true`. Exposes `init()`, `getOfferings()`, `purchase()`, `restore()`, `isPro()`, plus an event emitter for entitlement changes. `proUnlocked` cached in storage (key `bg-trainer-pro-v1`) for offline tolerance.
  - **Sync adapter (`services/sync.ts`):** Pro-only mirror of persistent state. iOS branch wraps `NSUbiquitousKeyValueStore` via Capacitor plugin; Android branch is a no-op (sync handled implicitly by Auto Backup configured in manifest). Reconcile-on-launch routine: max-`lastTs` per mastery item, dedupe history by `ts`.
  - **Engines (`components/engines/*`):** one React component per `EngineType`. Consumes `useGame`.
  - **State hooks (`hooks/*`):** `useGame` (scoring, advance, reaction), `useTimer` (countdown for timed mode).
  - **Data layer (`data/index.ts` + `data/lesson1.ts` + `data/lesson2.ts` + `data/lesson3.ts` + `data/lesson4.ts` + `data/lesson5.ts` + `data/lesson6.ts` + `data/lesson7.ts` + `data/lesson8.ts`):** exercises split per-lesson; `index.ts` is composition root — imports datasets from lesson files, re-exports via `export *`, defines `CATEGORIES` + `ALL_MODES`. Shared labels (`LABEL_M/F/N/PL`) live in `lesson1.ts` and are imported by later lessons. L10n fields stored as `Localized<string>`. Translation pairs inside `DataItem.q` use convention `"<ru> / <uk>"` — engines render via `Lq` helper which splits on " / " and picks side by current locale.
  - **Lessons layer (`data/lessons.ts`):** `LESSONS` array (8 textbook units, localized titles) + `LESSON_BY_ID`.
  - **Slicer (`utils/sliceData.ts`):** type-aware wrapper around `mode.data()` that shuffles+slices to round size while preserving `pickOpt.opts`.
  - **Persistence (`utils/history.ts`):** thin wrapper over `localStorage` with size cap + error swallow.
  - **Mastery (`utils/mastery.ts`, `utils/itemKey.ts`):** per-item level store + stable item identity helper. Separate `localStorage` key `bg-trainer-mastery-v1`. `itemKey` uses Bulgarian-stable keys (`q` / `result` / `words.join("|")`).
  - **i18n (`src/i18n/*`):** `LocaleProvider` + `useI18n` hook expose `t` (plain UI strings), `f` (parametric strings), `L` (resolves `Localized<T>`), `Lq` (splits `"<ru> / <uk>"` convention in `DataItem.q`). `STRINGS`/`FORMATS` dictionaries enforce locale completeness via `Record<Locale, …>`. Locale persisted under `bg-trainer-lang-v1`; first-run detection from `navigator.language` (only literal `uk` prefix triggers UK).
  - **UI atoms (`components/ui/*`):** `AnswerBtn`, `Progress`, `Reaction`, `Correction`, `NavHeader`, `BackButton`, `TaskPrompt`, `InfoModal`.
  - **Hint channel (`hooks/useHintChannel.tsx`):** `HintProvider` context carrying the current question's hint from the engine to the header button (FR-HINT-MODAL).
  - **Screens (`components/screens/*`):** `ResultsScreen`, `AnalyticsScreen`, `PaywallScreen` (mobile only).

## 3. Components

### 3.1 App.tsx
- **Purpose:** Root component. Owns `screen`, `lessonId`, `modeId`, `round`, `result`, `history`, `showRef`. Renders the game header's two reference buttons and their modals (FR-HINT-MODAL): 💡 shown while `hintCh.content` is set, 📖 in verb modes outside a Round; both open `InfoModal`. Dispatches to screens/engines. Passes `currentMode.desc` as `prompt` and `currentMode.example` as `example` to the active engine, which renders both via `TaskPrompt` directly above the question in its centered block (FR-TASK-MODEL). Round machine: queue of 3 random `modeIds`, per-game completion accumulates totals; final game emits aggregated `HistoryEntry` with `mode="round:<lessonId>"`. Scroll: inner `max-w-md` wrapper is `overflow-y-auto no-scrollbar` (single scroll container for all screens); outer wrapper has `onWheel` forwarder that redirects wheel events from side gutters (viewport wider than `md`) into the inner scroll container.
- **Interfaces:** `screen: Screen`, lesson lookup via `data/lessons.ts`, mode lookup via `data/index.ts`, data slicing via `utils/sliceData.ts`, history r/w via `utils/history`.
- **Deps:** All screens, all engines, `data/index.ts`, `data/lessons.ts`, `utils/sliceData.ts`, `utils/history.ts`, `utils/shuffle.ts`, `types.ts`.

### 3.2 useGame hook
- **Purpose:** Encapsulate per-session state: `cur`, `sel`, `corr`, `reaction`, `score`, `answered`, `qsTotal`, `errorPending` + `answer()` + `advance()` + `dismissError()`. Owns `indexPlan`, `errSet`, `firstWrongRef`, `lockedRef` to drive immediate-retry-on-wrong, single-counted scoring/mastery/error per question.
- **Interfaces:** `useGame(qs, onComplete, reactions, pts=10, delay=1000, onItemAnswer?)`. `answer(val, correctVal, opts | extraPts)` where `opts = { extraPts?, hinted? }`. `onItemAnswer(itemId, ok, fast, hinted?)`. `dismissError()` clears visual state to allow another attempt at the same question without unsetting `firstWrongRef`.
- **Deps:** `types.DataItem`, `utils/shuffle` (`pickOK`, `pickFail`), `utils/itemKey`.

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
  - `FrameEngine` (FR-FRAME, FR-FRAME-LADDER) — same `DataItem[]` cast over `FrameItem[]`. One item = one sentence the learner produces from an L1 translation; `data().step` decides the scaffolding (see §3.19). Load-bearing details: the next-empty slot is read from `filledRef`, not from state, so two taps in one React batch cannot target the same slot; `filled` is reset **during render** via a `filledFor` guard, because an effect commits one frame first and that frame paints the previous sentence's words into the new slots; the sentence-initial capital is applied by `cap()` at render, so the bank keeps one lower-case tile per word instead of a capitalised twin; and an accepted `alt` order is submitted to `useGame` **as the canonical string on both sides**, so variants work without teaching `useGame` about variants (`sel === canonical` then means "this attempt was right").
- **Deps:** `useGame` (most), `useTimer` (timed only), UI atoms.
- **List:** `PickEngine`, `TimedEngine`, `PickOptEngine`, `PickFromEngine`, `NegEngine`, `BuildEngine`, `LiEngine`, `TypeEngine`, `MatchEngine`, `OddOneOutEngine`, `ParadigmEngine`, `FrameEngine`.

### 3.5 ResultsScreen
- **Purpose:** Show session outcome: score, errors, time. Offer "play again" / "menu".
- **Deps:** `types.HistoryEntry` (implicit).

### 3.6 AnalyticsScreen
- **Purpose:** Aggregate history + render charts (Recharts).
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
- **Key migration:** `migrateDottedKeys(store, modes)` re-points records stranded by the punctuation pass (§3.17), run once at load in `App.tsx`. A record moves only when its key matches no live item AND exactly one live key equals it with every period stripped from both; ambiguity is left alone, and legitimately dotted keys (`1 stot.`) match a live item so they never move. Colliding records keep the newer `lastTs`. Idempotent, and cost scales with the stored keys, not with the 232 modes.
- **Why migrate rather than accept orphans:** `lessonStats` counts entries in the store against a total from `itemCount()`, so stale keys do not merely lose progress — they inflate `atSeven / total` past 1 and falsely mark a lesson mastered.
- **Deps:** `types.ts`, `utils/itemKey`, `utils/shuffle`, `localStorage`.

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
- **Migration:** `migrateDottedKeys()` (§3.5) re-points mastery records whose key still carries a removed period.

### 3.18 Worked examples (`Mode.example`, FR-TASK-MODEL)
- **Rule:** every mode carries one model answer, shown under the instruction on every question. Exception: `paradigm` — `ParadigmEngine` pre-fills the 1sg row and labels it «пример», so that row is the model and the mode stores no `example`.
- **Format:** `stimulus → answer`; `↔` for `match` (pairing, not transformation); `build` states the finished sentence. Prose spacing, not `words[]` spacing — `Емилия Иванова е студентка.`, never `студентка .`.
- **Source:** the textbook's own model where it prints one (`documents/lessons/lesson-N.md`: «Примерен образец», «Работете по модела»); otherwise a typical item of that mode written out.
- **No free answers:** where a mode's own material can be stepped outside, the model steps outside it. `paradigm` uses an undrilled verb (`съм` for L3/L4/L6/L7, `ще бъда` for L5, `чел съм` for L8) — a drilled verb would hand over three slots of the next question; `match` avoids a pair sitting on the board (`град ↔ градът`, `искам ↔ иска`, `уча ↔ учител`). Closed sets — pronoun tables, the `съм` paradigm itself — have no outside, and there the model is a typical item, exactly as the textbook prints the whole table on its grammar page.
- **Invariant:** `scripts/examples.ts` (run by `deno task test`) scans `src/data/index.ts` as text — extensionless imports there would otherwise force `--sloppy-imports` — and asserts: non-empty ru + uk, never a copy of `desc`, an arrow outside `build`, no space before a mark.

### 3.18a Pinned question (`components/ui/StickyQuestion.tsx`, FR-QUESTION-PINNED)
- **Rule:** the question stays at the top of the play area while the answers scroll under it. Ten engines wrap their question in `<StickyQuestion>`; `MatchEngine` and `LiEngine` do not, because in both the thing that changes per question is the answer area itself.
- **What is pinned and what is not:** the question, plus the answer area in `BuildEngine` and `FrameEngine`. `TaskPrompt` (instruction + worked example) is never pinned — constant for the whole session and the tallest part of the header, 120–155 px against the question's 63–126 px at scale 1.3 — so it stays in the flow and is allowed to scroll away.
- **Why the two sentence engines differ:** their answer is assembled from a word bank below the fold, so the tap happens at the foot of the screen and the result lands in slots above it. Pinning the question alone would show the task and hide the work. The cost is measured and accepted: 398 px of 594 in `build`, 424 px in `frame`, 506 px in the worst item in the app (the five-role L2 frame step-1 item), all at 375x667, scale 1.3. The remainder — 88 px in the worst case — is what the bank scrolls through.
- **Two facts the call site cannot see.** A sticky element is confined to its parent's box, so `<StickyQuestion>` has to be a direct child of the engine's scroll root; moved back inside the centred block — where it reads more naturally — it comes unstuck the moment that block scrolls past, which is when the answers appear. And a sticky child sticks to the **scrollport's padding edge**, not to the visible top, so with `p-4 xs:p-6` on the scroll root a `top-0` block leaves a padding-tall band above itself for content to ride through; `-top-4 xs:-top-6` cancels it and the block's own `pt-4 xs:pt-6` puts the text back inside. Both are rem-based and so track `--fs-scale` together. Full-bleed width (`-mx-4` plus `w-[calc(100%+2rem)]`) exists for the matching reason: narrower than the scrollport, an opaque block lets tiles show through the side gutters.
- **Vertical rhythm:** a bare `flex-1` spacer above the pinned block mirrors the one below, so a screen with room to spare still centres the question group; when it overflows both collapse to nothing. No shadow under the block — on a screen that never scrolls it reads as a divider drawn across the layout for no reason.
- **Invariant:** `scripts/sticky.ts` (run by `deno task test`) scans the ten engines as text, asserts `<StickyQuestion>` is present at the scroll root's own indentation and that the pinned block renders the per-question expression, and checks the component still carries the negative offset, the full-bleed width and an opaque background.
- **Replaced:** `FR-STIMULUS-NEAR-BANK` and `scripts/stimulus.ts`, which put the sentence next to the word bank instead. That bought adjacency, not visibility — a 940 px bank scrolls past a stimulus at its head just the same — and it only ever applied to the two engines that have a bank.

### 3.18b Verdict overlay (`components/ui/Reaction.tsx`, FR-FEEDBACK-CENTRED)
- **Shape:** `absolute inset-0 z-40 flex items-center justify-center pointer-events-none`, holding a coloured pill with white bold text. Carries no flow height, so the 36 px spacer the inline version reserved in all twelve engines is gone.
- **Anchor:** the game wrapper in `App.tsx` is the only positioned ancestor, so the overlay covers the area below the header and does not move while the play area scrolls. `overflow-y-auto` on an engine root does not create a containing block; an added `relative` there would, and would silently centre the verdict in the scrollable content instead. `scripts/feedback.ts` asserts no engine root is positioned.
- **Colour:** `bg-emerald-700` for a right answer, `bg-[#E60023]` for a wrong one — the same green/accent pair the answer tiles use. Moving the pill onto white content is only half the fix: a white pill there is visible and still missed, so the colour carries the verdict faster than the word does.
- **Where the flag comes from:** `ok` is a required prop, so every call site has to state the verdict and a forgotten one is a compile error. Eight engines read `reactionOk` from `useGame`, which sets it beside `reaction` and clears it in `advance` and `dismissError`; the four that hold their own reaction (`Build`, `Li`, `Match`, `Paradigm`) keep a local `reactionOk` next to each `setReaction` call.
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
- **Steps:** 1 labelled roles → 2 bare slots → 3 empty line + bank → 4 typing. Lessons L1–L2 / L3–L4 / L5–L6 / L7–L8.
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

### 3.12 PaywallScreen
- **Purpose:** Mobile-only purchase gate. Reached via `screen="paywall"` set by App when free user taps a `tier="pro"` lesson, or via "Pro" affordance in analytics.
- **Interfaces:** Props `{ onClose, iap }`. Renders Pro benefits, `iap.getOfferings().monthly.priceString`, "Купить", "Восстановить покупки", EULA + Privacy links.
- **Deps:** `services/iap`, `useI18n`, UI atoms.

### 3.13 IapService (`services/iap.ts`)
- **Purpose:** Single entry point for purchase state. Hides RevenueCat behind a stable interface; web build provides stub.
- **Interfaces:** `init(): Promise<void>`, `getOfferings(): Promise<Package[]>`, `purchase(pkg): Promise<{ ok, error? }>`, `restore(): Promise<{ ok, error? }>`, `isPro(): boolean`, `onEntitlementChange(cb): () => void`.
- **State:** In-memory `proUnlocked` mirrored to storage key `bg-trainer-pro-v1`. Source of truth on launch = local cache (instant); online RevenueCat fetch reconciles asynchronously and emits change event if differs.
- **Web stub:** `init` no-op, `isPro()=true`, `purchase/restore` return `{ ok: true }`. No RevenueCat code shipped to web bundle (conditional import via `VITE_PLATFORM`).
- **Deps:** `@revenuecat/purchases-capacitor` (mobile only), `services/storage`, `services/platform`.

### 3.14 SyncAdapter (`services/sync.ts`)
- **Purpose:** Pro-only cross-device mirror. Activates when `proUnlocked && platform != "web"`.
- **iOS:** Wraps `NSUbiquitousKeyValueStore` via Capacitor plugin (community plugin or thin custom plugin). `mirror(key, value)` writes to KVS in addition to Preferences. Launch routine `reconcile()` reads KVS → merges into local: max-`lastTs` per mastery item, history dedupe by `ts`, pace/lang last-write-wins.
- **Android:** No-op at runtime. Sync delivered transparently by Auto Backup (manifest `allowBackup=true` + `android/app/src/main/res/xml/backup_rules.xml` rules covering Capacitor SharedPrefs). `reconcile()` returns immediately.
- **Free users:** All methods no-op.
- **Conflict policy:** documented in `services/sync.ts`; tested via two-device manual scenario.
- **Deps:** `services/storage`, `services/iap`, `services/platform`, iCloud Capacitor plugin (iOS).

### 3.15 Android shell (Capacitor 8)
- **Purpose:** Wrap the React SPA in a native Android app (WebView at `https://localhost`). Same JS bundle as web/iOS.
- **Layout:** `capacitor.config.ts` (root, shared) + `android/` Gradle project. `cap sync android` copies `dist/` → `android/app/src/main/assets/public/` (gitignored).
- **Lifecycle:** Single `MainActivity` extending `BridgeActivity`. Edge-to-edge layout via `WindowCompat.setDecorFitsSystemWindows(false)` + CSS `env(safe-area-inset-*)`.
- **Hardware back:** Default `BridgeActivity` back-button handler invokes WebView `goBack()`; falls through to default activity finish when stack empty. App routes back-button events to `App.tsx` `onBack` listener via Capacitor `App.addListener('backButton', …)`.
- **Backup:** `android:allowBackup="true"` + `fullBackupContent="@xml/backup_rules"` referencing SharedPrefs `Capacitor.Preferences`.
- **Scripts:** `deno task build:android` (`VITE_BASE_PATH=./` + `VITE_PLATFORM=android`) → `android:sync` → `android:open`.
- **Deps:** `@capacitor/android` v8, AGP 8.x, Gradle 8.x, JDK 17.
- **Known gotchas:**
  - Auto Backup excludes anything outside SharedPrefs/files dir by default — Capacitor `Preferences` plugin uses SharedPrefs file `CapacitorStorage`, must be explicitly included in `backup_rules.xml`.
  - WebView third-party cookie behavior changed in API 33+; not relevant for `https://localhost` but watch for fetch failures on emulator.
  - `versionCode` is a monotonic int — the release build outside this repo assigns it, never a git tag (tags can be re-cut).
  - Google Play requires AAB (not APK) since 2021; `bundleRelease` is the canonical task.

## 4. Data
- **Entities:**
  - `DataItem = { q, answer, hint, label?, decoys?, rule? }`
  - `BuildItem = { words, translation }`
  - `LiItem = { words, liPosition, result, translation }`
  - `MatchItem = { left, right, hint }`
  - `OddItem = { words, odd, hint, rule? }`
  - `ParadigmItem = { verb, pronouns, forms, hint, rule? }`
  - `Mode = { id, icon, label, desc, example, type: EngineType, data: () => Item[] }` — `example` is the required worked model (FR-TASK-MODEL), `stimulus → answer` (`↔` for match, finished sentence for build)
  - `SessionPace = "quick" | "standard" | "deep"` → `SESSION_SIZE_BY_PACE = {quick:3, standard:5, deep:8}`
  - `Category = { id, name, modes: Mode[] }`
  - `Lesson = { id, num, title, modeIds: string[], available: boolean, tier: "free" | "pro" }`
  - `Platform = "web" | "ios" | "android"`
  - `ProState = { unlocked: boolean, lastChecked: ms }`
  - `Screen = "lessons" | "lesson" | "game" | "results" | "analytics" | "paywall"`
  - `HistoryEntry = { mode, score, time, errors, ts, lessonId?, round?, qsTotal? }`
  - `ItemMastery = { level: 0..10, lastTs: ms, attempts }`
  - `ModeMastery = Record<itemId, ItemMastery>`; `MasteryStore = Record<modeId, ModeMastery>`
- **ERD:** None (no relational data). `Category 1—n Mode 1—n Item` in-memory.
- **Migration:** Storage keys = `bg-trainer-v3` (history) + `bg-trainer-mastery-v1` (mastery) + `bg-trainer-pace-v1` (pace) + `bg-trainer-lang-v1` (locale) + `bg-trainer-pro-v1` (Pro entitlement cache, mobile only). Bumping the `v*` suffix effectively resets; older keys are left orphaned. All schemas are independent. `itemKey()` migration: `BuildItem`/`LiItem` keys switched from Russian `translation` to Bulgarian `words.join("|")` / `result` — pre-existing mastery for build/li modes is silently orphaned (acceptable: small data subset, transparent re-learning). Pro-only KVS mirror (iOS) writes the same keys to `NSUbiquitousKeyValueStore`; reconcile routine merges on launch.

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
- **Scale:** Single user, in-memory + `localStorage`. 200-entry cap prevents unbounded growth.
- **Fault tolerance:** Storage errors → silent no-op. Parse errors → empty history.
- **Sec:** No PII, no external requests, static deploy.
- **Logs:** None — browser console only during dev.

## 7. Constraints
- **Simplified:**
  - No test suite (not configured).
  - No linter (ESLint not installed).
  - i18n covers only `ru` and `uk`. Bulgarian content shared. `DATA_GENDER` answers/options remain Russian (`мужской`/`женский`/`средний`) for v1 — Ukrainian users see Russian gender labels there.
  - Accessibility covered for type size and contrast (FR-A11Y-TEXT, FR-A11Y-CONTRAST); no formal audit, no VoiceOver rotor walkthrough on device.
  - Text scale capped at 1.4x. Beyond that the fixed-height controls (`min-h-[3.5rem]`, `h-14`, `w-12 h-12`) would need a reflow pass.
  - Column count uses character length, not measured text width — a proxy that holds for Cyrillic at the current ramp but would drift if the font or ramp changed.
  - iOS deployment target 15.0+, portrait+landscape allowed (to be locked portrait for App Store — FR-IOS-APPSTORE).
  - Web is fully free — no paywall, no IAP, no tier enforcement. Strategic choice: mobile premium positioning vs free web reach.
  - No cross-platform iOS↔Android sync — would require backend, ruled "complication" by product.
  - One-time IAP only, no subscriptions, no consumables.
  - No store-release CI in this repo (FR-IOS-CICD). Its workflows publish the web app only; signing, `.ipa` packaging and ASC upload run outside the repository, so no signing or App Store Connect credential is stored here.
- **Deferred:**
  - Test harness (Vitest/Playwright) — to add when regressions appear.
  - ESLint + Prettier — for consistent code quality.
  - Mode-level settings (session length, difficulty).
  - Export/import history.
  - iOS App Store submission assets (AppIcon, LaunchScreen, Privacy Manifest) — FR-IOS-APPSTORE.
  - Native integrations (splash, haptics, status-bar) — FR-IOS-UX.
  - Storage migration `localStorage` → `@capacitor/preferences` — FR-IOS-STORAGE.
  - Android shell + Play Store assets — FR-ANDROID-SHELL, FR-ANDROID-PLAYSTORE, FR-ANDROID-CICD.
  - Freemium gating + paywall + RevenueCat integration — FR-FREEMIUM, FR-IAP, FR-PAYWALL.
  - Pro-only cloud sync (iCloud KVS / Auto Backup) — FR-SYNC-PAID.
  - Lessons L5–L8 implementation — separate track, not blocking mobile release.
