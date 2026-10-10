# Add the Machine-Coding workspace (Solve) page

Prerequisite: the Practice list page (src/features/practice + src/pages/PracticeList) is already in your project.
No new npm packages. The preview loads React + Babel from cdnjs inside a sandboxed iframe (needs internet).

1. Copy folder  src/features/workspace/        (components, hooks, utils, services, constants, data/machine-coding/*.json)
2. Copy folder  src/pages/Workspace/           (WorkspacePage.jsx + .module.css)
3. REPLACE      src/components/common/Icon/Icon.jsx             (adds arrowLeft, chevronLeft, chevronUp, play, expand, sliders, refresh, terminal, browser, close, x)
4. REPLACE      src/features/topics/utils/highlight.js          (adds CSS highlighting; JS/TS behaviour unchanged)
5. EDIT         src/features/topics/hooks/useProgress.js        -> also return `mark`:
        const mark = useCallback((id) => {
          setDone((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
        }, []);
        return { done, toggle, mark };
6. EDIT         src/routes/AppRoutes.jsx  -> add the import and this route OUTSIDE <Route element={<MainLayout />}> (the page has its own top bar):
        import WorkspacePage from "@/pages/Workspace/WorkspacePage";
        <Route path="practice/:slug/:questionSlug" element={<WorkspacePage />} />
7. npm run dev -> /practice/machine-coding -> click any card (Solve)

## Adding / editing a problem
Problem detail lives in src/features/workspace/data/machine-coding/<question-id>.json (ids: mc-001 ... mc-065 from machine-coding.json).
Questions without a file still open: generic starter code, no tests, Submit/Solution disabled, "coming soon" note.

{ "id": "mc-001",
  "thingsToDo": ["..."],
  "instructions": { "intro": "...", "testIds": [{ "id": "star", "description": "..." }] },
  "files":    { "Practice.js": "starter", "App.js": "const App = () => <Practice />;", "styles.css": "..." },
  "solution": { "Practice.js": "full solution (only files that change)" },
  "tests":    [ { "name": "...", "steps": [ {"act":"click","testid":"star","index":3}, {"expect":"text","testid":"rating-value","equals":"4/5"} ] } ] }

Test steps run in order, in ONE page session per test run (state carries over between tests, so write them as a sequence).
  act:    click | hover | unhover | type (value) | wait (ms)       -> target = data-testid (+ optional index)
  expect: count (equals) | exists | absent | text (equals|contains) | value (equals) | attr (name, equals) | hasClass (class, equals:false for "not")
Easiest way to author: edit PROBLEMS in scripts/build-problems.mjs, then `node scripts/build-problems.mjs`.

## Notes
- Learner code is saved per question in localStorage (key code:<set>:<id>); passing Submit & Test marks it done (progress:practice-<set>).
- CDN versions are in src/features/workspace/constants/sandbox.js - open each URL once in a browser to confirm it loads.
