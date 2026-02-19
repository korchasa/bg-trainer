# bg-trainer

Interactive Bulgarian language trainer for A0-level learners. The UI is in Russian, targeting Russian speakers who are learning Bulgarian.

**Live demo:** https://korchasa.github.io/bg-trainer/

## Features

- **8 grammar topic categories** with 15 interactive game modes
- **7 game engine types** — multiple choice, timed quiz, drag-and-drop, particle insertion, and more
- **Analytics dashboard** — score history, accuracy stats, mode distribution chart
- **Persistent progress** — game history saved to browser local storage (up to 200 sessions)
- **Mobile-first** responsive design

## Game Modes

| Category | Modes |
|---|---|
| Verb "съм" (to be) | Pick correct form, Timed quiz |
| "Имам" / "Искам" (have / want) | Pick correct form |
| Articles | Select the correct suffix (-ът, -та, -то, -те, -а) |
| Gender | Identify noun gender (masculine / feminine / neuter) |
| Plurals | Form plural nouns with decoys |
| Possessives | Full and short possessive forms |
| Negation | Construct correct negation from shuffled words |
| Question word order | Drag-to-order sentences; insert question particle "ли" |

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
