// Generic image source from Sanity (image asset reference object)
export type SanityImageSource = Record<string, unknown>;

export type SanitySlug = { current: string };
export type SanityImage = SanityImageSource & { alt?: string };

export interface Homepage {
  _id: string;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroUsps?: string[];
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  heroImage?: SanityImage;
  counterProjects?: number;
  counterYears?: number;
  counterSquareMeters?: number;
  statsItems?: { value: string; label: string }[];
  processSteps?: { title: string; description: string }[];
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
  headline?: string;
  intro?: string;
  story?: unknown;
  teamImage?: SanityImage;
  stats?: { value: string; label: string }[];
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
  footerTagline?: string;
  footerLegal?: string;
  serviceArea?: string;
}
