import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Ship, Snowflake, ShieldCheck, Globe2, Package, CheckCircle2, Handshake, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GALLERY, SERVICES } from "@/lib/site-data";
import GlobeHero from "@/components/site/GlobeHero";
import { CostEstimator } from "@/components/site/CostEstimator";

const STATS = [
  { value: "20+", label: "Trading Partners" },
  { value: "100+", label: "Products" },
  { value: "15+", label: "Countries Served" },
  { value: "500+", label: "Shipments" },
];

const HERO_BADGES = [
  { label: "Global Logistics", icon: Ship },
  { label: "Cold Chain", icon: Snowflake },
  { label: "HACCP Certified", icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_10%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent),radial-gradient(50%_50%_at_90%_20%,color-mix(in_oklab,var(--accent-orange)_15%,transparent),transparent)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-1 md:px-10 md:py-5 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            >
              Global Fresh Produce <br />
              <span className="text-gradient-brand">Trading Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              Supplying premium fruits and vegetables worldwide through trusted sourcing, strict
              quality assurance and efficient logistics — from Dubai to over 15 countries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift"
              >
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
              >
                Explore Products
              </Link>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-2">
              {HERO_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" /> {label}
                </span>
              ))}
            </div>
          </div>

          <GlobeHero />
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-4 md:p-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center md:text-left"
              >
                <div className="font-display text-3xl font-bold text-gradient-brand md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <Section
        eyebrow="What we do"
        title="End-to-end fresh produce trade"
        sub="From orchard to destination — sourcing, quality, logistics, and clearance under one roof."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-5 hover-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Cost Estimator teaser */}
      <Section
        eyebrow="Plan your shipment"
        title="Estimate your trade cost instantly"
        sub="Pick your route, quantity, shipping method and packaging — get an indicative cost breakdown in seconds."
      >
        <CostEstimator compact />
        <div className="mt-6 text-center">
          <Link
            to="/cost-estimator"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition"
          >
            Open full Cost Estimator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Why us */}
      <Section
        eyebrow="Why partner with us"
        title="Trusted by wholesalers, retailers and HORECA leaders"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-soft to-background p-8">
            <Globe2 className="h-9 w-9 text-brand" />
            <h3 className="mt-4 font-display text-2xl font-bold">15+ origin countries</h3>
            <p className="mt-2 text-muted-foreground">
              Direct supplier relationships across India, Egypt, Turkey, China, South Africa,
              Pakistan, Netherlands, Italy, Spain and more — ensuring year-round availability.
            </p>
            {/* Country flags row */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["in","eg","tr","cn","za","pk","nl","it","es"].map((code) => (
                <img
                  key={code}
                  src={`https://flagcdn.com/w40/${code}.png`}
                  alt={code}
                  width="28"
                  height="19"
                  className="rounded shadow-sm"
                />
              ))}
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {["Pre-qualified growers", "Origin inspection", "Reefer logistics", "Phytosanitary docs"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="grid grid-cols-3 gap-3">
              {GALLERY.slice(0, 6).map((g) => (
                <div key={g.tag} className="aspect-square rounded-2xl overflow-hidden border border-border relative">
                  <img
                    src={g.img}
                    alt={g.tag}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${g.grad} hidden items-center justify-center text-3xl`}
                  >
                    {g.emoji}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Inside our operations</p>
              <Link to="/gallery" className="text-sm font-semibold text-brand">
                View gallery →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Invest teaser */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  <TrendingUp className="h-3.5 w-3.5" /> Investment &amp; Partnership
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                  Want to invest in our company?
                </h3>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  We welcome equity and partnership conversations with investors who want a
                  stake in a growing, established fresh produce trading business based in Dubai.
                </p>
              </div>
            </div>
            <Link
              to="/invest"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift lg:justify-self-end"
            >
              Explore Investment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-20 max-w-7xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-10 text-brand-foreground md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-orange/40 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Ready to place your next order?
              </h2>
              <p className="mt-3 max-w-lg text-white/85">
                Get a tailored quotation within 24 hours. Containerized, palletized or LCL — we
                handle it end-to-end.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-elevated hover-lift"
              >
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ eyebrow, title, sub, children }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
        {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      </div>
      {children}
    </section>
  );
}
