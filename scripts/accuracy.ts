/**
 * FR-RESULTS, FR-ANALYTICS: accuracy is the share of questions answered right on
 * the first attempt, so every number it is built from has to be real.
 *
 * The three ways this went wrong, all of which read fine in a diff:
 *
 * - **A denominator that is not the session.** The results screen used
 *   `1 - errors / (errors + 8)`, where the 8 is a constant rather than the number
 *   of questions. It cannot reach 0: a `l2_frame` session with all eight answers
 *   wrong showed 50%, and `l3_paradigm` with all three wrong showed 73% — the
 *   same 73% a 35-question `q_build` session earns for 3 errors out of 35.
 * - **A guessed denominator.** The analytics screen had the right formula but
 *   filled a missing question count with `?? 8`, and single-mode sessions never
 *   recorded one. A 35-question session with 12 errors became 12 errors out of 8
 *   and clamped to 0%; a 3-question one was flattered the same way.
 * - **An error counter in the wrong unit.** `paradigm` incremented once per verb
 *   however many of its five forms were misplaced, so a session with 36 wrong
 *   forms out of 45 reported 9 errors.
 *
 * What is asserted here is that the count travels: each engine reports how many
 * answers its session held, `App` stores it on the history entry and hands it to
 * the results screen, and neither screen invents one when it is missing.
 *
 * Run: `deno task test` (or `deno run -A scripts/accuracy.ts`).
 */

import { walk } from "./lib.ts";

const ENGINE_DIR = "src/components/engines";
const RESULTS = "src/components/screens/ResultsScreen.tsx";
const ANALYTICS = "src/components/screens/AnalyticsScreen.tsx";
const APP = "src/App.tsx";
const TYPES = "src/types.ts";
const HOOK = "src/hooks/useGame.ts";

/**
 * Top-level arguments of the `onComplete(` call starting at `from`, or -1 when
 * the call is not closed on that line.
 *
 * Counted by walking the parentheses rather than by a regular expression: the
 * arguments contain calls of their own (`Date.now()`, `errSet.current.size`),
 * and a bracket-free pattern reports every real call as malformed — which it
 * did, on all five, until this replaced it.
 */
function argCount(line: string, from: number): number {
  let depth = 0, args = 1;
  for (let i = from; i < line.length; i++) {
    const c = line[i];
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return args;
    } else if (c === "," && depth === 1) args++;
  }
  return -1;
}

/** Every `onComplete(...)` call must pass four arguments — the fourth is the count. */
function passesCount(line: string): boolean {
  const at = line.indexOf("onComplete(");
  return argCount(line, at + "onComplete".length) === 4;
}

/** The length-blind formula, in the shape it took and in the shape a tidy-up would give it. */
const CONSTANT_DENOMINATOR = /errors\s*\+\s*\d/;

/** A question count invented where the data does not have one. */
const GUESSED_COUNT = /qsTotal\s*\?\?/;

