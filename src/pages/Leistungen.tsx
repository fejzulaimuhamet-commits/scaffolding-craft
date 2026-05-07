import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageSeo } from "@/components/PageSeo";
import { ArrowRight, Check, Zap, ShieldCheck, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ASSETS } from "@/lib/site";
import { useServiceMap } from "@/hooks/useServiceContent";

type Service = {
  slug: string;
  tag: string;
  title: string;
  intro: string;
  bullets: string[];
  img: string;
  to: string;
};

const fallbackServices: Service[] = [
  {
    slug: "fassadengeruest",
    tag: "Fassade",
    title: "Fassadengerüste",
    intro:
      "Sichere und flexible Arbeitsgerüste für Wohn- und Gewerbegebäude. Wir planen, liefern, montieren und demontieren – passgenau für Ihr Bauvorhaben.",
    bullets: [
      "Sanierung, Neubau und Malerarbeiten",
      "Belastungsklassen 3–6 nach DIN EN 12811",
      "Inklusive Schutznetzen und Bordbrettern",
      "Statik und Aufbauplan auf Wunsch",
    ],
    img: ASSETS.placeholder.fassade,
    to: "/leistungen/fassadengeruest",
  },
  {
    slug: "innengeruest",
    tag: "Innen",
    title: "Innengerüste",
    intro:
      "Kompakte und stabile Lösungen für Renovierungen, Maler-, Decken- und Trockenbauarbeiten in Innenräumen – auch bei begrenzten Platzverhältnissen.",
    bullets: [
      "Rollgerüste und feste Innengerüste",
      "Schonend für Böden und Wände",
      "Schneller Auf- und Abbau",
      "Auch für hohe Räume und Hallen",
    ],
    img: ASSETS.placeholder.innen,
    to: "/leistungen/innengeruest",
  },
  {
    slug: "treppenturm",
    tag: "Aufstieg",
    title: "Treppentürme",
    intro:
      "Sichere und bequeme Aufstiegslösungen für Baustellen, Veranstaltungen oder als Fluchtweg – schnell montiert, normgerecht und stabil.",
    bullets: [
      "Hohe Tragfähigkeit für viel Personenverkehr",
      "Mit Handlauf und Knieleiste",
      "Auch als Notausgang einsetzbar",
      "Beliebige Höhen realisierbar",
    ],
    img: ASSETS.placeholder.treppe,
    to: "/leistungen/treppenturm",
  },
  {
    slug: "dachfanggeruest",
    tag: "Dachschutz",
    title: "Dachfanggerüste",
    intro:
      "Sicherer Auffangschutz für Dachdecker-, Sanierungs- und Klempnerarbeiten – konform mit DGUV Information 201-011 und der Arbeitsstättenverordnung.",
    bullets: [
      "Schutz bei Arbeiten über 3 m Absturzhöhe",
      "Mit Schutzwand und Bordbrett",
      "Statisch geprüfte Verankerung",
      "Auch für Steildächer geeignet",
    ],
    img: ASSETS.placeholder.dach,
    to: "/leistungen/dachfanggeruest",
  },
  {
    slug: "schutznetze-gelaender",
    tag: "Sicherheit",
    title: "Schutznetze & Geländer",
    intro:
      "Absturzsicherung nach DGUV: Schutzgeländer, Auffangnetze und temporäre Sicherheitsvorrichtungen – einzeln oder in Kombination mit unseren Gerüsten.",
    bullets: [
      "Seitenschutzgeländer aus Stahl",
      "Auffang- und Schutznetze",
      "Schnelle Montage am Bestand",
      "Vermietung oder Komplett-Service",
    ],
    img: ASSETS.placeholder.schutz,
    to: "/leistungen/schutznetze-gelaender",
  },
  {
    slug: "wetterschutz",
    tag: "Wetter",
    title: "Wetterschutzdach",
    intro:
      "Trockene Baustelle bei jeder Witterung. Mit unserem Wetterschutzdach arbeiten Ihre Gewerke termintreu – unabhängig von Regen, Schnee oder Wind.",
    bullets: [
      "Freie Spannweiten bis 30 m",
      "Lichtdurchlässige Planen",
      "Kombinierbar mit Fassadengerüst",
      "Schutz für Dachstuhl & Sanierung",
    ],
    img: ASSETS.placeholder.wetter,
    to: "/leistungen/wetterschutz",
  },
];

