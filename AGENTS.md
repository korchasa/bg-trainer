# Core Project Rules
- Follow your assigned role strictly — it defines scope and boundaries for your actions.
- After finishing a session, review all project documents(readme.md, requirements.md, design.md, etc) to ensure they reflect the current state. Stale docs mislead future sessions.
- Verify every change by running appropriate tests or scripts — never assume correctness without evidence.
- Keep the project in a clean state: no errors, warnings, or issues in formatter and linter output. A broken baseline blocks all future work.
- Follow the TDD flow described below. Skipping it leads to untested code and regressions.
- Write all documentation in English, compressed style. Brevity preserves context window.
- If you see contradictions in the request or context, raise them explicitly, ask clarifying questions, and stop. Do not guess which interpretation is correct.
- Code should follow "fail fast, fail clearly" — surface errors immediately with clear messages rather than silently propagating bad state. Unless the user requests otherwise.
- When editing CI/CD pipelines, always validate locally first — broken CI is visible to the whole team and slow to debug remotely.
- Provide evidence for your claims — link to code, docs, or tool output. Unsupported assertions erode trust.
- Use standard tools (jq, yq, jc) to process and manage structured output — they are portable and well-understood.
- Do not add fallbacks, default behaviors, or error recovery silently — if the user didn't ask for it, it's an assumption. If you believe a fallback is genuinely needed, ask the user first.
- Do not enable security/privacy hardening flags (CSP, app-bound domains, CORS restrictions, sandboxing) unsolicited — they often require matching configuration elsewhere (manifest entries, allowlists) that may not be obvious, and can introduce latent bugs harder to debug than the risks they mitigate.
- Do not use tables in chat output — use two-level lists instead. Tables render poorly in terminal and are harder to scan.

---

## Project Information
- Project Name: bg-trainer
- Live app: https://app.bgtrainer.korchasa.dev/ (this repo)
- Marketing site + policies: https://bgtrainer.korchasa.dev/ (maintained outside this repository, Cloudflare Pages)

## Project Vision
Interactive Bulgarian language trainer for A0-level learners. UI in Russian or Ukrainian (user-selectable), targeting East-Slavic speakers learning Bulgarian. Single-page React app deployed to GitHub Pages. Delivers gamified grammar drills (21 categories, 250 modes, 12 engine types) with persistent progress and analytics.

## Project tooling Stack
- **Runtime/UI:** React 18, TypeScript 5
- **Build:** Vite 7
- **Styling:** Tailwind CSS 3, PostCSS, Autoprefixer
- **Charts:** Recharts 2
- **Persistence:** Browser `localStorage` (key `bg-trainer-v3`, max 200 sessions)
- **Package manager:** npm (dependencies only)
- **Command runner:** Deno 2 — every verb is `deno task <verb>`, declared in `deno.json` and implemented in dependency-free TypeScript under `scripts/`
- **Hosting:** GitHub Pages, custom domain `app.bgtrainer.korchasa.dev` (CNAME in `public/`). The app owns the root (Vite base `/`). The marketing site is a different repo on Cloudflare Pages
- **CI/CD:** GitHub Actions (`check.yml`, `deploy.yml`, `preview.yml`, `cleanup-preview.yml`)

## Architecture

### Screen Flow
```
"menu" → "game" → "results" → "menu"
  ↕                              ↕
"analytics" ←──────────────────→
```
`App.tsx` owns `screen`, `modeId`, `result`, `history`. Hook `useGame` owns per-game state (score, current question, selected answer, reaction).

