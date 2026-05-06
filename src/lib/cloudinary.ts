// Cloudinary helper – Wietek Cloud
const CLOUD = "dcfg5yabi";

/**
 * Build a Cloudinary delivery URL.
 * @param publicId  Full public_id including the upload-suffix (e.g. "facade-scaffolding-1_o5p03l")
 * @param w         Optional max width (delivers responsive variant via c_limit)
 */
export const cld = (publicId: string, w?: number) => {
  const t = ["f_auto", "q_auto"];
  if (w) t.push(`w_${w}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t.join(",")}/${publicId}`;
};
