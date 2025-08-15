import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TranslationEditor from "./utils/LanguageChaning";
import RobertConstructionServices from "./pages/Services";
import ScrollToHash from "./hooks/testmoni/ScrollController";
import ContanctUs from "./pages/ContanctUs";
import Projects from "./pages/Projects";
import LoginPage from "./pages/login";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import ProjectForm from "./components/Admin/ProjectForm";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToHash />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/services"
                element={<RobertConstructionServices />}
              />
              <Route path="/contact" element={<ContanctUs />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/langs" element={<TranslationEditor />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/:id/edit" element={<ProjectForm />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              <Route path="*" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
