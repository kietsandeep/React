import { Link } from "react-router-dom";
import TechLogo from "@/components/common/TechLogo/TechLogo";
import Icon from "@/components/common/Icon/Icon";
import styles from "./TopicCard.module.css";

// Compact horizontal tile: logo chip, title, short blurb and a count pill.
export default function TopicCard({ topic }) {
  return (
    <Link to={`/topics/${topic.slug}`} className={styles.tile} style={{ "--accent-c": topic.accent }}>
      <span className={styles.logo}><TechLogo name={topic.logo} /></span>
      <div className={styles.text}>
        <h3>{topic.title.replace(" Interview Questions", "").replace(" Questions", "")}</h3>
        <p>{topic.description}</p>
      </div>
      <span className={styles.count}>{topic.count}</span>
      <span className={styles.arrow}><Icon name="arrow" size={14} /></span>
    </Link>
  );
}
