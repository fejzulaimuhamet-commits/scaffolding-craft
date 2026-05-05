import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Handshake,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ASSETS, COMPANY } from "@/lib/site";
import { useEffect, useState } from "react";
import { useInViewOnce } from "@/hooks/use-in-view";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: COMPANY.name,
  url: "https://wietek-geruestbau.de/ueber-uns",
  telephone: COMPANY.phonePrimary,
  email: COMPANY.email,
  foundingDate: `${COMPANY.founded}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.zip,
    addressLocality: `${COMPANY.city}-${COMPANY.district}`,
    addressCountry: "DE",
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Zuverlässigkeit",
    desc: "Wir sagen, was wir tun – und wir tun, was wir sagen. Termine sind keine Empfehlungen.",
  },
  {
    icon: Heart,
    title: "Sicherheit",
    desc: "Mensch zuerst. Jedes Gerüst wird nach DGUV abgenommen, dokumentiert und freigegeben.",
  },
  {
    icon: Handshake,
    title: "Partnerschaft",
    desc: "Persönlicher Ansprechpartner vom Aufmaß bis zum Abbau. Auf Augenhöhe.",
  },
];

const stats = [
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
      setVal(Math.round(end * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return (
    <div
      ref={ref}
      className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none"
    >
      {format ? val.toLocaleString("de-DE") : val}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

const team = [
  { name: "Tomasz Wietek", role: "Geschäftsführer & Inhaber" },
  { name: "Wietek Bauleitung", role: "Aufmaß, Planung, Projektleitung" },
  { name: "Montage-Team", role: "Aufbau, Abbau, Logistik" },
  { name: "Büro & Service", role: "Anfragen, Angebote, Abrechnung" },
];

const Page = () => (
  <PageLayout>
    <Helmet>
      <title>Über uns | Wietek Gerüstbau Hamburg – Familienunternehmen seit 2014</title>
      <meta
        name="description"
        content="Wietek Gerüstbau – Ihr familiengeführter Gerüstbauer aus Hamburg-Bergedorf. Seit 2014 zuverlässig, versichert & persönlich. Lernen Sie uns kennen!"
      />
      <link rel="canonical" href="https://wietek-geruestbau.de/ueber-uns" />
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
    </Helmet>
    <PageHero
      eyebrow="Über uns"
      title="Familiengeführt. Verwurzelt in Hamburg. Seit 2014."
      subtitle="Wir sind das Hamburger Gerüstbau-Team, das auch dann ans Telefon geht, wenn die Baustelle brennt."
      backgroundImage={ASSETS.slide(4)}
      breadcrumb="Über uns"
    />

    {/* Geschichte */}
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
                src={ASSETS.slide(5)}
                alt="Wietek Gerüstbau Team auf der Baustelle in Hamburg"
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
            <span className="eyebrow">Unsere Geschichte</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Wietek Gerüstbau – Hamburger Handwerk mit Herz
            </h2>
            <p className="mt-5 text-concrete leading-relaxed text-lg">
              2014 in Hamburg-Bergedorf gegründet, sind wir heute ein eingespieltes Team aus
              Gerüstbauern, das in ganz Norddeutschland für sicheres, schnelles und sauberes
              Arbeiten steht. Vom Einfamilienhaus bis zur Industriehalle – unsere Gerüste
              stehen termintreu, vollversichert und nach allen geltenden Normen.
            </p>
            <p className="mt-4 text-concrete leading-relaxed">
              Was uns von großen Konzernen unterscheidet: Bei Wietek sprechen Sie immer mit
              einem festen Ansprechpartner. Kein Callcenter, keine Warteschleife – nur
              direkte, ehrliche Kommunikation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Werte */}
    <section className="bg-muted py-16 lg:py-24">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow">Unsere Werte</span>
          <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
            Was uns antreibt
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 border border-border"
              >
                <Icon className="h-10 w-10 text-primary" />
                <h3 className="mt-5 font-display font-bold text-steel text-2xl">{v.title}</h3>
                <p className="mt-3 text-concrete leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Zahlen */}
    <section className="bg-blueprint py-16 lg:py-20">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow" style={{ color: "hsl(var(--primary))" }}>
            Wietek in Zahlen
          </span>
          <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
            Zahlen, die für sich sprechen.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i > 0 ? "sm:border-l sm:border-white/15 sm:pl-6 lg:pl-10" : ""}
            >
              <Counter end={s.end} suffix={s.suffix} format={s.format} />
              <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="bg-white py-16 lg:py-24">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow">Unser Team</span>
          <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
            Das Team hinter Wietek
          </h2>
          <p className="mt-5 text-concrete leading-relaxed">
            Erfahrene Gerüstbauer, eine schlanke Bauleitung und ein Büro, das wirklich
            zurückruft – das ist Wietek.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border border-border bg-plaster p-6 text-center"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-steel grid place-items-center text-white font-display font-extrabold text-2xl">
                {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div className="mt-4 font-display font-bold text-steel">{m.name}</div>
              <div className="mt-1 text-sm text-concrete">{m.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Fuhrpark */}
    <section className="bg-muted py-16 lg:py-24">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="eyebrow">Ausstattung</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Moderne Ausstattung für professionelle Ergebnisse
            </h2>
            <p className="mt-5 text-concrete leading-relaxed">
              Eigener Fuhrpark, modernes Layher-Material in großer Stückzahl, geprüfte
              Auffangnetze und Wetterschutzsysteme – wir haben alles vorrätig, um schnell
              auf Ihrer Baustelle zu sein.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Eigene LKW-Flotte für Hamburg & Norddeutschland",
                "Layher-Systemgerüste in großer Menge",
                "Werkstatt mit kontinuierlicher Materialprüfung",
                "Lager direkt in Hamburg-Bergedorf",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-steel">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:order-2"
          >
            <div className="relative overflow-hidden bg-steel-deep h-[320px] sm:h-[420px] lg:h-[500px]">
              <img
                src={ASSETS.slide(18)}
                alt="Wietek Fuhrpark und Layher-Gerüstmaterial"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Zertifizierungen */}
    <section className="bg-white py-16 lg:py-24">
      <div className="container-w">
        <div className="max-w-3xl">
          <span className="eyebrow">Zertifizierungen</span>
          <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
            Lizenziert, versichert & geprüft
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "Mitglied BG BAU", desc: "Berufsgenossenschaft der Bauwirtschaft." },
            { icon: ShieldCheck, title: "Vollversichert", desc: "5 Mio. € Betriebshaftpflicht." },
            { icon: Truck, title: "10+ Jahre Erfahrung", desc: "Familienbetrieb seit 2014." },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="border border-border p-6 bg-plaster">
                <Icon className="h-9 w-9 text-primary" />
                <h3 className="mt-4 font-display font-bold text-steel text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-concrete">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16 lg:py-20">
      <div className="container-w text-center">
        <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Lernen Sie uns persönlich kennen
        </h2>
        <p className="mt-5 text-white/85 text-lg">
          Anruf, WhatsApp oder Vor-Ort-Termin – wir freuen uns auf Sie.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
          >
            Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm transition-colors"
          >
            Unsere Leistungen
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Page;
