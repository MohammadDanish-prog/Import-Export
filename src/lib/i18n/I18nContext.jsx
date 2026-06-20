import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LANGUAGES, translations, t as translateFn } from "./translations";

const STORAGE_KEY = "sd-lang";
const DEFAULT_LANG = "en";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGUAGES.find((l) => l.code === stored)) return stored;
    } catch {}
    // Auto-detect from browser
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang && LANGUAGES.find((l) => l.code === browserLang)) return browserLang;
    return DEFAULT_LANG;
  });

  const currentLanguage = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Apply dir + lang to <html>
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = currentLanguage.dir;
  }, [lang, currentLanguage]);

  const setLang = useCallback((code) => {
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  }, []);

  // Shorthand translate function bound to current lang
  const t = useCallback(
    (path) => translateFn(path, lang),
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, languages: LANGUAGES, currentLanguage, dir: currentLanguage.dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
