// node scripts/build-react-json.mjs  ->  src/features/topics/data/react.json
import fs from "node:fs";
import path from "node:path";
import { MODULES } from "./source/react-source.mjs";
import { ENRICHMENTS, MODULE_DIFFICULTY } from "./source/react-enrichments.mjs";
import { toBlocks } from "./lib/toBlocks.mjs";

const TOPIC = "react";
const OUT = "src/features/topics/data/react.json";
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const INTRO_OVERRIDE = { 4: "JSX - Introduction" };

const modules = MODULES.map(([id, heading, qs]) => ({
  id: `${TOPIC}-m${id}`,
  order: id,
  slug: slugify(heading),
  heading,
  introduction: INTRO_OVERRIDE[id] ?? `${heading} - Introduction`,
  questions: qs.map(([q, a], i) => ({
    id: `${TOPIC}-m${id}-q${i + 1}`,
    q,
    difficulty: MODULE_DIFFICULTY[id],
    answer: toBlocks(a),
  })),
}));

for (const [mid, match, e] of ENRICHMENTS) {
  const mod = modules.find((m) => m.order === mid);
  const hits = mod.questions.filter((x) => x.q.includes(match));
  if (hits.length !== 1) throw new Error(`Enrichment [${mid}, "${match}"] matched ${hits.length} questions`);
  const q = hits[0];
  if (e.difficulty) q.difficulty = e.difficulty;
  if (e.tags) q.tags = e.tags;
  if (e.replace) q.answer = e.replace;
  if (e.append) q.answer = [...q.answer, ...e.append];
}

const result = { schemaVersion: 1, topic: { slug: TOPIC, title: "Full Stack React & Web Development Prep" }, modules };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(result, null, 2) + "\n");

// ---- validation ----
const TYPES = new Set(["text", "list", "code", "image", "note"]);
const ids = new Set();
let total = 0, withCode = 0, withImg = 0;
for (const m of modules) for (const q of m.questions) {
  total++;
  if (ids.has(q.id)) throw new Error("duplicate id " + q.id);
  ids.add(q.id);
  let hasCode = false, hasImg = false;
  for (const b of [...(q.description ?? []), ...q.answer]) {
    if (!TYPES.has(b.type)) throw new Error(`${q.id}: bad block ${b.type}`);
    if (b.type === "code") hasCode = true;
    if (b.type === "image") { hasImg = true; if (!fs.existsSync("public" + b.src)) throw new Error(`${q.id}: missing image ${b.src}`); }
  }
  withCode += hasCode; withImg += hasImg;
}
console.log(`Wrote ${OUT}: ${modules.length} modules, ${total} questions, ${withCode} with code, ${withImg} with images`);
