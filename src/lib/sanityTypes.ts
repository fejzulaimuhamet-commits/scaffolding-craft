import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type SanitySlug = { current: string };
export type SanityImage = SanityImageSource & { alt?: string };

export interface Homepage {
  _id: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  counterProjects?: number;
  counterYears?: number;
  counterSquareMeters?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  mainImage?: SanityImage;
  features?: string[];
  faq?: FAQItem[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: SanitySlug;
  location?: string;
  year?: number;
  squareMeters?: number;
  category?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
}

export interface AboutPage {
  _id: string;
  story?: unknown;
  teamImage?: SanityImage;
  values?: { title: string; description: string }[];
  certifications?: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  city?: string;
  rating?: number;
  text: string;
  date?: string;
}

export interface Career {
  _id: string;
  jobTitle: string;
  jobType?: string;
  location?: string;
  description?: string;
  requirements?: string[];
  active?: boolean;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: unknown;
  publishedAt?: string;
  metaTitle?: string;
  keywords?: string[];
}

export interface Settings {
  _id: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  googleRating?: number;
}
