import { Link } from "react-router-dom";
import TechLogo from "@/components/common/TechLogo/TechLogo";
import Icon from "@/components/common/Icon/Icon";
import styles from "./TopicCard.module.css";

// Compact horizontal tile: logo chip, title, short blurb and a count pill.
export default function TopicCard({ item }) {
  return (
    <Link to={item.to} className={styles.tile} style={{ "--accent-c": item.accent }}>
      <span className={styles.logo}><TechLogo name={item.logo} /></span>
      <div className={styles.text}>
        <h3>{item.shortTitle ?? item.title.replace(" Interview Questions", "").replace(" Questions", "")}</h3>
        <p>{item.description}</p>
      </div>
      {item.count && <span className={styles.count}>{item.count}</span>}
      <span className={styles.arrow}><Icon name="arrow" size={14} /></span>
    </Link>
  );
}
