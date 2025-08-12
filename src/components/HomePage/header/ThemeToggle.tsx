import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import type { ThemeToggleProps } from "../../../types/HeaderTypes";


const ThemeToggle: React.FC<ThemeToggleProps> = ({ isScrolled }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isScrolled
          ? theme === "dark"
            ? "text-accent hover:bg-secondary/20"
            : "text-accent hover:bg-accent/20"
          : "text-accent hover:bg-white/10"
      }`}
      aria-label={`Toggle theme, current mode: ${theme}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
