import { SANDBOX_SCRIPTS } from "../constants/sandbox";
import { sandboxBridge } from "./sandboxBridge";

// Learner code travels as JSON inside a <script type="application/json"> tag ("<" escaped) — never as raw HTML.
const escapeJson = (s) => s.replace(/</g, "\\u003c");

export function buildSrcDoc({ js, css }, scripts = SANDBOX_SCRIPTS) {
  const payload = escapeJson(JSON.stringify({ js, css }));
  const tags = scripts.map((src) => `<script src="${src}"></script>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0}body{padding:20px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#111;background:#fff}
#__err{display:none;white-space:pre-wrap;padding:12px;margin:0 0 12px;border-radius:8px;background:#fee2e2;color:#991b1b;font:12.5px/1.5 ui-monospace,Menlo,Consolas,monospace}</style>
${tags}</head><body><div id="__err"></div><div id="root"></div>
<script id="__payload" type="application/json">${payload}</script>
<script>(${sandboxBridge.toString()})();</script></body></html>`;
}
