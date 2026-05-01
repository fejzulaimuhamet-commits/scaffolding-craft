import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { ASSETS, COMPANY } from "@/lib/site";

const usps = [
  "Aufbau in 24–72 Stunden",
  "Familienunternehmen seit 2014",
  "Vollständig versichert & geprüft",
];

export const Hero = () => {
  return (
    <section id="top" className="relative pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-plaster">
      {/* Bauplan-Raster Hintergrund subtil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--steel)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--steel)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left – Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow">Gerüstbau aus Hamburg-{COMPANY.district}</span>

            <h1 className="mt-5 font-display font-extrabold text-[2.25rem] sm:text-5xl lg:text-[4rem] leading-[1.05] text-steel">
              Gerüstbau in Hamburg –{" "}
              <span className="hand-underline text-steel">sicher, pünktlich</span>,
              <br className="hidden sm:block" />
              ab 24 Std. einsatzbereit.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-concrete leading-relaxed">
              Familiengeführter Gerüstbau aus {COMPANY.city}-{COMPANY.district}. Wir liefern,
              montieren und demontieren Gerüste für Privathaushalte, Handwerker und Industrie –
              schnell, sauber und mit echtem Wort.
            </p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
              {usps.map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-sm font-semibold text-steel">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {u}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#anfrage" className="btn-primary justify-center">
                Kostenloses Angebot in 60 Sek.
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projekte" className="btn-ghost-dark justify-center">
                Projekte ansehen
              </a>
            </div>

            {/* Trust bar */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-concrete">
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-signal text-signal" />
                  ))}
                </span>
                <span className="text-steel">{COMPANY.rating}</span> Google-Bewertung
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> BG BAU Mitglied
              </span>
              <span className="h-4 w-px bg-border" />
              <span>Versichert bis 5 Mio. €</span>
            </div>
          </motion.div>

          {/* Right – Bild-Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full">
              <img
                src={ASSETS.slide(18)}
                alt="Eingerüstetes Wohnhaus in Hamburg von Wietek Gerüstbau"
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]"
              />
              {/* Stempel */}
              <div className="absolute -left-3 sm:-left-6 top-6 bg-primary text-white font-display font-extrabold uppercase tracking-wider text-xs px-4 py-2 rotate-[-6deg] shadow-lg">
                Hamburg · seit 2014
              </div>
              {/* Maßband-Markierung unten */}
              <div className="absolute -bottom-4 -right-4 bg-signal text-steel-deep font-display font-extrabold px-5 py-3 shadow-lg">
                <div className="text-2xl leading-none">24h</div>
                <div className="text-[10px] uppercase tracking-wider mt-1">einsatzbereit</div>
              </div>
            </div>

            {/* Polaroid-Overlay */}
            <div className="hidden md:block absolute -bottom-8 -left-10 w-44 polaroid">
              <img
                src={ASSETS.slide(34)}
                alt="Detailansicht Fassadengerüst Hamburg"
                loading="lazy"
                className="aspect-square object-cover w-full"
              />
              <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-display font-bold uppercase tracking-wider text-steel">
                Bergedorf · 2024
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Maßband-Divider unten */}
      <div className="container-w mt-16">
        <div className="ruler-divider" />
      </div>
    </section>
  );
};
