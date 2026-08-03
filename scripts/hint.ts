/**
 * FR-HINT-MODAL: the hint lives in the game header and opens in a modal. The
 * play area holds the question and nothing else.
 *
 * The regression this guards is a return of the old shape: an engine growing
 * its own «Подсказка» button again, or printing the translation next to the
 * word. Both look harmless in review and quietly undo the change. The other
 * half is the channel contract — an engine that publishes a hint but forgets
 * either the per-question publish, the unmount clear, or `wasUsed()` at answer
 * time leaves a stale lamp on screen or hands out free mastery.
 *
 * Scanned as text: the assertions are about how the files are written, and a
 * React component cannot be interrogated for them at runtime.
 *
 * Run: `deno task test` (or `deno run -A scripts/hint.ts`).
 */

import { walk } from "./lib.ts";

const ENGINE_DIR = "src/components/engines";
const APP = "src/App.tsx";

/** Leftovers from the inline-hint era. Names, not prose — they are code. */
const BANNED_IN_ENGINES: Array<[RegExp, string]> = [
  [/t\("hintBtn"\)/, "renders its own hint button — the header owns it"],
  [/\bshowHint\b/, "keeps inline-hint state (showHint)"],
  [/\brevealHint\b/, "keeps the inline reveal handler (revealHint)"],
  [/\bhintedRef\b/, "tracks hint use locally instead of via the channel"],
  [/\bshownHint\b/, "still renders the hint inside the play area (shownHint)"],
];

export async function checkHints(): Promise<void> {
  const failures: string[] = [];
  let engines = 0;
  let publishers = 0;

  for await (const path of walk(ENGINE_DIR, [".tsx"])) {
    const src = await Deno.readTextFile(path);
    engines++;

    for (const [pattern, why] of BANNED_IN_ENGINES) {
      if (pattern.test(src)) failures.push(`${path} — ${why}`);
    }

    if (!src.includes("useHintChannel")) continue;
    publishers++;

    // The channel contract, in the order a question moves through it.
    if (!/hintCh\.publish\(\{/.test(src)) {
      failures.push(`${path} — uses the channel but never publishes a hint`);
    }
    if (!/useEffect\(\(\) => \(\) => hintCh\.publish\(null\), \[\]\)/.test(src)) {
      failures.push(`${path} — never clears the hint on unmount: the lamp outlives the game`);
    }
    if (!/hinted: hintCh\.wasUsed\(\)/.test(src)) {
      failures.push(`${path} — answers without reporting hint use: mastery would not soften`);
    }
  }

  if (engines === 0) failures.push(`no engines found under ${ENGINE_DIR} — the scan is broken`);
  if (publishers === 0) failures.push("no engine publishes a hint — the header lamp is dead");

  // The other end of the channel: one button, one modal, in the header.
  const app = await Deno.readTextFile(APP);
  if (!/hintCh\.content &&/.test(app)) {
    failures.push(`${APP} — header does not gate the lamp on a published hint`);
  }
  if (!/onClick=\{hintCh\.open\}/.test(app)) failures.push(`${APP} — lamp does not open the modal`);
  const modals = app.match(/<InfoModal\b/g)?.length ?? 0;
  if (modals < 2) {
    failures.push(
      `${APP} — expected the hint and the verb table to share InfoModal, found ${modals}`,
    );
  }

  console.log(`Scanned ${engines} engines (${publishers} publish a hint) and ${APP}.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: hints are published to the header and shown in a modal, nowhere else.");
}

if (import.meta.main) await checkHints();
