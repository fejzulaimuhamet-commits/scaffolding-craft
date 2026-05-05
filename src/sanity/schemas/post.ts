import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog-Beitrag",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({ name: "excerpt", title: "Auszug", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Inhalt", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", title: "Veröffentlicht am", type: "datetime" }),
    defineField({ name: "metaTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
  ],
});
