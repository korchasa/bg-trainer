# bg-trainer

Interactive Bulgarian language trainer for A0-level learners. The UI is in Russian or Ukrainian (user-selectable), targeting East-Slavic speakers who are learning Bulgarian.

**Live app:** https://app.bgtrainer.korchasa.dev/ — **about the project:** https://bgtrainer.korchasa.dev/

## Features

- **8 textbook-aligned lessons** (L1–L8 fully playable) with curated per-lesson game sets
- **Round mode** — 3 random games from the selected lesson, one aggregated result
- **Session pace** — 3 presets (quick/standard/deep = 3/5/8 questions per game); persisted per-browser
- **11 game engine types** — multiple choice, timed quiz, keyboard input, drag-and-drop, particle insertion, pair matching, odd-one-out, paradigm drill, and more
- **SRS-like item scheduling + error re-queue** — weak and due items surface first; wrong answers return later in the same session
- **Analytics dashboard** — score history + per-lesson aggregated stats
- **Persistent progress** — game history saved to browser local storage (up to 200 sessions)
- **Adjustable text size** — follows the iOS Dynamic Type setting by default, plus three manual steps; persisted per-device
- **Mobile-first** responsive design; no text below 13px, meaningful text at WCAG AA contrast

## Game Modes

Entry screen lists 8 lessons. Tapping an available lesson opens a pace selector (Быстро/Обычно/Длинно — 3/5/8 questions per game), its curated game set, and a "Раунд" button (3 random games × pace size). Current grammar coverage:

| Category | Modes |
|---|---|
| Verb "съм" (to be) | Pick correct form, Timed quiz, Type the form |
| "Имам" / "Нямам" / "Искам" (have / haven't / want) | Pick correct form |
| Articles | Select the correct suffix (-ът, -та, -то, -те, -а) |
| Gender | Identify noun gender (masculine / feminine / neuter) |
| Plurals | Form plural nouns with decoys |
| Possessives | Full and short possessive forms |
| Negation | Construct correct negation from shuffled words |
| Question word order | Drag-to-order sentences; insert question particle "ли" |
| Lesson 1 extras | Казвам се / говоря conjugation, country → language, nationality (m/f), profession (m → f), greetings, reply formulas, "Как си/сте" responses, "Това е/са" + objects vocab, "и…и / нито…нито", "нали" answers |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **Recharts** — analytics charts
- **GitHub Pages** — hosting

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/ in your browser. The base path defaults to `/` and is overridable through `VITE_BASE_PATH` — the preview workflow uses it to build at `/preview/{branch}/`.

### Production build

```bash
npm run build     # compiles TypeScript and bundles with Vite
npm run preview   # preview the production build locally
```

Output is written to `dist/`.

## Deployment

Publishing is release-driven — merging to `main` publishes nothing. The workflow in `.github/workflows/deploy.yml` publishes only the web app, at the root of its own subdomain:

- `app.bgtrainer.korchasa.dev/` — the React web app (this repo, GitHub Pages, CNAME in `public/`)
- `bgtrainer.korchasa.dev/` — marketing landing and policies, maintained outside this repository and deployed to Cloudflare Pages

```
web-v* tag (or manual run) → build app (base=/, outDir=dist) → publish dist/ to gh-pages (keep_files: true, so preview/ survives)
```

To release, push a `web-v*` tag (for example `web-v1.2.0`). You can also run the **Deploy to GitHub Pages** workflow manually from the **Actions** tab against any branch or tag — the escape hatch when there is nothing to tag.

> Web releases use `web-v*` only — no other tag pattern publishes anything. This repository has no store-release pipeline: `npm run dist` produces an **unsigned** iOS archive, and signing, packaging and upload to the App Store happen outside this repository.

Feature branches deploy to `app.bgtrainer.korchasa.dev/preview/{branch}/` and are removed when the branch is deleted.

## Project Structure

```
bg-trainer/
├── src/
│   ├── App.tsx        # Screen routing and game lifecycle
│   ├── main.tsx       # React entry point
│   ├── index.css      # Global styles
│   ├── data/          # Lesson content, mode and category definitions
│   ├── components/    # Game engines, screens, UI atoms
│   ├── hooks/         # Game state and timer
│   ├── i18n/          # RU/UK strings
│   └── utils/         # Storage, scheduling, text helpers
├── public/            # Copied verbatim into the build (CNAME, icons)
├── ios/               # Capacitor iOS shell
├── index.html         # Web app entry
├── vite.config.ts
├── tailwind.config.js
└── .github/
    └── workflows/
        └── deploy.yml
```

Lesson content and mode definitions live in `src/data/`; each engine is a component under `src/components/engines/`. `src/App.tsx` only routes between screens and drives the game lifecycle.

## License

MIT
