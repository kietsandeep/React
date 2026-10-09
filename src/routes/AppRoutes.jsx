import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import TopicPage from "@/pages/Topic/TopicPage";
import PlaceholderPage from "@/pages/Placeholder/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="topics/:slug" element={<TopicPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}
