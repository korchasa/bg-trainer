/**
 * Every mode belongs to a lesson, and every lesson names a mode that exists.
 *
 * The learner reaches a drill through `LessonScreen`, which walks the lesson's
 * `modeIds`; no screen ever reads `CATEGORIES`. So the mode registry and the
 * lesson composition are two halves of one thing, and each half fails silently
 * on its own: a lesson naming an id that no longer exists just renders one card
 * fewer, and a mode missing from every lesson is authored, type-checked, and
 * unreachable. Neither shows up in the other invariants, which all read the mode
 * registry alone — that is how `iskam_pick`, `poss_pick` and `q_build` sat
 * invisible until a review happened to enumerate both sides (2026-08-06).
 *
 * Unlike the text-scanning invariants this one evaluates the data: it imports
 * `ALL_MODES` and `LESSONS` directly, which `sloppy-imports` in `deno.json`
 * makes possible. Both modules are safe to import outside Vite — nothing under
 * `src/data/` reaches `import.meta.env`.
 *
 * Run: `deno task test` (or `deno run -A scripts/lessons.ts`).
 */

import { fail } from "./lib.ts";
import { ALL_MODES } from "../src/data/index.ts";
import { LESSONS } from "../src/data/lessons.ts";

export function checkLessons(): void {
  const known = new Set(ALL_MODES.map((m) => m.id));
  const used = new Set<string>();
  const problems: string[] = [];

  for (const lesson of LESSONS) {
    const seen = new Set<string>();
    for (const id of lesson.modeIds) {
      if (!known.has(id)) {
        problems.push(`${lesson.id} names "${id}", which is not a registered mode`);
      }
      if (seen.has(id)) problems.push(`${lesson.id} lists "${id}" twice`);
      seen.add(id);
      used.add(id);
    }
  }

  for (const mode of ALL_MODES) {
    if (!used.has(mode.id)) {
      problems.push(
        `mode "${mode.id}" is in no lesson — unreachable, since the UI lists modes per lesson`,
      );
    }
  }

  console.log(`Checked ${ALL_MODES.length} modes against ${LESSONS.length} lessons.`);
  if (problems.length) {
    fail(`lesson composition is broken:\n  ${problems.join("\n  ")}`);
  }
  console.log("OK: every mode belongs to a lesson, and every lesson names a real mode.");
}

if (import.meta.main) checkLessons();
