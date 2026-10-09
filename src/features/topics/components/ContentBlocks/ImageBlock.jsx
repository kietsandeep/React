import { useEffect, useState } from "react";
import styles from "./ContentBlocks.module.css";

export default function ImageBlock({ block }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <figure className={styles.figure}>
      <button type="button" className={styles.imgBtn} onClick={() => setOpen(true)} aria-label={`Enlarge image: ${block.alt}`}>
        <img src={block.src} alt={block.alt ?? ""} loading="lazy" />
      </button>
      {block.caption && <figcaption>{block.caption}</figcaption>}
      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={block.alt} onClick={() => setOpen(false)}>
          <img src={block.src} alt={block.alt ?? ""} />
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close image">×</button>
        </div>
      )}
    </figure>
  );
}
