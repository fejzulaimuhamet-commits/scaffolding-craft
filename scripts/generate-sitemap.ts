#!/usr/bin/env bun
/**
 * Statischer Sitemap-Generator für wietek-geruestbau.de
 * Aufruf:  bun run scripts/generate-sitemap.ts
 * Ausgabe: public/sitemap.xml
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://wietek-geruestbau.de";

interface Entry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
}

const ROUTES: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/leistungen", changefreq: "monthly", priority: "0.9" },
  { path: "/leistungen/fassadengeruest", changefreq: "monthly", priority: "0.9" },
  { path: "/leistungen/innengeruest", changefreq: "monthly", priority: "0.9" },
  { path: "/leistungen/treppenturm", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/dachfanggeruest", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/schutznetze-gelaender", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/wetterschutz", changefreq: "monthly", priority: "0.8" },
  { path: "/projekte", changefreq: "weekly", priority: "0.8" },
  { path: "/ueber-uns", changefreq: "monthly", priority: "0.7" },
  { path: "/karriere", changefreq: "weekly", priority: "0.7" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.8" },
  { path: "/anfrage", changefreq: "yearly", priority: "0.7" },
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;

const outPath = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`✓ Sitemap mit ${ROUTES.length} Einträgen geschrieben: ${outPath}`);
