import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { service } from "./service";
import { project } from "./project";
import { about } from "./about";
import { testimonial } from "./testimonial";
import { career } from "./career";
import { post } from "./post";
import { settings } from "./settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  homepage,
  service,
  project,
  about,
  testimonial,
  career,
  post,
  settings,
];
