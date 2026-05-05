import { sanityClient } from "./sanity";
import type {
  Homepage,
  Service,
  Project,
  AboutPage,
  Testimonial,
  Career,
  Post,
  Settings,
} from "./sanityTypes";

const safe = async <T>(promise: Promise<T>, fallback: T): Promise<T> => {
  try {
    return await promise;
  } catch (err) {
    console.warn("[sanity] query failed:", err);
    return fallback;
  }
};

export const getHomepage = (): Promise<Homepage | null> =>
  safe(
    sanityClient.fetch<Homepage | null>(
      `*[_type == "homepage"][0]{
        _id, heroTitle, heroSubtitle, heroImage,
        counterProjects, counterYears, counterSquareMeters
      }`,
    ),
    null,
  );

export const getAllServices = (): Promise<Service[]> =>
  safe(
    sanityClient.fetch<Service[]>(
      `*[_type == "service"] | order(title asc){
        _id, title, slug, description, mainImage, features, faq,
        metaTitle, metaDescription
      }`,
    ),
    [],
  );

export const getServiceBySlug = (slug: string): Promise<Service | null> =>
  safe(
    sanityClient.fetch<Service | null>(
      `*[_type == "service" && slug.current == $slug][0]{
        _id, title, slug, description, mainImage, features, faq,
        metaTitle, metaDescription
      }`,
      { slug },
    ),
    null,
  );

export const getAllProjects = (): Promise<Project[]> =>
  safe(
    sanityClient.fetch<Project[]>(
      `*[_type == "project"] | order(year desc){
        _id, title, slug, location, year, squareMeters,
        category, mainImage, gallery
      }`,
    ),
    [],
  );

export const getProjectsByCategory = (category: string): Promise<Project[]> =>
  safe(
    sanityClient.fetch<Project[]>(
      `*[_type == "project" && category == $category] | order(year desc){
        _id, title, slug, location, year, squareMeters,
        category, mainImage, gallery
      }`,
      { category },
    ),
    [],
  );

export const getAllTestimonials = (): Promise<Testimonial[]> =>
  safe(
    sanityClient.fetch<Testimonial[]>(
      `*[_type == "testimonial"] | order(date desc){
        _id, name, city, rating, text, date
      }`,
    ),
    [],
  );

export const getAboutPage = (): Promise<AboutPage | null> =>
  safe(
    sanityClient.fetch<AboutPage | null>(
      `*[_type == "about"][0]{
        _id, story, teamImage, values, certifications
      }`,
    ),
    null,
  );

export const getAllJobs = (): Promise<Career[]> =>
  safe(
    sanityClient.fetch<Career[]>(
      `*[_type == "career" && active == true] | order(_createdAt desc){
        _id, jobTitle, jobType, location, description, requirements, active
      }`,
    ),
    [],
  );

export const getAllPosts = (): Promise<Post[]> =>
  safe(
    sanityClient.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc){
        _id, title, slug, mainImage, excerpt, publishedAt, metaTitle, keywords
      }`,
    ),
    [],
  );

export const getPostBySlug = (slug: string): Promise<Post | null> =>
  safe(
    sanityClient.fetch<Post | null>(
      `*[_type == "post" && slug.current == $slug][0]{
        _id, title, slug, mainImage, excerpt, body, publishedAt, metaTitle, keywords
      }`,
      { slug },
    ),
    null,
  );

export const getSettings = (): Promise<Settings | null> =>
  safe(
    sanityClient.fetch<Settings | null>(
      `*[_type == "settings"][0]{
        _id, phone, whatsapp, email, address, openingHours, googleRating
      }`,
    ),
    null,
  );
