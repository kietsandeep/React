import { useCallback, useEffect, useRef, useState } from "react";
import { buildOutputDoc } from "../utils/buildOutputDoc";

const IDLE_MS = 1300; // no new output for this long = the run is finished (covers setTimeout chains)

// Runs the code in a sandboxed iframe and collects what it logs.
export function useOutputRunner() {
  const iframeRef = useRef(null);
  const idle = useRef(null);
  const [srcDoc, setSrcDoc] = useState("");
  const [runKey, setRunKey] = useState(0);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const bump = useCallback(() => {
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setRunning(false), IDLE_MS);
  }, []);

  useEffect(() => {
    const onMessage = (ev) => {
      const d = ev.data;
      if (!d || d.source !== "output-run" || ev.source !== iframeRef.current?.contentWindow) return;
      if (d.type === "log") setLogs((l) => [...l.slice(-299), { level: d.level, text: d.text }]);
      bump();
    };
    window.addEventListener("message", onMessage);
    return () => { window.removeEventListener("message", onMessage); clearTimeout(idle.current); };
  }, [bump]);

  const run = useCallback((code) => {
    setLogs([]); setHasRun(true); setRunning(true);
    setSrcDoc(buildOutputDoc(code));
    setRunKey((k) => k + 1);
    bump();
  }, [bump]);

  const clear = useCallback(() => { setLogs([]); setHasRun(false); setRunning(false); setSrcDoc(""); clearTimeout(idle.current); }, []);

  return { iframeRef, srcDoc, runKey, logs, running, hasRun, run, clear };
}
