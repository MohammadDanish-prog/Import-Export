import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2,
  PackageCheck, ShoppingCart, ArrowRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { api } from "@/lib/api";
import SEO from "@/components/site/SEO";

const ROLE_OPTIONS = [
  {
    value: "exporter",
    label: "I'm a Seller / Exporter",
    sub: "I grow or supply produce and want to reach global buyers through Swapnil Dinesh.",
    icon: PackageCheck,
    color: "from-emerald-500/20 to-lime-500/10",
  },
  {
    value: "importer",
    label: "I'm a Buyer / Importer",
    sub: "I want to source premium fresh produce for my business, restaurant or retail chain.",
    icon: ShoppingCart,
    color: "from-orange-500/20 to-amber-500/10",
  },
];

const PRODUCE_CATEGORIES = [
  "Fruits — Tropical", "Fruits — Citrus", "Fruits — Berries",
  "Fruits — Stone Fruit", "Vegetables — Leafy", "Vegetables — Root",
  "Vegetables — Alliums (Onion, Garlic)", "Vegetables — Capsicums",
  "Vegetables — Gourds & Squash", "Herbs & Spices", "Other",
];

const BUSINESS_TYPES_EXPORTER = [
  "Farm / Grower", "Packing House", "Cooperative", "Trading Company", "Processor", "Other",
];

const BUSINESS_TYPES_IMPORTER = [
  "Supermarket / Hypermarket", "Wholesale Distributor", "HORECA (Hotel / Restaurant / Café)",
  "Food Processor", "Retailer", "E-commerce / Delivery", "Other",
];

const VOLUMES = ["< 1 ton/month", "1–10 tons/month", "10–50 tons/month", "50–200 tons/month", "> 200 tons/month"];
const SHIPPING_METHODS = ["Sea Freight (FCL)", "Sea Freight (LCL)", "Air Freight", "Land Transport", "Mixed / Flexible"];