### Source Structure
```
src/
├── App.tsx                  # Root: screen routing, game lifecycle
├── main.tsx                 # React entry
├── index.css                # Global styles
├── types.ts                 # Shared TS types
├── constants.ts             # Feedback messages, chart colors, storage key
├── data/index.ts            # Exercise data + category/mode definitions
├── hooks/
│   ├── useGame.ts           # Score, question index, answer logic
│   └── useTimer.ts          # Countdown for timed mode
├── components/
│   ├── engines/             # One per engine type
│   │   ├── PickEngine.tsx       # Multiple choice (3 shuffled)
│   │   ├── TimedEngine.tsx      # Timed quiz + speed bonus
│   │   ├── PickOptEngine.tsx    # Fixed option set (articles, gender)
│   │   ├── PickFromEngine.tsx   # Pick correct form from decoys
│   │   ├── NegEngine.tsx        # Construct negation from tiles
│   │   ├── BuildEngine.tsx      # Drag-to-order sentence
│   │   ├── LiEngine.tsx         # Insert particle "ли"
│   │   ├── FrameEngine.tsx      # Produce a sentence from a translation; scaffolding fades by lesson
│   │   └── index.ts
│   ├── screens/
│   │   ├── ResultsScreen.tsx    # End-of-game results + stats
│   │   └── AnalyticsScreen.tsx  # History dashboard + charts
│   └── ui/                  # Reusable atoms (AnswerBtn, Progress, Reaction, Correction, NavHeader, BackButton, TaskPrompt)
└── utils/
    ├── history.ts           # localStorage read/write
    └── shuffle.ts           # Fisher-Yates shuffle

public/                      # Copied verbatim into the build
├── CNAME                    # app.bgtrainer.korchasa.dev
└── favicon.svg
```

The landing page, privacy policy and terms are NOT in this repo — they are
maintained outside it and deploy to Cloudflare Pages at `bgtrainer.korchasa.dev`.

### Key Types (`src/types.ts`)
- `EngineType` — `"pick" | "timed" | "pickOpt" | "pickFrom" | "negation" | "build" | "li" | "type" | "match" | "odd" | "paradigm" | "frame"`
- `DataItem` — `{ q, answer, hint, label?, decoys? }` standard exercise
- `BuildItem` — `{ words, translation }` sentence ordering
- `LiItem` — `{ words, liPosition, result, translation }` particle insertion
- `Mode` — `{ id, icon, label, desc, example, type, data: () => ... }` (`example` = required worked model, see below)
- `Category` — `{ id, name, modes: Mode[] }`
- `HistoryEntry` — `{ mode, score, time, errors, ts }`
- `Screen` — `"menu" | "game" | "results" | "analytics"`

### Game Data
Mode and category definitions live in `src/data/index.ts`; the exercises themselves in `src/data/lesson1.ts` … `lesson8.ts` plus `src/data/frames.ts` (sentence-production drills), and the lesson→mode mapping in `src/data/lessons.ts`. Currently 21 categories and 250 modes over 8 lessons — count them with `CATEGORIES.length` / `ALL_MODES.length` rather than trusting a number written here.

Each mode has a `data()` returning its exercise array. A session draws `pace` questions from that mode (3 / 5 / 8), picked by the scheduler in `utils/mastery.ts`, not at random.

**Exercise punctuation:** meaningless sentence-final periods are absent from the data and nothing trims them at render. Periods that carry meaning stay — abbreviations (`ул.`, `1 stot.`, `м.р., ед.`), `?`, `!`, `…`, and prose translations. Decide per exercise when writing one; never sweep with a regex. In `BuildItem.words`, a punctuation token (`. , ? ! …`) is template furniture: `BuildEngine` renders it in a fixed position and keeps it out of the tile pool (FR-BUILD), so write the mark where it belongs and never treat it as a tile the learner drags. `deno task test` asserts this over all data (`scripts/punct.ts`).

### Scoring
- Correct answer: **+10 pts**
- `TimedEngine`: speed bonus on top of 10 pts
- Wrong: error count++, no points

