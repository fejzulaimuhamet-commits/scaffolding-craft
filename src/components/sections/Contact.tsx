import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, waLink } from "@/lib/site";

const mapQuery = encodeURIComponent(
  `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`
);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
const mapOpen = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export const Contact = () => {
  return (
    <section id="kontakt" className="py-20 lg:py-28 bg-white">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">Kontakt</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-steel leading-tight">
              Direkt mit dem <span className="hand-underline">Team sprechen.</span>
            </h2>
            <p className="mt-5 text-concrete">
              Lieber direkt anrufen oder schreiben? Wir sind erreichbar – persönlich, schnell und
              ohne Warteschleife.
            </p>

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
                Per WhatsApp schreiben
              </a>
              <a href={`tel:${COMPANY.phonePrimary}`} className="btn-ghost-dark">
                Jetzt anrufen
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[4/3] bg-steel-deep overflow-hidden">
              <iframe
                title="Standort Wietek Gerüstbau Hamburg"
                src="https://www.openstreetmap.org/export/embed.html?bbox=10.18,53.48,10.24,53.51&layer=mapnik&marker=53.4936,10.2086"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
            <a
              href={COMPANY.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" /> Auf Google Maps öffnen
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
