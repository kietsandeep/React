// node scripts/build-problems.mjs  ->  src/features/workspace/data/machine-coding/<id>.json
// Add a new problem = add an entry to PROBLEMS below (or hand-write the JSON), then run this script.
import fs from "node:fs";

const OUT = "src/features/workspace/data/machine-coding";
const APP = "const App = () => <Practice />;\n";
const INTRO = "Add these `data-testid` attributes to the matching elements in your solution so the **Submit** checks can verify it:";

// --- tiny helpers to keep test definitions readable ---
const click = (testid, index) => ({ act: "click", testid, ...(index !== undefined && { index }) });
const hover = (testid, index) => ({ act: "hover", testid, index });
const unhover = (testid, index) => ({ act: "unhover", testid, index });
const type = (testid, value) => ({ act: "type", testid, value });
const count = (testid, equals) => ({ expect: "count", testid, equals });
const text = (testid, equals, index) => ({ expect: "text", testid, equals, ...(index !== undefined && { index }) });
const has = (testid, contains, index) => ({ expect: "text", testid, contains, ...(index !== undefined && { index }) });
const value = (testid, equals) => ({ expect: "value", testid, equals });
const attr = (testid, name, equals) => ({ expect: "attr", testid, name, equals });
const cls = (testid, c, index, equals = true) => ({ expect: "hasClass", testid, class: c, index, equals });

