import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Euro,
  ShieldCheck,
  HeartHandshake,
  Truck,
  Briefcase,
  MapPin,
  Clock,
  Loader2,
  Send,
  CheckCircle2,
  Upload,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ASSETS, COMPANY } from "@/lib/site";

const benefits = [
  { icon: Euro, title: "Faire Bezahlung", desc: "Übertarifliche Vergütung, pünktlich, plus Bonus." },
  { icon: ShieldCheck, title: "Sicherer Job", desc: "Unbefristet, Vollzeit, planbare Arbeitszeiten." },
  { icon: HeartHandshake, title: "Familiäres Team", desc: "Kleine Crew, kurze Wege, echte Wertschätzung." },
  { icon: Truck, title: "Moderne Ausstattung", desc: "Neue Layher-Systeme, eigener Fuhrpark, gute Werkzeuge." },
];

const jobs = [
  {
    title: "Gerüstbauer (m/w/d)",
    type: "Vollzeit · Hamburg",
    desc: "Aufbau, Umbau und Abbau von Fassaden-, Innen- und Sondergerüsten in Hamburg und Umgebung.",
    bullets: ["Berufserfahrung im Gerüstbau", "Führerschein Klasse B (C wünschenswert)", "Teamfähig & zuverlässig"],
  },
  {
    title: "Gerüstbauhelfer (m/w/d)",
    type: "Vollzeit · Hamburg",
    desc: "Unterstützung des Gerüstbau-Teams bei Auf- und Abbau, Materialhandling und Logistik.",
    bullets: ["Körperliche Fitness", "Schwindelfreiheit", "Lernbereit, auch ohne Erfahrung möglich"],
  },
];

