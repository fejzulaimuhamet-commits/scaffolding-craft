import { PageLayout } from "@/components/PageLayout";
import { PageSeo } from "@/components/PageSeo";
import { COMPANY } from "@/lib/site";

const Impressum = () => {
  return (
    <PageLayout>
      <PageSeo
        title="Impressum – Wietek Gerüstbau Hamburg"
        description="Impressum und Anbieterkennzeichnung der Wietek Gerüstbau, Randersweide 91, 21037 Hamburg-Bergedorf."
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
            name: COMPANY.name,
            url: "https://wietek-geruestbau.de/",
            email: COMPANY.email,
            telephone: COMPANY.phonePrimary,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.street,
              postalCode: COMPANY.zip,
              addressLocality: `${COMPANY.city}-${COMPANY.district}`,
              addressCountry: "DE",
            },
          },
        ]}
      />

      <article className="container mx-auto max-w-3xl px-4 py-12 prose prose-neutral dark:prose-invert">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          {COMPANY.name}
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={`tel:${COMPANY.phonePrimary}`}>{COMPANY.phonePrimaryDisplay}</a>
          <br />
          Mobil: <a href={`tel:${COMPANY.phoneMobile}`}>{COMPANY.phoneMobileDisplay}</a>
          <br />
          E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>

        <h2>Vertreten durch</h2>
        <p>Geschäftsführung: Wietek</p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {COMPANY.name}
          <br />
          {COMPANY.street}, {COMPANY.zip} {COMPANY.city}
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
          haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
          Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </article>
    </PageLayout>
  );
};

export default Impressum;
