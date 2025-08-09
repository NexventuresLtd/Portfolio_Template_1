import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useTheme } from "./contexts/ThemeContext";
import { useLanguage } from "./contexts/LanguageContext";

function HomePage() {
  const { theme, toggleTheme, isSystemTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`p-6 min-h-screen transition-colors ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <h1 className="text-2xl font-bold">{t("header.title")}</h1>
      <p>{t("header.subtitle")}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${
            theme === "dark" ? "bg-blue-600" : "bg-blue-500"
          } text-white`}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          {isSystemTheme && " (System)"}
        </button>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
          className="px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="kin">Kinyarwanda</option>
          <option value="sw">Swahili</option>
        </select>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>
    </ThemeProvider>
  );
}