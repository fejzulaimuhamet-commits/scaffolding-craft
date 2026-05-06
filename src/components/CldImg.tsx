import { forwardRef } from "react";
import { buildSrcSet, cappedSrc } from "@/lib/img";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "srcSet"> & {
  src: string;
  alt: string;
  /** Defaults to "lazy". Use "eager" + priority for above-the-fold images. */
  priority?: boolean;
  /** Width breakpoints to generate. */
  widths?: number[];
  /** sizes attribute. Defaults to "100vw". */
  sizes?: string;
  /** Cap base src width (prevents shipping huge originals to small screens). */
  maxWidth?: number;
};

/**
 * Drop-in <img> with automatic responsive srcSet for Cloudinary / Sanity.
 * Always renders width/height (defaults provided) to avoid CLS.
 */
export const CldImg = forwardRef<HTMLImageElement, Props>(function CldImg(
  {
    src,
    alt,
    priority = false,
    widths,
    sizes = "100vw",
    maxWidth = 1280,
    width = 1280,
    height = 720,
    loading,
    decoding,
    ...rest
  },
  ref,
) {
  const srcSet = buildSrcSet(src, widths);
  return (
    <img
      ref={ref}
      src={cappedSrc(src, maxWidth)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      // @ts-expect-error fetchpriority is valid HTML attribute
      fetchpriority={priority ? "high" : undefined}
      {...rest}
    />
  );
});
