import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Untertitel", type: "text", rows: 3 }),
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
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
