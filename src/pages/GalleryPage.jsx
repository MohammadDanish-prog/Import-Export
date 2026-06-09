import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GALLERY } from "@/lib/site-data";

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Gallery</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Inside our operations</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From source to shipment — moments captured across our warehouses, cold rooms and trade
          desks.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.tag + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(g)}
              className={`group relative overflow-hidden rounded-3xl border border-border cursor-pointer ${
                i % 5 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              {/* Real image */}
              <img
                src={g.img}
                alt={g.tag}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${g.grad} hidden items-center justify-center text-7xl md:text-8xl`}
              >
                {g.emoji}
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {g.tag}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={selected.img}
                alt={selected.tag}
                className="w-full h-auto max-h-[80vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold text-lg">{selected.tag}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
