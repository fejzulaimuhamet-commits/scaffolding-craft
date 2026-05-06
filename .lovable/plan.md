## Problem

Sanity Presentation blockt Navigation zu `https://scaffolding-craft.lovable.app/#anfrage`, weil dieser Origin nicht in `presentationTool.allowOrigins` steht. Per Default erlaubt Sanity nur den in `previewUrl.origin` gesetzten Origin — alle internen Links (z.B. `<a href="https://scaffolding-craft.lovable.app/#anfrage">`) auf andere Origins werden blockiert.

## Fix

In `src/sanity/config.ts` `allowOrigins` zum `presentationTool` hinzufügen mit beiden Lovable-Hosts:

```ts
presentationTool({
  allowOrigins: [
    "https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app",
    "https://scaffolding-craft.lovable.app",
  ],
  previewUrl: { ... },
})
```

Damit funktionieren Navigation und Anker-Links zwischen Preview- und Published-Domain im Presentation-Iframe.

Optional follow-up: Hardcoded Links im Code, die absolut auf `https://scaffolding-craft.lovable.app` zeigen, auf relative Pfade (`/#anfrage`) umstellen — dann tritt das Problem grundsätzlich nicht mehr auf. Sage Bescheid wenn ich das auch suchen/fixen soll.