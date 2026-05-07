## Root Cause gefunden

In `vercel.json` ist gesetzt:
```
"X-Frame-Options": "ALLOW-FROM https://wietek-geruestbau.sanity.studio"
```

`X-Frame-Options: ALLOW-FROM` ist **deprecated** und wird von Chrome/Edge/Firefox wie `DENY` behandelt — d.h. **kein** iframe-Embedding ist erlaubt, egal von wo. Deshalb zeigt das Sanity-Studio "Unable to connect", obwohl die Site live ist und CORS stimmt.

Die `Content-Security-Policy: frame-ancestors` darunter ist bereits korrekt gesetzt und wird von modernen Browsern bevorzugt — wir müssen nur den schädlichen X-Frame-Options-Header **entfernen**.

## Fix (1 Datei)

**`vercel.json`** — `X-Frame-Options`-Header entfernen, CSP `frame-ancestors` bleibt unverändert (erlaubt schon `https://*.sanity.studio`).

Neue `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://*.sanity.studio https://wietek-geruestbau.sanity.studio http://localhost:3333"
        }
      ]
    }
  ]
}
```

## Was danach passiert

1. Lovable pusht den Fix automatisch zu GitHub
2. Vercel deployt automatisch (1–2 Min)
3. Sanity Studio → Presentation → Refresh → Vorschau lädt die Live-Site

Keine weiteren Schritte nötig. Kein Studio-Redeploy, keine DNS-Änderung, kein Domain-Verbinden.
