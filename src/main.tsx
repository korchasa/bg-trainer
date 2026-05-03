import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LocaleProvider } from './i18n/context'
import { initStorage } from './utils/storage'
import { applyStatusBarStyle, hideNativeSplash } from './utils/nativeUx'
import { initIap } from './services/iap'

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
  // FR-IAP: initialize RevenueCat after storage hydration so the cached
  // proUnlocked state is in place before the SDK starts emitting updates.
  // No await — listeners notify the React tree when entitlement state changes.
  void initIap()
  requestAnimationFrame(() => {
    document.getElementById('splash')?.classList.add('hidden')
    void hideNativeSplash()
  })
})
