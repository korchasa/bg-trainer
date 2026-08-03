# Documentation Index

## ADR

- [ADR-0001](adr/2026-05-03-ship-ios-v1-full-vertical-slice.md) — Ship iOS v1.0 (monetization slice dropped → paid app $1.99, all 8 lessons included; freemium/IAP/paywall/sync removed) — superseded-in-part

## FR

- [FR-PAID](requirements.md#324-fr-paid) — Paid one-time download ($1.99 USD ≈ €2.49 EUR), all 8 lessons included, no IAP/paywall/tier — implemented (code-side: no IAP/tier/paywall; ASC Pricing form pending)
- [FR-BUILD](requirements.md#344-fr-build) — Sentence-construction engine: punctuation is a fixed render-time template, never a learner tile — implemented
- [FR-ENGINES](requirements.md#34-fr-engines) — 12 engine types implementing distinct interaction patterns — implemented
- [FR-FRAME](requirements.md#345-fr-frame) — Sentence-production drill, one per lesson, on that lesson's cumulative lexicon — implemented
- [FR-FRAME-LADDER](requirements.md#346-fr-frame-ladder) — Scaffolding fades across lessons: labelled roles → bare slots → empty line → typing — implemented
- [FR-IOS-APPSTORE](requirements.md#319-fr-ios-appstore) — App Store submission assets and metadata — implemented (version 1.0 `READY_FOR_SALE`; signing and store upload happen outside this repo)
- [FR-IOS-CICD](requirements.md#323-fr-ios-cicd) — no store-release pipeline in this repo; CI publishes the web app only, signing and upload run outside it — implemented
- [FR-IOS-POLISH](requirements.md#322-fr-ios-polish) — Native a11y, dark, iPad-drop, crash reporting — partial (dark opt-out, iPad drop, VoiceOver labels, Dynamic Type rem done; manual rotor walkthrough + Sentry pending)
- [FR-IOS-STORAGE](requirements.md#321-fr-ios-storage) — Capacitor Preferences adapter + migration (local-only, no cloud sync) — partial (adapter + migration + bootReady done, on-device verification pending)
- [FR-IOS-UX](requirements.md#320-fr-ios-ux) — Native splash, status-bar, haptics, fonts, gestures — implemented (Inter scope dropped — system fonts already meet the no-runtime-fetch requirement)
- [FR-LESSONS](requirements.md#310-fr-lessons) — 8-lesson curriculum (all unlocked, no tier field) — implemented
- [FR-MENU](requirements.md#31-fr-menu) — Lessons list, all available lessons open directly — implemented
- [FR-NAV](requirements.md#39-fr-nav) — Screen flow (lessons/lesson/game/results/analytics; no paywall) — implemented
- [FR-FREEMIUM / FR-IAP / FR-PAYWALL](requirements.md#324-fr-paid) — removed, superseded by FR-PAID
- [FR-SYNC-PAID](requirements.md#330-fr-sync-paid-removed) — removed (no Pro tier; progress local-only)
