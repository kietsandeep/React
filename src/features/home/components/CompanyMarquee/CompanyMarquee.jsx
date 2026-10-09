import { COMPANIES } from "../../data/home.data";
import styles from "./CompanyMarquee.module.css";

export default function CompanyMarquee() {
  const items = [...COMPANIES, ...COMPANIES]; // duplicated for a seamless loop
  return (
    <div className={styles.viewport} aria-label="Companies our users joined">
      <ul className={styles.track}>
        {items.map((c, i) => (
          <li key={`${c.name}-${i}`} className={styles.item}>
            <span className={styles.badge} style={{ background: c.color }}>{c.name[0]}</span>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
