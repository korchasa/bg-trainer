---
implements:
  - FR-TASK-MODEL
---
# Never ask the item a mode's worked example answers

## Goal

A learner never gets, as a question, the item whose answer the «ОБРАЗЕЦ» line above it already prints.

## Overview

### Context

Found 2026-10-14 in the 1.2 walk: lesson 7 «Ще купувам или ще купя?» showed «Утре ще ___ един килограм ябълки → купя» above the identical question. 93 modes had the example's item in their own pool (a text search counted 111–119, but 27 of those hits were the string in another mode's data). Not removed: `match_profession` («фотограф ↔ фотографка» over the data pair «фотограф ↔ фотограф» — a content conflict, left to the owner) and `l8_glad_zhad_pick` (same prompt, different answer).

### Current State

`Mode.example` shown on every question; pools drawn from `mode.data()` by `sliceData`/`pickDueItems`; SRS accepted the leak for closed sets.

### Constraints

One central rule, no edits to the 93 data entries. Owner chose (2026-10-14): pronoun tables lose the example's row too (five questions instead of six).

## Definition of Done

- [x] `CATEGORIES`/`ALL_MODES` drop the example's item in every engine (`src/utils/exampleItem.ts`, `src/data/index.ts`)
- [x] Verb-form table still lists all rows (`authoredData`)
- [x] Stale mastery records removed at load (`dropExampleRecords`)
- [x] `scripts/exampleitem.ts` in `deno task test`; red proved before wiring and for each guard
- [x] SRS/SDS FR-TASK-MODEL updated; `deno task check` green

## Solution

Implemented in commit 954b3f4.
