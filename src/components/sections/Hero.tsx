import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { ASSETS, COMPANY } from "@/lib/site";
import { useHomepage } from "@/hooks/useSanity";
import { imageUrl } from "@/lib/sanity";

const usps = [
  "Aufbau in 24–72 Stunden",
  "Familienunternehmen seit 2014",
  "Vollständig versichert & geprüft",
  "Festpreis-Garantie ohne Überraschungen",
];

export const Hero = () => {
  const { data: homepage } = useHomepage();
  const heroImgBase = imageUrl(homepage?.heroImage, 1920) ?? ASSETS.hero;
  const buildSrcSet = (url: string) => {
    const widths = [640, 1024, 1600, 1920];
    if (url.includes("res.cloudinary.com")) {
      return widths.map((w) => `${url.replace(/w_\d+/, `w_${w}`)} ${w}w`).join(", ");
    }
    if (url.includes("cdn.sanity.io")) {
      const sep = url.includes("?") ? "&" : "?";
      return widths.map((w) => `${url}${sep}w=${w} ${w}w`).join(", ");
    }
    return undefined;
  };
  const heroSrcSet = buildSrcSet(heroImgBase);
  const heroTitle = homepage?.heroTitle;
  const heroSubtitle = homepage?.heroSubtitle;

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "85vh" }}
    >
      {/* Vollbild-Foto */}
      <img
        src={heroImgBase}
        srcSet={heroSrcSet}
        sizes="100vw"
        alt="Eingerüstetes Wohnhaus in Hamburg von Wietek Gerüstbau"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Schwerer Gradient nur von links nach rechts */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(217 40% 8% / 0.96) 0%, hsl(217 40% 8% / 0.88) 30%, hsl(217 40% 8% / 0.55) 55%, hsl(217 40% 8% / 0.15) 78%, hsl(217 40% 8% / 0) 100%)",
        }}
      />

      {/* Subtiler Bottom-Verlauf für Lesbarkeit auf Mobile */}
      <div
        aria-hidden
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(217 40% 8% / 0.4) 0%, hsl(217 40% 8% / 0.7) 100%)",
        }}
      />

      {/* Grain / Noise Overlay – handgemachter Look */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Content */}
      <div className="container-w relative z-10 flex items-center pt-32 pb-20 lg:pt-36 lg:pb-28" style={{ minHeight: "85vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:max-w-[82%]"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-xs sm:text-sm font-bold text-steel-deep shadow-lg">
            <Star className="h-4 w-4 fill-steel-deep text-steel-deep" />
            <span>{COMPANY.rating} Google</span>
            <span className="opacity-50">·</span>
            <span>Familiengeführt seit {COMPANY.founded}</span>
          </div>

          {/* H1 */}
          <h1
            className="mt-6 font-display font-extrabold text-white leading-tight tracking-tight w-full text-4xl lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem]"
          >
            {heroTitle ?? (
              <>
                Gerüstbau in{" "}
                <span className="hand-underline-light text-white">Hamburg</span>
                {" –"}
                <br />
                <span className="text-white/95">sicher, pünktlich,<br />ab 24 Std. einsatzbereit.</span>
              </>
            )}
          </h1>

          {/* Subline */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
            {heroSubtitle ?? (
              <>
                Familiengeführter Gerüstbau aus {COMPANY.city}-{COMPANY.district}. Wir liefern,
                montieren und demontieren Gerüste für Privathaushalte, Handwerker und Industrie –
                schnell, sauber und mit echtem Wort.
              </>
            )}
          </p>

          {/* USP-Bullets */}
          <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
            {usps.map((u) => (
              <li key={u} className="flex items-start gap-2.5 text-sm font-semibold text-white">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                {u}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href="#anfrage" className="btn-primary justify-center">
              Kostenloses Angebot in 60 Sek.
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projekte" className="btn-ghost-light justify-center">
              Projekte ansehen
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator – kleines Detail */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Scroll</span>
        <div className="h-10 w-px bg-white/40" />
      </div>
    </section>
  );
};
