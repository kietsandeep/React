import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SITE } from "@/constants/site";
import { getFooter } from "@/config/registry";
import styles from "./Footer.module.css";


export default function Footer() {
  const footer = useMemo(getFooter, []);
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`} style={{ "--cols": footer.columns.length }}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}><span>{SITE.short}</span>{SITE.name}</Link>
          <p>{SITE.tagline} {footer.blurb}</p>
          <a href={`mailto:${SITE.email}`} className={styles.mail}>{SITE.email}</a>
        </div>
        {footer.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h4>{c.title}</h4>
            <ul>{c.links.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>{footer.bottom.left}</span>
          <span>{footer.bottom.right}</span>
        </div>
      </div>
    </footer>
  );
}
