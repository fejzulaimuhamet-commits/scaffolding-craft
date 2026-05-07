import { PageSeo } from "@/components/PageSeo";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { RequestWizard } from "@/components/sections/RequestWizard";
import { ASSETS, COMPANY, waLink } from "@/lib/site";
import contactHeroDark from "@/assets/contact-hero-dark.jpg";

const mapQuery = encodeURIComponent(`${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
const mapOpen = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://wietek-geruestbau.de/kontakt",
  mainEntity: {
    "@type": "GeneralContractor",
    "@id": "https://wietek-geruestbau.de/#organization",
    name: COMPANY.name,
    telephone: COMPANY.phonePrimary,
    email: COMPANY.email,
    url: "https://wietek-geruestbau.de/",
    image: ASSETS.hero,
    logo: ASSETS.logoWhite,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.zip,
      addressLocality: `${COMPANY.city}-${COMPANY.district}`,
      addressRegion: "HH",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4936,
      longitude: 10.2086,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.rating,
      reviewCount: COMPANY.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  },
};

const channels = [
  {
    icon: Phone,
    label: "Telefon",
    value: COMPANY.phonePrimaryDisplay,
    href: `tel:${COMPANY.phonePrimary}`,
    note: "Mo–Fr 7:00–17:00 Uhr",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: COMPANY.phoneMobileDisplay,
    href: waLink(),
    note: "Antwort meist in unter 2 Std.",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    note: "Innerhalb von 24 Std.",
  },
];

const Page = () => (
  <PageLayout>
    <PageSeo
      title="Kontakt Wietek Gerüstbau Hamburg – Anfrage starten"
      description={`Gerüst anfragen in Hamburg. Kostenlose Beratung, Antwort in 24 Std. Tel: ${COMPANY.phonePrimaryDisplay} | ${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}-${COMPANY.district}.`}
      path="/kontakt"
      keywords="Kontakt Gerüstbau Hamburg, Wietek Gerüstbau Telefon, Gerüst Hamburg anfragen, Gerüstbauer Bergedorf Kontakt"
      breadcrumbs={[
        { name: "Startseite", path: "/" },
        { name: "Kontakt", path: "/kontakt" },
      ]}
      jsonLd={[contactSchema]}
    />

    <PageHero
      eyebrow="Kontakt"
      title="Direkt mit dem Wietek-Team sprechen"
      subtitle="Anrufen, schreiben oder Anfrage stellen – wir antworten persönlich und schnell."
      backgroundImage={contactHeroDark}
      breadcrumb="Kontakt"
    />

    {/* Kontaktwege */}
    <section className="bg-white py-16 lg:py-20">
      <div className="container-w">
        <div className="grid sm:grid-cols-3 gap-5">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === "WhatsApp" ? "_blank" : undefined}
                rel={c.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-border bg-plaster p-7 hover:border-primary transition-colors group"
              >
                <Icon className="h-9 w-9 text-primary" />
                <div className="mt-4 text-xs font-display font-bold uppercase tracking-[0.2em] text-concrete">
                  {c.label}
                </div>
                <div className="mt-1 font-display font-extrabold text-steel text-xl group-hover:text-primary transition-colors">
                  {c.value}
                </div>
                <div className="mt-2 text-sm text-concrete">{c.note}</div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>

    {/* Anfrage-Wizard */}
    <RequestWizard />

    {/* Adresse + Karte */}
    <section className="bg-white py-20 lg:py-28">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">Standort</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Wietek Gerüstbau in Hamburg-Bergedorf
            </h2>
            <p className="mt-5 text-concrete leading-relaxed">
              Unser Stützpunkt liegt zentral im Hamburger Osten – kurze Wege in alle Stadtteile
              und ins Umland.
            </p>

            <div className="mt-8 space-y-5">
              <Row icon={MapPin} title="Adresse">
                {COMPANY.street}
                <br />
                {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
              </Row>
              <Row icon={Phone} title="Telefon">
                <a href={`tel:${COMPANY.phonePrimary}`} className="hover:text-primary">
                  {COMPANY.phonePrimaryDisplay}
                </a>
                <br />
                <a href={`tel:${COMPANY.phoneMobile}`} className="hover:text-primary">
                  {COMPANY.phoneMobileDisplay} (mobil / WhatsApp)
                </a>
              </Row>
              <Row icon={Mail} title="E-Mail">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">
                  {COMPANY.email}
                </a>
              </Row>
              <Row icon={Clock} title="Öffnungszeiten">
                {COMPANY.hours}
              </Row>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] border border-border bg-white">
              <iframe
                title={`${COMPANY.name} – Standort auf Google Maps`}
                src={mapEmbed}
                className="block w-full h-[300px] lg:h-[450px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={mapOpen}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" /> In Google Maps öffnen
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

const Row = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <span className="grid h-11 w-11 place-items-center bg-plaster text-primary shrink-0">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <div className="font-display font-extrabold text-steel text-sm uppercase tracking-wider">
        {title}
      </div>
      <div className="mt-1 text-concrete">{children}</div>
    </div>
  </div>
);

export default Page;
