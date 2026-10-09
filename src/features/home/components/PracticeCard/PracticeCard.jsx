import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./PracticeCard.module.css";

export default function PracticeCard({ card }) {
  return (
    <Link to={card.to} className={styles.card}>
      <div className={`${styles.banner} ${styles[card.tone]}`}>
        <div>
          <div className={styles.count}>{card.count}</div>
          <div className={styles.label}>{card.label}</div>
        </div>
        <span className={styles.iconBox}><Icon name={card.icon} size={22} /></span>
      </div>
      <div className={styles.body}>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className={styles.footer}>
          <span>Start Practising</span>
          <span className={styles.arrow}><Icon name="arrow" size={14} /></span>
        </div>
      </div>
    </Link>
  );
}
