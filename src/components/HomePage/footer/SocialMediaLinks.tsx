import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "../../../constants/footer";
import type { SocialMediaLinksProps } from "../../../types/FooterTypes";

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ theme, t }) => {
  const iconMap = {
    Facebook: Facebook,
    Instagram: Instagram,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Twitter: Twitter,
  };

  return (
    <div className="mt-8">
      <p className="text-slate-100 text-sm mb-4">{t("footer.social")}</p>
      <div className="flex space-x-4">
        {SOCIAL_LINKS.map((social, index) => {
          const Icon = iconMap[social.platform as keyof typeof iconMap];
          return (
            <a
              key={index}
              href={social.href}
              aria-label={social.platform}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                theme === "dark"
                  ? "bg-surface border border-color hover:border-accent/50"
                  : "hover:shadow-lg"
              }`}
              style={{ "--hover-color": social.color } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = social.color + "20";
                e.currentTarget.style.borderColor = social.color + "50";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <Icon className="w-5 h-5 text-slate-100 hover:text-slate-200" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
