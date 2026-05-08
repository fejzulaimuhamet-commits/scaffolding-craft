import { PageLayout } from "@/components/PageLayout";
import { PageSeo } from "@/components/PageSeo";
import { PageHero } from "@/components/shared/PageHero";
import { ASSETS, COMPANY } from "@/lib/site";
import { Building2, Phone, Mail, FileText, Scale, ShieldCheck, Link2, Copyright } from "lucide-react";
import { Card } from "@/components/ui/card";

const Impressum = () => {
  return (
    <PageLayout>
      <PageSeo
        title="Impressum – Wietek Gerüstbau Hamburg"
        description="Impressum und Anbieterkennzeichnung der Wietek Gerüstbau, Inhaber Avndi Bedzeti, Randersweide 91, 21037 Hamburg-Bergedorf."
        path="/impressum"
        breadcrumbs={[
          { name: "Startseite", path: "/" },
          { name: "Impressum", path: "/impressum" },
        ]}
        noindex={false}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://wietek-geruestbau.de/#organization",
            name: COMPANY.name,
            url: "https://wietek-geruestbau.de/",
            email: COMPANY.email,
            telephone: COMPANY.phonePrimary,
            logo: ASSETS.logoWhite,
            image: ASSETS.hero,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.street,
              postalCode: COMPANY.zip,
              addressLocality: `${COMPANY.city}-${COMPANY.district}`,
              addressRegion: "HH",
              addressCountry: "DE",
            },
          },
        ]}
      />

      <PageHero
        title="Impressum"
        eyebrow="Anbieterkennzeichnung"
        subtitle="Transparenz nach § 5 TMG – alle gesetzlichen Angaben zu Wietek Gerüstbau auf einen Blick."
        backgroundImage={ASSETS.impressum}
        breadcrumb="Impressum"
      />

      <section className="container-w py-16 lg:py-24">
        {/* Top Cards: Anbieter + Kontakt */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-7 border-l-4 border-l-primary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-11 w-11 place-items-center rounded-sm bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-display font-extrabold uppercase tracking-wider text-lg text-foreground">
                Angaben gemäß § 5 TMG
              </h2>
            </div>
            <div className="text-foreground/85 leading-relaxed">
              <div className="font-semibold text-foreground">{COMPANY.name}</div>
              <div>Avndi Bedzeti</div>
              <div className="text-muted-foreground text-sm">Inhaber</div>
              <div className="mt-3">
                {COMPANY.street}
                <br />
                {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
                <br />
                Deutschland
              </div>
            </div>
          </Card>

          <Card className="p-7 border-l-4 border-l-primary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-11 w-11 place-items-center rounded-sm bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="font-display font-extrabold uppercase tracking-wider text-lg text-foreground">
                Kontakt
              </h2>
            </div>
            <ul className="space-y-3 text-foreground/85">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`tel:${COMPANY.phonePrimary}`}
                  className="hover:text-primary transition-colors"
                >
                  {COMPANY.phonePrimaryDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </Card>
        </div>

        {/* Umsatzsteuer-ID Highlight */}
        <Card className="p-7 mb-12 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-sm bg-primary text-primary-foreground shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold uppercase tracking-wider text-lg text-foreground mb-2">
                Umsatzsteuer-ID
              </h2>
              <p className="text-sm text-muted-foreground mb-1">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="font-display font-extrabold text-xl text-primary tracking-wide">
                DE451445310
              </p>
            </div>
          </div>
        </Card>

        {/* Rechtliche Hinweise */}
        <div className="grid lg:grid-cols-2 gap-6">
          <LegalBlock
            icon={<Scale className="h-5 w-5" />}
            title="Verbraucherstreitbeilegung"
          >
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalBlock>

          <LegalBlock
            icon={<ShieldCheck className="h-5 w-5" />}
            title="EU-Streitschlichtung"
          >
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </LegalBlock>

          <LegalBlock
            icon={<FileText className="h-5 w-5" />}
            title="Haftung für Inhalte"
          >
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </LegalBlock>

          <LegalBlock icon={<Link2 className="h-5 w-5" />} title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </LegalBlock>

          <LegalBlock
            icon={<Copyright className="h-5 w-5" />}
            title="Urheberrecht"
            className="lg:col-span-2"
          >
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </LegalBlock>
        </div>

        <p className="mt-12 text-xs text-muted-foreground text-center">
          Quelle: eRecht24
        </p>
      </section>
    </PageLayout>
  );
};

const LegalBlock = ({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={`p-7 hover:shadow-md transition-shadow ${className}`}>
    <div className="flex items-center gap-3 mb-3">
      <div className="grid h-10 w-10 place-items-center rounded-sm bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display font-extrabold uppercase tracking-wider text-base text-foreground">
        {title}
      </h3>
    </div>
    <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
  </Card>
);

export default Impressum;
