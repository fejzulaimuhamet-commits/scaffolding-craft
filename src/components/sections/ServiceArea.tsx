import { MapPin } from "lucide-react";
import { useHomepage } from "@/hooks/useSanity";

const fallbackCities = [
  "Hamburg-City", "Bergedorf", "Harburg", "Altona", "Eimsbüttel", "Wandsbek",
  "Hamburg-Nord", "Eppendorf", "Winterhude", "Lüneburg", "Stade", "Buxtehude",
  "Reinbek", "Geesthacht", "Glinde", "Norderstedt", "Pinneberg", "Ahrensburg",
];

export const ServiceArea = () => {
  const { data: hp } = useHomepage();
  const eyebrow = hp?.serviceAreaEyebrow ?? "Unser Servicegebiet";
  const title = hp?.serviceAreaTitle ?? "Gerüste in Hamburg & Umkreis.";
  const intro = hp?.serviceAreaIntro ?? "Wir sind in der gesamten Metropolregion unterwegs – von der Hamburger Innenstadt bis nach Lüneburg, Stade und Norderstedt. Auf Anfrage auch darüber hinaus.";
  const cities = hp?.serviceAreaCities && hp.serviceAreaCities.length > 0 ? hp.serviceAreaCities : fallbackCities;

  return (
    <section className="py-20 lg:py-28 bg-plaster">
      <div className="container-w max-w-4xl text-center">
        <span className="eyebrow justify-center">{eyebrow}</span>
        <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
          {title}
        </h2>
        <p className="mt-5 text-concrete leading-relaxed max-w-2xl mx-auto">{intro}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
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
    </section>
  );
};
