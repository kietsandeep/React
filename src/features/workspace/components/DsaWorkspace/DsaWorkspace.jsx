import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/constants/site";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import { getLabels } from "@/features/practice/utils/labels";
import { useProgress } from "@/features/topics/hooks/useProgress";
import { useWorkspaceCode } from "@/features/workspace/hooks/useWorkspaceCode";
import { useSandbox } from "@/features/workspace/hooks/useSandbox";
import CodeEditor from "../CodeEditor/CodeEditor";
import InlineText from "../InlineText/InlineText";
import SolutionModal from "../SolutionModal/SolutionModal";
import styles from "./DsaWorkspace.module.css";

const MINUTES = { easy: 10, medium: 15, hard: 20 };
const FILE = "solution.js";
const fmtVal = (v) => { try { return JSON.stringify(v); } catch { return String(v); } };

// Visible test-case info comes straight from the problem's call tests.
function describeCase(test, i) {
  const s = test.steps?.[0] ?? {};
  return { name: test.name || `Case ${i + 1}`, input: (s.args ?? []).map(fmtVal).join(", "), expected: fmtVal(s.equals) };
}

function useCountdown(minutes) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  useEffect(() => {
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return { label: `${mm}:${ss}`, pct: (left / total) * 100, over: left === 0 };
}

export default function DsaWorkspace({ slug, set, question, problem, prev, next }) {
  const labels = getLabels(set);
  const { done, mark } = useProgress(`practice-${slug}`);
  const { files, setFile, applyFiles } = useWorkspaceCode(`${slug}:${question.id}`, problem.files);
  const code = files[FILE] ?? "";
  const sandbox = useSandbox({ js: code, css: "" });
  const timer = useCountdown(MINUTES[question.difficulty] ?? 10);

  const cases = useMemo(() => problem.tests.map(describeCase), [problem.tests]);
  const [showProblem, setShowProblem] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(true);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const canRun = problem.tests.length > 0;

  useEffect(() => { document.title = `${question.number}. ${question.title} | ${SITE.name}`; }, [question]);

  const run = async () => {
    setRunning(true);
    setResultsOpen(true);
    try {
      const r = await sandbox.runTests(problem.tests);
      setResults(r);
      if (r.length > 0 && r.every((x) => x.passed)) mark(question.id);
    } catch (e) {
      setResults([{ name: "Running the tests", passed: false, message: e.message }]);
    } finally {
      setRunning(false);
    }
  };

  const passed = results ? results.filter((r) => r.passed).length : 0;
  const failed = results ? results.length - passed : 0;
  const solved = done.has(question.id);
  const logs = sandbox.logs;

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label={`${SITE.name} home`}>
          <span className={styles.logo}>{SITE.short}</span>
          <span className={styles.name}>{SITE.name}</span>
        </Link>
        <span className={styles.sep} />
        <Link to={`/practice/${slug}`} className={styles.btn}><Icon name="arrowLeft" size={15} /> Problems</Link>
        <button type="button" className={styles.btn} onClick={() => setShowProblem((s) => !s)}>
          <Icon name={showProblem ? "chevronLeft" : "chevronRight"} size={15} /> {showProblem ? "Hide problem" : "Show problem"}
        </button>
        <span className={styles.label}>{set.eyebrow.split("·")[0].trim() === "Algorithms" ? "DSA" : set.eyebrow.split("·")[0].trim()} <b>#{question.number}</b></span>
        {prev ? <Link to={`/practice/${slug}/${prev.slug}`} className={styles.btn}><Icon name="chevronLeft" size={15} /> Prev</Link>
          : <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true"><Icon name="chevronLeft" size={15} /> Prev</span>}
        {next ? <Link to={`/practice/${slug}/${next.slug}`} className={styles.btn}>Next <Icon name="chevronRight" size={15} /></Link>
          : <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true">Next <Icon name="chevronRight" size={15} /></span>}
        <span className={styles.spacer} />
        <label className={styles.lang}>
          <span className="sr-only" style={{ position: "absolute", left: -9999 }}>Language</span>
          <select aria-label="Language" defaultValue="javascript">
            <option value="javascript">JavaScript</option>
          </select>
          <Icon name="chevronDown" size={16} />
        </label>
        <div className={`${styles.timer} ${timer.over ? styles.over : ""}`} aria-label="Time left" role="timer">
          <span className={styles.timerIcon}><Icon name="timer" size={18} /></span>
          <span className={styles.timerText}><small>TIME LEFT</small><b>{timer.label}</b></span>
          <span className={styles.timerBar}><i style={{ width: `${timer.pct}%` }} /></span>
        </div>
        <button type="button" className={`${styles.btn} ${styles.solution}`} onClick={() => setShowSolution(true)} disabled={!problem.solution}
          title={problem.solution ? "View the solution" : "Solution coming soon"}>
          <Icon name="eye" size={15} /> Solution
        </button>
      </header>

      <div className={`${styles.body} ${showProblem ? "" : styles.noProblem}`}>
        {showProblem && (
          <aside className={styles.problem} aria-label="Problem description">
            <div className={styles.chips}>
              <span className={`${styles.chip} ${styles[question.difficulty]}`}><Icon name="flame" size={13} /> {labels.levels[question.difficulty]}</span>
              <span className={`${styles.chip} ${styles.company}`}>Asked in {question.company}</span>
              <span className={`${styles.chip} ${styles.views}`}><Icon name="eye" size={13} /> {question.views.toLocaleString("en-US")}</span>
              {solved && <span className={`${styles.chip} ${styles.solved}`}>Solved <Icon name="checkCircle" size={14} /></span>}
            </div>

            <h1>{question.title}</h1>
            <p className={styles.statement}><InlineText text={problem.statement ?? question.description} /></p>

            {problem.examples?.map((ex, i) => (
              <section key={i}>
                <h2>Example {i + 1}</h2>
                <pre className={styles.example}><code>{ex}</code></pre>
              </section>
            ))}

            {problem.note && (
              <section>
                <h2>Note:</h2>
                <p className={styles.statement}><InlineText text={problem.note} /></p>
              </section>
            )}

            {problem.placeholder && (
              <p className={styles.soon}>Examples, test cases and a solution for this problem are coming soon. The editor already works — write your function and use <code>console.log</code> to try it.</p>
            )}

            {cases.length > 0 && (
              <section className={styles.cases}>
                <h3><Icon name="flag" size={16} /> TEST CASES <span className={styles.count}>{cases.length}</span></h3>
                <p className={styles.hint}>Your solution is checked against these cases when you press Run.</p>
                {cases.map((c, i) => (
                  <dl key={i} className={styles.case}>
                    <h4>Case {i + 1}:</h4>
                    <div><dt>Input:</dt><dd>{c.input}</dd></div>
                    <div><dt>Expected:</dt><dd>{c.expected}</dd></div>
                  </dl>
                ))}
              </section>
            )}
          </aside>
        )}

        <div className={styles.work}>
          <section className={`${styles.card} ${styles.editorCard}`} aria-label="Code editor">
            <header className={styles.cardHead}>
              <span className={styles.dots}><i /><i /><i /></span>
              <strong>Code</strong>
            </header>
            <div className={styles.editor}>
              <CodeEditor value={code} language="jsx" fontSize={15} label={`Editing ${FILE}`} onChange={(v) => setFile(FILE, v)} />
            </div>
          </section>

          <section className={`${styles.card} ${styles.resultsCard} ${resultsOpen ? "" : styles.collapsed}`} aria-label="Test results">
            <header className={styles.resHead}>
              <span className={styles.resIcon}><Icon name="terminal" size={18} /></span>
              <div className={styles.resTitle}>
                <strong>Test Results</strong>
                <small>{results ? `${passed}/${results.length} cases passed` : canRun ? `${cases.length} cases · press Run` : "No tests yet"}</small>
              </div>
              <span className={styles.spacer} />
              {results && <span className={`${styles.pill} ${styles.pass}`}>Passed {passed}/{results.length}</span>}
              {results && failed > 0 && <span className={`${styles.pill} ${styles.fail}`}>Failed {failed}</span>}
              <button type="button" className={styles.run} onClick={run} disabled={!canRun || running}
                title={canRun ? "Run the test cases" : "Tests for this problem are coming soon"}>
                <Icon name="play" size={13} /> {running ? "Running…" : "Run"}
              </button>
              <button type="button" className={styles.clear} onClick={() => { setResults(null); sandbox.clearLogs(); }}>
                <Icon name="trash" size={14} /> Clear
              </button>
              <button type="button" className={styles.toggle} aria-expanded={resultsOpen} aria-label={resultsOpen ? "Collapse results" : "Expand results"}
                onClick={() => setResultsOpen((o) => !o)}>
                <Icon name="chevronDown" size={18} style={{ transform: resultsOpen ? "none" : "rotate(180deg)" }} />
              </button>
            </header>
            {resultsOpen && (
              <div className={styles.resBody}>
                {!results && <p className={styles.empty}>{canRun ? "Write your solution, then press Run to check it against the test cases." : "Tests for this problem are coming soon. Use console.log to try your code."}</p>}
                {results?.map((r, i) => (
                  <div key={i} className={`${styles.res} ${r.passed ? styles.ok : styles.bad}`}>
                    <div className={styles.resName}>
                      <Icon name={r.passed ? "check" : "x"} size={14} /> {r.name} — {r.passed ? "Passed" : "Failed"}
                    </div>
                    {!r.passed && cases[i] && (
                      <>
                        <div className={styles.kv}><span>Expected:</span> {cases[i].expected}</div>
                        {r.got !== undefined && <div className={styles.kv}><span>Got:</span> {r.got === '"undefined"' ? "undefined" : r.got}</div>}
                        {r.got === undefined && r.message && <div className={styles.kv}><span>Error:</span> {r.message}</div>}
                      </>
                    )}
                  </div>
                ))}
                {logs.length > 0 && (
                  <div className={styles.logs}>
                    <small>Console</small>
                    {logs.map((l, i) => <div key={i} className={l.level === "error" ? styles.logErr : ""}>{l.text}</div>)}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Hidden sandbox: runs the learner's code and the tests */}
      <iframe key={sandbox.runKey} ref={sandbox.iframeRef} title="Code sandbox" sandbox="allow-scripts" srcDoc={sandbox.srcDoc}
        style={{ position: "absolute", width: 0, height: 0, border: 0, visibility: "hidden" }} />

      {showSolution && problem.solution && (
        <SolutionModal solution={problem.solution} onApply={applyFiles} onClose={() => setShowSolution(false)} />
      )}
    </div>
  );
}
