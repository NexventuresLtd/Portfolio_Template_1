export interface NavItemType {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

export interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItemType[];
  activeDropdown: string | null;
  onDropdownToggle: (itemName: string | null) => void;
  onClose: () => void;
}

export interface LogoProps {
  isScrolled: boolean;
}

export interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

export interface ThemeToggleProps {
  isScrolled: boolean;
}

export interface NavItemType {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

export interface NavLinksProps {
  navItems: NavItemType[];
  isScrolled: boolean;
  activeDropdown: string | null;
  windowWidth: number;
  onDropdownToggle: (itemName: string | null) => void;
}


export interface NavItemProps {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
  isScrolled: boolean;
  activeDropdown: string | null;
  windowWidth: number;
  onDropdownToggle: (itemName: string) => void;
}

export type LanguageCode = "en" | "fr" | "kn" | "sw";

export interface LanguageSelectorProps {
  isScrolled: boolean;
  showLanguageDropdown: boolean;
  onToggleDropdown: () => void;
  isMobile?: boolean;
}


export interface DropdownMenuProps {
  items: { name: string; href: string }[];
  isVisible: boolean;
}