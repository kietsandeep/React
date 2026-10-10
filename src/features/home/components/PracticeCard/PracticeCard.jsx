import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./PracticeCard.module.css";

// Bento-style card: giant number, tag pills and a mini preview. `variant` = wide | tall.
export default function PracticeCard({ card }) {
  return (
    <Link to={card.to} className={`${styles.card} ${styles[card.variant]}`}>
      <span className={styles.ghostNum} aria-hidden="true">{card.count}</span>
      <div className={styles.head}>
        <span className={styles.icon}><Icon name={card.icon} size={22} /></span>
        <span className={styles.unit}><b>{card.count}</b> {card.unit}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <ul className={styles.tags}>{card.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      <span className={styles.cta}>Start practising <Icon name="arrow" size={14} /></span>
    </Link>
  );
}
