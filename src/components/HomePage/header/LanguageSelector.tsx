import React from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import type { LanguageCode, LanguageSelectorProps } from "../../../types/HeaderTypes";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isScrolled,
  showLanguageDropdown,
  onToggleDropdown,
  isMobile = false,
}) => {
  const { theme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  // Define available languages with their display names
  const languages = [
    { code: "en" as LanguageCode, name: "English", flag: "🇺🇸" },
    { code: "fr" as LanguageCode, name: "Français", flag: "🇫🇷" },
    { code: "kn" as LanguageCode, name: "Kinyarwanda", flag: "🇷🇼" },
    { code: "sw" as LanguageCode, name: "Swahili", flag: "🇹🇿" },
  ];

  if (isMobile) {
    return (
      <div className="px-3 py-2">
        <label
          className={`text-sm ${
            theme === "dark" ? "text-primary" : "text-primary"
          }`}
        >
          {t("navbar.menu.language")}:
        </label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LanguageCode)}
          className={`ml-2 px-2 py-1 text-sm rounded border ${
            theme === "dark"
              ? "bg-surface border-color text-primary"
              : "bg-white border-gray-300 text-primary"
          }`}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.flag} {language.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="hidden lg:block relative language-selector">
      <button
        onClick={onToggleDropdown}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
          isScrolled
            ? theme === "dark"
              ? "text-primary hover:bg-secondary/20"
              : "text-white hover:bg-accent/20"
            : "text-white hover:bg-white/10"
        }`}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {languages.find((l) => l.code === lang)?.flag}{" "}
          {languages
            .find((l) => l.code === lang)
            ?.name.split("")[0]
            .toUpperCase()}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            showLanguageDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Language Dropdown */}
      {showLanguageDropdown && (
        <div
          className={`absolute top-full right-0 w-48 ${
            theme === "dark" ? "bg-surface" : "bg-white"
          } shadow-xl rounded-lg ${
            theme === "dark" ? "border-color" : "border-gray-200"
          } border py-2 mt-1`}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setLang(language.code);
                onToggleDropdown();
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                lang === language.code
                  ? theme === "dark"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-accent/10 text-accent"
                  : theme === "dark"
                  ? "text-primary hover:bg-secondary/20"
                  : "text-primary hover:bg-accent/10"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
