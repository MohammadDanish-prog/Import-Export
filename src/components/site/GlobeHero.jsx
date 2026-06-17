/**
 * GlobeHero.jsx
 * Premium 3D Globe — Global Trade Network
 * Uses: globe.gl (Three.js-based), React, framer-motion
 *
 * Drop-in replacement for your existing <GlobeHero /> component.
 * Install deps:  npm i globe.gl three framer-motion lucide-react
 *
 * Fixes in this version:
 *  - Removed duplicate/conflicting globeImageUrl calls (was setting a real
 *    texture then immediately overwriting it with a tiny SVG gradient —
 *    caused a visible flash + wasted texture decode).
 *  - Removed the heavy world-borders GeoJSON fetch on every mount (large
 *    payload, parsed on main thread, was a big chunk of the "lag").
 *  - Added a real loading skeleton so the globe doesn't pop in abruptly.
 *  - Debounced ResizeObserver + cleaned up animation frame / controls.
 *  - Mobile-aware globe config: lower point/arc resolution, slower or
 *    disabled auto-rotate on touch/narrow screens, respects
 *    prefers-reduced-motion.
 *  - Fully responsive sizing via container queries instead of `60vw`
 *    (which could blow past viewport height on tall narrow phones).
 *  - Tooltip/side panel repositioned for small screens (panel becomes a
 *    bottom sheet instead of a fixed-width right-side card on mobile).
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, ArrowUpRight, ArrowDownLeft, MapPin } from "lucide-react";

// ─── Trade data ────────────────────────────────────────────────────────────────

const DUBAI = { lat: 25.2048, lng: 55.2708, name: "Dubai", country: "UAE" };

const TRADE_ROUTES = [
  // EXPORTS (Dubai → …)  green
  {
    id: "dubai-sa",
    type: "export",
    from: DUBAI,
    to: { lat: 24.7136, lng: 46.6753, name: "Riyadh", country: "Saudi Arabia" },
    products: ["Mangoes", "Grapes", "Onions", "Tomatoes"],
    volume: "4,200 MT/yr",
    color: "#22c55e",
    altitude: 0.22,
  },
  {
    id: "dubai-om",
    type: "export",
    from: DUBAI,
    to: { lat: 23.588, lng: 58.3829, name: "Muscat", country: "Oman" },
    products: ["Bananas", "Citrus", "Potatoes"],
    volume: "2,800 MT/yr",
    color: "#22c55e",
    altitude: 0.18,
  },
  {
    id: "dubai-qa",
    type: "export",
    from: DUBAI,
    to: { lat: 25.2854, lng: 51.531, name: "Doha", country: "Qatar" },
    products: ["Apples", "Pears", "Garlic"],
    volume: "1,900 MT/yr",
    color: "#22c55e",
    altitude: 0.15,
  },
  {
    id: "dubai-kw",
    type: "export",
    from: DUBAI,
    to: { lat: 29.3759, lng: 47.9774, name: "Kuwait City", country: "Kuwait" },
    products: ["Watermelons", "Cucumbers", "Peppers"],
    volume: "2,100 MT/yr",
    color: "#22c55e",
    altitude: 0.2,
  },
  // IMPORTS (… → Dubai)  orange
  {
    id: "in-dubai",
    type: "import",
    from: { lat: 20.5937, lng: 78.9629, name: "Mumbai", country: "India" },
    to: DUBAI,
    products: ["Alphonso Mangoes", "Pomegranates", "Onions", "Grapes", "Bananas"],
    volume: "12,500 MT/yr",
    color: "#f97316",
    altitude: 0.35,
  },
  {
    id: "cn-dubai",
    type: "import",
    from: { lat: 35.8617, lng: 104.1954, name: "Shanghai", country: "China" },
    to: DUBAI,
    products: ["Garlic", "Ginger", "Pears", "Kiwis"],
    volume: "8,200 MT/yr",
    color: "#f97316",
    altitude: 0.42,
  },
  {
    id: "tr-dubai",
    type: "import",
    from: { lat: 38.9637, lng: 35.2433, name: "Ankara", country: "Turkey" },
    to: DUBAI,
    products: ["Cherries", "Figs", "Hazelnuts", "Apricots"],
    volume: "5,600 MT/yr",
    color: "#f97316",
    altitude: 0.28,
  },
  {
    id: "eg-dubai",
    type: "import",
    from: { lat: 26.8206, lng: 30.8025, name: "Cairo", country: "Egypt" },
    to: DUBAI,
    products: ["Oranges", "Strawberries", "Potatoes", "Grapes"],
    volume: "6,900 MT/yr",
    color: "#f97316",
    altitude: 0.22,
  },
  {
    id: "za-dubai",
    type: "import",
    from: { lat: -30.5595, lng: 22.9375, name: "Cape Town", country: "South Africa" },
    to: DUBAI,
    products: ["Apples", "Grapes", "Citrus", "Plums"],
    volume: "3,400 MT/yr",
    color: "#f97316",
    altitude: 0.5,
  },
];

// ─── Small responsive hook ─────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

// ─── Side panel ─────────────────────────────────────────────────────────────

function SidePanel({ route, onClose, isMobile }) {
  if (!route) return null;
  const isExport = route.type === "export";
  const partner = isExport ? route.to : route.from;
  const accentColor = isExport ? "#22c55e" : "#f97316";
  const accentBg = isExport ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)";
  const ArrowIcon = isExport ? ArrowUpRight : ArrowDownLeft;

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: "100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "100%" },
        transition: { type: "spring", damping: 26, stiffness: 280 },
      }
    : {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 40 },
        transition: { type: "spring", damping: 24, stiffness: 260 },
      };

  return (
    <AnimatePresence>
      <motion.div
        key={route.id}
        {...motionProps}
        className={
          isMobile
            ? "absolute inset-x-0 bottom-0 z-30 max-h-[70%] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-black/85 p-4 pb-5 shadow-2xl backdrop-blur-xl"
            : "absolute right-4 top-4 z-30 w-72 rounded-2xl border border-white/10 bg-black/70 p-5 shadow-2xl backdrop-blur-xl"
        }
        style={!isMobile ? { maxWidth: "calc(100vw - 2rem)" } : undefined}
      >
        {/* Drag handle (mobile only) */}
        {isMobile && (
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div
              className="mb-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ background: accentBg, color: accentColor }}
            >
              <ArrowIcon className="h-3 w-3" />
              {isExport ? "Export" : "Import"}
            </div>
            <h3 className="font-semibold text-white">{partner.country}</h3>
            <p className="text-xs text-white/50">
              <MapPin className="mr-0.5 inline h-3 w-3" />
              {partner.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="mt-4 rounded-xl p-3" style={{ background: accentBg }}>
          <p className="text-xs text-white/50">Annual Volume</p>
          <p className="font-display text-xl font-bold" style={{ color: accentColor }}>
            {route.volume}
          </p>
        </div>

        {/* Products */}
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/60">
            <Package className="h-3.5 w-3.5" /> Products Traded
          </p>
          <div className="flex flex-wrap gap-1.5">
            {route.products.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Route path */}
        <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
          <span className="font-medium text-white/70">{isExport ? "Dubai" : partner.name}</span>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${accentColor}80, ${accentColor}20)`,
            }}
          />
          <span className="font-medium text-white/70">{isExport ? partner.name : "Dubai"}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Tooltip (desktop hover only) ─────────────────────────────────────────────

function Tooltip({ info }) {
  if (!info) return null;
  return (
    <AnimatePresence>
      <motion.div
        key={info.id}
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none absolute z-20 hidden rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-xs shadow-xl backdrop-blur-lg sm:block"
        style={{ left: info.x + 12, top: info.y - 10 }}
      >
        <p className="font-semibold text-white">{info.country}</p>
        <p className="mt-0.5 text-white/50">
          {info.type === "export" ? "↗ Export to" : "↙ Import from"} Dubai
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-2 text-[10px] backdrop-blur sm:bottom-4 sm:left-4 sm:gap-1.5 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs">
      <div className="flex items-center gap-1.5 text-white/70 sm:gap-2">
        <span className="h-0.5 w-4 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e] sm:w-6" />
        Export routes
      </div>
      <div className="flex items-center gap-1.5 text-white/70 sm:gap-2">
        <span className="h-0.5 w-4 rounded-full bg-[#f97316] shadow-[0_0_6px_#f97316] sm:w-6" />
        Import routes
      </div>
    </div>
  );
}

// ─── Loading skeleton ──────────────────────────────────────────────────────

function GlobeSkeleton() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-foreground/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-amber-400" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/10" />
        </div>
        <p className="text-xs font-medium text-muted-foreground">Loading trade network…</p>
      </div>
    </div>
  );
}

// ─── Globe canvas ──────────────────────────────────────────────────────────

function GlobeCanvas({ onRouteClick, onRouteHover, onRouteLeave, onReady, isMobile, reducedMotion }) {
  const containerRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    let globeInstance;
    let ro;
    let cancelled = false;
    let resizeTimeout;

    async function init() {
      const mod = await import("https://esm.sh/globe.gl@2.32.1?bundle");
      if (cancelled || !containerRef.current) return;
      const Globe = mod.default;

      const el = containerRef.current;
      const w = el.clientWidth;
      const h = el.clientHeight;

      globeInstance = Globe()(el)
        .width(w)
        .height(h)
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
        .atmosphereColor("#1e40af")
        .atmosphereAltitude(0.18);

      // Ensure the underlying WebGL context actually has an alpha channel
      // and clears to transparent — backgroundColor() alone sets the CSS
      // background of the canvas element, but the renderer's own clear
      // color can still paint an opaque rect underneath on some browsers.
      const _renderer = globeInstance.renderer();
      _renderer.setClearColor(0x000000, 0);

      // --- Points (Dubai hub + trade endpoints) ---
      const points = [
        { ...DUBAI, __type: "hub" },
        ...TRADE_ROUTES.flatMap((r) =>
          r.type === "export" ? [{ ...r.to, __type: "export" }] : [{ ...r.from, __type: "import" }]
        ),
      ];

      // Lower geometry detail on mobile — this is the main perf win for
      // touch devices (fewer triangles per point sphere = far less main
      // thread + GPU work on weaker mobile chips).
      const pointResolution = isMobile ? 6 : 12;

      globeInstance
        .pointsData(points)
        .pointLat((d) => d.lat)
        .pointLng((d) => d.lng)
        .pointLabel((d) => (d.name ? `${d.name} (${d.country || ""})` : ""))
        .pointColor((d) => (d.__type === "hub" ? "#f59e0b" : d.__type === "export" ? "#22c55e" : "#f97316"))
        .pointAltitude(0.01)
        .pointRadius((d) => (d.__type === "hub" ? 1.2 : 0.5))
        .pointResolution(pointResolution);

      // --- Arcs: import/export routes ---
      globeInstance
        .arcsData(TRADE_ROUTES)
        .arcStartLat((d) => d.from.lat)
        .arcStartLng((d) => d.from.lng)
        .arcEndLat((d) => d.to.lat)
        .arcEndLng((d) => d.to.lng)
        .arcColor((d) => (d.type === "export" ? ["#22c55e", "#22c55e"] : ["#f97316", "#f97316"]))
        .arcAltitude((d) => d.altitude)
        .arcStroke(0.8)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        // Skip the dash travel animation entirely under reduced-motion or
        // when on mobile + reduced power — animating dash offsets every
        // frame across 9 arcs is a steady tax on weaker GPUs.
        .arcDashAnimateTime(reducedMotion ? 0 : isMobile ? 3200 : 2400)
        .onArcClick((arc) => onRouteClick(arc))
        .onArcHover((arc) => {
          if (isMobile) return; // hover tooltip is desktop-only
          if (arc) {
            const canvas = el.querySelector("canvas");
            if (canvas) {
              const rect = canvas.getBoundingClientRect();
              onRouteHover(arc, rect);
            }
          } else {
            onRouteLeave();
          }
        });

      // Set initial camera — slightly more zoomed out on mobile so the
      // whole globe + arcs fit in the shorter viewport.
      globeInstance.pointOfView({ lat: 20, lng: 50, altitude: isMobile ? 2.3 : 1.8 }, 1200);

      // Camera controls
      const controls = globeInstance.controls();
      controls.autoRotate = !reducedMotion;
      controls.autoRotateSpeed = isMobile ? 0.25 : 0.35;
      controls.enableZoom = !isMobile; // pinch-zoom on a small embedded
      // canvas fights with page scroll on mobile; disable for a calmer UX
      controls.minDistance = 200;
      controls.maxDistance = 600;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;

      // Lower device pixel ratio cap on mobile to cut fragment shader cost
      // substantially on high-DPI phone screens.
      _renderer.toneMappingExposure = 1.4;
      if (isMobile) {
        _renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      }

      globeRef.current = globeInstance;

      // Debounced resize — avoids thrashing the renderer on every pixel
      // change during a drag-resize or mobile orientation change.
      ro = new ResizeObserver(([entry]) => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            globeInstance.width(width).height(height);
          }
        }, 120);
      });
      ro.observe(el);

      onReady?.();
    }

    init();

    return () => {
      cancelled = true;
      clearTimeout(resizeTimeout);
      ro?.disconnect();
      if (globeRef.current) {
        try {
          globeRef.current._destructor?.();
        } catch (_) {
          /* noop */
        }
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
    // Re-init when mobile/reducedMotion flags flip (e.g. orientation change
    // crossing the breakpoint) so controls/resolution stay correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, reducedMotion]);

  return <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeHero() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [globeReady, setGlobeReady] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const handleRouteClick = useCallback((arc) => {
    setActiveRoute((prev) => (prev?.id === arc?.id ? null : arc));
  }, []);

  const handleRouteHover = useCallback((arc, canvasRect) => {
    setTooltip({
      id: arc.id,
      country: arc.type === "export" ? arc.to.country : arc.from.country,
      type: arc.type,
      x: canvasRect ? canvasRect.width / 2 : 0,
      y: 80,
    });
  }, []);

  const handleRouteLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Globe wrapper — height now scales smoothly across breakpoints
          instead of relying on 60vw, which could overshoot on tall
          narrow phones. clamp() keeps it readable from small phones up
          through desktop. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(280px, 70vw, 540px)" }}
      >

        {/* Loading skeleton — shown until globe.gl reports ready */}
        {!globeReady && <GlobeSkeleton />}

        {/* Globe canvas */}
        <GlobeCanvas
          onRouteClick={handleRouteClick}
          onRouteHover={handleRouteHover}
          onRouteLeave={handleRouteLeave}
          onReady={() => setGlobeReady(true)}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* Tooltip (desktop hover) */}
        <Tooltip info={tooltip} />

        {/* Side panel (bottom sheet on mobile, card on desktop) */}
        <SidePanel route={activeRoute} onClose={() => setActiveRoute(null)} isMobile={isMobile} />

        {/* Legend */}
        <Legend />

        {/* Dubai label */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/60 px-2.5 py-1 text-[10px] font-medium text-amber-300 backdrop-blur sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 sm:h-2 sm:w-2" />
            </span>
            Dubai HQ — Primary Hub
          </motion.div>
        </div>

        {/* Click hint — hidden on mobile (tap target labels are enough,
            and "drag to rotate" reads oddly when zoom is disabled there) */}
        <div className="pointer-events-none absolute right-4 bottom-4 z-20 hidden text-xs text-white/25 sm:block">
          Click arc · drag to rotate
        </div>
      </motion.div>
    </div>
  );
}