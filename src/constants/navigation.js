export const NAV_ITEMS = [
  { label: "Interview Q&A", to: "/topics" },
  {
    label: "Practice",
    children: [
      { label: "All practice", to: "/practice" },
      { label: "React Machine Coding", to: "/practice/machine-coding" },
      { label: "DSA Questions", to: "/practice/dsa" },
      { label: "JavaScript Output", to: "/practice/output" },
    ],
  },
  { label: "Trainings", to: "/trainings" },
  { label: "Leaderboard", to: "/leaderboard" },
];
