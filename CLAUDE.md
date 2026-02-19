# CLAUDE.md

## Project Overview

**bg-trainer** is an interactive Bulgarian language trainer for A0-level learners, with the UI in Russian (targeting Russian speakers). It is a single-page React app deployed to GitHub Pages.

**Live demo:** https://korchasa.github.io/bg-trainer/

---

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:5173/bg-trainer/
npm run build      # Type-check (tsc) then bundle with Vite → dist/
npm run preview    # Preview the production build locally
```

There are no test commands — the project has no test suite.

---

## Architecture

### Tech Stack

- **React 18** + **TypeScript 5** — UI and logic
- **Vite 7** — build tool and dev server
- **Tailwind CSS 3** — utility-first styling
- **Recharts** — analytics charts
- **Browser localStorage** — game history persistence (`bg-trainer-v3`, max 200 sessions)

### Source Structure

```
src/
├── App.tsx                    # Root component: screen routing, game lifecycle
├── main.tsx                   # React entry point
├── index.css                  # Global styles (fonts, scrollbar, reset)
├── types.ts                   # All shared TypeScript interfaces and types
├── constants.ts               # Feedback messages, chart colors, storage key
├── data/
│   └── index.ts               # All exercise data and category/mode definitions
├── hooks/
│   ├── useGame.ts             # Game state (score, question index, answer logic)
│   └── useTimer.ts            # Countdown timer for timed mode
├── components/
│   ├── engines/               # One component per engine type
│   │   ├── PickEngine.tsx     # Multiple choice (3 shuffled options)
│   │   ├── TimedEngine.tsx    # Timed quiz with speed bonus points
│   │   ├── PickOptEngine.tsx  # Fixed option set (e.g. articles, gender)
│   │   ├── PickFromEngine.tsx # Pick correct form from decoys
│   │   ├── NegEngine.tsx      # Construct negation from word tiles
│   │   ├── BuildEngine.tsx    # Drag-to-order sentence builder
│   │   ├── LiEngine.tsx       # Tap position to insert particle "ли"
│   │   └── index.ts
│   ├── screens/
│   │   ├── ResultsScreen.tsx  # End-of-game results + stats
│   │   └── AnalyticsScreen.tsx# History dashboard with charts
│   └── ui/                    # Small reusable components
│       ├── AnswerBtn.tsx
│       ├── Progress.tsx
│       ├── Reaction.tsx
│       ├── Correction.tsx
│       ├── NavHeader.tsx
│       └── BackButton.tsx
└── utils/
    ├── history.ts             # localStorage read/write helpers
    └── shuffle.ts             # Fisher-Yates shuffle
```

### Screen Flow

```
"menu" → "game" → "results" → "menu"
  ↕                              ↕
"analytics" ←──────────────────→
```

`App.tsx` owns `screen`, `modeId`, `result`, and `history` state. The `useGame` hook owns per-game state (score, current question, selected answer, reaction message).

### Key Types (`src/types.ts`)

| Type | Purpose |
|------|---------|
| `EngineType` | `"pick" \| "timed" \| "pickOpt" \| "pickFrom" \| "negation" \| "build" \| "li"` |
| `DataItem` | `{ q, answer, hint, label?, decoys? }` — standard exercise item |
| `BuildItem` | `{ words, translation }` — sentence ordering exercise |
| `LiItem` | `{ words, liPosition, result, translation }` — particle insertion exercise |
| `Mode` | `{ id, icon, label, desc, type, data: () => ... }` |
| `Category` | `{ id, name, modes: Mode[] }` |
| `HistoryEntry` | `{ mode, score, time, errors, ts }` |
| `Screen` | `"menu" \| "game" \| "results" \| "analytics"` |

### Game Data (`src/data/index.ts`)

All exercise content and mode/category definitions live here. 8 categories, 15 modes total:

| Category | Mode IDs |
|----------|---------|
| Verb "съм" | `sym_pick`, `sym_fill` |
| Имам / Искам | `imam_pick`, `iskam_pick` |
| Articles | `art_pick` |
| Gender | `gen_pick` |
| Plurals | `pl_pick` |
| Possessives | `poss_pick` |
| Negation | `neg_tf` |
| Question word order | `q_build`, `q_li` |

Each mode has a `data()` function that returns the exercise array. A game session always uses 15 questions, drawn from the mode's data.

### Scoring

- Correct answer: **+10 points**
- Timed mode (`TimedEngine`): speed bonus on top of base 10 pts
- Wrong answer: error count incremented, no points

---

## Deployment

- Pushes to `main` → auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`
- Feature branches → preview deployment at `/bg-trainer/preview/{branch-name}/` via `.github/workflows/preview.yml`
- Preview cleanup on branch deletion via `.github/workflows/cleanup-preview.yml`
- Vite base path is `/bg-trainer/` (set in `vite.config.ts`)

---

## Adding a New Exercise Mode

1. Add exercise data as `DataItem[]` (or `BuildItem[]` / `LiItem[]`) in `src/data/index.ts`
2. Add a `Mode` entry to the relevant `Category` (or create a new `Category`)
3. If using an existing engine type, no engine code changes needed
4. If a new interaction pattern is required, add a new engine in `src/components/engines/` and register it in `App.tsx`'s engine dispatch

---

## Style Conventions

- **Mobile-first**, max-width `md` container, centered
- Accent color: `#E60023`; dark background: `#111111`
- Tailwind utility classes throughout; no CSS modules
- No external UI component library — all UI is custom
