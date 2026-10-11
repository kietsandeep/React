import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./PracticeCard.module.css";

// Bento-style card: giant number, tag pills and a mini preview. `item.variant` = wide | tall.
export default function PracticeCard({ item }) {
  return (
    <Link to={item.to} className={`${styles.card} ${styles[item.variant]}`}>
      {item.count && <span className={styles.ghostNum} aria-hidden="true">{item.count}</span>}
      <div className={styles.head}>
        <span className={styles.icon}><Icon name={item.icon ?? "code"} size={22} /></span>
        {item.count && <span className={styles.unit}><b>{item.count}</b> {item.unit}</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <ul className={styles.tags}>{(item.tags ?? []).map((t) => <li key={t}>{t}</li>)}</ul>
      <span className={styles.cta}>Start practising <Icon name="arrow" size={14} /></span>
    </Link>
  );
}
