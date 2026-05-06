import { PageLayout } from "@/components/PageLayout";
import { PageSeo } from "@/components/PageSeo";
import { COMPANY } from "@/lib/site";

const Datenschutz = () => {
  return (
    <PageLayout>
      <PageSeo
        title="Datenschutzerklärung – Wietek Gerüstbau Hamburg"
        description="Datenschutzerklärung der Wietek Gerüstbau gemäß DSGVO. Informationen zur Verarbeitung personenbezogener Daten."
        path="/datenschutz"
        breadcrumbs={[
          { name: "Startseite", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
        ]}
      />

      <article className="container mx-auto max-w-3xl px-4 py-12 prose prose-neutral dark:prose-invert">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          <br />
          {COMPANY.name}
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city}-{COMPANY.district}
          <br />
          Telefon: {COMPANY.phonePrimaryDisplay}
          <br />
          E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>

        <h2>2. Allgemeine Hinweise</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten
          ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, TDDDG). In dieser
          Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
          im Rahmen unserer Website.
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter automatisch Informationen
          erfasst und in sogenannten Server-Logfiles gespeichert: Browsertyp und -version, verwendetes
          Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage
          sowie IP-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          der technisch fehlerfreien Darstellung und Sicherheit der Website). Die Daten werden nach
          spätestens 30 Tagen gelöscht.
        </p>

        <h2>4. Kontaktaufnahme &amp; Anfrageformular</h2>
        <p>
          Wenn Sie uns per E-Mail, Telefon, WhatsApp oder über unser Anfrage-/Kontaktformular kontaktieren,
          werden Ihre Angaben (Name, Kontaktdaten, Projektdaten, Nachricht) zum Zweck der Bearbeitung
          Ihrer Anfrage und für den Fall von Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6 Abs.
          1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Beantwortung Ihrer Anfrage).
        </p>
        <p>
          Die per Formular übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern,
          Ihre Einwilligung widerrufen oder der Zweck der Speicherung entfällt. Zwingende gesetzliche
          Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
        </p>

        <h3>4.1 E-Mail-Versand über Resend</h3>
        <p>
          Für den Versand transaktionaler E-Mails (z. B. Anfragebestätigungen, Weiterleitung Ihrer
          Anfrage an uns) nutzen wir den Dienst <strong>Resend</strong> (Resend, Inc., 2261 Market
          Street #5039, San Francisco, CA 94114, USA). Hierbei werden Ihre E-Mail-Adresse, Ihr Name und
          der Inhalt Ihrer Nachricht an Resend übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f
          DSGVO. Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln und
          ggf. des EU-US Data Privacy Frameworks.
        </p>

        <h3>4.2 Speicherung in Supabase</h3>
        <p>
          Anfragen werden zusätzlich in unserer Datenbank bei <strong>Supabase</strong> (Supabase Inc.,
          970 Toa Payoh North #07-04, Singapur 318992) gespeichert, die in der EU (Frankfurt am Main,
          Deutschland) gehostet wird. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.
        </p>

        <h2>5. Hosting &amp; Auslieferung</h2>
        <p>
          Unsere Website wird auf Servern unseres Hosting-Dienstleisters bereitgestellt. Hierbei werden
          aus technischen Gründen IP-Adresse und Aufrufdaten verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1
          lit. f DSGVO.
        </p>

        <h2>6. Bilder &amp; Medien (Cloudinary)</h2>
        <p>
          Wir nutzen den Dienst <strong>Cloudinary</strong> (Cloudinary Ltd., 3400 Central Expressway,
          Suite 110, Santa Clara, CA 95051, USA) zur Auslieferung und Optimierung von Bildern. Beim
          Aufruf einer Seite mit eingebetteten Bildern wird Ihre IP-Adresse an Cloudinary übermittelt,
          damit die Bilder an Ihren Browser ausgeliefert werden können. Rechtsgrundlage: Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an einer schnellen, performanten Website). Die
          Übermittlung in die USA erfolgt auf Basis der EU-Standardvertragsklauseln.
        </p>

        <h2>7. Inhalte aus dem CMS (Sanity)</h2>
        <p>
          Inhalte (Texte, Bildreferenzen) unserer Website werden teilweise über das Headless-CMS{" "}
          <strong>Sanity</strong> (Sanity.io, Tordenskiolds gate 2, 0160 Oslo, Norwegen) bereitgestellt.
          Beim Abruf von Inhalten wird Ihre IP-Adresse an Sanity übermittelt. Rechtsgrundlage: Art. 6
          Abs. 1 lit. f DSGVO. Norwegen wird durch einen Angemessenheitsbeschluss der EU-Kommission als
          datenschutzrechtlich sicheres Drittland eingestuft.
        </p>

        <h2>8. Webanalyse / Google Analytics</h2>
        <p>
          Sofern wir auf unserer Website Google Analytics einsetzen (Google Ireland Limited, Gordon
          House, Barrow Street, Dublin 4, Irland), erfolgt der Einsatz nur nach Ihrer ausdrücklichen
          Einwilligung gemäß § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre
          Einwilligung jederzeit über unseren Cookie-Banner widerrufen. Google Analytics verwendet
          Cookies und ähnliche Technologien zur Analyse Ihres Nutzungsverhaltens. Die IP-Adresse wird
          gekürzt verarbeitet (IP-Anonymisierung).
        </p>

        <h2>9. Cookies</h2>
        <p>
          Unsere Website verwendet technisch notwendige Cookies, ohne die ein Betrieb der Seite nicht
          möglich wäre (Rechtsgrundlage: § 25 Abs. 2 TDDDG, Art. 6 Abs. 1 lit. f DSGVO). Optionale
          Cookies (z. B. für Analyse oder Marketing) werden nur mit Ihrer Einwilligung gesetzt
          (Rechtsgrundlage: § 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
        </p>

        <h2>10. Soziale Medien (Instagram, Facebook, WhatsApp)</h2>
        <p>
          Unsere Website enthält Verlinkungen zu unseren Profilen in sozialen Netzwerken sowie einen
          WhatsApp-Kontakt-Button. Erst beim Klick auf einen entsprechenden Link werden Daten an die
          Anbieter übermittelt (Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h2>11. Ihre Rechte</h2>
        <p>Sie haben jederzeit folgende Rechte:</p>
        <ul>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
          <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>

        <h2>12. Zuständige Aufsichtsbehörde</h2>
        <p>
          Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
          <br />
          Ludwig-Erhard-Straße 22, 7. OG, 20459 Hamburg
          <br />
          <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">
            datenschutz-hamburg.de
          </a>
        </p>

        <h2>13. Aktualität dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung wird bei Bedarf an geänderte Rechtslage oder bei Änderungen unserer
          Dienste angepasst. Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}.
        </p>
      </article>
    </PageLayout>
  );
};

export default Datenschutz;
