import { PageSeo } from "@/components/PageSeo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Quote,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { useInViewOnce } from "@/hooks/use-in-view";
import { ASSETS, COMPANY } from "@/lib/site";
import { useAboutPage } from "@/hooks/useSanity";
import { imageUrl } from "@/lib/sanity";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: COMPANY.name,
  url: "https://wietek-geruestbau.de/ueber-uns",
  telephone: COMPANY.phonePrimary,
  email: COMPANY.email,
  foundingDate: `${COMPANY.founded}`,
  image: "https://wietek-geruestbau.de/assets/img/project-images-slideshow/4.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.zip,
    addressLocality: `${COMPANY.city}-${COMPANY.district}`,
    addressCountry: "DE",
  },
  areaServed: [
    "Hamburg",
    "Bergedorf",
    "Harburg",
    "Altona",
    "Norderstedt",
    "Pinneberg",
    "Reinbek",
    "Geesthacht",
    "Lüneburg",
    "Stade",
    "Schleswig-Holstein",
    "Niedersachsen",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: COMPANY.rating,
    reviewCount: COMPANY.ratingCount,
  },
};

const values = [
  {
    icon: ShieldCheck,
    tag: "01",
    title: "Zuverlässigkeit",
    desc: "Termine sind für uns bindend – pünktlicher Aufbau und Abbau ist unser Versprechen an jeden Kunden.",
  },
  {
    icon: HeartHandshake,
    tag: "02",
    title: "Sicherheit",
    desc: "Alle Gerüste werden nach DIN EN 12811 errichtet. Vollversichert, geprüft und normgerecht.",
  },
  {
    icon: Users,
    tag: "03",
    title: "Partnerschaft",
    desc: "Wir denken mit. Von der Planung bis zum Abbau sind wir Ihr persönlicher Ansprechpartner.",
  },
];

const stats = [
  { end: 11, suffix: "+", label: "Jahre Erfahrung", sub: "Familienbetrieb seit 2014" },
  { end: 500, suffix: "+", label: "Abgeschlossene Projekte", sub: "Privat & Gewerbe" },
  { end: 50000, suffix: "+", label: "m² Gerüst aufgebaut", sub: "Hamburg & Norddeutschland", format: true },
  { end: 100, suffix: "%", label: "Familiengeführt", sub: "Eigentümergeführt seit Tag 1" },
];

const workflow = [
  "Aufmaß & Planung vor Ort",
  "Aufbau in 24–72 Stunden",
  "Persönlicher Ansprechpartner",
  "Termingerechter Abbau & Abrechnung",
];

const plzTags = [
  "20095 Hamburg-Mitte",
  "21029 Bergedorf",
  "21031 Lohbrügge",
  "21037 Curslack",
  "21073 Harburg",
  "21217 Seevetal",
  "21465 Reinbek",
  "21502 Geesthacht",
  "21680 Stade",
  "21335 Lüneburg",
  "22041 Wandsbek",
  "22359 Volksdorf",
  "22529 Eimsbüttel",
  "22767 Altona",
  "25421 Pinneberg",
  "22844 Norderstedt",
];

const certs = [
  { icon: Award, title: "Mitglied BG BAU", desc: "Berufsgenossenschaft der Bauwirtschaft." },
  { icon: ShieldCheck, title: "Vollständig versichert", desc: "5 Mio. € Betriebshaftpflicht." },
  { icon: Truck, title: "10+ Jahre Markterfahrung", desc: "Familienbetrieb seit 2014." },
];

