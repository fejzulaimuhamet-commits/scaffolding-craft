import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "@/lib/site";
import { useServiceMap } from "@/hooks/useServiceContent";
import { useHomepage } from "@/hooks/useSanity";

type Service = {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
};

const fallback: Service[] = [
  {
    slug: "fassadengeruest",
    tag: "Fassade",
    title: "Fassadengerüste",
    desc: "Sichere und flexible Gerüste für Wohn- und Bestandsgebäude – individuell an Struktur und Höhe angepasst.",
    img: ASSETS.placeholder.fassade,
  },
  {
    slug: "innengeruest",
    tag: "Innen",
    title: "Innengerüste",
    desc: "Kompakte Lösungen für Renovierungen, Maler- und Deckenarbeiten im Innenbereich.",
    img: ASSETS.placeholder.innen,
  },
  {
    slug: "treppenturm",
    tag: "Aufstieg",
    title: "Treppentürme",
    desc: "Stabile Aufstiegslösungen für komplexe Baustellen – schnell montiert.",
    img: ASSETS.placeholder.treppe,
  },
  {
    slug: "dachfanggeruest",
    tag: "Dachschutz",
    title: "Dachfanggerüste",
    desc: "Sicherer Auffangschutz für Dachdecker- und Sanierungsarbeiten – nach DGUV-Vorgaben.",
    img: ASSETS.placeholder.dach,
  },
  {
    slug: "schutznetze-gelaender",
    tag: "Sicherheit",
    title: "Schutznetze & Geländer",
    desc: "Montage von Schutzgeländern, Netzen und Sicherheitsvorrichtungen für Ihre Baustelle.",
    img: ASSETS.placeholder.schutz,
  },
  {
    slug: "wetterschutz",
    tag: "Wetter",
    title: "Wetterschutzdach",
    desc: "Trockene Baustelle bei jeder Witterung – für termintreue Arbeiten.",
    img: ASSETS.placeholder.wetter,
  },
];

const Card = ({
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
    <motion.a
      href="#anfrage"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`group relative block overflow-hidden bg-steel-deep ${className}`}
    >
      {/* Foto */}
      <img
        src={service.img}
        alt={`${service.title} – Wietek Gerüstbau Hamburg`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dunkler Gradient unten */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(217 40% 8% / 0) 30%, hsl(217 40% 8% / 0.55) 65%, hsl(217 40% 8% / 0.92) 100%)",
        }}
      />

      {/* Tag oben links */}
      <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 text-[10px] font-display font-extrabold uppercase tracking-[0.18em] shadow-md">
        {service.tag}
      </div>

      {/* Roter Hover-Balken unten */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-10" />

      {/* Content */}
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
    </motion.a>
  );
};

export const Services = () => {
  const cms = useServiceMap();
  const { data: hp } = useHomepage();
  const services: Service[] = fallback.map((s) => {
    const c = cms.get(s.slug);
    return {
      ...s,
      title: c?.title ?? s.title,
      desc: c?.description ?? s.desc,
      img: c?.image ?? s.img,
    };
  });
  const eyebrow = hp?.servicesEyebrow ?? "Unsere Leistungen";
  const title = hp?.servicesTitle ?? "Hochwertige Gerüstlösungen – für jedes Bauvorhaben.";
  const intro = hp?.servicesIntro ?? "Von der Einfamilienhaus-Sanierung bis zum großen Wohnobjekt: Wir liefern, bauen und demontieren – komplett und termingerecht.";
  return (
    <section id="leistungen" className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-white">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-concrete leading-relaxed">{intro}</p>
          </div>
        </div>

        {/* Reihe 1: Hero-Karte links 60%, 2 gestapelte rechts 40% */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">
          <div className="lg:col-span-3">
            <Card service={services[0]} size="lg" className="h-[420px] sm:h-[520px] lg:h-[620px]" />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 gap-3">
            <Card service={services[1]} size="md" className="h-[260px] lg:h-[305px]" />
            <Card service={services[2]} size="md" className="h-[260px] lg:h-[305px]" />
          </div>
        </div>

        {/* Reihe 2: 3 gleichbreite Karten, mittlere etwas höher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <Card service={services[3]} size="md" className="h-[320px] lg:h-[380px]" />
          <Card service={services[4]} size="md" className="h-[360px] lg:h-[440px]" />
          <Card service={services[5]} size="md" className="h-[320px] lg:h-[380px]" />
        </div>
      </div>
    </section>
  );
};
