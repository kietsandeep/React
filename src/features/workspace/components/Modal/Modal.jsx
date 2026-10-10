import { useEffect } from "react";
import Icon from "@/components/common/Icon/Icon";
import styles from "./Modal.module.css";

export default function Modal({ title, onClose, children, footer, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} ${wide ? styles.wide : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