const mapQuery = encodeURIComponent(`${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
const mapOpen = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

function Counter({
  end,
  suffix,
  format,
}: {
  end: number;
  suffix: string;
  format?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(Math.round(end * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return (
    <div
      ref={ref}
      className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none"
    >
      {format ? val.toLocaleString("de-DE") : val}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

const Page = () => {
  const { data: about } = useAboutPage();
  const teamImg = imageUrl(about?.teamImage, 1200) || ASSETS.about;
  return (
  <PageLayout>
    <PageSeo
      title="Über uns – Wietek Gerüstbau Hamburg-Bergedorf, seit 2014"
      description="Wietek Gerüstbau – familiengeführter Gerüstbauer aus Hamburg-Bergedorf. Seit 2014 zuverlässig, versichert & persönlich für Bauherren und Handwerker in ganz Hamburg."
      path="/ueber-uns"
      keywords="Wietek Gerüstbau, Gerüstbauer Bergedorf, Familienbetrieb Hamburg, Gerüstbau Hamburg seit 2014"
      breadcrumbs={[
        { name: "Startseite", path: "/" },
        { name: "Über uns", path: "/ueber-uns" },
      ]}
      jsonLd={[localBusiness]}
    />

    <PageHero
      eyebrow="Über uns"
      title="Familiengeführt. Verwurzelt in Hamburg. Seit 2014."
      subtitle="Lernen Sie das Team kennen, das auch dann ans Telefon geht, wenn die Baustelle brennt."
      backgroundImage={ASSETS.aboutBg}
      breadcrumb="Über uns"
    />

    {/* 2. Geschichte – asymmetrisch */}
    <section className="bg-white">
      <div className="container-w py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:pt-10"
          >
            <span className="eyebrow">Unternehmen</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Hamburger Handwerk mit über 10 Jahren Erfahrung
            </h2>
            <p className="mt-6 text-concrete leading-relaxed text-lg">
              Wietek Gerüstbau wurde 2014 in Hamburg-Bergedorf gegründet und steht seitdem für
              zuverlässigen, sicheren und termingerechten Gerüstbau in Hamburg und Norddeutschland.
              Als familiengeführtes Unternehmen legen wir besonderen Wert auf persönliche Betreuung,
              faire Preise und höchste Sicherheitsstandards.
            </p>

            <blockquote className="mt-8 relative bg-plaster border-l-4 border-primary px-6 py-5">
              <Quote className="h-6 w-6 text-primary/40 absolute top-4 right-5" />
              <p className="text-steel font-display font-semibold text-lg leading-snug pr-8">
                „Mit modernster Technik und erfahrenem Team sind wir täglich auf Baustellen in ganz
                Hamburg und Norddeutschland im Einsatz."
              </p>
              <footer className="mt-3 text-xs font-display font-bold uppercase tracking-[0.2em] text-concrete">
                — Geschäftsleitung Wietek Gerüstbau
              </footer>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/leistungen"
                className="inline-flex items-center gap-2 bg-steel text-white hover:bg-primary px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Unsere Leistungen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projekte"
                className="inline-flex items-center gap-2 border-2 border-steel text-steel hover:bg-steel hover:text-white px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Referenzen ansehen
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            {/* L-förmiger roter Akzent oben links */}
            <div className="absolute -top-4 -left-4 z-0 hidden sm:block">
              <div className="h-20 w-20 border-t-[6px] border-l-[6px] border-primary" />
            </div>
            <div className="relative z-10 overflow-hidden bg-steel-deep h-[360px] sm:h-[480px] lg:h-[560px] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.55)]">
              <img
                src={teamImg}
                alt="Wietek Gerüstbau Team auf einer Baustelle in Hamburg"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-primary text-white px-4 py-3 text-xs font-display font-extrabold uppercase tracking-[0.2em]">
                Seit 2014
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* 3. Werte */}
    <section className="bg-plaster py-20 lg:py-28">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow">Unsere Werte</span>
          <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Was uns jeden Tag antreibt
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-12 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            // asymmetrisch: 1. groß, 2. + 3. kleiner
            const span = i === 0 ? "lg:col-span-6" : "lg:col-span-3";
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-white border border-border p-7 lg:p-9 group hover:border-primary transition-colors ${span}`}
              >
                <div className="absolute top-5 right-5 font-display font-extrabold text-5xl text-plaster">
                  {v.tag}
                </div>
                <Icon className="h-10 w-10 text-primary" />
                <h3 className="mt-6 font-display font-extrabold text-steel text-2xl">{v.title}</h3>
                <p className="mt-3 text-concrete leading-relaxed">{v.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>

    {/* 4. Zahlen & Fakten */}
    <section className="bg-blueprint py-20 lg:py-24 relative">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow" style={{ color: "hsl(var(--primary))" }}>
            Wietek in Zahlen
          </span>
          <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Zahlen, die für sich sprechen.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={i > 0 ? "sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8" : ""}
            >
              <Counter end={s.end} suffix={s.suffix} format={s.format} />
              <div className="mt-3 text-sm font-display font-bold uppercase tracking-wider text-white">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-white/60">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="hazard-stripe h-3 absolute inset-x-0 bottom-0" />
    </section>

    {/* 5. Arbeitsweise – Foto links, Text rechts */}
    <section className="bg-white">
      <div className="container-w py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative order-2 lg:order-1"
          >
            <div className="absolute -bottom-4 -right-4 z-0 hidden sm:block">
              <div className="h-20 w-20 border-b-[6px] border-r-[6px] border-primary" />
            </div>
            <div className="relative z-10 overflow-hidden bg-steel-deep h-[360px] sm:h-[480px] lg:h-[560px] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.55)]">
              <img
                src={ASSETS.aboutImg2}
                alt="Wietek Gerüstbau – moderner Aufbau & Layher-Material"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <span className="eyebrow">Arbeitsweise</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
              So arbeitet Wietek Gerüstbau
            </h2>
            <p className="mt-6 text-concrete leading-relaxed text-lg">
              Klar, strukturiert und ehrlich – von der ersten Anfrage bis zum letzten Bauteil.
              Unsere Qualitätskontrolle ist dokumentiert, unsere Planung sauber, unsere Termine
              verbindlich. Auch kurzfristige Aufträge nach Sturm oder bei Bauverzug bekommen wir
              durch eigene Kapazitäten in Hamburg-Bergedorf zuverlässig stemmen.
            </p>

            <ul className="mt-8 space-y-4">
              {workflow.map((w, i) => (
                <motion.li
                  key={w}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-steel font-display font-semibold text-base sm:text-lg">
                    {w}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Aufmaß anfragen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/leistungen"
                className="inline-flex items-center gap-2 border-2 border-steel text-steel hover:bg-steel hover:text-white px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Alle Leistungen
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* 6. Servicegebiet */}
    <section className="bg-plaster py-20 lg:py-28">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="eyebrow">Einsatzgebiet</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Gerüstbau in Hamburg & ganz Norddeutschland
            </h2>
            <p className="mt-6 text-concrete leading-relaxed">
              Unser Stützpunkt liegt in Hamburg-Bergedorf – von hier bedienen wir alle Hamburger
              Stadtteile, Schleswig-Holstein und Niedersachsen: Bergedorf, Harburg, Altona,
              Wandsbek, Eimsbüttel, Lüneburg, Stade, Pinneberg, Norderstedt, Reinbek und
              Geesthacht. Auf Anfrage auch darüber hinaus.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {plzTags.map((t, i) => (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold border ${
                    i % 4 === 0
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-steel border-border"
                  }`}
                >
                  <MapPin className="h-3 w-3" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden border border-border bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]">
              <iframe
                title={`${COMPANY.name} – Standort und Einsatzgebiet`}
                src={mapEmbed}
                className="block w-full h-[340px] lg:h-[460px] border-0"
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
          </motion.div>
        </div>
      </div>
    </section>

    {/* 7. Zertifizierungen */}
    <section className="bg-plaster pb-20 lg:pb-28">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow">Zertifizierungen</span>
          <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Lizenziert, versichert & geprüft
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border p-7 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display font-bold text-steel text-lg leading-tight">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-concrete leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* 8. CTA */}
    <section className="bg-primary py-16 lg:py-24">
      <div className="container-w">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.3em] text-white/80">
            <Zap className="h-3.5 w-3.5" /> Persönlich. Schnell. Familiär.
          </span>
          <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Lernen Sie uns persönlich kennen
          </h2>
          <p className="mt-5 text-white/85 text-lg">
            Rufen Sie uns an oder schreiben Sie uns – wir antworten innerhalb von 24 Stunden.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
            >
              Jetzt Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projekte"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
            >
              <ClipboardList className="h-4 w-4" /> Unsere Projekte ansehen
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </PageLayout>
  );
};

export default Page;
