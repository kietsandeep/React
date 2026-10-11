import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import Icon from "@/components/common/Icon/Icon";
import QuestionItem from "@/features/topics/components/QuestionItem/QuestionItem";
import { getQuickSet } from "@/features/quick/services/quickService";
import { useProgress } from "@/features/topics/hooks/useProgress";
import { getCollection } from "@/config/registry";
import { SITE } from "@/constants/site";
import styles from "./QuickPrepPage.module.css";

const TABS = [
  { id: "all", label: "All" },
  { id: "must", label: "Must know" },
  { id: "good", label: "Good to know" },
];

const textOf = (blocks = []) => blocks.map((b) => (typeof b.value === "string" ? b.value : typeof b.code === "string" ? b.code : (b.items ?? []).join(" "))).join(" ");

// List page for one technology's important questions: /quick-prep/:slug  (data: features/quick/data/<slug>.json)
export default function QuickPrepPage() {
  const { slug } = useParams();
  const set = getQuickSet(slug);
  const meta = getCollection("quick")?.items.find((i) => i.slug === slug);
  const { done, toggle } = useProgress(`quick-${slug}`);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const [openIds, setOpenIds] = useState(() => new Set());

  useEffect(() => { document.title = `${set?.topic.title ?? "Quick revision"} | ${SITE.name}`; }, [set]);
  useEffect(() => { setOpenIds(new Set()); }, [slug, tab]);

  const questions = useMemo(() => set?.questions ?? [], [set]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return questions.filter((x) =>
      (tab === "all" || x.priority === tab) &&
      (!hideDone || !done.has(x.id)) &&
      (!q || `${x.q} ${textOf(x.answer)}`.toLowerCase().includes(q)));
  }, [questions, tab, query, hideDone, done]);

  if (!set) {
    return (
      <div className="container" style={{ padding: "96px 20px", textAlign: "center" }}>
        <h1>Coming soon</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 20px" }}>Quick revision for “{slug}” isn't available yet.</p>
        <Link to="/quick-prep" style={{ color: "var(--brand)", fontWeight: 700 }}>Back to quick revision</Link>
      </div>
    );
  }

  const total = questions.length;
  const doneCount = questions.filter((q) => done.has(q.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const mustCount = questions.filter((q) => q.priority === "must").length;
  const toggleOpen = (id) => setOpenIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const accent = meta?.accent ?? "var(--brand)";

  return (
    <div className="container">
      <PageBanner eyebrow="Quick revision" title={set.topic.title} subtitle={set.topic.subtitle}>
        <div className={styles.stats}>
          <div><b>{total}</b><span>questions</span></div>
          <div><b>{mustCount}</b><span>must know</span></div>
          <div><b>~{Math.max(5, Math.round(total * 0.6))}m</b><span>to revise</span></div>
        </div>
      </PageBanner>

      <div className={styles.progress} style={{ "--accent-c": accent }}>
        <span>{doneCount} of {total} revised</span>
        <i><u style={{ width: `${pct}%` }} /></i>
        <b>{pct}%</b>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Priority">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id}
              className={tab === t.id ? styles.tabOn : ""} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <label className={styles.search}>
          <Icon name="search" size={16} />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions…" aria-label="Search questions" />
        </label>
        <label className={styles.hide}>
          <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> Hide revised
        </label>
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>{hideDone && !query ? "All caught up — nice work!" : "No questions match."}</p>
      ) : (
        <ul className={styles.list}>
          {visible.map((q) => (
            <QuestionItem key={q.id} item={q} open={openIds.has(q.id)} onToggle={() => toggleOpen(q.id)}
              done={done.has(q.id)} onToggleDone={() => toggle(q.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}
