// Extra blocks (code, images, notes) + difficulty, keyed by [moduleId, text that appears in the question].
const code = (language, title, value) => ({ type: "code", language, ...(title ? { title } : {}), value });
const text = (value) => ({ type: "text", value });
const img = (src, alt, caption) => ({ type: "image", src, alt, caption });
const note = (variant, value) => ({ type: "note", variant, value });
const list = (items, ordered = false) => ({ type: "list", ordered, items });

export const MODULE_DIFFICULTY = {
  1: "easy", 2: "easy", 3: "easy", 4: "easy", 5: "medium", 6: "medium", 7: "medium", 8: "medium",
  9: "hard", 10: "medium", 11: "medium", 12: "medium", 13: "medium", 14: "medium", 15: "medium",
  16: "medium", 17: "easy", 18: "medium", 19: "hard", 20: "easy", 21: "easy",
};

// [moduleId, match, { difficulty?, tags?, append?: blocks[], replace?: blocks[] }]
export const ENRICHMENTS = [
  [1, "What is Virtual DOM?", { tags: ["virtual-dom"], append: [
    img("/images/react/virtual-dom-diff.svg", "State change creates a new Virtual DOM, which is diffed and applied to the Real DOM", "Virtual DOM update flow"),
    note("tip", "Mention the **diffing (reconciliation)** step in interviews — it is what most candidates miss."),
  ]}],
  [1, "role of JSX", { append: [code("jsx", "JSX vs compiled output",
`// What you write
const el = <h1 className="title">Hello, {name}</h1>;

// What Babel compiles it to
const el = React.createElement("h1", { className: "title" }, "Hello, ", name);`)] }],
  [1, "Declarative & Imperative", { append: [
    code("js", "Imperative (vanilla JS)", `const li = document.createElement("li");\nli.textContent = "Task";\ndocument.querySelector("ul").appendChild(li);`),
    code("jsx", "Declarative (React)", `function Tasks({ tasks }) {\n  return <ul>{tasks.map((t) => <li key={t}>{t}</li>)}</ul>;\n}`),
  ]}],

  [2, "Arrow Function Expression", { append: [code("jsx", null, `<button onClick={() => handleDelete(item.id)}>Delete</button>`)] }],
  [2, "Setup React first project", { append: [code("bash", "Terminal", `npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev`)] }],
  [2, "How React App Load", { append: [code("jsx", "src/main.jsx", `import { createRoot } from "react-dom/client";\nimport App from "./App";\n\ncreateRoot(document.getElementById("root")).render(<App />);`)] }],
  [2, "Reusability and Composition", { append: [code("jsx", "Composition with children", `function Card({ title, children }) {\n  return (\n    <div className="card">\n      <h3>{title}</h3>\n      {children}\n    </div>\n  );\n}\n\n<Card title="Profile"><p>Hello!</p></Card>`)] }],
  [2, "What are Props", { append: [code("jsx", null, `function Greeting({ name }) {\n  return <h1>Hello, {name}</h1>;\n}\n\n<Greeting name="Sandeep" />`)] }],

  [3, "export default", { append: [code("jsx", "App.jsx", `export default function App() {\n  return <h1>Hello</h1>;\n}\n\n// elsewhere\nimport App from "./App"; // any name works for a default import`)] }],

  [4, "Fragment", { append: [code("jsx", null, `return (\n  <>\n    <h1>Title</h1>\n    <p>No extra wrapper div in the DOM</p>\n  </>\n);`)] }],
  [4, "Spread Operator", { append: [code("jsx", null, `const props = { id: "email", type: "email", required: true };\n<input {...props} placeholder="Email" />`)] }],
  [4, "Conditional Rendering", { append: [code("jsx", null, `{isLoggedIn ? <Dashboard /> : <Login />}   // ternary\n{hasError && <ErrorMessage />}              // short-circuit`),
    note("warning", "With `&&`, a value like `0` renders as `0`. Use `count > 0 && ...` instead of `count && ...`.")] }],
  [4, "iterate over a list", { append: [code("jsx", null, `<ul>\n  {users.map((user) => (\n    <li key={user.id}>{user.name}</li>\n  ))}\n</ul>`),
    note("tip", "Use a stable unique id as the `key` — avoid the array index when items can be reordered.")] }],
  [4, "Can a browser read", { append: [code("jsx", null, `// Browser cannot run this:\nconst a = <div>Hi</div>;\n\n// It runs this (after Babel):\nconst a = React.createElement("div", null, "Hi");`)] }],

  [5, "What are the Types of React components", { append: [code("jsx", "Functional component", `function Welcome({ name }) {\n  const [count, setCount] = useState(0);\n  return <h1 onClick={() => setCount(count + 1)}>Hi {name} ({count})</h1>;\n}`)] }],
  [5, "pass data between functional", { append: [code("jsx", "Parent ↔ child", `function Parent() {\n  const [msg, setMsg] = useState("");\n  return <Child title="Hello" onSend={setMsg} />;   // props down, callback up\n}\n\nfunction Child({ title, onSend }) {\n  return <button onClick={() => onSend("Sent from child")}>{title}</button>;\n}`)] }],
  [5, "What is Prop Drilling", { append: [code("jsx", null, `<App user={user}>\n  <Layout user={user}>\n    <Sidebar user={user}>\n      <Avatar user={user} />   {/* only this one needs it */}\n    </Sidebar>\n  </Layout>\n</App>`)] }],
  [5, "What are Class Components", { append: [code("jsx", "Class component", `class Counter extends React.Component {\n  state = { count: 0 };\n\n  render() {\n    return (\n      <button onClick={() => this.setState({ count: this.state.count + 1 })}>\n        Clicked {this.state.count} times\n      </button>\n    );\n  }\n}`)] }],

  [6, "How to Implement Routing", { append: [code("jsx", null, `import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\n<BrowserRouter>\n  <Link to="/about">About</Link>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>`)] }],
  [6, "Route Parameters", { append: [code("jsx", null, `<Route path="/users/:id" element={<User />} />\n\nfunction User() {\n  const { id } = useParams();\n  return <h1>User {id}</h1>;\n}`)] }],

  [7, "role of useState", { append: [code("jsx", "Counter.jsx", `import { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}`)] }],
  [7, "role of useEffect", { difficulty: "medium", append: [code("jsx", "Fetch data on mount", `useEffect(() => {\n  let ignore = false;\n  fetch("/api/users")\n    .then((res) => res.json())\n    .then((data) => { if (!ignore) setUsers(data); });\n\n  return () => { ignore = true; };   // cleanup\n}, []);`)] }],
  [7, "Dependency Array", { append: [code("jsx", null, `useEffect(() => {\n  document.title = \`Hello \${name}\`;\n}, [name]);   // re-runs only when "name" changes`)] }],
  [7, "empty array", { append: [code("jsx", null, `useEffect(() => {\n  console.log("runs once, after the first render");\n}, []);`)] }],

  [8, "createContext() method", { append: [code("jsx", "ThemeContext.jsx", `const ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);   // "dark"\n  return <p>Theme: {theme}</p>;\n}`)] }],
  [8, "What is useReducer()", { append: [code("jsx", "Counter with useReducer", `function reducer(state, action) {\n  switch (action.type) {\n    case "inc": return { count: state.count + 1 };\n    case "dec": return { count: state.count - 1 };\n    default: return state;\n  }\n}\n\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n<button onClick={() => dispatch({ type: "inc" })}>{state.count}</button>`)] }],

  [9, "role of useCallback", { difficulty: "hard", append: [code("jsx", null, `const Child = React.memo(function Child({ onSave }) {\n  console.log("Child rendered");\n  return <button onClick={onSave}>Save</button>;\n});\n\nfunction Parent() {\n  const [n, setN] = useState(0);\n  const onSave = useCallback(() => console.log("saved"), []);   // stable reference\n  return <><Child onSave={onSave} /><button onClick={() => setN(n + 1)}>{n}</button></>;\n}`)] }],
  [9, "role of useMemo", { append: [code("jsx", null, `const total = useMemo(\n  () => items.reduce((sum, i) => sum + i.price, 0),\n  [items]   // recalculated only when items change\n);`)] }],
  [9, "role of useRef", { append: [code("jsx", "Focus an input", `const inputRef = useRef(null);\n\n<input ref={inputRef} />\n<button onClick={() => inputRef.current.focus()}>Focus</button>`)] }],
  [9, "What is useLayoutEffect", { append: [code("jsx", null, `useLayoutEffect(() => {\n  const { height } = boxRef.current.getBoundingClientRect();\n  setHeight(height);   // measured before the browser paints\n}, []);`)] }],

  [10, "What are Custom Hooks", { append: [code("jsx", "useLocalStorage.js", `function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initial;\n  });\n  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);\n  return [value, setValue];\n}\n\nconst [theme, setTheme] = useLocalStorage("theme", "light");`)] }],
  [10, "conditionally run effects", { append: [code("jsx", null, `// Wrong: hook inside a condition\nif (userId) { useEffect(() => load(userId), [userId]); }\n\n// Right: condition inside the effect\nuseEffect(() => {\n  if (userId) load(userId);\n}, [userId]);`)] }],

  [11, "Component life cycle phases", { append: [img("/images/react/component-lifecycle.svg", "Mounting, updating and unmounting phases with their lifecycle methods", "Class component lifecycle")] }],
  [11, "Constructors in class", { append: [code("jsx", null, `class Counter extends React.Component {\n  constructor(props) {\n    super(props);               // must come first\n    this.state = { count: 0 };\n    this.handleClick = this.handleClick.bind(this);\n  }\n}`)] }],
  [11, "role of componentDidMount", { append: [code("jsx", null, `componentDidMount() {\n  fetch("/api/posts")\n    .then((r) => r.json())\n    .then((posts) => this.setState({ posts }));\n}`)] }],
  [12, "role of componentWillUnmount", { append: [code("jsx", null, `componentDidMount() {\n  this.timer = setInterval(this.tick, 1000);\n}\ncomponentWillUnmount() {\n  clearInterval(this.timer);   // cleanup\n}`)] }],

  [13, "What are Controlled Components in React", { append: [code("jsx", null, `function NameForm() {\n  const [name, setName] = useState("");\n  return (\n    <input value={name} onChange={(e) => setName(e.target.value)} />\n  );\n}`)] }],
  [13, "multiple input fields", { append: [code("jsx", "Functional version", `const [form, setForm] = useState({ email: "", password: "" });\n\nconst handleChange = (e) =>\n  setForm({ ...form, [e.target.name]: e.target.value });\n\n<input name="email" value={form.email} onChange={handleChange} />\n<input name="password" value={form.password} onChange={handleChange} />`)] }],

  [14, "How to Implement Code Splitting", { append: [code("jsx", null, `import { lazy, Suspense } from "react";\n\nconst Dashboard = lazy(() => import("./Dashboard"));\n\n<Suspense fallback={<p>Loading…</p>}>\n  <Dashboard />\n</Suspense>`)] }],

  [15, "Higher-Order Component", { difficulty: "hard", append: [code("jsx", null, `function withLoading(Component) {\n  return function Wrapped({ isLoading, ...props }) {\n    return isLoading ? <p>Loading…</p> : <Component {...props} />;\n  };\n}\n\nconst UserListWithLoading = withLoading(UserList);`)] }],
  [15, "5 ways to Style", { replace: [
    list(["Inline Styles", "Global CSS stylesheets", "CSS Modules", "CSS-in-JS libraries (Styled Components)", "Utility frameworks (Tailwind)"], true),
    text("Inline styles use JavaScript objects passed directly to elements via the `style={{}}` attribute using camelCase keys."),
    code("jsx", null, `<p style={{ backgroundColor: "tomato", fontSize: 18 }}>Inline styled</p>`),
  ]}],
  [15, "child component to parent", { append: [code("jsx", null, `function Parent() {\n  const handleData = (data) => console.log("From child:", data);\n  return <Child onData={handleData} />;\n}\nfunction Child({ onData }) {\n  return <button onClick={() => onData(42)}>Send</button>;\n}`)] }],

  [16, "Flow of data", { append: [img("/images/react/redux-data-flow.svg", "UI dispatches an action, the reducer computes new state, the store updates the UI", "Redux unidirectional data flow")] }],
  [16, "What are Action Creators", { append: [code("js", null, `const addTodo = (text) => ({\n  type: "todos/add",     // action type\n  payload: { text },     // data\n});\n\ndispatch(addTodo("Learn Redux"));   // action object sent to the store`)] }],
  [16, "role of Reducer", { append: [code("js", null, `function todosReducer(state = [], action) {\n  switch (action.type) {\n    case "todos/add":\n      return [...state, action.payload];   // new array, no mutation\n    default:\n      return state;\n  }\n}`)] }],

  [18, "4 Important Files", { append: [code("js", "counterSlice.js (Redux Toolkit)", `import { createSlice } from "@reduxjs/toolkit";\n\nconst counterSlice = createSlice({\n  name: "counter",\n  initialState: { value: 0 },\n  reducers: { increment: (state) => { state.value += 1; } },\n});\n\nexport const { increment } = counterSlice.actions;\nexport default counterSlice.reducer;`),
    code("js", "store.js", `import { configureStore } from "@reduxjs/toolkit";\nimport counter from "./counterSlice";\n\nexport const store = configureStore({ reducer: { counter } });`)] }],
  [18, "immutability", { append: [code("js", null, `// Mutation (wrong in plain Redux)\nstate.items.push(item);\n\n// Immutable update\nreturn { ...state, items: [...state.items, item] };`)] }],
  [19, "Regular Action creator", { append: [code("js", "Thunk", `export const fetchUsers = () => async (dispatch) => {\n  dispatch({ type: "users/loading" });\n  try {\n    const res = await fetch("/api/users");\n    dispatch({ type: "users/success", payload: await res.json() });\n  } catch (err) {\n    dispatch({ type: "users/error", payload: err.message });\n  }\n};`)] }],

  [20, "What are variables", { append: [code("js", null, `var a = 1;    // function-scoped, hoisted\nlet b = 2;    // block-scoped, reassignable\nconst c = 3;  // block-scoped, cannot be reassigned\n\nconst user = { name: "A" };\nuser.name = "B";   // allowed: const protects the binding, not the contents`)] }],
  [20, "Spread and Rest", { append: [code("js", null, `const a = [1, 2];\nconst b = [...a, 3];                 // spread -> [1, 2, 3]\n\nfunction sum(...nums) {              // rest -> array of args\n  return nums.reduce((x, y) => x + y, 0);\n}`)] }],
  [20, "Array Destructuring", { append: [code("js", null, `const [first, second = 0, ...rest] = [10, 20, 30, 40];\n// first=10, second=20, rest=[30, 40]`)] }],
  [20, "template literals", { append: [code("js", null, "const name = \"Sam\";\nconsole.log(`Hello, ${name}! 2 + 2 = ${2 + 2}`);")] }],
  [20, "What are Promises", { append: [code("js", null, `const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("done"), 1000);\n});\n\np.then(console.log).catch(console.error);   // pending -> fulfilled`)] }],
  [20, "async/ await", { append: [code("js", null, `async function loadUser(id) {\n  try {\n    const res = await fetch(\`/api/users/\${id}\`);\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}`)] }],
  [20, "What are Classes in JS", { append: [code("js", null, `class Person {\n  constructor(name) { this.name = name; }\n  greet() { return \`Hi, I am \${this.name}\`; }\n}\nconsole.log(new Person("Sam").greet());`)] }],

  [21, "Type annotation", { append: [code("ts", null, `let count: number = 10;\nconst greet = (name: string): string => \`Hi \${name}\`;`)] }],
  [21, "Enum type", { append: [code("ts", null, `enum Direction { Up, Down, Left, Right }\nconst d: Direction = Direction.Left;   // 2`)] }],
  [21, "void and never", { append: [code("ts", null, `function log(msg: string): void { console.log(msg); }\nfunction fail(msg: string): never { throw new Error(msg); }`)] }],
  [21, "Type Assertion", { append: [code("ts", null, `const input = document.getElementById("name") as HTMLInputElement;\nconsole.log(input.value);`)] }],
  [21, "Access Modifiers", { append: [code("ts", null, `class Account {\n  public owner: string;\n  private balance = 0;        // only inside Account\n  protected id = 1;           // Account + subclasses\n  constructor(owner: string) { this.owner = owner; }\n}`)] }],
  [21, "What is Interface", { append: [code("ts", null, `interface User {\n  id: number;\n  name: string;\n  email?: string;   // optional\n}\nconst u: User = { id: 1, name: "Sam" };`)] }],
  [21, "extends and implements", { append: [code("ts", null, `interface Flyer { fly(): void }\nclass Animal { eat() {} }\n\nclass Bird extends Animal implements Flyer {   // one parent, many interfaces\n  fly() { console.log("flap"); }\n}`)] }],
];
