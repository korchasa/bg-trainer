import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Web app is served under /app/ in production (root is the marketing site).
// VITE_OUT_DIR lets the deploy workflow emit the app into dist/app while the
// static site/ files occupy dist root.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/app/',
  build: {
    outDir: process.env.VITE_OUT_DIR ?? 'dist',
  },
})
