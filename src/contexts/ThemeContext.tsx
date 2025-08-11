import { createContext, useState, useContext, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): { theme: Theme; isSystemTheme: boolean } {
  if (typeof window === "undefined") {
    return { theme: "light", isSystemTheme: true };
  }

  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme) {
    return { theme: savedTheme, isSystemTheme: false };
  }

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return { theme: systemDark ? "dark" : "light", isSystemTheme: true };
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme: initialTheme, isSystemTheme: initialSystem } = getInitialTheme();
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isSystemTheme, setIsSystemTheme] = useState(initialSystem);

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    if (!isSystemTheme) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme, isSystemTheme]);

  // Listen for system changes only when following system
  useEffect(() => {
    if (!isSystemTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [isSystemTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
    setIsSystemTheme(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
