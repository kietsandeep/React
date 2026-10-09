// Tiny dependency-free syntax highlighter (JS / JSX / TS / HTML-ish). Returns tokens, never raw HTML.
const KEYWORDS =
  "const|let|var|function|return|if|else|for|while|do|import|from|export|default|new|class|extends|implements|" +
  "async|await|try|catch|finally|throw|typeof|instanceof|this|super|null|undefined|true|false|interface|type|" +
  "public|private|protected|readonly|enum|void|never|any|string|number|boolean|switch|case|break|continue|of|in";

const TOKEN_RE = new RegExp(
  [
    "(?<comment>\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)",
    "(?<string>\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
    "(?<tag><\\/?[A-Za-z][\\w.-]*)",
    "(?<number>\\b\\d+(?:\\.\\d+)?\\b)",
    `(?<keyword>\\b(?:${KEYWORDS})\\b)`,
    "(?<fn>\\b[A-Za-z_$][\\w$]*(?=\\())",
  ].join("|"),
  "g"
);

const SUPPORTED = new Set(["js", "jsx", "javascript", "ts", "tsx", "typescript", "html", "json"]);

export function highlight(code, language = "") {
  if (!SUPPORTED.has(language.toLowerCase())) return [{ t: "plain", v: code }];
  const out = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    if (m.index > last) out.push({ t: "plain", v: code.slice(last, m.index) });
    const type = Object.keys(m.groups).find((k) => m.groups[k] !== undefined);
    out.push({ t: type, v: m[0] });
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push({ t: "plain", v: code.slice(last) });
  return out;
}
