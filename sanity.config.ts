import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { homepage } from "./src/sanity/schemas/homepage";

const PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? "https://scaffolding-craft.lovable.app";

export default defineConfig({
  name: "wietek-geruestbau",
  title: "Wietek Gerüstbau",
  projectId: "d683vf4r",
  dataset: "production",
  plugins: [
    presentationTool({
      previewUrl: { origin: PREVIEW_URL, preview: "/", previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    structureTool(),
    visionTool(),
  ],
  schema: { types: [homepage] },
});
