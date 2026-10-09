// Usage: node scripts/convert-questions.mjs <old-data-file.js> [output.json] [topic-slug]
// Converts the old { course_title, modules[{ module_id, heading, introduction, questions[{q, answer}] }] }
// (answer = string) into the v1 block-based schema described in docs/QUESTION_SCHEMA.md.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , input, output = "src/features/topics/data/react.json", topic = "react"] = process.argv;
if (!input) {
  console.error("Usage: node scripts/convert-questions.mjs <old-data-file.js> [output.json] [topic-slug]");
  process.exit(1);
}

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// "1. a 2. b 3. c"  ->  ordered list block; anything else -> text block
function toBlocks(answer) {
  if (Array.isArray(answer)) return answer; // already converted
  const text = String(answer).trim();
  if (/^1\.\s/.test(text) && /\s2\.\s/.test(text)) {
    const items = text
      .split(/\s+(?=\d+\.\s)/)
      .map((s) => s.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);
    return [{ type: "list", ordered: true, items }];
  }
  return [{ type: "text", value: text }];
}

const mod = await import(pathToFileURL(path.resolve(input)).href);
const data = mod.default ?? mod.data;

const result = {
  schemaVersion: 1,
  topic: { slug: topic, title: data.course_title },
  modules: data.modules.map((m) => ({
    id: `${topic}-m${m.module_id}`,
    order: m.module_id,
    slug: slugify(m.heading),
    heading: m.heading,
    introduction: m.introduction ?? "",
    questions: m.questions.map((x, i) => ({
      id: `${topic}-m${m.module_id}-q${i + 1}`,
      q: x.q,
      difficulty: "medium", // easy | medium | hard  (edit as you go)
      answer: toBlocks(x.answer),
    })),
  })),
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(result, null, 2));
const qCount = result.modules.reduce((n, m) => n + m.questions.length, 0);
console.log(`Wrote ${output}: ${result.modules.length} modules, ${qCount} questions`);
