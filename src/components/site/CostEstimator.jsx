import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, Ship, Plane, Truck, Package, ArrowRight,
  Info, AlertTriangle, MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  TRADE_DIRECTIONS, ORIGIN_COUNTRIES, EXPORT_DESTINATIONS,
  SHIPPING_METHODS, PACKAGING_TYPES, calculateEstimate, formatUSD,
} from "@/lib/estimator-data";

const METHOD_ICONS = { sea_fcl: Ship, sea_lcl: Ship, air: Plane, land: Truck };

export function CostEstimator({ compact = false }) {
  const [direction, setDirection] = useState("import");
  const [location, setLocation] = useState("India");
  const [quantity, setQuantity] = useState(1000);
  const [unit, setUnit] = useState("kg");
  const [method, setMethod] = useState("sea_fcl");
  const [packaging, setPackaging] = useState("cartons");

  const locations = direction === "export" ? EXPORT_DESTINATIONS : ORIGIN_COUNTRIES;

  // Keep a valid location selected when switching direction
  const handleDirection = (val) => {
    setDirection(val);
    const list = val === "export" ? EXPORT_DESTINATIONS : ORIGIN_COUNTRIES;
    setLocation(list[0].value);
  };

  const quantityKg = useMemo(() => {
    const q = Number(quantity) || 0;
    return unit === "tons" ? q * 1000 : q;
  }, [quantity, unit]);

  const result = useMemo(
    () => calculateEstimate({ direction, location, quantityKg, method, packaging }),
    [direction, location, quantityKg, method, packaging]
  );

  return (
    <div className={`rounded-3xl border border-border bg-card ${compact ? "p-5 md:p-7" : "p-6 md:p-9"}`}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`font-display font-bold ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}>
            Shipment Cost Estimator
          </h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            Get an instant, indicative cost estimate for your import or export shipment —
            freight, customs, handling and our service fee, all in one place.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {/* Inputs */}
        <div className="grid gap-4">
          {/* Direction toggle */}
          <div>
            <FieldLabel>Trade direction</FieldLabel>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {TRADE_DIRECTIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleDirection(d.value)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>{direction === "export" ? "Destination market" : "Origin country"}</FieldLabel>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
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
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
              >
                {SHIPPING_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>Quantity</FieldLabel>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                </select>
              </div>
            </div>

            <div>
              <FieldLabel>Packaging type</FieldLabel>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
              >
                {PACKAGING_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {result?.minKgWarning && (
            <div className="flex items-start gap-2 rounded-xl bg-[color-mix(in_oklab,var(--accent-orange)_12%,transparent)] px-4 py-3 text-xs text-accent-orange">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              FCL is typically most cost-effective above ~{result.minKgWarning.toLocaleString()} kg.
              For smaller volumes, consider Sea LCL for a better rate.
            </div>
          )}
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-border bg-background p-5 md:p-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={`${direction}-${location}-${quantityKg}-${method}-${packaging}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Estimated total cost
                </div>
                <div className="mt-1 font-display text-3xl font-bold text-gradient-brand md:text-4xl">
                  {formatUSD(result.low)} – {formatUSD(result.high)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  ≈ {formatUSD(result.perKg)} per kg · Transit time: {result.transit}
                </div>

                <div className="mt-5 grid gap-2 text-sm">
                  <LineItem label="Freight (transport)" value={result.freight} icon={iconFor(method)} />
                  <LineItem label="Packaging & handling" value={result.packaging_cost} icon={Package} />
                  <LineItem label="Customs & documentation" value={result.customs} />
                  <LineItem label="Cargo insurance" value={result.insurance} />
                  <div className="my-1 h-px bg-border" />
                  <LineItem label="Subtotal" value={result.subtotal} muted />
                  <LineItem label="Our service fee" value={result.serviceFee} highlight />
                  <div className="my-1 h-px bg-border" />
                  <LineItem label="Estimated total" value={result.total} bold />
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-muted px-3.5 py-3 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  This is an indicative planning estimate, not a binding quotation. Final
                  pricing depends on current freight rates, product type and seasonal factors —
                  confirmed by our trade desk.
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift"
                  >
                    Get exact quote <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/971400000000"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition"
                  >
                    <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="grid h-full place-items-center py-12 text-center text-sm text-muted-foreground">
                Enter a quantity to see your estimate.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function iconFor(method) {
  return METHOD_ICONS[method] ?? Ship;
}

function FieldLabel({ children }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  );
}

function LineItem({ label, value, icon: Icon, bold, highlight, muted }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-base font-bold" : ""}`}>
      <span className={`flex items-center gap-1.5 ${
        highlight ? "text-brand font-semibold" : muted ? "text-muted-foreground" : "text-foreground/80"
      }`}>
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </span>
      <span className={highlight ? "text-brand font-semibold" : ""}>{formatUSD(value)}</span>
    </div>
  );
}
