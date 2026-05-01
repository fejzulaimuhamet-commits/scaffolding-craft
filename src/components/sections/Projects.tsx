import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/site";

type Cat = "Alle" | "Privat" | "Gewerbe" | "Industrie";

type Project = {
  title: string;
  city: string;
  year: string;
  sqm: string;
  cat: Exclude<Cat, "Alle">;
  img: string;
};

const projects: Project[] = [
  { title: "Zweistöckiges Wohnhaus", city: "Bergedorf", year: "2025", sqm: "180 m²", cat: "Privat", img: ASSETS.slide(1) },
  { title: "Dachsanierung Reihenhaus", city: "Hamburg-Nord", year: "2025", sqm: "120 m²", cat: "Privat", img: ASSETS.slide(18) },
  { title: "Bürogebäude Fassade", city: "Hamburg-City", year: "2024", sqm: "640 m²", cat: "Gewerbe", img: ASSETS.slide(4) },
  { title: "Sanierung Kinosaal", city: "Hamburg", year: "2024", sqm: "320 m²", cat: "Gewerbe", img: ASSETS.slide(34) },
  { title: "Industrieanlage Wartung", city: "Harburg", year: "2024", sqm: "1.200 m²", cat: "Industrie", img: ASSETS.slide(22) },
  { title: "Lagerhalle Dacharbeiten", city: "Lüneburg", year: "2024", sqm: "850 m²", cat: "Industrie", img: ASSETS.slide(28) },
  { title: "Altbau-Restaurierung", city: "Eppendorf", year: "2024", sqm: "260 m²", cat: "Privat", img: ASSETS.slide(15) },
  { title: "Hotel Außenfassade", city: "St. Pauli", year: "2023", sqm: "490 m²", cat: "Gewerbe", img: ASSETS.slide(40) },
  { title: "Werkshalle Komplettgerüst", city: "Stade", year: "2023", sqm: "2.100 m²", cat: "Industrie", img: ASSETS.slide(46) },
];

const cats: Cat[] = ["Alle", "Privat", "Gewerbe", "Industrie"];

export const Projects = () => {
  const [active, setActive] = useState<Cat>("Alle");
  const filtered = useMemo(
    () => (active === "Alle" ? projects : projects.filter((p) => p.cat === active)),
    [active],
  );

  return (
    <section id="projekte" className="py-20 lg:py-28 bg-white">
      <div className="container-w">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-14">
          <div>
            <span className="eyebrow">Unsere Projekte</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Was wir <span className="hand-underline">eingerüstet</span> haben.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors ${
                  active === c
                    ? "bg-steel text-white"
                    : "bg-plaster text-steel hover:bg-steel/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative overflow-hidden bg-steel-deep"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.title} – ${p.city}, Wietek Gerüstbau`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1">
                  {p.cat}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-steel-deep via-steel-deep/80 to-transparent">
                  <h3 className="font-display font-extrabold text-white text-lg leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    <span>{p.city}</span>
                    <span>{p.year}</span>
                    <span>{p.sqm}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <a href="#anfrage" className="btn-ghost-dark">
            Eigenes Projekt anfragen
          </a>
        </div>
      </div>
    </section>
  );
};
