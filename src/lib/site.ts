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

const IMG = "https://wietek-geruestbau.de/assets/img";
export const ASSETS = {
  logo: `${IMG}/Wietek-Logo.png`,
  logoWhite: `${IMG}/Wietek-Logo-White.png`,
  logoBg: `${IMG}/Wietek-Logo-Background.png`,
  hero: `${IMG}/project-images-slideshow/1.webp`,
  // 1..59 Slideshow-Bilder vorhanden
  slide: (n: number) => `${IMG}/project-images-slideshow/${n}.webp`,
  about: `${IMG}/project-images-slideshow/4.webp`,
  contact: `${IMG}/contact-img.png`,
  projects: [
    `${IMG}/projects-img-1.jpg`,
    `${IMG}/projects-img-2.jpg`,
    `${IMG}/projects-img-3.jpg`,
  ],
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
