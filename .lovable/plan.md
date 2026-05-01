Headline im Hero größer machen, ohne dass die zweite Zeile umbricht.

Plan
1. In `src/components/sections/Hero.tsx` nur die Schriftgröße des H1 erhöhen.
2. Container-Breite (`lg:max-w-[72%]`) und der einzelne `<br />` nach „Hamburg –“ bleiben unverändert, damit weiterhin genau 2 Zeilen erzeugt werden.
3. Größe so wählen, dass die längere Zeile „sicher, pünktlich, ab 24 Std. einsatzbereit.“ noch sicher in eine Zeile passt.

Technische Details
- Aktuell: `fontSize: 'clamp(1.875rem, 2.6vw, 2.625rem)'`
- Neu: `fontSize: 'clamp(2rem, 3.05vw, 3.25rem)'`
- Anschließend Screenshot-Check bei 1366px und 1920px, ob Zeile 2 wirklich nicht umbricht. Falls doch, Wert leicht reduzieren (z. B. `2.9vw / 3rem`).
- Sonst keine Änderungen.