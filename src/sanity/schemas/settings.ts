import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 3 }),
    defineField({ name: "openingHours", title: "Öffnungszeiten", type: "string" }),
    defineField({ name: "googleRating", title: "Google Bewertung", type: "number" }),
  ],
  preview: { prepare: () => ({ title: "Einstellungen" }) },
});
