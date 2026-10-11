import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/constants/site";
import { Link, useParams } from "react-router-dom";
import { getPracticeSet } from "@/features/practice/services/practiceService";
import { buildFallbackProblem, loadProblem } from "@/features/workspace/services/problemService";
import { getLabels } from "@/features/practice/utils/labels";
import { useProgress } from "@/features/topics/hooks/useProgress";
import { useWorkspaceCode } from "@/features/workspace/hooks/useWorkspaceCode";
import { useSandbox } from "@/features/workspace/hooks/useSandbox";
import { CSS_FILE, FILE_ORDER, JS_FILES } from "@/features/workspace/constants/sandbox";
import WorkspaceTopBar from "@/features/workspace/components/WorkspaceTopBar/WorkspaceTopBar";
import ProblemPanel from "@/features/workspace/components/ProblemPanel/ProblemPanel";
import EditorPanel from "@/features/workspace/components/EditorPanel/EditorPanel";
import PreviewPanel from "@/features/workspace/components/PreviewPanel/PreviewPanel";
import ResultsModal from "@/features/workspace/components/ResultsModal/ResultsModal";
import SolutionModal from "@/features/workspace/components/SolutionModal/SolutionModal";
import { WORKSPACES } from "@/features/workspace/registry";
import styles from "./WorkspacePage.module.css";

function Workspace({ slug, set, question, problem, prev, next }) {
  const { done, mark } = useProgress(`practice-${slug}`);
  const { files, setFile, applyFiles, reset } = useWorkspaceCode(`${slug}:${question.id}`, problem.files);

  const order = useMemo(() => FILE_ORDER.filter((n) => n in problem.files), [problem.files]);
  const js = JS_FILES.filter((n) => n in files).map((n) => files[n]).join("\n\n");
  const sandbox = useSandbox({ js, css: files[CSS_FILE] ?? "" });

  const [showProblem, setShowProblem] = useState(true);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const canSubmit = problem.tests.length > 0;
  const canSolution = !!problem.solution;

  const submit = async () => {
    setRunning(true);
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

  useEffect(() => { document.title = `${question.number}. ${question.title} | ${SITE.name}`; }, [question]);

  return (
    <div className={styles.page}>
      <WorkspaceTopBar
        setSlug={slug} track={set.eyebrow.split("·")[0].trim()} number={question.number} prev={prev} next={next}
        showProblem={showProblem} onToggleProblem={() => setShowProblem((s) => !s)}
        onSubmit={submit} running={running} canSubmit={canSubmit} onSolution={() => setShowSolution(true)} canSolution={canSolution}
      />
      <div className={`${styles.body} ${showProblem ? "" : styles.noProblem}`}>
        {showProblem && <ProblemPanel question={question} problem={problem} done={done.has(question.id)} levels={getLabels(set).levels} />}
        <EditorPanel files={files} order={order} setFile={setFile} onReset={reset} />
        <PreviewPanel iframeRef={sandbox.iframeRef} iframeKey={sandbox.runKey} srcDoc={sandbox.srcDoc}
          logs={sandbox.logs} onRefresh={sandbox.refresh} onClear={sandbox.clearLogs} />
      </div>

      {results && (
        <ResultsModal results={results} onClose={() => setResults(null)}
          nextTo={next ? `/practice/${slug}/${next.slug}` : null} />
      )}
      {showSolution && canSolution && (
        <SolutionModal solution={problem.solution} onApply={applyFiles} onClose={() => setShowSolution(false)} />
      )}
    </div>
  );
}

export default function WorkspacePage() {
  const { slug, questionSlug } = useParams();
  const set = getPracticeSet(slug);
  const index = set ? set.questions.findIndex((q) => q.slug === questionSlug) : -1;
  const question = index >= 0 ? set.questions[index] : null;
  const [state, setState] = useState({ id: null, problem: null });

  useEffect(() => {
    if (!question) return undefined;
    let alive = true;
    loadProblem(slug, question.id)
      .then((p) => alive && setState({ id: question.id, problem: p ?? buildFallbackProblem(question, slug) }))
      .catch(() => alive && setState({ id: question.id, problem: buildFallbackProblem(question, slug) }));
    return () => { alive = false; };
  }, [slug, question]);

  if (!set || !question) {
    return (
      <div className={styles.center}>
        <div style={{ textAlign: "center" }}>
          <h1>Problem not found</h1>
          <Link to={`/practice/${slug}`} style={{ color: "var(--brand)", fontWeight: 700 }}>Back to problems</Link>
        </div>
      </div>
    );
  }
  if (state.id !== question.id) return <div className={styles.center}>Loading problem…</div>;

  const Component = WORKSPACES[state.problem.kind] ?? Workspace;
  return (
    <Component key={question.id} slug={slug} set={set.set} question={question} problem={state.problem}
      prev={set.questions[index - 1] ?? null} next={set.questions[index + 1] ?? null} />
  );
}
