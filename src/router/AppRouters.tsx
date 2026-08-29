import MainLayout from "@/layouts/MainLayout";
import Profile from "@/pages/Profile";
import TodoPage from "@/pages/TodoPage";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/todo" replace />} />
        <Route path="todo" element={<TodoPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRouters;
