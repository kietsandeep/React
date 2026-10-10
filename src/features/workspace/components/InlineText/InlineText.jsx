import { Fragment } from "react";
import styles from "./InlineText.module.css";

// **bold** and `code` only — rendered as React elements (no innerHTML).
export default function InlineText({ text }) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong>
      : p.startsWith("`") ? <code key={i} className={styles.code}>{p.slice(1, -1)}</code>
      : <Fragment key={i}>{p}</Fragment>
    );
}
