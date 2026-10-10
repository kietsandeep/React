import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import TopicPage from "@/pages/Topic/TopicPage";
import PracticeListPage from "@/pages/PracticeList/PracticeListPage";
import WorkspacePage from "@/pages/Workspace/WorkspacePage";
import PlaceholderPage from "@/pages/Placeholder/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="practice/:slug/:questionSlug" element={<WorkspacePage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="topics/:slug" element={<TopicPage />} />
        <Route path="practice/:slug" element={<PracticeListPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
