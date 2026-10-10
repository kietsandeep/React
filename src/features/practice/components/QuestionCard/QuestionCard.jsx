import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./QuestionCard.module.css";


export default function QuestionCard({ question: q, setSlug, done, levels }) {
  return (
    <Link to={`/practice/${setSlug}/${q.slug}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles[q.difficulty]}`}><Icon name="flame" size={12} /> {levels[q.difficulty]}</span>
          {done && <span className={`${styles.pill} ${styles.done}`}><Icon name="check" size={12} /> Done</span>}
        </div>
        <span className={styles.views}><Icon name="eye" size={14} /> {q.views.toLocaleString("en-US")} views</span>
      </div>
      <h3><span className={styles.num}>{q.number}.</span> {q.title}</h3>
      <span className={styles.company}>Asked in {q.company}</span>
      {q.code ? (
        <>
          <pre className={styles.code}><code>{q.code}</code></pre>
          <span className={styles.category}>{q.category}</span>
        </>
      ) : (
        <p>{q.description}</p>
      )}
      <span className={styles.solve}>Solve <Icon name="chevronRight" size={14} /></span>
    </Link>
  );
}
