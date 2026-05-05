import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CloudRain,
  Hammer,
  Home,
  Layers,
  Menu,
  Phone,
  ShieldCheck,
  TowerControl,
  X,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ASSETS, COMPANY, NAV } from "@/lib/site";

const SERVICES = [
  {
    label: "Fassadengerüst",
    desc: "Sanierung, Anstrich & Neubau",
    href: "/leistungen/fassadengeruest",
    icon: Building2,
  },
  {
    label: "Innengerüst",
    desc: "Hallen, Kirchen, Treppenhäuser",
    href: "/leistungen/innengeruest",
    icon: Layers,
  },
  {
    label: "Treppenturm",
    desc: "Sicherer Zugang bis 20 m",
    href: "/leistungen/treppenturm",
    icon: TowerControl,
  },
  {
    label: "Dachfanggerüst",
    desc: "Absturzsicherung nach DGUV",
    href: "/leistungen/dachfanggeruest",
    icon: Hammer,
  },
  {
    label: "Schutznetze & Geländer",
    desc: "Auffangnetze, EN 1263",
    href: "/leistungen/schutznetze-gelaender",
    icon: ShieldCheck,
  },
  {
    label: "Wetterschutz",
    desc: "Arbeiten bei jedem Wetter",
    href: "/leistungen/wetterschutz",
    icon: CloudRain,
  },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on route change
  useEffect(() => {
    setMegaOpen(false);
    setOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    if (megaOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [megaOpen]);

  const handleEnter = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-steel/95 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(0,0,0,0.6)]"
          : "bg-steel/90 backdrop-blur-sm"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      {/* Top utility bar – desktop only */}
      <div
        className={`hidden lg:block bg-steel-deep text-white text-xs transition-all duration-500 ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-9 opacity-100"
        }`}
      >
        <div className="container-w h-9 flex items-center justify-between">
          <span className="opacity-70">
            {COMPANY.street}, {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
          </span>
          <span className="flex items-center gap-5 opacity-90">
            <span>{COMPANY.hours}</span>
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="hover:text-primary flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" /> {COMPANY.phonePrimaryDisplay}
            </a>
          </span>
        </div>
      </div>

      <div className="container-w">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <Link to="/" className="flex items-center" aria-label="Wietek Gerüstbau – Startseite">
            <img
              src={ASSETS.logoWhite}
              alt="Wietek Gerüstbau Logo"
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-8 lg:h-9" : "h-10 lg:h-12"
              }`}
              loading="eager"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => {
              if (item.href === "/leistungen") {
                const isActive = location.pathname.startsWith("/leistungen");
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    ref={megaRef}
                  >
                    <Link
                      to="/leistungen"
                      className={`flex items-center gap-1.5 font-display text-sm font-medium transition-colors ${
                        isActive ? "text-primary" : "text-white hover:text-primary"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[480px]"
                        >
                          <div className="bg-white rounded-lg shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] border border-border overflow-hidden">
                            {/* Top CTA */}
                            <Link
                              to="/leistungen"
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center justify-between gap-3 bg-primary text-white px-5 py-4 hover:bg-primary/90 transition-colors group"
                            >
                              <div>
                                <div className="font-display font-extrabold text-sm uppercase tracking-[0.18em]">
                                  Alle Leistungen ansehen
                                </div>
                                <div className="text-xs text-white/80 mt-0.5">
                                  Übersicht aller Wietek-Gerüstlösungen
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            {/* Service grid */}
                            <ul className="grid grid-cols-2 p-2">
                              {SERVICES.map((s) => {
                                const Icon = s.icon;
                                return (
                                  <li key={s.href}>
                                    <Link
                                      to={s.href}
                                      onClick={() => setMegaOpen(false)}
                                      className="flex items-start gap-3 p-3 border-l-2 border-transparent hover:border-primary hover:bg-plaster transition-colors rounded-r-md"
                                    >
                                      <span className="grid h-9 w-9 place-items-center bg-plaster text-primary shrink-0">
                                        <Icon className="h-5 w-5" />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block font-display font-semibold text-steel text-sm leading-tight">
                                          {s.label}
                                        </span>
                                        <span className="block text-xs text-concrete mt-0.5 leading-snug">
                                          {s.desc}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  className="nav-underline font-display text-sm font-medium text-white hover:text-primary transition-colors"
                  activeClassName="!text-primary"
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" /> {COMPANY.phonePrimaryDisplay}
            </a>
            <Link to="/anfrage" className="hidden sm:inline-flex btn-primary cta-pulse !py-2.5 !px-4 text-xs">
              Gerüst anfragen
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-11 w-11 place-items-center bg-primary text-white"
              aria-label="Menü öffnen"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in">
          <nav className="container-w py-5 flex flex-col gap-1">
            {NAV.map((item) => {
              if (item.href === "/leistungen") {
                return (
                  <div key={item.href} className="border-b border-border/60">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-3 px-2 font-display font-semibold text-steel"
                      aria-expanded={mobileServicesOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2 flex flex-col">
                            <Link
                              to="/leistungen"
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between bg-primary text-white px-4 py-3 mb-2 mr-2 rounded-md text-xs font-display font-extrabold uppercase tracking-[0.18em]"
                            >
                              Alle Leistungen ansehen
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                            {SERVICES.map((s) => {
                              const Icon = s.icon;
                              return (
                                <Link
                                  key={s.href}
                                  to={s.href}
                                  onClick={() => setOpen(false)}
                                  className="flex items-start gap-3 py-2.5 px-2"
                                >
                                  <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span>
                                    <span className="block font-display font-semibold text-steel text-sm">
                                      {s.label}
                                    </span>
                                    <span className="block text-xs text-concrete">{s.desc}</span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={() => setOpen(false)}
                  className="py-3 px-2 font-display font-semibold text-steel border-b border-border/60"
                  activeClassName="!text-primary"
                >
                  {item.label}
                </NavLink>
              );
            })}
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="mt-3 inline-flex items-center gap-2 text-steel font-semibold"
            >
              <Phone className="h-4 w-4 text-primary" /> {COMPANY.phonePrimaryDisplay}
            </a>
            <Link
              to="/anfrage"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full text-center"
            >
              Gerüst anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
