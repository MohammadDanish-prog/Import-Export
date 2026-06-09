import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Globe, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">About us</div>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Bridging orchards and global markets from <span className="text-gradient-brand">Dubai</span>.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Swapnil Dinesh Vegetable and Fruit Trading LLC SOC is a Dubai-based fresh produce
          trading company specializing in the import and export of premium fruits and vegetables
          across global markets. Through strong supplier partnerships, strict quality control,
          and efficient logistics solutions, we ensure reliable delivery of fresh produce to
          wholesalers, distributors, retailers and food businesses worldwide.
        </p>
      </section>

      {/* Dubai / UAE flag highlight */}
      <section className="mx-auto max-w-7xl px-6 pb-4 md:px-10">
        <div className="flex items-center gap-3">
          <img src="https://flagcdn.com/w80/ae.png" alt="UAE flag" width="80" height="53" className="rounded-lg shadow-md" />
          <div>
            <p className="font-semibold text-foreground">Based in Dubai, UAE</p>
            <p className="text-sm text-muted-foreground">Operating since 2018 · Jebel Ali Free Zone</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-gradient-to-br from-brand-soft to-background p-8"
          >
            <Target className="h-9 w-9 text-brand" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our Mission</h2>
            <p className="mt-2 text-muted-foreground">
              Deliver fresh produce globally with reliability and quality — empowering food
              businesses with consistent supply, transparent pricing and dependable logistics.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-border bg-card p-8"
          >
            <Eye className="h-9 w-9 text-accent-orange" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our Vision</h2>
            <p className="mt-2 text-muted-foreground">
              Become a trusted international leader in fresh produce trading — recognized for
              integrity, quality assurance and operational excellence on every shipment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Award, t: "Quality first", d: "HACCP-aligned QC at every touchpoint." },
            { i: Users, t: "Partner-led", d: "Long-term grower and buyer relationships." },
            { i: Globe, t: "Global reach", d: "Active in 15+ countries across 3 continents." },
            { i: TrendingUp, t: "Scaling reliably", d: "500+ shipments executed and counting." },
          ].map((v, idx) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <v.i className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-semibold">{v.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-3xl bg-gradient-brand p-10 text-brand-foreground md:p-14">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Let's build a long-term trade partnership.
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Whether you're sourcing a single SKU or stocking a full container — we'll meet your
            specifications, packaging and timeline.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-elevated hover-lift"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
