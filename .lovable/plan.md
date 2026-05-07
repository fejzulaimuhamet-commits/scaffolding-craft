## Problem

Viele Texte auf der Live-Seite sind im Sanity Studio (Visual Editing / Presentation Mode) **nicht klickbar**, obwohl Stega aktiv ist. Grund: Im Code stehen überall `??`-Fallback-Strings (z. B. `hp?.heroTitle ?? "Gerüstbau in Hamburg…"`). Wenn das Sanity-Feld leer ist, rendert React den **hartkodierten String** — dieser hat keine Stega-Markierung und ist deshalb nicht editierbar. Auch das Anlegen der Felder im Studio ist mühsam, weil der Kunde nicht weiß, was reingehört.

## Lösung (zwei Schritte, gemeinsam umgesetzt)

### Schritt 1 – Sanity-Dokument mit allen aktuellen Texten befüllen
Das `homepage`-Dokument (sowohl `published` als auch `drafts.homepage`) wird per MCP-Patch mit den exakten Default-Texten aus dem Code befüllt. Felder:

- Hero: `heroBadge`, `heroTitle`, `heroCtaPrimary`, `heroCtaSecondary`
- Industries: `industriesEyebrow`, `industriesTitle`, `industriesIntro`
- Services: `servicesEyebrow`, `servicesTitle`, `servicesIntro`
- ServiceArea: `serviceAreaEyebrow`, `serviceAreaTitle`, `serviceAreaIntro`
- Testimonials: `testimonialsEyebrow` (Titel & Badge bereits gesetzt)
- FAQ: `faqEyebrow`, `faqTitle`, `faqIntro`
- Contact: `contactEyebrow`, `contactTitle`, `contactIntro`, `contactCtaWhatsapp`, `contactCtaCall`

Ergebnis: Jedes Textelement hat einen echten Sanity-Wert → wird mit Stega-Marker gerendert → im Studio klickbar.

### Schritt 2 – Code-Fallbacks in den Sektionen entfernen
In den 7 Sektions-Dateien wird `hp?.feld ?? "…"` zu `hp?.feld` (bzw. `hp?.feld || ""`). Betroffen:

- `src/components/sections/Hero.tsx`
- `src/components/sections/Industries.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/ServiceArea.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/Contact.tsx`

Damit gibt es keine "stillen" Hartkodierungen mehr — was im Studio steht, wird angezeigt; was leer ist, ist sichtbar leer (und der Kunde merkt sofort, dass er es füllen soll).

### Schritt 3 – Verifikation
- Studio öffnen (`wietek-geruestbau.sanity.studio`) → Presentation Mode → Homepage → mit der Maus über jedes Textelement fahren und prüfen, dass der blaue Edit-Rahmen erscheint.
- Falls einzelne Items in Listen (Industries-Cards, Services-Cards, Testimonials, City-Tags) noch nicht editierbar sind: separat im nächsten Schritt angehen (das sind Array-Items mit eigener Schema-Struktur).

## Hinweis

Dieser Plan adressiert die **statischen Textfelder**. Falls auch Listen-Items (Karten, Cities, Testimonial-Zitate) editierbar sein sollen, sage mir Bescheid — dort braucht es eine zusätzliche Runde, weil der Code dort eigene Default-Arrays hat.