export async function checkAccuracy(): Promise<void> {
  const failures: string[] = [];

  // Every engine ends its session through `onComplete`, and every one of those
  // calls has to carry the count. Scanned across the whole directory rather than
  // a list, so a new engine is covered the day it is written.
  let calls = 0;
  for await (const path of walk(ENGINE_DIR, [".tsx"])) {
    const src = await Deno.readTextFile(path);
    src.split("\n").forEach((line, i) => {
      if (!line.includes("onComplete(")) return;
      calls++;
      if (!passesCount(line)) {
        failures.push(
          `${path}:${i + 1} — \`onComplete\` is called without a question count: ` +
            `\`${line.trim()}\`. Accuracy is then computed against a constant and a session ` +
            `answered entirely wrong still reads as half right.`,
        );
      }
    });
  }
  const hook = await Deno.readTextFile(HOOK);
  hook.split("\n").forEach((line, i) => {
    if (!line.includes("onComplete(")) return;
    calls++;
    if (!passesCount(line)) {
      failures.push(
        `${HOOK}:${i + 1} — \`onComplete\` is called without a question count: ` +
          `\`${line.trim()}\`. Eight of the twelve engines finish through this hook.`,
      );
    }
  });

  // One shared signature. Twelve copies of `(score, time, errors) => void` is how
  // an argument gets added to eleven of them.
  if (!/export type SessionComplete/.test(await Deno.readTextFile(TYPES))) {
    failures.push(
      `${TYPES} — no shared \`SessionComplete\` type; each engine spelling its own callback ` +
        `signature is what let the question count reach some of them and not others`,
    );
  }
  for await (const path of walk(ENGINE_DIR, [".tsx"])) {
    const src = await Deno.readTextFile(path);
    if (/onComplete:\s*\(/.test(src)) {
      failures.push(
        `${path} — declares its own \`onComplete\` signature instead of \`SessionComplete\``,
      );
    }
  }

  // `paradigm` counts errors and mastery in forms, which means three files have
  // to agree on which row is pre-filled and therefore never answered: the engine
  // that skips it, the migration that spreads a verb's old level over the rest,
  // and `itemCount`, whose total the ratio divides by. Disagree and the progress
  // bar drifts by one form per verb, in silence.
  const paradigm = await Deno.readTextFile(`${ENGINE_DIR}/ParadigmEngine.tsx`);
  const mastery = await Deno.readTextFile("src/utils/mastery.ts");
  const given = paradigm.match(/^const GIVEN = (\d+);/m)?.[1];
  const mirrored = mastery.match(/^const PARADIGM_GIVEN = (\d+);/m)?.[1];
  if (given === undefined || mirrored === undefined) {
    failures.push(
      `${ENGINE_DIR}/ParadigmEngine.tsx / src/utils/mastery.ts — the pre-filled paradigm row is ` +
        `no longer a plain constant in both files, so nothing can check they still agree`,
    );
  } else if (given !== mirrored) {
    failures.push(
      `src/utils/mastery.ts — \`PARADIGM_GIVEN\` is ${mirrored} but the engine gives row ` +
        `${given}. The migration would spread a verb's level onto the row the learner never ` +
        `answers and leave the one they do at zero.`,
    );
  }
  if (!/forms\.length - 1/.test(await Deno.readTextFile("src/utils/itemKey.ts"))) {
    failures.push(
      `src/utils/itemKey.ts — \`itemCount\` no longer counts a paradigm mode in forms. Mastery ` +
        `stores one record per form, so a per-verb total makes the ratio five times too large.`,
    );
  }

  const results = await Deno.readTextFile(RESULTS);
  if (CONSTANT_DENOMINATOR.test(results)) {
    failures.push(
      `${RESULTS} — accuracy is divided by a constant, not by the number of questions. ` +
        `That formula never reaches 0 and gives the same figure for opposite sessions.`,
    );
  }
  if (!/qsTotal/.test(results)) {
    failures.push(
      `${RESULTS} — accuracy ignores \`qsTotal\`, so it says nothing about how much of the ` +
        `session was answered right`,
    );
  }

  const analytics = await Deno.readTextFile(ANALYTICS);
  if (GUESSED_COUNT.test(analytics)) {
    failures.push(
      `${ANALYTICS} — a missing \`qsTotal\` is filled with a guess. A guessed denominator is ` +
        `worse than no figure: it punishes long modes and flatters short ones, and nothing on ` +
        `screen says the number is made up.`,
    );
  }

  // Single-mode sessions used to be stored without a count, which is what left
  // the analytics screen guessing.
  const app = await Deno.readTextFile(APP);
  const entries = [...app.matchAll(/appendHistory\(\{[\s\S]*?\}\)/g)];
  if (entries.length === 0) {
    failures.push(`${APP} — no \`appendHistory\` call found; cannot tell what a session records`);
  }
  entries.forEach((m) => {
    if (!m[0].includes("qsTotal")) {
      const first = m[0].split("\n")[0];
      failures.push(
        `${APP} — a history entry is written without \`qsTotal\` (\`${first}…\`), so its ` +
          `accuracy can never be computed afterwards`,
      );
    }
  });

  console.log(`Scanned ${calls} session endings, ${RESULTS} and ${ANALYTICS}.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: accuracy is measured against the session that was actually played.");
}

if (import.meta.main) await checkAccuracy();
