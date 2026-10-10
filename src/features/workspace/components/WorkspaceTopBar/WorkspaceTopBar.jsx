import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./WorkspaceTopBar.module.css";

function NavBtn({ to, disabled, children }) {
  return disabled
    ? <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true">{children}</span>
    : <Link to={to} className={styles.btn}>{children}</Link>;
}

export default function WorkspaceTopBar({
  setSlug, track, number, prev, next,
  showProblem, onToggleProblem, onSubmit, running, canSubmit, onSolution, canSolution,
}) {
  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.brand} aria-label="InterviewDepth home">
        <span className={styles.logo}>ID</span>
        <span className={styles.name}>Interview<b>Depth</b></span>
      </Link>
      <span className={styles.sep} />
      <Link to={`/practice/${setSlug}`} className={styles.btn}><Icon name="arrowLeft" size={15} /> Problems</Link>
      <button type="button" className={styles.btn} onClick={onToggleProblem}>
        <Icon name={showProblem ? "chevronLeft" : "chevronRight"} size={15} /> {showProblem ? "Hide problem" : "Show problem"}
      </button>
      <span className={styles.label}>{track} <b>#{number}</b></span>
      <NavBtn to={prev ? `/practice/${setSlug}/${prev.slug}` : ""} disabled={!prev}><Icon name="chevronLeft" size={15} /> Prev</NavBtn>
      <NavBtn to={next ? `/practice/${setSlug}/${next.slug}` : ""} disabled={!next}>Next <Icon name="chevronRight" size={15} /></NavBtn>
      <span className={styles.spacer} />
      <button type="button" className={`${styles.btn} ${styles.submit}`} onClick={onSubmit} disabled={!canSubmit || running}
        title={canSubmit ? "Run the tests against your code" : "Tests for this problem are coming soon"}>
        <Icon name="play" size={14} /> {running ? "Running…" : "Submit & Test"}
      </button>
      <button type="button" className={`${styles.btn} ${styles.solution}`} onClick={onSolution} disabled={!canSolution}
        title={canSolution ? "View the solution" : "Solution coming soon"}>
        <Icon name="eye" size={15} /> Solution
      </button>
    </header>
  );
}
