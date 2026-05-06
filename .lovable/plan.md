# Mehr Sanity-Edit-Optionen für die ganze Seite

Aktuell sind nur Hero, Stats, Process, About-Headline/Stats und Footer-Tagline editierbar (~10%). Wir machen praktisch alle sichtbaren Texte und Listen über Sanity Studio editierbar.

## Was neu editierbar wird

**Homepage-Sektionen** (erweitert in `homepage`-Schema):
- Services-Sektion: Eyebrow, Titel, Intro-Text + 6 Service-Cards (Tag, Titel, Beschreibung, Bild) – ersetzt Hardcode in `Services.tsx`
- Industries-Sektion: Eyebrow, Titel, Intro + 4 Branchen-Cards (Icon-Auswahl, Titel, Beschreibung)
- Testimonials-Sektion: Eyebrow + Titel (Items kommen schon aus `testimonial`-Schema)
- FAQ-Sektion: Eyebrow, Titel, Intro + Q/A-Liste (statt Hardcode in `FAQ.tsx`)
- Contact-Sektion: Eyebrow, Titel, Intro
- ServiceArea-Sektion: Eyebrow, Titel, Intro + Städte-Liste

**Header / Navigation** (neues `navigation`-Schema):
- Mega-Menü-CTA (Titel + Subtitle)
- Service-Einträge im Dropdown (Label, Beschreibung, Link)
- Top-Bar-Texte

**Footer** (erweitert in `settings`-Schema):
- CTA-Strip: Eyebrow, Headline, Button-Text
- Footer-Spalten "Leistungen" und "Standorte" (Label + Link Listen)
- Footer-Kontakt-Überschrift, Social-Links
- Legal-Links (Impressum, Datenschutz, AGB)
- Copyright-Hinweis

**Globale Firmendaten** (`settings`-Schema bereits vorhanden, anbinden):
- `useCompany()` lädt zusätzlich aus Sanity-Settings: Telefon, Mobil, E-Mail, Adresse, Öffnungszeiten, Social-URLs, Gründungsjahr → so editiert man Adresse/Telefonnummer einmal und es wirkt überall (Header, Footer, Contact).

**Unterseiten** (neue Schemas bzw. erweitert):
- Leistungen-Übersicht (`/leistungen`): Hero, Intro
- Service-Detailseiten: bereits über `service`-Schema möglich, Page-Hero-Felder ergänzen (Hero-Eyebrow, Sub-Headline)
- Über-Uns-Seite: `values` und `certifications` werden im UI angebunden (sind im Schema, werden aber noch nicht gerendert)
- Karriere-Seite: Hero + Intro über neues `careerPage`-Schema, Jobs aus `career`
- Kontakt-Seite: gleiche Felder wie Contact-Sektion
- Projekte-Seite: Hero + Intro über `projectsPage`-Schema

## Vorgehen / Technische Details

1. **Schemas erweitern** in `src/sanity/schemas/`:
   - `homepage.ts`: Felder für Services-Block, Industries-Block, FAQ-Block, Contact-Block, ServiceArea-Block, Testimonials-Headline
   - `settings.ts`: Footer-CTA, Footer-Spalten, Legal-Links, Social-Links, Top-Bar
   - Neu: `navigation.ts`, `leistungenPage.ts`, `careerPage.ts`, `kontaktPage.ts`, `projektePage.ts`
   - Schemas in `schemas/index.ts` registrieren

2. **GROQ-Queries erweitern** in `src/lib/queries.ts` und Typen in `sanityTypes.ts`.

3. **Hooks** in `src/hooks/useSanity.ts` für neue Dokumente.

4. **Komponenten anpassen** – jeweils `useHomepage()`/`useSettings()` lesen, Hardcode als Fallback behalten (genau das Muster wie aktuell in Hero/Stats/Process):
   - `Services.tsx`, `Industries.tsx`, `FAQ.tsx`, `Contact.tsx`, `ServiceArea.tsx`, `Testimonials.tsx`, `Footer.tsx`, `Header.tsx`, `Leistungen.tsx`, `Karriere.tsx`, `Kontakt.tsx`, `Projekte.tsx`, `UeberUns.tsx`
   - `useCompany.ts`: Sanity-Settings mergen über lokalen Defaults

5. **Studio-Struktur** (`src/sanity/structure.ts`): klare Singletons gruppieren („Globale Einstellungen", „Seiten", „Sammlungen") für bessere Bedienbarkeit.

6. **Click-to-Edit Overlays**: Für jeden neuen Text das vorhandene Stega-Pattern verwenden (Strings direkt aus Sanity rendern, nicht in Variablen umkopieren) – so funktionieren die Bearbeiten-Klicks im Presentation-Modus automatisch.

7. **Seed-Skript** (`scripts/seed-sanity.ts`): Default-Werte für die neuen Felder ergänzen, damit nach dem Deploy nichts leer ist.

## Ergebnis

Nach Deploy + einmaligem Befüllen im Studio sind ~95 % aller sichtbaren Texte, Listen, Links, Bilder und Kontaktdaten ohne Code-Änderung über Sanity (inkl. Click-to-Edit) bearbeitbar. Hardcodiert bleiben nur strukturelle Defaults als Fallback und Layout-spezifische Icons.

## Ablauf

Wegen Umfang in zwei Schritten:
- **Phase 1** (dieser Auftrag): Homepage-Sektionen + Footer + globale Settings + Header-Mega-Menü
- **Phase 2** (separat, sag Bescheid wenn gewünscht): Unterseiten (Leistungen-, Karriere-, Kontakt-, Projekte-, Über-Uns-Page-Hero-Felder)

Soll ich Phase 1 jetzt umsetzen?
