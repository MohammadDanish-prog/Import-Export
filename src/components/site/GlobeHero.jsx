/**
 * GlobeHero.jsx
 * Premium 3D Globe — Global Trade Network
 * Uses: globe.gl (Three.js-based), React, framer-motion
 *
 * Drop-in replacement for your existing <GlobeHero /> component.
 * Install deps:  npm i globe.gl three framer-motion lucide-react
 */

import { useEffect, useRef, useState, useCallback, Suspense, lazy } from "react";
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
    to: { lat: 23.5880, lng: 58.3829, name: "Muscat", country: "Oman" },
    products: ["Bananas", "Citrus", "Potatoes"],
    volume: "2,800 MT/yr",
    color: "#22c55e",
    altitude: 0.18,
  },
  {
    id: "dubai-qa",
    type: "export",
    from: DUBAI,
    to: { lat: 25.2854, lng: 51.5310, name: "Doha", country: "Qatar" },
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

// ─── Side panel ─────────────────────────────────────────────────────────────

function SidePanel({ route, onClose }) {
  if (!route) return null;
  const isExport = route.type === "export";
  const partner = isExport ? route.to : route.from;
  const accentColor = isExport ? "#22c55e" : "#f97316";
  const accentBg = isExport ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)";
  const ArrowIcon = isExport ? ArrowUpRight : ArrowDownLeft;

  return (
    <AnimatePresence>
      <motion.div
        key={route.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ type: "spring", damping: 24, stiffness: 260 }}
        className="absolute right-4 top-4 z-30 w-72 rounded-2xl border border-white/10 bg-black/70 p-5 shadow-2xl backdrop-blur-xl"
        style={{ maxWidth: "calc(100vw - 2rem)" }}
      >
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
          <span className="font-medium text-white/70">
            {isExport ? "Dubai" : partner.name}
          </span>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${accentColor}80, ${accentColor}20)`,
            }}
          />
          <span className="font-medium text-white/70">
            {isExport ? partner.name : "Dubai"}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

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
        className="pointer-events-none absolute z-20 rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-xs shadow-xl backdrop-blur-lg"
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
    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-xs backdrop-blur">
      <div className="flex items-center gap-2 text-white/70">
        <span className="h-0.5 w-6 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />
        Export routes
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <span className="h-0.5 w-6 rounded-full bg-[#f97316] shadow-[0_0_6px_#f97316]" />
        Import routes
      </div>
    </div>
  );
}

// ─── Main Globe component ─────────────────────────────────────────────────────

function GlobeCanvas({ onRouteClick, onRouteHover, onRouteLeave }) {
  const containerRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    let Globe, globeInstance, rafId, angle = 0;

    async function init() {
      // Dynamic import for code splitting
      const mod = await import("https://esm.sh/globe.gl@2.32.1?bundle");
      Globe = mod.default;

      if (!containerRef.current) return;

      const el = containerRef.current;
      const w = el.clientWidth;
      const h = el.clientHeight;

          globeInstance = Globe()(el)
            .width(w)
            .height(h)
            .backgroundColor("#050816")
            .globeImageUrl(
              "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            )
            .bumpImageUrl(
              "https://unpkg.com/three-globe/example/img/earth-topology.png"
            )
            .atmosphereColor("#1e40af")
            .atmosphereAltitude(0.18)
            // Use a green SVG texture for the globe surface and disable atmosphere
            globeInstance.globeImageUrl('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%2308170b"/><stop offset="1" stop-color="%2316a34a"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/></svg>');
            globeInstance.atmosphereAltitude(0);

            // Load GeoJSON and render country borders using Globe.gl's polygons API
            const loadCountryBorders = async () => {
              try {
                const res = await fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
                if (!res.ok) throw new Error("Failed to fetch country geojson");
                const geo = await res.json();

                globeInstance.polygonsData(geo.features)
                  .polygonCapColor(() => "rgba(0,0,0,0)")
                  .polygonSideColor(() => "rgba(0,0,0,0)")
                  .polygonStrokeColor(() => "#ffffff")
                  .polygonAltitude(() => 0.001)
                  .polygonLabel((d) => (d.properties && (d.properties.name || d.properties.NAME)) || "")
                  .polygonTransitionDuration(300);
              } catch (e) {
                console.warn("Country borders load failed:", e);
              }
            };

            loadCountryBorders();

            // --- Points (Dubai hub + trade endpoints) ---
            const points = [
              { ...DUBAI, __type: "hub" },
              ...TRADE_ROUTES.flatMap((r) => (r.type === "export" ? [{ ...r.to, __type: "export" }] : [{ ...r.from, __type: "import" }]))
            ];

            globeInstance
              .pointsData(points)
              .pointLat((d) => d.lat)
              .pointLng((d) => d.lng)
              .pointLabel((d) => (d.name ? `${d.name} (${d.country || ""})` : ""))
              .pointColor((d) => (d.__type === "hub" ? "#f59e0b" : d.__type === "export" ? "#22c55e" : "#f97316"))
              .pointAltitude(0.01)
              .pointRadius((d) => (d.__type === "hub" ? 1.2 : 0.5))
              .pointResolution(12);

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
              .arcDashAnimateTime(2400)
              .onArcClick((arc) => onRouteClick(arc))
              .onArcHover((arc, prev) => {
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

            // Make country borders green-toned
            globeInstance.polygonStrokeColor(() => "#16a34a");

      // Set initial camera
      globeInstance.pointOfView({ lat: 20, lng: 50, altitude: 1.8 }, 1500);

      // Camera controls
      const controls = globeInstance.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableZoom = true;
      controls.minDistance = 200;
      controls.maxDistance = 600;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;

      // Add bloom-like glow via renderer exposure
      const renderer = globeInstance.renderer();
      renderer.toneMappingExposure = 1.4;

      globeRef.current = globeInstance;

      // Resize observer
      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        globeInstance.width(width).height(height);
      });
      ro.observe(el);

      return () => {
        ro.disconnect();
      };
    }

    const cleanup = init();

    return () => {
      cleanup.then?.((fn) => fn?.());
      if (globeRef.current) {
        try {
          globeRef.current._destructor?.();
        } catch (_) {}
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ background: "#050816" }}
    />
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeHero() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

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

  const handleRouteLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Section header */}



      {/* Globe wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{
          background: "#050816",
          height: "min(540px, 60vw)",
          minHeight: 320,
          boxShadow:
            "0 0 0 1px rgba(99,102,241,0.15), 0 32px 80px -16px rgba(5,8,22,0.9), 0 0 80px -20px rgba(59,130,246,0.2)",
        }}
        onAnimationComplete={() => setIsLoaded(true)}
      >
        {/* Ambient gradient overlay — top */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20"
          style={{
            background:
              "linear-gradient(to bottom, #050816 0%, transparent 100%)",
          }}
        />
        {/* Ambient gradient overlay — bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
          style={{
            background:
              "linear-gradient(to top, #050816 0%, transparent 100%)",
          }}
        />

        {/* Starfield */}
        <Starfield />

        {/* Globe canvas */}
        <GlobeCanvas
          onRouteClick={handleRouteClick}
          onRouteHover={handleRouteHover}
          onRouteLeave={handleRouteLeave}
        />

        {/* Tooltip */}
        <Tooltip info={tooltip} />

        {/* Side panel */}
        <SidePanel route={activeRoute} onClose={() => setActiveRoute(null)} />

        {/* Legend */}
        <Legend />

        {/* Dubai label */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/60 px-3 py-1.5 text-xs font-medium text-amber-300 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Dubai HQ — Primary Hub
          </motion.div>
        </div>

        {/* Click hint */}
        <div className="pointer-events-none absolute right-4 bottom-4 z-20 text-xs text-white/25">
          Click arc · drag to rotate
        </div>
      </motion.div>

      {/* Route count badges */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 flex gap-3"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-950/40 px-3 py-1 text-xs font-medium text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />4 Export Routes
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-950/40 px-3 py-1 text-xs font-medium text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />5 Import Routes
        </span>
      </motion.div>
    </div>
  );
}

// ─── Starfield (pure CSS/SVG, zero overhead) ──────────────────────────────────

function Starfield() {
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      d: Math.random() * 4 + 2,
    }))
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 100"
    >
      {stars.current.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r={s.r * 0.3} fill="white" opacity={s.o}>
          <animate
            attributeName="opacity"
            values={`${s.o};${s.o * 0.3};${s.o}`}
            dur={`${s.d}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}