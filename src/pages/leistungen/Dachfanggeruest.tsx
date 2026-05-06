import { Hammer, HardHat, Wrench, Home, ShieldCheck, Zap, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="dachfanggeruest"
    seoTitle="Dachfanggerüst Hamburg | Absturzsicherung – Wietek Gerüstbau"
    seoDescription="Dachfanggerüste in Hamburg für sicheres Arbeiten auf dem Dach. DGUV-konform, schneller Aufbau, faire Preise. Jetzt anfragen!"
    canonical="/leistungen/dachfanggeruest"
    serviceName="Dachfanggerüst"
    hero={{
      eyebrow: "Dachfanggerüst",
      title: "Dachfanggerüst in Hamburg – Absturzsicherung nach DGUV",
      subtitle:
        "Pflicht bei Arbeiten ab 3 m Absturzhöhe – wir liefern den geprüften Fangschutz für Dachdecker, Zimmerer und Hausbesitzer.",
      backgroundImage: ASSETS.placeholder.dach,
      breadcrumb: "Dachfanggerüst",
    }}
    intro={{
      eyebrow: "Dachsicherheit",
      headline: "Schutz bei Dacharbeiten – das Dachfanggerüst von Wietek",
      paragraphs: [
        "Sobald auf einem geneigten Dach gearbeitet wird, ist ein Dachfanggerüst gesetzlich vorgeschrieben. Es fängt herabfallende Personen sicher auf und schützt zugleich Passanten vor herabfallenden Materialien. Wir bauen DGUV-konforme Dachfanggerüste in Hamburg und Norddeutschland – schnell, sauber und vollversichert.",
        "Ob Steildach oder flach geneigtes Dach, ob Sanierung, Eindeckung oder Reparatur: Wir kennen die Vorgaben und stellen den Fangschutz so auf, dass Ihre Gewerke effizient arbeiten können.",
      ],
      image: ASSETS.placeholder.dach,
      imageAlt: "Dachfanggerüst Hamburg an einem Steildach – Wietek Gerüstbau",
    }}
    scope={{
      eyebrow: "Vorschriften",
      headline: "Gesetzliche Anforderungen an die Absturzsicherung",
      items: [
        "DGUV Vorschrift 38 / Information 201-011",
        "Arbeiten ab 3 m Absturzhöhe → Fangschutz Pflicht",
        "Schutzwand mind. 1,00 m oberhalb der Traufkante",
        "Maximaler Abstand der Belagsfläche zur Traufe ≤ 1,50 m",
        "Statisch geprüfte Verankerung am Bauwerk",
        "Schutz auch für Passanten auf öffentlichem Grund",
      ],
    }}
    audiences={{
      eyebrow: "Zielgruppen",
      headline: "Für wen wir Dachfanggerüste aufstellen",
      items: [
        { icon: Hammer, title: "Dachdecker", desc: "Eindeckung, Sanierung, Reparatur – schnelle Übergabe." },
        { icon: HardHat, title: "Zimmerer", desc: "Dachstuhl, Aufstockung, Gauben – Fangschutz inklusive." },
        { icon: Wrench, title: "Spengler", desc: "Dachrinnen, Verkleidungen, Schornsteinarbeiten." },
        { icon: Home, title: "Hausbesitzer", desc: "Sanierung am Eigenheim – pflicht­konform und versichert." },
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Warum Wietek für Ihr Dachfanggerüst?",
      items: [
        { icon: Zap, title: "Aufbau in 24–72 h", desc: "Auch kurzfristig vor angemeldeten Dachterminen." },
        { icon: ShieldCheck, title: "DGUV-konform", desc: "BG BAU-Mitglied, geprüfte Komponenten, dokumentiert." },
        { icon: Award, title: "Erfahrenes Team", desc: "Hunderte Dächer in Hamburg sicher eingerüstet." },
      ],
    }}
    faq={[
      {
        q: "Ab wann ist ein Dachfanggerüst Pflicht?",
        a: "Ab einer Absturzhöhe von 3 m bei Arbeiten an geneigten Dächern – geregelt durch DGUV Vorschrift 38 und die Bauordnung.",
      },
      {
        q: "Wie lange dauert der Aufbau?",
        a: "Für ein Einfamilienhaus typischerweise 4–6 Stunden. Mehrfamilienhäuser einen Tag.",
      },
      {
        q: "Was kostet ein Dachfanggerüst?",
        a: "Abhängig von Dachform, Höhe und Standzeit. Wir machen ein verbindliches Festpreis-Angebot nach kostenlosem Aufmaß.",
      },
      {
        q: "Übernehmt ihr die Genehmigung bei öffentlichem Grund?",
        a: "Ja, komplett – inklusive Verkehrssicherung und Schildern.",
      },
    ]}
    ctaTitle="Dachfanggerüst jetzt anfragen"
    ctaText="DGUV-konformer Absturzschutz, schnell aufgebaut, vollversichert."
    related={[
      { label: "Fassadengerüst", to: "/leistungen/fassadengeruest" },
      { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
      { label: "Wetterschutzdach", to: "/leistungen/wetterschutz" },
    ]}
  />
);
export default Page;
