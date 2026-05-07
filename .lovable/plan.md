## Ziel
Das hochgeladene Foto (Gerüst mit weißer Wetterschutz-Überdachung) als neues Bild für „Wetterschutzdach" einsetzen — überall dort, wo aktuell `ASSETS.placeholder.wetter` (= `CLD.innenBg`, ein Innengerüst-Platzhalter) verwendet wird.

## Schritte

1. **Bild ins Projekt kopieren**
   - `user-uploads://hf_20260507_161844_...png` → `src/assets/wetterschutzdach.webp` (als `.webp` gespeichert für konsistente Asset-Konvention; identisch zum Vorgehen bei `dachfanggeruest.webp`).

2. **`src/lib/site.ts` anpassen**
   - Neuen Import ergänzen: `import wetterschutzImg from "@/assets/wetterschutzdach.webp";`
   - In `ASSETS.placeholder` ändern:
     `wetter: cld(CLD.innenBg, 1600)` → `wetter: wetterschutzImg`
   - Damit greift das neue Bild automatisch an allen Stellen, die `ASSETS.placeholder.wetter` referenzieren.

## Betroffene Stellen (automatisch durch zentrale Variable)
- **Startseite** – `Services.tsx`-Karte „Wetterschutzdach"
- **Unterseite** `/leistungen/wetterschutz` – Hero-Hintergrund **und** Intro-Bild

## Hinweis
Falls im Sanity Studio später ein eigenes Bild für den Service `wetterschutz` gepflegt wird, hat dieses Vorrang (Sanity-Daten überschreiben den lokalen Fallback). Das ist gewünschtes Verhalten — der hier gesetzte Wert dient als Default/Fallback.
