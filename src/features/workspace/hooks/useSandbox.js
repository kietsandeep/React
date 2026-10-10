import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildSrcDoc } from "../utils/buildSrcDoc";

// Owns the preview iframe: debounced live reload, console capture, and running the problem's tests.
export function useSandbox({ js, css }) {
  const iframeRef = useRef(null);
  const latest = useRef({ js, css });
  latest.current = { js, css };

  const [applied, setApplied] = useState({ js, css });
  const [runKey, setRunKey] = useState(0);
  const [logs, setLogs] = useState([]);
  const waiters = useRef([]);
  const resolver = useRef(null);

  // live preview: re-run shortly after the learner stops typing
  useEffect(() => {
    const id = setTimeout(() => setApplied({ js, css }), 600);
    return () => clearTimeout(id);
  }, [js, css]);

  const srcDoc = useMemo(() => buildSrcDoc(applied), [applied]);
  useEffect(() => { setLogs([]); }, [srcDoc, runKey]);

  useEffect(() => {
    const onMessage = (ev) => {
      const d = ev.data;
      if (!d || d.source !== "sandbox" || ev.source !== iframeRef.current?.contentWindow) return;
      if (d.type === "console") setLogs((l) => [...l.slice(-199), { level: d.level, text: d.text }]);
      else if (d.type === "ready") waiters.current.splice(0).forEach((fn) => fn());
      else if (d.type === "test-results") { resolver.current?.(d.results); resolver.current = null; }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const refresh = useCallback(() => { setApplied({ ...latest.current }); setRunKey((k) => k + 1); }, []);

  // Always tests the latest code from a clean reload so earlier clicks never leak into the run.
  const runTests = useCallback((tests) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { resolver.current = null; reject(new Error("The tests timed out. Check the console for errors.")); }, 12000);
    waiters.current.push(() => {
      resolver.current = (results) => { clearTimeout(timer); resolve(results); };
      iframeRef.current?.contentWindow?.postMessage({ type: "run-tests", tests }, "*");
    });
    setApplied({ ...latest.current });
    setRunKey((k) => k + 1);
  }), []);

  return { iframeRef, srcDoc, runKey, logs, clearLogs: () => setLogs([]), refresh, runTests };
}
