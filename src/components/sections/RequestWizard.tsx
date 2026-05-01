import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, ClipboardCheck, Home, Layers, Loader2, MoreHorizontal, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  type: z.enum(["fassade", "innen", "treppe", "sonstiges"], {
    message: "Bitte eine Option wählen",
  }),
  height: z.string().trim().min(1, "Bitte angeben").max(50),
  sqm: z.string().trim().min(1, "Bitte angeben").max(50),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "PLZ muss 5-stellig sein"),
  city: z.string().trim().min(2, "Bitte angeben").max(80),
  start: z.string().trim().max(40).optional().or(z.literal("")),
  name: z.string().trim().min(2, "Bitte vollständigen Namen angeben").max(80),
  phone: z
    .string()
    .trim()
    .min(5, "Bitte gültige Telefonnummer")
    .max(40)
    .regex(/^[\d\s+\-/()]+$/, "Nur Ziffern und + - / ( ) erlaubt"),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(120),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Bitte zustimmen" }),
});

type FormData = z.infer<typeof schema>;

const types = [
  { v: "fassade", label: "Fassadengerüst", icon: Building2 },
  { v: "innen", label: "Innengerüst", icon: Layers },
  { v: "treppe", label: "Treppenturm", icon: ClipboardCheck },
  { v: "sonstiges", label: "Sonstiges", icon: MoreHorizontal },
] as const;

