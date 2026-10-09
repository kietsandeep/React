import CompanyMarquee from "../CompanyMarquee/CompanyMarquee";
import styles from "./MissionSection.module.css";

export default function MissionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.divider}><span /></div>
      <p className={styles.text}>
        At InterviewDepth, our mission is to help you improve yourself and land your dream job.
        We have a sizable repository of interview resources for many companies. In the past few
        years, our users have landed jobs at top companies around the world.
      </p>
      <CompanyMarquee />
    </section>
  );
}
