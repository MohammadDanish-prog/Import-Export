import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CERTIFICATIONS, QUALITY_STEPS } from "@/lib/site-data";
import SEO from "@/components/site/SEO";

export default function QualityPage() {
  return (
    <SiteLayout>
      <SEO
        title="Quality Assurance & Certifications"
        description="Strict quality control across sourcing, cold-chain handling and inspection — HACCP-certified processes ensuring fresh produce meets international standards."
        path="/quality"
      />
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 md:px-10 md:pt-24 md:pb-12">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Quality assurance
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Every shipment, audited end-to-end
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          A six-stage process ensures consistency, freshness and compliance from the farm gate to
          the destination dock.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Quality in the fresh produce trade isn't a single checkpoint — it's a chain of
          decisions made long before a shipment ever reaches the port. At Swapnil Dinesh Trading,
          every batch we move through Dubai is screened against the same standard, whether it's
          headed to a wholesale market in the Gulf or a retail distributor in Europe. We work
          directly with growers and packhouses to verify harvest practices, monitor cold-chain
          temperatures from pack to pallet, and inspect produce for grade, ripeness and defects
          before it's cleared for loading. That discipline is what lets our buyers order with
          confidence and our suppliers build long-term partnerships with us.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 md:px-10 md:pb-16">
        <div className="relative">
          {/* Timeline rail: aligned to left dots on mobile, centered on desktop */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {QUALITY_STEPS.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative grid grid-cols-1 gap-3 pb-8 pl-12 md:grid-cols-2 md:gap-6 md:pb-10 md:pl-0"
              >
                <div className={`${right ? "md:col-start-2 md:order-2" : "md:col-start-1 md:order-1"}`}>
                  <div
                    className={`rounded-2xl border border-border bg-card p-5 hover-lift sm:p-6 ${
                      right ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                      Step {i + 1}
                    </div>
                    <h3 className="mt-1 font-display text-base font-semibold sm:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="absolute left-5 top-0 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-brand-foreground shadow-elevated md:left-1/2 md:h-10 md:w-10 md:-translate-y-0">
                  {i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-brand sm:h-6 sm:w-6" />
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              Certifications & standards
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            We operate against globally recognized food safety frameworks.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            These certifications aren't just documentation on file — they shape how our
            warehouses, cold rooms and transport partners operate day to day. Produce is held at
            the correct temperature band for its category, inspected on arrival and again before
            dispatch, and traceable back to its origin batch. For importers and distributors
            working with strict food safety regulations in their own markets, that traceability is
            often the deciding factor in choosing a trade partner.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-brand" /> {c}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
