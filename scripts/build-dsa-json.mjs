// node scripts/build-dsa-json.mjs -> src/features/practice/data/dsa.json
import fs from "node:fs";
import { ROWS } from "./source/dsa-source.mjs";

const LEVEL = { B: "easy", I: "medium", A: "hard" }; // easy/medium/hard keys; labels come from set.labels
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/, "");

const seen = new Set();
const questions = ROWS.map(([title, lvl, company, views, description], i) => {
  const number = i + 1;
  let slug = slugify(title);
  if (seen.has(slug)) slug = `${slug}-${number}`;
  seen.add(slug);
  return { id: `dsa-${String(number).padStart(3, "0")}`, number, slug, title, difficulty: LEVEL[lvl], company, views, description };
});

const out = {
  schemaVersion: 1,
  set: {
    slug: "dsa",
    eyebrow: "Algorithms · Coding Practice",
    title: "DSA Questions",
    subtitle: "Hand-picked algorithm and problem-solving questions from beginner to advanced, designed to mirror real interview rounds. Open any question and jump into a focused coding workspace.",
    searchPlaceholder: "Search by title or keyword...",
    mockAssessment: { title: "Mock Assessment", unlockAfter: 5 },
    labels: {
      icon: "code",
      total: "Challenges",
      levels: { easy: "Beginner", medium: "Intermediate", hard: "Advanced" },
      progressDone: "solved",
      mockPrefix: "Solve",
    },
  },
  questions,
};
fs.writeFileSync("src/features/practice/data/dsa.json", JSON.stringify(out, null, 2) + "\n");
const c = (d) => questions.filter((q) => q.difficulty === d).length;
if (new Set(questions.map((q) => q.id)).size !== questions.length) throw new Error("dup ids");
console.log(`questions=${questions.length} beginner=${c("easy")} intermediate=${c("medium")} advanced=${c("hard")}`);