const PROBLEMS = {
  "mc-001": {
    thingsToDo: [
      "Render N stars (default 5) driven by a `max` prop.",
      "Clicking a star sets the rating; the filled stars reflect it.",
      "Hovering previews the rating; leaving restores the selected value.",
      "Show the numeric value (e.g. 3/5) next to the stars.",
    ],
    testIds: [
      { id: "star", description: "each individual star (all 5)" },
      { id: "rating-value", description: "the numeric rating label (e.g. 3/5)" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const StarRating = ({ max = 5 }) => {
  // TODO: track rating + hover, render stars, show value
  return <div className="rating">★★★★★</div>;
};

const Practice = () => <StarRating max={5} />;
`,
      "styles.css": `.rating { display: flex; align-items: center; gap: 4px; font-size: 32px; user-select: none; }
.star { cursor: pointer; color: #cbd5e1; transition: color .1s; }
.star.filled { color: #f59e0b; }
.rating-value { margin-left: 12px; font-size: 16px; color: #475569; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const StarRating = ({ max = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const active = hover || rating;

  return (
    <div className="rating">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          data-testid="star"
          className={n <= active ? "star filled" : "star"}
          onClick={() => setRating(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
      <span className="rating-value" data-testid="rating-value">{rating}/{max}</span>
    </div>
  );
};

const Practice = () => <StarRating max={5} />;
`,
    },
    tests: [
      { name: "Renders 5 stars by default", steps: [count("star", 5)] },
      { name: "Shows 0/5 before anything is selected", steps: [text("rating-value", "0/5")] },
      { name: "Clicking the 4th star sets the rating to 4/5", steps: [click("star", 3), text("rating-value", "4/5")] },
      { name: "Clicking another star updates the rating", steps: [click("star", 1), text("rating-value", "2/5")] },
      { name: "Hovering and leaving keeps the selected value", steps: [hover("star", 4), unhover("star", 4), text("rating-value", "2/5")] },
    ],
  },

  "mc-002": {
    thingsToDo: [
      "Render a header for every item in the provided `items` array.",
      "Clicking a header opens its answer panel.",
      "Only one panel can be open at a time.",
      "Clicking the open header closes it again.",
    ],
    testIds: [
      { id: "accordion-header", description: "each question header (all 3)" },
      { id: "accordion-panel", description: "the answer panel — render it only for the open item" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const items = [
  { q: "What is React?", a: "A JavaScript library for building user interfaces." },
  { q: "What is JSX?", a: "A syntax extension that lets you write markup inside JavaScript." },
  { q: "What is a Hook?", a: "A function that lets components use state and other React features." },
];

const Accordion = ({ items }) => {
  // TODO: track the open index, render headers + the open panel
  return (
    <div className="accordion">
      {items.map((item) => (
        <div key={item.q}>{item.q}</div>
      ))}
    </div>
  );
};

const Practice = () => <Accordion items={items} />;
`,
      "styles.css": `.accordion { max-width: 420px; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
.accordion-header { width: 100%; display: flex; justify-content: space-between; padding: 14px 16px; border: 0; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font: inherit; font-weight: 600; cursor: pointer; }
.accordion-panel { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; color: #475569; line-height: 1.6; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const items = [
  { q: "What is React?", a: "A JavaScript library for building user interfaces." },
  { q: "What is JSX?", a: "A syntax extension that lets you write markup inside JavaScript." },
  { q: "What is a Hook?", a: "A function that lets components use state and other React features." },
];

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(null);

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            data-testid="accordion-header"
            className="accordion-header"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.q} <span>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div data-testid="accordion-panel" className="accordion-panel">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
};

const Practice = () => <Accordion items={items} />;
`,
    },
    tests: [
      { name: "Renders a header for each of the 3 items", steps: [count("accordion-header", 3)] },
      { name: "All panels are closed initially", steps: [count("accordion-panel", 0)] },
      { name: "Clicking a header opens its panel", steps: [click("accordion-header", 0), count("accordion-panel", 1), has("accordion-panel", "library")] },
      { name: "Opening another item closes the first (one at a time)", steps: [click("accordion-header", 1), count("accordion-panel", 1), has("accordion-panel", "syntax")] },
      { name: "Clicking the open header closes it", steps: [click("accordion-header", 1), count("accordion-panel", 0)] },
    ],
  },

  "mc-003": {
    thingsToDo: [
      "Render a button for every tab in the provided `tabs` array.",
      "Show the content of the active tab (the first tab is active initially).",
      "Clicking a tab switches the content.",
      "Give the active tab button the class `active`.",
    ],
    testIds: [
      { id: "tab", description: "each tab button (all 3)" },
      { id: "tab-panel", description: "the content of the active tab" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const tabs = [
  { label: "Home", content: "Home content" },
  { label: "Profile", content: "Profile content" },
  { label: "Settings", content: "Settings content" },
];

const Tabs = ({ tabs }) => {
  // TODO: track the active tab, render the tab bar + the active panel
  return <div className="tabs">{tabs.map((t) => <span key={t.label}>{t.label}</span>)}</div>;
};

const Practice = () => <Tabs tabs={tabs} />;
`,
      "styles.css": `.tab-bar { display: flex; gap: 4px; border-bottom: 2px solid #e2e8f0; }
.tab { padding: 10px 16px; border: 0; background: none; font: inherit; font-weight: 600; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
.tab.active { color: #4f46e5; border-bottom-color: #4f46e5; }
.tab-panel { padding: 18px 4px; color: #334155; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const tabs = [
  { label: "Home", content: "Home content" },
  { label: "Profile", content: "Profile content" },
  { label: "Settings", content: "Settings content" },
];

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-bar">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            data-testid="tab"
            className={i === active ? "tab active" : "tab"}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div data-testid="tab-panel" className="tab-panel">{tabs[active].content}</div>
    </div>
  );
};

const Practice = () => <Tabs tabs={tabs} />;
`,
    },
    tests: [
      { name: "Renders 3 tabs", steps: [count("tab", 3)] },
      { name: "First tab is active initially", steps: [has("tab-panel", "Home content"), cls("tab", "active", 0)] },
      { name: "Clicking a tab shows its content", steps: [click("tab", 1), has("tab-panel", "Profile content")] },
      { name: "The clicked tab gets the `active` class", steps: [cls("tab", "active", 1), cls("tab", "active", 0, false)] },
    ],
  },

  "mc-032": {
    thingsToDo: [
      "Start with a count of 10 (the `initialCount` prop) and not liked.",
      "Clicking the button toggles the liked state; liked adds 1 to the count.",
      "Clicking again removes the like, so the count goes back down.",
      "Give the button the class `liked` while it is liked.",
    ],
    testIds: [
      { id: "like-button", description: "the like button" },
      { id: "like-count", description: "the element showing the count" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const LikeButton = ({ initialCount = 10 }) => {
  // TODO: track liked state and derive the count from it
  return <button className="like">♡ {initialCount}</button>;
};

const Practice = () => <LikeButton initialCount={10} />;
`,
      "styles.css": `.like { padding: 10px 18px; border: 1px solid #e2e8f0; border-radius: 999px; background: #fff; font: inherit; font-size: 18px; cursor: pointer; }
.like.liked { background: #fff1f2; border-color: #fda4af; color: #e11d48; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const LikeButton = ({ initialCount = 10 }) => {
  const [liked, setLiked] = useState(false);

  return (
    <button
      data-testid="like-button"
      className={liked ? "like liked" : "like"}
      onClick={() => setLiked(!liked)}
    >
      {liked ? "♥" : "♡"} <span data-testid="like-count">{initialCount + (liked ? 1 : 0)}</span>
    </button>
  );
};

const Practice = () => <LikeButton initialCount={10} />;
`,
    },
    tests: [
      { name: "Starts at 10 and not liked", steps: [text("like-count", "10"), cls("like-button", "liked", 0, false)] },
      { name: "Clicking likes it: count becomes 11 and the button is `liked`", steps: [click("like-button"), text("like-count", "11"), cls("like-button", "liked", 0)] },
      { name: "Clicking again unlikes it: count goes back to 10", steps: [click("like-button"), text("like-count", "10"), cls("like-button", "liked", 0, false)] },
    ],
  },

  "mc-060": {
    thingsToDo: [
      "Render a password input that starts hidden (`type=\"password\"`).",
      "A button toggles the input between hidden and visible.",
      "The button label is `Show` while hidden and `Hide` while visible.",
      "Keep what the user typed when toggling.",
    ],
    testIds: [
      { id: "password-input", description: "the password input" },
      { id: "toggle-visibility", description: "the show / hide button" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const PasswordField = () => {
  // TODO: control the input value and toggle its type
  return (
    <div className="field">
      <input type="password" placeholder="Password" />
      <button>Show</button>
    </div>
  );
};

const Practice = () => <PasswordField />;
`,
      "styles.css": `.field { display: flex; gap: 8px; max-width: 320px; }
.field input { flex: 1; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font: inherit; }
.field button { padding: 0 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; font: inherit; font-weight: 600; cursor: pointer; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      <input
        data-testid="password-input"
        type={visible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button data-testid="toggle-visibility" onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
};

const Practice = () => <PasswordField />;
`,
    },
    tests: [
      { name: "Input starts hidden with a Show button", steps: [attr("password-input", "type", "password"), has("toggle-visibility", "Show")] },
      { name: "Typing keeps the value", steps: [type("password-input", "secret123"), value("password-input", "secret123")] },
      { name: "Clicking the button reveals the password", steps: [click("toggle-visibility"), attr("password-input", "type", "text"), has("toggle-visibility", "Hide")] },
      { name: "The typed value is preserved while visible", steps: [value("password-input", "secret123")] },
      { name: "Clicking again hides it", steps: [click("toggle-visibility"), attr("password-input", "type", "password"), has("toggle-visibility", "Show")] },
    ],
  },

  "mc-061": {
    thingsToDo: [
      "Show the count, starting at 0.",
      "A number input sets the step (default 1).",
      "Increment / decrement change the count by the current step.",
      "Reset sets the count back to 0 and the step back to 1.",
    ],
    testIds: [
      { id: "count", description: "the current count" },
      { id: "step-input", description: "the number input for the step" },
      { id: "increment", description: "the + button" },
      { id: "decrement", description: "the − button" },
      { id: "reset", description: "the reset button" },
    ],
    files: {
      "Practice.js": `const { useState } = React;

const Counter = () => {
  // TODO: track count and step
  return (
    <div className="counter">
      <h2>0</h2>
      <label>Step <input type="number" defaultValue={1} /></label>
      <div className="row">
        <button>−</button>
        <button>+</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

const Practice = () => <Counter />;
`,
      "styles.css": `.counter { display: grid; gap: 12px; max-width: 260px; }
.counter h2 { margin: 0; font-size: 44px; }
.counter input { width: 70px; padding: 6px 8px; margin-left: 6px; border: 1px solid #cbd5e1; border-radius: 6px; }
.row { display: flex; gap: 8px; }
.row button { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; font: inherit; font-weight: 600; cursor: pointer; }
`,
    },
    solution: {
      "Practice.js": `const { useState } = React;

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="counter">
      <h2 data-testid="count">{count}</h2>
      <label>
        Step
        <input
          data-testid="step-input"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <div className="row">
        <button data-testid="decrement" onClick={() => setCount(count - step)}>−</button>
        <button data-testid="increment" onClick={() => setCount(count + step)}>+</button>
        <button data-testid="reset" onClick={() => { setCount(0); setStep(1); }}>Reset</button>
      </div>
    </div>
  );
};

const Practice = () => <Counter />;
`,
    },
    tests: [
      { name: "Starts at 0", steps: [text("count", "0")] },
      { name: "Increment adds the default step of 1", steps: [click("increment"), text("count", "1")] },
      { name: "Increment uses a custom step", steps: [type("step-input", 5), click("increment"), text("count", "6")] },
      { name: "Decrement subtracts the step", steps: [click("decrement"), text("count", "1")] },
      { name: "Reset restores count 0 and step 1", steps: [click("reset"), text("count", "0"), value("step-input", 1)] },
    ],
  },
};

fs.mkdirSync(OUT, { recursive: true });
for (const [id, p] of Object.entries(PROBLEMS)) {
  const json = {
    id,
    thingsToDo: p.thingsToDo,
    instructions: { intro: INTRO, testIds: p.testIds },
    files: { "Practice.js": p.files["Practice.js"], "App.js": APP, "styles.css": p.files["styles.css"] },
    solution: p.solution,
    tests: p.tests,
  };
  fs.writeFileSync(`${OUT}/${id}.json`, JSON.stringify(json, null, 2) + "\n");
}
console.log("wrote", Object.keys(PROBLEMS).length, "problems:", Object.keys(PROBLEMS).join(", "));
