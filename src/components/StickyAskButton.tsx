import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Send } from "lucide-react";

/**
 * Round sticky "Jetzt anfragen" button — appears after 300px scroll.
 * Hidden on the homepage and on the /anfrage page itself.
 */
export const StickyAskButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (location.pathname === "/" || location.pathname === "/anfrage") return null;

  return (
    <Link
      to="/anfrage"
      aria-label="Jetzt Gerüst anfragen"
      className={`fixed z-40 right-4 sm:right-6 bottom-36 sm:bottom-24 grid place-items-center h-14 w-14 rounded-full bg-primary text-white shadow-[0_14px_30px_-8px_hsla(353,71%,50%,0.6)] transition-all duration-500 hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <Send className="h-5 w-5" />
    </Link>
  );
};
