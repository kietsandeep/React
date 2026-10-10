# Add the DSA page (list + coding workspace)

Route: `/practice/dsa` (Practice menu → DSA, and the DSA card on Home). Clicking **Solve** opens `/practice/dsa/<question-slug>` — the same coding workspace used for Machine Coding, with a DSA layout (problem + examples + test cases on the left; code editor and Test Results with Run/Clear on the right; language picker, countdown timer and Solution in the top bar).

## 1. Copy the files (keep the same paths, overwrite when asked)

**New**
- `src/features/practice/data/dsa.json` — 130 questions (56 Beginner / 59 Intermediate / 15 Advanced)
- `src/features/practice/utils/labels.js` — per-set wording (Beginner/Intermediate/Advanced, "solved"…)
- `src/features/workspace/data/dsa/dsa-001.json … dsa-020.json` — 10 fully-tested problems
- `src/features/workspace/components/DsaWorkspace/DsaWorkspace.{jsx,module.css}` — the DSA workspace UI
- `scripts/source/dsa-source.mjs`, `scripts/build-dsa-json.mjs`, `scripts/build-dsa-problems.mjs`

**Updated (replace your copy)**
- `src/pages/PracticeList/PracticeListPage.jsx`
- `src/features/practice/components/{PracticeHero,PracticeFilters,ProgressCard,MockAssessmentCard,QuestionCard}/*.jsx`
- `src/pages/Workspace/WorkspacePage.jsx`
- `src/features/workspace/constants/sandbox.js`
- `src/features/workspace/utils/sandboxBridge.js` (new `call` test check; App is optional)
- `src/features/workspace/services/problemService.js` (DSA fallback starter)
- `src/features/workspace/components/ProblemPanel/ProblemPanel.jsx`
- `src/components/common/Icon/Icon.jsx` (adds timer, trash, chevronDown icons)

No route or menu change is needed: `practice/:slug` and `practice/:slug/:questionSlug` already exist and the menu/home card already point to `/practice/dsa`.

## 2. Run
`npm run dev` → open `/practice/dsa`.

## 3. Add or edit data
- Questions: edit `scripts/source/dsa-source.mjs` (`[title, B|I|A, company, views, description]`), then `node scripts/build-dsa-json.mjs`.
- Tested problems: add an entry to `PROBLEMS` in `scripts/build-dsa-problems.mjs` (key = question id, e.g. `dsa-011`), then `node scripts/build-dsa-problems.mjs`. Test cases are `[args, expected]`; pass `{unordered:true}` to `mk()` when result order doesn't matter.
- Questions without a problem file still open the editor with a generic starter (no tests yet).

## How tests work
`{ "expect": "call", "fn": "isPrime", "args": [7], "equals": true }` calls the learner's top-level function inside the sandbox iframe and deep-compares the result. Learners can use `function` or `const fn = () =>`.
