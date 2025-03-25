import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import IndividualDashboard from "./components/dashboard/IndividualDashboard";
import BranchDashboard from "./components/dashboard/BranchDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ProjectDetail from "./components/projects/ProjectDetail";
import NotificationCenter from "./components/notifications/NotificationCenter";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./components/auth/AuthContext";

const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  // Helper function to render the appropriate dashboard based on user role
  const DashboardRouter = () => {
    if (!isLoggedIn || !user) {
      return <Navigate to="/" />;
    }

    switch (user.role) {
      case "individual":
        return <IndividualDashboard userName={user.userName} />;
      case "branch":
        return <BranchDashboard branchName={`${user.userName}'s Branch`} />;
      case "admin":
        return <AdminDashboard userName={user.userName} />;
      default:
        return <IndividualDashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/branch/*"
        element={
          <ProtectedRoute allowedRoles={["branch", "admin"]}>
            <BranchDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
