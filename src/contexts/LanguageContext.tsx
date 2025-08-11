import { createContext, useState, useContext, type ReactNode, useMemo } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import kn from "../i18n/kn.json";
import sw from "../i18n/sw.json";

type LanguageCode = "en" | "fr" | "kn" | "sw";

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
  t: (key: string) => string; // Always returns string
  getTranslatedArray: (key: string) => string[]; // Separate method for arrays
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<LanguageCode>(() => {
        const savedLang = localStorage.getItem("lang") as LanguageCode | null;
        return savedLang && translations[savedLang] ? savedLang : "en";
    });

    const t = (key: string): string => {
        try {
            const result = key.split('.').reduce((obj: any, part) => {
                return obj?.[part] ?? key; // Return the key as fallback if not found
            }, translations[lang]);

            return typeof result === 'string' ? result : key;
        } catch (error) {
            console.error(`Translation error for key ${key}:`, error);
            return key;
        }
    };

    const getTranslatedArray = (key: string): string[] => {
        try {
            const result = key.split('.').reduce((obj: any, part) => {
                return obj?.[part] ?? []; // Return empty array as fallback
            }, translations[lang]);

            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error(`Translation error for key ${key}:`, error);
            return [];
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
        t,
        getTranslatedArray
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

/**
 * // For simple strings
    const title = t('about.title');

    // For arrays (using the helper)
    const items = getTranslatedArray('about.services.items');

    // Or using t() directly if you need flexibility
    const items = t('about.services.items', { returnObjects: true }); // returns string[]
 */