import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Globale Einstellungen",
  type: "document",
  groups: [
    { name: "company", title: "Firmendaten" },
    { name: "footer", title: "Footer" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    // ---------- Company ----------
    defineField({ name: "phone", title: "Telefon (Festnetz, Anzeige)", type: "string", group: "company" }),
    defineField({ name: "phoneMobile", title: "Telefon (Mobil)", type: "string", group: "company" }),
    defineField({ name: "whatsapp", title: "WhatsApp-Nummer", type: "string", group: "company" }),
    defineField({ name: "email", title: "E-Mail", type: "string", group: "company" }),
    defineField({ name: "address", title: "Adresse (Anzeige)", type: "text", rows: 3, group: "company" }),
    defineField({ name: "openingHours", title: "Öffnungszeiten", type: "string", group: "company" }),
    defineField({ name: "googleRating", title: "Google Bewertung (Zahl)", type: "number", group: "company" }),
    defineField({ name: "googleRatingCount", title: "Google Bewertungen Anzahl", type: "number", group: "company" }),
    defineField({ name: "serviceArea", title: "Einsatzgebiet (kurzer Text)", type: "string", group: "company" }),

    // ---------- Footer ----------
    defineField({ name: "footerCtaEyebrow", title: "Footer CTA Eyebrow", type: "string", group: "footer" }),
    defineField({ name: "footerCtaHeadline", title: "Footer CTA Überschrift", type: "string", group: "footer" }),
    defineField({ name: "footerCtaButton", title: "Footer CTA Button", type: "string", group: "footer" }),
    defineField({ name: "footerTagline", title: "Footer Tagline", type: "text", rows: 2, group: "footer" }),
    defineField({
      name: "footerColServicesTitle",
      title: "Footer Spalte 'Leistungen' – Titel",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerColServices",
      title: "Footer Spalte 'Leistungen' – Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "to", type: "string", title: "Link" },
          ],
          preview: { select: { title: "label", subtitle: "to" } },
        },
      ],
    }),
    defineField({
      name: "footerColLocationsTitle",
      title: "Footer Spalte 'Standorte' – Titel",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerColLocations",
      title: "Footer Spalte 'Standorte' – Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "to", type: "string", title: "Link" },
          ],
          preview: { select: { title: "label", subtitle: "to" } },
        },
      ],
    }),
    defineField({ name: "footerContactTitle", title: "Footer Spalte 'Kontakt' – Titel", type: "string", group: "footer" }),
    defineField({
      name: "footerLegalLinks",
      title: "Footer Legal-Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "to", type: "string", title: "Link" },
          ],
          preview: { select: { title: "label", subtitle: "to" } },
        },
      ],
    }),
    defineField({ name: "footerLegal", title: "Footer Copyright-Zeile", type: "string", group: "footer" }),

    // ---------- Social ----------
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url", group: "social" }),
  ],
  preview: { prepare: () => ({ title: "Globale Einstellungen" }) },
});
