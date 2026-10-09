import styles from "./ModuleSidebar.module.css";

export default function ModuleSidebar({ modules, activeSlug, doneIds, onSelect }) {
  return (
    <aside className={styles.sidebar} aria-label="Modules">
      <h2>Modules</h2>
      <ul>
        {modules.map((m) => {
          const done = m.questions.filter((q) => doneIds.has(q.id)).length;
          return (
            <li key={m.id}>
              <button type="button" className={m.slug === activeSlug ? styles.active : ""}
                aria-current={m.slug === activeSlug ? "true" : undefined} onClick={() => onSelect(m.slug)}>
                <span>{m.heading}</span>
                <small>{done}/{m.questions.length}</small>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
