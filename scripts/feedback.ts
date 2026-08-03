/**
 * FR-FEEDBACK-CENTRED: the verdict on an answer («Браво!», «Мимо!») is shown
 * over the middle of the visible game area, not in the document flow.
 *
 * In the flow it sat wherever the engine happened to put it, which on a long
 * play area is off-screen: the learner answers at the foot of a word bank and
 * the reply appears somewhere above the fold, so the only feedback they get is
 * the question changing under them.
 *
 * The centring rests on one fact that is invisible at the call site: no engine
 * root is positioned, so `absolute inset-0` inside an engine resolves against
 * the game wrapper in `App.tsx` — the fixed-height area below the header, which
 * does not scroll. Put `relative` on an engine root and the overlay silently
 * re-anchors to the *scrollable content*, centring itself in the document
 * instead of the screen and restoring the very bug this replaced. Nothing in
 * the engine file would look wrong. Hence this scan.
 *
 * Run: `deno task test` (or `deno run -A scripts/feedback.ts`).
 */

import { walk } from "./lib.ts";

const ENGINE_DIR = "src/components/engines";
const REACTION = "src/components/ui/Reaction.tsx";
const APP = "src/App.tsx";

/** Tailwind classes that would make an engine root a containing block. */
const POSITIONED = /className="flex-1 flex flex-col[^"]*\b(relative|absolute|fixed|sticky)\b/;

export async function checkFeedback(): Promise<void> {
  const failures: string[] = [];

  const reaction = await Deno.readTextFile(REACTION);
  if (!/absolute inset-0/.test(reaction)) {
    failures.push(`${REACTION} — not an overlay: the verdict is back in the document flow`);
  }
  if (!/items-center justify-center/.test(reaction)) {
    failures.push(`${REACTION} — overlay does not centre its content`);
  }
  if (!/pointer-events-none/.test(reaction)) {
    failures.push(`${REACTION} — overlay would swallow taps meant for the play area`);
  }
  if (/\bh-9\b/.test(reaction)) {
    failures.push(`${REACTION} — still reserves flow height; an overlay needs none`);
  }

  // The anchor. Without it the overlay escapes to the whole page and centres
  // itself over the header too.
  const app = await Deno.readTextFile(APP);
  if (!/flex-1 flex flex-col overflow-hidden relative/.test(app)) {
    failures.push(`${APP} — the game wrapper is no longer the positioned anchor for the overlay`);
  }

  let engines = 0;
  for await (const path of walk(ENGINE_DIR, [".tsx"])) {
    const src = await Deno.readTextFile(path);
    if (!src.includes("<Reaction")) continue;
    engines++;
    if (POSITIONED.test(src)) {
      failures.push(
        `${path} — engine root is positioned, so the verdict overlay would centre itself in the ` +
          `scrollable content instead of on screen`,
      );
    }
  }

  if (engines === 0) failures.push(`no engine renders <Reaction> — the scan is broken`);

  console.log(`Scanned ${engines} engines, ${REACTION} and ${APP}.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: the verdict is centred over the visible game area.");
}

if (import.meta.main) await checkFeedback();
