## Ziel

Single-Page-Site auf Multi-Page mit React Router umbauen. Startseite bleibt 100% unverändert. Alle anderen Routen erhalten Platzhalter-Seiten ("Coming Soon") mit identischem Header und Footer.

## Routing-Struktur (in `src/App.tsx`)

```
/                                  → Index (unverändert)
/leistungen                        → Leistungen (Platzhalter)
/leistungen/fassadengeruest        → Platzhalter
/leistungen/innengeruest           → Platzhalter
/leistungen/treppenturm            → Platzhalter
/leistungen/dachfanggeruest        → Platzhalter
/leistungen/schutznetze-gelaender  → Platzhalter
/leistungen/wetterschutz           → Platzhalter
/projekte                          → Platzhalter
/ueber-uns                         → Platzhalter
/karriere                          → Platzhalter
/kontakt                           → Platzhalter
*                                  → NotFound (existiert bereits)
```

## Neue / geänderte Dateien

### 1. `src/lib/site.ts` – NAV anpassen
NAV-Einträge bekommen echte Pfade statt Anker:
- Startseite → `/`
- Leistungen → `/leistungen`
- Projekte → `/projekte`
- Über uns → `/ueber-uns`
- Karriere → `/karriere`
- Kontakt → `/kontakt`

(Damit Header automatisch korrekt verlinkt – Startseite-Anker bleiben funktional, da Startseite unverändert.)

### 2. `src/components/sections/Header.tsx` – Links umstellen
- `<a href>` für Nav-Items, Logo und "Gerüst anfragen" durch React Router `<Link>` bzw. `NavLink` ersetzen.
- Logo → `/`
- "Gerüst anfragen" Button (Desktop + Mobile-Menü) → `/kontakt`
- Nav-Items via `NavLink` mit `activeClassName="text-primary"` (Wietek-Rot) – die bestehende `src/components/NavLink.tsx` Wrapper-Komponente passt dafür perfekt.
- Telefon-Links (`tel:`) bleiben `<a>`.
- Mobile-Menü-Items ebenfalls `NavLink`, `setOpen(false)` bleibt.

### 3. `src/App.tsx` – Routen ergänzen
Alle oben gelisteten Routen registrieren. Catch-all `*` bleibt unten. Innerhalb `<BrowserRouter>` zusätzlich eine `<ScrollToTop />`-Komponente einfügen, die bei Pfadwechsel `window.scrollTo(0,0)` ausführt.

### 4. `src/components/ScrollToTop.tsx` – NEU
Hook-Komponente mit `useLocation` + `useEffect` für Scroll-Reset bei Routenwechsel.

### 5. `src/components/PageLayout.tsx` – NEU
Wiederverwendbares Layout für alle Platzhalter-Seiten:
- Renders `<Header />`, `<main>{children}</main>`, `<Footer />`, `<FloatingButtons />`
- Container mit `pt-32` o.ä. damit Inhalt unter dem Fixed-Header startet
- Gleiche Wrapper-Struktur wie `pages/Index.tsx` (inkl. `pb-14 sm:pb-0`)

### 6. `src/components/ComingSoon.tsx` – NEU
Kurzer Hero-artiger Bereich:
- H1 mit Seitentitel (Prop `title`)
- Subline "Diese Seite ist in Arbeit und bald verfügbar."
- CTA-Buttons: "Zur Startseite" (`/`) und "Kontakt aufnehmen" (`/kontakt`)
- Im bestehenden Design (Stahl-Hintergrund / Container-Klassen wie restliche Sections)

### 7. Platzhalter-Pages – NEU in `src/pages/`
Eine kompakte Datei pro Route, jeweils:
```tsx
<PageLayout>
  <Helmet><title>{seitentitel} | Wietek Gerüstbau</title></Helmet>
  <ComingSoon title="..." />
</PageLayout>
```

Dateien:
- `Leistungen.tsx`
- `leistungen/Fassadengeruest.tsx`
- `leistungen/Innengeruest.tsx`
- `leistungen/Treppenturm.tsx`
- `leistungen/Dachfanggeruest.tsx`
- `leistungen/SchutznetzeGelaender.tsx`
- `leistungen/Wetterschutz.tsx`
- `Projekte.tsx`
- `UeberUns.tsx`
- `Karriere.tsx`
- `Kontakt.tsx`

### 8. `src/pages/NotFound.tsx`
Bekommt `<Helmet><title>404 | Wietek Gerüstbau</title></Helmet>`. Sonst unverändert.

### 9. `src/components/Seo.tsx`
Bleibt unverändert (wird weiter nur in der Startseite verwendet, damit dort nichts kippt). Platzhalter-Seiten setzen ihren eigenen `<title>` via `react-helmet-async`.

## Verhalten

- **Scroll-Reset**: `ScrollToTop` in `App.tsx` innerhalb des Routers.
- **Aktiver Link**: `NavLink` setzt bei Match `text-primary` (Wietek-Rot, bereits Hover-Farbe).
- **Startseite unverändert**: `pages/Index.tsx`, `Hero.tsx` und alle Section-Komponenten werden NICHT angefasst. Die geänderten NAV-Hrefs greifen nur in der neuen Header-Logik – Anker-Sprünge auf der Startseite werden weiterhin durch die Section-IDs gewährleistet, falls jemand `/#leistungen` aufruft (BrowserRouter + Hash). Da der Header künftig auf `/leistungen` zeigt, navigiert er stattdessen zur neuen Seite – das ist gewünscht.

## Technisch

- Keine neuen Dependencies – `react-router-dom` und `react-helmet-async` sind bereits installiert.
- Bestehende `NavLink`-Wrapper-Komponente wiederverwenden.
- Kein Eingriff in `Hero.tsx`, `Stats.tsx`, …, `Footer.tsx`.
