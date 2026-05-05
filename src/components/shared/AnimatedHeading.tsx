import { ElementType, ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  highlight?: string; // single word(s) to render with red gradient
  delay?: number;
  children?: ReactNode;
}

/**
 * Premium word-by-word reveal heading.
 * Renders each word with a 0.15s stagger.
 */
export const AnimatedHeading = ({
  text,
  as: Tag = "h1",
  className = "",
  highlight,
  delay = 0,
}: AnimatedHeadingProps) => {
  const words = text.split(" ");
  const MotionTag = motion(Tag as any);

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.15, delayChildren: delay }}
      className={className}
    >
      {words.map((word, i) => {
        const isHighlight =
          highlight &&
          word.replace(/[.,!?;:]$/, "").toLowerCase() === highlight.toLowerCase();
        return (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className={`inline-block mr-[0.28em] ${
              isHighlight ? "text-gradient-red" : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionTag>
  );
};
