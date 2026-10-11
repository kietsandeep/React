import styles from "./StatsStrip.module.css";

// stats: [{ value, label }] — resolved from home.json by the registry.
export default function StatsStrip({ stats }) {
  return (
    <ul className={styles.strip}>
      {stats.map((s) => (
        <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>
      ))}
    </ul>
  );
}
