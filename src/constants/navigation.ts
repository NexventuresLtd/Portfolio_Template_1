import type { NavItem } from "../types/HeaderTypes";

export const createNavItems = (t: (key: string) => string): NavItem[] => [
  { name: t("navbar.menu.home"), href: "/home" },
  {
    name: t("navbar.menu.services"),
    href: "/services",
    hasDropdown: false,
    dropdownItems: [
      { name: t("navbar.menu.residential"), href: "#residential" },
      { name: t("navbar.menu.commercial"), href: "#commercial" },
      { name: t("navbar.menu.renovations"), href: "#renovations" },
      { name: t("navbar.menu.management"), href: "#management" },
    ],
  },
  { name: t("navbar.menu.projects"), href: "#projects" },
  { name: t("navbar.menu.about"), href: "#about" },
  { name: t("navbar.menu.testimonials"), href: "#testimonials" },
  { name: t("navbar.menu.contact"), href: "#contact" },
];

// You can also add other navigation-related constants here
export const SCROLL_THRESHOLD = 50;
export const DESKTOP_BREAKPOINT = 768;
