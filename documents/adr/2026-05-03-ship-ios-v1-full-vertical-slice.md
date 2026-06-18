---
id: ADR-0001
status: superseded-in-part
date: 2026-05-03
implements:
  - FR-LESSONS
  - FR-MENU
  - FR-NAV
  - FR-IOS-APPSTORE
  - FR-IOS-UX
  - FR-IOS-STORAGE
  - FR-IOS-POLISH
  - FR-IOS-CICD
  - FR-PAID
tags:
  - ios
  - mobile
  - release-strategy
  - monetization
---
# Ship iOS v1.0 as Full Vertical Slice

> **Update:** the monetization slice (FR-FREEMIUM tier gating, FR-IAP RevenueCat, FR-PAYWALL, FR-SYNC-PAID iCloud sync) was **dropped**. The app now ships as a **simple paid one-time download** (App Store tier $1.99 USD ≈ €2.49 EUR) with all 8 lessons unlocked for everyone — see [FR-PAID](../requirements.md#324-fr-paid). RevenueCat, the paywall, lesson tiers, the Pro entitlement, and iCloud KVS sync are removed. The DoD items below for those four FRs are superseded; the App Store / native-UX / storage / polish / CI-CD readiness work stands.

## Context

iOS shell is already in place ([FR-IOS-SHELL](../requirements.md#318-fr-ios-shell) closed: Capacitor 8, WKWebView, UIScene, safe-area, splash, code-split). The original plan covered nine iOS-scoped FRs: App Store readiness, native UX, storage migration, polish, CI/CD, plus monetization (freemium gate, IAP, paywall, iCloud sync). The monetization four were later cut in favor of a paid app (FR-PAID). The user requires v1.0 to land as one release rather than a multi-stage rollout. Decision scope is iOS only — Android (FR-ANDROID-*) is parallel and out of scope here.

## Alternatives

- **Submit-First (publishable minimum)** — only [FR-IOS-APPSTORE](../requirements.md#319-fr-ios-appstore) + [FR-IOS-CICD](../requirements.md#323-fr-ios-cicd); all 8 lessons free; defer IAP/sync/polish to v1.1.
  - Pros: fastest TestFlight (1–2 wk); minimal review surface; pipeline validated before IAP complexity.
  - Cons: violates SRS freemium vision; bait-and-switch risk on later paywall introduction; second submission still needs IAP review.
  - Rejected because: ships a product that contradicts the SRS monetization model, with high refactor cost when paywall is retrofitted onto the published UX.

- **Monetize-First (SRS as designed)** — Submit-First scope **+** [FR-FREEMIUM](../requirements.md#324-fr-freemium) + [FR-IAP](../requirements.md#325-fr-iap) + [FR-PAYWALL](../requirements.md#326-fr-paywall) + [FR-IOS-STORAGE](../requirements.md#321-fr-ios-storage) + [FR-IOS-UX](../requirements.md#320-fr-ios-ux). Defer [FR-IOS-POLISH](../requirements.md#322-fr-ios-polish) and [FR-SYNC-PAID](../requirements.md#330-fr-sync-paid) to v1.1.
  - Pros: matches SRS exactly; one submission covers freemium; no UX deprecation cycle.
  - Cons: 4–6 wk; sandbox IAP debugging; ≥1 reject cycle on guideline 3.1.1 (Restore Purchases) likely.
  - Rejected because: still ships without sync, leaving Pro users on iOS without a key paid benefit advertised on the paywall.

- **Polish-Then-Monetize (beta → release)** — TestFlight beta with native polish + storage; App Store release adds freemium/IAP/paywall after beta.
  - Pros: real-device UX feedback before paywall; storage migration battle-tested.
  - Cons: two submissions; testers anchored on "free everything"; CI matrix grows; risk of indefinite paywall delay.
  - Rejected because: doubles submission overhead and trains testers to expect free L4–L8.

- **Full Vertical Slice (CHOSEN)** — Monetize-First scope **+** [FR-IOS-POLISH](../requirements.md#322-fr-ios-polish) **+** [FR-SYNC-PAID](../requirements.md#330-fr-sync-paid) (iOS half: iCloud KVS only). Single submission covering all 9 open iOS FRs.
  - Pros: SRS fully realized in one release; sync available day 1 for Pro; no "v1.1 to fix freemium" refactor; richest store listing.
  - Cons: 6–10 wk; custom Capacitor iCloud KVS plugin is the largest engineering unknown; KVS quotas (1 MB / 1024 keys) need verification against 200-session history; crash-reporting SDK adds PrivacyInfo entries.
  - Risks: solo-developer schedule slippage; KVS plugin authoring friction; App Review IAP rejection cycles.

## Decision

Ship a single iOS v1.0 (App Store assets, native UX, storage migration, polish, CI/CD). Monetization is a **paid one-time download** at App Store tier $1.99 USD (≈ €2.49 EUR) — no IAP, no paywall, no lesson tier, no Pro entitlement, no iCloud sync (FR-PAID). All 8 lessons are unlocked for everyone on web and iOS. Web build remains unchanged and free on GitHub Pages. Android is tracked separately and is not blocked by, nor a blocker of, this ADR.

> Originally this ADR chose to build the freemium tier model + RevenueCat IAP + paywall + iCloud KVS sync. That scope was dropped in favor of the paid-app model above; the related DoD items are marked superseded below.

## Consequences

- **Paid-app pivot** cut the monetization slice: no RevenueCat, no paywall, no lesson tier, no iCloud KVS sync. Net code surface shrank (deleted `src/services/iap.ts`, `PaywallScreen.tsx`, the ICloudKVS plugin was never authored).
- **PrivacyInfo.xcprivacy** required: only `UserDefaults` (CA92.1); no RevenueCat / iCloud / receipt reasons. App Privacy questionnaire = "Data Not Collected".
- **Apple Developer account ($99/yr)** is a hard prerequisite; Bundle ID `dev.korchasa.bgtrainer` must be registered before signing.
- **ASC Pricing** must be set to paid tier $1.99 USD (≈ €2.49 EUR) before submission; no IAP product to register.
- **SRS updated**: FR-FREEMIUM / FR-IAP / FR-PAYWALL collapsed into FR-PAID; FR-SYNC-PAID removed.
- **No tests** in the project today; verification leans on `npm run build`, `xcodebuild`, file/grep checks, and manual reviewer (`korchasa`) for store-policy and on-device items.
- **Android (FR-ANDROID-*)** stays open; this ADR does NOT close it.
- **Default sub-decisions baked in**: drop iPad (`TARGETED_DEVICE_FAMILY = "1"`); opt out of dark mode (`UIUserInterfaceStyle = Light`); Sentry for crash reporting still pending.

## Definition of Done

> Notation: each item lists its FR, the verification method (Test / Benchmark / `manual — <reviewer>`), and an Evidence command that should pass iff the item is done. Project has no automated test suite; most items use `manual — korchasa` or build/grep commands.

### Foundation (data model)

- [x] FR-LESSONS / FR-PAID: no tier/entitlement field on `Lesson`; all 8 lesson records open directly (all unlocked).
  - Test: `manual — korchasa` (no test runner)
  - Evidence: `src/types.ts:14-20`, `src/data/lessons.ts`; `npm run build` clean
- [x] FR-PAID: no IAP code — `src/services/iap.ts` and `src/components/screens/PaywallScreen.tsx` absent; no RevenueCat dependency; `Screen` type has no `paywall`.
  - Test: `manual — korchasa`
  - Evidence: `! ls src/services/iap.ts src/components/screens/PaywallScreen.tsx`; `! grep -rn "revenuecat\|proUnlocked" src/`; `src/types.ts:95`

### Storage migration

- [x] FR-IOS-STORAGE: `@capacitor/preferences` installed and storage adapter abstracts web (localStorage) vs native (Preferences).
  - Test: `manual — korchasa`
  - Evidence: `package.json:15`, `src/utils/storage.ts`; refactored callers in `src/utils/history.ts`, `src/utils/mastery.ts`, `src/utils/pace.ts`, `src/i18n/storage.ts`
- [x] FR-IOS-STORAGE: one-time migration covers `bg-trainer-v3`, `bg-trainer-mastery-v1`, `bg-trainer-pace-v1`, `bg-trainer-lang-v1`; legacy keys deleted post-copy.
  - Test: `manual — korchasa` (on-device run pending, but logic verified in `src/utils/storage.ts:30-79`)
  - Evidence: `src/utils/storage.ts:30-79` (TRACKED_KEYS list + `initNative` migration loop)
- [ ] FR-IOS-STORAGE: data survives app backgrounding + simulated storage pressure.
  - Test: `manual — korchasa` (Settings → iPhone Storage → Offload App → relaunch; confirm history intact)
  - Evidence: `manual — korchasa` (screen recording attached to PR — pending on-device test)
- [x] FR-IOS-STORAGE: migration is idempotent — second run on already-migrated device is a no-op (no errors, no overwrites).
  - Test: `manual — korchasa` (logic uses per-key `__migrated__:` flag; second run reads flag and skips)
  - Evidence: `src/utils/storage.ts:33,37-43,73-77`
- [x] FR-IOS-STORAGE: app shell renders an inline splash until storage hydration completes (no empty-state flicker).
  - Test: `manual — korchasa`
  - Evidence: `src/main.tsx:11-17` (`initStorage().then(() => render())`); inline splash in `index.html:11-22` covers the await window

### Native UX (FR-IOS-UX)

- [x] FR-IOS-UX: `@capacitor/splash-screen`, `@capacitor/status-bar`, `@capacitor/haptics` installed and wired through a single `nativeUx` adapter.
  - Test: `manual — korchasa`
  - Evidence: `package.json:16-18`, `src/utils/nativeUx.ts`, `capacitor.config.ts:11-19`, `src/main.tsx:22-28`; `cap sync ios` lists 4 plugins (preferences + 3 UX)
- [x] FR-IOS-UX: haptic light-impact on first-attempt correct, medium-impact on first-attempt wrong, success notification on round completion.
  - Test: `manual — korchasa` (on-device tactile verification pending — simulator does not vibrate)
  - Evidence: `src/hooks/useGame.ts:5-6,118-122`, `src/App.tsx:4,108`, `src/utils/nativeUx.ts:34-46`
- [x] FR-IOS-UX: no runtime web-font fetch (project-specific deviation from original ADR plan). UI uses system fonts (`-apple-system`, `system-ui`); guaranteed available offline on iOS/Android/web. Self-hosting Inter would only inflate the bundle without removing any external dependency, so it is intentionally not done.
  - Test: `manual — korchasa`
  - Evidence: `src/index.css:11`; `! grep -rn "fonts.googleapis.com" src/ index.html` returns nothing
- [x] FR-IOS-UX: back-swipe gesture is disabled in WKWebView via Capacitor 8 default (`allowsBackForwardNavigationGestures=false`); correct behavior for this single-page app, no override needed.
  - Test: `manual — korchasa` (revisit if device testing surfaces an edge case)
  - Evidence: Capacitor 8 default; no override in `capacitor.config.ts` or `ios/App/App/`
- [x] FR-IOS-UX: `prefers-reduced-motion` honored — `useGame` shortcuts the celebratory advance delay to 0 ms when the OS-level Reduce Motion accessibility setting is on.
  - Test: `manual — korchasa`
  - Evidence: `src/utils/motion.ts`, `src/hooks/useGame.ts:7,118`

### Monetization — paid app (FR-PAID; supersedes FR-FREEMIUM / FR-IAP / FR-PAYWALL)

- [x] FR-PAID: no RevenueCat IAP — paid one-time download instead. `src/services/iap.ts` and `src/components/screens/PaywallScreen.tsx` removed; no `@revenuecat/*` dependency.
  - Test: `manual — korchasa`
  - Evidence: `! ls src/services/iap.ts src/components/screens/PaywallScreen.tsx`; `! grep -rn "revenuecat\|Purchases\.\|proUnlocked\|entitlements" src/ package.json`
- [x] FR-PAID / FR-MENU: no lesson tier and no locked tiles — every `available` lesson opens directly on web and iOS.
  - Test: `manual — korchasa`
  - Evidence: `! grep -rn "tier\|priceString\|lock" src/components/screens/LessonsScreen.tsx`; `! grep -n "tier" src/types.ts`
- [x] FR-PAID / FR-NAV: no `paywall` screen — `Screen` type = `"lessons" | "lesson" | "game" | "results" | "analytics"`.
  - Test: `manual — korchasa`
  - Evidence: `src/types.ts:95`; `! grep -rn '"paywall"' src/`
- [ ] FR-PAID: App Store Connect Pricing form set to paid tier $1.99 USD; App Privacy questionnaire = "Data Not Collected".
  - Test: `manual — korchasa`
  - Evidence: `manual — korchasa` (ASC Pricing + App Privacy pages for app `6766068069`)
- ~~FR-IAP / FR-PAYWALL / FR-FREEMIUM~~: **superseded by FR-PAID** — RevenueCat IAP, paywall screen, and freemium tier gating are no longer part of the product. Items removed.

### App Store readiness (FR-IOS-APPSTORE)

- [x] FR-IOS-APPSTORE: AppIcon — single 1024×1024 universal sRGB 8-bit RGB no-alpha source (Xcode 14+ accepts a single source; iOS scales). Brand red `#E60023` background, white «БГ» monogram.
  - Test: `manual — korchasa`
  - Evidence: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png` (1024×1024), `Contents.json`
- [x] FR-IOS-APPSTORE: `LaunchScreen.storyboard` uses literal white `backgroundColor` so launch never flashes black; Splash imageset flattened to plain white.
  - Test: `manual — korchasa`
  - Evidence: `ios/App/App/Base.lproj/LaunchScreen.storyboard:18`, `ios/App/App/Assets.xcassets/Splash.imageset/`
- [x] FR-IOS-APPSTORE: `PrivacyInfo.xcprivacy` declares `NSPrivacyTracking=false`, empty tracking domains and collected data types, one `NSPrivacyAccessedAPIType` for `NSPrivacyAccessedAPICategoryUserDefaults` reason `CA92.1`. Wired into Xcode build resources.
  - Test: `manual — korchasa`
  - Evidence: `ios/App/App/PrivacyInfo.xcprivacy`, `ios/App/App.xcodeproj/project.pbxproj` (PBXBuildFile + PBXFileReference + PBXGroup + PBXResourcesBuildPhase entries)
- [x] FR-IOS-APPSTORE: `ITSAppUsesNonExemptEncryption: false` in Info.plist.
  - Test: `manual — korchasa`
  - Evidence: `ios/App/App/Info.plist:60-61`
- [x] FR-IOS-APPSTORE: orientation locked to `UIInterfaceOrientationPortrait` only; landscape variants and `~ipad` block removed.
  - Test: `manual — korchasa`
  - Evidence: `ios/App/App/Info.plist:53-55`
- [x] FR-IOS-APPSTORE: Apple Developer account active; Bundle ID `dev.korchasa.bgtrainer` registered; ASC app `6766068069` ("BG Trainer A0") created. Automatic signing tied to team — pending Xcode wiring.
  - Test: `manual — korchasa`
  - Evidence: ASC dashboard for app `6766068069` (manual)
- [x] FR-IOS-APPSTORE: Privacy Policy authored and hosted live at `https://bgtrainer.korchasa.dev/privacy.html` (custom domain via `public/CNAME`, deployed via `gh-pages` action). HTTP 200 verified post-deploy. Bilingual EN+RU; localStorage-only; no data collected (no IAP/receipts).
  - Test: `curl -sI https://bgtrainer.korchasa.dev/privacy.html | head -1`
  - Evidence: `public/privacy.html`, `public/CNAME`, `.github/workflows/deploy.yml` (`VITE_BASE_PATH: /`)
- [~] FR-IOS-APPSTORE: ASC listing — partial. Done: primary category=Education, content rights=no third-party, age rating=4+, Localized App Information (Name, Subtitle) for English (U.S.) + Russian + Ukrainian, App Store version 1.0 metadata (promotional text, description, keywords, support URL, marketing URL, copyright) filled in all three locales. Pending: Privacy Policy URL save (Apple form-library does not register programmatic value updates — manual entry required), App Privacy data-collection questionnaire, Pricing form.
  - Test: `manual — korchasa`
  - Evidence: ASC distribution → version page + App Information page for app `6766068069` (manual)
- [ ] FR-IOS-APPSTORE: screenshots for iPhone 6.7" (1290×2796) provided.
  - Test: `manual — korchasa`
  - Evidence: `manual — korchasa`
- [ ] FR-IOS-APPSTORE: TestFlight build successfully uploaded.
  - Test: `manual — korchasa`
  - Evidence: `xcrun altool --validate-app -f build/App.ipa --type ios --apiKey $ASC_KEY_ID --apiIssuer $ASC_ISSUER_ID` exits 0

### iCloud KVS sync (FR-SYNC-PAID) — REMOVED

- ~~FR-SYNC-PAID~~: **removed** — was Pro-only iCloud KVS cross-device sync. No Pro tier exists in the paid-app model. Progress stays local-only via Capacitor Preferences (FR-IOS-STORAGE). No `ICloudKVS` plugin, no iCloud entitlement, no sync layer.

### Polish (FR-IOS-POLISH)

- [ ] FR-IOS-POLISH: dark mode opted out via `UIUserInterfaceStyle: Light` in Info.plist.
  - Test: `manual — korchasa`
  - Evidence: `/usr/libexec/PlistBuddy -c "Print :UIUserInterfaceStyle" ios/App/App/Info.plist` outputs `Light`
- [ ] FR-IOS-POLISH: iPad dropped via `TARGETED_DEVICE_FAMILY = "1"`.
  - Test: `manual — korchasa`
  - Evidence: `grep -n "TARGETED_DEVICE_FAMILY" ios/App/App.xcodeproj/project.pbxproj` shows `"1"`
- [x] FR-IOS-POLISH: VoiceOver labels on answer tiles, progress, navigation buttons via localized `useI18n` keys (`a11yBack`, `a11yAnswerCorrect/Wrong`, `a11yProgress`). Manual rotor walkthrough still pending.
  - Test: `manual — korchasa` (VoiceOver enabled, swipe through one full game in `ru` and `uk`, every interactive element announced with localized label)
  - Evidence: `grep -rn "aria-label" src/components/ui/` shows BackButton, AnswerBtn, Progress; `src/i18n/strings.ts` has `a11yBack`, `a11yAnswerCorrect`, `a11yAnswerWrong`, `a11yProgress`
- [x] FR-IOS-POLISH: Dynamic Type respected — rem-based scaling, no fixed `px` font sizes for body text.
  - Test: `manual — korchasa` (Settings → Accessibility → Display & Text Size → Larger Text)
  - Evidence: `! grep -rn "text-\\[[0-9]*px\\]" src/` returns nothing
- [ ] FR-IOS-POLISH: Sentry installed for production builds; release tag wired; sourcemaps uploaded.
  - Test: `manual — korchasa`
  - Evidence: `grep -E "@sentry/capacitor|@sentry/react" package.json && grep -n "Sentry.init" src/main.tsx`

### CI/CD (FR-IOS-CICD)

- [x] FR-IOS-CICD: `.github/workflows/ios-release.yml` triggers on tag `v*`.
  - Test: `grep -E "tags:" .github/workflows/ios-release.yml`
  - Evidence: `.github/workflows/ios-release.yml:3-7` (`on.push.tags: ["v*"]` + `workflow_dispatch`)
- [x] FR-IOS-CICD: pipeline runs `npm run build:ios && cap sync ios && xcodebuild archive -exportArchive` and produces `.ipa` artifact.
  - Test: `manual — korchasa` (re-run latest tag job after secrets populated)
  - Evidence: `.github/workflows/ios-release.yml` Build/Capacitor sync/Archive/Export IPA steps; IPA published as `actions/upload-artifact@v4` with name `ios-build-<run_number>`
- [ ] FR-IOS-CICD: first tagged build visible in App Store Connect → TestFlight (status reaches "Ready to Test").
  - Test: `manual — korchasa`
  - Evidence: `manual — korchasa` (ASC TestFlight screenshot, blocked on secrets + first tag)
- [x] FR-IOS-CICD: keychain bootstrap (cert import + provisioning profile install) implemented; runs on every workflow run with cleanup on failure.
  - Test: `manual — korchasa` (re-run after secrets populated)
  - Evidence: `.github/workflows/ios-release.yml` "Bootstrap signing keychain" + "Cleanup keychain" steps; secrets list in `documents/ios-release-setup.md`
- [x] FR-IOS-CICD: ASC API key (`ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8_BASE64`) consumed from GitHub secrets; upload via `xcrun altool`.
  - Test: `gh secret list | grep -E "ASC_KEY_ID|ASC_ISSUER_ID|ASC_KEY_P8_BASE64"` (after population)
  - Evidence: `.github/workflows/ios-release.yml` "Upload to TestFlight via altool" step references all three secrets
- [x] FR-IOS-CICD: `CURRENT_PROJECT_VERSION` auto-bumped from `${{ github.run_number }}` via `xcrun agvtool new-version`.
  - Test: `grep -n "agvtool new-version" .github/workflows/ios-release.yml`
  - Evidence: `.github/workflows/ios-release.yml` "Bump versions from tag and run number" step
- [x] FR-IOS-CICD: `MARKETING_VERSION` sourced from git tag (`${GITHUB_REF_NAME#v}`) via `xcrun agvtool new-marketing-version`.
  - Test: `grep -n "agvtool new-marketing-version" .github/workflows/ios-release.yml`
  - Evidence: `.github/workflows/ios-release.yml` "Bump versions from tag and run number" step

### Submission

- [ ] FR-IOS-APPSTORE: App Review approved; build moved to App Store (live).
  - Test: `manual — korchasa`
  - Evidence: `manual — korchasa` (App Store URL + ASC "Ready for Sale" status)

## Solution

Phased delivery within a single v1.0 release. Each phase ends with a green `npm run build` and (where applicable) a successful `cap sync ios` + Xcode build on simulator.

### Phase 1 — Foundation (data + flag) [~3 days]

1. Add `tier: "free" | "pro"` to `Lesson` type in [src/types.ts](../../src/types.ts); set L1–L3 `free`, L4–L8 `pro` in [src/data/lessons.ts](../../src/data/lessons.ts).
2. Introduce `VITE_PLATFORM=web|ios|android` env var:
   - Declare in [vite.config.ts](../../vite.config.ts) with `define` and TS ambient typing in `src/vite-env.d.ts`.
   - Default `web` for `npm run dev|build`; set `VITE_PLATFORM=ios` inside `build:ios` script.
3. Helper `src/utils/platform.ts` exporting `IS_WEB`, `IS_IOS`, `IS_NATIVE`.
4. Verify: `VITE_PLATFORM=ios npm run build && VITE_PLATFORM=web npm run build` both succeed, bundle diff inspectable via `dist/` size.

### Phase 2 — Storage adapter + migration [~5 days]

1. `npm i @capacitor/preferences@^8`.
2. Create `src/utils/storage.ts` with unified async API (`get(key)`, `set(key, value)`, `remove(key)`). Web branch wraps `localStorage`; native branch wraps `Preferences`.
3. Refactor [src/utils/history.ts](../../src/utils/history.ts), `src/utils/mastery.ts`, `src/utils/pace.ts`, `src/utils/lang.ts` to call the adapter (becomes async).
4. **App-shell loading state**: `App.tsx` adds `bootReady: boolean` flag; renders the inline HTML splash (already in `index.html`) until `useEffect` finishes initial state hydration via the adapter, then sets `bootReady=true` and mounts the lessons screen. Prevents flicker / empty-state flash on first paint.
5. **Idempotent migration** (`src/utils/migrate.ts`):
   - For each of 4 legacy keys: read both `localStorage[k]` and `Preferences.get(k)`.
   - If only legacy → copy → set `Preferences.set("__migrated__:k", "1")` → delete legacy.
   - If both → trust Preferences (newer); delete legacy.
   - If neither or only Preferences → no-op.
   - Migration safe to re-run; partial runs converge.
6. Verify on simulator: seed legacy localStorage, relaunch, confirm Preferences populated, legacy keys gone, second relaunch is no-op (no errors in console).

### Phase 3 — Native UX [~4 days]

1. `npm i @capacitor/splash-screen@^8 @capacitor/status-bar@^8 @capacitor/haptics@^8` then `npx cap sync ios`.
2. Configure splash in `capacitor.config.ts` (`backgroundColor: "#111111"`, `showSpinner: false`); call `SplashScreen.hide()` in `main.tsx` after first paint.
3. Status bar: in App init, `StatusBar.setStyle({ style: Style.Dark })` to match `#111111` background.
4. Haptics: in [src/hooks/useGame.ts](../../src/hooks/useGame.ts), call `Haptics.impact({ style: ImpactStyle.Light })` on correct, `ImpactStyle.Medium` on wrong; on round completion, `Haptics.notification({ type: NotificationType.Success })`.
5. Self-host Inter: download Inter-Regular/Medium/SemiBold/Bold woff2 from rsms.me/inter into `public/fonts/`; add `@font-face` in [src/index.css](../../src/index.css); remove any Google Fonts link from [index.html](../../index.html).
6. Back-swipe: simplest path — disable `allowsBackForwardNavigationGestures` via `capacitor.config.ts` `ios.allowsLinkPreview: false` + custom Swift in `CAPBridgeViewController` subclass; alternative is `window.history.pushState` per screen change in App.tsx.
7. `prefers-reduced-motion`: in `App.tsx` or engines, `window.matchMedia('(prefers-reduced-motion: reduce)').matches` short-circuits any `setTimeout`-based auto-advance.

### Phase 4 — Freemium + IAP + Paywall [~7 days]

1. RevenueCat console: create project, public iOS API key, add `bgtrainer_pro_lifetime` non-consumable; in ASC create matching IAP product (tier 5, $4.99) with localized titles RU/UK/EN.
2. `npm i @revenuecat/purchases-capacitor` then `npx cap sync ios`.
3. New `src/services/iap.ts` with platform-conditional impl:
   - `IS_WEB` → stub returning `{ proUnlocked: true, packages: [] }`.
   - Native → wraps `Purchases.configure({ apiKey })`, `Purchases.getCustomerInfo()`, `Purchases.purchasePackage()`, `Purchases.restorePurchases()`.
4. Cache `proUnlocked` via storage adapter; offline-tolerant boot reads cache first, then refreshes from network.
5. Gate logic in [src/App.tsx](../../src/App.tsx) `handleLessonTap`: if `IS_NATIVE && lesson.tier === "pro" && !proUnlocked` → `setScreen("paywall")`, else current behavior.
6. New `src/components/screens/PaywallScreen.tsx`: localized strings in [src/i18n/strings.ts](../../src/i18n/strings.ts) (`paywallTitle`, `paywallBenefits`, `paywallBuy`, `paywallRestore`, `paywallEula`, `paywallPrivacy`); buy button shows `package.product.priceString`; Restore visible always; EULA + Privacy use Apple's standard `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/` + project Privacy Policy URL.
7. Locked-tile UI in `src/components/screens/LessonsScreen.tsx`: when `IS_NATIVE && lesson.tier === "pro" && !proUnlocked`, render lock SVG + small price label; tap routes to paywall.
8. Register `paywall` in `Screen` type ([src/types.ts](../../src/types.ts)) and add case in `App.tsx` screen dispatch.

### Phase 5 — App Store readiness [~5 days]

> **Order note:** Sentry SDK (Phase 7) MUST be installed before this phase finalizes `PrivacyInfo.xcprivacy`, because Sentry's bundled privacy manifest contributes API reasons to the merged report. Either move Sentry init forward into the start of Phase 5, or revisit the privacy report at the end of Phase 7 and re-archive. Default: install Sentry as step 0 of Phase 5.

0. **Install Sentry early**: `npm i @sentry/capacitor @sentry/react`; init in [src/main.tsx](../../src/main.tsx) gated by `import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN`. Defer release tagging + sourcemap upload to Phase 8 CI; this step only ensures the SDK's privacy manifest is part of the linked binary.
1. Generate AppIcon: design 1024×1024 PNG → use Bakery or `cordova-res` to expand into `AppIcon.appiconset` (18 entries).
2. Replace [LaunchScreen.storyboard](../../ios/App/App/Base.lproj/LaunchScreen.storyboard) with white-bg view (or `#111111` to match splash).
3. Author `ios/App/App/PrivacyInfo.xcprivacy` listing API reasons (`NSPrivacyAccessedAPICategoryUserDefaults` → `CA92.1`); SDK list inherits from RevenueCat + Sentry bundled manifests at link time. Verify in Xcode → Build Settings → Privacy Report after archive.
4. Edit [Info.plist](../../ios/App/App/Info.plist):
   - `ITSAppUsesNonExemptEncryption = false`
   - `UISupportedInterfaceOrientations` = portrait only (and same for `~ipad` removed once iPad dropped)
   - `UIUserInterfaceStyle = Light` (Phase 6 polish, can stage now)
5. Apple Developer account: register Bundle ID `dev.korchasa.bgtrainer`, enable iCloud + In-App Purchase capabilities; configure automatic signing in Xcode → Signing & Capabilities.
6. Privacy Policy: short doc on github.io stating "no PII collected, all data local, IAP receipts handled by Apple, optional Sentry crash reports anonymized".
7. ASC listing: title "BG Trainer", subtitle, RU/UK/EN long descriptions, keywords (bulgarian, language, learning, grammar, drills), Education category, 4+ rating, support URL = github.io page.
8. Screenshots: capture 6.7" iPhone (15 Pro Max simulator, 1290×2796) of menu / lesson / pick game / round results / analytics.

### Phase 6 — iCloud KVS sync [~8–10 days]

1. Enable iCloud capability in Xcode (creates `App.entitlements` with `com.apple.developer.ubiquity-kvstore-identifier`).
2. Author custom Capacitor plugin in Swift:
   - `ios/App/App/Plugins/ICloudKVS.swift` — `@objc(ICloudKVSPlugin)` subclass `CAPPlugin` with `@objc func get/set/remove/sync(_ call: CAPPluginCall)` wrapping `NSUbiquitousKeyValueStore.default`.
   - Register listener `NSUbiquitousKeyValueStore.didChangeExternallyNotification` and forward to JS via `notifyListeners("change", payload)`.
   - JS side: `src/services/cloudKvs.ts` with `registerPlugin<ICloudKVSPlugin>("ICloudKVS")`.
3. Mirror layer `src/utils/cloudMirror.ts`: subscribed to storage-adapter writes; if `IS_IOS && proUnlocked && iCloudAvailable`, push the same key/value to KVS.
4. Boot reconciliation: on Pro-active launch, fetch all 4 keys from KVS; merge with local using rules from FR-SYNC-PAID (mastery max-lastTs, history dedup-by-ts, pace/lang LWW); persist merged state to storage adapter.
5. **Background flush (blocker)**: install `@capacitor/app`; subscribe to `appStateChange` / `pause`; on background event, await `ICloudKVS.sync()` to force-flush pending writes to iCloud before iOS suspends the process. Without this, kills/swipe-aways on device A lose unsynced data before device B can pull it.
6. Quota verification: write `scripts/measure-kvs-payload.mjs` that seeds 200-session history + full mastery and prints byte sizes; assert sum ≤ 800 KB; run as part of release checklist.

### Phase 7 — Polish [~3 days]

1. VoiceOver: add localized `aria-label` (drawn from `useI18n`, NOT hardcoded English) to `AnswerBtn`, `Progress`, `BackButton`, `NavHeader`. Then **manual rotor walkthrough on device** — open VoiceOver, swipe through one full game, confirm every interactive element is announced with the correct localized label. `grep aria-label` is a smoke test, not the verification.
2. Dynamic Type: audit `src/index.css` and Tailwind classes; ensure body uses `rem` units; root `font-size` already inherits from system. Replace any literal `text-[14px]` with `text-sm`.
3. Sentry release tagging: Sentry SDK was installed in Phase 5 step 0; here add `@sentry/vite-plugin` to inject release name + upload sourcemaps. CI environment variable `SENTRY_AUTH_TOKEN` configured in Phase 8.

### Phase 8 — CI/CD [~4 days]

1. Create `.github/workflows/ios-release.yml`:
   - Trigger: `on: push: tags: ['v*']`.
   - Runner: `macos-14`.
   - Steps:
     1. `checkout`, `setup-node`, `npm ci`.
     2. **Keychain bootstrap** (signing import):
        ```sh
        security create-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
        security default-keychain -s build.keychain
        security unlock-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
        security set-keychain-settings -lut 21600 build.keychain
        echo "$IOS_CERT_P12_BASE64" | base64 -d > /tmp/cert.p12
        security import /tmp/cert.p12 -k build.keychain -P "$IOS_CERT_PASSWORD" -T /usr/bin/codesign
        security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$KEYCHAIN_PASSWORD" build.keychain
        echo "$IOS_PROVISIONING_PROFILE_BASE64" | base64 -d > ~/Library/MobileDevice/Provisioning\ Profiles/profile.mobileprovision
        ```
     3. `npm run build:ios && npx cap sync ios`.
     4. `agvtool new-version -all $GITHUB_RUN_NUMBER`; `agvtool new-marketing-version "${GITHUB_REF_NAME#v}"`.
     5. `xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release -archivePath build/App.xcarchive archive`.
     6. `xcodebuild -exportArchive -archivePath build/App.xcarchive -exportPath build -exportOptionsPlist ios/ExportOptions.plist`.
     7. `xcrun altool --upload-app -f build/App.ipa --type ios --apiKey "$ASC_KEY_ID" --apiIssuer "$ASC_ISSUER_ID"`.
2. Required secrets: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8_BASE64`, `IOS_CERT_P12_BASE64`, `IOS_CERT_PASSWORD`, `IOS_PROVISIONING_PROFILE_BASE64`, `KEYCHAIN_PASSWORD`, `VITE_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `REVENUECAT_API_KEY_IOS`.
3. **First-tag smoke test**: tag `v0.1.0-alpha`, watch full workflow green, then open ASC → TestFlight and confirm the build appears (status "Processing" → "Ready to Test"). This is the real DoD signal — `gh run conclusion=success` alone is necessary but not sufficient.

### Phase 9 — Submission [~1–4 weeks calendar, mostly waiting]

1. TestFlight beta: invite 5–10 testers (sandbox IAP enabled by default in TestFlight); collect feedback for 1 week.
2. Submit for App Review with `What to test` / `App Review Information` filled (sandbox tester credentials, demo flow).
3. Iterate on rejections — most likely: Restore button visibility, EULA link, or PrivacyInfo gaps.
4. Release to App Store on approval.

### Verification at each phase

- `npm run build` exits 0.
- `npx cap sync ios` exits 0.
- Xcode → Product → Archive succeeds (Phases 5+).
- Smoke test on iPhone 15 Pro Max simulator after every phase: menu → lesson → game → results, no console errors.

## Follow-ups

- Android parity (FR-ANDROID-SHELL, FR-ANDROID-PLAYSTORE, FR-ANDROID-CICD) — separate ADR, separate tagging. Same paid-app model.
- Localized App Store screenshots for additional languages beyond launch set.
- Revisit dark-mode opt-in once core CSS palette is theme-driven.

> The Alternatives and Phase 4 / Phase 6 plan sections below describe the original freemium/IAP/sync approach and are retained as historical record only; that scope was dropped (see Update note at top). FR-PAID is the current model.
