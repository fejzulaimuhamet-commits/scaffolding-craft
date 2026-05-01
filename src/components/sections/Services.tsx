import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/site";

const services = [
  {
    title: "Fassadengerüste",
    desc: "Sichere und flexible Gerüste für Wohn-, Gewerbe- und Industriegebäude – individuell an Struktur und Höhe angepasst.",
    img: ASSETS.slide(1),
  },
  {
    title: "Innengerüste",
    desc: "Kompakte, anpassbare Lösungen für Renovierungen, Maler-, Elektro- und Deckenarbeiten im Innenbereich.",
    img: ASSETS.slide(8),
  },
  {
    title: "Treppentürme",
    desc: "Stabile Aufstiegslösungen für komplexe Baustellen – schnell montiert, sicher begehbar.",
    img: ASSETS.slide(22),
  },
  {
    title: "Dachfanggerüste",
    desc: "Sicherer Auffangschutz für Dachdecker- und Sanierungsarbeiten – nach DGUV-Vorgaben.",
    img: ASSETS.slide(15),
  },
  {
    title: "Schutznetze & Geländer",
    desc: "Montage von Schutzgeländern, Netzen und weiteren Sicherheitsvorrichtungen für Ihre Baustelle.",
    img: ASSETS.slide(28),
  },
  {
    title: "Wetterschutzdach",
    desc: "Trockene Baustelle bei jeder Witterung – Wetterschutzdächer für termintreue Arbeiten.",
    img: ASSETS.slide(40),
  },
];

export const Services = () => {
  return (
    <section id="leistungen" className="py-20 lg:py-28 bg-white">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Unsere Leistungen</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Hochwertige Gerüstlösungen –{" "}
              <span className="hand-underline">für jedes Bauvorhaben.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-concrete leading-relaxed">
              Von der Einfamilienhaus-Sanierung bis zur Industrieanlage: Wir liefern, bauen
              und demontieren – komplett und termingerecht.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#anfrage"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-plaster border border-border hover:border-primary transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={`${s.title} – Wietek Gerüstbau Hamburg`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-extrabold text-xl text-steel group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <ArrowUpRight className="h-6 w-6 text-steel group-hover:text-primary group-hover:rotate-12 transition-all shrink-0" />
                </div>
                <p className="mt-3 text-sm text-concrete leading-relaxed">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-primary">
                  Anfrage stellen
                  <span className="block h-px w-6 bg-primary group-hover:w-12 transition-all" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
