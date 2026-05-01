import { MapPin } from "lucide-react";

const cities = [
  "Hamburg-City", "Bergedorf", "Harburg", "Altona", "Eimsbüttel", "Wandsbek",
  "Hamburg-Nord", "Eppendorf", "Winterhude", "Lüneburg", "Stade", "Buxtehude",
  "Reinbek", "Geesthacht", "Glinde", "Norderstedt", "Pinneberg", "Ahrensburg",
];

export const ServiceArea = () => {
  return (
    <section className="py-20 lg:py-28 bg-plaster">
      <div className="container-w max-w-4xl text-center">
        <span className="eyebrow justify-center">Unser Servicegebiet</span>
        <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
          Gerüste in <span className="hand-underline">Hamburg & Umkreis.</span>
        </h2>
        <p className="mt-5 text-concrete leading-relaxed max-w-2xl mx-auto">
          Wir sind in der gesamten Metropolregion unterwegs – von der Hamburger Innenstadt
          bis nach Lüneburg, Stade und Norderstedt. Auf Anfrage auch darüber hinaus.
        </p>

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
