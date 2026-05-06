import { Building2, Home, HardHat, Hammer, Zap, ShieldCheck, Award } from "lucide-react";
import { ServicePage } from "@/components/shared/ServicePage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <ServicePage
    slug="fassadengeruest"
    seoTitle="Fassadengerüst Hamburg | Mieten & Aufbau – Wietek Gerüstbau"
    seoDescription="Professionelle Fassadengerüste in Hamburg & Norddeutschland. Schneller Aufbau in 24–72 Std., vollversichert, familiengeführt. Jetzt kostenlos anfragen!"
    canonical="/leistungen/fassadengeruest"
    serviceName="Fassadengerüst"
    hero={{
      eyebrow: "Fassadengerüst",
      title: "Fassadengerüst in Hamburg – schnell, sicher & zum Festpreis",
      subtitle:
        "Vom Einfamilienhaus bis zum Gewerbebau: Wir planen, liefern und montieren Ihr Fassadengerüst termingerecht und nach DIN EN 12811.",
      backgroundImage: ASSETS.placeholder.fassade,
      breadcrumb: "Fassadengerüst",
    }}
    intro={{
      eyebrow: "Unser Schwerpunkt",
      headline: "Ihr zuverlässiger Partner für Fassadengerüste",
      paragraphs: [
        "Seit 2014 stellt Wietek Gerüstbau Fassadengerüste in Hamburg und im gesamten norddeutschen Raum auf. Ob Sanierung, Neubau oder Anstrich – wir liefern die statisch geprüfte Lösung, die Ihre Baustelle schneller, sicherer und planbarer macht.",
        "Unsere Kunden sind Hausbesitzer, Hausverwaltungen, Maler-, Dachdecker- und Bauunternehmen aus Hamburg-Bergedorf, Harburg, Altona und dem Umland. Wir sprechen Handwerker-Sprache, halten Termine und liefern Festpreise – ohne Überraschungen.",
      ],
      image: ASSETS.placeholder.fassade,
      imageAlt: "Fassadengerüst Hamburg an Mehrfamilienhaus – Wietek Gerüstbau",
    }}
    scope={{
      eyebrow: "Leistungsumfang",
      headline: "Was im Fassadengerüst-Service enthalten ist",
      items: [
        "Kostenloses Aufmaß und Planung vor Ort",
        "Lieferung und professioneller Aufbau",
        "Anpassung an jede Gebäudegeometrie",
        "Sicherheitsnetze, Bordbretter und Geländer inklusive",
        "Termingerechter Abbau und Entsorgung",
        "Vollständige Haftpflicht- & Betriebsversicherung",
      ],
    }}
    audiences={{
      eyebrow: "Zielgruppen",
      headline: "Fassadengerüst für Privat & Gewerbe",
      items: [
        { icon: Home, title: "Hausbesitzer", desc: "Sanierung, Anstrich, Dämmung am Eigenheim – sicher & versichert." },
        { icon: HardHat, title: "Maler", desc: "Belastungsklasse 3, perfekte Greifhöhe, schnelle Übergabe." },
        { icon: Hammer, title: "Dachdecker", desc: "Inklusive Dachfangschutz und Materiallagerung." },
        { icon: Building2, title: "Bauunternehmer", desc: "Großflächige Lösungen für Mehrfamilien- und Gewerbebauten." },
      ],
    }}
    reasons={{
      eyebrow: "Wietek Vorteile",
      headline: "Warum Wietek Gerüstbau für Ihr Fassadengerüst?",
      items: [
        { icon: Zap, title: "Aufbau in 24–72 h", desc: "Termintreue Planung, freie Kapazitäten – auch kurzfristig." },
        { icon: ShieldCheck, title: "Festpreisgarantie", desc: "Verbindliches Angebot nach kostenlosem Aufmaß. Keine versteckten Kosten." },
        { icon: Award, title: "10+ Jahre Erfahrung", desc: "Familienunternehmen mit über 500 Projekten in Hamburg." },
      ],
    }}
    faq={[
      {
        q: "Was kostet ein Fassadengerüst in Hamburg?",
        a: "Für Standard-Fassadengerüste am Einfamilienhaus liegen die Preise meist zwischen 6 € und 12 € pro m² für die ersten 4 Wochen Standzeit. Endgültig wird der Preis durch Höhe, Komplexität und Standzeit bestimmt – wir machen ein verbindliches Festpreisangebot nach kostenlosem Aufmaß.",
      },
      {
        q: "Wie lange darf ein Fassadengerüst stehen?",
        a: "Standard sind 4 Wochen Grundmiete. Längere Standzeiten vereinbaren wir flexibel und transparent zum Wochen- oder Monatspreis.",
      },
      {
        q: "Brauche ich eine Genehmigung für das Gerüst?",
        a: "Sobald das Gerüst öffentlichen Verkehrsraum (Gehweg, Straße) berührt, ist eine Sondernutzungserlaubnis nötig. Wir übernehmen den Antrag und die Verkehrssicherung komplett für Sie.",
      },
      {
        q: "Wie schnell kann das Fassadengerüst aufgebaut werden?",
        a: "In der Regel innerhalb von 24 bis 72 Stunden nach Auftragsbestätigung. Bei freier Kapazität auch am Folgetag.",
      },
      {
        q: "Was passiert bei Schlechtwetter?",
        a: "Aufbau und Nutzung sind bei normalem Wetter problemlos möglich. Bei Sturm sichern wir das Gerüst ab; auf Wunsch kombinieren wir Ihr Fassadengerüst mit unserem Wetterschutzdach.",
      },
    ]}
    ctaTitle="Fassadengerüst jetzt anfragen"
    ctaText="Kostenloses Aufmaß, verbindlicher Festpreis, Aufbau in 24–72 Stunden."
    related={[
      { label: "Dachfanggerüst", to: "/leistungen/dachfanggeruest" },
      { label: "Wetterschutzdach", to: "/leistungen/wetterschutz" },
      { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
    ]}
  />
);
export default Page;
