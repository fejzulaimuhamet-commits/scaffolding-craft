import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Zap, ShieldCheck, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ASSETS } from "@/lib/site";

type Service = {
  tag: string;
  title: string;
  desc: string;
  img: string;
  to: string;
};

const services: Service[] = [
  {
    tag: "Fassade",
    title: "Fassadengerüst",
    desc: "Für Sanierung, Neubau & Malerarbeiten",
    img: ASSETS.slide(1),
    to: "/leistungen/fassadengeruest",
  },
  {
    tag: "Innen",
    title: "Innengerüst",
    desc: "Sicher & flexibel für Innenräume",
    img: ASSETS.slide(8),
    to: "/leistungen/innengeruest",
  },
  {
    tag: "Aufstieg",
    title: "Treppenturm",
    desc: "Sicherer Zugang auf jeder Baustelle",
    img: ASSETS.slide(22),
    to: "/leistungen/treppenturm",
  },
  {
    tag: "Dachschutz",
    title: "Dachfanggerüst",
    desc: "Schutz bei Dacharbeiten aller Art",
    img: ASSETS.slide(15),
    to: "/leistungen/dachfanggeruest",
  },
  {
    tag: "Sicherheit",
    title: "Schutznetze & Geländer",
    desc: "Absturzsicherung nach DGUV",
    img: ASSETS.slide(28),
    to: "/leistungen/schutznetze-gelaender",
  },
  {
    tag: "Wetter",
    title: "Wetterschutz",
    desc: "Arbeiten bei jedem Wetter",
    img: ASSETS.slide(40),
    to: "/leistungen/wetterschutz",
  },
];

const ServiceCard = ({
  service,
  className = "",
  size = "md",
}: {
  service: Service;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const titleSize =
    size === "lg"
      ? "text-3xl sm:text-4xl lg:text-5xl"
      : size === "sm"
      ? "text-lg sm:text-xl"
      : "text-xl sm:text-2xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link
        to={service.to}
        className="group relative block h-full w-full overflow-hidden bg-steel-deep"
      >
        <img
          src={service.img}
          alt={`${service.title} – Wietek Gerüstbau Hamburg`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(217 40% 8% / 0) 30%, hsl(217 40% 8% / 0.55) 65%, hsl(217 40% 8% / 0.92) 100%)",
          }}
        />

        <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 text-[10px] font-display font-extrabold uppercase tracking-[0.18em] shadow-md">
          {service.tag}
        </div>

        <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-10" />

        <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-7">
          <h3 className={`font-display font-bold text-white leading-tight ${titleSize}`}>
            {service.title}
          </h3>
          {size !== "sm" && (
            <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md line-clamp-2">
              {service.desc}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-white/90 transition-all duration-300 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
            Mehr erfahren
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const LeistungenHero = () => (
  <section className="bg-steel-deep py-16 lg:py-24">
    <div className="container-w">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">Unsere Leistungen</span>
        <h1 className="mt-5 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Gerüstlösungen für jeden Einsatz
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
          Von der privaten Fassade bis zum Industrieprojekt – wir liefern das passende
          Gerüst für Ihr Vorhaben.
        </p>
      </motion.div>
    </div>
  </section>
);

const ServicesGrid = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="container-w">
      <div className="mb-12 lg:mb-16 max-w-3xl">
        <span className="eyebrow">Übersicht</span>
        <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
          Sechs Leistungen – ein Anspruch:{" "}
          <span className="hand-underline">Sicherheit & Termintreue.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">
        <ServiceCard
          service={services[0]}
          size="lg"
          className="lg:col-span-3 h-[420px] sm:h-[520px] lg:h-[620px]"
        />
        <div className="lg:col-span-2 grid grid-cols-1 gap-3">
          <ServiceCard service={services[1]} size="md" className="h-[260px] lg:h-[305px]" />
          <ServiceCard service={services[2]} size="md" className="h-[260px] lg:h-[305px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <ServiceCard service={services[3]} size="md" className="h-[320px] lg:h-[380px]" />
        <ServiceCard service={services[4]} size="md" className="h-[360px] lg:h-[440px]" />
        <ServiceCard service={services[5]} size="md" className="h-[320px] lg:h-[380px]" />
      </div>
    </div>
  </section>
);

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
    desc: "Inhabergeführtes Familienunternehmen aus Hamburg-Bergedorf seit 2014.",
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

const Leistungen = () => (
  <PageLayout>
    <Helmet>
      <title>Leistungen | Wietek Gerüstbau Hamburg</title>
      <meta
        name="description"
        content="Fassadengerüst, Innengerüst, Treppenturm, Dachfanggerüst, Schutznetze und Wetterschutz – Wietek Gerüstbau aus Hamburg liefert die passende Lösung."
      />
    </Helmet>
    <LeistungenHero />
    <ServicesGrid />
    <WarumWietek />
    <CTASection />
  </PageLayout>
);

export default Leistungen;
