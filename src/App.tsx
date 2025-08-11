import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} errorElement={"ss"}/>
        </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}