import { defineType, defineField } from "sanity";

/**
 * Kontaktdaten – sichtbar im Studio für den Kunden.
 * Header/Footer im Code lesen NICHT aus diesen Feldern (siehe useCompany).
 * Diese Daten werden ausschließlich in den Inhalts-Sektionen (Kontakt-Sektion,
 * About-Page etc.) angezeigt, wo der Kunde sie editieren darf.
 */
export const settings = defineType({
  name: "settings",
  title: "Kontaktdaten",
  type: "document",
  groups: [
    { name: "company", title: "Kontakt & Firma" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    defineField({
      name: "phone",
      title: "Telefon (Festnetz)",
      type: "string",
      group: "company",
      description: "Wird in den Inhalts-Sektionen angezeigt.",
    }),
    defineField({
      name: "phoneMobile",
      title: "Telefon (Mobil)",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp-Nummer",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      group: "company",
    }),
    defineField({
      name: "openingHours",
      title: "Öffnungszeiten",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "googleRating",
      title: "Google Bewertung (Zahl)",
      type: "number",
      group: "company",
    }),
    defineField({
      name: "googleRatingCount",
      title: "Anzahl Google-Bewertungen",
      type: "number",
      group: "company",
    }),
    defineField({
      name: "serviceArea",
      title: "Einsatzgebiet (kurz)",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),
  ],
  preview: { prepare: () => ({ title: "Kontaktdaten" }) },
});
