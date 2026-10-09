import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import PracticeCard from "@/features/home/components/PracticeCard/PracticeCard";
import TopicCard from "@/features/home/components/TopicCard/TopicCard";
import MissionSection from "@/features/home/components/MissionSection/MissionSection";
import { PRACTICE_CARDS, TOPICS } from "@/features/home/data/home.data";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className="container">
      <section className={styles.section}>
        <SectionHeading eyebrow="Hands-on preparation" title="Practice the rounds that decide the interview" />
        <div className={styles.practiceGrid}>
          {PRACTICE_CARDS.map((c) => <PracticeCard key={c.id} card={c} />)}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading eyebrow="Interview knowledge" title="Master every frontend topic" />
        <div className={styles.topicGrid}>
          {TOPICS.map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
      </section>

      <MissionSection />
    </div>
  );
}
