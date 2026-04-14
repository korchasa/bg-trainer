# bg-trainer

Interactive Bulgarian language trainer for A0-level learners. The UI is in Russian, targeting Russian speakers who are learning Bulgarian.

**Live demo:** https://korchasa.github.io/bg-trainer/

## Features

- **8 textbook-aligned lessons** (L1 playable; L2–L8 marked "Скоро") with curated per-lesson game sets
- **Round mode** — 3 random games from the selected lesson, one aggregated result
- **Session pace** — 3 presets (quick/standard/deep = 3/5/8 questions per game); persisted per-browser
- **8 game engine types** — multiple choice, timed quiz, keyboard input, drag-and-drop, particle insertion, and more
- **SRS-like item scheduling + error re-queue** — weak and due items surface first; wrong answers return later in the same session
- **Analytics dashboard** — score history + per-lesson aggregated stats
- **Persistent progress** — game history saved to browser local storage (up to 200 sessions)
- **Mobile-first** responsive design

## Game Modes

Entry screen lists 8 lessons. Tapping an available lesson opens a pace selector (Быстро/Обычно/Длинно — 3/5/8 questions per game), its curated game set, and a "Раунд" button (3 random games × pace size). Current grammar coverage:

| Category | Modes |
|---|---|
| Verb "съм" (to be) | Pick correct form, Timed quiz, Type the form |
| "Имам" / "Искам" (have / want) | Pick correct form |
| Articles | Select the correct suffix (-ът, -та, -то, -те, -а) |
| Gender | Identify noun gender (masculine / feminine / neuter) |
| Plurals | Form plural nouns with decoys |
| Possessives | Full and short possessive forms |
| Negation | Construct correct negation from shuffled words |
| Question word order | Drag-to-order sentences; insert question particle "ли" |
| Lesson 1 extras | Казвам се / говоря conjugation, country → language, nationality (m/f), profession (m → f), greetings, "нали" answers |

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

Open http://localhost:5173/bg-trainer/ in your browser.

### Production build

```bash
npm run build     # compiles TypeScript and bundles with Vite
npm run preview   # preview the production build locally
```

Output is written to `dist/`.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

```
main branch push → build → upload artifact → deploy to GitHub Pages
```

You can also trigger a deployment manually from the **Actions** tab in GitHub.

## Project Structure

```
bg-trainer/
├── src/
│   ├── App.tsx        # Main application — all game engines, data, and UI
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── .github/
    └── workflows/
        └── deploy.yml
```

All game data and logic lives in `src/App.tsx`. Categories, modes, vocabulary, and game engines are defined there.

## License

MIT
