import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./QuestionCard.module.css";

const LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };

export default function QuestionCard({ question: q, setSlug, done }) {
  return (
    <Link to={`/practice/${setSlug}/${q.slug}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles[q.difficulty]}`}><Icon name="flame" size={12} /> {LABEL[q.difficulty]}</span>
          {done && <span className={`${styles.pill} ${styles.done}`}><Icon name="check" size={12} /> Done</span>}
        </div>
        <span className={styles.views}><Icon name="eye" size={14} /> {q.views.toLocaleString("en-US")} views</span>
      </div>
      <h3><span className={styles.num}>{q.number}.</span> {q.title}</h3>
      <span className={styles.company}>Asked in {q.company}</span>
      <p>{q.description}</p>
      <span className={styles.solve}>Solve <Icon name="chevronRight" size={14} /></span>
    </Link>
  );
}
