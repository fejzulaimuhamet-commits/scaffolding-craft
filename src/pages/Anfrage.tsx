import { useMemo, useState } from "react";
import { PageSeo } from "@/components/PageSeo";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ASSETS, COMPANY, waLink } from "@/lib/site";
import { submitToWeb3Forms } from "@/lib/web3forms";

/* ---------------- Schema ---------------- */
const SERVICES = [
  "Fassadengerüst",
  "Innengerüst / Raumgerüst",
  "Treppenturm",
  "Dachfanggerüst",
  "Schutznetze & Geländer",
  "Wetterschutzdach",
  "Sonstiges",
] as const;

const PARKING = ["Ja, PKW", "Ja, LKW", "Nein"] as const;
const APPOINTMENTS = ["Telefonisch", "Vor-Ort-Termin", "Nur Angebot per E-Mail"] as const;
const DURATIONS = ["Bis 1 Woche", "1–4 Wochen", "1–3 Monate", "Länger als 3 Monate"] as const;

const schema = z
  .object({
    relation: z.enum(["Privatkunde", "Gewerblich", "Bauunternehmen"], {
      message: "Bitte wählen",
    }),
    firstName: z.string().trim().min(2, "Bitte angeben").max(60),
    lastName: z.string().trim().min(2, "Bitte angeben").max(60),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    email: z.string().trim().email("Ungültige E-Mail").max(120),
    phone: z
      .string()
      .trim()
      .min(5, "Bitte gültige Telefonnummer")
      .max(40)
      .regex(/^[\d\s+\-/()]+$/, "Nur Ziffern und + - / ( ) erlaubt"),
    street: z.string().trim().min(2, "Bitte angeben").max(120),
    zip: z.string().trim().regex(/^\d{5}$/, "PLZ muss 5-stellig sein"),
    city: z.string().trim().min(2, "Bitte angeben").max(80),

    services: z.array(z.enum(SERVICES)).min(1, "Mindestens eine Leistung wählen"),
    siteAddress: z.string().trim().max(160).optional().or(z.literal("")),
    sqm: z.string().trim().min(1, "Bitte angeben").max(20),
    height: z.string().trim().min(1, "Bitte angeben").max(20),
    parking: z.enum(PARKING, { message: "Bitte wählen" }),

    startDate: z.date().optional(),
    appointment: z.enum(APPOINTMENTS, { message: "Bitte wählen" }),
    duration: z.enum(DURATIONS, { message: "Bitte wählen" }),
    notes: z.string().trim().max(1500).optional().or(z.literal("")),

    consent: z.literal(true, { message: "Bitte zustimmen" }),
  })
  .superRefine((val, ctx) => {
    if (
      (val.relation === "Gewerblich" || val.relation === "Bauunternehmen") &&
      (!val.company || val.company.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Bitte Firmenname angeben",
      });
    }
  });

type FormData = z.infer<typeof schema>;

