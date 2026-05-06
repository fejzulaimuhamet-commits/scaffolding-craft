import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export const SANITY_PROJECT_ID =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string) || "d683vf4r";
export const SANITY_DATASET =
  (import.meta.env.VITE_SANITY_DATASET as string) || "production";

const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string) ||
  "https://wietek-geruestbau.sanity.studio";

// Visual Editing aktiv, wenn die Seite im Sanity Presentation Tool (iframe) läuft.
const isInIframe =
  typeof window !== "undefined" && window.self !== window.top;

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: !isInIframe,
  perspective: isInIframe ? "previewDrafts" : "published",
  stega: isInIframe
    ? { enabled: true, studioUrl: STUDIO_URL }
    : { enabled: false },
});

export const client = sanityClient;

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