// Hero ersetzt durch wiederverwendbare PageHero-Komponente


const ServiceRow = ({ service, index }: { service: Service; index: number }) => {
  const reverse = index % 2 === 1;
  const bgAlt = index % 2 === 1;

  return (
    <section className={bgAlt ? "bg-muted" : "bg-white"}>
      <div className="container-w py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Bild */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}
          >
            <div className="relative overflow-hidden bg-steel-deep h-[320px] sm:h-[420px] lg:h-[500px] group">
              <img
                src={service.img}
                alt={`${service.title} – Wietek Gerüstbau Hamburg`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 text-[10px] font-display font-extrabold uppercase tracking-[0.18em] shadow-md">
                {service.tag}
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <span className="eyebrow">{service.tag}</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {service.title}
            </h2>
            <p className="mt-5 text-concrete leading-relaxed text-base lg:text-lg">
              {service.intro}
            </p>

            <ul className="mt-6 space-y-3">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-steel text-sm sm:text-base">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Jetzt anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={service.to}
                className="inline-flex items-center gap-2 border-2 border-steel text-steel hover:bg-steel hover:text-white px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
              >
                Mehr erfahren
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const reasons = [
  {
    icon: Zap,
    title: "Schnell",
    desc: "Aufbau in 24–72 Stunden nach Auftragserteilung – planbar und termintreu.",
  },
  {
    icon: ShieldCheck,
    title: "Versichert",
    desc: "Vollständig haftpflicht- & betriebsversichert, DGUV-geprüft.",
  },
  {
    icon: Users,
    title: "Familiengeführt",
    desc: "Inhabergeführtes Familienunternehmen aus Hamburg-Bergedorf.",
  },
];

const WarumWietek = () => (
  <section className="bg-steel-deep py-20 lg:py-28">
    <div className="container-w">
      <div className="max-w-3xl">
        <span className="eyebrow">Warum Wietek</span>
        <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Drei Versprechen, die wir halten.
        </h2>
      </div>

      <div className="mt-12 lg:mt-16 grid sm:grid-cols-3 gap-8 lg:gap-12">
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="mt-5 font-display font-bold text-white text-2xl">
                {r.title}
              </h3>
              <p className="mt-3 text-white/75 leading-relaxed">{r.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-primary py-16 lg:py-20">
    <div className="container-w">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Welches Gerüst brauchen Sie?
        </h2>
        <p className="mt-5 text-white/85 text-lg">
          Wir beraten Sie unverbindlich und erstellen Ihr Festpreis-Angebot.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
          >
            Jetzt kostenlos anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const Leistungen = () => {
  const cms = useServiceMap();
  const services: Service[] = fallbackServices.map((s) => {
    const c = cms.get(s.slug);
    return {
      ...s,
      title: c?.title || s.title,
      intro: c?.description || s.intro,
      bullets: c?.features?.length ? c.features : s.bullets,
      img: c?.image || s.img,
    };
  });
  return (
  <PageLayout>
    <PageSeo
      title="Leistungen Gerüstbau Hamburg | Wietek Gerüstbau"
      description="Alle Gerüstbau-Leistungen aus Hamburg: Fassaden-, Innen- & Dachfanggerüste, Treppentürme, Schutznetze, Wetterschutzdach. Aufbau in 24–72 Std., Festpreis."
      path="/leistungen"
      keywords="Gerüstbau Hamburg, Gerüst mieten Hamburg, Fassadengerüst Hamburg, Innengerüst Hamburg, Treppenturm Hamburg, Wietek Gerüstbau"
      breadcrumbs={[
        { name: "Startseite", path: "/" },
        { name: "Leistungen", path: "/leistungen" },
      ]}
    />
    <PageHero
      eyebrow="Unsere Leistungen"
      title="Gerüstlösungen für jeden Einsatz"
      subtitle="Von der privaten Fassade bis zum großen Bauprojekt – wir liefern das passende Gerüst für Ihr Vorhaben."
      backgroundImage={ASSETS.placeholder.fassade}
      breadcrumb="Leistungen"
    />
    {services.map((s, i) => (
      <ServiceRow key={s.title} service={s} index={i} />
    ))}
    <WarumWietek />
    <CTASection />
  </PageLayout>
  );
};

export default Leistungen;
