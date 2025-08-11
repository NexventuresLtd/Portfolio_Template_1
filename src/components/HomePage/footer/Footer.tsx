import React, { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  createFooterLinks,
  BACK_TO_TOP_THRESHOLD,
} from "../../../constants/footer";
import CompanyInfo from "./CompanyInfo";
import QuickLinks from "./QuickLinks";
import ContactInfo from "./ContactInfo";
import Newsletter from "./Newsletter";
import BackToTopButton from "./BackToTopButton";
import FooterBottomBar from "./FooterBottomBar";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > BACK_TO_TOP_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { companyLinks, legalLinks } = createFooterLinks(t);

  return (
    <footer
      className={`relative transition-colors duration-300 ${
        theme === "dark" ? "dark bg-surface" : "light bg-primary"
      }`}
    >
      {/* Back to Top Button */}
      <BackToTopButton
        showBackToTop={showBackToTop}
        theme={theme}
        onClick={scrollToTop}
      />

      {/* Main Footer Content */}
      <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12 ">
          {/* Company Info */}
          <CompanyInfo
            companyName={t("footer.companyName")}
            tagline={t("footer.tagline")}
          />

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:col-span-2 w-full">
            <QuickLinks
              title={t("footer.sections.company")}
              links={companyLinks}
            />
            <ContactInfo theme={theme} t={t} />
          </div>

          {/* Contact & Newsletter */}
          <Newsletter theme={theme} t={t} />
        </div>
      </div>

      {/* Bottom Bar */}
      <FooterBottomBar theme={theme} t={t} legalLinks={legalLinks} />
    </footer>
  );
};

export default Footer;
