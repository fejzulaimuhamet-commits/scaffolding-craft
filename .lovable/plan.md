## Cloudinary-Integration – alle Assets gefunden ✅

Cloud: `dcfg5yabi`. Assets liegen im **Root**, nicht im Ordner `Wietek/` – Basis-URL ist also `https://res.cloudinary.com/dcfg5yabi/image/upload/`.

## Mapping (exakte public_ids)

| Verwendung | public_id |
|---|---|
| Logo (Header, weiß) | `Wietek-Logo-White_na1fdn` |
| Logo dunkel/Background | `Wietek-Logo-Background_lky7rc` |
| Hero-Background | `facade-scaffolding-background-image_vxdefd` |
| Service: Fassadengerüst | `facade-scaffolding-1_o5p03l` |
| Service: Innengerüst | `interior-scaffolding-1_lahusd`, `interior-scaffolding-2_l1jwp9` |
| Service: Innen-BG | `interior-scaffolding-background-photo_qoqamc` |
| Service: Treppenturm | `stairtowers-background-img_qpyrxq` |
| Service: Schutznetze/Geländer | `safetyrailings-background-image_wxvm1c` |
| About-Section BG | `aboutus-background-image_xwtlub` |
| About Bild 1 / 2 | `aboutus-img1_zxagjj`, `aboutus-img2_actp91` |
| Kontakt | `contact-img_bblko1` |
| Karriere | `wietek-career1_rh0cqj`, `wietek-career_voxhi5` |
| Impressum | `impressum-img_gugzfx` |
| Projekte (3 Hauptbilder) | `projects-img-1_udmjzs`, `projects-img-2_rpi1s6`, `projects-img-3_xhjo9f` |
| Projekte-Galerie (Slides) | `1_vginsn` … `59_fbqvzy` (webp, 59 Stück) |
| Flag DE | `flag-de_bxmjwd` |

## Umsetzung

### 1. `src/lib/cloudinary.ts` (neu)
Helper mit `f_auto,q_auto` und optionaler Breite:
```ts
const CLOUD = "dcfg5yabi";
export const cld = (id: string, w?: number) => {
  const t = ["f_auto", "q_auto"];
  if (w) t.push(`w_${w}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t.join(",")}/${id}`;
};
```

### 2. `src/lib/site.ts` – komplett umstellen
- Unsplash-`PLACEHOLDER`-Block raus
- `CLD` Map mit allen public_ids oben einfügen
- `ASSETS.logo/logoWhite/logoBg/hero/about/contact` über `cld(...)` befüllen
- `ASSETS.slide(n)` → liest aus dem Array `[1_vginsn, 2_usy2hb, …, 59_fbqvzy]` (alle 59 webp-Slides), modulo
- `ASSETS.projects` → `[projects-img-1, -2, -3]`
- `ASSETS.placeholder.fassade/innen/treppe/dach/schutz/wetter` → entsprechende Cloudinary-IDs
- Lokale Imports `@/assets/wietek-logo-white.png` und `@/assets/hero-facade.jpg` entfernen

### 3. Komponenten-Touchpoints (nur dort wo zusätzliche Bilder rein sollen)
- `Services.tsx`: Bilder pro Service-Card aus neuer `ASSETS.placeholder.*`
- `Projects.tsx`: Fallback-Liste = `ASSETS.projects`
- `UeberUns.tsx`: zusätzlich `aboutus-img1/img2` einbinden, falls noch Platzhalter vorhanden
- `Karriere.tsx`: Hero-Bild `wietek-career1`, Mitarbeiterzitat-Bild `wietek-career_voxhi5`
- `Kontakt.tsx`: `contact-img`
- Service-Detailseiten: jeweiliges Hero-Bild über `ASSETS.placeholder.<key>`

### 4. Cleanup
- `src/assets/wietek-logo-white.png` löschen
- `src/assets/hero-facade.jpg` löschen
- Hero.tsx-Fallback bleibt `ASSETS.hero` (jetzt Cloudinary)

### 5. Sanity-Overlay bleibt unangetastet
Wenn in Sanity ein Bild gepflegt ist, wird es weiterhin via `imageUrl(...)` bevorzugt. Cloudinary ist nur der neue Default.

### 6. Verifikation
Nach Umsetzung Console + Network-Tab auf 404 prüfen.

## Was passiert nach Genehmigung
Ich setze alles in einem Rutsch um: Helper anlegen → `site.ts` umbauen → Komponenten-Bilder zuweisen → alte Asset-Dateien löschen → Smoke-Test.
