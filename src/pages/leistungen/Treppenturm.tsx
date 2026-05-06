import { ArrowUpDown, HardHat, Building2, ShieldCheck, Zap, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="treppenturm"
    seoTitle="Treppenturm Hamburg | Gerüstturm mieten – Wietek Gerüstbau"
    seoDescription="Treppentürme & Gerüsttürme in Hamburg schnell aufgebaut. Sicherer Zugang für Baustellen bis 20 m Höhe. Jetzt Angebot einholen!"
    canonical="/leistungen/treppenturm"
    serviceName="Treppenturm"
    hero={{
      eyebrow: "Treppenturm",
      title: "Treppenturm & Gerüstturm in Hamburg – sicherer Zugang auf jeder Baustelle",
      subtitle:
        "Bequemer Aufstieg, hohe Tragfähigkeit, normgerecht nach DIN EN 12811 – auch als Notausgang oder Fluchtweg.",
      backgroundImage: ASSETS.placeholder.treppe,
      breadcrumb: "Treppenturm",
    }}
    intro={{
      eyebrow: "Aufstiegslösung",
      headline: "Was ist ein Treppenturm und wann wird er benötigt?",
      paragraphs: [
        "Ein Treppenturm ist eine freistehende Gerüstkonstruktion mit integrierter Treppe – die sicherste und komfortabelste Art, Höhen auf Baustellen zu überwinden. Im Gegensatz zu Leitern erlaubt er Material­transport, hohen Personenverkehr und ist auch für Besucher und Bauherren freigegeben.",
        "Wir liefern Treppentürme für Neubau, Sanierung, Veranstaltungen und Industrieanlagen in Hamburg und Norddeutschland – montiert, geprüft und freigegeben.",
      ],
      image: ASSETS.placeholder.treppe,
      imageAlt: "Treppenturm Wietek Gerüstbau Hamburg",
    }}
    audiences={{
      eyebrow: "Einsatzbereiche",
      headline: "Treppenturm für Bau & Industrie",
      items: [
        { icon: Building2, title: "Baustellen", desc: "Hauptzugang für Personal, Material und Bauleitung." },
        { icon: HardHat, title: "Industrie", desc: "Wartungszugang an Anlagen, Tanks und Maschinen." },
        { icon: ArrowUpDown, title: "Veranstaltungen", desc: "Bühnen, Tribünen, temporäre Aufgänge." },
        { icon: ShieldCheck, title: "Notausgang", desc: "Zugelassener Fluchtweg bei Sanierungen." },
      ],
    }}
    scope={{
      eyebrow: "Technik & Sicherheit",
      headline: "Unsere Treppentürme – Technik & Sicherheit",
      items: [
        "Höhen bis 20 m realisierbar",
        "Hohe Personen-Tragfähigkeit (Lastklasse 3 – 5)",
        "Normgerecht nach DIN EN 12811",
        "Mit Handlauf, Knieleiste und Bordbrett",
        "Rutschhemmende Stufen aus Stahl",
        "Statisch geprüfte Verankerung",
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Warum Wietek für Ihren Treppenturm?",
      items: [
        { icon: Zap, title: "Schneller Aufbau", desc: "Standard-Treppentürme stehen oft am selben Tag." },
        { icon: ShieldCheck, title: "Versichert & geprüft", desc: "BG BAU, 5 Mio. € Haftpflicht, Statiknachweis." },
        { icon: Award, title: "Erfahrung", desc: "Hunderte Treppentürme an Hamburger Baustellen aufgebaut." },
      ],
    }}
    faq={[
      {
        q: "Bis zu welcher Höhe baut Wietek Treppentürme?",
        a: "Standard bis 20 m. Höhere Konstruktionen sind nach individueller Statik möglich.",
      },
      {
        q: "Welche Lasten halten die Treppen aus?",
        a: "Unsere Türme sind für Lastklasse 3 (200 kg/m²) bis 5 (450 kg/m²) ausgelegt – ideal auch für Materialtransport.",
      },
      {
        q: "Kann der Treppenturm als Fluchtweg eingesetzt werden?",
        a: "Ja, unsere Türme sind als baurechtlich zugelassene Notausgänge einsetzbar – inkl. Beleuchtung und Beschilderung auf Wunsch.",
      },
      {
        q: "Wie schnell kann der Treppenturm stehen?",
        a: "Häufig schon innerhalb von 24 Stunden nach Auftrag.",
      },
    ]}
    ctaTitle="Treppenturm jetzt anfragen"
    ctaText="Sicherer Zugang für Ihre Baustelle – schnell, geprüft und zum Festpreis."
    related={[
      { label: "Fassadengerüst", to: "/leistungen/fassadengeruest" },
      { label: "Innengerüst", to: "/leistungen/innengeruest" },
      { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
    ]}
  />
);
export default Page;
