/**
 * FR-TASK-MODEL: no session can ask the item a mode's worked example works out.
 *
 * The example is printed above every question, so that item would arrive with
 * its answer on screen. Every session draws from `mode.data()` of a mode in
 * `ALL_MODES` — `sliceData` and the mastery scheduler only ever pick a subset of
 * it — so asserting that no such pool holds the example's item covers every
 * round the app can build. The authored list stays reachable as `authoredData`
 * for the verb-form table; any other reader of it is a way round the rule, so
 * the source is scanned for one.
 *
 * Run: `deno task test` (or `deno run -A scripts/exampleitem.ts`).
 */

import { ALL_MODES, CATEGORIES } from "../src/data/index.ts";
import type { MasteryStore, Mode } from "../src/types.ts";
import { dropExampleRecords, exampleItemKeys, isExampleItem } from "../src/utils/exampleItem.ts";
import { walk } from "./lib.ts";

/** The one reader of `authoredData` outside its own module and type. */
const AUTHORED_READERS = new Set(["src/App.tsx", "src/utils/exampleItem.ts", "src/types.ts"]);

/**
 * Known collisions, one per engine that had any, so a matcher gone blind to one
 * engine fails here: the pool check shares that matcher and would stay green.
 * Each item was in its pool before the rule existed.
 */
const ANCHORS: [modeId: string, key: string][] = [
  ["sym_pick", "Ние"],
  ["l7_aspect_future_pick", "Утре ще ___ един килограм ябълки"],
  ["match_possess", "ние↔наш"],
  ["q_build", "как|се|казваш|?"],
  ["q_li", "Учиш ли български?"],
  ["sym_type", "Ние"],
  ["sym_fill", "Ние"],
  ["kak_si_pick", "😐"],
];

function itemsOf(d: ReturnType<Mode["data"]>): unknown[] {
  return Array.isArray(d) ? d : (d as { items: unknown[] }).items;
}

export async function checkExampleItems(): Promise<void> {
  const failures: string[] = [];
  let removed = 0;

  const pools: [string, Mode[]][] = [
    ["ALL_MODES", ALL_MODES],
    ["CATEGORIES", CATEGORIES.flatMap((c) => c.modes)],
  ];
  for (const [source, modes] of pools) {
    for (const mode of modes) {
      if (!mode.example) continue;
      const pool = itemsOf(mode.data());
      const leaked = pool.filter((it) => isExampleItem(mode, it));
      if (leaked.length) {
        failures.push(
          `${source} ${mode.id} — a session can ask the example's item: ${
            JSON.stringify(leaked[0]).slice(0, 120)
          }`,
        );
      }
      if (pool.length === 0) failures.push(`${source} ${mode.id} — no question left`);
      if (!mode.authoredData) {
        failures.push(`${source} ${mode.id} — exported without withoutExampleItem`);
        continue;
      }
      const authored = itemsOf(mode.authoredData()).length;
      if (authored - pool.length !== exampleItemKeys(mode).length) {
        failures.push(`${source} ${mode.id} — the pool lost items that are not the example's`);
      }
      if (source === "ALL_MODES") removed += authored - pool.length;
    }
  }

  for (const [id, key] of ANCHORS) {
    const mode = ALL_MODES.find((m) => m.id === id);
    if (!mode) failures.push(`anchor ${id} — mode not found`);
    else if (!exampleItemKeys(mode).includes(key)) {
      failures.push(`anchor ${id} — "${key}" is not recognised as the example's item`);
    }
  }

  // Stored mastery of a dropped item must go, or lessonStats counts it against a
  // total that no longer includes it. A live item's record must survive.
  const sym = ALL_MODES.find((m) => m.id === "sym_pick");
  if (sym) {
    const rec = { level: 7, lastTs: 1, attempts: 3 };
    const store: MasteryStore = { sym_pick: { "Ние": rec, "Ние.": rec, "Аз": rec } };
    const { store: next, changed } = dropExampleRecords(store, [sym]);
    const left = Object.keys(next.sym_pick).sort().join(",");
    if (!changed || left !== "Аз") {
      failures.push(`dropExampleRecords kept ${left}, expected only the live "Аз"`);
    }
  }

  for await (const path of walk("src", [".ts", ".tsx"])) {
    if (AUTHORED_READERS.has(path)) continue;
    if ((await Deno.readTextFile(path)).includes("authoredData")) {
      failures.push(`${path} — reads authoredData, which still holds the example's item`);
    }
  }

  console.log(
    `Checked ${ALL_MODES.length} modes; ${removed} example item(s) kept out of the pools.`,
  );
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures.slice(0, 40)) console.error(`  ${f}`);
    if (failures.length > 40) console.error(`  … and ${failures.length - 40} more`);
    Deno.exit(1);
  }
  console.log("OK: no session can ask the item its worked example answers.");
}

if (import.meta.main) await checkExampleItems();
