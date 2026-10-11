import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import TopicPage from "@/pages/Topic/TopicPage";
import PracticeListPage from "@/pages/PracticeList/PracticeListPage";
import QuickPrepPage from "@/pages/QuickPrep/QuickPrepPage";
import WorkspacePage from "@/pages/Workspace/WorkspacePage";
import CollectionHubPage from "@/pages/CollectionHub/CollectionHubPage";
import PlaceholderPage from "@/pages/Placeholder/PlaceholderPage";
import { getHubPaths } from "@/config/registry";

// Hub pages (/practice, /topics, /quick-prep …) are generated from config/collections/*.json.
// Only the detail pages below need a route per feature.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="practice/:slug/:questionSlug" element={<WorkspacePage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {getHubPaths().map(({ id, path }) => (
          <Route key={id} path={path.replace(/^\//, "")} element={<CollectionHubPage id={id} />} />
        ))}
        <Route path="topics/:slug" element={<TopicPage />} />
        <Route path="practice/:slug" element={<PracticeListPage />} />
        <Route path="quick-prep/:slug" element={<QuickPrepPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
