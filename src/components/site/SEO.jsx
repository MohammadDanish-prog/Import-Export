import { Helmet } from "react-helmet-async";

// TODO: replace with the real production domain once it's live.
export const SITE_URL = "https://www.swapnildinesh.ae";
export const SITE_NAME = "Swapnil Dinesh Trading";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Drop this at the top of any page component to control that page's
 * <title>, meta description, canonical URL, Open Graph / Twitter cards,
 * and (optionally) JSON-LD structured data.
 *
 * Usage:
 *   <SEO
 *     title="Products — Fresh Fruits & Vegetables Export"
 *     description="..."
 *     path="/products"
 *   />
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Global Fresh Produce Excellence`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Reusable JSON-LD builders -------------------------------------------------

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Swapnil Dinesh Trading LLC SOC",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Deira, Dubai",
      addressCountry: "AE",
    },
    sameAs: [],
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
