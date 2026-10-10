// Loads src/features/practice/data/<slug>.json. Later: replace with an API call.
const files = import.meta.glob("../data/*.json", { eager: true, import: "default" });

export const getPracticeSet = (slug) => files[`../data/${slug}.json`] ?? null;
