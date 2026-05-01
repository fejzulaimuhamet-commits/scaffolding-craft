Ich werde den Hero-H1 gezielt so korrigieren, dass er auf Desktop genau in die gewünschte Breite gezogen wird und nicht mehr unnötig untereinander fällt.

Plan
1. Die aktuelle Ursache entfernen
- Den zusätzlichen harten Zeilenumbruch nach „pünktlich,“ entfernen.
- Den Zeilenumbruch nach „Hamburg –“ beibehalten, damit die 2-Zeilen-Struktur fest bleibt.

2. Den H1 horizontal mehr Platz geben
- Die H1-Breite im Hero vergrößern, damit die zweite Zeile genug Raum bekommt.
- Falls nötig auch den direkten Hero-Textcontainer etwas breiter machen, weil der H1 aktuell zusätzlich in einem bereits begrenzten Wrapper sitzt.

3. Schriftgröße so abstimmen, dass die gewünschte 2-Zeilen-Aufteilung stabil ist
- Die bestehende clamp-Größe fein justieren, damit Desktop nicht zu groß bleibt.
- Ziel:
  - Zeile 1: „Gerüstbau in Hamburg –“
  - Zeile 2: „sicher, pünktlich, ab 24 Std. einsatzbereit.“

4. Nichts anderes ändern
- Keine Änderungen an Subline, Buttons, Bild, Abständen anderer Elemente oder restlichem Hero-Layout.

Technische Details
- Datei: `src/components/sections/Hero.tsx`
- Wahrscheinliche Hauptursache aktuell:
  - äußerer Textcontainer: `lg:max-w-[55%]`
  - H1 zusätzlich: `max-w-[75%]`
  - plus 2 harte `<br />`
- Dadurch wird der verfügbare Platz für die Headline stark reduziert und der Text fällt zu früh in viele Zeilen.
- Umsetzung daher mit exakt einem `<br />` nach „Hamburg –“ und breiterem nutzbaren Raum für den H1.

Wenn du das freigibst, setze ich es direkt so um.