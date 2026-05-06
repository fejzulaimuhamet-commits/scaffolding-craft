import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTestimonials, useHomepage } from "@/hooks/useSanity";
import { useCompany } from "@/hooks/useCompany";

const fallbackReviews = [
  {
    name: "Stefan H.",
    role: "Bauherr · Bergedorf",
    text: "Pünktlich aufgebaut, sauber gearbeitet und nach Bauende sofort wieder weg. Genau so wünscht man sich Handwerker.",
    rating: 5,
  },
  {
    name: "Malermeister Krause",
    role: "Handwerksbetrieb · Hamburg",
    text: "Wir arbeiten seit Jahren mit Wietek. Die Gerüste stehen wie sie sollen – und das Team ist immer ansprechbar.",
    rating: 5,
  },
  {
    name: "Familie Behrens",
    role: "Privatkunde · Lüneburg",
    text: "Faires Angebot, schnelle Reaktion auf WhatsApp und super freundliches Team vor Ort. Klare Empfehlung.",
    rating: 5,
  },
  {
    name: "GMS Dachbau",
    role: "Dachdeckerbetrieb · Harburg",
    text: "Dachfanggerüst stand am Folgetag. Sicherheitstechnisch top, Abrechnung transparent. Top Partner.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const { data: cms, isLoading } = useTestimonials();
  const { data: hp } = useHomepage();
  const COMPANY = useCompany();
  const reviews =
    cms && cms.length > 0
      ? cms.map((t) => ({
          name: t.name,
          role: t.city ? `Kunde · ${t.city}` : "Kunde",
          text: t.text,
          rating: t.rating ?? 5,
        }))
      : fallbackReviews;
  const eyebrow = hp?.testimonialsEyebrow ?? "Was Kunden sagen";
  const titleText = hp?.testimonialsTitle ?? `${COMPANY.rating} von 5 Sternen – ehrliche Stimmen aus Hamburg.`;
  const badge = hp?.testimonialsBadgeText ?? `Basierend auf ${COMPANY.ratingCount}+ Google-Bewertungen`;
  return (
    <section className="py-20 lg:py-28 bg-plaster">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              {titleText}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-signal text-signal" />
                ))}
              </div>
              <span className="text-sm font-semibold text-steel">{badge}</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-6 border border-border h-48 animate-pulse" />
              ))
            : reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-6 border border-border relative"
            >
              <Quote className="h-6 w-6 text-primary mb-3" />
              <blockquote className="text-sm text-steel leading-relaxed">
                „{r.text}"
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border">
                <div className="font-display font-extrabold text-steel text-sm">{r.name}</div>
                <div className="text-xs text-concrete">{r.role}</div>
                <div className="mt-2 flex">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-signal text-signal" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
