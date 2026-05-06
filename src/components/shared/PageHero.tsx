import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";
import { buildSrcSet, cappedSrc } from "@/lib/img";

interface PageHeroProps {
  title: string;
  eyebrow: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumb: string;
}

export const PageHero = ({
  title,
  eyebrow,
  subtitle,
  backgroundImage,
  breadcrumb,
}: PageHeroProps) => {
  return (
    <section
      className="relative -mt-24 lg:-mt-32 w-full h-[350px] lg:h-[500px] overflow-hidden"
      aria-label={title}
    >
      {/* Background */}
      <img
        src={cappedSrc(backgroundImage, 1280)}
        srcSet={buildSrcSet(backgroundImage, [400, 640, 828, 1024, 1280, 1600])}
        sizes="100vw"
        width={1600}
        height={500}
        alt={`${title} – Wietek Gerüstbau Hamburg`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      {/* Content */}
      <div className="relative h-full container-w flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <span className="hidden sm:block h-px w-8 bg-primary" />
            <span className="font-display uppercase tracking-[0.32em] text-primary text-[11px] sm:text-xs font-bold">
              {eyebrow}
            </span>
            <span className="hidden sm:block h-px w-8 bg-primary" />
          </motion.div>

          <AnimatedHeading
            text={title}
            as="h1"
            delay={0.1}
            className="mt-5 font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="pb-5 lg:pb-8 text-xs sm:text-sm font-medium tracking-wide"
        >
          <ol className="flex items-center gap-2 text-white/70">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Startseite
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              →
            </li>
            <li className="text-white" aria-current="page">
              {breadcrumb}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};
