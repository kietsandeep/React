// How many cards the home page shows before "View all". Everything is listed on /practice and /topics.
export const HOME_PRACTICE_LIMIT = 3;
export const HOME_TOPICS_LIMIT = 6;

export const SLIDES = [
  {
    id: "coding-round", eyebrow: "Practice coding round",
    title: "Build it live. Pass the tests. Own the round.",
    text: "Real React machine-coding questions in a live editor with instant preview and automated checks — exactly how product companies run the round.",
    cta: { label: "Start machine coding", to: "/practice/machine-coding" }, alt: { label: "Try DSA", to: "/practice/dsa" },
    visual: "code",
  },
  {
    id: "interview-prep", eyebrow: "Interview preps",
    title: "Every frontend topic, answered in depth.",
    text: "200+ React questions plus JavaScript, CSS, HTML, Angular and Vue — with code snippets, diagrams and the follow-ups interviewers actually ask.",
    cta: { label: "Browse React questions", to: "/topics/react" }, alt: { label: "See all topics", to: "/#topics" },
    visual: "topics",
  },
  {
    id: "dsa", eyebrow: "DSA & logic rounds",
    title: "130 problems, from warm-up to whiteboard.",
    text: "Beginner to advanced algorithm questions tagged by company. Write the function, hit Run, and see every test case pass or fail.",
    cta: { label: "Solve DSA questions", to: "/practice/dsa" }, alt: { label: "Machine coding", to: "/practice/machine-coding" },
    visual: "tests",
  },
  {
    id: "progress", eyebrow: "Track your progress",
    title: "Know exactly how interview-ready you are.",
    text: "Solved questions are saved as you go, so you always see what is done, what is pending, and what to tackle next before the big day.",
    cta: { label: "Pick up where you left off", to: "/practice/dsa" }, alt: { label: "Browse topics", to: "/#topics" },
    visual: "progress",
  },
];

export const STATS = [
  { value: "200+", label: "React questions" },
  { value: "65", label: "Machine coding tasks" },
  { value: "130", label: "DSA problems" },
  { value: "7", label: "Frontend tracks" },
];

export const PRACTICE_CARDS = [
  {
    id: "machine-coding", variant: "wide", icon: "laptop", count: "65+", unit: "UI challenges",
    title: "React Machine Coding",
    description: "Build star ratings, tabs, autocompletes and more in a live editor — then run the checks.",
    tags: ["Live preview", "Auto tests", "Solutions"],
    to: "/practice/machine-coding",
  },
  {
    id: "dsa", variant: "tall", icon: "code", count: "130", unit: "problems",
    title: "DSA Questions",
    description: "JavaScript logic problems from beginner to advanced, checked against test cases.",
    tags: ["Beginner → Advanced", "Timed", "Company tags"],
    to: "/practice/dsa",
  },
  {
    id: "output", variant: "wide", icon: "terminal", count: "35", unit: "output questions",
    title: "JavaScript Output",
    description: "Predict what the code prints — hoisting, closures, coercion and the event loop — then run it to check.",
    tags: ["Predict & run", "Event loop", "Solutions"],
    to: "/practice/output",
  },
];

export const STEPS = [
  { n: "01", icon: "flag", title: "Pick a track", text: "Choose a topic, a coding round or a DSA set that matches the role you want." },
  { n: "02", icon: "code", title: "Practise for real", text: "Write code in the editor, run test cases and learn from the built-in solutions." },
  { n: "03", icon: "checkCircle", title: "Walk in ready", text: "Track what you have solved and revisit weak spots until the answers are second nature." },
];

export const TOPICS = [
  { slug: "react", logo: "react", accent: "#38bdf8", count: "200+", title: "React JS Interview Questions",
    description: "Hooks, virtual DOM, state management, performance optimisation, and architecture patterns asked at top product companies." },
  { slug: "javascript", logo: "js", accent: "#facc15", count: "95+", title: "JavaScript Interview Questions",
    description: "Closures, prototypes, async/await, event loop, and the tricky parts of the language that interviewers love to probe." },
  { slug: "js-output", logo: "js", accent: "#fb923c", count: "60+", title: "JS Output Questions",
    description: "Read the snippet, predict the output. Tests your mental model of hoisting, scope, coercion, and the event loop." },
  { slug: "angular", logo: "angular", accent: "#f43f5e", count: "200+", title: "Angular Interview Questions",
    description: "Dependency injection, RxJS, change detection, modules, routing, and the Angular ecosystem from the ground up." },
  { slug: "vue", logo: "vue", accent: "#34d399", count: "200+", title: "Vue JS Interview Questions",
    description: "Composition API, reactivity system, Vuex / Pinia, directives, lifecycle hooks, and Vue 3 patterns." },
  { slug: "html", logo: "html", accent: "#f97316", count: "45+", title: "HTML Interview Questions",
    description: "Semantic markup, accessibility, SEO meta, web standards, forms, and modern browser APIs that matter in real projects." },
  { slug: "css", logo: "css", accent: "#6366f1", count: "50+", title: "CSS Interview Questions",
    description: "Flexbox, Grid, responsive design, specificity, animations, custom properties, and the questions that trip up even seniors." },
];

export const COMPANIES = [
  { name: "TCS", color: "#0f172a" },
  { name: "Cognizant", color: "#2563eb" },
  { name: "Accenture", color: "#7c3aed" },
  { name: "Amazon", color: "#f59e0b" },
  { name: "Capgemini", color: "#0ea5e9" },
  { name: "Infosys", color: "#0284c7" },
  { name: "Wipro", color: "#16a34a" },
];
