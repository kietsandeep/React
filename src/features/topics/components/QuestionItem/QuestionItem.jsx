import ContentRenderer from "../ContentBlocks/ContentRenderer";
import styles from "./QuestionItem.module.css";

export default function QuestionItem({ item, open, onToggle, done, onToggleDone }) {
  const panelId = `panel-${item.id}`;
  return (
    <li className={`${styles.item} ${open ? styles.open : ""}`}>
      <button type="button" className={styles.head} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className={styles.title}>
          {done && <span className={styles.tick} aria-label="Completed">✓</span>}
          Q: {item.q}
          {item.moduleHeading && <em>{item.moduleHeading}</em>}
        </span>
        {item.difficulty && <span className={`${styles.tag} ${styles[item.difficulty]}`}>{item.difficulty}</span>}
        <span className={styles.chev} aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className={styles.body}>
          {item.description && <ContentRenderer blocks={item.description} />}
          <ContentRenderer blocks={item.answer} />
          <label className={styles.check}>
            <input type="checkbox" checked={done} onChange={onToggleDone} /> Mark as completed
          </label>
        </div>
      )}
    </li>
  );
}
