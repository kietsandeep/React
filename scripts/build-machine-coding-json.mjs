// node scripts/build-machine-coding-json.mjs -> src/features/practice/data/machine-coding.json
import fs from "node:fs";
import { ROWS } from "./source/machine-coding-source.mjs";

const LEVEL = { E: "easy", M: "medium", H: "hard" };
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const seen = new Set();
const questions = ROWS.map(([title, lvl, company, views, description], i) => {
  const number = i + 1;
  let slug = slugify(title);
  if (seen.has(slug)) slug = `${slug}-${number}`; // duplicate titles stay unique
  seen.add(slug);
  return { id: `mc-${String(number).padStart(3, "0")}`, number, slug, title, difficulty: LEVEL[lvl], company, views, description };
});

const out = {
  schemaVersion: 1,
  set: {
    slug: "machine-coding",
    eyebrow: "React · Machine Coding",
    title: "React Machine Coding Interview Questions",
    subtitle: "Real coding-round questions and UI scenarios. Open any question, build the component in the live editor, and run it instantly.",
    searchPlaceholder: "Search questions (tabs, stopwatch, pagination...)",
    mockAssessment: { title: "Machine Coding Mock Assessment", unlockAfter: 5 },
  },
  questions,
};
fs.writeFileSync("src/features/practice/data/machine-coding.json", JSON.stringify(out, null, 2) + "\n");

const c = (d) => questions.filter((q) => q.difficulty === d).length;
if (new Set(questions.map((q) => q.id)).size !== questions.length) throw new Error("dup ids");
console.log(`questions=${questions.length} easy=${c("easy")} medium=${c("medium")} hard=${c("hard")} companies=${new Set(questions.map(q=>q.company)).size}`);
