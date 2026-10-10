import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import Icon from "@/components/common/Icon/Icon";
import { SITE } from "@/constants/site";
import { getLabels } from "@/features/practice/utils/labels";
import { useProgress } from "@/features/topics/hooks/useProgress";
import { useWorkspaceCode } from "@/features/workspace/hooks/useWorkspaceCode";
import { useOutputRunner } from "@/features/workspace/hooks/useOutputRunner";
import CodeEditor from "../CodeEditor/CodeEditor";
import InlineText from "../InlineText/InlineText";
import Modal from "../Modal/Modal";
import styles from "./OutputWorkspace.module.css";

const FILE = "code.js";

// "Predict the output" workspace: read the snippet, guess, press Run to check, reveal the solution when ready.
export default function OutputWorkspace({ slug, set, question, problem, prev, next }) {
  const labels = getLabels(set);
  const { done, toggle } = useProgress(`practice-${slug}`);
  const { files, setFile, reset } = useWorkspaceCode(`${slug}:${question.id}`, { [FILE]: problem.code });
  const runner = useOutputRunner();
  const [showSolution, setShowSolution] = useState(false);
  const completed = done.has(question.id);
  const code = files[FILE] ?? "";

  useEffect(() => { document.title = `${question.number}. ${question.title} | ${SITE.name}`; }, [question]);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <aside className={styles.side} aria-label="Question">
          <div className={styles.nav}>
            <Link to={`/practice/${slug}`} className={styles.back}><Icon name="arrowLeft" size={15} /> All questions</Link>
            <span className={styles.arrows}>
              {prev ? <Link to={`/practice/${slug}/${prev.slug}`} aria-label="Previous question"><Icon name="chevronLeft" size={16} /></Link>
                : <span aria-disabled="true"><Icon name="chevronLeft" size={16} /></span>}
              {next ? <Link to={`/practice/${slug}/${next.slug}`} aria-label="Next question"><Icon name="chevronRight" size={16} /></Link>
                : <span aria-disabled="true"><Icon name="chevronRight" size={16} /></span>}
            </span>
          </div>

          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles[question.difficulty]}`}><Icon name="flame" size={13} /> {labels.levels[question.difficulty]}</span>
            <span className={`${styles.chip} ${styles.cat}`}>{question.category}</span>
            <span className={`${styles.chip} ${styles.company}`}>Asked in {question.company}</span>
          </div>
          <p className={styles.views}><Icon name="eye" size={14} /> {question.views.toLocaleString("en-US")} views</p>

          <h1><span>{question.number}.</span> {question.title}</h1>
          <p className={styles.prompt}><Icon name="terminal" size={18} /> What is the output of this code? Predict it, then run the code in the editor to check.</p>

          <div className={styles.actions}>
            <button type="button" className={styles.solution} onClick={() => setShowSolution(true)}><Icon name="eye" size={17} /> Show solution</button>
            <button type="button" className={`${styles.mark} ${completed ? styles.markOn : ""}`} onClick={() => toggle(question.id)} aria-pressed={completed}>
              <Icon name="check" size={16} /> {completed ? "Completed" : "Mark as completed"}
            </button>
          </div>
        </aside>

        <section className={styles.work}>
          <div className={styles.editor}>
            <CodeEditor value={code} language="jsx" fontSize={15} label="Code editor" onChange={(v) => setFile(FILE, v)} />
          </div>
          <div className={styles.runBar}>
            <button type="button" className={styles.run} onClick={() => runner.run(code)} disabled={runner.running}>
              <Icon name="play" size={14} /> {runner.running ? "Running…" : "Run"}
            </button>
            <button type="button" className={styles.reset} onClick={() => { reset(); runner.clear(); }}>Reset code</button>
          </div>
          <div className={styles.console} aria-label="Console">
            <header><Icon name="terminal" size={15} /> Console {runner.logs.length > 0 && <span>{runner.logs.length}</span>}</header>
            <div className={styles.out} aria-live="polite">
              {!runner.hasRun && <p className={styles.hint}>Press Run to see the output…</p>}
              {runner.hasRun && runner.logs.length === 0 && !runner.running && <p className={styles.hint}>(no output)</p>}
              {runner.logs.map((l, i) => <div key={i} className={l.level === "error" ? styles.err : ""}>{l.text || " "}</div>)}
            </div>
          </div>
        </section>
      </div>

      <iframe key={runner.runKey} ref={runner.iframeRef} title="Code sandbox" sandbox="allow-scripts" srcDoc={runner.srcDoc}
        style={{ position: "absolute", width: 0, height: 0, border: 0, visibility: "hidden" }} />

      {showSolution && (
        <Modal title="Solution" wide onClose={() => setShowSolution(false)}
          footer={<button type="button" className={styles.modalBtn} onClick={() => setShowSolution(false)}>Close</button>}>
          <p className={styles.sLabel}>Output</p>
          <pre className={styles.sOut}>{problem.expected.map((l) => l || " ").join("\n")}</pre>
          <p className={styles.sLabel}>Why?</p>
          <p className={styles.sText}><InlineText text={problem.explanation} /></p>
        </Modal>
      )}
    </div>
  );
}
