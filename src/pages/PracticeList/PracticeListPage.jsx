import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/constants/site";
import { Link, useParams } from "react-router-dom";
import { getPracticeSet } from "@/features/practice/services/practiceService";
import { DEFAULT_FILTERS, filterQuestions, countByDifficulty, uniqueCompanies } from "@/features/practice/utils/filters";
import { useProgress } from "@/features/topics/hooks/useProgress";
import PracticeHero from "@/features/practice/components/PracticeHero/PracticeHero";
import PracticeFilters from "@/features/practice/components/PracticeFilters/PracticeFilters";
import ProgressCard from "@/features/practice/components/ProgressCard/ProgressCard";
import MockAssessmentCard from "@/features/practice/components/MockAssessmentCard/MockAssessmentCard";
import QuestionCard from "@/features/practice/components/QuestionCard/QuestionCard";
import { getLabels } from "@/features/practice/utils/labels";
import styles from "./PracticeListPage.module.css";

export default function PracticeListPage() {
  const { slug } = useParams();
  const data = getPracticeSet(slug);
  const { done } = useProgress(`practice-${slug}`);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const labels = useMemo(() => getLabels(data?.set), [data]);
  const questions = useMemo(() => data?.questions ?? [], [data]);
  const stats = useMemo(() => countByDifficulty(questions), [questions]);
  const companies = useMemo(() => uniqueCompanies(questions), [questions]);
  const visible = useMemo(() => filterQuestions(questions, filters, done), [questions, filters, done]);
  const doneCount = useMemo(() => questions.filter((q) => done.has(q.id)).length, [questions, done]);

  useEffect(() => { setFilters(DEFAULT_FILTERS); }, [slug]);
  useEffect(() => {
    document.title = data ? `${data.set.title} | ${SITE.name}` : SITE.name;
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
        <PracticeFilters filters={filters} onChange={setFilters} companies={companies} placeholder={data.set.searchPlaceholder} labels={labels} />
        <div className={`${styles.summary} ${data.set.mockAssessment ? "" : styles.single}`}>
          <ProgressCard done={doneCount} total={questions.length} doneWord={labels.progressDone} />
          {data.set.mockAssessment && <MockAssessmentCard slug={slug} config={data.set.mockAssessment} done={doneCount} prefix={labels.mockPrefix} />}
        </div>

        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p>No questions match your filters.</p>
            <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear filters</button>
          </div>
        ) : (
          <div className={styles.grid} aria-live="polite">
            {visible.map((q) => <QuestionCard key={q.id} question={q} setSlug={slug} done={done.has(q.id)} levels={labels.levels} />)}
          </div>
        )}
      </div>
    </>
  );
}
