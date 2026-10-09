import { Link } from "react-router-dom";
import TechLogo from "@/components/common/TechLogo/TechLogo";
import Icon from "@/components/common/Icon/Icon";
import styles from "./TopicCard.module.css";

export default function TopicCard({ topic }) {
  return (
    <Link to={`/topics/${topic.slug}`} className={styles.card} style={{ "--accent": topic.accent }}>
      <div className={styles.top}>
        <h3>{topic.count} {topic.title}</h3>
        <p>{topic.description}</p>
        <hr />
      </div>
      <div className={styles.logo}><TechLogo name={topic.logo} /></div>
      <div className={styles.footer}>
        <span>Continue</span>
        <span className={styles.arrow}><Icon name="arrow" size={12} /></span>
      </div>
    </Link>
  );
}