## Key Decisions
- **No unit-test suite** — no test runner is configured, so the TDD flow below is aspirational until a framework is added. What `deno task test` does run are invariants over the lesson data (FR-BUILD punctuation, FR-TASK-MODEL worked examples, FR-FRAME lexicon) and over the engines (FR-HINT-MODAL, FR-QUESTION-PINNED, FR-FEEDBACK-CENTRED), which is where this app's bugs actually live.
- **Styling:** Tailwind utility classes throughout; no CSS modules; no external UI component library — all UI is custom.
- **Design system:** Accent `#E60023`, dark background `#111111`. Mobile-first, max-width `md`, centered.
- **Persistence:** Browser `localStorage` only, keyed `bg-trainer-v3`, capped at 200 sessions.
- **Checks:** every pull request and every push to `main` → `check.yml`: `npm ci` then `deno task check` — the task-script tooling, `tsc` plus the Vite bundle, a comment scan, and the data invariants (FR-BUILD punctuation, FR-TASK-MODEL examples, FR-HINT-MODAL, FR-QUESTION-PINNED and FR-FEEDBACK-CENTRED engines, FR-FRAME lexicon). There is still no unit-test suite. Feature branches get the same build through `preview.yml`, so `check.yml` deliberately skips them.
- **Deployment:**
  - `web-v*` tag push or manual `workflow_dispatch` → `deploy.yml`: builds app (`VITE_BASE_PATH=/`, `VITE_OUT_DIR=dist`) → publishes `dist/` to `gh-pages` with `keep_files: true`. Result: the app owns the root of `app.bgtrainer.korchasa.dev`. Merging to `main` publishes nothing. Only `web-v*` publishes; dispatch accepts any branch or tag, so an untagged emergency publish stays possible
  - Feature branches → preview at `/preview/{branch-name}/` via `preview.yml` (built at that base; survives deploys thanks to `keep_files`)
  - Branch delete → cleanup via `cleanup-preview.yml`
  - **No store-release pipeline in this repo.** CI publishes the web app and nothing else. `deno task dist` produces an unsigned iOS archive; signing, packaging and upload to App Store Connect happen outside this repository and are not automated here
- **Repo split:** this repo publishes only the web app. The landing page and the privacy/terms pages are maintained outside it and served by Cloudflare Pages at `bgtrainer.korchasa.dev`; policy URLs are `/privacy` and `/terms` (the `.html` forms 308-redirect). `public/` ships inside the app build and holds the CNAME.
- **Stale `app/` in `gh-pages`:** `keep_files: true` never deletes, so anything published under an older layout lingers until removed by hand.
- **Adding a new mode:**
  1. Add `DataItem[]` / `BuildItem[]` / `LiItem[]` to `src/data/index.ts`
  2. Add `Mode` entry to the relevant `Category` (or create new `Category`), including `example` — the worked model shown under the task on every question (FR-TASK-MODEL). Write it `stimulus → answer` (`↔` for `match`, finished sentence for `build`), in prose spacing, and take the textbook's own «Примерен образец» when the lesson prints one. `paradigm` modes take no `example` — `ParadigmEngine` pre-fills the 1sg row as the model. `deno task test` asserts all of this
  3. Add the mode id to that lesson's `modeIds` in `src/data/lessons.ts`. The UI reaches modes only through lessons — no screen ever reads `CATEGORIES` — so a mode missing here is invisible to the learner while every invariant stays green. `scripts/lessons.ts` asserts this, so a forgotten id now fails `check` instead of going unnoticed
  4. If engine exists: no engine code changes
  5. If new interaction pattern: add engine in `src/components/engines/` and register in `App.tsx` dispatch

## Documentation Hierarchy
1. **`AGENTS.md`**: Project vision, constraints, mandatory rules. READ-ONLY reference.
2. **SRS** (`documents/requirements.md`): "What" & "Why". Source of truth for requirements.
3. **SDS** (`documents/design.md`): "How". Architecture and implementation. Depends on SRS.
4. **Tasks** (`documents/tasks/<YYYY-MM-DD>-<slug>.md`): Temporary plans/notes per task.
5. **`README.md`**: Public-facing overview. Installation, usage, quick start. Derived from AGENTS.md + SRS + SDS.

## Documentation Rules

Your memory resets between sessions. Documentation is the only link to past decisions and context. Keeping it accurate is not optional — stale docs actively mislead future sessions.

- Follow AGENTS.md, SRS, and SDS strictly — they define what the project is and how it works.
- Workflow for changes: new or updated requirement → update SRS → update SDS → implement. Skipping steps leads to docs-code drift.
- Status markers: `[x]` = implemented, `[ ]` = pending.
- Every `[x]` acceptance criterion must include evidence — file paths with line numbers proving implementation. Format:
  `- [x] Criterion text. Evidence: \`path/to/file.ts:42\`, \`other/file.md:10\``
  Without evidence, the criterion stays `[ ]` — claims without proof are assumptions.

