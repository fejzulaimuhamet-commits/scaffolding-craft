import { defineType, defineField } from "sanity";

const headlineFields = (prefix: string) => [
  defineField({ name: `${prefix}Eyebrow`, title: "Eyebrow", type: "string" }),
  defineField({ name: `${prefix}Title`, title: "Titel", type: "string" }),
  defineField({ name: `${prefix}Intro`, title: "Intro / Beschreibung", type: "text", rows: 3 }),
];

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats" },
    { name: "process", title: "Ablauf" },
    { name: "services", title: "Leistungen" },
    { name: "industries", title: "Branchen" },
    { name: "testimonials", title: "Bewertungen" },
    { name: "servicearea", title: "Servicegebiet" },
    { name: "faq", title: "FAQ" },
    { name: "contact", title: "Kontakt" },
  ],
  fields: [
    // ---------- HERO ----------
    defineField({ name: "heroBadge", title: "Hero Badge (über Titel)", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Hero Untertitel", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroUsps",
      title: "Hero USPs (4 Stichpunkte)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(6),
      group: "hero",
    }),
    defineField({ name: "heroCtaPrimary", title: "Hero Button primär", type: "string", group: "hero" }),
    defineField({ name: "heroCtaSecondary", title: "Hero Button sekundär", type: "string", group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Bild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt-Text" }],
      group: "hero",
    }),

    // ---------- STATS ----------
    defineField({ name: "counterProjects", title: "Counter: Projekte", type: "number", group: "stats" }),
    defineField({ name: "counterYears", title: "Counter: Jahre Erfahrung", type: "number", group: "stats" }),
    defineField({ name: "counterSquareMeters", title: "Counter: m² verbaut", type: "number", group: "stats" }),
    defineField({
      name: "statsItems",
      title: "Stats (Zahlen-Sektion)",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Wert", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),

    // ---------- PROCESS ----------
    defineField({
      name: "processSteps",
      title: "Ablauf-Schritte",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Beschreibung", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ---------- SERVICES SECTION ----------
    ...headlineFields("services").map((f) => ({ ...f, group: "services" })),

    // ---------- INDUSTRIES SECTION ----------
    ...headlineFields("industries").map((f) => ({ ...f, group: "industries" })),
    defineField({
      name: "industriesItems",
      title: "Branchen (4 Karten)",
      type: "array",
      group: "industries",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Hammer (Dachdecker)", value: "hammer" },
                  { title: "Pinsel (Maler)", value: "paint" },
                  { title: "Sonne (Solar)", value: "sun" },
                  { title: "Haus (Privat)", value: "home" },
                ],
              },
            },
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Beschreibung", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ---------- TESTIMONIALS SECTION ----------
    ...headlineFields("testimonials").map((f) => ({ ...f, group: "testimonials" })),
    defineField({
      name: "testimonialsBadgeText",
      title: "Bewertungs-Badge (z. B. 'Basierend auf 47+ Google-Bewertungen')",
      type: "string",
      group: "testimonials",
    }),

    // ---------- SERVICE AREA ----------
    ...headlineFields("serviceArea").map((f) => ({ ...f, group: "servicearea" })),
    defineField({
      name: "serviceAreaCities",
      title: "Städte / Stadtteile",
      type: "array",
      of: [{ type: "string" }],
      group: "servicearea",
    }),

    // ---------- FAQ ----------
    ...headlineFields("faq").map((f) => ({ ...f, group: "faq" })),
    defineField({
      name: "faqItems",
      title: "FAQ-Einträge",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Frage", type: "string" },
            { name: "answer", title: "Antwort", type: "text", rows: 4 },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    }),

    // ---------- CONTACT SECTION ----------
    ...headlineFields("contact").map((f) => ({ ...f, group: "contact" })),
    defineField({ name: "contactCtaWhatsapp", title: "Button: WhatsApp", type: "string", group: "contact" }),
    defineField({ name: "contactCtaCall", title: "Button: Anrufen", type: "string", group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
