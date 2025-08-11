import React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import DropdownMenu from "./DropdownMenu";
import type { NavItemProps } from "../../../types/HeaderTypes";


const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  hasDropdown,
  dropdownItems,
  isScrolled,
  activeDropdown,
  windowWidth,
  onDropdownToggle,
}) => {
  const { theme } = useTheme();
  const isDropdownActive = activeDropdown === name;

  return (
    <div
      className="relative dropdown-container"
      onMouseEnter={() => {
        if (windowWidth > 768 && hasDropdown) {
          onDropdownToggle(name);
        }
      }}
    >
      <a
        href={href}
        className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
          isScrolled
            ? theme === "dark"
              ? "text-primary hover:bg-primary"
              : "text-white hover:bg-primary"
            : "text-white hover:bg-primary"
        }`}
        onClick={() =>
          windowWidth < 768 && hasDropdown && onDropdownToggle(name)
        }
      >
        <span>{name}</span>
        {hasDropdown && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isDropdownActive ? "rotate-180" : ""
            }`}
          />
        )}
      </a>

      {hasDropdown && dropdownItems && (
        <DropdownMenu items={dropdownItems} isVisible={isDropdownActive} />
      )}
    </div>
  );
};

export default NavItem;
