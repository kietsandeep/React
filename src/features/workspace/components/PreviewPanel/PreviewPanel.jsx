import { useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import styles from "./PreviewPanel.module.css";

export default function PreviewPanel({ iframeRef, iframeKey, srcDoc, logs, onRefresh, onClear }) {
  const [open, setOpen] = useState(false);
  const errors = logs.filter((l) => l.level === "error").length;
  return (
    <section className={styles.panel} aria-label="Preview">
      <div className={`${styles.card} ${styles.browser}`}>
        <header><Icon name="browser" size={20} /><strong>Browser</strong></header>
        <div className={styles.frameWrap}>
          <iframe key={iframeKey} ref={iframeRef} title="Live preview" sandbox="allow-scripts" srcDoc={srcDoc} />
          <button type="button" className={styles.refresh} onClick={onRefresh} aria-label="Reload preview"><Icon name="refresh" size={20} /></button>
        </div>
      </div>

      <div className={styles.card}>
        <header>
          <Icon name="terminal" size={20} /><strong>Console</strong>
          {logs.length > 0 && <span className={`${styles.count} ${errors ? styles.err : ""}`}>{logs.length}</span>}
          <span className={styles.spacer} />
          {open && logs.length > 0 && <button type="button" className={styles.clear} onClick={onClear}>Clear</button>}
          <button type="button" className={styles.toggle} aria-expanded={open} aria-label={open ? "Collapse console" : "Expand console"} onClick={() => setOpen(!open)}>
            <Icon name="chevronUp" size={18} style={{ transform: open ? "rotate(180deg)" : "none" }} />
          </button>
        </header>
        {open && (
          <ul className={styles.logs}>
            {logs.length === 0 && <li className={styles.empty}>No console output yet.</li>}
            {logs.map((l, i) => <li key={i} className={styles[l.level]}>{l.text}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
