import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export const SANITY_PROJECT_ID =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string) || "d683vf4r";
export const SANITY_DATASET =
  (import.meta.env.VITE_SANITY_DATASET as string) || "production";

const STUDIO_URL =
  (import.meta.env.VITE_SANITY_STUDIO_URL as string) ||
  "https://scaffolding-craft.lovable.app/studio";

const PREVIEW_TOKEN_KEY = "sanity-preview-token";

// Visual Editing aktiv, wenn die Seite im Sanity Presentation Tool (iframe) läuft.
const isInIframe =
  typeof window !== "undefined" && window.self !== window.top;

// Draft mode requires a valid preview token (set after secret validation).
const previewToken =
  isInIframe && typeof window !== "undefined"
    ? window.sessionStorage.getItem(PREVIEW_TOKEN_KEY) ?? undefined
    : undefined;

const draftMode = isInIframe && Boolean(previewToken);

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: !draftMode,
  perspective: draftMode ? "previewDrafts" : "published",
  token: draftMode ? previewToken : undefined,
  stega: isInIframe
    ? { enabled: true, studioUrl: STUDIO_URL }
    : { enabled: false },
});

export const client = sanityClient;

export { PREVIEW_TOKEN_KEY };

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
