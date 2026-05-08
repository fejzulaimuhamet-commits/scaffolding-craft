import { Helmet } from "react-helmet-async";
import { COMPANY, ASSETS } from "@/lib/site";
import { FAQ_ITEMS } from "@/components/sections/FAQ";

const SITE_URL = "https://wietek-geruestbau.de";

// Echte Testimonials aus Testimonials.tsx (fallbackReviews)
const REVIEWS = [
  {
    author: "Stefan H.",
    location: "Bergedorf",
    text: "Pünktlich aufgebaut, sauber gearbeitet und nach Bauende sofort wieder weg. Genau so wünscht man sich Handwerker.",
    rating: 5,
  },
  {
    author: "Malermeister Krause",
    location: "Hamburg",
    text: "Wir arbeiten seit Jahren mit Wietek. Die Gerüste stehen wie sie sollen – und das Team ist immer ansprechbar.",
    rating: 5,
  },
  {
    author: "Familie Behrens",
    location: "Lüneburg",
    text: "Faires Angebot, schnelle Reaktion auf WhatsApp und super freundliches Team vor Ort. Klare Empfehlung.",
    rating: 5,
  },
  {
    author: "GMS Dachbau",
    location: "Harburg",
    text: "Dachfanggerüst stand am Folgetag. Sicherheitstechnisch top, Abrechnung transparent. Top Partner.",
    rating: 5,
  },
];

const AREA_CITIES = [
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "Bergedorf", lat: 53.4892, lng: 10.2123 },
  { name: "Harburg", lat: 53.4604, lng: 9.9836 },
  { name: "Altona", lat: 53.5503, lng: 9.9352 },
  { name: "Wandsbek", lat: 53.5847, lng: 10.0867 },
  { name: "Norderstedt", lat: 53.7066, lng: 10.0103 },
  { name: "Reinbek", lat: 53.5142, lng: 10.2486 },
  { name: "Geesthacht", lat: 53.4378, lng: 10.3786 },
  { name: "Lüneburg", lat: 53.2509, lng: 10.4146 },
  { name: "Stade", lat: 53.6028, lng: 9.4756 },
  { name: "Pinneberg", lat: 53.6622, lng: 9.7886 },
];

export const Seo = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    alternateName: "Wietek Gerüstbau Hamburg",
    description:
      "Familiengeführter Gerüstbau aus Hamburg-Bergedorf: Fassadengerüste, Innengerüste, Treppentürme, Dachfanggerüste, Schutznetze und Wetterschutzdächer in Hamburg und Norddeutschland.",
    image: ASSETS.hero,
    logo: ASSETS.logoWhite,
    url: `${SITE_URL}/`,
    telephone: COMPANY.phonePrimary,
    email: COMPANY.email,
    priceRange: "€€",
    foundingDate: `${COMPANY.founded}`,
    paymentAccepted: "Rechnung, Überweisung, EC, Bar",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.zip,
      addressLocality: `${COMPANY.city}-${COMPANY.district}`,
      addressRegion: "Hamburg",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4936,
      longitude: 10.2086,
    },
    hasMap: COMPANY.mapsUrl,
    areaServed: AREA_CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.phonePrimary,
        contactType: "customer service",
        areaServed: "DE",
        availableLanguage: ["de", "German"],
      },
    ],
    sameAs: [COMPANY.instagram, COMPANY.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.rating,
      reviewCount: COMPANY.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    makesOffer: [
      { name: "Fassadengerüst Hamburg", url: `${SITE_URL}/leistungen/fassadengeruest` },
      { name: "Innengerüst Hamburg", url: `${SITE_URL}/leistungen/innengeruest` },
      { name: "Treppenturm Hamburg", url: `${SITE_URL}/leistungen/treppenturm` },
      { name: "Dachfanggerüst Hamburg", url: `${SITE_URL}/leistungen/dachfanggeruest` },
      { name: "Schutznetze & Geländer Hamburg", url: `${SITE_URL}/leistungen/schutznetze-gelaender` },
      { name: "Wetterschutzdach Hamburg", url: `${SITE_URL}/leistungen/wetterschutz` },
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: s.url },
    })),
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: COMPANY.name,
    url: `${SITE_URL}/`,
    logo: ASSETS.logoWhite,
    sameAs: [COMPANY.instagram, COMPANY.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phonePrimary,
      contactType: "customer service",
      availableLanguage: ["de"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: COMPANY.name,
    inLanguage: "de-DE",
    publisher: { "@id": `${SITE_URL}/#org` },
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

  return (
    <Helmet>
      <html lang="de" />
      <title>Gerüstbau Hamburg – Fassaden- & Dachgerüst mieten | Wietek</title>
      <meta
        name="description"
        content="Gerüstbau Hamburg vom Familienbetrieb: Fassaden-, Innen-, Dachfanggerüst & Treppentürme. Aufbau in 24–72 h, Festpreis, vollversichert. Jetzt anfragen!"
      />
      <meta
        name="keywords"
        content="Gerüstbau Hamburg, Gerüst mieten Hamburg, Gerüstbauer Hamburg, Fassadengerüst Hamburg, Innengerüst Hamburg, Treppenturm Hamburg, Dachfanggerüst Hamburg, Gerüstbau Bergedorf, Gerüstbau Norddeutschland"
      />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="Wietek Gerüstbau" />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:title" content="Gerüstbau Hamburg – Fassaden- & Dachgerüst mieten | Wietek" />
      <meta property="og:description" content="Familienbetrieb für Gerüstbau in Hamburg: Fassade, Innen, Dachfang, Treppenturm. Aufbau in 24–72 h, Festpreis, vollversichert." />
      <meta property="og:image" content={ASSETS.hero} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Gerüstbau Hamburg – Fassaden- & Dachgerüst | Wietek" />
      <meta name="twitter:description" content="Fassaden-, Innen-, Dachfanggerüste & Treppentürme in Hamburg. Aufbau in 24–72 h, Festpreis, vollversichert." />
      <meta name="twitter:image" content={ASSETS.hero} />
      {/* Geo */}
      <meta name="geo.region" content="DE-HH" />
      <meta name="geo.placename" content="Hamburg" />
      <meta name="geo.position" content="53.4936;10.2086" />
      <meta name="ICBM" content="53.4936, 10.2086" />

      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};
