import Icon from "@/components/common/Icon/Icon";
import { getLabels } from "@/features/practice/utils/labels";
import styles from "./PracticeHero.module.css";

export default function PracticeHero({ set, stats }) {
  const L = getLabels(set);
  const items = [
    { label: L.total, value: stats.total },
    { label: L.levels.easy, value: stats.easy, tone: "easy" },
    { label: L.levels.medium, value: stats.medium, tone: "medium" },
    { label: L.levels.hard, value: stats.hard, tone: "hard" },
  ];
  return (
    <div className="container">
    <section className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.iconBox}><Icon name={L.icon} size={30} /></span>
        <div className={styles.text}>
          <span className={styles.eyebrow}>{set.eyebrow}</span>
          <h1>{set.title}</h1>
          <p>{set.subtitle}</p>
        </div>
        <ul className={styles.stats}>
          {items.map((s) => (
            <li key={s.label}>
              <strong className={s.tone ? styles[s.tone] : ""}>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </div>
  );
}
