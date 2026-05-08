import { Cloud, CalendarCheck, Package, Users, Zap, ShieldCheck, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="wetterschutz"
    seoTitle="Wetterschutzdach Hamburg | Überdachtes Gerüst – Wietek"
    seoDescription="Wetterschutzdächer & überdachte Gerüste in Hamburg – arbeiten bei Regen, Schnee & Wind. Trocken, sicher, ganzjährig. Jetzt unverbindlich anfragen!"
    canonical="/leistungen/wetterschutz"
    serviceName="Wetterschutzdach"
    hero={{
      eyebrow: "Wetterschutzdach",
      title: "Wetterschutzdach & überdachtes Gerüst in Hamburg – ganzjährig bauen",
      subtitle:
        "Lichtdurchlässige Überdachungen mit freier Spannweite bis 30 m – Bauverzug ade.",
      backgroundImage: ASSETS.placeholder.wetter,
      breadcrumb: "Wetterschutzdach",
    }}
    intro={{
      eyebrow: "Ganzjahres-Baustelle",
      headline: "Mit Wetterschutzgerüst das ganze Jahr bauen",
      paragraphs: [
        "Regen, Schnee, Frost – Hamburger Wetter kann ganze Bauzeiten kippen. Mit unserem Wetterschutzdach arbeiten Ihre Gewerke termintreu, unabhängig von der Witterung. Wir kombinieren Fassadengerüst und überdachte Konstruktion zu einer trockenen, beleuchtbaren Arbeitsumgebung.",
        "Ideal für Dachsanierungen, denkmalgeschützte Bauwerke, Fachwerk und alle Projekte, bei denen Material und Mitarbeiter geschützt werden müssen.",
      ],
      image: ASSETS.placeholder.wetter,
      imageAlt: "Wetterschutzdach Hamburg – Gerüst mit Überdachung von Wietek Gerüstbau",
    }}
    scope={{
      eyebrow: "Vorteile",
      headline: "Warum ein Wetterschutzdach?",
      items: [
        "Kein Bauverzug durch Regen oder Schnee",
        "Schutz für Baumaterialien und Bauwerk",
        "Mitarbeiter arbeiten trocken & sicher",
        "Ganzjährige Baustellennutzung",
        "Lichtdurchlässige Planen – Tageslicht inklusive",
        "Freie Spannweiten bis 30 m ohne Stützen im Arbeitsbereich",
      ],
    }}
    audiences={{
      eyebrow: "Einsatzbereiche",
      headline: "Wo das Wetterschutzdach besonders Sinn macht",
      items: [
        { icon: Cloud, title: "Dachsanierung", desc: "Trockene Arbeit am offenen Dachstuhl." },
        { icon: CalendarCheck, title: "Termin­projekte", desc: "Zeitkritische Bauvorhaben mit fixem Endtermin." },
        { icon: Package, title: "Materialschutz", desc: "Schutz für empfindliche Bauteile und Lager." },
        { icon: Users, title: "Denkmal & Fachwerk", desc: "Schonende Sanierung wertvoller Bausubstanz." },
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Warum Wietek für Ihren Wetterschutz?",
      items: [
        { icon: Zap, title: "Schneller Aufbau", desc: "Komplettsystem aus einer Hand, kurze Vorlaufzeiten." },
        { icon: ShieldCheck, title: "Statisch geprüft", desc: "Schnee- und Windlasten nach DIN nachgewiesen." },
        { icon: Award, title: "Erfahrung", desc: "Über 10 Jahre Wetterschutz an Hamburger Bauwerken." },
      ],
    }}
    faq={[
      {
        q: "Wie groß kann das Wetterschutzdach werden?",
        a: "Freie Spannweiten bis 30 m sind Standard. Größere Konstruktionen prüfen wir individuell statisch.",
      },
      {
        q: "Welche Schneelast hält das Dach aus?",
        a: "Unsere Systeme sind auf Schneelastzone 2 (Hamburg) und mehr ausgelegt – inkl. Statiknachweis.",
      },
      {
        q: "Lohnt sich das auch für kleine Projekte?",
        a: "Bei terminkritischen Arbeiten oder empfindlichem Bestand fast immer. Wir beraten Sie ehrlich – auch wenn ein einfaches Schutzdach ausreicht.",
      },
      {
        q: "Lässt sich der Wetterschutz mit dem Fassadengerüst kombinieren?",
        a: "Ja, das ist sogar der Standardfall. Sie bekommen Fassade und Dach aus einer Hand.",
      },
    ]}
    ctaTitle="Wetterschutzdach jetzt anfragen"
    ctaText="Termintreu bauen – egal was der Hamburger Himmel macht."
    related={[
      { label: "Fassadengerüst", to: "/leistungen/fassadengeruest" },
      { label: "Dachfanggerüst", to: "/leistungen/dachfanggeruest" },
      { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
    ]}
  />
);
export default Page;
