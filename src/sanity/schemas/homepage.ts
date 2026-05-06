import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroBadge", title: "Hero Badge (über Titel)", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Untertitel", type: "text", rows: 3 }),
    defineField({
      name: "heroUsps",
      title: "Hero USPs (4 Stichpunkte)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(6),
    }),
    defineField({ name: "heroCtaPrimary", title: "Hero Button primär", type: "string" }),
    defineField({ name: "heroCtaSecondary", title: "Hero Button sekundär", type: "string" }),
    defineField({
      name: "heroImage",
      title: "Hero Bild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt-Text" }],
    }),
    defineField({ name: "counterProjects", title: "Counter: Projekte", type: "number" }),
    defineField({ name: "counterYears", title: "Counter: Jahre Erfahrung", type: "number" }),
    defineField({ name: "counterSquareMeters", title: "Counter: m² verbaut", type: "number" }),
    defineField({
      name: "statsItems",
      title: "Stats (Zahlen-Sektion)",
      type: "array",
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
    defineField({
      name: "processSteps",
      title: "Ablauf-Schritte",
      type: "array",
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
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
