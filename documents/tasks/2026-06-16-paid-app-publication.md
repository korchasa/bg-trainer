---
status: done
implements:
  - FR-PAID
  - FR-IOS-APPSTORE
  - FR-IOS-CICD
---
# iOS publication as paid app ($1.99)

> **Закрыто 11.08.2026. Цель достигнута: приложение продаётся по $1.99.**
> Версия 1.0 одобрена 05.07.2026 с первой попытки, версия 1.1 вышла 09.08.2026.
> Часть пунктов ниже осталась без галочек не потому, что работа не сделана, а
> потому, что она делается вне этого репозитория: подписание, упаковка,
> загрузка, цена, App Privacy, снимки экрана и подача на проверку происходят за
> его пределами, и здесь их состояние не отслеживается. Пункты про
> выпуск через CI по тегу `v*` отпали вместе с рабочим процессом: репозиторий
> больше не публикует сборки, `.github/workflows/ios-release.yml` снят
> 02.08.2026. Снимки экрана сняты не в заявленном здесь формате 1320×2868, а
> 1290×2796 (iPhone 6.7") и загружены в трёх локалях.

## Goal

Ship bg-trainer to the App Store as a simple PAID download (App Store tier $1.99 USD ≈ €2.49 EUR). All 8 lessons included for every buyer. Drop the freemium/IAP/paywall/iCloud-sync slice.

## Overview

### Context

Prior work built a freemium model (RevenueCat IAP `bgtrainer_pro_lifetime`, paywall, lesson `tier`, iCloud KVS sync) — mostly unfinished (`[ ]`). User decided: ship as paid app instead. Price tier $1.99 (anchor near "$2"). EUR is higher (~€2.49) because Apple EU prices include VAT + regional rounding.

### Current State

- iOS-only (no `android/` dir). Bundle id `dev.korchasa.bgtrainer`. ASC app `6766068069` ("BG Trainer A0") created. Version 1.0 / build 1.
- Native side already clean: iPhone-only (`TARGETED_DEVICE_FAMILY=1`), portrait-locked, `UIUserInterfaceStyle` set, `ITSAppUsesNonExemptEncryption=false`, privacy manifest, AppIcon. No RevenueCat pod in Podfile.lock. No iCloud entitlement.
- ASC listing partial: category=Education, age 4+, localized Name/Subtitle/version metadata EN+RU+UK, support+marketing URLs. Privacy policy live at https://bgtrainer.korchasa.dev/privacy.html (200).

### Constraints

- No test runner — verify via `npm run build` (tsc+vite) + `npm run ios:sync`.
- Paid app requires ASC **Paid Applications agreement** + banking + tax forms (user-only, legal step).
- Signing via CI (tag `v*`) — user populates GitHub secrets per `documents/ios-release-setup.md`.

## Definition of Done

- [x] Code: freemium/IAP/paywall/tier/sync removed; all lessons open. Evidence: deleted `src/services/iap.ts`, `src/components/screens/PaywallScreen.tsx`; `git grep -n "useIap\|paywall\|proUnlocked\|tier" src/` → none.
- [x] `npm run build` green; `npm run ios:sync` → 4 Capacitor plugins, RevenueCat gone.
- [x] RevenueCat removed from `package.json`, `package-lock.json`, `.env`, `.github/workflows/ios-release.yml`.
- [ ] Docs synced to paid model (SRS/ADR/index/README/CLAUDE.md) — in progress.
- [ ] Native screenshots iPhone 17 Pro Max (1320×2868) for lessons/game/results/analytics.
- [ ] ASC: Paid Applications agreement active (verify).
- [ ] ASC: Pricing = $1.99 tier.
- [ ] ASC: App Privacy = Data Not Collected.
- [ ] ASC: Privacy Policy URL saved.
- [ ] ASC: screenshots uploaded.
- [ ] CI: GitHub secrets populated; tag `v*` pushed; build reaches TestFlight "Ready to Test".
- [ ] ASC: version 1.0 submitted for review.

## Solution

1. **Code surgery (DONE)** — strip freemium → paid, all unlocked. Verify build + ios:sync.
2. **Docs (DONE in background agent)** — replace FR-FREEMIUM/FR-IAP/FR-PAYWALL with single FR-PAID; remove FR-SYNC-PAID; update FR-MENU/FR-NAV/FR-LESSONS; index/README/CLAUDE.
3. **Screenshots** — boot iPhone 17 Pro Max, `cap run ios`, clean status bar (9:41), navigate via AppleScript taps, `xcrun simctl io booted screenshot` per screen → 1320×2868 PNGs in `store-assets/screenshots/`.
4. **ASC check (browser/foxcode)** — verify Agreements/Tax/Banking → Paid Applications status; report blockers.
5. **ASC config (browser, with confirm on irreversible)** — Pricing $1.99; App Privacy = none; save Privacy URL; upload screenshots.
6. **Release** — user fills CI secrets → tag `v1.0.0` → workflow archives + uploads to TestFlight → attach build to version → submit for review.
