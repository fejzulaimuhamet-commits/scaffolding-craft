// Zentrale Daten & Helpers für die Wietek-Startseite

export const COMPANY = {
  name: "Wietek Gerüstbau",
  shortName: "Wietek",
  founded: 2014,
  street: "Randersweide 91",
  zip: "21037",
  city: "Hamburg",
  district: "Bergedorf",
  phonePrimary: "+49 40 73091804",
  phonePrimaryDisplay: "040 73091804",
  phoneMobile: "+49 172 6666297",
  phoneMobileDisplay: "0172 6666297",
  whatsappNumber: "491726666297", // ohne + und Leerzeichen
  email: "info@wietek-geruestbau.de",
  hours: "Mo–Fr 7:00 – 17:00 Uhr",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  mapsUrl: "https://maps.app.goo.gl/Ls3SicbApiE5QeN66",
  rating: 4.9,
  ratingCount: 47,
} as const;

// Temporäre Unsplash-Platzhalter (echte Wietek-Fotos werden später eingesetzt).
const PLACEHOLDER = {
  fassade:    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
  innen:      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
  treppe:     "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800",
  dach:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  schutz:     "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
  wetter:     "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  hero:       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920",
  team:       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
} as const;

// Galerie-Rotation für Slideshow / Projekte
const GALLERY = [
  PLACEHOLDER.fassade,
  PLACEHOLDER.innen,
  PLACEHOLDER.treppe,
  PLACEHOLDER.dach,
  PLACEHOLDER.schutz,
  PLACEHOLDER.wetter,
  PLACEHOLDER.team,
];

// Inline-SVG Logos (CORS-frei) als Fallback bis echte Assets verfügbar sind.
const logoSvg = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 60'><text x='0' y='44' font-family='Manrope,Arial,sans-serif' font-weight='800' font-size='40' fill='${color}'>WIETEK</text><rect x='178' y='12' width='34' height='34' fill='%23D7263D'/></svg>`
  )}`;

export const ASSETS = {
  logo: logoSvg("#1F2937"),
  logoWhite: logoSvg("#FFFFFF"),
  logoBg: logoSvg("#1F2937"),
  hero: PLACEHOLDER.hero,
  slide: (n: number) => GALLERY[(Math.max(1, n) - 1) % GALLERY.length],
  about: PLACEHOLDER.team,
  contact: PLACEHOLDER.team,
  placeholder: PLACEHOLDER,
  projects: [PLACEHOLDER.fassade, PLACEHOLDER.dach, PLACEHOLDER.innen],
};

export const NAV = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Karriere", href: "/karriere" },
  { label: "Kontakt", href: "/kontakt" },
];

export const waLink = (msg = "Hallo Wietek-Team, ich interessiere mich für ein Gerüst.") =>
  `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`;
