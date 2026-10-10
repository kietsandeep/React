export const DEFAULT_FILTERS = { query: "", level: "all", company: "all", status: "all" };

export function filterQuestions(questions, filters, doneIds) {
  const q = filters.query.trim().toLowerCase();
  return questions.filter(
    (item) =>
      (filters.level === "all" || item.difficulty === filters.level) &&
      (filters.company === "all" || item.company === filters.company) &&
      (filters.status === "all" || (filters.status === "done") === doneIds.has(item.id)) &&
      (!q || `${item.title} ${item.description} ${item.company} ${item.category ?? ""} ${item.code ?? ""}`.toLowerCase().includes(q))
  );
}

export const countByDifficulty = (questions) => ({
  total: questions.length,
  easy: questions.filter((q) => q.difficulty === "easy").length,
  medium: questions.filter((q) => q.difficulty === "medium").length,
  hard: questions.filter((q) => q.difficulty === "hard").length,
});

export const uniqueCompanies = (questions) => [...new Set(questions.map((q) => q.company))].sort();
