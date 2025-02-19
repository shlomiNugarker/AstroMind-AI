import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AdminUsers from "./pages/AdminUsers.tsx";
import MyTrainees from "./pages/MyTrainees.tsx";
import Home from "./pages/Home.tsx";
import Trainee from "./pages/Trainee.tsx";

const AppRoutes = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir =
      i18n.language === "he" || i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["coach"]} />}>
          <Route path="/coach-dashboard" element={<Dashboard />} />
          <Route path="/my-trainees" element={<MyTrainees />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["trainee"]} />}>
          <Route path="/trainees-dashboard" element={<Trainee />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
