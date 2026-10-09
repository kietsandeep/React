import { Fragment } from "react";
import CodeBlock from "./CodeBlock";
import ImageBlock from "./ImageBlock";
import styles from "./ContentBlocks.module.css";

// Safe inline formatting: **bold** and `code` (no dangerouslySetInnerHTML).
function Inline({ text }) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong>
      : p.startsWith("`") ? <code key={i} className={styles.inline}>{p.slice(1, -1)}</code>
      : <Fragment key={i}>{p}</Fragment>
    );
}

function Block({ block }) {
  switch (block.type) {
    case "text":
      return <p className={styles.text}><Inline text={block.value} /></p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return <Tag className={styles.list}>{block.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</Tag>;
    }
    case "code":
      return <CodeBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "note":
      return <aside className={`${styles.note} ${styles[block.variant] ?? ""}`}><Inline text={block.value} /></aside>;
    default:
      return null;
  }
}

export default function ContentRenderer({ blocks = [] }) {
  return <div className={styles.blocks}>{blocks.map((b, i) => <Block key={i} block={b} />)}</div>;
}
