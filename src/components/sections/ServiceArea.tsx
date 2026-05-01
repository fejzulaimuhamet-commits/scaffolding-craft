import { MapPin } from "lucide-react";
import { COMPANY } from "@/lib/site";

const cities = [
  "Hamburg-City", "Bergedorf", "Harburg", "Altona", "Eimsbüttel", "Wandsbek",
  "Hamburg-Nord", "Eppendorf", "Winterhude", "Lüneburg", "Stade", "Buxtehude",
  "Reinbek", "Geesthacht", "Glinde", "Norderstedt", "Pinneberg", "Ahrensburg",
];

export const ServiceArea = () => {
  return (
    <section className="py-20 lg:py-28 bg-plaster">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="eyebrow">Unser Servicegebiet</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Gerüste in <span className="hand-underline">Hamburg & Umkreis.</span>
            </h2>
            <p className="mt-5 text-concrete leading-relaxed">
              Wir sind in der gesamten Metropolregion unterwegs – von der Hamburger Innenstadt
              bis nach Lüneburg, Stade und Norderstedt. Auf Anfrage auch darüber hinaus.
            </p>

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

            <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Auf Google Maps öffnen
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-steel-deep overflow-hidden">
              {/* Stilisierte Karte – statisches OSM-Bild von Hamburg */}
              <iframe
                title="Servicegebiet Wietek Gerüstbau Hamburg"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.5,53.2,10.6,53.8&layer=mapnik&marker=53.4936,10.2086"
                className="h-full w-full grayscale-[40%] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider shadow-lg">
                Sitz: {COMPANY.city}-{COMPANY.district}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
