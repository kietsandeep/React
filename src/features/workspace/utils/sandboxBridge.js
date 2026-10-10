// Serialized with .toString() and executed inside the sandboxed iframe — it must not reference any imports.
export function sandboxBridge() {
  const send = (msg) => parent.postMessage({ source: "sandbox", ...msg }, "*");
  const fmt = (a) => {
    if (typeof a === "string") return a;
    if (a instanceof Error) return a.message;
    try { return JSON.stringify(a, (k, v) => (typeof v === "function" ? "[Function]" : v)); } catch (e) { return String(a); }
  };
  ["log", "info", "warn", "error"].forEach((level) => {
    const orig = console[level].bind(console);
    console[level] = (...args) => { send({ type: "console", level, text: args.map(fmt).join(" ") }); orig(...args); };
  });

  const errBox = document.getElementById("__err");
  let bootOk = true;
  const showError = (e, fatal) => {
    const msg = (e && e.message) || String(e);
    if (fatal) bootOk = false;
    errBox.style.display = "block";
    errBox.textContent = msg;
    send({ type: "console", level: "error", text: msg });
  };
  window.addEventListener("error", (e) => showError(e.error || e.message, false));
  window.addEventListener("unhandledrejection", (e) => showError(e.reason, false));

  // ---- boot: compile + run the learner's code ----
  const payload = JSON.parse(document.getElementById("__payload").textContent);
  const style = document.createElement("style");
  style.textContent = payload.css;
  document.head.appendChild(style);

  if (typeof React === "undefined" || typeof ReactDOM === "undefined" || typeof Babel === "undefined") {
    showError(new Error("Could not load React / Babel from the CDN. Check your internet connection and reload the preview."), true);
  } else {
    try {
      // Expose top-level names (function/const/let/var) so function-style tests can call them.
      const names = [];
      payload.js.replace(/(?:^|\n)[ \t]*(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g, (m, n) => { names.push(n); return m; });
      const expose = "\n;window.__fns = {" + names.map((n) => n + ": typeof " + n + " !== 'undefined' ? " + n + " : undefined").join(",") + "};";
      const mount = "\n;if (typeof App !== 'undefined') ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));";
      const src = payload.js + expose + mount;
      const out = Babel.transform(src, { presets: ["react"] }).code;
      (0, eval)(out);
    } catch (e) { showError(e, true); }
  }

  // ---- tiny test runner (steps come from the problem JSON) ----
  const all = (id) => Array.from(document.querySelectorAll('[data-testid="' + id + '"]'));
  const tick = (ms) => new Promise((r) => setTimeout(r, ms || 30));
  const fail = (m) => { throw new Error(m); };
  const pick = (s) => {
    const el = all(s.testid)[s.index || 0];
    if (!el) fail('Could not find an element with data-testid="' + s.testid + '"' + (s.index ? " (index " + s.index + ")" : ""));
    return el;
  };
  const txt = (el) => (el.textContent || "").trim();

  const acts = {
    click: (s) => pick(s).click(),
    hover: (s) => pick(s).dispatchEvent(new MouseEvent("mouseover", { bubbles: true })),
    unhover: (s) => pick(s).dispatchEvent(new MouseEvent("mouseout", { bubbles: true })),
    type: (s) => {
      const el = pick(s);
      const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, "value").set.call(el, String(s.value));
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
    wait: (s) => tick(s.ms),
  };
  const show = (v) => { try { return JSON.stringify(v, (k, x) => (x === undefined ? "undefined" : typeof x === "number" && !isFinite(x) ? String(x) : x)); } catch (e) { return String(v); } };
  const norm = (v, sortIt) => (sortIt && Array.isArray(v) ? v.slice().sort((a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : 1)) : v);
  const checks = {
    call: async (s) => {
      const f = (window.__fns || {})[s.fn];
      if (typeof f !== "function") fail('Could not find a function named "' + s.fn + '". Declare it at the top level of solution.js.');
      const args = JSON.parse(JSON.stringify(s.args || []));
      let got;
      try { got = await f.apply(null, args); } catch (e) { fail(s.fn + "(" + (s.args || []).map(show).join(", ") + ") threw: " + e.message); }
      const a = show(norm(got, s.unordered)), b = show(norm(s.equals, s.unordered));
      if (a !== b) { const err = new Error(s.fn + "(" + (s.args || []).map(show).join(", ") + ") expected " + b + " but got " + a); err.got = a; throw err; }
    },
    count: (s) => { const n = all(s.testid).length; if (n !== s.equals) fail('Expected ' + s.equals + ' element(s) with data-testid="' + s.testid + '" but found ' + n); },
    exists: (s) => { if (!all(s.testid).length) fail('Expected an element with data-testid="' + s.testid + '" to exist'); },
    absent: (s) => { if (all(s.testid).length) fail('Expected no element with data-testid="' + s.testid + '"'); },
    text: (s) => {
      const t = txt(pick(s));
      if (s.equals !== undefined && t !== String(s.equals)) fail('Expected "' + s.testid + '" text to be "' + s.equals + '" but got "' + t + '"');
      if (s.contains !== undefined && !t.includes(s.contains)) fail('Expected "' + s.testid + '" text to contain "' + s.contains + '" but got "' + t + '"');
    },
    value: (s) => { const v = pick(s).value; if (v !== String(s.equals)) fail('Expected "' + s.testid + '" value to be "' + s.equals + '" but got "' + v + '"'); },
    attr: (s) => { const v = pick(s).getAttribute(s.name); if (v !== s.equals) fail('Expected "' + s.testid + '" attribute ' + s.name + ' to be "' + s.equals + '" but got "' + v + '"'); },
    hasClass: (s) => {
      const has = pick(s).classList.contains(s.class);
      if (has !== (s.equals !== false)) fail('Expected "' + s.testid + '"' + (s.equals === false ? " not" : "") + ' to have class "' + s.class + '"');
    },
  };

  window.addEventListener("message", async (ev) => {
    const msg = ev.data;
    if (!msg || msg.type !== "run-tests") return;
    const results = [];
    for (const t of msg.tests) {
      if (!bootOk) { results.push({ name: t.name, passed: false, message: "Your code has an error — fix it and run the tests again." }); continue; }
      try {
        for (const s of t.steps) {
          if (s.act) { if (!acts[s.act]) fail("Unknown action " + s.act); await acts[s.act](s); await tick(); }
          else { if (!checks[s.expect]) fail("Unknown check " + s.expect); await checks[s.expect](s); }
        }
        results.push({ name: t.name, passed: true });
      } catch (e) { results.push({ name: t.name, passed: false, message: e.message, got: e.got }); }
    }
    send({ type: "test-results", results });
  });

  send({ type: "ready", ok: bootOk });
}
