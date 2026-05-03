import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LocaleProvider } from './i18n/context'
import { initStorage } from './utils/storage'
import { applyStatusBarStyle, hideNativeSplash } from './utils/nativeUx'

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

  // FR-IOS-UX: status bar style is set immediately so glyph color matches the
  // light app background; native splash is dismissed after the first React
  // paint so the WebView never shows an empty frame.
  void applyStatusBarStyle()
  requestAnimationFrame(() => {
    document.getElementById('splash')?.classList.add('hidden')
    void hideNativeSplash()
  })
})
