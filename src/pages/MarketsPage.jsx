import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Ship, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EXPORT_MARKETS, IMPORT_COUNTRIES } from "@/lib/site-data";

// flagcdn.com only supports these widths: 20, 40, 80, 160, 320
// Passing any other value (48, 64) returns a 404, so we always round up to a supported size
function Flag({ flagCode, name, size = 40, className = "" }) {
  const cdnWidth = size <= 20 ? 20 : size <= 40 ? 40 : size <= 80 ? 80 : 160;
  const h = Math.round(size * 0.7);

  if (!flagCode) {
    return (
      <div
        className={`flex items-center justify-center rounded-[3px] bg-muted/30 ${className}`}
        style={{ width: size, height: h }}
      >
        <span style={{ fontSize: size * 0.5 }} role="img" aria-label={name}>
          🌐
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[3px] border border-border/20 bg-muted/30 ${className}`}
      style={{ width: size, height: h }}
    >
      <img
        src={`https://flagcdn.com/w${cdnWidth}/${flagCode.toLowerCase()}.png`}
        alt={`${name} flag`}
        width={size}
        height={h}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling.style.display = "flex";
        }}
      />
      <span
        className="absolute inset-0 hidden items-center justify-center"
        style={{ fontSize: size * 0.5 }}
        role="img"
        aria-label={name}
      >
        🌐
      </span>
    </div>
  );
}

// A single clickable flag tile used in both the import and export grids.
// Rounded flag badge with a colored ring that distinguishes inbound
// (brand/emerald) vs outbound (orange) — the signature shape for this redesign.
function FlagTile({ flagCode, name, onClick, accent = "brand" }) {
  const isBrand = accent === "brand";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-2.5 rounded-2xl border border-border/30 bg-card px-2.5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:gap-3 sm:px-3 sm:py-5 ${
        isBrand ? "hover:border-brand-soft/50" : "hover:border-accent-orange/50"
      }`}
    >
      <span
        className={`overflow-hidden rounded-xl ring-1 transition-colors ${
          isBrand
            ? "ring-border/40 group-hover:ring-brand-soft/60"
            : "ring-border/40 group-hover:ring-accent-orange/60"
        }`}
      >
        <Flag flagCode={flagCode} name={name} size={56} />
      </span>
      <span className="text-center text-[11px] font-medium leading-tight text-foreground/90 sm:text-xs">
        {name}
      </span>
      <span
        className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
          isBrand ? "bg-brand" : "bg-accent-orange"
        }`}
      />
    </button>
  );
}

