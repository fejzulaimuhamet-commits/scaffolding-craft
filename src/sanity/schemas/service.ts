import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Beschreibung", type: "text", rows: 4 }),
    defineField({
      name: "mainImage",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt-Text" }],
    }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Frage" },
            { name: "answer", type: "text", title: "Antwort" },
          ],
        },
      ],
    }),
    defineField({ name: "metaTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "metaDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
});
