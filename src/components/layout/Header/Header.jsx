import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/constants/navigation";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/common/Icon/Icon";
import Button from "@/components/common/Button/Button";
import { SITE } from "@/constants/site";
import styles from "./Header.module.css";

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = item.children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`));
  return (
    <div className={styles.dropdown} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`${styles.link} ${isActive ? styles.active : ""}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {item.label} <Icon name="caret" size={12} />
      </button>
      {open && (
        <ul className={styles.menu}>
          {item.children.map((c) => (
            <li key={c.to}><Link to={c.to} onClick={() => setOpen(false)}>{c.label}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}><span className={styles.mark}>{SITE.short}</span>{SITE.name}</Link>
        <nav className={styles.nav} aria-label="Main">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <NavLink key={item.to} to={item.to} end
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
                {item.label}
              </NavLink>
            )
          )}
          <Button to="/signin">Sign In</Button>
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
            <Icon name={theme === "light" ? "moon" : "sun"} />
          </button>
          <button className={`${styles.iconBtn} ${styles.support}`} aria-label="Support">
            <Icon name="headset" size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
}
