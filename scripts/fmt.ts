/**
 * `deno task fmt` — format the task scripts in place.
 *
 * The app sources under `src/` are deliberately left alone: no formatter is
 * configured for them, and reformatting the whole React tree here would be a
 * change nobody asked for.
 */

import { run, section } from "./lib.ts";

section("deno fmt");
await run("deno", { args: ["fmt"] });
