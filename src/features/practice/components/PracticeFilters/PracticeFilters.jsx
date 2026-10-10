import Icon from "@/components/common/Icon/Icon";
import { getLabels } from "@/features/practice/utils/labels";
import styles from "./PracticeFilters.module.css";

export default function PracticeFilters({ filters, onChange, companies, placeholder, labels = getLabels() }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  return (
    <div className={styles.bar}>
      <label className={styles.search}>
        <Icon name="search" size={18} />
        <input type="search" value={filters.query} onChange={set("query")} placeholder={placeholder} aria-label="Search questions" />
      </label>
      <select value={filters.level} onChange={set("level")} aria-label="Filter by level">
        <option value="all">All levels</option>
        <option value="easy">{labels.levels.easy}</option>
        <option value="medium">{labels.levels.medium}</option>
        <option value="hard">{labels.levels.hard}</option>
      </select>
      <select value={filters.company} onChange={set("company")} aria-label="Filter by company">
        <option value="all">All companies</option>
        {companies.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.status} onChange={set("status")} aria-label="Filter by status">
        <option value="all">All status</option>
        <option value="done">{labels.progressDone === "solved" ? "Solved" : "Completed"}</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
