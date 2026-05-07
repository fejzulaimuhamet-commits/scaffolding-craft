import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export const FloatingButtons = () => {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat starten"
      className="fixed z-50 bottom-6 right-4 sm:right-6 grid place-items-center h-14 w-14 lg:h-12 lg:w-12 rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-transform"
    >
      <MessageCircle className="h-7 w-7 lg:h-6 lg:w-6" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping pointer-events-none" />
    </a>
  );
};