### SRS Format (`documents/requirements.md`)
```markdown
# SRS
## 1. Intro
- **Desc:**
- **Def/Abbr:**
## 2. General
- **Context:**
- **Assumptions/Constraints:**
## 3. Functional Reqs
### 3.1 FR-CMD-EXEC
- **Desc:**
- **Scenario:**
- **Acceptance:**
---

## 4. Non-Functional

- **Perf/Reliability/Sec/Scale/UX:**

## 5. Interfaces

- **API/Proto/UI:**

## 6. Acceptance

- **Criteria:**

````

### SDS Format (`documents/design.md`)
```markdown
# SDS
## 1. Intro
- **Purpose:**
- **Rel to SRS:**
## 2. Arch
- **Diagram:**
- **Subsystems:**
## 3. Components
### 3.1 Comp A
- **Purpose:**
- **Interfaces:**
- **Deps:**
...
## 4. Data
- **Entities:**
- **ERD:**
- **Migration:**
## 5. Logic
- **Algos:**
- **Rules:**
## 6. Non-Functional
- **Scale/Fault/Sec/Logs:**
## 7. Constraints
- **Simplified/Deferred:**
````

### Tasks (`documents/tasks/`)

- One file per task or session: `<YYYY-MM-DD>-<slug>.md` (kebab-case slug, max 40 chars).
- Examples: `2026-03-24-add-dark-mode.md`, `2026-03-24-fix-auth-bug.md`.
- Do not reuse another session's task file — create a new file. Old tasks provide context but may contain outdated decisions.
- Use GODS format (see below) for issues and plans.
- Directory is gitignored. Files accumulate — this is expected.

### GODS Format

```markdown
---
implements:
  - FR-XXX
---
# [Task Title]

## Goal

[Why? Business value.]

## Overview

### Context

[Full problematics, pain points, operational environment, constraints, tech debt, external URLs, @-refs to relevant files/docs.]

### Current State

[Technical description of existing system/code relevant to task.]

### Constraints

[Hard limits, anti-patterns, requirements (e.g., "Must use Deno", "No external libs").]

## Definition of Done

- [ ] [Criteria 1]
- [ ] [Criteria 2]

## Solution

[Detailed step-by-step for SELECTED variant only. Filled AFTER user selects variant.]
```

### Compressed Style Rules (All Docs)

