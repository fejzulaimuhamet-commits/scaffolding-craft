import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ASSETS, COMPANY, NAV } from "@/lib/site";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-steel shadow-[0_4px_20px_-12px_rgba(0,0,0,0.5)]"
          : "bg-steel/90 backdrop-blur-sm"
      }`}
    >
      {/* Top utility bar – desktop only */}
      <div
        className={`hidden lg:block bg-steel-deep text-white text-xs transition-all duration-300 ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-9 opacity-100"
        }`}
      >
        <div className="container-w h-9 flex items-center justify-between">
          <span className="opacity-70">
            {COMPANY.street}, {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
          </span>
          <span className="flex items-center gap-5 opacity-90">
            <span>{COMPANY.hours}</span>
            <a href={`tel:${COMPANY.phonePrimary}`} className="hover:text-primary flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> {COMPANY.phonePrimaryDisplay}
            </a>
          </span>
        </div>
      </div>

      <div className="container-w">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Wietek Gerüstbau – Startseite">
            <img
              src={ASSETS.logoWhite}
              alt="Wietek Gerüstbau Logo"
              className="h-10 lg:h-12 w-auto"
              loading="eager"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className="font-display text-sm font-medium text-white hover:text-primary transition-colors"
                activeClassName="!text-primary"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" /> {COMPANY.phonePrimaryDisplay}
            </a>
            <Link to="/kontakt" className="hidden sm:inline-flex btn-primary !py-2.5 !px-4 text-xs">
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
            {NAV.map((item) => (
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
            ))}
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="mt-3 inline-flex items-center gap-2 text-steel font-semibold"
            >
              <Phone className="h-4 w-4 text-primary" /> {COMPANY.phonePrimaryDisplay}
            </a>
            <Link to="/kontakt" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full text-center">
              Gerüst anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
