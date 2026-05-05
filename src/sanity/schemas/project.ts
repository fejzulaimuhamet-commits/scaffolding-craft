import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projekt",
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
    defineField({ name: "location", title: "Ort", type: "string" }),
    defineField({ name: "year", title: "Jahr", type: "number" }),
    defineField({ name: "squareMeters", title: "m² Gerüstfläche", type: "number" }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Fassadengerüst", value: "fassade" },
          { title: "Innengerüst", value: "innen" },
          { title: "Treppenturm", value: "treppe" },
          { title: "Dachfanggerüst", value: "dach" },
          { title: "Schutznetze & Geländer", value: "schutz" },
          { title: "Wetterschutz", value: "wetter" },
        ],
      },
    }),
    defineField({
      name: "mainImage",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
