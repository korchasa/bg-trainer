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
- Do not use tables in chat output — use two-level lists instead. Tables render poorly in terminal and are harder to scan.

---

## Project Information
- Project Name: bg-trainer
- Live demo: https://korchasa.github.io/bg-trainer/

## Project Vision
Interactive Bulgarian language trainer for A0-level learners. UI in Russian or Ukrainian (user-selectable), targeting East-Slavic speakers learning Bulgarian. Single-page React app deployed to GitHub Pages. Delivers gamified grammar drills (8 categories, 15 modes, 7 engine types) with persistent progress and analytics.

## Project tooling Stack
- **Runtime/UI:** React 18, TypeScript 5
- **Build:** Vite 7
- **Styling:** Tailwind CSS 3, PostCSS, Autoprefixer
- **Charts:** Recharts 2
- **Persistence:** Browser `localStorage` (key `bg-trainer-v3`, max 200 sessions)
- **Package manager:** npm
- **Hosting:** GitHub Pages (Vite base path `/bg-trainer/`)
- **CI/CD:** GitHub Actions (`deploy.yml`, `preview.yml`, `cleanup-preview.yml`)

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
│   │   └── index.ts
│   ├── screens/
│   │   ├── ResultsScreen.tsx    # End-of-game results + stats
│   │   └── AnalyticsScreen.tsx  # History dashboard + charts
│   └── ui/                  # Reusable atoms (AnswerBtn, Progress, Reaction, Correction, NavHeader, BackButton, TaskPrompt)
└── utils/
    ├── history.ts           # localStorage read/write
    └── shuffle.ts           # Fisher-Yates shuffle
```

### Key Types (`src/types.ts`)
- `EngineType` — `"pick" | "timed" | "pickOpt" | "pickFrom" | "negation" | "build" | "li"`
- `DataItem` — `{ q, answer, hint, label?, decoys? }` standard exercise
- `BuildItem` — `{ words, translation }` sentence ordering
- `LiItem` — `{ words, liPosition, result, translation }` particle insertion
- `Mode` — `{ id, icon, label, desc, type, data: () => ... }`
- `Category` — `{ id, name, modes: Mode[] }`
- `HistoryEntry` — `{ mode, score, time, errors, ts }`
- `Screen` — `"menu" | "game" | "results" | "analytics"`

### Game Data
All content and mode/category definitions in `src/data/index.ts`. 8 categories, 15 modes:
- **Verb "съм":** `sym_pick`, `sym_fill`
- **Имам / Искам:** `imam_pick`, `iskam_pick`
- **Articles:** `art_pick`
- **Gender:** `gen_pick`
- **Plurals:** `pl_pick`
- **Possessives:** `poss_pick`
- **Negation:** `neg_tf`
- **Question word order:** `q_build`, `q_li`

Each mode has a `data()` returning the exercise array. A session = 15 questions drawn from that mode.

### Scoring
- Correct answer: **+10 pts**
- `TimedEngine`: speed bonus on top of 10 pts
- Wrong: error count++, no points

## Key Decisions
- **No test suite** — project has no tests, no test runner configured. TDD flow below is aspirational until a framework is added.
- **Styling:** Tailwind utility classes throughout; no CSS modules; no external UI component library — all UI is custom.
- **Design system:** Accent `#E60023`, dark background `#111111`. Mobile-first, max-width `md`, centered.
- **Persistence:** Browser `localStorage` only, keyed `bg-trainer-v3`, capped at 200 sessions.
- **Deployment:**
  - Push to `main` → GitHub Pages deploy via `.github/workflows/deploy.yml`
  - Feature branches → preview at `/bg-trainer/preview/{branch-name}/` via `preview.yml`
  - Branch delete → cleanup via `cleanup-preview.yml`
- **Adding a new mode:**
  1. Add `DataItem[]` / `BuildItem[]` / `LiItem[]` to `src/data/index.ts`
  2. Add `Mode` entry to the relevant `Category` (or create new `Category`)
  3. If engine exists: no engine code changes
  4. If new interaction pattern: add engine in `src/components/engines/` and register in `App.tsx` dispatch

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
2. Apply "5 WHY" analysis to find the root cause.
3. Root cause is fixable → apply the fix, retry.
4. Second fix attempt failed → STOP. Output "STOP-ANALYSIS REPORT" (state, expected, 5-why chain, root cause, hypotheses). Wait for user help.

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
Project uses npm scripts (`package.json`). No standardized `check/test/prod` scripts configured — no test runner or linter installed. Mapping:

- `npm install` — install dependencies
- `npm run dev` — Vite dev server at http://localhost:5173/bg-trainer/ (maps to `dev`)
- `npm run build` — `tsc` type-check + Vite bundle → `dist/` (closest to `check`; no linter or tests)
- `npm run preview` — serve the production build locally (maps to `prod`)
- `test` — **not configured**. No test suite exists.

### Command Scripts
No helper scripts in `scripts/`. All commands are inline npm scripts in `package.json`.

## Code Documentation

- **Module level**: each module gets an `AGENTS.md` describing its responsibility and key decisions.
- **Code level**: JSDoc/GoDoc for classes, methods, and functions. Focus on *why* and *how*, not *what*. Skip trivial comments — they add noise without value.
- **Requirement traceability**: when code implements a requirement from SRS (`documents/requirements.md`), add a `// FR-<ID>` (TS/JS/Go/Rust) or `# FR-<ID>` (YAML/shell/Python) comment next to the implementing logic. Code references requirements, not the reverse — SRS must not contain file paths. Exceptions: requirements verified by benchmarks or proven by file existence need no comment.

> **Before you start:** read `documents/requirements.md` (SRS) and `documents/design.md` (SDS) if you haven't in this session. They contain project requirements and architecture that inform every task.
