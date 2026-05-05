import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

export const sanityConfig = defineConfig({
  name: "wietek",
  title: "Wietek Gerüstbau CMS",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});

export default sanityConfig;
