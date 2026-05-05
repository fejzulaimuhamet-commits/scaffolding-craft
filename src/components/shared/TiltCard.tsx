import { ReactNode, useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/**
 * Subtle 3D tilt that follows the cursor inside the card.
 * Uses CSS variables --rx / --ry on the inner element.
 */
export const TiltCard = ({ children, className = "", max = 5 }: TiltCardProps) => {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 2 * max;
    const rx = -(py - 0.5) * 2 * max;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const onLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`tilt-3d ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={innerRef} className="tilt-3d-inner h-full w-full">
        {children}
      </div>
    </div>
  );
};
