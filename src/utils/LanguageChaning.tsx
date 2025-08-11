import { useState } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import sw from "../i18n/sw.json";
import kn from "../i18n/kn.json";

const filesMap: Record<string, any> = {
  en: en,
  fr: fr,
  sw: sw,
  kn: kn,
};

export default function TranslationEditor() {
  const [activeLang, setActiveLang] = useState<keyof typeof filesMap>("en");
  const [content, setContent] = useState<Record<string, any>>(filesMap);

  // Handle value change
  const handleChange = (lang: string, keyPath: string[], value: string) => {
    setContent((prev) => {
      const updated = structuredClone(prev);
      let obj = updated[lang];
      for (let i = 0; i < keyPath.length - 1; i++) {
        obj = obj[keyPath[i]];
      }
      obj[keyPath[keyPath.length - 1]] = value;
      return updated;
    });
  };

  // Recursive render for nested JSON
  const renderFields = (lang: string, obj: any, path: string[] = []) => {
    return Object.entries(obj).map(([key, val]) => {
      const currentPath = [...path, key];
      if (typeof val === "object" && val !== null) {
        return (
          <div key={currentPath.join(".")} className="pl-4 border-l border-gray-300 my-2">
            <h3 className="font-semibold text-gray-700">{key}</h3>
            {renderFields(lang, val, currentPath)}
          </div>
        );
      }
      return (
        <div key={currentPath.join(".")} className="flex items-center gap-2 mb-2">
          <label className="w-48 text-sm font-medium">{currentPath.join(" → ")}</label>
          <input
            type="text"
            value={String(val)}
            onChange={(e) => handleChange(lang, currentPath, e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-200"
          />
        </div>
      );
    });
  };

  // Save changes (currently logs to console)
  const handleSave = () => {
    console.log("Updated content for", activeLang, content[activeLang]);
    alert(`Changes for "${activeLang}" saved locally (console logged).`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {Object.keys(filesMap).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang as keyof typeof filesMap)}
            className={`px-4 py-2 -mb-px font-medium ${
              activeLang === lang
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="bg-white shadow rounded-lg p-4">
        {renderFields(activeLang, content[activeLang])}
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
