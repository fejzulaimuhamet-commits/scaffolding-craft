# Plan: /leistungen umbauen — Leistungen als abwechselnde Text-/Bild-Reihen

Statt des asymmetrischen 6-Karten-Grids bekommt jede Leistung einen eigenen großen Abschnitt mit Foto links/rechts (alternierend), Erklärtext, Stichpunkten und zwei Buttons („Jetzt anfragen" + „Mehr erfahren"). Hero, Warum-Wietek- und CTA-Sektion bleiben erhalten. Startseite bleibt unangetastet.

## Datei

`src/pages/Leistungen.tsx` — vollständig neu schreiben.

## Aufbau

```
LeistungenHero        (Anthrazit, wie bisher)
ServiceRow × 6        (alternierend Bild links/rechts, Hintergrund weiß / muted)
WarumWietek           (wie bisher)
CTASection            (wie bisher)
```

## ServiceRow Komponente

12-Spalten-Grid auf `lg`:

- Bild (`lg:col-span-6`, `h-[320px] sm:h-[420px] lg:h-[500px]`)
  - Foto absolut, leichte Hover-Skalierung
  - Roter Tag oben links (z. B. „FASSADE", „INNEN" …)
  - **Keine kleinen Thumbnails** darunter (explizit ausgeschlossen)
- Text (`lg:col-span-6`)
  - Eyebrow (rot, gleicher Tag)
  - H2 — Titel der Leistung (`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-steel`)
  - Intro-Absatz (3–4 Zeilen, Beton-Grau)
  - Bullet-Liste mit `Check`-Icon im roten Quadrat (4 Bullets pro Leistung, fachlich passend)
  - Button-Reihe:
    - **Jetzt anfragen** → `/kontakt` (rot, gefüllt)
    - **Mehr erfahren** → jeweilige Unterseite (Outline, Steel)

Reihenfolge alterniert via `index % 2`:
- gerade: Bild links, Text rechts, Hintergrund `bg-white`
- ungerade: Bild rechts, Text links, Hintergrund `bg-muted` (für visuelle Trennung)

Framer-Motion: Bild slidet von links/rechts ein, Text fadet von unten ein.

## Inhalte (alle 6 Leistungen)

Jede Leistung erhält Tag, Titel, Intro-Text, 4 Bullets, Bild und Link auf Unterseite. Inhalte sind fachlich auf Wietek/Gerüstbau zugeschnitten:

| Leistung | Bullets (Beispiel) |
|---|---|
| Fassadengerüste | Sanierung/Neubau/Maler, Klassen 3–6 nach DIN EN 12811, Schutznetze inkl., Statik auf Wunsch |
| Innengerüste | Roll-/Festgerüste, schonend für Boden+Wand, schneller Aufbau, auch hohe Hallen |
| Treppentürme | hohe Tragfähigkeit, Handlauf+Knieleiste, auch als Notausgang, beliebige Höhen |
| Dachfanggerüste | Schutz >3 m, Schutzwand+Bordbrett, geprüfte Verankerung, auch Steildächer |
| Schutznetze & Geländer | Seitenschutz Stahl, Auffangnetze, Montage am Bestand, Vermietung/Komplett-Service |
| Wetterschutzdach | Spannweiten bis 30 m, lichtdurchlässige Planen, kombinierbar Fassadengerüst, Dachstuhl/Sanierung |

Bilder weiterhin aus `ASSETS.slide(n)` (1, 8, 22, 15, 28, 40).

## Beibehalten

- LeistungenHero (Anthrazit, Eyebrow rot, H1, Subtext, keine CTAs, kein Foto)
- WarumWietek (3 Spalten Schnell/Versichert/Familiengeführt auf Anthrazit)
- CTASection (rot, „Welches Gerüst brauchen Sie?" + Button → /kontakt)
- Helmet `<title>` + Meta-Description

## Nicht angefasst

- Startseite (`Index.tsx`, `src/components/sections/*`)
- Header, Footer, Routing
- Unterseiten unter `src/pages/leistungen/*` (bleiben Platzhalter)
