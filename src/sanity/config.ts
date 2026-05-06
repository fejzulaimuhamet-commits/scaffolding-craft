import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

// Origin der Live-Website, die im Presentation Tool als Vorschau geladen wird.
// Default: stabile Lovable-Preview-URL (immer erreichbar, unabhängig vom Publish-Status).
// Override per VITE_PREVIEW_ORIGIN möglich (z.B. published Domain).
const PREVIEW_ORIGIN =
  (import.meta.env.VITE_PREVIEW_ORIGIN as string | undefined) ||
  "https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app";


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
