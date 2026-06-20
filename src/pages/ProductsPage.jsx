import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS, COUNTRY_CODES } from "@/lib/site-data";
import SEO from "@/components/site/SEO";

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const categories = ["All", "Fruits", "Vegetables"];

  const list = useMemo(() => {
    return PRODUCTS
      .filter((p) => filter === "All" || p.category === filter)
      .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  }, [filter, q]);

  return (
    <SiteLayout>
      <SEO
        title="Products — Fresh Fruits & Vegetables Catalog"
        description="Browse our catalog of premium fresh fruits and vegetables sourced globally — bananas, mangoes, citrus, leafy greens and more, available year-round and seasonally."
        path="/products"
      />
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Catalog</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Premium fruits &amp; vegetables
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sourced directly from trusted growers and shipped through our cold chain network.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === f
                    ? "bg-foreground text-background border-foreground"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                {f}
                <span className="ml-1.5 text-xs opacity-60">
                  ({f === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === f).length})
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProductCard key={p.name} product={p} onClick={() => setSelected(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products match your filters.
          </div>
        )}
      </section>

      <AnimatePresence>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SiteLayout>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="group text-left rounded-2xl border border-border bg-card overflow-hidden hover-lift"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imgError ? (
          <img
            src={product.img}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback gradient with emoji if image fails */
          <div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-background grid place-items-center text-7xl">
            <span className="transition-transform group-hover:scale-110">{product.emoji}</span>
          </div>
        )}

        {/* Subtle dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
          {product.category}
        </span>

        {/* Availability badge bottom-left */}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur ${
            product.availability === "Year-round"
              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-200 border border-amber-500/30"
          }`}
        >
          {product.availability === "Year-round" ? "● Year-round" : "◐ Seasonal"}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold">{product.name}</h3>

        {/* Origin flags */}
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          {product.origin.slice(0, 3).map((country) => {
            const code = COUNTRY_CODES[country];
            return code ? (
              <img
                key={country}
                src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                alt={country}
                title={country}
                width="20"
                height="13"
                className="rounded-sm shadow-sm"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : null;
          })}
          <span className="text-xs text-muted-foreground truncate">
            {product.origin.join(", ")}
          </span>
        </div>

        <div className="mt-4 inline-flex w-full justify-center rounded-full bg-brand-soft px-3 py-2 text-xs font-semibold text-brand group-hover:bg-gradient-brand group-hover:text-brand-foreground transition">
          Send Inquiry
        </div>
      </div>
    </motion.button>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────

function ProductModal({ product, onClose }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-card border border-border shadow-elevated overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur border border-border"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid sm:grid-cols-2">
          {/* Left — image */}
          <div className="relative aspect-square sm:aspect-auto min-h-[220px] overflow-hidden bg-muted">
            {!imgError ? (
              <img
                src={product.img}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-background grid place-items-center text-[8rem]">
                {product.emoji}
              </div>
            )}
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Category pill over image */}
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-white/15 backdrop-blur border border-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right — details */}
          <div className="p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              {product.category}
            </div>
            <h3 className="mt-1 font-display text-3xl font-bold">{product.name}</h3>

            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5">
                  Origin countries
                </dt>
                <dd className="flex flex-wrap items-center gap-2 font-medium">
                  {product.origin.map((country) => {
                    const code = COUNTRY_CODES[country];
                    return (
                      <span key={country} className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs">
                        {code && (
                          <img
                            src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                            alt={country}
                            width="16"
                            height="11"
                            className="rounded-sm"
                          />
                        )}
                        {country}
                      </span>
                    );
                  })}
                </dd>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-muted/50 p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Availability</dt>
                  <dd className="mt-1 font-medium text-sm">{product.availability}</dd>
                </div>
                <div className="rounded-xl border border-border bg-muted/50 p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">MOQ</dt>
                  <dd className="mt-1 font-medium text-sm">1 pallet</dd>
                </div>
                <div className="col-span-2 rounded-xl border border-border bg-muted/50 p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Packaging</dt>
                  <dd className="mt-1 font-medium text-sm">Standard cartons · custom on request</dd>
                </div>
              </div>
            </dl>

            <a
              href="/contact"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover-lift"
            >
              Request Quotation
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}