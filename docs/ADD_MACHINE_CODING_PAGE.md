# Add the Machine Coding list page to your project

Needs no new npm packages. Reuses: Icon, theme tokens, and `useProgress` from the topics feature.

1. Copy folder  `src/features/practice/`   (data JSON, 5 components, service, filter utils)
2. Copy folder  `src/pages/PracticeList/`  (PracticeListPage.jsx + .module.css)
3. REPLACE      `src/components/common/Icon/Icon.jsx`   (adds search, flame, eye, check, checkCircle, lock, flag, chevronRight)
4. EDIT         `src/routes/AppRoutes.jsx`
     import PracticeListPage from "@/pages/PracticeList/PracticeListPage";
     <Route path="practice/:slug" element={<PracticeListPage />} />      // above the "*" route
5. (optional) EDIT `src/components/layout/Header/Header.jsx`  -> "Practice" pill highlights on /practice/*
     - import { Link, NavLink, useLocation } from "react-router-dom";
     - inside NavDropdown, after useState:
         const { pathname } = useLocation();
         const isActive = item.children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`));
     - on the dropdown <button>: className={`${styles.link} ${isActive ? styles.active : ""}`}
6. npm run dev  ->  open /practice/machine-coding  (or click "React Machine Coding" on the home page)

Adding another set later (e.g. DSA): drop `src/features/practice/data/dsa.json` in the same shape. /practice/dsa then works with no code changes.
