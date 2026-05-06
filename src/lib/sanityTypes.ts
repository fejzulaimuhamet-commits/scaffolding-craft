// Generic image source from Sanity (image asset reference object)
export type SanityImageSource = Record<string, unknown>;

export type SanitySlug = { current: string };
export type SanityImage = SanityImageSource & { alt?: string };

export interface LinkItem { label: string; to: string }

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

  // Services section
  servicesEyebrow?: string;
  servicesTitle?: string;
  servicesIntro?: string;

  // Industries section
  industriesEyebrow?: string;
  industriesTitle?: string;
  industriesIntro?: string;
  industriesItems?: { icon?: string; title?: string; description?: string }[];

  // Testimonials section
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonialsIntro?: string;
  testimonialsBadgeText?: string;

  // Service area
  serviceAreaEyebrow?: string;
  serviceAreaTitle?: string;
  serviceAreaIntro?: string;
  serviceAreaCities?: string[];

  // FAQ
  faqEyebrow?: string;
  faqTitle?: string;
  faqIntro?: string;
  faqItems?: { question: string; answer: string }[];

  // Contact
  contactEyebrow?: string;
  contactTitle?: string;
  contactIntro?: string;
  contactCtaWhatsapp?: string;
  contactCtaCall?: string;
}

export interface Navigation {
  _id: string;
  topBarText?: string;
  navItems?: { label: string; href: string }[];
  megaCtaTitle?: string;
  megaCtaSubtitle?: string;
  megaServices?: { icon?: string; label?: string; desc?: string; href?: string }[];
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
  phoneMobile?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  googleRating?: number;
  googleRatingCount?: number;
  footerTagline?: string;
  footerLegal?: string;
  serviceArea?: string;
  footerCtaEyebrow?: string;
  footerCtaHeadline?: string;
  footerCtaButton?: string;
  footerColServicesTitle?: string;
  footerColServices?: LinkItem[];
  footerColLocationsTitle?: string;
  footerColLocations?: LinkItem[];
  footerContactTitle?: string;
  footerLegalLinks?: LinkItem[];
  instagramUrl?: string;
  facebookUrl?: string;
}
