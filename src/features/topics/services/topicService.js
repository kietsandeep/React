// Loads topic data from src/features/topics/data/<slug>.json (falls back to <slug>.sample.json).
// Later, swap this for an API call: `return fetch(`/api/topics/${slug}`).then(r => r.json())`
const files = import.meta.glob("../data/*.json", { eager: true, import: "default" });

export function getTopic(slug) {
  return files[`../data/${slug}.json`] ?? files[`../data/${slug}.sample.json`] ?? null;
}