export default function ContactPage() {
  const [role, setRole] = useState(null);
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <SEO
        title="Contact Us — Get a Quote"
        description="Get in touch with Swapnil Dinesh Trading for fresh produce import/export inquiries. Offices in Deira, Dubai. Fast replies during UAE business hours."
        path="/contact"
      />
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Let's talk trade</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Whether you're looking to sell your produce or source premium goods — tell us who you
          are and we'll get back within 24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">

        {/* Role selector */}
        {!role && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5 md:grid-cols-2 max-w-3xl mx-auto"
          >
            <p className="md:col-span-2 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              First, tell us who you are
            </p>
            {ROLE_OPTIONS.map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRole(opt.value)}
                className={`group relative overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br ${opt.color} p-8 text-left transition-all hover:border-brand hover:shadow-elevated`}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background/60 backdrop-blur border border-border">
                    <opt.icon className="h-5 w-5 text-brand" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg font-bold">{opt.label}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{opt.sub}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {role && !sent && (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Role switcher pill */}
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold ${
                  role === "exporter"
                    ? "bg-brand-soft text-brand"
                    : "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange"
                }`}>
                  {role === "exporter" ? <PackageCheck className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                  {role === "exporter" ? "Seller / Exporter inquiry" : "Buyer / Importer inquiry"}
                </div>
                <button
                  onClick={() => setRole(null)}
                  className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  Change
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                {role === "exporter"
                  ? <ExporterForm onSent={() => setSent(true)} />
                  : <ImporterForm onSent={() => setSent(true)} />
                }

                <div className="grid gap-4 content-start">
                  <InfoCard icon={MapPin} title="Office"
                    lines={["Swapnil Dinesh Trading LLC SOC", "Deira, Dubai, United Arab Emirates"]} />
                  <InfoCard icon={Phone} title="Phone"
                    lines={["+971 4 000 0000", "+971 50 000 0000"]} />
                  <InfoCard icon={Mail} title="Email"
                    lines={["trade@swapnildinesh.ae", "info@swapnildinesh.ae"]} />
                  <a href="https://wa.me/971400000000" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-[#25D366] p-5 text-white hover-lift">
                    <MessageCircle className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Chat on WhatsApp</div>
                      <div className="text-xs opacity-90">Fast replies during UAE business hours</div>
                    </div>
                  </a>

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What happens next</div>
                    <ol className="grid gap-3">
                      {[
                        "We review your submission within 24 hours.",
                        "Our trade desk contacts you to discuss requirements.",
                        "We send a tailored quotation or sourcing proposal.",
                        "Shipment planning & documentation begins.",
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-brand mt-0.5">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {sent && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-16 text-center"
            >
              <CheckCircle2 className="mx-auto h-16 w-16 text-brand" />
              <h3 className="mt-5 font-display text-3xl font-bold">Thanks — we got it.</h3>
              <p className="mt-3 text-muted-foreground">
                Our trade desk will review your{" "}
                {role === "exporter" ? "export proposal" : "sourcing request"} and be in touch
                within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setRole(null); }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
              >
                Submit another inquiry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </SiteLayout>
  );
}

function ExporterForm({ onSent }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", businessType: "", country: "",
    email: "", phone: "",
    produceCategory: "", varieties: "",
    volumePerMonth: "", harvestSeason: "",
    certifications: "", packagingTypes: "",
    shippingMethod: "", targetMarkets: "",
    message: "",
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createInquiry({
        name: form.name, company: form.company, country: form.country,
        product: `[EXPORTER] ${form.produceCategory} — ${form.varieties}`,
        quantity: form.volumePerMonth, email: form.email, phone: form.phone,
        message: `Business type: ${form.businessType}\nHarvest season: ${form.harvestSeason}\nCertifications: ${form.certifications}\nPackaging: ${form.packagingTypes}\nShipping: ${form.shippingMethod}\nTarget markets: ${form.targetMarkets}\n\n${form.message}`,
      });
      onSent();
    } catch { onSent(); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8 grid gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Export your produce</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tell us about what you grow or supply — we'll connect you with the right buyers.</p>
      </div>
      <FormSection title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Full name" name="name" required value={form.name} onChange={set("name")} />
          <TextInput label="Company / farm name" name="company" value={form.company} onChange={set("company")} />
          <SelectInput label="Business type" required value={form.businessType} onChange={set("businessType")} options={BUSINESS_TYPES_EXPORTER} />
          <TextInput label="Country / region" name="country" required value={form.country} onChange={set("country")} />
          <TextInput label="Email" name="email" type="email" required value={form.email} onChange={set("email")} />
          <TextInput label="Phone / WhatsApp" name="phone" type="tel" required value={form.phone} onChange={set("phone")} />
        </div>
      </FormSection>
      <FormSection title="Your produce">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectInput label="Produce category" required value={form.produceCategory} onChange={set("produceCategory")} options={PRODUCE_CATEGORIES} />
          <TextInput label="Specific varieties" name="varieties" placeholder="e.g. Alphonso Mango, Red Onion" value={form.varieties} onChange={set("varieties")} />
          <SelectInput label="Monthly export volume" required value={form.volumePerMonth} onChange={set("volumePerMonth")} options={VOLUMES} />
          <TextInput label="Harvest / supply season" name="harvestSeason" placeholder="e.g. March–June" value={form.harvestSeason} onChange={set("harvestSeason")} />
        </div>
      </FormSection>
      <FormSection title="Export capability">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Certifications held" name="certifications" placeholder="e.g. GlobalG.A.P., HACCP, Organic" value={form.certifications} onChange={set("certifications")} />
          <TextInput label="Packaging available" name="packagingTypes" placeholder="e.g. 10 kg cartons, mesh bags" value={form.packagingTypes} onChange={set("packagingTypes")} />
          <SelectInput label="Preferred shipping method" value={form.shippingMethod} onChange={set("shippingMethod")} options={SHIPPING_METHODS} />
          <TextInput label="Target export markets" name="targetMarkets" placeholder="e.g. UAE, Saudi Arabia, Europe" value={form.targetMarkets} onChange={set("targetMarkets")} />
        </div>
      </FormSection>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional notes</label>
        <textarea name="message" rows={3} value={form.message} onChange={set("message")}
          placeholder="Anything else you'd like us to know — minimum order, exclusivity, etc."
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
      </div>
      <button type="submit" disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift disabled:opacity-60 self-start">
        {submitting ? "Sending…" : <><Send className="h-4 w-4" /> Submit export inquiry</>}
      </button>
    </form>
  );
}

function ImporterForm({ onSent }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", businessType: "", country: "",
    email: "", phone: "",
    produceCategory: "", specificProducts: "",
    volumePerMonth: "", deliveryFrequency: "",
    destinationPort: "", shippingMethod: "",
    qualityRequirements: "", packagingRequirements: "",
    message: "",
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createInquiry({
        name: form.name, company: form.company, country: form.country,
        product: `[IMPORTER] ${form.produceCategory} — ${form.specificProducts}`,
        quantity: form.volumePerMonth, email: form.email, phone: form.phone,
        message: `Business type: ${form.businessType}\nDelivery frequency: ${form.deliveryFrequency}\nDestination port: ${form.destinationPort}\nShipping: ${form.shippingMethod}\nQuality requirements: ${form.qualityRequirements}\nPackaging: ${form.packagingRequirements}\n\n${form.message}`,
      });
      onSent();
    } catch { onSent(); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8 grid gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Source fresh produce</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tell us what you need — we'll prepare a tailored quotation within 24 hours.</p>
      </div>
      <FormSection title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Full name" name="name" required value={form.name} onChange={set("name")} />
          <TextInput label="Company name" name="company" value={form.company} onChange={set("company")} />
          <SelectInput label="Business type" required value={form.businessType} onChange={set("businessType")} options={BUSINESS_TYPES_IMPORTER} />
          <TextInput label="Country / destination" name="country" required value={form.country} onChange={set("country")} />
          <TextInput label="Email" name="email" type="email" required value={form.email} onChange={set("email")} />
          <TextInput label="Phone / WhatsApp" name="phone" type="tel" required value={form.phone} onChange={set("phone")} />
        </div>
      </FormSection>
      <FormSection title="What you're sourcing">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectInput label="Produce category" required value={form.produceCategory} onChange={set("produceCategory")} options={PRODUCE_CATEGORIES} />
          <TextInput label="Specific products / varieties" name="specificProducts" placeholder="e.g. Red Apple, Cherry Tomato" value={form.specificProducts} onChange={set("specificProducts")} />
          <SelectInput label="Monthly import volume" required value={form.volumePerMonth} onChange={set("volumePerMonth")} options={VOLUMES} />
          <SelectInput label="Delivery frequency" value={form.deliveryFrequency} onChange={set("deliveryFrequency")}
            options={["Weekly", "Bi-weekly", "Monthly", "Quarterly", "One-time / Trial"]} />
        </div>
      </FormSection>
      <FormSection title="Logistics & requirements">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Destination port / city" name="destinationPort" placeholder="e.g. Jebel Ali, Nhava Sheva" value={form.destinationPort} onChange={set("destinationPort")} />
          <SelectInput label="Preferred shipping method" value={form.shippingMethod} onChange={set("shippingMethod")} options={SHIPPING_METHODS} />
          <TextInput label="Quality / grade requirements" name="qualityRequirements" placeholder="e.g. Grade A, EU standards" value={form.qualityRequirements} onChange={set("qualityRequirements")} />
          <TextInput label="Packaging requirements" name="packagingRequirements" placeholder="e.g. 10 kg cartons, private label" value={form.packagingRequirements} onChange={set("packagingRequirements")} />
        </div>
      </FormSection>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional notes</label>
        <textarea name="message" rows={3} value={form.message} onChange={set("message")}
          placeholder="Any other requirements — certifications, cold chain specs, exclusivity, etc."
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
      </div>
      <button type="submit" disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift disabled:opacity-60 self-start">
        {submitting ? "Sending…" : <><Send className="h-4 w-4" /> Request quotation</>}
      </button>
    </form>
  );
}

function FormSection({ title, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, name, type = "text", required, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-accent-orange">*</span>}
      </label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        value={value} onChange={onChange}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand" />
    </div>
  );
}

function SelectInput({ label, required, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-accent-orange">*</span>}
      </label>
      <select value={value} onChange={onChange} required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand">
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 hover-lift">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-3 grid gap-0.5 text-sm text-muted-foreground">
        {lines.map((l) => <div key={l}>{l}</div>)}
      </div>
    </div>
  );
}
