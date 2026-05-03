# Documentation Index

## ADR

- [ADR-0001](adr/2026-05-03-ship-ios-v1-full-vertical-slice.md) — Ship iOS v1.0 as Full Vertical Slice — accepted

## FR

- [FR-FREEMIUM](requirements.md#324-fr-freemium) — Mobile-only content tier gating (free/pro) — partial (data + flag done, gate enforcement pending)
- [FR-IAP](requirements.md#325-fr-iap) — RevenueCat single non-consumable lifetime unlock — pending
- [FR-IOS-APPSTORE](requirements.md#319-fr-ios-appstore) — App Store submission assets and metadata — partial (code-side closed: AppIcon, LaunchScreen, PrivacyInfo, encryption flag, portrait lock, Privacy Policy; manual ASC listing/signing/screenshots/TestFlight pending)
- [FR-IOS-CICD](requirements.md#323-fr-ios-cicd) — TestFlight delivery on release tags — partial (workflow + setup doc done; first tagged TestFlight run pending secrets population — see `documents/ios-release-setup.md`)
- [FR-IOS-POLISH](requirements.md#322-fr-ios-polish) — Native a11y, dark, iPad-drop, crash reporting — partial (dark opt-out, iPad drop, VoiceOver labels, Dynamic Type rem done; manual rotor walkthrough + Sentry pending)
- [FR-IOS-STORAGE](requirements.md#321-fr-ios-storage) — Capacitor Preferences adapter + migration — partial (adapter + migration + bootReady done, on-device verification pending)
- [FR-IOS-UX](requirements.md#320-fr-ios-ux) — Native splash, status-bar, haptics, fonts, gestures — implemented (Inter scope dropped — system fonts already meet the no-runtime-fetch requirement)
- [FR-LESSONS](requirements.md#310-fr-lessons) — 8-lesson curriculum + tier field — implemented
- [FR-MENU](requirements.md#31-fr-menu) — Lessons list with pro-tier gating — partial (rendering done, mobile gate UI pending)
- [FR-NAV](requirements.md#39-fr-nav) — Screen flow incl. paywall — partial (paywall screen pending)
- [FR-PAYWALL](requirements.md#326-fr-paywall) — Paywall screen with localized price + Restore — pending
- [FR-SYNC-PAID](requirements.md#330-fr-sync-paid) — iCloud KVS sync for Pro users — pending
