import { Link } from "react-router-dom";
import CompanyMarquee from "../CompanyMarquee/CompanyMarquee";
import styles from "./CtaBand.module.css";

export default function CtaBand({ cta, companies }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.band}>
        <div>
          <h2>{cta.title}</h2>
          <p>{cta.text}</p>
        </div>
        <Link to={cta.button.to} className={styles.btn}>{cta.button.label}</Link>
      </div>
      {companies?.length > 0 && <p className={styles.caption}>{cta.caption}</p>}
      <CompanyMarquee companies={companies} />
    </section>
  );
}
