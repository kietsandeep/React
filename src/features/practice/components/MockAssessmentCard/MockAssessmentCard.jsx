import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import styles from "./MockAssessmentCard.module.css";

export default function MockAssessmentCard({ slug, config, done }) {
  const need = Math.max(0, config.unlockAfter - done);
  const locked = need > 0;
  return (
    <section className={styles.card}>
      <span className={styles.icon}><Icon name="flag" size={24} /></span>
      <div className={styles.text}>
        <h2>{config.title}</h2>
        <p>
          {locked
            ? `Complete ${need} more question${need === 1 ? "" : "s"} to unlock a timed, interview-style assessment.`
            : "You've unlocked the timed, interview-style assessment."}
        </p>
      </div>
      {locked ? (
        <span className={styles.badge} aria-label={`${done} of ${config.unlockAfter} completed`}>
          <Icon name="lock" size={14} /> {Math.min(done, config.unlockAfter)}/{config.unlockAfter}
        </span>
      ) : (
        <Link to={`/practice/${slug}/mock`} className={styles.start}>Start assessment</Link>
      )}
    </section>
  );
}
