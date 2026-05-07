import { Hammer, Home, PaintBucket, Sun, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useHomepage } from "@/hooks/useSanity";

const ICONS: Record<string, LucideIcon> = {
  hammer: Hammer,
  paint: PaintBucket,
  sun: Sun,
  home: Home,
};

const fallback = [
  { icon: "hammer", title: "Dachdecker", description: "Dachfanggerüste, Lastenaufzüge & sicherer Materialtransport." },
  { icon: "paint", title: "Maler & Putzer", description: "Fassadengerüste mit allen Bühnen, präzise an den Putzaufbau angepasst." },
  { icon: "sun", title: "Solar / PV", description: "Sichere Aufstiegslösungen und Auffangsysteme für PV-Montage." },
  { icon: "home", title: "Hausbesitzer", description: "Fairer Preis, klare Kommunikation – auch für kleinere Sanierungen." },
];

export const Industries = () => {
  const { data: hp } = useHomepage();
  const eyebrow = hp?.industriesEyebrow ?? "";
  const titleLead = hp?.industriesTitle ?? "";
  const intro = hp?.industriesIntro ?? "";
  const items = hp?.industriesItems && hp.industriesItems.length > 0 ? hp.industriesItems : fallback;

  return (
    <section className="py-20 lg:py-28 bg-steel relative overflow-hidden">
      <div className="hazard-stripe h-3 absolute inset-x-0 top-0" />

      <div className="container-w relative">
        <div className="max-w-2xl">
          <span className="eyebrow text-signal" style={{ color: "hsl(var(--signal))" }}>
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: "white" }}>
            {titleLead}
          </h2>
          <p className="mt-5 text-white/70">{intro}</p>
        </div>

        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon ?? "home"] ?? Home;
            return (
              <motion.div
                key={(it.title ?? "") + i}
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
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{it.description}</p>
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
