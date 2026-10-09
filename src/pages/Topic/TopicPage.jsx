import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getTopic } from "@/features/topics/services/topicService";
import { searchQuestions } from "@/features/topics/utils/search";
import { useProgress } from "@/features/topics/hooks/useProgress";
import ModuleSidebar from "@/features/topics/components/ModuleSidebar/ModuleSidebar";
import SearchBox from "@/features/topics/components/SearchBox/SearchBox";
import QuestionItem from "@/features/topics/components/QuestionItem/QuestionItem";
import styles from "./TopicPage.module.css";

export default function TopicPage() {
  const { slug } = useParams();
  const topic = getTopic(slug);
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());
  const { done, toggle } = useProgress(slug);

  const modules = useMemo(() => topic?.modules ?? [], [topic]);
  const activeSlug = params.get("module") ?? modules[0]?.slug;
  const activeModule = modules.find((m) => m.slug === activeSlug) ?? modules[0];
  const searching = query.trim().length > 0;

  const results = useMemo(() => (searching ? searchQuestions(modules, query) : []), [modules, query, searching]);
  const visible = searching ? results : activeModule?.questions ?? [];

  useEffect(() => { setOpenIds(new Set()); }, [activeSlug, searching, slug]);
  useEffect(() => {
    document.title = topic ? `${topic.topic.title} | InterviewDepth` : "InterviewDepth";
  }, [topic]);

  const toggleOpen = (id) =>
    setOpenIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  if (!topic) {
    return (
      <div className="container" style={{ padding: "96px 20px", textAlign: "center" }}>
        <h1>Coming soon</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 20px" }}>Questions for “{slug}” aren't available yet.</p>
        <Link to="/" style={{ color: "var(--brand)", fontWeight: 700 }}>Back to home</Link>
      </div>
    );
  }

  const total = modules.reduce((n, m) => n + m.questions.length, 0);

  return (
    <div className="container">
      <div className={styles.head}>
        <div>
          <h1>{topic.topic.title}</h1>
          <p>{done.size} of {total} questions completed</p>
        </div>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      <div className={styles.layout}>
        <ModuleSidebar modules={modules} activeSlug={searching ? null : activeModule?.slug} doneIds={done}
          onSelect={(s) => { setQuery(""); setParams({ module: s }); }} />

        <section className={styles.panel} aria-live="polite">
          {searching ? (
            <h2>{results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”</h2>
          ) : (
            <>
              <h2>{activeModule.heading}</h2>
              <p className={styles.intro}>{activeModule.introduction}</p>
            </>
          )}

          {visible.length === 0 ? (
            <p className={styles.empty}>No questions match. Try a different keyword.</p>
          ) : (
            <ul className={styles.list}>
              {visible.map((q) => (
                <QuestionItem key={q.id} item={q} open={openIds.has(q.id)} onToggle={() => toggleOpen(q.id)}
                  done={done.has(q.id)} onToggleDone={() => toggle(q.id)} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
