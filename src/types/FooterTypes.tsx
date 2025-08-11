// Footer component types
export interface CompanyInfoProps {
  companyName: string;
  tagline: string;
}

export interface QuickLinksProps {
  title: string;
  links: { name: string; href: string; isExternal?: boolean }[];
}

export interface ContactInfoProps {
  theme: "light" | "dark";
  t: (key: string) => string;
}

export interface SocialMediaLinksProps {
  theme: "light" | "dark";
  t: (key: string) => string;
}

export interface NewsletterProps {
  theme: "light" | "dark";
  t: (key: string) => string;
}

export interface BackToTopButtonProps {
  showBackToTop: boolean;
  theme: "light" | "dark";
  onClick: () => void;
}

export interface FooterBottomBarProps {
  theme: "light" | "dark";
  t: (key: string) => string;
  legalLinks: { name: string; href: string }[];
}

// Social media link type
export interface SocialLink {
  platform: string;
  href: string;
  color: string;
}

// Footer link type
export interface FooterLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

// Contact information type
export interface ContactInfo {
  phone: string;
  phoneLink: string;
  email: string;
  emailLink: string;
  address: {
    street: string;
    city: string;
  };
}