const schema = z.object({
  name: z.string().trim().min(2, "Bitte vollständigen Namen angeben").max(80),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(120),
  phone: z
    .string()
    .trim()
    .min(5, "Bitte gültige Telefonnummer")
    .max(40)
    .regex(/^[\d\s+\-/()]+$/, "Nur Ziffern und + - / ( ) erlaubt"),
  position: z.string().trim().min(2, "Bitte Position wählen"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Bitte zustimmen" }),
});
type FormData = z.infer<typeof schema>;

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "Gerüstbauer (m/w/d)",
      message: "",
      consent: undefined as unknown as true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Bewerbung gesendet!", {
      description: "Wir melden uns innerhalb weniger Tage.",
    });
    console.info("Bewerbung (nicht versendet):", { ...data, file: fileName });
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Jobs & Karriere | Wietek Gerüstbau Hamburg – Jetzt bewerben</title>
        <meta
          name="description"
          content="Gerüstbauer (m/w/d) in Hamburg gesucht! Familiengeführtes Unternehmen, faire Bezahlung, sicherer Job. Jetzt bei Wietek Gerüstbau bewerben!"
        />
        <link rel="canonical" href="https://wietek-geruestbau.de/karriere" />
      </Helmet>

      <PageHero
        eyebrow="Karriere"
        title="Werde Teil des Wietek-Teams in Hamburg"
        subtitle="Faire Bezahlung, kollegiales Team, moderne Ausstattung – wir suchen Gerüstbauer (m/w/d) und Helfer."
        backgroundImage={ASSETS.slide(20)}
        breadcrumb="Karriere"
      />

      {/* Benefits */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-w">
          <div className="max-w-3xl">
            <span className="eyebrow">Warum Wietek?</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Dein Arbeitgeber in Hamburg
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border border-border bg-plaster p-6"
                >
                  <Icon className="h-9 w-9 text-primary" />
                  <h3 className="mt-4 font-display font-bold text-steel text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-concrete">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stellen */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container-w">
          <div className="max-w-3xl">
            <span className="eyebrow">Offene Stellen</span>
            <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
              Aktuelle Stellenangebote
            </h2>
          </div>
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            {jobs.map((j, i) => (
              <motion.article
                key={j.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border p-7"
              >
                <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-primary">
                  <Briefcase className="h-4 w-4" /> {j.type}
                </div>
                <h3 className="mt-3 font-display font-extrabold text-steel text-2xl leading-tight">
                  {j.title}
                </h3>
                <p className="mt-3 text-concrete leading-relaxed">{j.desc}</p>
                <ul className="mt-5 space-y-2">
                  {j.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-steel">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#bewerbung"
                  onClick={() => form.setValue("position", j.title)}
                  className="mt-6 inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                >
                  Jetzt bewerben
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Bewerbungsformular */}
      <section id="bewerbung" className="bg-white py-20 lg:py-28">
        <div className="container-w">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">Bewerbung</span>
              <h2 className="mt-4 font-display font-extrabold text-steel text-3xl sm:text-4xl leading-tight">
                Jetzt bewerben
              </h2>
              <p className="mt-5 text-concrete leading-relaxed">
                Schick uns deine Daten – wir melden uns persönlich. Lieber direkt anrufen?{" "}
                <a href={`tel:${COMPANY.phonePrimary}`} className="text-primary font-semibold">
                  {COMPANY.phonePrimaryDisplay}
                </a>
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-plaster p-6 sm:p-8 lg:p-10 border border-border">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto grid h-16 w-16 place-items-center bg-primary text-white rounded-full">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 font-display font-extrabold text-2xl text-steel">
                      Vielen Dank für deine Bewerbung!
                    </h3>
                    <p className="mt-3 text-concrete max-w-md mx-auto">
                      Wir melden uns innerhalb weniger Tage bei dir.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-4">
                    <Field label="Name" error={form.formState.errors.name?.message}>
                      <Input {...form.register("name")} placeholder="Vor- und Nachname" />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="E-Mail" error={form.formState.errors.email?.message}>
                        <Input type="email" {...form.register("email")} placeholder="du@mail.de" />
                      </Field>
                      <Field label="Telefon" error={form.formState.errors.phone?.message}>
                        <Input {...form.register("phone")} placeholder="0172 …" />
                      </Field>
                    </div>
                    <Field label="Position" error={form.formState.errors.position?.message}>
                      <select
                        {...form.register("position")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {jobs.map((j) => (
                          <option key={j.title}>{j.title}</option>
                        ))}
                        <option>Initiativbewerbung</option>
                      </select>
                    </Field>
                    <Field label="Nachricht (optional)">
                      <Textarea
                        {...form.register("message")}
                        rows={4}
                        placeholder="Erzähl kurz von dir und deiner Erfahrung…"
                      />
                    </Field>

                    {/* File Upload */}
                    <label className="block">
                      <span className="block text-xs font-display font-bold uppercase tracking-wider text-steel mb-1.5">
                        Lebenslauf (PDF, optional)
                      </span>
                      <div className="flex items-center gap-3 border-2 border-dashed border-border bg-white p-4 hover:border-primary transition-colors">
                        <Upload className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-concrete truncate">
                          {fileName ?? "Datei wählen oder hierher ziehen"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                          className="ml-auto text-xs"
                        />
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-sm text-concrete">
                      <input
                        type="checkbox"
                        {...form.register("consent")}
                        className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                      />
                      <span>
                        Ich bin mit der Speicherung und Verarbeitung meiner Bewerbungsdaten
                        einverstanden. Die Daten werden vertraulich behandelt.
                      </span>
                    </label>
                    {form.formState.errors.consent && (
                      <p className="text-sm text-primary font-semibold">
                        {form.formState.errors.consent.message}
                      </p>
                    )}

                    <button type="submit" disabled={submitting} className="btn-primary justify-center">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet…
                        </>
                      ) : (
                        <>
                          Bewerbung absenden <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-concrete">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  {COMPANY.street}, {COMPANY.zip} {COMPANY.city}
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-primary mt-0.5" />
                  {COMPANY.hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-xs font-display font-bold uppercase tracking-wider text-steel mb-1.5">
      {label}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-primary font-semibold">{error}</span>}
  </label>
);

export default Page;
