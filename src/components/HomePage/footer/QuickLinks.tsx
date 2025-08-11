import React from "react";
import { ExternalLink } from "lucide-react";
import type { QuickLinksProps } from "../../../types/FooterTypes";

const QuickLinks: React.FC<QuickLinksProps> = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-bold text-slate-200 mb-6">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className={`flex items-center text-slate-200 hover:text-accent transition-colors duration-200 group ${
              link.isExternal ? "hover:translate-x-1" : ""
            }`}
            target={link.isExternal ? "_blank" : "_self"}
            rel={link.isExternal ? "noopener noreferrer" : ""}
          >
            <span>{link.name}</span>
            {link.isExternal && (
              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default QuickLinks;
