import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/lib/site";
import { FAQ_ITEMS } from "@/components/sections/FAQ";

export const Seo = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: COMPANY.name,
    image: "https://wietek-geruestbau.de/assets/img/project-images-slideshow/1.webp",
    "@id": "https://wietek-geruestbau.de/#organization",
    url: "https://wietek-geruestbau.de/",
    telephone: COMPANY.phonePrimary,
    email: COMPANY.email,
    priceRange: "€€",
    foundingDate: `${COMPANY.founded}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.zip,
      addressLocality: `${COMPANY.city}-${COMPANY.district}`,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4936,
      longitude: 10.2086,
    },
    areaServed: [
      "Hamburg", "Bergedorf", "Harburg", "Altona", "Lüneburg", "Stade",
      "Norderstedt", "Pinneberg", "Reinbek", "Geesthacht",
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    }],
    sameAs: [COMPANY.instagram, COMPANY.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.rating,
      reviewCount: COMPANY.ratingCount,
    },
    makesOffer: [
      "Fassadengerüst", "Innengerüst", "Treppenturm",
      "Dachfanggerüst", "Schutznetze & Geländer", "Wetterschutzdach",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://wietek-geruestbau.de/" },
    ],
  };

  return (
    <Helmet>
      <html lang="de" />
      <title>Gerüstbau Hamburg | Fassadengerüst & mehr – Wietek Gerüstbau</title>
      <meta
        name="description"
        content="Wietek Gerüstbau aus Hamburg-Bergedorf: sicher, pünktlich, ab 24 Std. einsatzbereit. Fassadengerüste, Innengerüste, Treppentürme & Schutznetze in Hamburg und Norddeutschland. Familienunternehmen seit 2014."
      />
      <link rel="canonical" href="https://wietek-geruestbau.de/" />
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
};
