import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp, Handshake, Globe2, ShieldCheck, ArrowRight,
  PieChart, Building2, Users, CheckCircle2, Mail,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import SEO from "@/components/site/SEO";

const WHY_POINTS = [
  {
    icon: Globe2,
    title: "Established trade network",
    desc: "Active sourcing and distribution relationships across 15+ countries, built since 2018.",
  },
  {
    icon: TrendingUp,
    title: "Growing demand sector",
    desc: "Fresh produce trade through the UAE continues to expand alongside regional population and tourism growth.",
  },
  {
    icon: ShieldCheck,
    title: "Operational discipline",
    desc: "Quality assurance, cold-chain logistics and documentation processes already in place and proven.",
  },
  {
    icon: Building2,
    title: "Dubai-based, globally connected",
    desc: "Positioned at a logistics crossroads between Asia, Africa, Europe and the GCC.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Initial conversation",
    desc: "Share your investment interest and we'll walk you through our business, current operations and growth plans.",
  },
  {
    step: "02",
    title: "Review & due diligence",
    desc: "We share relevant financials, trade volumes and documentation so you can evaluate the opportunity fully.",
  },
  {
    step: "03",
    title: "Structure the partnership",
    desc: "We discuss terms — equity share, role, profit distribution and governance — tailored to fit both sides.",
  },
  {
    step: "04",
    title: "Formalize & onboard",
    desc: "Once aligned, we formalize the partnership agreement and bring you on board as a stakeholder.",
  },
];

export default function InvestPage() {
  return (
    <SiteLayout>
      <SEO
        title="Invest & Partnership Opportunities"
        description="Explore equity and partnership opportunities with Swapnil Dinesh Trading — an established fresh produce trade network across 15+ countries."
        path="/invest"
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_15%_0%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent),radial-gradient(50%_50%_at_90%_30%,color-mix(in_oklab,var(--accent-orange)_14%,transparent),transparent)]" />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur"
          >
            <Handshake className="h-3.5 w-3.5 text-brand" />
            Investment & Partnership
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl"
          >
            Invest in a growing fresh produce trading business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Swapnil Dinesh Vegetable and Fruit Trading LLC SOC welcomes individuals and businesses
            interested in a genuine equity or partnership stake in our company. If you're looking
            to put capital into an established, operating trade business — we'd like to talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift"
            >
              Discuss Investment <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:trade@swapnildinesh.ae?subject=Investment%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition"
            >
              <Mail className="h-4 w-4" /> Email Us Directly
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why invest */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Why this business</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">A real, operating trade company</h2>
          <p className="mt-3 text-muted-foreground">
            Not a pitch deck — an active business with existing supplier and buyer relationships.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What we're looking for / partnership structure */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-soft to-background p-8">
            <PieChart className="h-9 w-9 text-brand" />
            <h3 className="mt-4 font-display text-2xl font-bold">Equity & partnership opportunities</h3>
            <p className="mt-3 text-muted-foreground">
              We're open to discussing equity participation, profit-sharing partnerships, or
              strategic capital injection to fund expansion — additional sourcing regions, cold
              storage capacity, and new export markets.
            </p>
            <ul className="mt-5 grid gap-2.5">
              {[
                "Minority or majority equity stakes considered case-by-case",
                "Transparent profit-sharing terms agreed up front",
                "Option for active or silent partnership involvement",
                "Clear governance and reporting arrangements",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8">
            <Users className="h-9 w-9 text-brand" />
            <h3 className="mt-4 font-display text-2xl font-bold">Who we'd like to talk to</h3>
            <p className="mt-3 text-muted-foreground">
              We welcome conversations with individual investors, family offices, trading
              partners, and businesses already active in food, logistics or import-export who see
              strategic value in a closer partnership.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Every discussion starts with transparency — no commitment is required to simply
              learn more about the business and explore whether there's a fit.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Process</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">How a partnership comes together</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="font-display text-3xl font-bold text-brand/30">{s.step}</div>
              <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-20 max-w-7xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-10 text-brand-foreground md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-orange/40 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Interested in becoming a partner?
              </h2>
              <p className="mt-3 max-w-lg text-white/85">
                Reach out and we'll set up an initial conversation — no obligation, just an open
                discussion about the business and the opportunity.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-elevated hover-lift"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
