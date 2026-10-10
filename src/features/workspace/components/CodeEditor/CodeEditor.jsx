import { useEffect, useMemo, useRef } from "react";
import { highlight } from "@/features/topics/utils/highlight";
import styles from "./CodeEditor.module.css";

// Dependency-free editor: a transparent <textarea> on top of a syntax-highlighted <pre>.
// To upgrade later, swap this component for Monaco / CodeMirror — the props stay the same.
export default function CodeEditor({ value, onChange, language, fontSize = 14, label }) {
  const taRef = useRef(null);
  const preRef = useRef(null);
  const gutterRef = useRef(null);
  const trapTab = useRef(true);
  const lastEmitted = useRef(value);

  const tokens = useMemo(() => highlight(value + "\n", language), [value, language]);
  const lineCount = value.split("\n").length;
  const lineHeight = Math.round(fontSize * 1.65);

  const syncScroll = () => {
    const ta = taRef.current;
    preRef.current.scrollTop = ta.scrollTop;
    preRef.current.scrollLeft = ta.scrollLeft;
    gutterRef.current.scrollTop = ta.scrollTop;
  };

  const emit = (next) => { lastEmitted.current = next; onChange(next); };

  // Code replaced from outside (Reset / Apply solution): jump back to the top-left instead of keeping the old scroll offset.
  useEffect(() => {
    if (value === lastEmitted.current) return;
    lastEmitted.current = value;
    taRef.current.scrollTop = 0;
    taRef.current.scrollLeft = 0;
    syncScroll();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const edit = (next, caret) => {
    emit(next);
    requestAnimationFrame(() => {
      const ta = taRef.current;
      if (ta) ta.selectionStart = ta.selectionEnd = caret;
    });
  };

  const onKeyDown = (e) => {
    const ta = e.currentTarget;
    const { selectionStart: s, selectionEnd: en, value: v } = ta;
    if (e.key === "Escape") { trapTab.current = false; return; }          // Esc then Tab leaves the editor (keyboard a11y)
    if (e.key === "Tab" && trapTab.current && !e.shiftKey) {
      e.preventDefault();
      edit(v.slice(0, s) + "  " + v.slice(en), s + 2);
      return;
    }
    trapTab.current = true;
    if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = s === 0 ? 0 : v.lastIndexOf("\n", s - 1) + 1;
      const before = v.slice(lineStart, s);
      const indent = /^ */.exec(before)[0];
      const extra = /[{(\[]$/.test(before.trimEnd()) ? "  " : "";
      const ins = "\n" + indent + extra;
      edit(v.slice(0, s) + ins + v.slice(en), s + ins.length);
    }
  };

  return (
    <div className={styles.editor} style={{ "--fs": `${fontSize}px`, "--lh": `${lineHeight}px` }}>
      <div className={styles.gutter} ref={gutterRef} aria-hidden="true">
        {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <div className={styles.stack}>
        <pre ref={preRef} className={styles.pre} aria-hidden="true">
          {tokens.map((tk, i) => (tk.t === "plain" ? tk.v : <span key={i} className={styles[`tk_${tk.t}`]}>{tk.v}</span>))}
        </pre>
        <textarea
          ref={taRef}
          className={styles.ta}
          value={value}
          onChange={(e) => emit(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          aria-label={label ?? "Code editor"}
        />
      </div>
    </div>
  );
}
