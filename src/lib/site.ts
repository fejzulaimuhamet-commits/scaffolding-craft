// Zentrale Daten & Helpers für die Wietek-Startseite
import { cld } from "@/lib/cloudinary";
import dachfanggeruestImg from "@/assets/dachfanggeruest.webp";
import wetterschutzImg from "@/assets/wetterschutzdach.webp";

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
  whatsappNumber: "491726666297",
  email: "info@wietek-geruestbau.de",
  hours: "Mo–Fr 7:00 – 17:00 Uhr",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  mapsUrl: "https://maps.app.goo.gl/Ls3SicbApiE5QeN66",
  rating: 4.9,
  ratingCount: 47,
} as const;

// === Cloudinary public_ids (Wietek Cloud: dcfg5yabi) ===
const CLD = {
  logoWhite: "Wietek-Logo-White_na1fdn",
  logoDark: "Wietek-Logo-Background_lky7rc",
  homeLogo: "home-logo_j3zjrb",

  heroBg: "facade-scaffolding-background-image_vxdefd",

  fassade1: "facade-scaffolding-1_o5p03l",
  innen1: "interior-scaffolding-1_lahusd",
  innen2: "interior-scaffolding-2_l1jwp9",
  innenBg: "interior-scaffolding-background-photo_qoqamc",
  treppe: "stairtowers-background-img_qpyrxq",
  schutz: "safetyrailings-background-image_wxvm1c",

  aboutBg: "aboutus-background-image_xwtlub",
  aboutImg1: "aboutus-img1_zxagjj",
  aboutImg2: "aboutus-img2_actp91",

  contact: "contact-img_bblko1",
  impressum: "impressum-img_gugzfx",

  career1: "wietek-career1_rh0cqj",
  career2: "wietek-career_voxhi5",

  project1: "projects-img-1_udmjzs",
  project2: "projects-img-2_rpi1s6",
  project3: "projects-img-3_xhjo9f",
} as const;

// 59 Projekt-Slideshow-Bilder (1..59 mit Cloudinary-Suffixen)
const SLIDE_IDS = [
  "1_vginsn", "2_usy2hb", "3_zll3tf", "4_ikehik", "5_zpje6p",
  "6_ao4tu0", "7_tub83c", "8_na07jf", "9_ixmwpi", "10_jyg4qx",
  "11_wsddnj", "12_nhq9it", "13_znvynk", "14_bwep8u", "15_dgxjzb",
  "16_koefhl", "17_n4imqy", "18_dl8t5x", "19_zhxxks", "20_h824e5",
  "21_douus7", "22_gtjjhl", "23_nwqp9w", "24_r3g2yv", "25_icwo2o",
  "26_qjlgwp", "27_tzq1b6", "28_cr2n6c", "29_szxfeh", "30_zafsvn",
  "31_hxtctn", "32_vshl87", "33_nppdtt", "34_mrp6bh", "35_cbfgki",
  "36_py7ptq", "37_sotzqd", "38_qykj7h", "39_rrhnd7", "40_ptehw5",
  "41_bw6se9", "42_clgleh", "43_dz9yri", "44_hmogeg", "45_upll60",
  "46_fjupvp", "47_l1ghbt", "48_ck6ola", "49_v7dthc", "50_ynopaf",
  "51_vasutd", "52_itoit4", "53_zijcvl", "54_jvufgk", "55_yijbyh",
  "56_decpth", "57_y406gr", "58_vkxkoz", "59_fbqvzy",
];

export const ASSETS = {
  logo: cld(CLD.logoWhite, 400),
  logoWhite: cld(CLD.logoWhite, 400),
  logoBg: cld(CLD.logoDark, 400),
  hero: cld(CLD.heroBg, 1920),
  about: cld(CLD.aboutImg1, 1200),
  contact: cld(CLD.contact, 1200),
  slide: (n: number) => {
    const id = SLIDE_IDS[(Math.max(1, n) - 1) % SLIDE_IDS.length];
    return cld(id, 1600);
  },
  placeholder: {
    fassade: cld(CLD.fassade1, 1600),
    innen: cld(CLD.innen1, 1600),
    treppe: cld(CLD.treppe, 1600),
    dach: dachfanggeruestImg,
    schutz: cld(CLD.schutz, 1600),
    wetter: cld(CLD.innenBg, 1600), // kein dediziertes Wetterschutz-Bild → Innen-BG
  },
  projects: [
    cld(CLD.project1, 1600),
    cld(CLD.project2, 1600),
    cld(CLD.project3, 1600),
  ],
  // Zusätzliche, direkt erreichbare Bilder
  aboutImg2: cld(CLD.aboutImg2, 1200),
  aboutBg: cld(CLD.aboutBg, 1920),
  career1: cld(CLD.career1, 1600),
  career2: cld(CLD.career2, 1600),
  impressum: cld(CLD.impressum, 1200),
  innen2: cld(CLD.innen2, 1600),
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
