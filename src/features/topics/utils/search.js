const blockText = (b) =>
  b.type === "list" ? b.items.join(" ") : b.type === "image" ? `${b.alt ?? ""} ${b.caption ?? ""}` : b.value ?? "";

export const questionText = (q) =>
  [q.q, ...(q.tags ?? []), ...(q.description ?? []).map(blockText), ...q.answer.map(blockText)]
    .join(" ")
    .toLowerCase();

// Returns [{ ...question, moduleHeading, moduleSlug }] across all modules.
export function searchQuestions(modules, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return modules.flatMap((m) =>
    m.questions
      .filter((q) => {
        const text = questionText(q);
        return terms.every((t) => text.includes(t));
      })
      .map((q) => ({ ...q, moduleHeading: m.heading, moduleSlug: m.slug }))
  );
}
