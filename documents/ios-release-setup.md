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

## Manual fallback (no secrets yet)

Until secrets are populated, archive locally:

```sh
npm run build:ios && npx cap sync ios
open ios/App/App.xcworkspace
# Xcode → Product → Archive → Distribute App → App Store Connect → Upload
```
