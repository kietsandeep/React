import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon/Icon";
import Modal from "../Modal/Modal";
import styles from "./ResultsModal.module.css";

export default function ResultsModal({ results, nextTo, onClose }) {
  const passed = results.filter((r) => r.passed).length;
  const all = results.length > 0 && passed === results.length;
  return (
    <Modal title="Test results" onClose={onClose} footer={
      <>
        <button type="button" className={styles.btn} onClick={onClose}>{all ? "Close" : "Keep editing"}</button>
        {all && nextTo && <Link to={nextTo} className={`${styles.btn} ${styles.primary}`} onClick={onClose}>Next problem</Link>}
      </>
    }>
      <p className={`${styles.summary} ${all ? styles.ok : styles.bad}`} role="status">
        {all ? "All tests passed — marked as completed." : `${passed} of ${results.length} tests passed.`}
      </p>
      <ul className={styles.list}>
        {results.map((r, i) => (
          <li key={i} className={r.passed ? styles.pass : styles.fail}>
            <Icon name={r.passed ? "checkCircle" : "x"} size={18} />
            <div><strong>{r.name}</strong>{!r.passed && r.message && <p>{r.message}</p>}</div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
