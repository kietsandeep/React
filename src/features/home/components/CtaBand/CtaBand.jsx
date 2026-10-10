import { Link } from "react-router-dom";
import { SITE } from "@/constants/site";
import CompanyMarquee from "../CompanyMarquee/CompanyMarquee";
import styles from "./CtaBand.module.css";

export default function CtaBand() {
  return (
    <section className={styles.wrap}>
      <div className={styles.band}>
        <div>
          <h2>Ready to crack your next frontend interview?</h2>
          <p>{SITE.name} helps you practise the exact rounds companies run — from coding challenges to deep-dive Q&amp;A.</p>
        </div>
        <Link to="/practice/machine-coding" className={styles.btn}>Start free practice</Link>
      </div>
      <p className={styles.caption}>Our learners have gone on to teams at</p>
      <CompanyMarquee />
    </section>
  );
}
