import { useQuery } from "@tanstack/react-query";
import {
  getHomepage,
  getAllServices,
  getServiceBySlug,
  getAllProjects,
  getProjectsByCategory,
  getAllTestimonials,
  getAboutPage,
  getAllJobs,
  getAllPosts,
  getSettings,
} from "@/lib/queries";

const opts = { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false };

export const useHomepage = () =>
  useQuery({ queryKey: ["sanity", "homepage"], queryFn: getHomepage, ...opts });

export const useServices = () =>
  useQuery({ queryKey: ["sanity", "services"], queryFn: getAllServices, ...opts });

export const useServiceBySlug = (slug: string) =>
  useQuery({
    queryKey: ["sanity", "service", slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
    ...opts,
  });

export const useProjects = () =>
  useQuery({ queryKey: ["sanity", "projects"], queryFn: getAllProjects, ...opts });

export const useProjectsByCategory = (category: string) =>
  useQuery({
    queryKey: ["sanity", "projects", category],
    queryFn: () => getProjectsByCategory(category),
    enabled: !!category,
    ...opts,
  });

export const useTestimonials = () =>
  useQuery({ queryKey: ["sanity", "testimonials"], queryFn: getAllTestimonials, ...opts });

export const useAboutPage = () =>
  useQuery({ queryKey: ["sanity", "about"], queryFn: getAboutPage, ...opts });

export const useJobs = () =>
  useQuery({ queryKey: ["sanity", "jobs"], queryFn: getAllJobs, ...opts });

export const usePosts = () =>
  useQuery({ queryKey: ["sanity", "posts"], queryFn: getAllPosts, ...opts });

export const useSettings = () =>
  useQuery({ queryKey: ["sanity", "settings"], queryFn: getSettings, ...opts });
