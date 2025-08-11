import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import SocialMediaLinks from "./SocialMediaLinks";
import type { NewsletterProps } from "../../../types/FooterTypes";

const Newsletter: React.FC<NewsletterProps> = ({ theme, t }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-200 mb-4">
        {t("footer.newsletter.title")}
      </h3>
      <p className="text-slate-100 mb-6 leading-relaxed">
        {t("footer.newsletter.description")}
      </p>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.newsletter.placeholder")}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-surface border-color text-slate-200 placeholder-secondary/60 focus:border-accent"
                  : "border-gray-500 text-slate-200 placeholder-secondary/60 focus:border-accent"
              } focus:outline-none focus:ring-2 focus:ring-accent/20`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              theme === "dark"
                ? "bg-primary text-white hover:bg-accent-hover"
                : "bg-secondary text-white hover:bg-accent-hover"
            } hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <span>{t("footer.newsletter.button")}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
      ) : (
        <div
          className={`p-4 rounded-lg text-center ${
            theme === "dark" ? "bg-success/20" : "bg-success/10"
          }`}
        >
          <div className="text-success text-2xl mb-2">✓</div>
          <p className="text-success font-semibold">
            {t("footer.newsletter.success.title")}
          </p>
          <p className="text-slate-100 text-sm mt-1">
            {t("footer.newsletter.success.message")}
          </p>
        </div>
      )}

      {/* Social Media Links */}
      <SocialMediaLinks theme={theme} t={t} />
    </div>
  );
};

export default Newsletter;
