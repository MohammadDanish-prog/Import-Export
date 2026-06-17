import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/markets", label: "Markets" },
  { to: "/services", label: "Services" },
  { to: "/cost-estimator", label: "Cost Estimator" },
  { to: "/quality", label: "Quality" },
 // { to: "/gallery", label: "Gallery" },
  { to: "/invest", label: "Invest" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Logo: leaf SVG instead of Lucide icon */}
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-elevated">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-foreground">Swapnil Dinesh</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Fresh Produce Trading
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors whitespace-nowrap ${
                  active ? "text-brand" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleDark}
            className="hidden md:grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:text-foreground hover:bg-muted transition"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift"
          >
            Request Quote
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden border-t border-border glass"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 grid gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === item.to
                      ? "bg-brand-soft text-brand"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
