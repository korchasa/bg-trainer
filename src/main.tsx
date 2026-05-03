import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LocaleProvider } from './i18n/context'
import { initStorage } from './utils/storage'

// FR-IOS-STORAGE: hydrate native Preferences cache before mount, so the first
// render sees real persisted state. On web this resolves synchronously.
initStorage().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </StrictMode>,
  )

  requestAnimationFrame(() => {
    document.getElementById('splash')?.classList.add('hidden')
  })
})
