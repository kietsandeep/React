import styles from "./PageBanner.module.css";

// Shared gradient banner used at the top of hub/list pages. `children` renders on the right (search, stats…).
export default function PageBanner({ eyebrow, title, subtitle, children }) {
  return (
    <section className={styles.banner}>
      <div className={styles.text}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className={styles.side}>{children}</div>}
    </section>
  );
}
