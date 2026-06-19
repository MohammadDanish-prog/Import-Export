import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/markets", label: "Markets" },
//  { to: "/services", label: "Services" },
  { to: "/quality", label: "Quality" },
 // { to: "/invest", label: "Invest" },
  { to: "/contact", label: "Contact" },
];

const LeafLogo = () => (
  <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-brand-foreground shadow-elevated ring-1 ring-inset ring-white/15">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  </span>
);

/**
 * Desktop pill navigation — GSAP fill/label-swap animation on hover,
 * built entirely with Tailwind classes (no separate CSS file).
 * Only ever mounted at lg+ widths; mobile uses the hamburger drawer below.
 */
const PILL_ITEMS = [...NAV, { to: "/contact", label: "Request Quote", cta: true }];

function PillLinks({ pathname }) {
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (!w || !h) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: "power3.easeOut", overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: "power3.easeOut", overwrite: "auto" }, 0);
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: "power3.easeOut", overwrite: "auto" }, 0);
        }
        tlRefs.current[i] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, []);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: "power3.easeOut", overwrite: "auto" });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: "power3.easeOut", overwrite: "auto" });
  };

  return (
    <ul className="flex items-stretch gap-[3px] p-[3px]" role="menubar">
      {PILL_ITEMS.map((item, i) => {
        const active = pathname === item.to;
        return (
          <li key={item.to + item.label} role="none" className="flex">
            <Link
              role="menuitem"
              to={item.to}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              className={`relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors ${
                active ? "after:absolute after:bottom-[-6px] after:left-1/2 after:h-[5px] after:w-[5px] after:-translate-x-1/2 after:rounded-full after:bg-brand after:content-['']" : ""
              }`}
            >
              <span
                aria-hidden="true"
                ref={(el) => (circleRefs.current[i] = el)}
                className="pointer-events-none absolute bottom-0 left-1/2 z-[1] rounded-full bg-brand will-change-transform"
              />
              <span className="relative z-[2] inline-block leading-none">
                <span className="pill-label relative z-[2] inline-block leading-none will-change-transform">
                  {item.label}
                </span>
                <span className="pill-label-hover absolute left-0 top-0 z-[3] inline-block leading-none text-brand-foreground will-change-transform">
                  {item.label}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 md:px-8 ${
          scrolled ? "py-2.5" : "py-3 md:py-4"
        }`}
      >
        <Link to="/" className="flex shrink-0 items-center gap-2.5 group">
          <LeafLogo />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-bold text-foreground">Swapnil Dinesh</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Fresh Produce Trading
            </span>
          </span>
        </Link>

        {/* Desktop pill nav — only this section needs lg+ width */}
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <div className="flex items-center rounded-full bg-foreground/5">
            <PillLinks pathname={pathname} />
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleDark}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:bg-muted hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-border glass lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      pathname === item.to
                        ? "bg-brand-soft text-brand"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {/* CTA repeated here since the desktop pill nav (with its own
                  Request Quote pill) is hidden below lg: */}
              <Link
                to="/contact"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      pathname === "/contact"
                        ? "bg-brand-soft text-brand"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}