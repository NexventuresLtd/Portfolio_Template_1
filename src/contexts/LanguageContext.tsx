import { createContext, useState, useContext, type ReactNode, useMemo } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import kn from "../i18n/kn.json";
import sw from "../i18n/sw.json";

// Define supported languages (note: "kin" should match your file naming)
type LanguageCode = "en" | "fr" | "kn" | "sw";

// Infer translation structure from your JSON files
// type TranslationKeys = keyof typeof en;
type NestedTranslation<T> = T extends object ? { [K in keyof T]: NestedTranslation<T[K]> } : string;
type TranslationStructure = NestedTranslation<typeof en>;

const translations: Record<LanguageCode, TranslationStructure> = { 
  en, 
  fr, 
  kn, 
  sw 
};

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>(() => {
    const savedLang = localStorage.getItem("lang") as LanguageCode | null;
    return savedLang && translations[savedLang] ? savedLang : "en";
  });

  const t = (key: string) => {
    try {
      return key.split('.').reduce((obj, part) => {
        if (obj && typeof obj === 'object' && part in obj) {
          return (obj as any)[part];
        }
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key as fallback
      }, translations[lang] as any) as string;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return key;
    }
  };

  const value = useMemo(() => ({
    lang,
    setLang: (newLang: LanguageCode) => {
      if (translations[newLang]) {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
      } else {
        console.warn(`Attempted to set unsupported language: ${newLang}`);
      }
    },
    t
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};