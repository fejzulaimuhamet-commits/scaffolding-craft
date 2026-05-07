import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useHomepage } from "@/hooks/useSanity";

export const FAQ_ITEMS = [
  
  { q: "Wie schnell könnt ihr ein Gerüst aufbauen?", a: "In der Regel innerhalb von 24 bis 72 Stunden nach Auftragsbestätigung – bei freier Kapazität auch am Folgetag. Notfälle nach Sturmschäden o. Ä. behandeln wir bevorzugt." },
  { q: "Braucht man eine Genehmigung für das Gerüst?", a: "Sobald das Gerüst öffentlichen Verkehrsraum (Gehweg, Straße) berührt, ist eine Sondernutzungs­erlaubnis nötig. Das übernehmen wir komplett für Sie inkl. Verkehrssicherung." },
  { q: "Sind eure Gerüste versichert?", a: "Ja. Wir sind Mitglied der BG BAU und mit einer Betriebshaftpflicht von 5 Mio. € versichert. Sie erhalten auf Wunsch jederzeit Versicherungsnachweise." },
  { q: "In welchem Gebiet seid ihr tätig?", a: "Hauptsächlich in Hamburg (alle Stadtteile) sowie im Umkreis von ca. 80 km – Schleswig-Holstein, Niedersachsen, Lüneburg, Stade, Buxtehude. Auf Anfrage auch darüber hinaus." },
  { q: "Macht ihr auch kleine Privataufträge?", a: "Ja. Vom Carport bis zum Mehrfamilienhaus – wir behandeln jeden Auftrag mit derselben Sorgfalt und Geschwindigkeit." },
  { q: "Übernehmt ihr Auf- und Abbau komplett?", a: "Komplett. Anlieferung, Aufbau, Verkehrssicherung, Abbau und Abtransport – alles aus einer Hand zum vereinbarten Festpreis." },
  { q: "Wie schnell antwortet ihr auf Anfragen?", a: "Werktags antworten wir meist innerhalb von 2 Stunden, spätestens innerhalb von 24 Stunden. Per WhatsApp geht's in der Regel am schnellsten." },
];

export const FAQ = () => {
  const { data: hp } = useHomepage();
  const eyebrow = hp?.faqEyebrow ?? "Häufige Fragen";
  const title = hp?.faqTitle ?? "Antworten auf das, was Bauherren wirklich fragen.";
  const intro = hp?.faqIntro ?? "Etwas nicht dabei? Schreiben Sie uns einfach per WhatsApp oder E-Mail – wir antworten persönlich, meistens innerhalb von zwei Stunden.";
  const items = hp?.faqItems && hp.faqItems.length > 0
    ? hp.faqItems.map((it) => ({ q: it.question, a: it.answer }))
    : FAQ_ITEMS;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              {title}
            </h2>
            <p className="mt-6 text-concrete">{intro}</p>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((it, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border bg-plaster data-[state=open]:bg-white data-[state=open]:border-primary px-5 transition-colors"
                >
                  <AccordionTrigger className="font-display font-bold text-base text-steel hover:no-underline text-left py-5">
                    {it.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-concrete leading-relaxed pb-5">
                    {it.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
