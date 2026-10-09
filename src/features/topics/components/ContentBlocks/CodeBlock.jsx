import { useMemo, useState } from "react";
import { highlight } from "../../utils/highlight";
import styles from "./ContentBlocks.module.css";

export default function CodeBlock({ block }) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => highlight(block.value, block.language), [block.value, block.language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className={styles.code}>
      <div className={styles.codeBar}>
        <span>{block.title ?? block.language ?? "code"}</span>
        <button type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre tabIndex={0}><code>
        {tokens.map((tk, i) =>
          tk.t === "plain" ? tk.v : <span key={i} className={styles[`tk_${tk.t}`]}>{tk.v}</span>
        )}
      </code></pre>
    </div>
  );
}
