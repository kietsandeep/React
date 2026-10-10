# JavaScript Output track (`/practice/output`)

- List page: reuses `PracticeListPage` with `features/practice/data/output.json` (35 questions, code preview on each card).
- Question page: `OutputWorkspace` (`features/workspace/components/OutputWorkspace`) — read the code, press **Run** (plain sloppy-mode sandbox, no Babel), **Show solution**, **Mark as completed**.
- Add / edit questions: `scripts/source/output-source.mjs` → `node scripts/build-output-json.mjs`.
  The script RUNS every snippet to record the expected output, so solutions can't be wrong. It writes `output.json` and `features/workspace/data/output/<id>.json`.
- The card on `/practice` and home comes from `PRACTICE_CARDS` in `features/home/data/home.data.js`.
- Notes: Q12 (blocking `while` loop) is bounded so it can't freeze the tab; Q27 uses a Promise instead of `fetch`; Q17 uses 100ms/550ms so timing is stable.
