# Plan: /leistungen Seite ausbauen

Die Startseite bleibt 100% unverändert. Es wird ausschließlich `src/pages/Leistungen.tsx` neu aufgebaut, plus eine kleine Helper-Komponente.

## Dateien

### 1. `src/pages/Leistungen.tsx` (komplett neu schreiben)
Ersetzt die jetzige Placeholder-Version. Struktur:

```tsx
<PageLayout>
  <Helmet><title>Leistungen | Wietek Gerüstbau</title></Helmet>
  <LeistungenHero />
  <ServicesGrid />
  <WarumWietek />
  <CTASection />
</PageLayout>
```

Alle Sektionen werden in derselben Datei als lokale Komponenten definiert (kompakt, eine Page-Datei).

### 2. Inhalte der Sektionen

**LeistungenHero**
- `<section>` mit Anthrazit-Hintergrund (`bg-steel-deep`), `pt-16 lg:pt-24 pb-12 lg:pb-16` (klein, da `PageLayout` schon `pt-24 lg:pt-32` für Header-Abstand setzt — Hero bekommt zusätzlich eigenes Top-Padding zur Atmung).
- `container-w`
- Eyebrow „UNSERE LEISTUNGEN" in Rot (`<span class="eyebrow">`, da Hintergrund dunkel: `eyebrow` Farbe ist bereits `text-primary` ✓)
- H1: „Gerüstlösungen für jeden Einsatz" — `font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight`
- Subtext: „Von der privaten Fassade bis zum Industrieprojekt – wir liefern das passende Gerüst für Ihr Vorhaben." — `text-white/75 text-lg max-w-2xl mt-6`
- Keine CTAs, kein Foto.
- Framer Motion `initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}` auf den Inhalts-Container.

**ServicesGrid**
- Section mit `bg-white py-20 lg:py-28`.
- Wiederverwendung des **gleichen Card-Stils** wie `src/components/sections/Services.tsx`:
  - Foto absolut, Gradient unten, roter Tag oben links, roter Hover-Balken unten, Hover-Skalierung, „Mehr erfahren"-Pfeil am Ende.
- Statt `<motion.a href="#anfrage">` wird ein `<Link to={...}>` von `react-router-dom` verwendet (über `motion(Link)` oder `motion.div` mit Link-Wrapper). Wir nutzen `motion.div` mit innerem `<Link>` um Typing-Komplexität zu vermeiden.
- Daten-Array (lokal in der Datei):
  ```ts
  const services = [
    { tag: "Fassade",    title: "Fassadengerüst",          desc: "Für Sanierung, Neubau & Malerarbeiten",    img: ASSETS.slide(1),  to: "/leistungen/fassadengeruest" },
    { tag: "Innen",      title: "Innengerüst",             desc: "Sicher & flexibel für Innenräume",          img: ASSETS.slide(8),  to: "/leistungen/innengeruest" },
    { tag: "Aufstieg",   title: "Treppenturm",             desc: "Sicherer Zugang auf jeder Baustelle",       img: ASSETS.slide(22), to: "/leistungen/treppenturm" },
    { tag: "Dachschutz", title: "Dachfanggerüst",          desc: "Schutz bei Dacharbeiten aller Art",         img: ASSETS.slide(15), to: "/leistungen/dachfanggeruest" },
    { tag: "Sicherheit", title: "Schutznetze & Geländer",  desc: "Absturzsicherung nach DGUV",                img: ASSETS.slide(28), to: "/leistungen/schutznetze-gelaender" },
    { tag: "Wetter",     title: "Wetterschutz",            desc: "Arbeiten bei jedem Wetter",                 img: ASSETS.slide(40), to: "/leistungen/wetterschutz" },
  ];
  ```
- Asymmetrisches Layout — exakt wie `Services.tsx`:
  - Reihe 1: Karte 1 hero links (`lg:col-span-3 h-[420px] sm:h-[520px] lg:h-[620px]`, `size="lg"`), rechts (`lg:col-span-2`) gestapelt Karten 2 & 3 (`h-[260px] lg:h-[305px]`).
  - Reihe 2: 3 gleichbreite Karten 4/5/6, mittlere etwas höher (`h-[320px] lg:h-[380px]` außen, `h-[360px] lg:h-[440px]` mitte).
- Section-Überschrift oben (analog Startseite, optional kurz):
  - Eyebrow „Übersicht"
  - H2 „Sechs Leistungen – ein Anspruch: Sicherheit & Termintreue."

**WarumWietek**
- `<section className="bg-steel-deep py-20 lg:py-28">`.
- `container-w`
- Eyebrow „Warum Wietek" (rot, auf dunkel ✓)
- H2 weiß: „Drei Versprechen, die wir halten."
- 3-Spalten-Grid (`grid sm:grid-cols-3 gap-8 lg:gap-12 mt-12`):
  1. Icon `Zap` — Titel „Schnell" — Text „Aufbau in 24–72 Stunden nach Auftrag."
  2. Icon `ShieldCheck` — Titel „Versichert" — Text „Vollständig haftpflicht- & betriebsversichert, DGUV-geprüft."
  3. Icon `Users` — Titel „Familiengeführt" — Text „Inhabergeführtes Familienunternehmen aus Hamburg-Bergedorf seit 2014."
- Icons rot (`text-primary h-10 w-10`), Titel weiß `font-display font-bold text-2xl`, Text `text-white/75`.
- Framer-Motion fade-in pro Spalte mit Stagger-Delay.

**CTASection**
- `<section className="bg-primary py-16 lg:py-20">`.
- Zentrierter `container-w` Inhalt:
  - H2 weiß `text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold`: „Welches Gerüst brauchen Sie?"
  - Untertext weiß/85: „Wir beraten Sie unverbindlich und erstellen Ihr Festpreis-Angebot."
  - Button: `<Link to="/kontakt">` — weißer Hintergrund, roter Text, Hover invert: `bg-white text-primary hover:bg-steel hover:text-white px-8 py-4 font-display font-bold uppercase tracking-[0.2em] text-sm inline-flex items-center gap-2 transition-colors`
  - Pfeil-Icon `ArrowRight`.
- Framer-Motion fade-in.

### 3. Imports in `Leistungen.tsx`
```
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Zap, ShieldCheck, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ASSETS } from "@/lib/site";
```

## Verhalten / Konsistenz
- `PageLayout` bringt Header, Footer, FloatingButtons, ScrollToTop ist global aktiv → Seitenwechsel scrollt nach oben ✓.
- Kein neuer Route-Eintrag nötig, Route `/leistungen` zeigt bereits auf `Leistungen.tsx`.
- Mobile-First: alle Grids stacken auf < `sm`/`lg` korrekt (gleiches Pattern wie Startseite-Services).
- Framer Motion `whileInView` mit `viewport={{ once: true, amount: 0.2 }}`.

## Nicht angefasst
- `src/pages/Index.tsx` und alle Komponenten unter `src/components/sections/*`.
- Header, Footer, NavLink, Routing-Setup.
- Die 6 Unterseiten unter `src/pages/leistungen/*` bleiben Platzhalter (separater Folge-Auftrag).
