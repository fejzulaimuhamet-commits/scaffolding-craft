import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "Über uns",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Überschrift", type: "string" }),
    defineField({ name: "intro", title: "Intro-Text", type: "text", rows: 4 }),
    defineField({ name: "story", title: "Unsere Geschichte", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "teamImage",
      title: "Team-Bild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
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
      name: "values",
      title: "Werte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Titel" },
            { name: "description", type: "text", title: "Beschreibung" },
          ],
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Zertifikate",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Über uns" }) },
});
