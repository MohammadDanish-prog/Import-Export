import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, Check, Loader2 } from "lucide-react";

const LANGUAGES = [
  { code: "en",    label: "English",    nativeLabel: "English",    flag: "🇬🇧", gtCode: "/en/en" },
  { code: "ar",    label: "Arabic",     nativeLabel: "العربية",    flag: "🇦🇪", gtCode: "/en/ar", dir: "rtl" },
  { code: "hi",    label: "Hindi",      nativeLabel: "हिन्दी",       flag: "🇮🇳", gtCode: "/en/hi" },
  { code: "ur",    label: "Urdu",       nativeLabel: "اردو",        flag: "🇵🇰", gtCode: "/en/ur", dir: "rtl" },
  { code: "ru",    label: "Russian",    nativeLabel: "Русский",     flag: "🇷🇺", gtCode: "/en/ru" },
  { code: "fr",    label: "French",     nativeLabel: "Français",    flag: "🇫🇷", gtCode: "/en/fr" },
  { code: "zh-CN", label: "Chinese",    nativeLabel: "中文",         flag: "🇨🇳", gtCode: "/en/zh-CN" },
  { code: "de",    label: "German",     nativeLabel: "Deutsch",     flag: "🇩🇪", gtCode: "/en/de" },
  { code: "es",    label: "Spanish",    nativeLabel: "Español",     flag: "🇪🇸", gtCode: "/en/es" },
  { code: "tr",    label: "Turkish",    nativeLabel: "Türkçe",      flag: "🇹🇷", gtCode: "/en/tr" },
];

/** Read the current language from the Google Translate cookie */
function getActiveLangCode() {
  try {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (!match) return "en";
    const raw = decodeURIComponent(match[1]);
    return raw;
  } catch {
    return "en";
  }
}

/** Trigger Google Translate to switch language */
function doTranslate(gtCode, isRtl) {
  const isEnglish = gtCode === "/en/en";

  if (isEnglish) {
    // Restore original: clear the cookie and reload
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    window.location.reload();
    return;
  }

  // Set the translation cookie
  const cookieVal = gtCode; // e.g. "/en/ar"
  const host = window.location.hostname;
  const domain = host.includes(".") ? `.${host}` : host;

  document.cookie = `googtrans=${cookieVal}; path=/`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain}`;

  const targetCode = gtCode.replace("/en/", "");

  const applyDirection = () => {
    if (isRtl) {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    document.documentElement.lang = targetCode;
  };

  // Try to trigger via the hidden select element that Google Translate injects
  const trySelect = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = targetCode;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      combo.dispatchEvent(new Event("input", { bubbles: true }));
      applyDirection();
      return true;
    }
    return false;
  };

  if (trySelect()) return;

  let completed = false;
  const maxWait = 1000;

  // Use MutationObserver for faster detection
  const observer = new MutationObserver(() => {
    if (!completed && trySelect()) {
      completed = true;
      observer.disconnect();
      clearTimeout(fallback);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "id"],
  });

  const fallback = setTimeout(() => {
    if (!completed) {
      completed = true;
      observer.disconnect();
      window.location.reload();
    }
  }, maxWait);
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [translating, setTranslating] = useState(false);
  const ref = useRef(null);

  // Sync active lang from cookie on mount
  useEffect(() => {
    const code = getActiveLangCode();
    setActiveLang(code);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback((lang) => {
    setOpen(false);
    if (lang.code === activeLang) return;

    document.documentElement.dir = lang.dir === "rtl" ? "rtl" : "ltr";
    document.documentElement.lang = lang.code;

    setActiveLang(lang.code);
    setTranslating(true);

    try {
      localStorage.setItem("sd-lang", lang.code);
    } catch {
      /* ignore */
    }

    doTranslate(lang.gtCode, lang.dir === "rtl");

    // Clear translating state after a moment
    setTimeout(() => setTranslating(false), 2500);
  }, [activeLang]);

  const current = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-border px-3 h-9 text-foreground/70 transition hover:bg-muted hover:text-foreground"
      >
        {translating
          ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
          : <Globe2 className="h-3.5 w-3.5 shrink-0" />
        }
        <span className="text-[11px] font-semibold uppercase tracking-wide">
          {current.flag} {current.code === "zh-CN" ? "ZH" : current.code.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full mt-2 z-[200] w-52 rounded-2xl border border-border bg-background shadow-card overflow-hidden right-0"
          >
            <div className="px-2 pt-2 pb-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 pb-1.5">
                Select Language
              </p>
            </div>
            <div className="px-1.5 pb-1.5 grid gap-0.5 max-h-[70vh] overflow-y-auto">
              {LANGUAGES.map((l) => {
                const isActive = l.code === activeLang;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleSelect(l)}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition w-full text-left ${
                      isActive
                        ? "bg-brand-soft text-brand font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{l.flag}</span>
                      <span className="leading-none">{l.nativeLabel}</span>
                    </span>
                    {isActive && <Check className="h-3.5 w-3.5 text-brand shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
