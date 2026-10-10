// Sandbox page for "predict the output" questions: runs the learner's code as a plain sloppy-mode script
// (no Babel, no React) and forwards console output to the parent. Code travels as JSON, never as raw HTML.
function runner() {
  const send = (msg) => parent.postMessage({ source: "output-run", ...msg }, "*");
  // Keep in sync with the formatter in scripts/build-output-json.mjs
  const fmt = (a) => {
    if (typeof a === "string") return a;
    if (typeof a === "bigint") return a + "n";
    if (typeof a === "symbol" || typeof a === "function" || a === undefined) return String(a);
    if (typeof a === "object" && a !== null) { try { return JSON.stringify(a); } catch (e) { return String(a); } }
    return String(a);
  };
  ["log", "info", "warn", "error"].forEach((level) => {
    console[level] = (...args) => send({ type: "log", level, text: args.map(fmt).join(" ") });
  });
  const err = (e, prefix) => send({ type: "log", level: "error", text: (prefix || "Uncaught ") + (e && e.name ? e.name + ": " + e.message : String(e)) });
  window.addEventListener("error", (e) => { err(e.error || e.message); e.preventDefault(); });
  window.addEventListener("unhandledrejection", (e) => { err(e.reason, "Uncaught (in promise) "); e.preventDefault(); });
  const { code } = JSON.parse(document.getElementById("__code").textContent);
  try { (0, eval)(code); } catch (e) { err(e); }
  send({ type: "started" });
}

export function buildOutputDoc(code) {
  const payload = JSON.stringify({ code }).replace(/</g, "\\u003c");
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script id="__code" type="application/json">${payload}</script>
<script>(${runner.toString()})();</script></body></html>`;
}
