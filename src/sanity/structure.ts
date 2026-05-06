import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("🏠 Homepage")
        .child(S.editor().id("homepage").schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("📄 Über uns")
        .child(S.editor().id("about").schemaType("about").documentId("about")),
      S.divider(),
      S.listItem()
        .title("⚙️ Globale Einstellungen")
        .child(S.editor().id("settings").schemaType("settings").documentId("settings")),
      S.listItem()
        .title("🧭 Navigation")
        .child(S.editor().id("navigation").schemaType("navigation").documentId("navigation")),
      S.divider(),
      S.documentTypeListItem("service").title("Leistungen"),
      S.documentTypeListItem("project").title("Projekte"),
      S.documentTypeListItem("testimonial").title("Bewertungen"),
      S.documentTypeListItem("career").title("Karriere"),
      S.documentTypeListItem("post").title("Blog"),
    ]);
