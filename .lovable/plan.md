## Ziel
Die Kontaktanfragen sollen zuverlässig nur noch an `wietek-ltd@gmx.de` zugestellt werden und keine alte Adresse mehr verwenden.

## Plan
1. **Web3Forms-Integration technisch bereinigen**
   - Die aktuelle Implementierung gegen die offizielle API angleichen.
   - Die irreführende `to_email`-Logik entfernen bzw. nicht mehr als vermeintlichen Override behandeln.
   - Fehlermeldungen so belassen/verbessern, dass klar erkennbar ist, wenn ein Key oder Konto falsch konfiguriert ist.

2. **Projekt auf alte E-Mail-Verweise prüfen und bereinigen**
   - Alle Stellen mit der alten Adresse identifizieren.
   - Sichtbare Texte anpassen, insbesondere den Hinweis im Anfrageformular zu Anhängen.
   - Nur die tatsächlich veralteten Empfänger-/Kontaktverweise ändern, ohne andere Firmendaten unnötig umzubauen.

3. **Empfängerursache außerhalb des Frontends klar absichern**
   - Festhalten, dass der aktive Web3Forms-Key serverseitig noch auf die alte Empfängeradresse zeigt.
   - Als saubere Lösung den Key aus dem korrekt konfigurierten Konto neu einsetzen oder den Empfänger im bestehenden Konto umstellen.
   - Danach einen echten Testlauf über `/anfrage` durchführen und das Ergebnis validieren.

## Technische Details
- In `src/lib/web3forms.ts` wird aktuell ein nicht dokumentiertes Feld `to_email` gesendet; laut API-Referenz sind u. a. `access_key`, `email`, `subject`, `replyto`, `ccemail` dokumentiert, aber kein Empfänger-Override.
- Das bedeutet: Der Empfänger wird sehr wahrscheinlich durch die Web3Forms-Kontokonfiguration hinter dem Key gesteuert, nicht durch das Frontend.
- Im Projekt gibt es zusätzlich noch mindestens einen sichtbaren Alt-Verweis in `src/pages/Anfrage.tsx` (`info@wietek-geruestbau.de` bei Anhängen), der Nutzer verwirren kann.

## Ergebnis nach Umsetzung
- Keine missverständliche Empfänger-Logik mehr im Code
- Alte E-Mail-Verweise im Formular bereinigt
- Web3Forms-Konfiguration und Frontend sind wieder konsistent, sodass Tests eindeutig auswertbar sind