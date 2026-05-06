// Responsive image helpers for Cloudinary & Sanity URLs.
// Centralizes srcSet generation so every <img> can ship the smallest
// possible bytes for the device viewport.

const DEFAULT_WIDTHS = [400, 640, 828, 1024, 1280, 1600];

const isCloudinary = (url: string) => url.includes("res.cloudinary.com");
const isSanity = (url: string) => url.includes("cdn.sanity.io");

/** Replace or inject a width param in a Cloudinary delivery URL. */
export const cldWithWidth = (url: string, w: number) => {
  if (!isCloudinary(url)) return url;
  if (/\/upload\/[^/]*w_\d+/.test(url)) {
    return url.replace(/w_\d+/, `w_${w}`);
  }
  // Inject f_auto,q_auto,w_X,c_limit right after /upload/
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${w},c_limit/`,
  );
};

/** Build a srcSet string for any Cloudinary or Sanity URL. */
export const buildSrcSet = (url?: string, widths: number[] = DEFAULT_WIDTHS) => {
  if (!url) return undefined;
  if (isCloudinary(url)) {
    return widths.map((w) => `${cldWithWidth(url, w)} ${w}w`).join(", ");
  }
  if (isSanity(url)) {
    const sep = url.includes("?") ? "&" : "?";
    return widths
      .map((w) => `${url}${sep}w=${w}&auto=format&q=75 ${w}w`)
      .join(", ");
  }
  return undefined;
};

/** Best-effort base src capped to a max width (good for the `src` attr). */
export const cappedSrc = (url: string, maxW = 1280) => {
  if (isCloudinary(url)) return cldWithWidth(url, maxW);
  if (isSanity(url)) {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}w=${maxW}&auto=format&q=75`;
  }
  return url;
};
