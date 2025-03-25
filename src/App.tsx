import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import Header from "./components/layout/Header";
import IndividualDashboard from "./components/dashboard/IndividualDashboard";
import BranchDashboard from "./components/dashboard/BranchDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ProjectDetail from "./components/projects/ProjectDetail";
import NotificationCenter from "./components/notifications/NotificationCenter";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Header />
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects/:projectId"
              element={
                <ProtectedRoute>
                  <Header />
                  <ProjectDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Header />
                  <NotificationCenter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Header />
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/branch/*"
              element={
                <ProtectedRoute allowedRoles={["branch", "admin"]}>
                  <Header />
                  <BranchDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

// Helper component to render the appropriate dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
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

export default App;
