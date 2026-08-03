/**
 * FR-STIMULUS-NEAR-BANK: in an engine whose answer tiles sit in a word bank at
 * the bottom of the screen, the text that changes from question to question —
 * the L1 translation — renders between the answer area and that bank.
 *
 * Why this needs a guard. The natural way to write these engines is
 * instruction, then translation, then answer area, then bank, because that is
 * reading order. It is also the order that breaks on a short phone: at the
 * accessibility text sizes the play area does not fit, and the learner has to
 * scroll down to reach the bank — which pushes the translation off the top,
 * leaving them tapping words with the question out of sight. Measured on a
 * 375x667 viewport at scale 1.3: scrolled to the bank, the translation showed
 * 6px of its 61. Moved below the answer area it shows all 61, and since nothing
 * resets the scroll position between questions, the next question arrives
 * already in view. Reading order costs one scroll per question; this costs
 * none.
 *
 * The regression this guards is a well-meaning revert: the old order looks
 * correct in a code review and only misbehaves on a small screen with large
 * type, which is exactly the setup a reviewer does not have open.
 *
 * Scanned as text — the assertion is about how the file is written, and a React
 * component cannot be interrogated for render order at runtime.
 *
 * Run: `deno task test` (or `deno run -A scripts/stimulus.ts`).
 */

const ENGINE_DIR = "src/components/engines";

interface EngineSpec {
  /** File under ENGINE_DIR. */
  file: string;
  /** First marker of the answer area — where the learner's answer takes shape. */
  answerArea: string;
  /** Marker of the word bank the learner taps. */
  bank: string;
  /** Marker of the per-question stimulus render. */
  stimulus: string;
  /**
   * True when the engine renders the stimulus in exactly one place, so an
   * occurrence above the answer area can only be the old layout coming back.
   * FrameEngine is false: its step-4 modes have no bank (the learner types the
   * sentence), and there the stimulus legitimately stays above the input.
   */
  soleSite: boolean;
}

const ENGINES: EngineSpec[] = [
  {
    file: "BuildEngine.tsx",
    answerArea: "groups.map(",
    bank: "pool.map(",
    stimulus: "L(item.translation)",
    soleSite: true,
  },
  {
    // `item.slots.map(` would look like the natural anchor and is the wrong
    // one: it first appears in a helper near the top of the file, which put the
    // anchor above every render site and made the scan pass on the very layout
    // it exists to reject. Anchor on markup only.
    file: "FrameEngine.tsx",
    answerArea: "{step === 1 && (",
    bank: "shuffledBank.map(",
    stimulus: "L(item.translation)",
    soleSite: false,
  },
];

/** Removed with the same change: the bank is self-evident, the line was noise. */
const BANNED = "tapWordsBelow";

function indicesOf(haystack: string, needle: string): number[] {
  const out: number[] = [];
  for (let i = haystack.indexOf(needle); i !== -1; i = haystack.indexOf(needle, i + 1)) out.push(i);
  return out;
}

export async function checkStimulus(): Promise<void> {
  const failures: string[] = [];

  for (const spec of ENGINES) {
    const path = `${ENGINE_DIR}/${spec.file}`;
    const src = await Deno.readTextFile(path);

    // Anchors are code, not prose. A renamed one means this scan went stale and
    // stopped asserting anything — louder than a silent pass.
    const answer = src.indexOf(spec.answerArea);
    const bank = src.indexOf(spec.bank);
    if (answer === -1) failures.push(`${path} — answer-area anchor \`${spec.answerArea}\` is gone`);
    if (bank === -1) failures.push(`${path} — bank anchor \`${spec.bank}\` is gone`);
    if (answer === -1 || bank === -1) continue;
    if (bank < answer) {
      failures.push(`${path} — bank renders before the answer area; anchors no longer describe it`);
      continue;
    }

    const sites = indicesOf(src, spec.stimulus);
    if (sites.length === 0) {
      failures.push(`${path} — stimulus anchor \`${spec.stimulus}\` is gone`);
      continue;
    }
    if (!sites.some((i) => i > answer && i < bank)) {
      failures.push(
        `${path} — the per-question translation does not render between the answer area and ` +
          `the word bank: on a short screen it scrolls out of sight while the learner taps words`,
      );
    }
    if (spec.soleSite && sites.some((i) => i < answer)) {
      failures.push(
        `${path} — the translation is back above the answer area; this engine renders it once, ` +
          `so that is the pre-FR-STIMULUS-NEAR-BANK layout returning`,
      );
    }
  }

  let scanned = 0;
  for (const spec of ENGINES) {
    const src = await Deno.readTextFile(`${ENGINE_DIR}/${spec.file}`);
    scanned++;
    if (src.includes(BANNED)) {
      failures.push(
        `${ENGINE_DIR}/${spec.file} — \`${BANNED}\` is back; the bank needs no caption`,
      );
    }
  }

  console.log(`Scanned ${scanned} engines with a word bank.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: the changing text sits between the answer area and the word bank.");
}

if (import.meta.main) await checkStimulus();
