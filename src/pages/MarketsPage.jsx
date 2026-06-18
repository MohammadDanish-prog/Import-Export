import { motion } from "framer-motion";
import { Plane, Ship, ArrowRight } from "lucide-react";
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

export default function MarketsPage() {
  return (
    <SiteLayout>
      <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-1 md:px-10 md:py-5">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-orange/80">
            <span className="block h-px w-[18px] bg-accent-orange/70" />
            Network manifest
          </div>

          <h1 className="mt-5 font-display text-5xl font-semibold uppercase leading-[1.02] tracking-tight md:text-6xl">
            Ten origins.
            <br />
            One hub.
            <br />
            <span className="text-gradient-brand">Fifteen markets.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Every shipment begins on a farm and ends on a shelf. This is the
            route in between — vetted growers and packers feeding our Dubai
            hub, then fanning out to wholesalers, retailers and HORECA buyers
            across three continents.
          </p>

          <div className="mt-12 flex gap-10 border-t border-border/30 pt-8 md:gap-16">
            <Stat n="10+" label="Origin countries" />
            <Stat n="01" label="Dubai hub" />
            <Stat n="15+" label="Export markets" />
          </div>
        </section>

        {/* Import manifest */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <SectionHead
            title="Import manifest"
            tag="Inbound"
            tagColor="green"
            sub="Direct sourcing partnerships across origin countries"
          />

          {/* Column labels — desktop only */}
          <div className="mt-4 hidden grid-cols-[28px_56px_1.3fr_100px_1.5fr_140px] gap-x-5 px-0 pb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground md:grid">
            <span />
            <span>Flag</span>
            <span>Origin</span>
            <span>Code</span>
            <span>Products</span>
            <span className="text-right">Route</span>
          </div>

          <div>
            {IMPORT_COUNTRIES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="grid grid-cols-[40px_1fr] items-center gap-x-4 gap-y-1.5 border-t border-border/30 py-4 transition-colors hover:bg-brand-soft/10 md:grid-cols-[28px_56px_1.3fr_100px_1.5fr_140px] md:gap-x-5 md:gap-y-0"
              >
                <span className="hidden font-mono text-xs text-muted-foreground md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Flag flagCode={c.flagCode} name={c.name} size={40} className="col-span-1 row-span-3 md:row-span-1" />

                <h3 className="font-display text-lg font-medium">{c.name}</h3>

                <span className="col-start-2 inline-block w-fit rounded-[3px] border border-border/50 bg-brand-soft/20 px-2 py-0.5 font-mono text-xs text-brand md:col-start-auto">
                  {c.code ?? c.flagCode?.toUpperCase()}
                </span>

                <p className="col-start-2 text-[13px] leading-snug text-muted-foreground md:col-start-auto">
                  {c.products}
                </p>

                <span className="col-start-2 font-mono text-xs text-muted-foreground md:col-start-auto md:text-right">
                  {c.route ?? `${c.name} → Jebel Ali`}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Hub strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center gap-4 rounded border border-border/30 bg-gradient-to-r from-brand-soft/10 to-accent-orange/10 px-6 py-7 text-center md:flex-row md:gap-7 md:text-left"
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

        {/* Export departures board */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <SectionHead
            title="Export departures"
            tag="Outbound"
            tagColor="orange"
            sub="Wholesalers, retailers and HORECA buyers by market"
          />

          <div className="mt-6 overflow-hidden rounded border border-border/30">
            {EXPORT_MARKETS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className={`grid grid-cols-[36px_1fr] items-center gap-x-4 gap-y-1.5 px-5 py-5 transition-colors hover:bg-accent-orange/10 md:grid-cols-[44px_1.6fr_1fr_120px] md:gap-x-4 md:gap-y-0 ${
                  i !== 0 ? "border-t border-border/30" : ""
                }`}
              >
                <Flag flagCode={m.flagCode} name={m.name} size={36} className="row-span-2 md:row-span-1" />

                <div>
                  <div className="font-display text-lg font-medium">{m.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {m.region}
                  </div>
                </div>

                <div className="col-start-2 text-[13px] text-muted-foreground md:col-start-auto">
                  {m.buyers ?? "Wholesale + retail"}
                </div>

                <div className="col-start-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-accent-orange md:col-start-auto md:justify-end">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
                  Active
                  <ArrowRight className="ml-0.5 h-3 w-3 hidden md:block" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
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
        <h2 className="font-display text-2xl font-semibold uppercase tracking-tight md:text-3xl">
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