- No changelogs — docs reflect current state, not history.
- English only (except tasks, which may use the user's language).
- Summarize by extracting facts and compressing — no loss of information, just fewer words.
- Every word must carry meaning — no filler, no fluff, no stopwords where a shorter synonym works.
- Prefer compact formats: lists, tables, YAML, Mermaid diagrams.
- Abbreviate terms after first use — define once, abbreviate everywhere.
- Use symbols and numbers to replace words where unambiguous (e.g., `→` instead of "leads to").

## Planning Rules

- **Environment Side-Effects**: When changes touch infra, databases, or external services, the plan must include migration, sync, or deploy steps — otherwise the change works locally but breaks in production.
- **Verification Steps**: Every plan must include specific verification commands (tests, validation tools, connectivity checks) — a plan without verification is just a wish.
- **Functionality Preservation**: Before editing any file for refactoring, run existing tests and confirm they pass — this is a prerequisite, not a suggestion. Without a green baseline you cannot detect regressions. Run tests again after all edits. Add new tests if coverage is missing.
- **Data-First**: When integrating with external APIs or processes, inspect the actual protocol and data formats before planning — assumptions about data shape are the #1 source of integration bugs.
- **Architectural Validation**: For complex logic changes, visualize the event sequence (sequence diagram or pseudocode) — it catches race conditions and missing edges that prose descriptions miss.
- **Variant Analysis**: When the path is non-obvious, propose variants with Pros/Cons/Risks per variant and trade-offs across them. Quality over quantity — one well-reasoned variant is fine if the path is clear.
- **Plan Persistence**: After variant selection, save the detailed plan to `documents/tasks/<YYYY-MM-DD>-<slug>.md` using GODS format — chat-only plans are lost between sessions.
- **Proactive Resolution**: Before asking the user, exhaust available resources (codebase, docs, web) to find the answer autonomously — unnecessary questions slow the workflow and signal lack of initiative.

## TDD Flow

1. **RED**: Write a failing test (`test <id>`) for new or changed logic.
1a. **PROVE THE RED**: with no test runner, every check here is a hand-written text scan, and a broken pattern is indistinguishable from a finding. Before trusting a red, break exactly one thing the scan is supposed to catch — `cp` the file first, restore from that copy, never `git checkout --` — and confirm the failure names that one thing and nothing else. A scan that reports every call site as malformed is a bad pattern, not a bad codebase: `/onComplete\([^()]*,[^()]*,[^()]*,[^()]*\)/` flags every real call, because each one contains `Date.now()` and the character class excludes brackets. A rename that keeps the searched substring (`<Foo` → `<FooXX`) proves nothing at all — it stays green either way.
2. **GREEN**: Write minimal code to pass the test.
3. **REFACTOR**: Improve code and tests without changing behavior. Re-run `test <id>`.
4. **CHECK**: Run `fmt`, `lint`, and full test suite. You are NOT done after GREEN — skipping CHECK leaves formatting errors and regressions undetected. This step is mandatory.

### Test Rules

- Test logic and behavior only — do not test constants or templates, they change without breaking anything.
- Tests live in the same package. Testing private methods is acceptable when it improves coverage of complex internals.
- Write code only to fix failing tests or reported issues — no speculative implementations.
- No stubs or mocks for internal code. Use real implementations — stubs hide integration bugs.
- Run all tests before finishing, not just the ones you changed.
- When a test fails, fix the source code — not the test. Do not modify a failing test to make it pass, do not add error swallowing or skip logic.
- Do not create source files with guessed or fabricated data to satisfy imports — if the data source is missing, that is a blocker (see Diagnosing Failures).

## Diagnosing Failures

The goal is to identify the root cause, not to suppress the symptom. A quick workaround that hides the root cause is worse than an unresolved issue with a correct diagnosis.

1. Read the relevant code and error output before making any changes.
2. Grep console/log output for documented framework warnings (deprecation notices, lifecycle requirements, permission prompts) and treat them as primary signals. Do not de-prioritize them as "deprecation noise" — on iOS, Android, and browser frameworks they are often the direct cause of perceived performance/UX issues. Investigate the warning before optimizing adjacent concerns (bundle size, network, fonts, caches).
3. Apply "5 WHY" analysis to find the root cause.
4. Root cause is fixable → apply the fix, retry.
5. Second fix attempt failed → STOP. Output "STOP-ANALYSIS REPORT" (state, expected, 5-why chain, root cause, hypotheses). Wait for user help.

When the root cause is outside your control (missing API keys/URLs, missing generator scripts, unavailable external services, wrong environment configuration) → STOP immediately and ask the user for the correct values. Do not guess, do not invent replacements, do not create workarounds.

## Development Commands

### Shell Environment
- Always use `NO_COLOR=1` when running shell commands — ANSI escape codes waste tokens and clutter output.
- When writing scripts, respect the `NO_COLOR` env var (https://no-color.org/) — disable ANSI colors when it is set.

### Standard Interface
- `check` — comprehensive project verification (build + comment-scan + fmt + lint + tests).
- `test <path>` — run a single test file or suite.
- `dev` — run the app in development mode with watch.
- `prod` — run the app in production mode.

### Detected Commands
Every command is a Deno task (`deno.json`). `package.json` carries no `scripts`
block: npm installs the Vite/Capacitor toolchain, the tasks drive it.

- `npm ci` — install the Node dependencies the tasks call (`tsc`, `vite`, `cap`)
- `deno task check` — the gate: task-script tooling (`deno fmt --check`, `deno lint`, `deno check`) + `tsc` + Vite bundle + comment scan + data invariants
- `deno task test` — the automated assertions: build-mode punctuation over every `words[]` array in `src/data` (FR-BUILD), a worked example on every mode (FR-TASK-MODEL), the hint living in the header modal rather than in an engine (FR-HINT-MODAL), the question pinned to the top of the play area (FR-QUESTION-PINNED), the answer verdict centred over the visible game area (FR-FEEDBACK-CENTRED), accuracy measured against the session that was actually played (FR-RESULTS, FR-ANALYTICS), and every frame word coming from its lesson's cumulative lexicon (FR-FRAME). No unit-test suite exists yet
- `deno task dev` — Vite dev server at http://localhost:5173/
- `deno task prod` — build, then serve that build locally
- `deno task build` / `deno task build:ios` — `tsc` + Vite bundle, web or iOS flavour (the iOS one forces a relative base path)
- `deno task dist` — unsigned iOS archive at `ios/App/build/App.xcarchive`; signing and upload happen outside this repository
- `deno task ios:sync` / `deno task ios:open` — Capacitor sync and Xcode
- `deno task fmt` — format the task scripts (the React sources have no formatter configured)

### Command Scripts
- `deno.json` — the task table; it is the only place a verb is declared. Every task is `deno run -A scripts/<verb>.ts`.
- `scripts/lib.ts` — process runner, file walker and the source scanner the gate uses instead of `grep -RInE` (the platform grep is not always GNU grep, and dialect differences change what the gate catches). `scripts/node.ts` — resolves `node_modules/.bin/<tool>` and turns a missing install into one clear message instead of an npm error page. `scripts/punct.ts`, `scripts/examples.ts`, `scripts/hint.ts`, `scripts/sticky.ts`, `scripts/feedback.ts`, `scripts/classnames.ts`, `scripts/bank.ts`, `scripts/accuracy.ts` and `scripts/lexicon.ts` — the FR-BUILD, FR-TASK-MODEL, FR-HINT-MODAL, FR-QUESTION-PINNED, FR-FEEDBACK-CENTRED, no-Tailwind-class-from-a-variable, sorted-bank, FR-RESULTS/FR-ANALYTICS and FR-FRAME invariants, all run by `test`.
- The scripts import nothing from JSR or npm; `check` type-checks and lints them before it does anything else.

**A new invariant belongs in a script, and the script belongs in `check`.** With no test runner, these scripts are the only thing standing between a bad data edit and production — and one that runs only when an agent remembers it guards nothing. Add it to `scripts/`, wire it into `scripts/test.ts`, and `check` picks it up.

### Scripts that evaluate the app's data
Most invariants scan `src/` as text. `scripts/lexicon.ts` cannot: it has to call `mode.data()`. `deno.json` enables `sloppy-imports`, so a script may import the app's extensionless sources directly (`import { ALL_MODES } from "../src/data/index.ts"`).

One wall, found the hard way: anything reaching `src/utils/platform.ts` reads `import.meta.env`, which does not exist outside Vite, and throws `Cannot read properties of undefined (reading 'VITE_PLATFORM')`. That rules out `utils/storage.ts`, `utils/mastery.ts`, `utils/nativeUx.ts` and `hooks/useGame.ts` — and so `sliceData.ts`, which imports `mastery`. Safe today: everything under `src/data/`, `utils/itemKey.ts`, `utils/punct.ts`, `utils/shuffle.ts`. Confirm with `grep -rln "import\.meta" src/` before assuming.

Claiming a word is absent from the course is a negative claim about eight lesson files at once — never make it from one file, and never by analogy with a neighbouring word that was checked. Scan all eight, and scan `git show HEAD:src/data/lessonN.ts` when the point is whether the word predates the current change. Cost a wrong statement about `срещам` on 2026-08-06: it was called course-external in a review while `Те се срещат` sat in `lesson4.ts` and `ще се срещне` in `lesson5.ts`, both older than the diff under review.

Needing to *test* one of those modules is not a dead end. Copy it beside the original (`src/utils/<name>.pure.tmp.ts` — a relative import will not resolve from `/tmp`), replace **only** the storage import with three stubs, and leave every pure function byte-identical; assert the anchor line is present so the patch fails loudly if that import ever moves. Delete the copy in the same command that creates it. Used to measure the mastery model against real lesson data, and later to prove a refactor left `migrateParadigmKeys` behaviour untouched — both in one command each, where the alternative was replaying sessions by hand in the browser.

### Worktrees
`.claude/worktrees/*` contains an **empty** `node_modules`; dependency resolution walks up to `/Users/korchasa/www/business/bg-trainer/node_modules`, which is why builds work there at all. A worktree created outside the repository tree (say under `/tmp`, to build a parent revision for comparison) resolves nothing. The failure text depends on how far the run gets: a build reports hundreds of `Cannot find module 'react'`, while `deno task check` stops earlier, in `scripts/node.ts`, at `error: node_modules/.bin/tsc is missing — run \`npm ci\` first`. Both say the same thing — the worktree resolves no dependencies — and a red baseline there is not a broken parent revision. Symlink its `node_modules` at the **main repo** path, never at the current worktree's, and never `npm ci` into the worktree.

### Browser Automation Access
- `foxcode-run-project-profile` (skill) launches a Firefox profile bridged via `mcp__plugin_foxcode_foxcode__evalInBrowser` (ws://localhost:8795).
- Through it the agent can drive any authenticated web UI in the user's browser session — including App Store Connect, RevenueCat, GitHub, GitHub Pages dashboards, and arbitrary sites.
- Use it to: inspect live app state, fetch IAP/subscription config, verify deploys, scrape pages, automate forms, take screenshots, run JS in the page context.
- Prefer this over guessing or asking the user for data that is reachable from a logged-in browser. Do not ask for credentials — the user is already authenticated in the profile.
- Treat as a real action with side effects: confirm before clicking destructive buttons (delete, submit, publish, transfer).

**Prototypes go into the app, not into a scratch file.** A standalone HTML mockup outside the project cannot be shown to anyone: `file://` renders as a static snapshot with no JS, and an ad-hoc local server is blocked by policy. Build the prototype as a real screen behind the dev server (`preview_start` → `bg-trainer-dev`) — it renders with the project's own styles, it is clickable, and a screenshot of it is evidence.

**A `computer` click that reports success may still have done nothing.** Clicking a mode card by `ref` returned `left_click at (188, 741)` and only scrolled; a second click at the settled coordinates changed nothing at all, while `javascript_tool` clicking the same button by text worked immediately. So: after a click that should change state, read the state back. If it did not move, do not repeat the click — switch to `javascript_tool`. Note that a click handler fired that way runs before React re-renders, so a follow-up button that only just became enabled is still disabled at that instant — check `disabled` and click it in a separate call. The same boundary makes a burst of clicks in one call misleading: send six taps at a drill and the first few land, the rest run against the pre-render closure and are silently dropped, which reads on screen as a frozen engine. It is the probe, not the app — cost several turns and a nearly-reported false bug in the frame drill on 2026-08-05.

The way out is not one click per tool call. Define helpers in the page once — `__tap(words, gap = 350)` schedules the clicks with `setTimeout` so React commits between them, `__cycle()` walks a whole question (wrong answer, read the correct one out of the dialog, dismiss, answer it) — then call the helper and read the result in the next call. A five-question session drops from ~40 tool calls to ~8.

## Code Documentation

- **Module level**: each module gets an `AGENTS.md` describing its responsibility and key decisions.
- **Code level**: JSDoc/GoDoc for classes, methods, and functions. Focus on *why* and *how*, not *what*. Skip trivial comments — they add noise without value.
- **Requirement traceability**: when code implements a requirement from SRS (`documents/requirements.md`), add a `// FR-<ID>` (TS/JS/Go/Rust) or `# FR-<ID>` (YAML/shell/Python) comment next to the implementing logic. Code references requirements, not the reverse — SRS must not contain file paths. Exceptions: requirements verified by benchmarks or proven by file existence need no comment.

> **Before you start:** read `documents/requirements.md` (SRS) and `documents/design.md` (SDS) if you haven't in this session. They contain project requirements and architecture that inform every task.
>
> If the task touches the invariant scripts or drives the app in a browser, read **"Scripts that evaluate the app's data"** and **"Browser Automation Access"** above as well. Both record walls that cost hours when rediscovered — which module a script may not import, and why a burst of clicks looks like a frozen engine — and both name the exact modules and timings involved. Grepping this file for the term you are working on will not surface them.
