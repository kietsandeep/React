// node scripts/build-output-json.mjs
//   -> src/features/practice/data/output.json              (list page)
//   -> src/features/workspace/data/output/<id>.json         (one file per question: code, expected output, explanation)
// The expected output is produced by actually running every snippet (sloppy mode, browser-like global), so it can't drift from reality.
import fs from "node:fs";
import vm from "node:vm";
import { ROWS } from "./source/output-source.mjs";

const LEVEL = { E: "easy", M: "medium", H: "hard" };
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// Keep in sync with the formatter inside src/features/workspace/utils/buildOutputDoc.js
const fmt = (a) => {
  if (typeof a === "string") return a;
  if (typeof a === "bigint") return `${a}n`;
  if (typeof a === "symbol" || typeof a === "function" || a === undefined) return String(a);
  if (typeof a === "object" && a !== null) { try { return JSON.stringify(a); } catch { return String(a); } }
  return String(a);
};

function run(code) {
  return new Promise((resolve) => {
    const out = [];
    const log = (...args) => { out.push(args.map(fmt).join(" ")); bump(); };
    const ctx = vm.createContext({ console: { log, info: log, warn: log, error: log }, setTimeout, setInterval, clearTimeout, clearInterval, name: "" });
    let last;
    const finish = () => resolve(out);
    const bump = () => { clearTimeout(last); last = setTimeout(finish, 1300); };
    bump();
    try { vm.runInContext(code, ctx, { timeout: 2000 }); }
    catch (e) { out.push(`Uncaught ${e.name}: ${e.message}`); }
  });
}

const rows = await Promise.all(ROWS.map(async ([category, lvl, company, views, code, explanation], i) => {
  const number = i + 1;
  const title = `${category}: predict the output #${number + 1}`;
  return { number, title, category, lvl, company, views, code, explanation, expected: await run(code) };
}));

const seen = new Set();
const questions = rows.map((r) => {
  let slug = slugify(r.title); if (seen.has(slug)) slug += `-${r.number}`; seen.add(slug);
  return { id: `out-${String(r.number).padStart(3, "0")}`, number: r.number, slug, title: r.title, difficulty: LEVEL[r.lvl], company: r.company, views: r.views, category: r.category, description: r.category, code: r.code };
});

fs.writeFileSync("src/features/practice/data/output.json", JSON.stringify({
  schemaVersion: 1,
  set: {
    slug: "output",
    eyebrow: "JavaScript · Output Challenges",
    title: "Guess the JavaScript Output",
    subtitle: "Tricky output-based questions on hoisting, closures, the event loop and more. Open any question, run the code in a live editor, and reveal the solution.",
    searchPlaceholder: "Search questions (closures, event loop, company...)",
    labels: { icon: "code" },
  },
  questions,
}, null, 2) + "\n");

fs.rmSync("src/features/workspace/data/output", { recursive: true, force: true });
fs.mkdirSync("src/features/workspace/data/output", { recursive: true });
rows.forEach((r, i) => {
  fs.writeFileSync(`src/features/workspace/data/output/${questions[i].id}.json`, JSON.stringify({
    id: questions[i].id, kind: "output", code: r.code, expected: r.expected, explanation: r.explanation,
  }, null, 2) + "\n");
});
const c = (d) => questions.filter((q) => q.difficulty === d).length;
console.log(`questions=${questions.length} easy=${c("easy")} medium=${c("medium")} hard=${c("hard")}`);
rows.forEach((r) => console.log(String(r.number).padStart(2), JSON.stringify(r.expected)));
