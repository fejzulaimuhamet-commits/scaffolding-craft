import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { waLink } from "@/lib/site";
import { useCompany } from "@/hooks/useCompany";
import { useHomepage } from "@/hooks/useSanity";

export const Contact = () => {
  const COMPANY = useCompany();
  const { data: hp } = useHomepage();
  const mapQuery = encodeURIComponent(`${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`);
  const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const mapOpen = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const eyebrow = hp?.contactEyebrow ?? "Kontakt";
  const title = hp?.contactTitle ?? "Direkt mit dem Team sprechen.";
  const intro = hp?.contactIntro ?? "Lieber direkt anrufen oder schreiben? Wir sind erreichbar – persönlich, schnell und ohne Warteschleife.";
  const ctaWa = hp?.contactCtaWhatsapp ?? "Per WhatsApp schreiben";
  const ctaCall = hp?.contactCtaCall ?? "Jetzt anrufen";

  return (
    <section id="kontakt" className="py-20 lg:py-28 bg-white">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              {title}
            </h2>
            <p className="mt-5 text-concrete">{intro}</p>

            <div className="mt-8 space-y-5">
              <ContactRow icon={MapPin} title="Adresse">
                {COMPANY.street}
                <br />
                {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
              </ContactRow>
              <ContactRow icon={Phone} title="Telefon">
                <a href={`tel:${COMPANY.phonePrimary}`} className="hover:text-primary">
                  {COMPANY.phonePrimaryDisplay}
                </a>
                <br />
                <a href={`tel:${COMPANY.phoneMobile}`} className="hover:text-primary">
                  {COMPANY.phoneMobileDisplay} (mobil / WhatsApp)
                </a>
              </ContactRow>
              <ContactRow icon={Mail} title="E-Mail">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">
                  {COMPANY.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock} title="Öffnungszeiten">
                {COMPANY.hours}
              </ContactRow>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {ctaWa}
              </a>
              <a href={`tel:${COMPANY.phonePrimary}`} className="btn-ghost-dark">
                {ctaCall}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] border border-border bg-white">
              <iframe
                title={`${COMPANY.name} – Standort auf Google Maps`}
                src={mapEmbed}
                className="block w-full h-[300px] lg:h-[450px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={mapOpen}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" /> In Google Maps öffnen
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <span className="grid h-11 w-11 place-items-center bg-plaster text-primary shrink-0">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <div className="font-display font-extrabold text-steel text-sm uppercase tracking-wider">
        {title}
      </div>
      <div className="mt-1 text-concrete">{children}</div>
    </div>
  </div>
);
