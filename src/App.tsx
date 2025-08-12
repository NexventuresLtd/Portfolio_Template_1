import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TranslationEditor from "./utils/LanguageChaning";
import RobertConstructionServices from "./pages/Services";
import ScrollToHash from "./hooks/testmoni/ScrollController";
import ContanctUs from "./pages/ContanctUs";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
            <ScrollToHash />
          <Routes>
            <Route path="/" element={<HomePage />} errorElement={"ss"} />
            <Route path="/services" element={<RobertConstructionServices />} errorElement={"ss"} />
            <Route path="/contact" element={<ContanctUs />} errorElement={"ss"} />
            <Route path="/project" element={<Projects />} errorElement={"ss"} />
            <Route path="/langs" element={<TranslationEditor />} errorElement={"ss"} />
            <Route path="*" element={<HomePage />} errorElement={"ss"} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}