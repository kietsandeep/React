import Icon from "@/components/common/Icon/Icon";
import { STEPS } from "../../data/home.data";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <ol className={styles.steps}>
      {STEPS.map((s) => (
        <li key={s.n}>
          <span className={styles.n}>{s.n}</span>
          <span className={styles.icon}><Icon name={s.icon} size={20} /></span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
