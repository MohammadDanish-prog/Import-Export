import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, Ship, Plane, Truck, Package, ArrowRight,
  Info, AlertTriangle, MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  TRADE_DIRECTIONS, ORIGIN_COUNTRIES, EXPORT_DESTINATIONS,
  SHIPPING_METHODS, PACKAGING_TYPES, calculateEstimate, formatUSD,
} from "@/lib/estimator-data";
import SEO from "@/components/site/SEO";

const METHOD_ICONS = { sea_fcl: Ship, sea_lcl: Ship, air: Plane, land: Truck };

// Debounce hook — prevents re-computing on every keystroke
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useMemo(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function CostEstimator({ compact = false }) {
  const [direction, setDirection] = useState("import");
  const [location, setLocation] = useState("India");
  const [quantity, setQuantity] = useState(1000);
  const [unit, setUnit] = useState("kg");
  const [method, setMethod] = useState("sea_fcl");
  const [packaging, setPackaging] = useState("cartons");

  const locations = direction === "export" ? EXPORT_DESTINATIONS : ORIGIN_COUNTRIES;

  const handleDirection = useCallback((val) => {
    setDirection(val);
    const list = val === "export" ? EXPORT_DESTINATIONS : ORIGIN_COUNTRIES;
    setLocation(list[0].value);
  }, []);

  // Debounce quantity so the result panel only updates after typing stops
  const debouncedQuantity = useDebounced(quantity, 300);

  const quantityKg = useMemo(() => {
    const q = Number(debouncedQuantity) || 0;
    return unit === "tons" ? q * 1000 : q;
  }, [debouncedQuantity, unit]);

  const result = useMemo(
    () => calculateEstimate({ direction, location, quantityKg, method, packaging }),
    [direction, location, quantityKg, method, packaging]
  );

  // Stable animation key — only changes when non-quantity params change OR debounced quantity settles
  const animKey = `${direction}-${location}-${quantityKg}-${method}-${packaging}`;

  return (
    <div className={`rounded-2xl border border-border bg-card ${compact ? "p-4 md:p-5" : "p-5 md:p-7"}`}>
      {/* Header — tighter */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
          <Calculator className="h-4 w-4" />
        </div>
        <div>
          <h3 className={`font-display font-bold leading-tight ${compact ? "text-lg" : "text-xl md:text-2xl"}`}>
            Shipment Cost Estimator
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-lg">
            Indicative freight, customs, handling &amp; service fee — all in one place.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr]">
        {/* ── Inputs ── */}
        <div className="grid gap-3">
          {/* Direction toggle */}
          <div>
            <FieldLabel>Trade direction</FieldLabel>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {TRADE_DIRECTIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleDirection(d.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    direction === d.value
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2×2 grid of fields */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            <div>
              <FieldLabel>{direction === "export" ? "Destination" : "Origin"}</FieldLabel>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="field-input"
              >
                {locations.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>Shipping method</FieldLabel>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="field-input"
              >
                {SHIPPING_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>Quantity</FieldLabel>
              <div className="mt-1 flex gap-1.5">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="field-input flex-1 min-w-0"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="field-input w-auto px-2"
                >
                  <option value="kg">kg</option>
                  <option value="tons">t</option>
                </select>
              </div>
            </div>

            <div>
              <FieldLabel>Packaging</FieldLabel>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="field-input"
              >
                {PACKAGING_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {result?.minKgWarning && (
            <div className="flex items-start gap-2 rounded-lg bg-[color-mix(in_oklab,var(--accent-orange)_10%,transparent)] px-3 py-2.5 text-xs text-accent-orange">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-px" />
              FCL is best above ~{result.minKgWarning.toLocaleString()} kg. Try Sea LCL for smaller volumes.
            </div>
          )}
        </div>

        {/* ── Result panel ── */}
        <div className="rounded-xl border border-border bg-background p-4 md:p-5">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={animKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Total headline */}
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Estimated total
                </div>
                <div className="mt-0.5 font-display text-2xl font-bold text-gradient-brand md:text-3xl">
                  {formatUSD(result.low)} – {formatUSD(result.high)}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  ≈ {formatUSD(result.perKg)} / kg &nbsp;·&nbsp; Transit: {result.transit}
                </div>

                {/* Line items — compact */}
                <div className="mt-3.5 grid gap-1.5 text-xs">
                  <LineItem label="Freight" value={result.freight} icon={iconFor(method)} />
                  <LineItem label="Packaging &amp; handling" value={result.packaging_cost} icon={Package} />
                  <LineItem label="Customs &amp; docs" value={result.customs} />
                  <LineItem label="Cargo insurance" value={result.insurance} />
                  <Divider />
                  <LineItem label="Subtotal" value={result.subtotal} muted />
                  <LineItem label="Service fee" value={result.serviceFee} highlight />
                  <Divider />
                  <LineItem label="Total estimate" value={result.total} bold />
                </div>

                {/* Disclaimer */}
                <div className="mt-3.5 flex items-start gap-1.5 rounded-lg bg-muted px-3 py-2.5 text-[11px] text-muted-foreground leading-relaxed">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  Indicative estimate only — final pricing confirmed by our trade desk.
                </div>

                {/* CTAs */}
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-brand-foreground shadow-elevated hover-lift"
                  >
                    Get exact quote <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="https://wa.me/971400000000"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="grid h-full place-items-center py-10 text-center text-xs text-muted-foreground">
                Enter a quantity to see your estimate.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Shared input style injected once via a style tag — avoids repeating className strings */}
      <style>{`
        .field-input {
          margin-top: 0.25rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          outline: none;
          color: var(--foreground);
          transition: box-shadow 0.15s;
        }
        .field-input:focus {
          box-shadow: 0 0 0 2px var(--brand);
        }
        /* Remove number input spinners */
        .field-input[type=number]::-webkit-inner-spin-button,
        .field-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .field-input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}

function iconFor(method) {
  return METHOD_ICONS[method] ?? Ship;
}

function FieldLabel({ children }) {
  return (
    <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </label>
  );
}

function Divider() {
  return <div className="my-0.5 h-px bg-border" />;
}

function LineItem({ label, value, icon: Icon, bold, highlight, muted }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${bold ? "font-bold text-sm" : ""}`}>
      <span className={`flex items-center gap-1 min-w-0 ${
        highlight ? "text-brand font-semibold" : muted ? "text-muted-foreground" : "text-foreground/80"
      }`}>
        {Icon && <Icon className="h-3 w-3 shrink-0" />}
        <span className="truncate">{label}</span>
      </span>
      <span className={`shrink-0 tabular-nums ${highlight ? "text-brand font-semibold" : ""}`}>
        {formatUSD(value)}
      </span>
    </div>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────

export default function CostEstimatorPage() {
  return (
    <SiteLayout>
      <SEO
        title="Shipment Cost Estimator"
        description="Instantly estimate the cost of importing or exporting fresh produce — sea, air or land freight, with a transparent line-item breakdown."
        path="/cost-estimator"
      />
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Shipment planning
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
          Estimate your trade cost instantly
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Pick your route, quantity, shipping method and packaging — get an indicative cost breakdown in seconds.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-10">
        <CostEstimator />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-soft to-background p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold">What's included in this estimate?</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Freight cost", desc: "Ocean or air freight based on chosen method" },
              { title: "Customs & duties", desc: "Import/export duties per destination" },
              { title: "Handling fees", desc: "Port, warehouse, and documentation handling" },
              { title: "Service fee", desc: "Our 5% service charge for end-to-end support" },
            ].map((i, x) => (
              <div key={x}>
                <p className="font-semibold">{i.title}</p>
                <p className="mt-1 text-sm text-foreground/70">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}