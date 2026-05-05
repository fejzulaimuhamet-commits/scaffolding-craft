import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "Über uns",
  type: "document",
  fields: [
    defineField({ name: "story", title: "Unsere Geschichte", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "teamImage",
      title: "Team-Bild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
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
