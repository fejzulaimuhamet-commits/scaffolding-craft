## Warum die Texte weg waren

Beim Umstellen auf Sanity habe ich die hardcoded Fallbacks im Hero entfernt — Idee war: leeres Feld = sichtbare Lücke = Edit-Anreiz. Nachteil: solange Sanity-Query noch lädt (oder bei Cache-Miss/CORS-Fehler), ist der Hero leer. Das war zu aggressiv.

Außerdem: weil Stega die Daten als unsichtbare Marker an den String hängt, **bleiben Klick-zu-Edit-Marker auch mit `??`-Fallback erhalten** — der Fallback greift nur wenn der String wirklich `undefined` ist. Wir verlieren also nichts.

## Fix

In `src/components/sections/Hero.tsx`: Defaults zurückbringen via `??`-Operator für `heroBadge`, `heroTitle`, `heroSubtitle`, `heroUsps`, `heroCtaPrimary`, `heroCtaSecondary`. Die Werte matchen exakt den Ursprungstext, der bereits in Sanity geseedet wurde — Anzeige bleibt also identisch, egal ob Sanity geladen ist oder nicht.

Keine Änderungen an Stats/Process/About/Footer nötig — die haben bereits Fallbacks.