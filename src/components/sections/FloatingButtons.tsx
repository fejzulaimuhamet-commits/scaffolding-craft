import { Link, useLocation } from "react-router-dom";
import { Home, Layers, Phone, Send, MessageCircle } from "lucide-react";
import { COMPANY, waLink } from "@/lib/site";

export const FloatingButtons = () => {
  const { pathname } = useLocation();

  const items = [
    { label: "Start", to: "/", icon: Home, match: (p: string) => p === "/" },
    { label: "Leistungen", to: "/leistungen", icon: Layers, match: (p: string) => p.startsWith("/leistungen") },
    { label: "Anrufen", href: `tel:${COMPANY.phonePrimary}`, icon: Phone, primary: true },
    { label: "Anfrage", to: "/anfrage", icon: Send, match: (p: string) => p === "/anfrage" },
  ];

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat starten"
        className="fixed z-50 bottom-24 right-4 sm:bottom-6 sm:right-6 grid place-items-center h-14 w-14 lg:h-12 lg:w-12 rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="h-7 w-7 lg:h-6 lg:w-6" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping pointer-events-none" />
      </a>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed inset-x-0 bottom-0 z-40 sm:hidden bg-steel-deep border-t border-white/10 shadow-[0_-10px_25px_-12px_rgba(0,0,0,0.6)]"
      >
        <ul className="grid grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;
            const active = "match" in it && it.match ? it.match(pathname) : false;
            const base =
              "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-display font-semibold uppercase tracking-wider transition-colors";
            const cls = it.primary
              ? `${base} bg-primary text-white`
              : `${base} ${active ? "text-primary" : "text-white/80 hover:text-white"}`;
            const inner = (
              <>
                <Icon className="h-5 w-5" />
                <span>{it.label}</span>
              </>
            );
            return (
              <li key={it.label}>
                {it.href ? (
                  <a href={it.href} className={cls} aria-label={it.label}>
                    {inner}
                  </a>
                ) : (
                  <Link to={it.to!} className={cls} aria-label={it.label}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
