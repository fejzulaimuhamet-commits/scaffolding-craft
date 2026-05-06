import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { ASSETS } from "@/lib/site";
import { useCompany } from "@/hooks/useCompany";
import { useSettings } from "@/hooks/useSanity";

const defaultServices = [
  { label: "Fassadengerüst Hamburg", to: "/leistungen/fassadengeruest" },
  { label: "Innengerüst Hamburg", to: "/leistungen/innengeruest" },
  { label: "Treppenturm Hamburg", to: "/leistungen/treppenturm" },
  { label: "Dachfanggerüst Hamburg", to: "/leistungen/dachfanggeruest" },
  { label: "Schutznetze & Geländer", to: "/leistungen/schutznetze-gelaender" },
  { label: "Wetterschutzdach", to: "/leistungen/wetterschutz" },
];

const defaultLocations = [
  { label: "Gerüstbau Hamburg", to: "/leistungen" },
  { label: "Gerüstbau Bergedorf", to: "/leistungen" },
  { label: "Gerüstbau Harburg", to: "/leistungen" },
  { label: "Gerüstbau Lüneburg", to: "/leistungen" },
  { label: "Gerüstbau Norderstedt", to: "/leistungen" },
  { label: "Gerüstbau Stade", to: "/leistungen" },
];

const defaultLegal = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "#agb" },
];

export const Footer = () => {
  const COMPANY = useCompany();
  const { data: settings } = useSettings();

  const ctaEyebrow = settings?.footerCtaEyebrow ?? "Projekt anfragen?";
  const ctaHeadline = settings?.footerCtaHeadline ?? "Wir bauen Ihr Gerüst – schnell, sicher und persönlich.";
  const ctaButton = settings?.footerCtaButton ?? "Jetzt anfragen";
  const tagline = settings?.footerTagline ?? `Familiengeführter Gerüstbau aus ${COMPANY.city}-${COMPANY.district}. Sicher, pünktlich und persönlich – seit ${COMPANY.founded}.`;
  const colServicesTitle = settings?.footerColServicesTitle ?? "Leistungen";
  const colServices = settings?.footerColServices && settings.footerColServices.length > 0 ? settings.footerColServices : defaultServices;
  const colLocationsTitle = settings?.footerColLocationsTitle ?? "Standorte";
  const colLocations = settings?.footerColLocations && settings.footerColLocations.length > 0 ? settings.footerColLocations : defaultLocations;
  const contactTitle = settings?.footerContactTitle ?? "Kontakt";
  const legalLinks = settings?.footerLegalLinks && settings.footerLegalLinks.length > 0 ? settings.footerLegalLinks : defaultLegal;
  const legalLine = settings?.footerLegal ?? `© ${new Date().getFullYear()} ${COMPANY.name}. Alle Rechte vorbehalten.`;

  return (
    <footer className="footer-grain text-white pt-0 pb-8 relative">
      <div className="relative bg-primary text-white">
        <div className="container-w py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-display font-bold uppercase tracking-[0.28em] text-white/80">
              {ctaEyebrow}
            </div>
            <div className="mt-2 font-display text-2xl lg:text-3xl font-extrabold leading-tight">
              {ctaHeadline}
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
              {ctaButton} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="hazard-stripe h-2" />

      <div className="container-w pt-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <p className="mt-5 text-sm text-white/70 leading-relaxed">{tagline}</p>
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

          <FooterColLinks title={colServicesTitle} items={colServices} />
          <FooterColLinks title={colLocationsTitle} items={colLocations} />

          <div>
            <div className="font-display font-extrabold uppercase tracking-wider text-sm mb-5">
              {contactTitle}
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
          <div>{legalLine}</div>
          <div className="flex gap-5">
            {legalLinks.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            ))}
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
