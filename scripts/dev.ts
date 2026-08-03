/** `deno task dev` — Vite dev server with hot reload (http://localhost:5173/). */

import { section } from "./lib.ts";
import { nodeTool } from "./node.ts";

section("vite (Ctrl-C to stop)");
await nodeTool("vite", Deno.args);
