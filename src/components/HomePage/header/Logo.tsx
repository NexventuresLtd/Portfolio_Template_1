import React from "react";
import { Building2 } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import type { LogoProps } from "../../../types/HeaderTypes";



const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex-shrink-0 flex items-center">
      <Building2
        className={`h-8 w-8 ${
          isScrolled
            ? theme === "dark"
              ? "text-secondary"
              : "text-accent"
            : "text-white"
        }`}
      />
      <span
        className={`ml-2 text-xl font-bold ${
          isScrolled
            ? theme === "dark"
              ? "text-primary"
              : "text-white"
            : "text-white"
        }`}
      >
        {t("navbar.companyName")}
      </span>
    </div>
  );
};

export default Logo;
