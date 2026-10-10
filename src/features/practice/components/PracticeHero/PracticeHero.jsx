import Icon from "@/components/common/Icon/Icon";
import styles from "./PracticeHero.module.css";

export default function PracticeHero({ set, stats }) {
  const items = [
    { label: "Questions", value: stats.total },
    { label: "Easy", value: stats.easy, tone: "easy" },
    { label: "Medium", value: stats.medium, tone: "medium" },
    { label: "Hard", value: stats.hard, tone: "hard" },
  ];
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.iconBox}><Icon name="laptop" size={30} /></span>
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
  );
}
