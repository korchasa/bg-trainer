import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The web app is served at the root of app.bgtrainer.korchasa.dev (GitHub Pages).
// The marketing landing lives in the app-store-factory repo (Cloudflare Pages).
// VITE_BASE_PATH is overridden per target: '/' for the web deploy, './' for the
// native iOS build (build:ios); the default here is for local `npm run dev`.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
  build: {
    outDir: process.env.VITE_OUT_DIR ?? 'dist',
  },
})
