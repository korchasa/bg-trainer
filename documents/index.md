# Documentation Index

## ADR

- [ADR-0001](adr/2026-05-03-ship-ios-v1-full-vertical-slice.md) — Ship iOS v1.0 (monetization slice dropped → paid app $1.99, all 8 lessons included; freemium/IAP/paywall/sync removed) — superseded-in-part

## FR

- [FR-PAID](requirements.md#324-fr-paid) — Paid one-time download ($1.99 USD ≈ €2.49 EUR), all 8 lessons included, no IAP/paywall/tier — implemented (code-side: no IAP/tier/paywall; ASC Pricing form pending)
- [FR-IOS-APPSTORE](requirements.md#319-fr-ios-appstore) — App Store submission assets and metadata — partial (code-side closed; ASC listing partial: app registered, Education+4+ set, Localized Name/Subtitle/version metadata filled EN+RU+UK, custom domain `bgtrainer.korchasa.dev` live with privacy policy; pending: Privacy URL save, App Privacy = "Data Not Collected", Pricing tier $1.99, screenshots, signing, TestFlight upload)
- [FR-IOS-CICD](requirements.md#323-fr-ios-cicd) — TestFlight delivery on release tags — partial (workflow + setup doc done; first tagged TestFlight run pending secrets population — see `documents/ios-release-setup.md`)
- [FR-IOS-POLISH](requirements.md#322-fr-ios-polish) — Native a11y, dark, iPad-drop, crash reporting — partial (dark opt-out, iPad drop, VoiceOver labels, Dynamic Type rem done; manual rotor walkthrough + Sentry pending)
- [FR-IOS-STORAGE](requirements.md#321-fr-ios-storage) — Capacitor Preferences adapter + migration (local-only, no cloud sync) — partial (adapter + migration + bootReady done, on-device verification pending)
- [FR-IOS-UX](requirements.md#320-fr-ios-ux) — Native splash, status-bar, haptics, fonts, gestures — implemented (Inter scope dropped — system fonts already meet the no-runtime-fetch requirement)
- [FR-LESSONS](requirements.md#310-fr-lessons) — 8-lesson curriculum (all unlocked, no tier field) — implemented
- [FR-MENU](requirements.md#31-fr-menu) — Lessons list, all available lessons open directly — implemented
- [FR-NAV](requirements.md#39-fr-nav) — Screen flow (lessons/lesson/game/results/analytics; no paywall) — implemented
- [FR-FREEMIUM / FR-IAP / FR-PAYWALL](requirements.md#324-fr-paid) — removed, superseded by FR-PAID
- [FR-SYNC-PAID](requirements.md#330-fr-sync-paid-removed) — removed (no Pro tier; progress local-only)
