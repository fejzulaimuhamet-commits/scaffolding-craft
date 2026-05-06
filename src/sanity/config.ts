import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

// Origin der Live-Website, die im Presentation Tool als Vorschau geladen wird.
const PREVIEW_ORIGIN =
  (import.meta.env.VITE_SITE_URL as string) ||
  (typeof window !== "undefined" ? window.location.origin : "https://scaffolding-craft.lovable.app");

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
      },
    }),
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});

export default sanityConfig;
