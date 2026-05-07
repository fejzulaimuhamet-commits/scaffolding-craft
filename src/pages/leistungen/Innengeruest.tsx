import { Factory, Church, Building2, Warehouse, Layers, Zap, ShieldCheck, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="innengeruest"
    seoTitle="Innengerüst Hamburg | Raumgerüst mieten – Wietek Gerüstbau"
    seoDescription="Sichere Innengerüste & Raumgerüste in Hamburg. Für Hallen, Kirchen, Privatgebäude & große Innenräume. Aufbau in 24–72 Std."
    canonical="/leistungen/innengeruest"
    serviceName="Innengerüst"
    hero={{
      eyebrow: "Innengerüst",
      title: "Innengerüst & Raumgerüst in Hamburg – flexibel & sicher",
      subtitle:
        "Stabile Arbeitsplattformen für Hallen, Kirchen, Treppenhäuser und große Innenräume – schonend für Böden und Bestand.",
      backgroundImage: ASSETS.placeholder.innen,
      breadcrumb: "Innengerüst",
    }}
    intro={{
      eyebrow: "Innenausbau",
      headline: "Professionelle Innengerüste für jeden Innenraum",
      paragraphs: [
        "Decken streichen, Stuck restaurieren, Lüftungstechnik installieren oder Beleuchtung montieren – sobald in großen Innenräumen gearbeitet wird, braucht es ein verlässliches Innengerüst. Wietek Gerüstbau plant und montiert Raumgerüste für private Hallen, Kirchen, Theater, Treppenhäuser und Lagerhallen in Hamburg und ganz Norddeutschland.",
        "Wir achten auf bodenschonende Aufbauten, kurze Rüstzeiten und freie Bewegungsflächen – auch bei laufendem Betrieb.",
      ],
      image: ASSETS.placeholder.innen,
      imageAlt: "Innengerüst in einer Halle – Wietek Gerüstbau Hamburg",
    }}
    audiences={{
      eyebrow: "Einsatzbereiche",
      headline: "Wo werden Innengerüste eingesetzt?",
      items: [
        { icon: Factory, title: "Private Hallen", desc: "Wartung, Lüftung, Beleuchtung, Decken- und Hallenarbeiten." },
        { icon: Church, title: "Kirchen & Kulturbauten", desc: "Restaurierung von Decken, Stuck und Wandgemälden." },
        { icon: Building2, title: "Treppenhäuser", desc: "Sichere Plattformen über mehrere Stockwerke." },
        { icon: Warehouse, title: "Lager & Messebau", desc: "Hochregalbereiche, Aufbauten, Wartung an Decken." },
      ],
    }}
    scope={{
      eyebrow: "Leistungsumfang",
      headline: "Unser Innengerüst-Service",
      items: [
        "Aufmaß und Planung im Bestand – auch bei laufendem Betrieb",
        "Bodenschonende Verteilbohlen und weiche Auflagen",
        "Modulare Raumgerüste in beliebiger Höhe",
        "Rollgerüste für mobile Einsätze",
        "Komplettmontage durch geschultes Personal",
        "Kurzfristige Verfügbarkeit, auch über Nacht",
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Warum Wietek für Ihr Innengerüst?",
      items: [
        { icon: Zap, title: "Schnell aufgebaut", desc: "24–72 Std. Vorlaufzeit, auch außerhalb der Geschäftszeiten." },
        { icon: ShieldCheck, title: "Geprüft & versichert", desc: "Statiknachweise, BG BAU, 5 Mio. € Haftpflicht." },
        { icon: Layers, title: "Maßgeschneidert", desc: "Lösungen für jeden Grundriss und jede Höhe." },
      ],
    }}
    faq={[
      {
        q: "Wie hoch kann ein Innengerüst sein?",
        a: "Wir bauen Raumgerüste in praktisch jeder Höhe – vom 3 m hohen Wohnraum bis zur 25 m hohen Privathalle.",
      },
      {
        q: "Werden Böden geschützt?",
        a: "Ja. Wir verteilen die Last über Verteilbohlen und weiche Auflagen, sodass empfindliche Böden (Parkett, Stein, Estriche) nicht beschädigt werden.",
      },
      {
        q: "Können wir während der Bauarbeiten weiterarbeiten?",
        a: "Häufig ja. Wir stimmen den Aufbau mit Ihrem Betrieb ab und arbeiten – wenn nötig – nachts oder am Wochenende.",
      },
      {
        q: "Wie schnell kann das Innengerüst stehen?",
        a: "Standard 24–72 Stunden nach Auftrag. Bei freier Kapazität auch am Folgetag.",
      },
    ]}
    ctaTitle="Innengerüst jetzt anfragen"
    ctaText="Wir besichtigen den Innenraum kostenlos und erstellen Ihr Festpreis-Angebot."
    related={[
      { label: "Treppenturm", to: "/leistungen/treppenturm" },
      { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
      { label: "Fassadengerüst", to: "/leistungen/fassadengeruest" },
    ]}
  />
);
export default Page;
