## Ausgangslage

- Im Code ist alles korrekt: `src/lib/web3forms.ts` nutzt Access Key `a75961e5-db1d-44ad-947a-6e4596aef603`, das Anfrageformular (`src/pages/Anfrage.tsx`) sendet darüber.
- Web3Forms erlaubt **kein** Empfänger-Override aus dem Frontend – die Zieladresse wird ausschließlich im Web3Forms-Konto hinter dem Key gesetzt.
- Mails landen weiterhin an der alten Adresse → Ursache liegt **nicht im Code**, sondern im Web3Forms-Konto oder beim Veröffentlichungsstand.

## Ziel

Anfragen aus dem Website-Formular kommen direkt bei `wietek-ltd@gmx.de` an, ohne Umweg über die alte Adresse.

## Schritte

1. **Web3Forms-Konto prüfen (durch dich, nicht im Code)**
   - Bei web3forms.com mit `wietek-ltd@gmx.de` einloggen.
   - Den Key `a75961e5-…` öffnen → Feld **Recipient Email** muss exakt `wietek-ltd@gmx.de` lauten **und** als „Verified" (grün) markiert sein.
   - Falls noch nicht verifiziert: Bestätigungsmail in `wietek-ltd@gmx.de` (auch Spam) öffnen und Link klicken. Solange unverifiziert, fällt Web3Forms auf die alte Adresse zurück.

2. **Live-Stand absichern**
   - Nach erfolgreicher Verifizierung das Projekt in Lovable über **Publish → Update** neu veröffentlichen, damit die Live-URL garantiert die aktuelle Konfiguration nutzt.

3. **Test mit eindeutigem Marker**
   - Eine Testanfrage über die Live-Seite senden, im Feld „Projektdetails" z. B. `TESTLAUF-001` eintragen.
   - Prüfen, ob die Mail in `wietek-ltd@gmx.de` ankommt (Posteingang + Spam).

4. **Ergebnisabhängige Folgeaktion**
   - **Kommt an:** fertig.
   - **Kommt nicht an / weiterhin alte Adresse:** Wahrscheinlich gehört der Key noch zum alten Web3Forms-Konto. Dann im neuen Konto (`wietek-ltd@gmx.de`) einen **frischen Access Key** erzeugen und mir mitteilen – ich tausche ihn anschließend in `src/lib/web3forms.ts` aus (einzige Code-Änderung in diesem Plan).

## Technische Details

- Betroffene Datei bei evtl. Key-Tausch: `src/lib/web3forms.ts`, Konstante `WEB3FORMS_KEY`.
- Keine weiteren Codeänderungen nötig; Empfänger lässt sich über die API nicht setzen.
- Frontend-Änderungen werden erst nach **Publish → Update** live; Backend ist hier nicht beteiligt.
