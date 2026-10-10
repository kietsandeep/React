// Scripts the preview iframe loads. Pin exact versions. If one fails to load, open the URL in a browser to check it.
export const SANDBOX_SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.7/babel.min.js",
];

// Tab order in the editor. Files are concatenated in this order (JS first, then CSS is injected as a stylesheet).
export const FILE_ORDER = ["solution.js", "Practice.js", "App.js", "styles.css"];
export const JS_FILES = ["solution.js", "Practice.js", "App.js"];
export const CSS_FILE = "styles.css";
