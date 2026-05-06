import { defineType, defineField } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "topBarText", title: "Top-Bar Text (Adresse links)", type: "string" }),
    defineField({
      name: "navItems",
      title: "Hauptnavigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({ name: "megaCtaTitle", title: "Mega-Menü CTA Titel", type: "string" }),
    defineField({ name: "megaCtaSubtitle", title: "Mega-Menü CTA Untertitel", type: "string" }),
    defineField({
      name: "megaServices",
      title: "Mega-Menü Service-Einträge",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Building (Fassade)", value: "building" },
                  { title: "Layers (Innen)", value: "layers" },
                  { title: "TowerControl (Treppe)", value: "tower" },
                  { title: "Hammer (Dach)", value: "hammer" },
                  { title: "ShieldCheck (Schutz)", value: "shield" },
                  { title: "CloudRain (Wetter)", value: "cloud" },
                ],
              },
            },
            { name: "label", title: "Label", type: "string" },
            { name: "desc", title: "Beschreibung", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "desc" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
