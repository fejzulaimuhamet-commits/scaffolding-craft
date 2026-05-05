import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ASSETS } from "@/lib/site";

type Category = "Fassade" | "Innen" | "Industrie" | "Sonderlösung";

interface ProjectItem {
  img: string;
  city: string;
  type: Category;
  year: number;
}

// Bilder aus dem Wietek-Bestand (1..59)
const projects: ProjectItem[] = [
  { img: ASSETS.slide(1), city: "Hamburg-Bergedorf", type: "Fassade", year: 2025 },
  { img: ASSETS.slide(2), city: "Hamburg-Altona", type: "Fassade", year: 2025 },
  { img: ASSETS.slide(3), city: "Reinbek", type: "Fassade", year: 2024 },
  { img: ASSETS.slide(4), city: "Hamburg-Harburg", type: "Industrie", year: 2024 },
  { img: ASSETS.slide(5), city: "Geesthacht", type: "Fassade", year: 2024 },
  { img: ASSETS.slide(6), city: "Hamburg-Bergedorf", type: "Innen", year: 2024 },
  { img: ASSETS.slide(7), city: "Lüneburg", type: "Fassade", year: 2024 },
  { img: ASSETS.slide(8), city: "Hamburg", type: "Innen", year: 2023 },
  { img: ASSETS.slide(9), city: "Norderstedt", type: "Innen", year: 2023 },
  { img: ASSETS.slide(10), city: "Stade", type: "Industrie", year: 2023 },
  { img: ASSETS.slide(12), city: "Hamburg-Wandsbek", type: "Fassade", year: 2023 },
  { img: ASSETS.slide(14), city: "Pinneberg", type: "Sonderlösung", year: 2023 },
  { img: ASSETS.slide(15), city: "Hamburg-Bergedorf", type: "Sonderlösung", year: 2023 },
  { img: ASSETS.slide(18), city: "Hamburg", type: "Industrie", year: 2022 },
  { img: ASSETS.slide(20), city: "Hamburg-Eimsbüttel", type: "Fassade", year: 2022 },
  { img: ASSETS.slide(22), city: "Hamburg", type: "Sonderlösung", year: 2022 },
  { img: ASSETS.slide(25), city: "Lüneburg", type: "Industrie", year: 2022 },
  { img: ASSETS.slide(28), city: "Hamburg-Bergedorf", type: "Sonderlösung", year: 2021 },
  { img: ASSETS.slide(30), city: "Hamburg", type: "Fassade", year: 2021 },
  { img: ASSETS.slide(35), city: "Stade", type: "Innen", year: 2021 },
  { img: ASSETS.slide(40), city: "Hamburg-Bergedorf", type: "Sonderlösung", year: 2020 },
  { img: ASSETS.slide(45), city: "Hamburg", type: "Industrie", year: 2020 },
];

const filters: ("Alle" | Category)[] = ["Alle", "Fassade", "Innen", "Industrie", "Sonderlösung"];

const Page = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("Alle");
  const filtered = useMemo(
    () => (active === "Alle" ? projects : projects.filter((p) => p.type === active)),
    [active],
  );

  return (
    <PageLayout>
      <Helmet>
        <title>Referenzen & Projekte | Wietek Gerüstbau Hamburg</title>
        <meta
          name="description"
          content="Über 500 erfolgreich abgeschlossene Gerüstbauprojekte in Hamburg & Norddeutschland. Fassaden, Industrie, Sonderlösungen – alle Referenzen ansehen."
        />
        <link rel="canonical" href="https://wietek-geruestbau.de/projekte" />
      </Helmet>

      <PageHero
        eyebrow="Referenzen"
        title="500+ Projekte. Ein Anspruch: Sicherheit & Pünktlichkeit."
        subtitle="Eine Auswahl unserer Gerüstbau-Projekte aus Hamburg und Norddeutschland."
        backgroundImage={ASSETS.slide(12)}
        breadcrumb="Projekte"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-w">
          <div className="max-w-3xl">
            <span className="eyebrow">Referenzen</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Unsere Referenzen sprechen für sich
            </h2>
            <p className="mt-5 text-concrete leading-relaxed">
              Vom kleinen Einfamilienhaus in Bergedorf bis zur Industrieanlage in Lüneburg –
              jedes Projekt hat seine Geschichte. Filtern Sie nach Kategorie und entdecken Sie
              eine Auswahl aus über 500 abgeschlossenen Aufträgen.
            </p>
          </div>

          {/* Filter */}
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 font-display font-bold uppercase tracking-[0.18em] text-xs transition-colors border-2 ${
                  active === f
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-steel border-border hover:border-steel"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.div
                key={`${p.img}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="group relative overflow-hidden bg-steel-deep aspect-[4/3]"
              >
                <img
                  src={p.img}
                  alt={`Gerüstbau ${p.type} ${p.city} – Wietek Gerüstbau ${p.year}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 text-[10px] font-display font-extrabold uppercase tracking-[0.18em]">
                  {p.type}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-primary" />
                    {p.city}
                  </div>
                  <div className="text-xs text-white/70 mt-1">{p.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 lg:py-20">
        <div className="container-w text-center">
          <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Ihr Projekt als nächstes?
          </h2>
          <p className="mt-5 text-white/85 text-lg">
            Wir beraten Sie unverbindlich und erstellen Ihr Festpreis-Angebot.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
            >
              Jetzt anfragen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Page;
