import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import PracticeCard from "@/features/home/components/PracticeCard/PracticeCard";
import { PRACTICE_CARDS } from "@/features/home/data/home.data";
import { SITE } from "@/constants/site";
import styles from "./PracticeHubPage.module.css";

// Lists every practice track. To add one: append an entry to PRACTICE_CARDS (home.data.js) — it appears here automatically.
export default function PracticeHubPage() {
  useEffect(() => { document.title = `Practice | ${SITE.name}`; }, []);
  return (
    <div className="container">
      <PageBanner eyebrow="Hands-on practice" title="Practise the rounds that decide the interview"
        subtitle="Pick a track, open a question and solve it in a live coding workspace. More tracks are added regularly." />
      <div className={styles.grid}>
        {PRACTICE_CARDS.map((c, i) => <PracticeCard key={c.id} card={{ ...c, variant: i % 2 === 0 ? "wide" : "tall" }} />)}
        <div className={styles.soon}>
          <b>More tracks coming soon</b>
          <p>System design, mock assessments, CSS challenges and more.</p>
          <Link to="/topics">Meanwhile, browse interview topics</Link>
        </div>
      </div>
    </div>
  );
}
