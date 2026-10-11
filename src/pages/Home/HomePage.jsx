import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import Icon from "@/components/common/Icon/Icon";
import HeroCarousel from "@/features/home/components/HeroCarousel/HeroCarousel";
import StatsStrip from "@/features/home/components/StatsStrip/StatsStrip";
import CollectionGrid from "@/features/home/components/CollectionSection/CollectionSection";
import HowItWorks from "@/features/home/components/HowItWorks/HowItWorks";
import CtaBand from "@/features/home/components/CtaBand/CtaBand";
import { getCollection, getHome } from "@/config/registry";
import styles from "./HomePage.module.css";

// The page is just a list of sections from config/home.json. Reorder, add or remove them there.
// New section type? Add a renderer below and use its name as "type" in the JSON.
const SECTIONS = {
  hero: ({ home }) => <HeroCarousel slides={home.slides} />,
  stats: ({ home }) => <StatsStrip stats={home.stats} />,
  cards: ({ section }) => {
    const col = getCollection(section.collection);
    if (!col || col.items.length === 0) return null;
    const m = col.meta;
    return (
      <section className={styles.section} id={section.id ?? m.id}>
        <SectionHeading eyebrow={section.eyebrow ?? m.eyebrow} title={section.title ?? m.title} />
        <CollectionGrid collection={col} limit={section.limit} columns={section.columns} />
        <div className={styles.more}>
          <Link to={m.hubPath} className={styles.moreBtn}>{m.viewAllLabel} <Icon name="arrow" size={14} /></Link>
        </div>
      </section>
    );
  },
  steps: ({ home, section }) => (
    <section className={styles.section}>
      <SectionHeading eyebrow={section.eyebrow} title={section.title} />
      <HowItWorks steps={home.steps} />
    </section>
  ),
  cta: ({ home }) => <CtaBand cta={home.cta} companies={home.companies} />,
};

export default function HomePage() {
  const { hash } = useLocation();
  const home = useMemo(getHome, []);
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="container">
      {home.sections.map((section, i) => {
        const Render = SECTIONS[section.type];
        return Render ? <Render key={`${section.type}-${section.id ?? i}`} home={home} section={section} /> : null;
      })}
    </div>
  );
}
