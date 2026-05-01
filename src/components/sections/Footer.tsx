import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="bg-steel-deep text-white pt-16 pb-8 relative">
      {/* Hazard-Streifen oben */}
      <div className="hazard-stripe h-2 absolute inset-x-0 top-0" />

      <div className="container-w">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center bg-primary text-white font-display font-extrabold text-lg">
                W
              </span>
              <span className="font-display text-lg font-extrabold leading-none">
                WIETEK<span className="block text-[10px] font-bold tracking-[0.25em] text-primary mt-1">GERÜSTBAU</span>
              </span>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              Familiengeführter Gerüstbau aus {COMPANY.city}-{COMPANY.district}. Sicher, pünktlich
              und persönlich – seit {COMPANY.founded}.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="grid h-10 w-10 place-items-center bg-white/10 hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="grid h-10 w-10 place-items-center bg-white/10 hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <FooterCol title="Leistungen" items={[
            "Fassadengerüste",
            "Innengerüste",
            "Treppentürme",
            "Dachfanggerüste",
            "Schutznetze & Geländer",
            "Wetterschutzdach",
          ]} />

          <FooterCol title="Standorte" items={[
            "Gerüstbau Hamburg",
            "Gerüstbau Bergedorf",
            "Gerüstbau Harburg",
            "Gerüstbau Lüneburg",
            "Gerüstbau Norderstedt",
            "Gerüstbau Stade",
          ]} />

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
          <div>© {new Date().getFullYear()} {COMPANY.name}. Alle Rechte vorbehalten.</div>
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

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <div className="font-display font-extrabold uppercase tracking-wider text-sm mb-5">
      {title}
    </div>
    <ul className="space-y-2.5 text-sm text-white/70">
      {items.map((it) => (
        <li key={it}>
          <a href="#" className="hover:text-white transition-colors">
            {it}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
