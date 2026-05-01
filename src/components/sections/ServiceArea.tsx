import { ExternalLink, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site";

const cities = [
  "Hamburg-City", "Bergedorf", "Harburg", "Altona", "Eimsbüttel", "Wandsbek",
  "Hamburg-Nord", "Eppendorf", "Winterhude", "Lüneburg", "Stade", "Buxtehude",
  "Reinbek", "Geesthacht", "Glinde", "Norderstedt", "Pinneberg", "Ahrensburg",
];

const mapQuery = encodeURIComponent(
  `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`
);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
const mapOpen = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export const ServiceArea = () => {
  return (
    <section className="py-20 lg:py-28 bg-plaster">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow">Unser Servicegebiet</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Gerüste in <span className="hand-underline">Hamburg & Umkreis.</span>
            </h2>
            <p className="mt-5 text-concrete leading-relaxed">
              Wir sind in der gesamten Metropolregion unterwegs – von der Hamburger Innenstadt
              bis nach Lüneburg, Stade und Norderstedt. Auf Anfrage auch darüber hinaus.
            </p>

            <div className="mt-8 bg-white border border-border p-5 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-bold text-steel">{COMPANY.name}</div>
                  <div className="text-sm text-concrete">
                    {COMPANY.street}<br />
                    {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY.phonePrimary}`} className="text-sm text-steel font-semibold hover:text-primary">
                  {COMPANY.phonePrimaryDisplay}
                </a>
              </div>
              <a
                href={mapOpen}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-display font-bold text-primary hover:underline"
              >
                In Google Maps öffnen
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {cities.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 bg-white text-steel border border-border px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider"
                >
                  <MapPin className="h-3 w-3 text-primary" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] border border-border bg-white">
              <iframe
                title={`${COMPANY.name} – Standort auf Google Maps`}
                src={mapEmbed}
                className="block w-full h-[300px] lg:h-[450px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
