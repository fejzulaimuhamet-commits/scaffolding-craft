import { Link, useLocation } from "react-router-dom";
import { Send } from "lucide-react";

/**
 * Round sticky "Jetzt anfragen" button — always visible, fixed bottom-right.
 * Stacked above the WhatsApp button. Hidden only on /anfrage (redundant there).
 */
export const StickyAskButton = () => {
  const location = useLocation();

  if (location.pathname === "/anfrage") return null;

  return (
    <Link
      to="/anfrage"
      aria-label="Jetzt Gerüst anfragen"
      className="fixed z-50 right-8 bottom-24 grid place-items-center h-14 w-14 lg:h-12 lg:w-12 rounded-full bg-primary text-primary-foreground shadow-[0_14px_30px_-8px_hsla(353,71%,50%,0.6)] transition-transform hover:scale-110 active:scale-95"
    >
      <Send className="h-6 w-6 lg:h-5 lg:w-5" />
    </Link>
  );
};
