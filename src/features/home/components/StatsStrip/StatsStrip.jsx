import { STATS } from "../../data/home.data";
import styles from "./StatsStrip.module.css";

export default function StatsStrip() {
  return (
    <ul className={styles.strip}>
      {STATS.map((s) => (
        <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>
      ))}
    </ul>
  );
}
