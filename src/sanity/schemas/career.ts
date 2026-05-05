import { defineType, defineField } from "sanity";

export const career = defineType({
  name: "career",
  title: "Stellenanzeige",
  type: "document",
  fields: [
    defineField({ name: "jobTitle", title: "Stellentitel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "jobType", title: "Anstellungsart", type: "string" }),
    defineField({ name: "location", title: "Standort", type: "string" }),
    defineField({ name: "description", title: "Beschreibung", type: "text", rows: 5 }),
    defineField({ name: "requirements", title: "Anforderungen", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "active", title: "Aktiv", type: "boolean", initialValue: true }),
  ],
});
