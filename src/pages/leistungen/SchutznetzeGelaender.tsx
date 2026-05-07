import { ShieldCheck, Layers, Construction, Umbrella, Zap, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="schutznetze-gelaender"
    seoTitle="Schutznetze & Sicherheitsgeländer Hamburg – Wietek Gerüstbau"
    seoDescription="Schutznetze, Fangnetze & Sicherheitsgeländer in Hamburg. Normgerecht nach EN 1263, schnelle Montage. Jetzt Angebot anfordern!"
    canonical="/leistungen/schutznetze-gelaender"
    serviceName="Schutznetze und Sicherheitsgeländer"
    hero={{
      eyebrow: "Schutznetze & Geländer",
      title: "Schutznetze & Sicherheitsgeländer in Hamburg – Absturzsicherung nach Norm",
      subtitle:
        "Auffangnetze nach EN 1263, Sicherheitsgeländer und Dachrandschutz – einzeln oder in Kombination mit Ihrem Gerüst.",
      backgroundImage: ASSETS.placeholder.schutz,
      breadcrumb: "Schutznetze & Geländer",
    }}
    intro={{
      eyebrow: "Absturzsicherung",
      headline: "Schutznetze & Geländer – Sicherheit auf jeder Baustelle",
      paragraphs: [
        "Wo Höhe ist, muss Schutz sein. Wir liefern und montieren normgerechte Auffangnetze, temporäre Sicherheitsgeländer und Dachrandschutzsysteme in Hamburg und Norddeutschland – schnell, dokumentiert und vollversichert.",
        "Unsere Schutzsysteme entsprechen den Vorgaben der DGUV und der EN 1263 und sind nach Bedarf auch unabhängig von einem kompletten Gerüstaufbau einsetzbar.",
      ],
      image: ASSETS.placeholder.schutz,
      imageAlt: "Schutznetze und Sicherheitsgeländer – Wietek Gerüstbau Hamburg",
    }}
    scope={{
      eyebrow: "Produktübersicht",
      headline: "Unsere Schutzlösungen im Überblick",
      items: [
        "Auffangnetze nach EN 1263-1 (System S)",
        "Randauffangnetze nach EN 1263-1 (System U)",
        "Schutzwände & Dachrandschutz",
        "Temporäre Sicherheitsgeländer aus Stahl",
        "Schutzdächer & Überdachungen",
        "Vermietung oder Komplett-Service inkl. Montage",
      ],
    }}
    audiences={{
      eyebrow: "Einsatz",
      headline: "Wo Schutznetze & Geländer eingesetzt werden",
      items: [
        { icon: Construction, title: "Hochbau", desc: "Decken-, Treppen- und Gerüstöffnungen sichern." },
        { icon: Umbrella, title: "Dacharbeiten", desc: "Randsicherung an Flach- und Steildächern." },
        { icon: Layers, title: "Gewerbe", desc: "Hallen, Lichtkuppeln, Wartungszugänge." },
        { icon: ShieldCheck, title: "Sanierung", desc: "Schutz für Passanten und Anwohner." },
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Normgerechte Absturzsicherung – mit Wietek auf der sicheren Seite",
      items: [
        { icon: Zap, title: "Schnelle Montage", desc: "Standardlösungen oft binnen Stunden einsatzbereit." },
        { icon: ShieldCheck, title: "EN 1263 geprüft", desc: "Zertifizierte Materialien, dokumentiert übergeben." },
        { icon: Award, title: "Erfahrung", desc: "Über 10 Jahre Praxis in Hamburger Großbaustellen." },
      ],
    }}
    faq={[
      {
        q: "Welche Norm gilt für Auffangnetze?",
        a: "EN 1263-1 (Herstellung) und EN 1263-2 (Anwendung). Wir setzen ausschließlich zertifizierte Netze ein.",
      },
      {
        q: "Können Schutznetze auch ohne Gerüst montiert werden?",
        a: "Ja. Wir verankern temporäre Schutzsysteme direkt am Bauwerk, an Stahlträgern oder Fassaden.",
      },
      {
        q: "Wie oft müssen Netze geprüft werden?",
        a: "Alle 12 Monate durch eine befähigte Person sowie nach besonderen Ereignissen. Wir liefern stets geprüfte Ware mit Etikett.",
      },
      {
        q: "Übernehmt ihr Demontage und Entsorgung?",
        a: "Ja, komplett. Sie haben einen Ansprechpartner von Anfang bis Ende.",
      },
    ]}
    ctaTitle="Schutznetze & Geländer jetzt anfragen"
    ctaText="Sicher, normgerecht und schnell montiert – wir kümmern uns."
    related={[
      { label: "Dachfanggerüst", to: "/leistungen/dachfanggeruest" },
      { label: "Fassadengerüst", to: "/leistungen/fassadengeruest" },
      { label: "Wetterschutzdach", to: "/leistungen/wetterschutz" },
    ]}
  />
);
export default Page;
