# iOS Release CI Setup

GitHub Actions workflow `.github/workflows/ios-release.yml` triggers on tag `v*` and uploads a signed `.ipa` to TestFlight via `xcrun altool`. Workflow is dormant until all secrets below are populated.

## Required GitHub Secrets

Set in repo → Settings → Secrets and variables → Actions → New repository secret.

### Apple signing

- **`IOS_TEAM_ID`** — 10-char Apple Developer Team ID. ASC → Membership → Team ID.
- **`IOS_CERT_P12_BASE64`** — Distribution certificate exported as `.p12`.
  - Xcode → Settings → Accounts → Manage Certificates → right-click "Apple Distribution" → Export Certificate → set password → save `.p12`.
  - `base64 -i Certificates.p12 | pbcopy`.
- **`IOS_CERT_PASSWORD`** — password used during the `.p12` export above.
- **`IOS_PROVISIONING_PROFILE_BASE64`** — App Store distribution profile.
  - ASC → Certificates, IDs & Profiles → Profiles → "+" → App Store → select Bundle ID `dev.korchasa.bgtrainer` → select the Distribution cert → name e.g. `BGTrainer App Store` → download `.mobileprovision`.
  - `base64 -i BGTrainer_App_Store.mobileprovision | pbcopy`.
- **`KEYCHAIN_PASSWORD`** — any random string; used only for the temporary build keychain.
  - `openssl rand -base64 32 | pbcopy`.

### App Store Connect API key (for altool upload)

- **`ASC_KEY_ID`** — 10-char Key ID. ASC → Users and Access → Integrations → "App Store Connect API" tab.
- **`ASC_ISSUER_ID`** — Issuer ID (UUID), shown on the same page above the keys table.
- **`ASC_KEY_P8_BASE64`** — `AuthKey_XXXXXXXXXX.p8` from "App Store Connect API" → "+" → role `App Manager` (or `Admin`).
  - `base64 -i AuthKey_XXXXXXXXXX.p8 | pbcopy`.
  - This is the **App Store Connect** key (`AuthKey_*.p8`), NOT the In-App Purchase key (`SubscriptionKey_*.p8`) used by RevenueCat.

### App-runtime secrets

- **`REVENUECAT_API_KEY_IOS`** — public RevenueCat key (`appl_…`). Same value as local `.env` `VITE_REVENUECAT_KEY_IOS`.
- **`VITE_SENTRY_DSN`** — optional. Once Sentry is wired (Phase 7 leftover), set this to enable production crash reporting.

## First run checklist

1. Populate all secrets above.
2. Push tag: `git tag v0.1.0-alpha && git push origin v0.1.0-alpha`.
3. Watch the workflow in GitHub → Actions. Expect ~15–25 min on `macos-14`.
4. On success, ASC → TestFlight → iOS Builds shows the new build in `Processing` state, then `Ready to Test` (≤ 30 min).
5. The IPA + ExportOptions.plist also surface as a workflow artifact (`ios-build-<run_number>`) for offline inspection.

## Common failure modes

- `No profiles for 'dev.korchasa.bgtrainer'` → `IOS_PROVISIONING_PROFILE_BASE64` missing or for the wrong Bundle ID.
- `Code signing 'App.app' failed` → certificate identity not in keychain. Re-export `.p12` with the private key included.
- `Authentication credentials are missing or invalid` (altool) → wrong `ASC_KEY_P8_BASE64`/`ASC_KEY_ID`/`ASC_ISSUER_ID` triple, or key revoked.
- `ITMS-90683: Missing purpose string` → Info.plist missing a `*UsageDescription` for an API the bundled SDK declares it touches.
- `ITMS-90809: Deprecated API usage` → bumped iOS deployment target needed; check the email diagnostic for the API.
- Privacy manifest mismatch → an SDK added a new `NSPrivacyAccessedAPICategory*` reason that the merged manifest doesn't cover. Re-archive after `cap sync`.

## Pre-flight URL checks

Before configuring any URL field in App Store Connect (Privacy Policy, Marketing, Support), verify the URL serves HTTP 200.

```sh
curl -sI https://bgtrainer.korchasa.dev/privacy.html | head -1
```

ASC validates URLs with a HEAD request on blur and silently keeps the dialog's Save button disabled on 404. After pushing a CNAME or new file to gh-pages, give the deploy 1–2 minutes (or `gh run watch <id>`), then loop curl until 200 before opening the dialog. Configuring the URL before the asset is live wastes a round-trip and creates an ambiguous diagnostic ("Save disabled because URL invalid" vs "Save disabled for another reason").

## Store listing & metadata (API vs web)

App listing metadata (version localizations, **pricing**, screenshots, build attach, review submission) is driven via the App Store Connect REST API by the user-level `appstore-connect` skill (ES256 JWT, key in 1Password). Two areas are **web-only** — the public API does not expose them, so do them in the ASC web UI:

- **Agreements / Tax / Banking** (ASC → Business). Any API call returns `403 REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED` until the Account Holder accepts the current agreements; a paid app also needs the Paid Applications agreement + bank + tax forms.
- **App Privacy** data-collection questionnaire (`appDataUsages*` endpoints → `PATH_ERROR`). For this app declare **Data Not Collected** (localStorage only, no SDKs/tracking) and Publish.

Pricing note: paid tier is **$1.99 USD** (base territory USA; Apple equalizes other regions, ≈ €2.49). The largest iPhone screenshot slot in the API is `APP_IPHONE_67`, which accepts both 1290×2796 (6.7") and 1320×2868 (6.9").

## Store screenshots (simulator)

Capture native frames from a booted simulator (e.g. iPhone 17 Pro Max → 1320×2868):

```sh
xcrun simctl status_bar <udid> override --time "9:41" --batteryState charged --batteryLevel 100 --wifiBars 3
xcrun simctl io <udid> screenshot store-assets/screenshots/01-lessons.png   # current screen, no extra perms
```

`simctl io … screenshot` needs no permissions, but only shoots the **current** screen. Navigating between screens for a full set requires tap injection, which has no zero-setup path:

- `idb` (`brew install idb-companion` + `pipx install fb-idb`) — `idb ui tap x y` uses the simulator private API, bypasses macOS TCC.
- AppleScript `System Events click at {x,y}` fails with error `-25204` unless the terminal/host process is granted **Accessibility** (System Settings → Privacy & Security → Accessibility).

Otherwise tap through the simulator by hand and screenshot each screen. `store-assets/` is gitignored.

## Manual fallback (no secrets yet)

Until secrets are populated, archive locally:

```sh
npm run build:ios && npx cap sync ios
open ios/App/App.xcworkspace
# Xcode → Product → Archive → Distribute App → App Store Connect → Upload
```
