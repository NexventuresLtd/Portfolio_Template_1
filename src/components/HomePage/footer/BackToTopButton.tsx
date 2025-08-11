import React from "react";
import { ChevronUp } from "lucide-react";
import type { BackToTopButtonProps } from "../../../types";

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  showBackToTop,
  theme,
  onClick,
}) => {
  if (!showBackToTop) return null;

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
        theme === "dark" ? "bg-accent text-white" : "bg-accent text-white"
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;
