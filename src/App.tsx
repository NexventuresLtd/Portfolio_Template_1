import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TranslationEditor from "./utils/LanguageChaning";
import RobertConstructionServices from "./pages/Services";
import ScrollToHash from "./hooks/testmoni/ScrollController";
import ContanctUs from "./pages/ContanctUs";
import Projects from "./pages/Projects";
import LoginPage from "./pages/login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
            <ScrollToHash />
          <Routes>
            <Route path="/" element={<HomePage />}  />
            <Route path="/services" element={<RobertConstructionServices />}  />
            <Route path="/admin/login" element={<LoginPage />}  />
            <Route path="/admin/dash" element={<Dashboard />}  />
            <Route path="/contact" element={<ContanctUs />}  />
            <Route path="/project" element={<Projects />}  />
            <Route path="/langs" element={<TranslationEditor />}  />
            <Route path="*" element={<HomePage />}  />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}