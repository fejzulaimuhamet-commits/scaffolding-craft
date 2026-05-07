import { motion } from "framer-motion";
import { ClipboardCheck, Hammer, MessageSquare, PackageOpen } from "lucide-react";

const icons = [MessageSquare, ClipboardCheck, Hammer, PackageOpen];

const defaultSteps = [
  { title: "Anfrage stellen", description: "Beschreiben Sie Ihr Vorhaben in 60 Sekunden – online, telefonisch oder per WhatsApp." },
  { title: "Aufmaß vor Ort", description: "Wir kommen kostenlos vorbei, messen auf und erstellen ein verbindliches Angebot." },
  { title: "Aufbau in 24–72 h", description: "Pünktliche Anlieferung und sauberer Aufbau durch unser eingespieltes Team." },
  { title: "Abbau & Abrechnung", description: "Nach Projektende bauen wir zuverlässig ab und rechnen transparent ab." },
];

export const Process = () => {
  const steps = defaultSteps;

  return (
    <section className="py-20 lg:py-28 bg-plaster relative">
      <div className="container-w">
        <div className="max-w-2xl">
          <span className="eyebrow">So läuft's ab</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
            In vier Schritten zum <span className="hand-underline">sicheren Gerüst.</span>
          </h2>
          <p className="mt-5 text-concrete">
            Klar geregelter Ablauf, keine bösen Überraschungen. So arbeiten wir seit über 10 Jahren
            mit Privatleuten, Handwerkern und Bauunternehmen.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
          {steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            const n = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-white p-6 lg:p-7 border-l-4 border-primary shadow-[0_10px_30px_-20px_rgba(15,23,42,0.3)]"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-extrabold text-3xl text-plaster"
                    style={{ WebkitTextStroke: "1.5px hsl(var(--steel))", color: "transparent" }}>
                    {n}
                  </span>
                  <span className="grid h-11 w-11 place-items-center bg-steel text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-steel">{s.title}</h3>
                <p className="mt-2 text-sm text-concrete leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
