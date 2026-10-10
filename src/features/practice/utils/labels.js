// Per-set wording. A set JSON may override any of these via set.labels; machine-coding uses the defaults.
export const DEFAULT_LABELS = {
  icon: "laptop",
  total: "Questions",
  levels: { easy: "Easy", medium: "Medium", hard: "Hard" },
  progressDone: "completed",
  mockPrefix: "Complete",
};

export const getLabels = (set) => ({
  ...DEFAULT_LABELS,
  ...(set?.labels ?? {}),
  levels: { ...DEFAULT_LABELS.levels, ...(set?.labels?.levels ?? {}) },
});
