import styles from "./SearchBox.module.css";

export default function SearchBox({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions or answers…" aria-label="Search questions or answers" />
    </div>
  );
}
