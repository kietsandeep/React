import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import Icon from "@/components/common/Icon/Icon";
import { CARD_COMPONENTS } from "@/features/home/components/CollectionSection/CollectionSection";
import TopicCard from "@/features/home/components/TopicCard/TopicCard";
import { getCollection } from "@/config/registry";
import { SITE } from "@/constants/site";
import styles from "./CollectionHubPage.module.css";

// One page for every collection (/practice, /topics, /quick-prep …). Driven entirely by config/collections/<id>.json.
export default function CollectionHubPage({ id }) {
  const collection = useMemo(() => getCollection(id), [id]);
  const [query, setQuery] = useState("");
  const { meta, items } = collection;

  useEffect(() => { document.title = `${meta.title} | ${SITE.name}`; }, [meta.title]);
  useEffect(() => { setQuery(""); }, [id]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.title} ${i.description}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const Card = CARD_COMPONENTS[meta.card] ?? TopicCard;
  const bento = meta.card === "practice";

  return (
    <div className="container">
      <PageBanner eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle}>
        {meta.searchable && (
          <label className={styles.search}>
            <Icon name="search" size={18} />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={meta.searchPlaceholder ?? "Search…"} aria-label={meta.searchPlaceholder ?? "Search"} />
          </label>
        )}
      </PageBanner>

      {shown.length === 0 ? (
        <p className={styles.empty}>Nothing matches “{query}”.</p>
      ) : (
        <div className={`${styles.grid} ${bento ? styles.bento : ""}`}>
          {shown.map((item) => <Card key={item.slug} item={item} />)}
          {meta.soon && !query && (
            <div className={styles.soon}>
              <b>{meta.soon.title}</b>
              <p>{meta.soon.text}</p>
              {meta.soon.link && <Link to={meta.soon.link.to}>{meta.soon.link.label}</Link>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
