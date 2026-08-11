import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import Companies from "../pages/admin/Companies";
import CRM from "../pages/admin/CRM";
import ColdEmails from "../pages/admin/ColdEmails";
import PlacementDrives from "../pages/admin/PlacementDrives";
import Students from "../pages/admin/Students";
import InterviewQueue from "../pages/admin/InterviewQueue";
import History from "../pages/admin/History";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

import AdminLayout from "../layouts/AdminLayout";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/companies"
          element={<Companies />}
        />

        <Route
          path="/admin/crm"
          element={<CRM />}
        />

        <Route
          path="/admin/cold-emails"
          element={<ColdEmails />}
        />

        <Route
          path="/admin/drives"
          element={<PlacementDrives />}
        />

        <Route
          path="/admin/students"
          element={<Students />}
        />

        <Route
          path="/admin/interviews"
          element={<InterviewQueue />}
        />

        <Route
          path="/admin/history"
          element={<History />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Route>

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

    </Routes>
  );
}
