import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ to, variant = "primary", children, ...rest }) {
  const cls = `${styles.btn} ${styles[variant]}`;
  return to ? (
    <Link to={to} className={cls} {...rest}>{children}</Link>
  ) : (
    <button type="button" className={cls} {...rest}>{children}</button>
  );
}
