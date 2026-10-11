// Single access point for everything that is configured in JSON (src/config/**).
// Components never import the JSON files directly — they call these getters, so the shape can evolve in one place.
import site from "./site.json";
import navigation from "./navigation.json";
import footer from "./footer.json";
import home from "./home.json";
import { getPracticeSet } from "@/features/practice/services/practiceService";
import { getQuickCount } from "@/features/quick/services/quickService";

// Every file in config/collections is picked up automatically — drop a new JSON here to create a new collection.
const collectionFiles = import.meta.glob("./collections/*.json", { eager: true, import: "default" });
const collections = Object.fromEntries(
  Object.values(collectionFiles).map((c) => [c.meta.id, c]),
);

const fill = (text, vars) => String(text ?? "").replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);

export const getSite = () => site;

// Real counts come from the data files when an item doesn't declare one.
function derivedCount(collectionId, slug) {
  if (collectionId === "practice") return getPracticeSet(slug)?.questions?.length ?? null;
  if (collectionId === "quick") return getQuickCount(slug);
  return null;
}

export function getCollection(id) {
  const c = collections[id];
  if (!c) return null;
  const { meta } = c;
  const items = c.items.map((item, i) => {
    const derived = item.count != null ? null : derivedCount(id, item.slug);
    return {
      ...item,
      to: item.to ?? `${meta.basePath}/${item.slug}`,
      count: item.count ?? (derived != null ? `${derived}${item.countSuffix ?? ""}` : undefined),
      variant: item.variant ?? (i % 2 === 0 ? "wide" : "tall"),
    };
  });
  return { meta, items };
}

export const getCollections = () => Object.keys(collections).map(getCollection);

// Hub routes are generated from this, so a new collection gets its page without touching AppRoutes.
export const getHubPaths = () => getCollections().map((c) => ({ id: c.meta.id, path: c.meta.hubPath }));

function childrenOf(collectionId, allLabel, limit) {
  const col = getCollection(collectionId);
  if (!col) return [];
  const links = col.items.slice(0, limit).map((i) => ({ label: i.shortTitle ?? i.title, to: i.to }));
  return allLabel ? [{ label: allLabel, to: col.meta.hubPath }, ...links] : links;
}

export function getNavigation() {
  return navigation.map((n) => {
    if (!n.collection) return n;
    const children = childrenOf(n.collection, n.allLabel);
    const hub = getCollection(n.collection)?.meta.hubPath;
    return { ...n, to: n.to ?? hub, children };
  });
}

export function getFooter() {
  const max = footer.maxLinksPerColumn ?? 6;
  const vars = { year: new Date().getFullYear(), name: site.name };
  return {
    blurb: footer.blurb,
    columns: footer.columns.map((c) => ({
      title: c.title,
      links: c.collection ? childrenOf(c.collection, c.allLabel, max) : c.links,
    })),
    bottom: { left: fill(footer.bottom.left, vars), right: fill(footer.bottom.right, vars) },
  };
}

function statValue(stat) {
  if (!stat.countOf) return stat.value;
  const [colId, slug] = stat.countOf.split(".");
  const item = getCollection(colId)?.items.find((i) => i.slug === slug);
  return item?.count ?? stat.fallback ?? "—";
}

export function getHome() {
  const vars = { name: site.name };
  return {
    ...home,
    stats: home.stats.map((s) => ({ label: s.label, value: statValue(s) })),
    cta: { ...home.cta, text: fill(home.cta.text, vars) },
  };
}
