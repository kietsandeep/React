// Problem detail lives in src/features/workspace/data/<setSlug>/<questionId>.json (lazy-loaded, one file per problem).
const loaders = import.meta.glob("../data/*/*.json", { import: "default" });

export async function loadProblem(setSlug, questionId) {
  const load = loaders[`../data/${setSlug}/${questionId}.json`];
  if (!load) return null;
  const p = await load();
  return { thingsToDo: [], instructions: null, solution: null, tests: [], ...p };
}

// Used when a question has no detail file yet: the editor still works, but there are no tests or solution.
export function buildFallbackProblem(question) {
  return {
    id: question.id,
    placeholder: true,
    thingsToDo: [],
    instructions: null,
    files: {
      "Practice.js": `const { useState } = React;\n\nconst Practice = () => {\n  // TODO: ${question.title}\n  return <div>Start building here…</div>;\n};\n`,
      "App.js": "const App = () => <Practice />;\n",
      "styles.css": "",
    },
    solution: null,
    tests: [],
  };
}
