import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { ASSETS } from "@/lib/site";
import { useCompany } from "@/hooks/useCompany";
import { useSettings } from "@/hooks/useSanity";

export const Footer = () => {
  const COMPANY = useCompany();
  const { data: settings } = useSettings();
  const tagline = settings?.footerTagline;
  return (
    <footer className="footer-grain text-white pt-0 pb-8 relative">
      {/* Top CTA strip */}
      <div className="relative bg-primary text-white">
        <div className="container-w py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-display font-bold uppercase tracking-[0.28em] text-white/80">
              Projekt anfragen?
            </div>
            <div className="mt-2 font-display text-2xl lg:text-3xl font-extrabold leading-tight">
              Wir bauen Ihr Gerüst – schnell, sicher und persönlich.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={`tel:${COMPANY.phonePrimary}`}
              className="inline-flex items-center gap-2 font-display font-bold text-lg hover:underline underline-offset-4"
            >
              <Phone className="h-5 w-5" /> {COMPANY.phonePrimaryDisplay}
            </a>
            <Link
              to="/anfrage"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-display font-extrabold uppercase tracking-wider text-sm px-6 py-3.5 rounded-sm transition-all hover:scale-[1.03] hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]"
            >
              Jetzt anfragen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hazard stripe */}
      <div className="hazard-stripe h-2" />

      <div className="container-w pt-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <img
                src={ASSETS.logoWhite}
                alt="Wietek Gerüstbau Logo – Gerüstbau Hamburg"
                width={160}
                height={48}
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              {tagline ?? `Familiengeführter Gerüstbau aus ${COMPANY.city}-${COMPANY.district}. Sicher, pünktlich und persönlich – seit ${COMPANY.founded}.`}
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-sm bg-white/10 hover:bg-primary transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-sm bg-white/10 hover:bg-primary transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <FooterColLinks
            title="Leistungen"
            items={[
              { label: "Fassadengerüst Hamburg", to: "/leistungen/fassadengeruest" },
              { label: "Innengerüst Hamburg", to: "/leistungen/innengeruest" },
              { label: "Treppenturm Hamburg", to: "/leistungen/treppenturm" },
              { label: "Dachfanggerüst Hamburg", to: "/leistungen/dachfanggeruest" },
              { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
              { label: "Wetterschutzdach", to: "/leistungen/wetterschutz" },
            ]}
          />

          <FooterColLinks
            title="Standorte"
            items={[
              { label: "Gerüstbau Hamburg", to: "/leistungen" },
              { label: "Gerüstbau Bergedorf", to: "/leistungen" },
              { label: "Gerüstbau Harburg", to: "/leistungen" },
              { label: "Gerüstbau Lüneburg", to: "/leistungen" },
              { label: "Gerüstbau Norderstedt", to: "/leistungen" },
              { label: "Gerüstbau Stade", to: "/leistungen" },
            ]}
          />

          <div>
            <div className="font-display font-extrabold uppercase tracking-wider text-sm mb-5">
              Kontakt
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {COMPANY.street}, {COMPANY.zip} {COMPANY.city}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a href={`tel:${COMPANY.phonePrimary}`} className="hover:text-white">
                  {COMPANY.phonePrimaryDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white break-all">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} {COMPANY.name}. Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-5">
            <a href="#impressum" className="hover:text-white">Impressum</a>
            <a href="#datenschutz" className="hover:text-white">Datenschutz</a>
            <a href="#agb" className="hover:text-white">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColLinks = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) => (
  <div>
    <div className="font-display font-extrabold uppercase tracking-wider text-sm mb-5">
      {title}
    </div>
    <ul className="space-y-2.5 text-sm text-white/70">
      {items.map((it) => (
        <li key={it.label}>
          <Link to={it.to} className="hover:text-white transition-colors">
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
