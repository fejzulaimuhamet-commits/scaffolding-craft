import { useEffect, useRef } from "react";

/**
 * Premium custom cursor: small red dot + ring that enlarges on interactive elements.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduced) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(var(--ring-scale, 0.6))`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSelector)) {
        document.body.classList.add("lov-cursor-active");
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSelector)) {
        document.body.classList.remove("lov-cursor-active");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor", "lov-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="lov-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="lov-cursor-dot" aria-hidden="true" />
    </>
  );
};
