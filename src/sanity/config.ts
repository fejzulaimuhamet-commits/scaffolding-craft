import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

// Origin der Live-Website, die im Presentation Tool als Vorschau geladen wird.
// MUSS auf die published Lovable-URL zeigen (dort läuft unsere App).
// Die `id-preview--…lovable.app` URL hostet ein fremdes Projekt — nicht nutzen.
const PREVIEW_ORIGIN =
  (import.meta.env.VITE_PREVIEW_ORIGIN as string | undefined) ||
  "https://scaffolding-craft.lovable.app";


export const sanityConfig = defineConfig({
  name: "wietek",
  title: "Wietek Gerüstbau CMS",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [
    presentationTool({
      allowOrigins: [
        "https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app",
        "https://scaffolding-craft.lovable.app",
        PREVIEW_ORIGIN,
      ],
      previewUrl: {
        origin: PREVIEW_ORIGIN,
        preview: "/",
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
