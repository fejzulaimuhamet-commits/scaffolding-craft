import { useServices, useServiceBySlug } from "./useSanity";
import { imageUrl } from "@/lib/sanity";
import type { Service, FAQItem } from "@/lib/sanityTypes";

export interface ServiceContent {
  title?: string;
  description?: string;
  image?: string;
  features?: string[];
  faq?: FAQItem[];
  metaTitle?: string;
  metaDescription?: string;
}

const toContent = (s?: Service | null, w = 1600): ServiceContent => ({
  title: s?.title,
  description: s?.description,
  image: imageUrl(s?.mainImage, w),
  features: s?.features,
  faq: s?.faq,
  metaTitle: s?.metaTitle,
  metaDescription: s?.metaDescription,
});

/** Holt einen einzelnen Sanity-Service per Slug (für Detail-Seiten). */
export const useServiceContent = (slug: string): ServiceContent => {
  const { data } = useServiceBySlug(slug);
  return toContent(data);
};

/** Liefert eine Map slug → ServiceContent für die Übersichts-Sections. */
export const useServiceMap = () => {
  const { data } = useServices();
  const map = new Map<string, ServiceContent>();
  data?.forEach((s) => {
    if (s.slug?.current) map.set(s.slug.current, toContent(s, 1200));
  });
  return map;
};
