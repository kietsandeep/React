import { Link } from "react-router-dom";
import { SITE } from "@/constants/site";
import styles from "./Footer.module.css";

const COLUMNS = [
  { title: "Practice", links: [["All practice", "/practice"], ["React Machine Coding", "/practice/machine-coding"], ["DSA Questions", "/practice/dsa"], ["JavaScript Output", "/practice/output"], ["Trainings", "/trainings"], ["Leaderboard", "/leaderboard"]] },
  { title: "Interview Q&A", links: [["All topics", "/topics"], ["React", "/topics/react"], ["JavaScript", "/topics/javascript"], ["CSS", "/topics/css"], ["HTML", "/topics/html"], ["Angular", "/topics/angular"], ["Vue", "/topics/vue"]] },
  { title: "Company", links: [["About us", "/about"], ["Contact", "/contact"], ["Privacy policy", "/privacy"], ["Terms of use", "/terms"]] },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}><span>{SITE.short}</span>{SITE.name}</Link>
          <p>{SITE.tagline} Practise real coding rounds and deep-dive interview questions, all in one place.</p>
          <a href={`mailto:${SITE.email}`} className={styles.mail}>{SITE.email}</a>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h4>{c.title}</h4>
            <ul>{c.links.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Built for frontend developers, by frontend developers.</span>
        </div>
      </div>
    </footer>
  );
}
