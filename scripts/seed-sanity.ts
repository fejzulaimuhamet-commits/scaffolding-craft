/**
 * Seed Sanity singletons (homepage, about, settings) with current copy.
 * Run once: bun run scripts/seed-sanity.ts
 * Idempotent — uses createOrReplace with fixed _ids.
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Missing SANITY_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: "d683vf4r",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const homepage = {
  _id: "homepage",
  _type: "homepage",
  heroBadge: "5,0 ★ Google · Familiengeführt seit 2014",
  heroTitle: "Gerüstbau in Hamburg – sicher, pünktlich, ab 24 Std. einsatzbereit.",
  heroSubtitle:
    "Familiengeführter Gerüstbau aus Hamburg-Bergedorf. Wir liefern, montieren und demontieren Gerüste für Privathaushalte, Handwerker und Industrie – schnell, sauber und mit echtem Wort.",
  heroUsps: [
    "Aufbau in 24–72 Stunden",
    "Familienunternehmen seit 2014",
    "Vollständig versichert & geprüft",
    "Festpreis-Garantie ohne Überraschungen",
  ],
  heroCtaPrimary: "Kostenloses Angebot in 60 Sek.",
  heroCtaSecondary: "Projekte ansehen",
  counterProjects: 500,
  counterYears: 11,
  counterSquareMeters: 50000,
  statsItems: [
    { _key: "s1", value: "11+", label: "Jahre Erfahrung" },
    { _key: "s2", value: "500+", label: "Abgeschlossene Projekte" },
    { _key: "s3", value: "50.000+", label: "m² Gerüst gebaut" },
  ],
  processSteps: [
    { _key: "p1", title: "Anfrage stellen", description: "Beschreiben Sie Ihr Vorhaben in 60 Sekunden – online, telefonisch oder per WhatsApp." },
    { _key: "p2", title: "Aufmaß vor Ort", description: "Wir kommen kostenlos vorbei, messen auf und erstellen ein verbindliches Angebot." },
    { _key: "p3", title: "Aufbau in 24–72 h", description: "Pünktliche Anlieferung und sauberer Aufbau durch unser eingespieltes Team." },
    { _key: "p4", title: "Abbau & Abrechnung", description: "Nach Projektende bauen wir zuverlässig ab und rechnen transparent ab." },
  ],
};

const about = {
  _id: "about",
  _type: "about",
  headline: "Familiengeführt. Verwurzelt in Hamburg. Seit 2014.",
  intro:
    "Wir packen seit über zehn Jahren mit eigenem Team und eigenem Material an – von Bergedorf bis Stade. Kein Subunternehmer, keine Ausreden. Wenn wir „morgen früh\" sagen, stehen wir morgen früh auf der Baustelle.",
  stats: [
    { _key: "a1", value: "10+", label: "Jahre" },
    { _key: "a2", value: "500+", label: "Projekte" },
    { _key: "a3", value: "", label: "Familiengeführt" },
  ],
};

const settings = {
  _id: "settings",
  _type: "settings",
  phone: "+49 40 123 456 78",
  whatsapp: "+49 151 1234 5678",
  email: "info@wietek-geruestbau.de",
  address: "Bergedorfer Straße 1, 21029 Hamburg",
  openingHours: "Mo–Fr 7:00–18:00",
  googleRating: 5,
  footerTagline:
    "Familiengeführter Gerüstbau aus Hamburg-Bergedorf. Sicher, pünktlich und persönlich – seit 2014.",
  footerLegal: `© ${new Date().getFullYear()} Wietek Gerüstbau. Alle Rechte vorbehalten.`,
  serviceArea: "Hamburg & Umland",
};

async function run() {
  const docs = [homepage, about, settings];
  for (const doc of docs) {
    // Only set fields if document doesn't yet have them — never overwrite editor changes.
    const existing = await client.getDocument(doc._id);
    if (existing) {
      const patch: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(doc)) {
        if (k.startsWith("_")) continue;
        if (existing[k] === undefined || existing[k] === null) patch[k] = v;
      }
      if (Object.keys(patch).length === 0) {
        console.log(`✓ ${doc._id}: already populated, skipped`);
        continue;
      }
      await client.patch(doc._id).set(patch).commit();
      console.log(`✓ ${doc._id}: patched fields`, Object.keys(patch));
    } else {
      await client.createOrReplace(doc);
      console.log(`✓ ${doc._id}: created`);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
