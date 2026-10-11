import { Link } from "react-router-dom";
import TechLogo from "@/components/common/TechLogo/TechLogo";
import Icon from "@/components/common/Icon/Icon";
import { getQuickSet } from "@/features/quick/services/quickService";
import { useProgress } from "@/features/topics/hooks/useProgress";
import styles from "./QuickCard.module.css";

// Quick-revision card: accent header, question count, reading time and the learner's own progress.
export default function QuickCard({ item }) {
  const { done } = useProgress(`quick-${item.slug}`);
  const total = getQuickSet(item.slug)?.questions?.length ?? 0;
  const ready = total > 0;
  const pct = ready ? Math.min(100, Math.round((done.size / total) * 100)) : 0;
  const minutes = ready ? Math.max(5, Math.round(total * 0.6)) : null;

  return (
    <Link to={item.to} className={styles.card} style={{ "--accent-c": item.accent }}>
      <div className={styles.top}>
        <span className={styles.logo}><TechLogo name={item.logo} /></span>
        {ready
          ? <span className={styles.pill}><Icon name="bolt" size={13} /> ~{minutes} min</span>
          : <span className={styles.pill}>Coming soon</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.meta}>
        <span>{ready ? <><b>{total}</b> questions</> : "Questions on the way"}</span>
        {ready && done.size > 0 && <span>{pct}% done</span>}
      </div>
      <div className={styles.bar} aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
      <span className={styles.cta}>{done.size > 0 && ready ? "Continue revising" : "Revise now"} <Icon name="arrow" size={14} /></span>
    </Link>
  );
}
