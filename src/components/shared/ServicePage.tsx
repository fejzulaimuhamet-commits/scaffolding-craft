import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { COMPANY } from "@/lib/site";
import { useServiceContent } from "@/hooks/useServiceContent";

export interface FaqItem {
  q: string;
  a: string;
}

export interface AudienceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ReasonItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ServicePageProps {
  slug?: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    backgroundImage: string;
    breadcrumb: string;
  };
  serviceName: string;
  intro: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  scope?: {
    eyebrow: string;
    headline: string;
    items: string[];
  };
  audiences?: {
    eyebrow: string;
    headline: string;
    items: AudienceItem[];
  };
  reasons?: {
    eyebrow: string;
    headline: string;
    items: ReasonItem[];
  };
  extra?: ReactNode;
  faq: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  related?: { label: string; to: string }[];
}

export const ServicePage = (props: ServicePageProps) => {
  const cms = useServiceContent(props.slug ?? "");
  // Overlay Sanity content over the static fallback props
  const p: ServicePageProps = {
    ...props,
    seoTitle: cms.metaTitle || props.seoTitle,
    seoDescription: cms.metaDescription || props.seoDescription,
    serviceName: cms.title || props.serviceName,
    hero: {
      ...props.hero,
      title: cms.title || props.hero.title,
      subtitle: cms.description || props.hero.subtitle,
      backgroundImage: cms.image || props.hero.backgroundImage,
    },
    intro: {
      ...props.intro,
      headline: cms.title || props.intro.headline,
      paragraphs: cms.description ? [cms.description] : props.intro.paragraphs,
      image: cms.image || props.intro.image,
    },
    scope: props.scope
      ? {
          ...props.scope,
          items: cms.features?.length ? cms.features : props.scope.items,
        }
      : props.scope,
    faq: cms.faq?.length
      ? cms.faq.map((f) => ({ q: f.question, a: f.answer }))
      : props.faq,
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: p.serviceName,
    provider: {
      "@type": "GeneralContractor",
      name: COMPANY.name,
      telephone: COMPANY.phonePrimary,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.street,
        postalCode: COMPANY.zip,
        addressLocality: `${COMPANY.city}-${COMPANY.district}`,
        addressCountry: "DE",
      },
    },
    areaServed: ["Hamburg", "Bergedorf", "Lüneburg", "Stade", "Norderstedt", "Reinbek"],
    url: `https://wietek-geruestbau.de${p.canonical}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{p.seoTitle}</title>
        <meta name="description" content={p.seoDescription} />
        <link rel="canonical" href={`https://wietek-geruestbau.de${p.canonical}`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageHero {...p.hero} />

      {/* Intro */}
      <section className="bg-white">
        <div className="container-w py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative overflow-hidden bg-steel-deep h-[320px] sm:h-[420px] lg:h-[500px]">
                <img
                  src={p.intro.image}
                  alt={p.intro.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <span className="eyebrow">{p.intro.eyebrow}</span>
              <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
                {p.intro.headline}
              </h2>
              {p.intro.paragraphs.map((t, i) => (
                <p key={i} className="mt-5 text-concrete leading-relaxed text-base lg:text-lg">
                  {t}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leistungsumfang */}
      {p.scope && (
        <section className="bg-muted">
          <div className="container-w py-16 lg:py-24">
            <div className="max-w-3xl">
              <span className="eyebrow">{p.scope.eyebrow}</span>
              <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
                {p.scope.headline}
              </h2>
            </div>
            <ul className="mt-10 grid sm:grid-cols-2 gap-4 lg:gap-6">
              {p.scope.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-white p-5 border border-border"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-steel font-medium">{it}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Audiences */}
      {p.audiences && (
        <section className="bg-white">
          <div className="container-w py-16 lg:py-24">
            <div className="max-w-3xl">
              <span className="eyebrow">{p.audiences.eyebrow}</span>
              <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
                {p.audiences.headline}
              </h2>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {p.audiences.items.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border border-border bg-white p-6 hover:border-primary transition-colors"
                  >
                    <Icon className="h-9 w-9 text-primary" />
                    <h3 className="mt-4 font-display font-bold text-steel text-lg">{a.title}</h3>
                    <p className="mt-2 text-sm text-concrete leading-relaxed">{a.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Reasons */}
      {p.reasons && (
        <section className="bg-steel-deep py-20 lg:py-24">
          <div className="container-w">
            <div className="max-w-3xl">
              <span className="eyebrow">{p.reasons.eyebrow}</span>
              <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
                {p.reasons.headline}
              </h2>
            </div>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 lg:gap-12">
              {p.reasons.items.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Icon className="h-10 w-10 text-primary" />
                    <h3 className="mt-5 font-display font-bold text-white text-2xl">{r.title}</h3>
                    <p className="mt-3 text-white/75 leading-relaxed">{r.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {p.extra}

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-w">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
                Häufige Fragen
              </h2>
              <p className="mt-5 text-concrete leading-relaxed">
                Etwas nicht dabei? Schreiben Sie uns auf {" "}
                <a href={`tel:${COMPANY.phonePrimary}`} className="text-primary font-semibold">
                  {COMPANY.phonePrimaryDisplay}
                </a>{" "}
                oder per WhatsApp – wir antworten meist in unter 2 Stunden.
              </p>
              {p.related && p.related.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-display font-bold uppercase tracking-[0.2em] text-steel">
                    Verwandte Leistungen
                  </p>
                  <ul className="mt-3 space-y-2">
                    {p.related.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="inline-flex items-center gap-2 text-steel hover:text-primary font-semibold"
                        >
                          <ArrowRight className="h-4 w-4 text-primary" /> {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="space-y-3">
                {p.faq.map((it, i) => (
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

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container-w">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {p.ctaTitle}
            </h2>
            <p className="mt-5 text-white/85 text-lg">{p.ctaText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
              >
                Jetzt kostenlos anfragen <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phonePrimary}`}
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
              >
                {COMPANY.phonePrimaryDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};
