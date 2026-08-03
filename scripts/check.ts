/**
 * `deno task check` — the verification gate.
 *
 * `tsc` is the real type gate and the Vite bundle proves the app still compiles
 * end to end; the data invariants and the comment scan guard what neither of
 * those can see.
 */

import { checkTooling, fail, scanFiles, section } from "./lib.ts";
import { build } from "./build.ts";
import { test } from "./test.ts";

/** Work markers, type-suppressions and stray debug output. */
const MARKERS = /TODO|FIXME|HACK|XXX|@ts-ignore|@ts-expect-error|console\.(log|debug)\(/;

const TOTAL = 4;

async function check(): Promise<void> {
  section(`[1/${TOTAL}] Tooling (deno fmt --check, lint, type-check)`);
  await checkTooling();

  section(`[2/${TOTAL}] Type-check and bundle`);
  await build("web");

  section(`[3/${TOTAL}] Comment scan (TODO/FIXME/HACK/XXX, ts-ignore, console.log)`);
  const hits = await scanFiles(["src"], [".ts", ".tsx"], MARKERS);
  if (hits.length > 0) {
    hits.forEach((hit) => console.log(hit));
    fail("found forbidden markers");
  }
  console.log("    clean");

  section(`[4/${TOTAL}] Tests`);
  await test();

  section("check: OK");
}

if (import.meta.main) await check();
