import { Helmet } from "react-helmet-async";
import { ASSETS } from "@/lib/site";

const SITE_URL = "https://wietek-geruestbau.de";
const DEFAULT_OG_IMAGE = ASSETS.hero;

export interface BreadcrumbItem {
  name: string;
  path: string; // e.g. "/leistungen"
}

export interface PageSeoProps {
  title: string;
  description: string;
  path: string; // canonical path, starts with "/"
  ogImage?: string;
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export const PageSeo = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  breadcrumbs,
  noindex = false,
  jsonLd = [],
}: PageSeoProps) => {
  const url = `${SITE_URL}${path}`;
  const robots = noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large";

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: `${SITE_URL}${b.path}`,
          })),
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="Wietek Gerüstbau" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo (Hamburg) */}
      <meta name="geo.region" content="DE-HH" />
      <meta name="geo.placename" content="Hamburg" />
      <meta name="geo.position" content="53.4936;10.2086" />
      <meta name="ICBM" content="53.4936, 10.2086" />

      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
};
