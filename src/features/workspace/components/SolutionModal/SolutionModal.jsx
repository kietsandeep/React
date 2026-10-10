import { useState } from "react";
import CodeBlock from "@/features/topics/components/ContentBlocks/CodeBlock";
import Modal from "../Modal/Modal";
import styles from "./SolutionModal.module.css";

export default function SolutionModal({ solution, onApply, onClose }) {
  const names = Object.keys(solution);
  const [active, setActive] = useState(names[0]);
  return (
    <Modal title="Solution" wide onClose={onClose} footer={
      <>
        <button type="button" className={styles.btn} onClick={onClose}>Close</button>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={() => { onApply(solution); onClose(); }}>Apply to editor</button>
      </>
    }>
      <p className={styles.note}>Try it yourself first. “Apply to editor” replaces the files shown here with the solution.</p>
      <div className={styles.tabs} role="tablist">
        {names.map((n) => <button key={n} role="tab" aria-selected={n === active} className={n === active ? styles.on : ""} onClick={() => setActive(n)}>{n}</button>)}
      </div>
      <CodeBlock key={active} block={{ type: "code", language: active.endsWith(".css") ? "css" : "jsx", title: active, value: solution[active] }} />
    </Modal>
  );
}
