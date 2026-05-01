import { Hammer, Home, PaintBucket, Sun } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  {
    icon: Hammer,
    title: "Dachdecker",
    desc: "Dachfanggerüste, Lastenaufzüge & sicherer Materialtransport.",
  },
  {
    icon: PaintBucket,
    title: "Maler & Putzer",
    desc: "Fassadengerüste mit allen Bühnen, präzise an den Putzaufbau angepasst.",
  },
  {
    icon: Sun,
    title: "Solar / PV",
    desc: "Sichere Aufstiegslösungen und Auffangsysteme für PV-Montage.",
  },
  {
    icon: Home,
    title: "Hausbesitzer",
    desc: "Fairer Preis, klare Kommunikation – auch für kleinere Sanierungen.",
  },
];

export const Industries = () => {
  return (
    <section className="py-20 lg:py-28 bg-steel relative overflow-hidden">
      {/* Hazard-Streifen oben */}
      <div className="hazard-stripe h-3 absolute inset-x-0 top-0" />

      <div className="container-w relative">
        <div className="max-w-2xl">
          <span className="eyebrow text-signal" style={{ color: "hsl(var(--signal))" }}>
            Branchen-Lösungen
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: "white" }}>
            Für Profis, die <span className="hand-underline" style={{ color: "white" }}>liefern müssen.</span>
          </h2>
          <p className="mt-5 text-white/70">
            Wir wissen, worauf es Ihrem Gewerk ankommt – und stellen das Gerüst genau so, wie Sie
            am effizientesten arbeiten können.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {industries.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-steel-deep p-6 lg:p-7 border border-white/10 hover:border-primary transition-colors"
              >
                <div className="grid h-12 w-12 place-items-center bg-primary text-white mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-extrabold text-white text-lg">{it.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{it.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-signal">
                  Mehr erfahren
                  <span className="block h-px w-5 bg-signal group-hover:w-10 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
