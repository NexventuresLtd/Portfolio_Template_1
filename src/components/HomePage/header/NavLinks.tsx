import React from "react";
import NavItem from "./NavItem";
import type { NavLinksProps } from "../../../types/HeaderTypes";


const NavLinks: React.FC<NavLinksProps> = ({
  navItems,
  isScrolled,
  activeDropdown,
  windowWidth,
  onDropdownToggle,
}) => {
  const handleDropdownToggle = (itemName: string) => {
    onDropdownToggle(activeDropdown === itemName ? null : itemName);
  };

  return (
    <div className="hidden lg:block">
      <div className="flex items-baseline lg:space-x-0">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            href={item.href}
            hasDropdown={item.hasDropdown}
            dropdownItems={item.dropdownItems}
            isScrolled={isScrolled}
            activeDropdown={activeDropdown}
            windowWidth={windowWidth}
            onDropdownToggle={handleDropdownToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
