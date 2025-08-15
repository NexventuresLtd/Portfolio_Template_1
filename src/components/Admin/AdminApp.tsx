import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminInsights } from "./pages/AdminInsights";
import { AdminProjects } from "./pages/AdminProjects";
import { AdminProjectForm } from "./pages/AdminProjectForm";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const AdminApp: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/admin/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/insights" element={<AdminInsights />} />
                    <Route path="/projects" element={<AdminProjects />} />
                    <Route
                      path="/projects/new"
                      element={<AdminProjectForm />}
                    />
                    <Route
                      path="/projects/edit/:id"
                      element={<AdminProjectForm />}
                    />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AdminProvider>
  );
};
