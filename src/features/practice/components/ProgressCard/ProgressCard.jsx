import Icon from "@/components/common/Icon/Icon";
import styles from "./ProgressCard.module.css";

export default function ProgressCard({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <section className={styles.card} aria-label="Your progress">
      <div className={styles.row}>
        <strong><Icon name="checkCircle" size={18} /> Your progress</strong>
        <span>{done} completed · {total - done} pending</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <small>{pct}% complete</small>
    </section>
  );
}
