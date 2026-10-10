import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import { SLIDES } from "../../data/home.data";
import styles from "./HeroCarousel.module.css";

const AUTOPLAY_MS = 6000;

function Visual({ type }) {
  if (type === "code") {
    return (
      <div className={styles.window}>
        <div className={styles.winHead}><i /><i /><i /><span>StarRating.js</span></div>
        <pre className={styles.code}>{`const StarRating = ({ max = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return stars.map((n) => (
    <Star filled={n <= (hover || rating)} />
  ));
};`}</pre>
        <div className={styles.badgeRow}><span className={styles.ok}>✓ Renders 5 stars</span><span className={styles.ok}>✓ Hover preview</span></div>
      </div>
    );
  }
  if (type === "topics") {
    const chips = ["React", "JavaScript", "CSS", "HTML", "Angular", "Vue", "Closures", "Hooks", "Event loop"];
    return (
      <div className={styles.chipCloud}>
        {chips.map((c, i) => <span key={c} className={styles.chip} style={{ "--i": i }}>{c}</span>)}
        <div className={styles.bigStat}><b>200+</b><small>React questions answered</small></div>
      </div>
    );
  }
  if (type === "tests") {
    return (
      <div className={styles.window}>
        <div className={styles.winHead}><i /><i /><i /><span>Test Results</span><em>4/4 passed</em></div>
        <ul className={styles.tests}>
          {["Sorted simple", "No duplicates", "All the same", "Empty array"].map((t) => (
            <li key={t}><Icon name="check" size={14} /> {t} <span>Passed</span></li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.progress}>
      {[["React", 82], ["DSA", 56], ["Machine coding", 34]].map(([n, v]) => (
        <div key={n}><span>{n}<b>{v}%</b></span><i><u style={{ width: `${v}%` }} /></i></div>
      ))}
    </div>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const go = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || reduced.current) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label="Highlights"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(index - 1); if (e.key === "ArrowRight") go(index + 1); }}>
      <div className={styles.glow} aria-hidden="true" />
      {SLIDES.map((s, i) => (
        <article key={s.id} className={`${styles.slide} ${i === index ? styles.active : ""}`}
          role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`} aria-hidden={i !== index}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>{s.eyebrow}</span>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <div className={styles.actions}>
              <Link to={s.cta.to} className={styles.primary} tabIndex={i === index ? 0 : -1}>{s.cta.label} <Icon name="arrow" size={14} /></Link>
              <Link to={s.alt.to} className={styles.ghost} tabIndex={i === index ? 0 : -1}>{s.alt.label}</Link>
            </div>
          </div>
          <div className={styles.visual} aria-hidden="true"><Visual type={s.visual} /></div>
        </article>
      ))}

      <div className={styles.controls}>
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide"><Icon name="chevronLeft" size={18} /></button>
        <div className={styles.dots} role="tablist" aria-label="Choose slide">
          {SLIDES.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={i === index} aria-label={s.eyebrow}
              className={i === index ? styles.dotOn : ""} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next slide"><Icon name="chevronRight" size={18} /></button>
      </div>
    </section>
  );
}
