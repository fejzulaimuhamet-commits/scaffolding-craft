## Ziel

Den Web3Forms Access Key austauschen, damit Anfragen an das richtige Postfach (`info@wietek-geruestbau.de`) gehen.

## Vorgehen

1. Du gibst mir den neuen Web3Forms Access Key (aus dem Web3Forms-Dashboard, eingeloggt mit `info@wietek-geruestbau.de`).
2. Ich ersetze in `src/lib/web3forms.ts` die Konstante `WEB3FORMS_KEY` durch den neuen Wert.
3. Kein weiterer Code muss angepasst werden – `RequestWizard.tsx` und `Anfrage.tsx` nutzen die Funktion `submitToWeb3Forms`, die intern den Key liest.
4. Verifikation: Nach dem Austausch sende ich eine Test-Anfrage an die Web3Forms-API und bestätige `success: true`. Du prüfst den Posteingang von `info@wietek-geruestbau.de`.

## Hinweis

Der Access Key ist ein **publishable** Key (für Web3Forms gedacht, im Frontend einsetzbar) – er darf direkt im Code stehen und braucht keinen Secret-Slot.

## Nächster Schritt

Bitte poste mir den neuen Access Key, dann tausche ich ihn nach Plan-Bestätigung aus.