import { createContext, useState, useContext, type ReactNode } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import kin from "../i18n/kn.json";
import sw from "../i18n/sw.json";

type Languages = "en" | "fr" | "kin" | "sw";
type Translations = typeof en;

const translations: Record<Languages, Translations> = { en, fr, kin, sw };

interface LanguageContextType {
  lang: Languages;
  setLang: (lang: Languages) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Languages>(
    (localStorage.getItem("lang") as Languages) || "en"
  );

  const t = (key: string) => {
    return key
      .split(".")
      .reduce((o: any, k) => (o && o[k] !== undefined ? o[k] : ""), translations[lang]) as string;
  };

  const changeLang = (newLang: Languages) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