export const RequestWizard = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      type: undefined as unknown as FormData["type"],
      height: "",
      sqm: "",
      zip: "",
      city: "",
      start: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
      consent: undefined as unknown as true,
    },
  });

  const next = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      0: ["type"],
      1: ["height", "sqm", "zip", "city"],
      2: ["name", "phone", "email", "consent"],
    };
    const ok = await form.trigger(fields[step]);
    if (ok) setStep((s) => (Math.min(3, s + 1) as 0 | 1 | 2 | 3));
  };

  const prev = () => setStep((s) => (Math.max(0, s - 1) as 0 | 1 | 2 | 3));

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Phase 1: nur Frontend – keine echte Übermittlung.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setStep(3);
    toast.success("Anfrage versendet!", {
      description: "Wir melden uns innerhalb von 24 Std. – meist deutlich schneller.",
    });
    // Daten könnten hier später an Lovable Cloud gehen
    console.info("Wizard-Daten (nicht versendet):", data);
  };

  const selectedType = form.watch("type");

  return (
    <section id="anfrage" className="py-20 lg:py-28 bg-blueprint relative overflow-hidden">
      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-signal" style={{ color: "hsl(var(--signal))" }}>
              Kostenloses Angebot
            </span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: "white" }}>
              Anfrage in <span className="hand-underline" style={{ color: "white" }}>60 Sekunden.</span>
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Drei Schritte, ein klares Ergebnis: Sie beschreiben uns Ihr Vorhaben, wir melden uns
              innerhalb von 24 Stunden mit Festpreis.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              {[
                "Antwort werktags meist in unter 2 Std.",
                "Verbindlicher Festpreis nach Aufmaß",
                "Komplettpaket inkl. Lieferung & Abbau",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 lg:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] relative">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 transition-colors ${
                      step > i ? "bg-primary" : step === i ? "bg-primary/60" : "bg-border"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs font-display font-bold text-concrete uppercase tracking-wider">
                  {step < 3 ? `Schritt ${step + 1}/3` : "Fertig"}
                </span>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="s0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-display font-extrabold text-2xl text-steel">
                        Was wird benötigt?
                      </h3>
                      <p className="mt-2 text-sm text-concrete">
                        Wählen Sie die Art des Gerüsts.
                      </p>
                      <div className="mt-6 grid sm:grid-cols-2 gap-3">
                        {types.map((t) => {
                          const Icon = t.icon;
                          const checked = selectedType === t.v;
                          return (
                            <label
                              key={t.v}
                              className={`flex items-center gap-3 cursor-pointer p-4 border-2 transition-colors ${
                                checked
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-steel"
                              }`}
                            >
                              <input
                                type="radio"
                                value={t.v}
                                {...form.register("type")}
                                className="sr-only"
                              />
                              <span
                                className={`grid h-10 w-10 place-items-center transition-colors ${
                                  checked ? "bg-primary text-white" : "bg-plaster text-steel"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <span className="font-display font-bold text-steel">{t.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      {form.formState.errors.type && (
                        <p className="mt-3 text-sm text-primary font-semibold">
                          {form.formState.errors.type.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-display font-extrabold text-2xl text-steel">Eckdaten</h3>
                      <p className="mt-2 text-sm text-concrete">Ungefähre Werte reichen.</p>
                      <div className="mt-6 grid sm:grid-cols-2 gap-4">
                        <FormField label="Höhe (z. B. 8 m)" error={form.formState.errors.height?.message}>
                          <Input {...form.register("height")} placeholder="ca. 8 m" />
                        </FormField>
                        <FormField label="Fläche (m²)" error={form.formState.errors.sqm?.message}>
                          <Input {...form.register("sqm")} placeholder="ca. 120" />
                        </FormField>
                        <FormField label="PLZ" error={form.formState.errors.zip?.message}>
                          <Input {...form.register("zip")} placeholder="21037" inputMode="numeric" />
                        </FormField>
                        <FormField label="Ort" error={form.formState.errors.city?.message}>
                          <Input {...form.register("city")} placeholder="Hamburg" />
                        </FormField>
                        <div className="sm:col-span-2">
                          <FormField label="Wunschtermin (optional)" error={form.formState.errors.start?.message}>
                            <Input {...form.register("start")} placeholder="z. B. ab nächste Woche" />
                          </FormField>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-display font-extrabold text-2xl text-steel">Kontakt</h3>
                      <p className="mt-2 text-sm text-concrete">
                        Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                      </p>
                      <div className="mt-6 grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <FormField label="Name" error={form.formState.errors.name?.message}>
                            <Input {...form.register("name")} placeholder="Vor- und Nachname" />
                          </FormField>
                        </div>
                        <FormField label="Telefon" error={form.formState.errors.phone?.message}>
                          <Input {...form.register("phone")} placeholder="0172 6666297" inputMode="tel" />
                        </FormField>
                        <FormField label="E-Mail" error={form.formState.errors.email?.message}>
                          <Input {...form.register("email")} placeholder="ihre@mail.de" type="email" inputMode="email" />
                        </FormField>
                        <div className="sm:col-span-2">
                          <FormField label="Weitere Infos (optional)" error={form.formState.errors.notes?.message}>
                            <Textarea
                              {...form.register("notes")}
                              placeholder="Beschreiben Sie kurz Ihr Vorhaben…"
                              rows={4}
                            />
                          </FormField>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="flex items-start gap-3 cursor-pointer text-sm text-concrete">
                            <input
                              type="checkbox"
                              {...form.register("consent")}
                              className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                            />
                            <span>
                              Ich bin mit der Speicherung und Verarbeitung meiner Daten zur Bearbeitung
                              meiner Anfrage einverstanden. Die Daten werden vertraulich behandelt.
                            </span>
                          </label>
                          {form.formState.errors.consent && (
                            <p className="mt-2 text-sm text-primary font-semibold">
                              {form.formState.errors.consent.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-6"
                    >
                      <div className="mx-auto grid h-16 w-16 place-items-center bg-primary text-white rounded-full">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="mt-5 font-display font-extrabold text-2xl text-steel">
                        Vielen Dank für Ihre Anfrage!
                      </h3>
                      <p className="mt-3 text-concrete max-w-md mx-auto">
                        Wir melden uns <strong>innerhalb von 24 Stunden</strong> – werktags meist
                        in unter zwei Stunden – mit einem konkreten Festpreis.
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-steel bg-plaster px-4 py-2">
                        <Home className="h-4 w-4 text-primary" /> Wietek Gerüstbau · Hamburg-Bergedorf
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {step < 3 && (
                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-concrete hover:text-steel disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4" /> Zurück
                    </button>
                    {step < 2 ? (
                      <button type="button" onClick={next} className="btn-primary justify-center">
                        Weiter <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={submitting} className="btn-primary justify-center">
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet…
                          </>
                        ) : (
                          <>
                            Anfrage absenden <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormField = ({
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
