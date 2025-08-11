import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import type { DropdownMenuProps } from "../../../types/HeaderTypes";


const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isVisible }) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <div
      className={`absolute top-full left-0 w-56 ${
        theme === "dark" ? "bg-surface" : "bg-white"
      } shadow-xl rounded-lg ${
        theme === "dark" ? "border-color" : "border-gray-200"
      } border py-2 mt-1`}
    >
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
            theme === "dark"
              ? "text-primary hover:bg-secondary hover:text-secondary"
              : "text-secondary hover:bg-accent hover:text-accent"
          }`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default DropdownMenu;
