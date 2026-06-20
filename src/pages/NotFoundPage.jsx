import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import SEO from "@/components/site/SEO";

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <SEO title="Page Not Found" path="/404" noindex />
      <section className="mx-auto max-w-7xl px-6 py-40 text-center md:px-10">
        <div className="text-8xl mb-6">🌿</div>
        <h1 className="font-display text-5xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover-lift"
        >
          Back to Home
        </Link>
      </section>
    </SiteLayout>
  );
}
