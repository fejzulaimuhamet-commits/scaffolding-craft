
# Kunden-CMS einrichten: Sanity für Inhalte, Code für Struktur

## Ziel
- Kunde editiert nur Texte und Bilder über `https://wietek-geruestbau.sanity.studio`
- Header, Footer, Layout, Navigation bleiben im Code (nur du in Lovable)
- Was du in Lovable änderst → Publish → live
- Was der Kunde in Sanity ändert → sofort live, kein Deploy

## Umsetzung

### 1. Sanity-Anbindung aus Header & Footer entfernen
- `src/components/sections/Header.tsx`: `useNavigation`/`useSettings`-Hooks raus, Menüpunkte und Logo fest im Code
- `src/components/sections/Footer.tsx`: `useSettings`/`useNavigation`-Hooks raus, alle Links/Texte fest im Code
- Telefonnummer im Header/Footer wird aus einer zentralen Konstante in `src/lib/site.ts` gezogen (du änderst sie an einer Stelle)

### 2. Sanity-Daten einmalig befüllen
- Skript `scripts/seed-sanity.ts` erweitern, sodass es alle aktuellen Live-Texte/Bilder nach Sanity übernimmt
- Felder: Hero (inkl. „Familiengeführt seit 2014"), Stats, Services, Industries, Process, ServiceArea, FAQ, Testimonials, Projects, Contact, About-Page, Karriere, Leistungs-Detailseiten
- Skript einmalig ausführen mit `SANITY_TOKEN` (ist als Secret vorhanden)

### 3. Hardcoded-Fallbacks aus redaktionellen Sektionen entfernen
Damit Sanity die alleinige Quelle ist und der Kunde direkt sieht, was live geht:
- Hero, About, Services, Stats, Industries, Process, ServiceArea, FAQ, Testimonials, Projects, Contact
- Pages: UeberUns, Karriere, Projekte, Leistungen, alle 6 Leistungs-Detailseiten
- Loading-State zeigen während Sanity lädt (kurz)
- Header/Footer behalten ihre Code-Werte (kein Sanity mehr)

### 4. Sanity-Studio aufräumen für den Kunden
- `src/sanity/structure.ts`: Navigation und Settings (außer Kontaktdaten) ausblenden
- Sichtbar im Studio:
  - 🏠 Homepage
  - 📄 Über uns
  - 🛠 Leistungen
  - 📁 Projekte
  - ⭐ Bewertungen
  - 💼 Stellen
  - 📰 Blog
  - 📞 Kontaktdaten
- Deutsche Labels und Hilfetexte in allen Schemas
- Bild-Hotspots aktivieren (Kunde wählt Bildausschnitt)
- Pflichtfeld-Validierungen, damit der Kunde nicht versehentlich Felder leert

### 5. Studio-Hosting auf `wietek-geruestbau.sanity.studio`
- Studio nach Sanity deployen via `npx sanity deploy` (wird einmalig konfiguriert)
- Hostname: `wietek-geruestbau`
- Studio-Branding: Titel „Wietek Gerüstbau – Redaktion", eigenes Logo
- CORS-Origin in Sanity hinzufügen für `https://wietek-geruestbau.sanity.studio`
- Visual Editing weiterhin aktiv: Live-Vorschau im Studio zeigt `https://scaffolding-craft.lovable.app`

### 6. Inkonsistenz fixen
Aktueller Bug: Hero-Badge in Sanity steht noch auf `"4,5 ★ Google · Familiengeführt seit 2014"` → wird beim Seed auf `"Familiengeführt seit 2014"` korrigiert

## Was nach der Umsetzung passiert

**Du in Lovable:**
- Header, Footer, Navigation, Layout, Farben, Animationen
- Telefonnummer/Adresse falls Header/Footer geändert werden müssen
- Publish → live

**Kunde in `wietek-geruestbau.sanity.studio`:**
- Klickt links auf Bereich (Homepage, Über uns, Projekte, …)
- Live-Vorschau rechts → klickt im Vorschaubild auf Text → bearbeitet → speichert → publiziert → sofort live
- Bilder per Drag & Drop tauschen
- Neue Projekte, Bewertungen, Stellenanzeigen anlegen

## Was du nach meiner Umsetzung noch manuell machen musst
1. **Studio-Deploy** auf `wietek-geruestbau.sanity.studio`: einmalig im Terminal `npx sanity deploy` ausführen und Hostname `wietek-geruestbau` eingeben (kann ich nicht für dich machen, weil du in deinem Sanity-Account eingeloggt sein musst)
2. **Kunde einladen**: `sanity.io/manage` → Project → Members → E-Mail eingeben → Rolle **Editor** wählen
3. Optional: Custom Domain + Lovable-Badge ausblenden (Pro-Plan), damit auch die Hauptseite white-label ist

## Reihenfolge
1. Header/Footer von Sanity lösen
2. Studio-Struktur aufräumen + deutsche Labels
3. Seed-Skript erweitern und ausführen → Sanity ist befüllt
4. Hardcoded-Fallbacks aus Sektionen entfernen
5. Studio-Branding setzen (Titel, Logo)
6. Anleitung für Studio-Deploy + Kunden-Einladung am Ende der Implementierung

Geschätzte Dauer: ein Build-Lauf, ich gehe sofort los nach deiner Freigabe.
