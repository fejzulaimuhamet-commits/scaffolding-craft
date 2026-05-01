import { MessageCircle } from "lucide-react";
import { COMPANY, waLink } from "@/lib/site";

export const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat starten"
        className="fixed z-50 bottom-20 right-4 sm:bottom-6 sm:right-6 grid place-items-center h-14 w-14 sm:h-14 sm:w-14 lg:h-12 lg:w-12 rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="h-7 w-7 lg:h-6 lg:w-6 fill-white/0" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping pointer-events-none" />
      </a>

      {/* Sticky CTA Bar – nur Mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden bg-white border-t border-border shadow-[0_-10px_25px_-12px_rgba(15,23,42,0.25)]">
        <div className="flex items-stretch">
          <a
            href={`tel:${COMPANY.phonePrimary}`}
            className="flex-1 grid place-items-center py-3.5 text-xs font-display font-bold uppercase tracking-wider text-steel border-r border-border"
          >
            Anrufen
          </a>
          <a
            href="#anfrage"
            className="flex-[1.4] grid place-items-center py-3.5 text-xs font-display font-bold uppercase tracking-wider bg-primary text-white"
          >
            Jetzt anfragen
          </a>
        </div>
      </div>
    </>
  );
};
