# App Store Connect Metadata Reference

Notes for driving the App Store Connect listing for `dev.korchasa.bgtrainer`
(ASC app `6766068069`). This repository has no store-release pipeline: signing,
`.ipa` packaging and binary upload happen outside it. What follows covers the
metadata side only.

## Pre-flight URL checks

Before configuring any URL field in App Store Connect (Privacy Policy, Marketing, Support), verify the URL serves HTTP 200.

```sh
curl -sI https://bgtrainer.korchasa.dev/privacy.html | head -1
```

ASC validates URLs with a HEAD request on blur and silently keeps the dialog's Save button disabled on 404. Merging to `main` no longer publishes: a CNAME or new file reaches gh-pages only via a `web-v*` tag push or a manual run of `deploy.yml`, so trigger one first. Then give the deploy 1–2 minutes (or `gh run watch <id>`) and loop curl until 200 before opening the dialog. Configuring the URL before the asset is live wastes a round-trip and creates an ambiguous diagnostic ("Save disabled because URL invalid" vs "Save disabled for another reason").

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
