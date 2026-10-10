import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import HeroCarousel from "@/features/home/components/HeroCarousel/HeroCarousel";
import StatsStrip from "@/features/home/components/StatsStrip/StatsStrip";
import PracticeCard from "@/features/home/components/PracticeCard/PracticeCard";
import TopicCard from "@/features/home/components/TopicCard/TopicCard";
import HowItWorks from "@/features/home/components/HowItWorks/HowItWorks";
import CtaBand from "@/features/home/components/CtaBand/CtaBand";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import { PRACTICE_CARDS, TOPICS, HOME_PRACTICE_LIMIT, HOME_TOPICS_LIMIT } from "@/features/home/data/home.data";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="container">
      <HeroCarousel />
      <StatsStrip />

      <section className={styles.section} id="practice">
        <SectionHeading eyebrow="Hands-on practice" title="Practise the rounds that decide the interview" />
        <div className={styles.bento}>
          {PRACTICE_CARDS.slice(0, HOME_PRACTICE_LIMIT).map((c) => <PracticeCard key={c.id} card={c} />)}
        </div>
        <div className={styles.more}><Link to="/practice" className={styles.moreBtn}>View all practice tracks <Icon name="arrow" size={14} /></Link></div>
      </section>

      <section className={styles.section} id="topics">
        <SectionHeading eyebrow="Interview prep" title="Master every frontend topic" />
        <div className={styles.topicGrid}>
          {TOPICS.slice(0, HOME_TOPICS_LIMIT).map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
        <div className={styles.more}><Link to="/topics" className={styles.moreBtn}>View all topics <Icon name="arrow" size={14} /></Link></div>
      </section>

      <section className={styles.section}>
        <SectionHeading eyebrow="How it works" title="From first question to final round" />
        <HowItWorks />
      </section>

      <CtaBand />
    </div>
  );
}
