import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/site-data";
import SEO from "@/components/site/SEO";

export default function ServicesPage() {
  return (
    <SiteLayout>
      <SEO
        title="Services — Sourcing, Logistics & Compliance"
        description="A full-stack fresh produce trading offering across sourcing, cold-chain logistics, quality compliance and packaging for international food businesses."
        path="/services"
      />
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Services</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          One partner, every step of the trade
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A full-stack offering across sourcing, logistics, compliance and packaging — designed
          for international food businesses.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground/90 leading-relaxed">
          Swapnil Dinesh Trading manages every stage of fresh produce import and export from our
          Dubai base — sourcing fruits and vegetables from trusted growers, coordinating cold-chain
          sea and air logistics, handling customs and quality compliance, and packing shipments to
          meet the standards of wholesalers, retailers and food distributors across the Gulf,
          Africa, Asia and Europe. Whether you're an exporter looking to reach new markets or an
          importer sourcing reliable produce, our team handles the trade logistics end-to-end.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = Icons[s.icon] ?? Icons.Package;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition group-hover:opacity-20" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
