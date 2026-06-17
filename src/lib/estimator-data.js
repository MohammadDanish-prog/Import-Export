// ─── Cost Estimator: reference data & calculation logic ───────────────────
// All figures are indicative planning estimates (USD), not live freight
// quotes. They are intentionally simple so the tool stays fast and
// transparent — real quotations are always confirmed by our trade desk.

export const TRADE_DIRECTIONS = [
  { value: "import", label: "Import into Dubai / UAE" },
  { value: "export", label: "Export from Dubai / UAE" },
];

// Origin countries for imports, destination markets for exports.
// Each has a base $/kg ocean-freight reference plus a relative distance
// factor used to scale air & land costs.
export const ORIGIN_COUNTRIES = [
  { value: "India", label: "India", flag: "in", seaBase: 0.10, distanceFactor: 1.0 },
  { value: "Egypt", label: "Egypt", flag: "eg", seaBase: 0.09, distanceFactor: 0.9 },
  { value: "Turkey", label: "Turkey", flag: "tr", seaBase: 0.11, distanceFactor: 1.0 },
  { value: "China", label: "China", flag: "cn", seaBase: 0.14, distanceFactor: 1.4 },
  { value: "South Africa", label: "South Africa", flag: "za", seaBase: 0.16, distanceFactor: 1.5 },
  { value: "Pakistan", label: "Pakistan", flag: "pk", seaBase: 0.08, distanceFactor: 0.8 },
  { value: "Netherlands", label: "Netherlands", flag: "nl", seaBase: 0.18, distanceFactor: 1.7 },
  { value: "Italy", label: "Italy", flag: "it", seaBase: 0.15, distanceFactor: 1.4 },
  { value: "Spain", label: "Spain", flag: "es", seaBase: 0.16, distanceFactor: 1.5 },
  { value: "Poland", label: "Poland", flag: "pl", seaBase: 0.17, distanceFactor: 1.6 },
];

export const EXPORT_DESTINATIONS = [
  { value: "United Arab Emirates", label: "United Arab Emirates (local)", flag: "ae", seaBase: 0.03, distanceFactor: 0.2 },
  { value: "Saudi Arabia", label: "Saudi Arabia", flag: "sa", seaBase: 0.07, distanceFactor: 0.6 },
  { value: "Oman", label: "Oman", flag: "om", seaBase: 0.06, distanceFactor: 0.5 },
  { value: "Qatar", label: "Qatar", flag: "qa", seaBase: 0.06, distanceFactor: 0.5 },
  { value: "Bahrain", label: "Bahrain", flag: "bh", seaBase: 0.06, distanceFactor: 0.5 },
  { value: "Kuwait", label: "Kuwait", flag: "kw", seaBase: 0.07, distanceFactor: 0.6 },
  { value: "Africa", label: "Africa (regional)", flag: null, seaBase: 0.12, distanceFactor: 1.1 },
  { value: "Europe", label: "Europe (regional)", flag: "eu", seaBase: 0.16, distanceFactor: 1.5 },
  { value: "South Asia", label: "South Asia (regional)", flag: null, seaBase: 0.10, distanceFactor: 0.9 },
];

// Shipping methods: per-kg multiplier on the base sea rate, plus a flat
// handling component and typical transit time for context.
export const SHIPPING_METHODS = [
  { value: "sea_fcl", label: "Sea Freight – FCL (Full Container)", multiplier: 1, flatHandling: 350, transit: "12–22 days", minKg: 8000 },
  { value: "sea_lcl", label: "Sea Freight – LCL (Shared Container)", multiplier: 1.6, flatHandling: 180, transit: "14–25 days", minKg: 0 },
  { value: "air", label: "Air Freight", multiplier: 7.5, flatHandling: 220, transit: "1–3 days", minKg: 0 },
  { value: "land", label: "Land Transport (GCC regional)", multiplier: 0.5, flatHandling: 120, transit: "2–5 days", minKg: 0 },
];

// Packaging affects handling/palletization cost per kg and a small
// per-shipment packing fee.
export const PACKAGING_TYPES = [
  { value: "cartons", label: "Cartons (retail-ready)", perKg: 0.015, flatFee: 60 },
  { value: "pallets", label: "Palletized", perKg: 0.008, flatFee: 140 },
  { value: "bulk", label: "Bulk / Loose", perKg: 0.004, flatFee: 40 },
  { value: "reefer_crates", label: "Reefer Crates (cold chain)", perKg: 0.022, flatFee: 180 },
];

const CUSTOMS_RATE = 0.018;     // ~1.8% of freight+handling, indicative duty/clearance reference
const SERVICE_FEE_RATE = 0.06;  // our trade desk service fee
const MIN_SERVICE_FEE = 150;    // floor for very small shipments
const INSURANCE_RATE = 0.004;   // indicative cargo insurance reference

/**
 * Calculate an indicative cost estimate.
 * @param {Object} params
 * @param {string} params.direction   "import" | "export"
 * @param {string} params.location    country/market value from ORIGIN_COUNTRIES or EXPORT_DESTINATIONS
 * @param {number} params.quantityKg  total shipment weight in kg
 * @param {string} params.method      value from SHIPPING_METHODS
 * @param {string} params.packaging   value from PACKAGING_TYPES
 */
export function calculateEstimate({ direction, location, quantityKg, method, packaging }) {
  const list = direction === "export" ? EXPORT_DESTINATIONS : ORIGIN_COUNTRIES;
  const loc = list.find((l) => l.value === location);
  const ship = SHIPPING_METHODS.find((m) => m.value === method);
  const pack = PACKAGING_TYPES.find((p) => p.value === packaging);

  if (!loc || !ship || !pack || !quantityKg || quantityKg <= 0) return null;

  const qty = Number(quantityKg);

  // Freight: base rate scaled by distance factor and method multiplier, plus flat handling.
  const freightPerKg = loc.seaBase * loc.distanceFactor * ship.multiplier;
  const freight = freightPerKg * qty + ship.flatHandling;

  // Packaging / handling
  const packaging_cost = pack.perKg * qty + pack.flatFee;

  // Customs & clearance (indicative reference figure)
  const customs = (freight + packaging_cost) * CUSTOMS_RATE + 45; // +flat documentation fee

  // Cargo insurance (indicative)
  const insurance = (freight + packaging_cost) * INSURANCE_RATE;

  const subtotal = freight + packaging_cost + customs + insurance;

  // Our service fee
  const serviceFee = Math.max(subtotal * SERVICE_FEE_RATE, MIN_SERVICE_FEE);

  const total = subtotal + serviceFee;

  // Present as a range (±8%) since this is indicative, not a locked quote.
  const low = total * 0.92;
  const high = total * 1.08;

  return {
    freight,
    packaging_cost,
    customs,
    insurance,
    serviceFee,
    subtotal,
    total,
    low,
    high,
    perKg: total / qty,
    transit: ship.transit,
    minKgWarning: ship.minKg && qty < ship.minKg ? ship.minKg : null,
  };
}

export function formatUSD(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
