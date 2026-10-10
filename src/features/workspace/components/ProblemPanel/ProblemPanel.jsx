import Icon from "@/components/common/Icon/Icon";
import InlineText from "../InlineText/InlineText";
import styles from "./ProblemPanel.module.css";


export default function ProblemPanel({ question, problem, done, levels }) {
  const { thingsToDo = [], instructions } = problem;
  return (
    <aside className={styles.panel} aria-label="Problem description">
      <div className={styles.chips}>
        <span className={`${styles.chip} ${styles[question.difficulty]}`}><Icon name="flame" size={13} /> {levels[question.difficulty]}</span>
        <span className={`${styles.chip} ${styles.company}`}>Asked in {question.company}</span>
        {done && <span className={`${styles.chip} ${styles.done}`}><Icon name="checkCircle" size={13} /> Completed</span>}
      </div>

      <h1>{question.number}. {question.title}</h1>
      <p className={styles.desc}>{question.description}</p>

      {problem.placeholder && (
        <p className={styles.soon}>Detailed instructions, tests and a solution for this problem are coming soon. The editor and live preview already work, so feel free to start building.</p>
      )}

      {thingsToDo.length > 0 && (
        <>
          <h2>Things To Do</h2>
          <ol className={styles.todo}>{thingsToDo.map((t, i) => <li key={i}><InlineText text={t} /></li>)}</ol>
        </>
      )}

      {instructions && (
        <>
          <h2>Instructions — required test IDs</h2>
          <p className={styles.intro}><InlineText text={instructions.intro} /></p>
          <ul className={styles.ids}>
            {instructions.testIds.map((t) => (
              <li key={t.id}><code>data-testid="{t.id}"</code> <span>{t.description}</span></li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
