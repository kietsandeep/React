// Loads src/features/quick/data/<slug>.json — one file per technology. Later: swap for an API call.
const files = import.meta.glob("../data/*.json", { eager: true, import: "default" });

export const getQuickSet = (slug) => files[`../data/${slug}.json`] ?? null;
export const getQuickCount = (slug) => getQuickSet(slug)?.questions?.length ?? null;
