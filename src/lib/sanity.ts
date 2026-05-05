import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export const SANITY_PROJECT_ID =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string) || "d683vf4r";
export const SANITY_DATASET =
  (import.meta.env.VITE_SANITY_DATASET as string) || "production";
const SANITY_TOKEN = import.meta.env.VITE_SANITY_TOKEN as string | undefined;

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: !SANITY_TOKEN,
  token: SANITY_TOKEN,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function imageUrl(source: SanityImageSource | undefined, w = 1200): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).width(w).auto("format").quality(80).url();
  } catch {
    return undefined;
  }
}
