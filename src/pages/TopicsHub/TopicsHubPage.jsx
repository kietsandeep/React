import { useEffect, useMemo, useState } from "react";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import Icon from "@/components/common/Icon/Icon";
import TopicCard from "@/features/home/components/TopicCard/TopicCard";
import { TOPICS } from "@/features/home/data/home.data";
import { SITE } from "@/constants/site";
import styles from "./TopicsHubPage.module.css";

// Lists every interview topic. To add one: append an entry to TOPICS (home.data.js) and add its JSON under features/topics/data.
export default function TopicsHubPage() {
  const [query, setQuery] = useState("");
  useEffect(() => { document.title = `Interview topics | ${SITE.name}`; }, []);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? TOPICS.filter((t) => `${t.title} ${t.description}`.toLowerCase().includes(q)) : TOPICS;
  }, [query]);

  return (
    <div className="container">
      <PageBanner eyebrow="Interview prep" title="Master every frontend topic"
        subtitle="Deep-dive questions and answers with code, diagrams and the follow-ups interviewers actually ask.">
        <label className={styles.search}>
          <Icon name="search" size={18} />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics…" aria-label="Search topics" />
        </label>
      </PageBanner>
      {shown.length === 0 ? (
        <p className={styles.empty}>No topics match “{query}”.</p>
      ) : (
        <div className={styles.grid}>{shown.map((t) => <TopicCard key={t.slug} topic={t} />)}</div>
      )}
    </div>
  );
}
