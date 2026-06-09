import { motion } from "framer-motion";
import { Plane, Ship } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EXPORT_MARKETS, IMPORT_COUNTRIES } from "@/lib/site-data";

// flagcdn.com only supports these widths: 20, 40, 80, 160, 320
// Passing any other value (48, 64) returns a 404 which fires onError → shows fallback
function FlagImg({ flagCode, name, width = 40, height }) {
  const h = height ?? Math.round(width * 0.67);

  if (!flagCode) return <FlagFallback name={name} size={width} />;

  return (
    <img
      src={`https://flagcdn.com/w${width}/${flagCode.toLowerCase()}.png`}
      alt={`${name} flag`}
      width={width}
      height={h}
      className="block rounded shadow-sm"
      style={{ width, height: h, objectFit: "cover" }}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "block";
      }}
    />
  );
}

function FlagFallback({ name, size = 40 }) {
  const emoji =
    name === "Africa" ? "🌍" :
    name === "South Asia" ? "🌏" :
    name === "Europe" ? "🇪🇺" : "🌐";
  return <span style={{ fontSize: size * 0.65, lineHeight: 1 }} role="img" aria-label={name}>{emoji}</span>;
}

// Wrapper that shows flag first, fallback if it errors
function Flag({ flagCode, name, displayWidth, displayHeight }) {
  const h = displayHeight ?? Math.round(displayWidth * 0.67);
  // Pick the closest supported flagcdn size (20, 40, 80, 160)
  const cdnWidth = displayWidth <= 20 ? 20 : displayWidth <= 40 ? 40 : displayWidth <= 80 ? 80 : 160;

  if (!flagCode) return <FlagFallback name={name} size={displayWidth} />;

  return (
    <div style={{ width: displayWidth, height: h, flexShrink: 0 }}>
      <img
        src={`https://flagcdn.com/w${cdnWidth}/${flagCode.toLowerCase()}.png`}
        alt={`${name} flag`}
        width={displayWidth}
        height={h}
        className="block rounded shadow-sm"
        style={{ width: displayWidth, height: h, objectFit: "cover" }}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentNode.querySelector(".flag-fallback").style.display = "block";
        }}
      />
      <span
        className="flag-fallback"
        style={{ display: "none", fontSize: displayWidth * 0.65, lineHeight: 1 }}
        role="img"
        aria-label={name}
      >
        {name === "Africa" ? "🌍" : name === "South Asia" ? "🌏" : name === "Europe" ? "🇪🇺" : "🌐"}
      </span>
    </div>
  );
}

export default function MarketsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Network</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Global trade network</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A vetted network of growers, packers and distributors connects our Dubai hub to global
          markets across three continents.
        </p>
      </section>

      {/* Import */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
            <Ship className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Import Markets</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Direct sourcing partnerships across these origin countries.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {IMPORT_COUNTRIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-border bg-card p-5 hover-lift"
            >
              <Flag flagCode={c.flagCode} name={c.name} displayWidth={40} />
              <h3 className="mt-3 font-semibold">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.products}</p>
            </motion.div>
          ))}
        </div>

        {/* Trade route visual */}
        <div className="mt-12 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-soft via-background to-background p-8 md:p-12">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,var(--brand)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Trade routes
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">From origin → Dubai → world</h3>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl glass p-4">
                <div className="text-3xl">🌍</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider">Source</div>
                <div className="text-sm text-muted-foreground">10+ countries</div>
              </div>
              <div className="rounded-2xl bg-gradient-brand p-4 text-brand-foreground flex flex-col items-center">
                <Flag flagCode="ae" name="UAE" displayWidth={40} />
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider">Hub</div>
                <div className="text-sm opacity-90">Dubai, UAE</div>
              </div>
              <div className="rounded-2xl glass p-4">
                <div className="text-3xl">🚢</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider">Destination</div>
                <div className="text-sm text-muted-foreground">15+ markets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent-orange)_18%,transparent)] text-accent-orange">
            <Plane className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Export Markets</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          We distribute to wholesalers, retailers and HORECA buyers across these markets.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPORT_MARKETS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="relative flex items-center gap-4">
                <Flag flagCode={m.flagCode} name={m.name} displayWidth={80} />
                <div>
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {m.region}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}