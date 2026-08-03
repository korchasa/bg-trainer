/**
 * `deno task dist` — produce an UNSIGNED iOS archive.
 *
 * Pipeline: build the web assets for iOS → sync the Capacitor project →
 * xcodebuild archive (Release, code signing disabled).
 * Output: ios/App/build/App.xcarchive
 *
 * Signing and App Store .ipa export are NOT done here — they happen outside
 * this repository, where `xcodebuild -exportArchive` runs with the distribution
 * settings. Nothing here needs a signing identity or a team id, and everything
 * under ios/App/build is gitignored.
 */

import { exists, fail, run, section } from "./lib.ts";
import { nodeTool } from "./node.ts";
import { build } from "./build.ts";

const SCHEME = "App";
const PROJECT = "ios/App/App.xcodeproj";
const BUILD_DIR = "ios/App/build";
const ARCHIVE = `${BUILD_DIR}/App.xcarchive`;

await build("ios");

section("Syncing the Capacitor iOS project");
await nodeTool("cap", ["sync", "ios"]);

await Deno.mkdir(BUILD_DIR, { recursive: true });

section("Archiving (Release, unsigned)");
await run("xcodebuild", {
  args: [
    "-project",
    PROJECT,
    "-scheme",
    SCHEME,
    "-configuration",
    "Release",
    "-destination",
    "generic/platform=iOS",
    "-archivePath",
    ARCHIVE,
    "CODE_SIGNING_ALLOWED=NO",
    "CODE_SIGNING_REQUIRED=NO",
    "CODE_SIGN_IDENTITY=",
    "clean",
    "archive",
  ],
});

if (!(await exists(ARCHIVE))) fail(`archive was not produced at ${ARCHIVE}`);

section(`Done (unsigned): ${ARCHIVE}`);
console.log("    Signing + .ipa export happen outside this repository.");
