import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPracticeSet } from "@/features/practice/services/practiceService";
import { DEFAULT_FILTERS, filterQuestions, countByDifficulty, uniqueCompanies } from "@/features/practice/utils/filters";
import { useProgress } from "@/features/topics/hooks/useProgress";
import PracticeHero from "@/features/practice/components/PracticeHero/PracticeHero";
import PracticeFilters from "@/features/practice/components/PracticeFilters/PracticeFilters";
import ProgressCard from "@/features/practice/components/ProgressCard/ProgressCard";
import MockAssessmentCard from "@/features/practice/components/MockAssessmentCard/MockAssessmentCard";
import QuestionCard from "@/features/practice/components/QuestionCard/QuestionCard";
import styles from "./PracticeListPage.module.css";

export default function PracticeListPage() {
  const { slug } = useParams();
  const data = getPracticeSet(slug);
  const { done } = useProgress(`practice-${slug}`);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const questions = useMemo(() => data?.questions ?? [], [data]);
  const stats = useMemo(() => countByDifficulty(questions), [questions]);
  const companies = useMemo(() => uniqueCompanies(questions), [questions]);
  const visible = useMemo(() => filterQuestions(questions, filters, done), [questions, filters, done]);
  const doneCount = useMemo(() => questions.filter((q) => done.has(q.id)).length, [questions, done]);

  useEffect(() => { setFilters(DEFAULT_FILTERS); }, [slug]);
  useEffect(() => {
    document.title = data ? `${data.set.title} | InterviewDepth` : "InterviewDepth";
  }, [data]);

  if (!data) {
    return (
      <div className="container" style={{ padding: "96px 20px", textAlign: "center" }}>
        <h1>Coming soon</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 20px" }}>Practice questions for “{slug}” aren't available yet.</p>
        <Link to="/" style={{ color: "var(--brand)", fontWeight: 700 }}>Back to home</Link>
      </div>
    );
  }

  return (
    <>
      <PracticeHero set={data.set} stats={stats} />
      <div className="container">
        <PracticeFilters filters={filters} onChange={setFilters} companies={companies} placeholder={data.set.searchPlaceholder} />
        <ProgressCard done={doneCount} total={questions.length} />
        <MockAssessmentCard slug={slug} config={data.set.mockAssessment} done={doneCount} />

        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p>No questions match your filters.</p>
            <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear filters</button>
          </div>
        ) : (
          <div className={styles.grid} aria-live="polite">
            {visible.map((q) => <QuestionCard key={q.id} question={q} setSlug={slug} done={done.has(q.id)} />)}
          </div>
        )}
      </div>
    </>
  );
}
