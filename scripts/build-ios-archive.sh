#!/usr/bin/env bash
# Produce an UNSIGNED iOS archive for BG Trainer (Capacitor).
#
# Pipeline: build web assets -> sync Capacitor iOS -> xcodebuild archive
# (Release, code signing disabled). Output: ios/App/build/App.xcarchive
#
# Signing and App Store .ipa export are NOT done here — that is
# app-store-factory's job (it runs `xcodebuild -exportArchive` with the
# distribution signing settings). This script needs no signing identity or
# team id.
#
# Everything under ios/App/build is gitignored, so nothing lands in the repo.
set -euo pipefail
cd "$(dirname "$0")/.."

SCHEME="App"
PROJECT="ios/App/App.xcodeproj"
BUILD_DIR="ios/App/build"
ARCHIVE="${BUILD_DIR}/App.xcarchive"

echo "==> Building web assets (iOS target)"
npm run build:ios

echo "==> Syncing Capacitor iOS project"
npx cap sync ios

mkdir -p "$BUILD_DIR"

echo "==> Archiving (Release, unsigned)"
xcodebuild \
	-project "$PROJECT" \
	-scheme "$SCHEME" \
	-configuration Release \
	-destination 'generic/platform=iOS' \
	-archivePath "$ARCHIVE" \
	CODE_SIGNING_ALLOWED=NO \
	CODE_SIGNING_REQUIRED=NO \
	CODE_SIGN_IDENTITY="" \
	clean archive

echo "==> Done (unsigned): ${ARCHIVE}"
echo "    Signing + .ipa export are handled by app-store-factory."
