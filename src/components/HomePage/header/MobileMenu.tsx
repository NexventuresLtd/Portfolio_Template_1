import React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import type { MobileMenuProps } from "../../../types/HeaderTypes";


const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  activeDropdown,
  onDropdownToggle,
  onClose,
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleDropdownToggle = (itemName: string) => {
    onDropdownToggle(activeDropdown === itemName ? null : itemName);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`lg:hidden ${
        theme === "dark" ? "bg-surface" : "bg-white"
      } border-t ${
        theme === "dark" ? "border-color" : "border-gray-200"
      } shadow-lg`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.name} className="dropdown-container">
            <a
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                theme === "dark"
                  ? "text-primary hover:text-secondary hover:bg-secondary/20"
                  : "text-primary hover:text-accent hover:bg-accent/10"
              }`}
              onClick={(e) => {
                if (item.hasDropdown) {
                  e.preventDefault();
                  handleDropdownToggle(item.name);
                } else {
                  onClose();
                }
              }}
            >
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
            </a>

            {/* Mobile dropdown menu */}
            {item.hasDropdown && activeDropdown === item.name && (
              <div className="pl-4 py-1 space-y-1">
                {item.dropdownItems?.map((dropdownItem) => (
                  <a
                    key={dropdownItem.name}
                    href={dropdownItem.href}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-primary hover:text-secondary hover:bg-secondary/20"
                        : "text-primary hover:text-accent hover:bg-accent/10"
                    }`}
                    onClick={onClose}
                  >
                    {dropdownItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Mobile Language Selector */}
        <LanguageSelector
          isScrolled={true}
          showLanguageDropdown={false}
          onToggleDropdown={() => {}}
          isMobile={true}
        />

        <a
          href="#contact"
          className="block px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded-md text-base font-medium text-center mt-2"
          onClick={onClose}
        >
          {t("navbar.menu.getQuote")}
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