// Detail panel shown after clicking a flag — split layout (flag fills one
// side, dark info panel on the other), modeled on the reference card:
// eyebrow label, big title, pill row, stat cards, gradient CTA.
function DetailModal({ item, kind, onClose }) {
  if (!item) return null;
  const isImport = kind === "import";
  const accentText = isImport ? "text-brand" : "text-accent-orange";
  const cdnWidth = 320;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-0 sm:items-center sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl overflow-hidden rounded-t-3xl bg-[#0b1320] text-white shadow-2xl sm:rounded-3xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row">
            {/* Flag side */}
            <div className="relative h-44 w-full overflow-hidden sm:h-auto sm:w-[42%]">
              {item.flagCode ? (
                <img
                  src={`https://flagcdn.com/w${cdnWidth}/${item.flagCode.toLowerCase()}.png`}
                  alt={`${item.name} flag`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-5xl">🌐</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:bg-gradient-to-r" />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {isImport ? "Origin" : "Market"}
              </span>
            </div>

            {/* Info side */}
            <div className="flex-1 p-6 sm:p-8">
              <div className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>
                {isImport ? "Inbound" : item.region ?? "Outbound"}
              </div>
              <h3 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {item.name}
              </h3>

              {isImport ? (
                <>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-white/50">
                    Products supplied
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {item.products
                      ?.split(/,|·/)
                      .map((p) => p.trim())
                      .filter(Boolean)
                      .map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90"
                        >
                          {p}
                        </span>
                      ))}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoCard label="Code" value={item.code ?? item.flagCode?.toUpperCase()} />
                    <InfoCard label="Route" value={item.route ?? `${item.name} → Jebel Ali`} />
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-white/50">
                    Buyer network
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/90">
                    {item.buyers ?? "Wholesale + retail"}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoCard label="Region" value={item.region ?? "—"} />
                    <InfoCard
                      label="Status"
                      value={
                        <span className="flex items-center gap-1.5 text-accent-orange">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
                          Active
                        </span>
                      }
                    />
                  </div>
                </>
              )}

              <button
                type="button"
                className="mt-6 w-full rounded-full bg-gradient-brand px-6 py-3.5 text-center font-display text-[15px] font-semibold text-brand-foreground shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isImport ? "Request quotation" : "View trade route"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/50">{label}</div>
      <div className="mt-1 text-[15px] font-medium text-white">{value}</div>
    </div>
  );
}

export default function MarketsPage() {
  const [selected, setSelected] = useState(null); // { kind: 'import' | 'export', item }

  return (
    <SiteLayout>
      <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-1 md:px-10 md:py-5">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-orange/80">
            <span className="block h-px w-[18px] bg-accent-orange/70" />
            Network manifest
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            Ten origins.
            <br />
            One hub.
            <br />
            <span className="text-gradient-brand">Fifteen markets.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Every shipment begins on a farm and ends on a shelf. Tap a flag to
            see the origin, products and route — or the buyers and market
            status for each destination.
          </p>

          <div className="mt-12 flex gap-8 border-t border-border/30 pt-8 sm:gap-10 md:gap-16">
            <Stat n="10+" label="Origin countries" />
            <Stat n="01" label="Dubai hub" />
            <Stat n="15+" label="Export markets" />
          </div>
        </section>

        {/* Import flags */}
        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 md:px-10">
          <SectionHead
            title="Import manifest"
            tag="Inbound"
            tagColor="green"
            sub="Tap a flag for sourcing details"
          />

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
            {IMPORT_COUNTRIES.map((c) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <FlagTile
                  flagCode={c.flagCode}
                  name={c.name}
                  accent="brand"
                  onClick={() => setSelected({ kind: "import", item: c })}
                />
              </motion.div>
            ))}
          </div>

          {/* Hub strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center gap-4 rounded border border-border/30 bg-gradient-to-r from-brand-soft/10 to-accent-orange/10 px-6 py-7 text-center md:flex-row md:gap-7 md:text-left"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Origin farms
            </span>
            <span className="hidden h-px max-w-[80px] flex-1 bg-[repeating-linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] md:block" />
            <div className="flex items-center gap-4">
              <Flag flagCode="ae" name="UAE" size={34} className="border-accent-orange/40" />
              <span className="font-display text-lg uppercase text-brand">
                Dubai distribution hub
              </span>
            </div>
            <span className="hidden h-px max-w-[80px] flex-1 bg-[repeating-linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] md:block" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Export markets
            </span>
          </motion.div>
        </section>

        {/* Export flags */}
        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 md:px-10">
          <SectionHead
            title="Export departures"
            tag="Outbound"
            tagColor="orange"
            sub="Tap a flag for buyers and status"
          />

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
            {EXPORT_MARKETS.map((m) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <FlagTile
                  flagCode={m.flagCode}
                  name={m.name}
                  accent="orange"
                  onClick={() => setSelected({ kind: "export", item: m })}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {selected && (
        <DetailModal
          item={selected.item}
          kind={selected.kind}
          onClose={() => setSelected(null)}
        />
      )}
    </SiteLayout>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-mono text-2xl text-foreground md:text-[28px]">{n}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function SectionHead({ title, tag, tagColor, sub }) {
  const tagClasses =
    tagColor === "green"
      ? "bg-brand-soft/15 text-brand border-brand-soft/40"
      : "bg-accent-orange/15 text-accent-orange border-accent-orange/40";

  const Icon = tagColor === "green" ? Ship : Plane;

  return (
    <div className="flex flex-col gap-3 border-b border-border/30 pb-6 md:flex-row md:items-baseline md:justify-between md:gap-6">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent-orange" />
        <h2 className="font-display text-xl font-semibold uppercase tracking-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <span
          className={`rounded-[3px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${tagClasses}`}
        >
          {tag}
        </span>
      </div>
      <p className="max-w-[280px] text-[13px] text-muted-foreground md:text-right">{sub}</p>
    </div>
  );
}