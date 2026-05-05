import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Bewertung",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", title: "Stadt", type: "string" }),
    defineField({
      name: "rating",
      title: "Sterne",
      type: "number",
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: "text", title: "Text", type: "text", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Datum", type: "date" }),
  ],
});
