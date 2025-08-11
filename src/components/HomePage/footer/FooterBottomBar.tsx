import React from "react";
import { Code } from "lucide-react";
import type { FooterBottomBarProps } from "../../../types/FooterTypes";

const FooterBottomBar: React.FC<FooterBottomBarProps> = ({
  theme,
  t,
  legalLinks,
}) => {
  return (
    <div
      className={` ${
        theme === "dark"
          ? "border-color bg-background"
          : "border-color bg-gray-800"
      }`}
    >
      <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-slate-100 text-sm text-center md:text-left">
              {t("footer.legal.copyright")}
            </p>
            <div className="flex items-center space-x-4">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-slate-100 hover:text-accent text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div
            className="flex items-center text-slate-100 text-sm cursor-pointer"
            onClick={() =>
              (window.location.href = "https://www.nexventures.net")
            }
          >
            <span>{t("footer.developer")}</span>
            <Code className="w-4 h-4 mx-1 text-accent" />
            <span className="font-bold text-amber-700">NexVenture</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottomBar;