/* ---------------- Page ---------------- */
const Anfrage = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      relation: undefined as unknown as FormData["relation"],
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      street: "",
      zip: "",
      city: "",
      services: [],
      siteAddress: "",
      sqm: "",
      height: "",
      parking: undefined as unknown as FormData["parking"],
      startDate: undefined,
      appointment: undefined as unknown as FormData["appointment"],
      duration: undefined as unknown as FormData["duration"],
      notes: "",
      consent: undefined as unknown as true,
    },
  });

  const relation = form.watch("relation");
  const showCompany = relation === "Gewerblich" || relation === "Bauunternehmen";
  const data = form.watch();

  const stepFields: Record<number, (keyof FormData)[]> = useMemo(
    () => ({
      0: [
        "relation",
        "firstName",
        "lastName",
        ...(showCompany ? (["company"] as (keyof FormData)[]) : []),
        "email",
        "phone",
        "street",
        "zip",
        "city",
      ],
      1: ["services", "sqm", "height", "parking"],
      2: ["appointment", "duration"],
      3: ["consent"],
    }),
    [showCompany],
  );

  const next = async () => {
    const ok = await form.trigger(stepFields[step]);
    if (ok) setStep((s) => Math.min(3, s + 1) as typeof step);
  };
  const prev = () => setStep((s) => Math.max(0, s - 1) as typeof step);

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Anfrage versendet!", {
      description: "Wir melden uns innerhalb von 24 Stunden.",
    });
    console.info("Anfrage (nicht versendet):", { ...values, files: files.map((f) => f.name) });
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    const max = 10 * 1024 * 1024;
    const accepted = Array.from(list).filter((f) => {
      if (!allowed.includes(f.type)) {
        toast.error(`${f.name}: Format nicht erlaubt`);
        return false;
      }
      if (f.size > max) {
        toast.error(`${f.name}: max. 10 MB`);
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...accepted].slice(0, 10));
  };

  return (
    <PageLayout>
      <PageSeo
        title="Gerüst anfragen Hamburg – Angebot in 24 h | Wietek Gerüstbau"
        description="Gerüst in Hamburg anfragen – schnell, einfach & kostenlos. Antwort innerhalb 24 Std. für Fassadengerüst, Innengerüst, Treppenturm & mehr."
        path="/anfrage"
        keywords="Gerüst anfragen Hamburg, Gerüst Angebot Hamburg, Gerüstbau Anfrage, Wietek Anfrage"
        breadcrumbs={[
          { name: "Startseite", path: "/" },
          { name: "Anfrage", path: "/anfrage" },
        ]}
      />

      <PageHero
        eyebrow="Anfrage"
        title="Gerüst anfragen – kostenlos & unverbindlich"
        subtitle="Vier kurze Schritte. Antwort innerhalb von 24 Stunden – werktags meist in unter 2 Stunden."
        backgroundImage={ASSETS.slide(1)}
        breadcrumb="Anfrage"
      />

      <section className="bg-plaster py-16 lg:py-24">
        <div className="container-w">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Wizard */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-border shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
                {/* Progress */}
                <Stepper step={step} submitted={submitted} />

                <div className="p-6 sm:p-8 lg:p-10">
                  {submitted ? (
                    <SuccessScreen />
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                          <StepShell key="s0" title="Wer sind Sie?">
                            <Field label="Geschäftsbeziehung" required error={form.formState.errors.relation?.message}>
                              <RadioGroup
                                name="relation"
                                value={form.watch("relation")}
                                onChange={(v) => form.setValue("relation", v as FormData["relation"], { shouldValidate: true })}
                                options={["Privatkunde", "Gewerblich", "Bauunternehmen"]}
                              />
                            </Field>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <Field label="Vorname" required error={form.formState.errors.firstName?.message}>
                                <Input {...form.register("firstName")} placeholder="Max" />
                              </Field>
                              <Field label="Nachname" required error={form.formState.errors.lastName?.message}>
                                <Input {...form.register("lastName")} placeholder="Mustermann" />
                              </Field>
                            </div>

                            {showCompany && (
                              <Field label="Firma" required error={form.formState.errors.company?.message}>
                                <Input {...form.register("company")} placeholder="Mustermann GmbH" />
                              </Field>
                            )}

                            <div className="grid sm:grid-cols-2 gap-4">
                              <Field label="E-Mail" required error={form.formState.errors.email?.message}>
                                <Input type="email" {...form.register("email")} placeholder="ihre@mail.de" />
                              </Field>
                              <Field label="Telefonnummer" required error={form.formState.errors.phone?.message}>
                                <Input {...form.register("phone")} placeholder="0172 6666297" inputMode="tel" />
                              </Field>
                            </div>

                            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4">
                              <Field label="Straße & Hausnr." required error={form.formState.errors.street?.message}>
                                <Input {...form.register("street")} placeholder="Randersweide 91" />
                              </Field>
                              <Field label="PLZ" required error={form.formState.errors.zip?.message}>
                                <Input {...form.register("zip")} placeholder="21037" inputMode="numeric" className="sm:w-28" />
                              </Field>
                              <Field label="Ort" required error={form.formState.errors.city?.message}>
                                <Input {...form.register("city")} placeholder="Hamburg" />
                              </Field>
                            </div>
                          </StepShell>
                        )}

                        {step === 1 && (
                          <StepShell key="s1" title="Was benötigen Sie?">
                            <Field label="Dienstleistung (Mehrfachauswahl möglich)" required error={form.formState.errors.services?.message as string | undefined}>
                              <Controller
                                control={form.control}
                                name="services"
                                render={({ field }) => (
                                  <CheckboxGrid
                                    options={SERVICES as unknown as string[]}
                                    value={field.value as string[]}
                                    onChange={(v) => field.onChange(v)}
                                  />
                                )}
                              />
                            </Field>

                            <Field label="Straße des Bauvorhabens (falls abweichend)">
                              <Input {...form.register("siteAddress")} placeholder="z. B. Musterstraße 12, 22041 Hamburg" />
                            </Field>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <Field label="Einrüstfläche (ca. m²)" required error={form.formState.errors.sqm?.message}>
                                <Input {...form.register("sqm")} placeholder="z. B. 120" inputMode="numeric" />
                              </Field>
                              <Field label="Höhe des Gebäudes (ca. m)" required error={form.formState.errors.height?.message}>
                                <Input {...form.register("height")} placeholder="z. B. 8" inputMode="numeric" />
                              </Field>
                            </div>

                            <Field label="Parkmöglichkeiten vorhanden?" required error={form.formState.errors.parking?.message}>
                              <RadioGroup
                                name="parking"
                                value={form.watch("parking")}
                                onChange={(v) => form.setValue("parking", v as FormData["parking"], { shouldValidate: true })}
                                options={PARKING as unknown as string[]}
                              />
                            </Field>
                          </StepShell>
                        )}

                        {step === 2 && (
                          <StepShell key="s2" title="Wann & wie?">
                            <Field label="Gewünschter Starttermin">
                              <Controller
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          "w-full sm:w-72 justify-start text-left font-normal",
                                          !field.value && "text-muted-foreground",
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value
                                          ? format(field.value, "PPP", { locale: de })
                                          : "Datum wählen"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                        initialFocus
                                        className={cn("p-3 pointer-events-auto")}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                )}
                              />
                            </Field>

                            <Field label="Terminart" required error={form.formState.errors.appointment?.message}>
                              <RadioGroup
                                name="appointment"
                                value={form.watch("appointment")}
                                onChange={(v) => form.setValue("appointment", v as FormData["appointment"], { shouldValidate: true })}
                                options={APPOINTMENTS as unknown as string[]}
                              />
                            </Field>

                            <Field label="Voraussichtliche Dauer" required error={form.formState.errors.duration?.message}>
                              <select
                                {...form.register("duration")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="">Bitte wählen…</option>
                                {DURATIONS.map((d) => (
                                  <option key={d}>{d}</option>
                                ))}
                              </select>
                            </Field>

                            <Field label="Weitere Projektdetails">
                              <Textarea
                                {...form.register("notes")}
                                rows={4}
                                placeholder="Beschreiben Sie kurz Ihr Vorhaben…"
                              />
                            </Field>

                            {/* Upload */}
                            <Field label="Zeichnungen / Fotos (optional, max. 10 MB · PDF, JPG, PNG)">
                              <label
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragOver(false);
                                  handleFiles(e.dataTransfer.files);
                                }}
                                className={cn(
                                  "flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed bg-plaster p-6 text-center transition-colors",
                                  dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary",
                                )}
                              >
                                <Upload className="h-7 w-7 text-primary" />
                                <span className="text-sm text-steel font-display font-semibold">
                                  Datei wählen oder hierher ziehen
                                </span>
                                <span className="text-xs text-concrete">PDF, JPG, PNG · max. 10 MB pro Datei</span>
                                <input
                                  type="file"
                                  multiple
                                  accept=".pdf,application/pdf,image/jpeg,image/png"
                                  onChange={(e) => handleFiles(e.target.files)}
                                  className="hidden"
                                />
                              </label>

                              {files.length > 0 && (
                                <ul className="mt-3 space-y-1.5">
                                  {files.map((f, i) => (
                                    <li
                                      key={`${f.name}-${i}`}
                                      className="flex items-center justify-between gap-3 text-sm bg-white border border-border px-3 py-2"
                                    >
                                      <span className="truncate text-steel">{f.name}</span>
                                      <button
                                        type="button"
                                        onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                                        className="text-concrete hover:text-primary"
                                        aria-label="Entfernen"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </Field>
                          </StepShell>
                        )}

                        {step === 3 && (
                          <StepShell key="s3" title="Fast geschafft!">
                            <Summary data={data} files={files} />

                            <label className="mt-2 flex items-start gap-3 cursor-pointer text-sm text-concrete">
                              <input
                                type="checkbox"
                                {...form.register("consent")}
                                className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                              />
                              <span>
                                Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung
                                meiner Daten zur Bearbeitung dieser Anfrage zu. <span className="text-primary">*</span>
                              </span>
                            </label>
                            {form.formState.errors.consent && (
                              <p className="text-sm text-primary font-semibold">
                                {form.formState.errors.consent.message}
                              </p>
                            )}

                            <button
                              type="submit"
                              disabled={submitting}
                              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 disabled:opacity-60 px-8 py-4 font-display font-extrabold uppercase tracking-[0.18em] text-sm transition-colors"
                            >
                              {submitting ? (
                                <>
                                  <Loader2 className="h-5 w-5 animate-spin" /> Wird gesendet…
                                </>
                              ) : (
                                <>
                                  Anfrage jetzt absenden <Send className="h-5 w-5" />
                                </>
                              )}
                            </button>
                          </StepShell>
                        )}
                      </AnimatePresence>

                      {/* Nav buttons */}
                      <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-6">
                        <button
                          type="button"
                          onClick={prev}
                          disabled={step === 0}
                          className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-concrete hover:text-steel disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ArrowLeft className="h-4 w-4" /> Zurück
                        </button>
                        {step < 3 && (
                          <button
                            type="button"
                            onClick={next}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-6 py-3 font-display font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                          >
                            Weiter <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
              <div className="bg-steel-deep text-white p-7">
                <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-primary">
                  Lieber direkt anrufen?
                </span>
                <a
                  href={`tel:${COMPANY.phonePrimary}`}
                  className="mt-3 flex items-center gap-3 font-display font-extrabold text-2xl hover:text-primary transition-colors"
                >
                  <Phone className="h-6 w-6 text-primary" />
                  {COMPANY.phonePrimaryDisplay}
                </a>
                <p className="mt-2 text-sm text-white/70">{COMPANY.hours}</p>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-whatsapp text-white hover:opacity-90 px-5 py-3 font-display font-bold uppercase tracking-[0.18em] text-xs transition-opacity"
                >
                  <MessageCircle className="h-4 w-4" /> Per WhatsApp schreiben
                </a>
              </div>

              <div className="bg-white border border-border p-7">
                <span className="eyebrow">Ihr Vorteil</span>
                <ul className="mt-4 space-y-3">
                  {[
                    "Kostenlos & unverbindlich",
                    "Antwort in 24 Std.",
                    "Familiengeführt seit 2014",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-steel">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-display font-semibold">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

/* ---------------- Subcomponents ---------------- */

const STEP_LABELS = ["Auftraggeber", "Projektdetails", "Termin & Details", "Bestätigung"];

const Stepper = ({ step, submitted }: { step: number; submitted: boolean }) => (
  <div className="px-6 sm:px-8 lg:px-10 pt-7 pb-5 border-b border-border">
    <ol className="flex items-center gap-2">
      {STEP_LABELS.map((label, i) => {
        const isDone = submitted || i < step;
        const isActive = !submitted && i === step;
        return (
          <li key={label} className="flex-1 flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full text-sm font-display font-extrabold shrink-0 transition-colors",
                  isDone
                    ? "bg-[hsl(var(--whatsapp))] text-white"
                    : isActive
                    ? "bg-primary text-white"
                    : "bg-plaster text-concrete border border-border",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:block text-xs font-display font-bold uppercase tracking-[0.16em] truncate",
                  isActive ? "text-steel" : "text-concrete",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <span
                className={cn(
                  "flex-1 h-[2px] transition-colors",
                  isDone ? "bg-[hsl(var(--whatsapp))]" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  </div>
);

const StepShell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{ duration: 0.25 }}
    className="space-y-5"
  >
    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-steel">{title}</h3>
    {children}
  </motion.div>
);

const Field = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-xs font-display font-bold uppercase tracking-wider text-steel mb-1.5">
      {label} {required && <span className="text-primary">*</span>}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-primary font-semibold">{error}</span>}
  </label>
);

const RadioGroup = ({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string | undefined;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="grid sm:grid-cols-3 gap-2">
    {options.map((opt) => {
      const checked = value === opt;
      return (
        <label
          key={opt}
          className={cn(
            "flex items-center gap-2 cursor-pointer p-3 border-2 text-sm font-display font-semibold transition-colors",
            checked ? "border-primary bg-primary/5 text-steel" : "border-border hover:border-steel text-steel",
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={checked}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          <span
            className={cn(
              "h-4 w-4 rounded-full border-2 grid place-items-center transition-colors",
              checked ? "border-primary" : "border-border",
            )}
          >
            {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
          </span>
          {opt}
        </label>
      );
    })}
  </div>
);

const CheckboxGrid = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) => (
  <div className="grid sm:grid-cols-2 gap-2">
    {options.map((opt) => {
      const checked = value.includes(opt);
      return (
        <label
          key={opt}
          className={cn(
            "flex items-center gap-3 cursor-pointer p-3 border-2 text-sm font-display font-semibold transition-colors",
            checked ? "border-primary bg-primary/5" : "border-border hover:border-steel",
          )}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              onChange(checked ? value.filter((v) => v !== opt) : [...value, opt]);
            }}
            className="sr-only"
          />
          <span
            className={cn(
              "h-5 w-5 grid place-items-center border-2 transition-colors",
              checked ? "bg-primary border-primary text-white" : "border-border bg-white",
            )}
          >
            {checked && <Check className="h-3.5 w-3.5" />}
          </span>
          <span className="text-steel">{opt}</span>
        </label>
      );
    })}
  </div>
);

const Summary = ({ data, files }: { data: FormData; files: File[] }) => {
  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-border last:border-0 text-sm">
      <span className="font-display font-bold uppercase tracking-wider text-concrete text-xs">
        {label}
      </span>
      <span className="text-steel break-words">{value || <em className="text-concrete">—</em>}</span>
    </div>
  );

  return (
    <div className="bg-plaster border border-border p-5 sm:p-6">
      <Row label="Beziehung" value={data.relation} />
      <Row label="Name" value={`${data.firstName ?? ""} ${data.lastName ?? ""}`.trim()} />
      {data.company && <Row label="Firma" value={data.company} />}
      <Row label="E-Mail" value={data.email} />
      <Row label="Telefon" value={data.phone} />
      <Row label="Adresse" value={`${data.street}, ${data.zip} ${data.city}`} />
      <Row label="Leistungen" value={data.services?.join(", ")} />
      {data.siteAddress && <Row label="Bauvorhaben" value={data.siteAddress} />}
      <Row label="Fläche" value={data.sqm ? `${data.sqm} m²` : ""} />
      <Row label="Höhe" value={data.height ? `${data.height} m` : ""} />
      <Row label="Parken" value={data.parking} />
      <Row
        label="Starttermin"
        value={data.startDate ? format(data.startDate, "PPP", { locale: de }) : ""}
      />
      <Row label="Terminart" value={data.appointment} />
      <Row label="Dauer" value={data.duration} />
      {data.notes && <Row label="Notizen" value={data.notes} />}
      {files.length > 0 && (
        <Row label="Anhänge" value={files.map((f) => f.name).join(", ")} />
      )}
    </div>
  );
};

const SuccessScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="text-center py-10"
  >
    <div className="mx-auto grid h-20 w-20 place-items-center bg-[hsl(var(--whatsapp))] text-white rounded-full">
      <CheckCircle2 className="h-10 w-10" />
    </div>
    <h3 className="mt-6 font-display font-extrabold text-3xl text-steel">
      Vielen Dank für Ihre Anfrage!
    </h3>
    <p className="mt-4 text-concrete max-w-md mx-auto leading-relaxed">
      Wir melden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen – werktags meist in
      unter 2 Stunden.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-steel text-white hover:bg-primary px-6 py-3 font-display font-bold uppercase tracking-[0.18em] text-xs transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
      </Link>
      <Link
        to="/leistungen"
        className="inline-flex items-center gap-2 border-2 border-steel text-steel hover:bg-steel hover:text-white px-6 py-3 font-display font-bold uppercase tracking-[0.18em] text-xs transition-colors"
      >
        Unsere Leistungen
      </Link>
    </div>
  </motion.div>
);

export default Anfrage;
