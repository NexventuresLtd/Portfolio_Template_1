import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT_INFO } from "../../../constants/footer";
import type { ContactInfoProps } from "../../../types/FooterTypes";

const ContactInfo: React.FC<ContactInfoProps> = ({ theme, t }) => (
  <div>
    <h3 className="text-lg font-bold text-slate-200 mb-6">
      {t("footer.sections.contact")}
    </h3>
    <div className="space-y-4">
      <div className="flex items-start">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
            theme === "dark" ? "bg-accent/20" : "bg-accent text-white"
          }`}
        >
          <Phone className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-slate-100 text-sm mb-1">
            {t("footer.contact.phone")}
          </p>
          <a
            href={CONTACT_INFO.phoneLink}
            className="text-slate-200 text-sm hover:text-accent transition-colors"
          >
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
            theme === "dark" ? "bg-accent/20" : "bg-accent text-white"
          }`}
        >
          <Mail className="w-15 h-5 text-accent" />
        </div>
        <div>
          <p className="text-slate-100 text-sm mb-1">
            {t("footer.contact.email")}
          </p>
          <a
            href={CONTACT_INFO.emailLink}
            className="text-slate-200 text-sm hover:text-accent transition-colors"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>

      <div className="flex items-start">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
            theme === "dark" ? "bg-accent/20" : "bg-accent text-white"
          }`}
        >
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-slate-100 text-sm mb-1">
            {t("footer.contact.location")}
          </p>
          <p className="text-slate-200 text-sm">
            {CONTACT_INFO.address.street}
            <br />
            {CONTACT_INFO.address.city}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
            theme === "dark" ? "bg-secondary/20" : "bg-accent"
          }`}
        >
          <Clock className="w-5 h-5 text-slate-100" />
        </div>
        <div>
          <p className="text-slate-100 text-sm mb-1">
            {t("footer.contact.hours")}
          </p>
          <p className="text-slate-200 text-sm">
            {t("footer.contact.hoursDetail")
              .split("\n")
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfo;
