import { motion } from "framer-motion";
import { ArrowRight, Calendar, Hammer, Heart } from "lucide-react";
import { ASSETS, COMPANY } from "@/lib/site";

const factIcons = [Calendar, Hammer, Heart];

const defaultFacts = [
  { value: "10+", label: "Jahre" },
  { value: "500+", label: "Projekte" },
  { value: "", label: "Familiengeführt" },
];

export const About = () => {
  const headline: string | undefined = undefined;
  const intro: string | undefined = undefined;
  const stats = defaultFacts;
  return (
    <section id="ueber-uns" className="relative bg-white overflow-hidden">
      {/* Diagonaler Divider oben – kommt aus heller Sektion */}
      <div className="absolute inset-x-0 -top-px h-16 lg:h-24 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-full"
          aria-hidden
        >
          <polygon points="0,0 1440,0 1440,30 0,100" fill="hsl(var(--plaster))" />
        </svg>
      </div>

      {/* Subtiles Bauplan-Raster */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--steel)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--steel)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-w relative pt-28 lg:pt-36 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Bild-Block – bricht oben & unten aus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative lg:-mt-20 lg:-mb-20"
          >
            <div className="relative aspect-[4/5] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <img
                src={ASSETS.about}
                alt="Wietek Gerüstbau Team auf der Baustelle in Hamburg"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* L-förmiger roter Border-Akzent oben links */}
              <div
                aria-hidden
                className="absolute -top-[3px] -left-[3px] w-16 h-16 border-t-[3px] border-l-[3px] border-primary pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Text-Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-12 relative"
          >
            <div className="relative inline-block">
              <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary font-display">
                <span className="block h-[2px] w-8 bg-primary" />
                Über uns
              </span>

              {/* Handgezeichneter Pfeil vom Eyebrow zum Foto */}
              <svg
                aria-hidden
                viewBox="0 0 140 80"
                className="hidden lg:block absolute -left-44 top-1 w-36 h-20 text-primary/70"
                fill="none"
              >
                <path
                  d="M130 12 C 90 18, 50 22, 18 55"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M28 48 L 18 55 L 28 62"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-[1.1]">
              {headline ?? (
                <>
                  Familiengeführt. Verwurzelt in{" "}
                  <span className="hand-underline text-steel">Hamburg</span>.
                  <br />
                  <span className="text-steel/95">Seit {COMPANY.founded}.</span>
                </>
              )}
            </h2>

            <div className="mt-6 space-y-4 text-concrete leading-relaxed max-w-xl">
              {intro ? (
                <p>{intro}</p>
              ) : (
                <>
                  <p>
                    Wir packen seit über zehn Jahren mit eigenem Team und eigenem Material an –
                    von Bergedorf bis Stade. Kein Subunternehmer, keine Ausreden.
                  </p>
                  <p>
                    Wenn wir „morgen früh" sagen, stehen wir morgen früh auf der Baustelle.
                    Das ist unser Wort – und der Grund, warum unsere Kunden wiederkommen.
                  </p>
                </>
              )}
            </div>

            {/* Fact-Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((f, i) => {
                const Icon = factIcons[i % factIcons.length];
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 border border-steel/30 px-4 py-2.5 text-steel text-sm font-display font-bold"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {f.value ? `${f.value} ${f.label}` : f.label}
                  </div>
                );
              })}
            </div>

            <div className="mt-9">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 text-sm font-display font-bold uppercase tracking-wider rounded-sm transition-all duration-200 hover:translate-y-[2px]"
                style={{ boxShadow: "0 8px 0 -2px hsl(0 0% 0% / 0.4)" }}
              >
                Unser Team kennenlernen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
