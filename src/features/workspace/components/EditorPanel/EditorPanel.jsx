import { useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import CodeEditor from "../CodeEditor/CodeEditor";
import styles from "./EditorPanel.module.css";

export default function EditorPanel({ files, order, setFile, onReset }) {
  const [active, setActive] = useState(order[0]);
  const [full, setFull] = useState(false);
  const [menu, setMenu] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  return (
    <section className={`${styles.panel} ${full ? styles.full : ""}`} aria-label="Code editor">
      <header className={styles.head}>
        <div className={styles.tabs} role="tablist">
          {order.map((name) => (
            <button key={name} type="button" role="tab" aria-selected={name === active}
              className={name === active ? styles.active : ""} onClick={() => setActive(name)}>{name}</button>
          ))}
        </div>
        <div className={styles.tools}>
          <button type="button" aria-label={full ? "Exit full screen" : "Full screen editor"} onClick={() => setFull(!full)}><Icon name="expand" size={18} /></button>
          <div className={styles.menuWrap}>
            <button type="button" aria-label="Editor settings" aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name="sliders" size={18} /></button>
            {menu && (
              <div className={styles.menu}>
                <div className={styles.row}>
                  <span>Font size</span>
                  <span>
                    <button type="button" onClick={() => setFontSize((s) => Math.max(11, s - 1))} aria-label="Smaller font">−</button>
                    <b>{fontSize}px</b>
                    <button type="button" onClick={() => setFontSize((s) => Math.min(22, s + 1))} aria-label="Larger font">+</button>
                  </span>
                </div>
                <button type="button" className={styles.reset}
                  onClick={() => { if (window.confirm("Reset all files to the starter code?")) { onReset(); } setMenu(false); }}>Reset code</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={styles.body}>
        <CodeEditor key={active} value={files[active] ?? ""} language={active.endsWith(".css") ? "css" : "jsx"}
          fontSize={fontSize} label={`Editing ${active}`} onChange={(v) => setFile(active, v)} />
      </div>
    </section>
  );
}
