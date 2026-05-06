import { useEffect, useState } from "react";
import { useInViewOnce } from "@/hooks/use-in-view";
import { useHomepage } from "@/hooks/useSanity";

const defaultStats = [
  { end: 11, suffix: "+", label: "Jahre Erfahrung" },
  { end: 500, suffix: "+", label: "Abgeschlossene Projekte" },
  { end: 50000, suffix: "+", label: "m² Gerüst gebaut", format: true },
];

function Counter({ end, suffix, format }: { end: number; suffix: string; format?: boolean }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none">
      {format ? val.toLocaleString("de-DE") : val}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export const Stats = () => {
  const { data: hp } = useHomepage();

  // Wenn Redakteur statsItems gepflegt hat → diese rendern (klickbar via Stega).
  // Sonst Counter-Default mit den drei Number-Feldern.
  const customItems = hp?.statsItems ?? [];

  const fallbackStats = [
    { end: hp?.counterYears ?? defaultStats[0].end, suffix: "+", label: "Jahre Erfahrung" },
    { end: hp?.counterProjects ?? defaultStats[1].end, suffix: "+", label: "Abgeschlossene Projekte" },
    { end: hp?.counterSquareMeters ?? defaultStats[2].end, suffix: "+", label: "m² Gerüst gebaut", format: true },
  ];

  return (
    <section className="relative bg-blueprint py-14 lg:py-20">
      <div className="container-w">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {customItems.length > 0
            ? customItems.map((s, i) => (
                <div
                  key={i}
                  className={`text-center sm:text-left ${
                    i > 0 ? "sm:border-l sm:border-white/15 sm:pl-6 lg:pl-10" : ""
                  }`}
                >
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                    {s.label}
                  </div>
                </div>
              ))
            : fallbackStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center sm:text-left ${
                    i > 0 ? "sm:border-l sm:border-white/15 sm:pl-6 lg:pl-10" : ""
                  }`}
                >
                  <Counter end={s.end} suffix={s.suffix} format={s.format} />
                  <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                    {s.label}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Hazard-Streifen unten */}
      <div className="hazard-stripe h-3 absolute inset-x-0 bottom-0" />
    </section>
  );
};
