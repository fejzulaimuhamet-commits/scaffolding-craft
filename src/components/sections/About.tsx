import { motion } from "framer-motion";
import { Award, Users, Wrench } from "lucide-react";
import { ASSETS, COMPANY } from "@/lib/site";

const points = [
  { icon: Users, title: "Familienunternehmen", text: `Seit ${COMPANY.founded} aus ${COMPANY.city}-${COMPANY.district}` },
  { icon: Award, title: "Über 10 Jahre Erfahrung", text: "Hunderte abgeschlossene Projekte" },
  { icon: Wrench, title: "Eigenes Material & Team", text: "Keine Subunternehmer, keine Verzögerungen" },
];

export const About = () => {
  return (
    <section id="ueber-uns" className="py-20 lg:py-28 bg-plaster overflow-hidden">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Bild-Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5]">
              <img
                src={ASSETS.about}
                alt="Wietek Gerüstbau Team auf der Baustelle in Hamburg"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute -bottom-5 -right-5 hidden sm:block bg-signal text-steel-deep p-5 max-w-[210px] shadow-xl">
                <div className="font-display font-extrabold text-3xl leading-none">10+</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">
                  Jahre Gerüstbau in Hamburg
                </div>
              </div>
              <div className="absolute -top-5 -left-5 hidden sm:block bg-primary text-white px-4 py-2 font-display font-extrabold uppercase text-xs tracking-wider rotate-[-4deg] shadow-lg">
                Inhabergeführt
              </div>
            </div>
          </motion.div>

          {/* Text-Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow">Über uns</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Ihr Experte für <span className="hand-underline">Gerüstbau & Sicherheit</span> in Hamburg.
            </h2>
            <div className="mt-6 space-y-4 text-concrete leading-relaxed">
              <p>
                Wietek Gerüstbau ist ein familiengeführtes Unternehmen mit Sitz in {COMPANY.city}-{COMPANY.district}.
                Seit unserer Gründung im Jahr {COMPANY.founded} setzen wir uns für sichere, effiziente und
                maßgeschneiderte Gerüstlösungen ein – für jedes Bau- und Renovierungsprojekt.
              </p>
              <p>
                Ob Bauunternehmer, Handwerker oder Hausbesitzer: Wir bringen das Fachwissen, die Materialien
                und die Mannschaft mit – und stehen mit unserem Namen für jeden Aufbau.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {points.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="bg-white p-5 border-t-2 border-primary">
                    <Icon className="h-6 w-6 text-primary" />
                    <div className="mt-3 font-display font-extrabold text-steel text-sm">{p.title}</div>
                    <div className="mt-1 text-xs text-concrete">{p.text}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#anfrage" className="btn-primary">Jetzt Gerüst anfragen</a>
              <a href="#kontakt" className="btn-ghost-dark">Kontakt aufnehmen</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
