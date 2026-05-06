import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

// Origin der Live-Website, die im Presentation Tool als Vorschau geladen wird.
// Fest auf die Lovable-URL gesetzt, weil die Custom-Domain (wietek-geruestbau.de)
// aktuell noch nicht auf Lovable zeigt und im Iframe nicht lädt.
const PREVIEW_ORIGIN = "https://scaffolding-craft.lovable.app";

// Edge function endpoint that validates the one-time preview secret and
// returns a Sanity read token for draft mode.
const PREVIEW_SECRET_ENDPOINT =
  "https://mvmynkefvkarxtxlejqw.supabase.co/functions/v1/sanity-preview";

export const sanityConfig = defineConfig({
  name: "wietek",
  title: "Wietek Gerüstbau CMS",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [
    presentationTool({
      previewUrl: {
        origin: PREVIEW_ORIGIN,
        preview: "/",
        // Same-origin SPA-Pfad. Das Studio hängt ?sanity-preview-secret=…
        // an und navigiert den iframe dorthin. bootstrapPreview() in
        // src/main.tsx validiert den Secret per fetch gegen die
        // sanity-preview Edge-Function, speichert das Token in
        // sessionStorage und lädt im Draft-Mode neu.
        previewMode: {
          enable: "/",
        },
      },
    }),
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});

export default sanityConfig;
