import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { service } from "./service";
import { project } from "./project";
import { about } from "./about";
import { testimonial } from "./testimonial";
import { career } from "./career";
import { post } from "./post";
import { settings } from "./settings";
import { navigation } from "./navigation";

export const schemaTypes: SchemaTypeDefinition[] = [
  homepage,
  about,
  navigation,
  settings,
  service,
  project,
  testimonial,
  career,
  post,
];
