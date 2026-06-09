import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[color-mix(in_oklab,var(--ink)_96%,transparent)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand">
                {/* Leaf SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </span>
              <span className="font-display font-bold">Swapnil Dinesh LLC</span>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Premium import & export of fresh fruits and vegetables from Dubai to the world.
            </p>
            <div className="mt-5 flex gap-2">
              {/* LinkedIn */}
              <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-brand hover:text-brand-foreground hover:border-brand transition" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-brand hover:text-brand-foreground hover:border-brand transition" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-brand hover:text-brand-foreground hover:border-brand transition" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Company</h4>
            <ul className="mt-4 grid gap-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/quality" className="hover:text-white">Quality Assurance</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Trade</h4>
            <ul className="mt-4 grid gap-2 text-sm text-white/60">
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/markets" className="hover:text-white">Import Markets</Link></li>
              <li><Link to="/markets" className="hover:text-white">Export Markets</Link></li>
              <li><Link to="/contact" className="hover:text-white">Request Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Get in Touch</h4>
            <ul className="mt-4 grid gap-3 text-sm text-white/60">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" /> Deira, Dubai, United Arab Emirates</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-brand" /> +971 4 000 0000</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-brand" /> trade@swapnildinesh.ae</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Swapnil Dinesh Vegetable and Fruit Trading LLC SOC. All rights reserved.</p>
          <p>Licensed in the United Arab Emirates.</p>
        </div>
      </div>
    </footer>
  );
}
