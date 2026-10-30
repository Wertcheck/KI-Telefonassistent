# Telvo – Website

Statische, abhängigkeitsfreie Website (Node ≥ 18, keine npm-Pakete).

```
npm run build   # erzeugt dist/ aus site.config.mjs + src/
npm run serve   # dist/ auf http://localhost:4173
npm run qa      # Playwright-QA → artifacts/qa/telvo/ (PLAYWRIGHT_PATH setzen, falls nötig)
```

- `site.config.mjs` – zentrale Konfiguration (Telefonnummer, E-Mail, Preise, Bilder, Demo-Audio, Rechtliches)
- `src/components/` – `ui.mjs` (Icons, Buttons, Bild/Platzhalter) und `sections.mjs` (12 Sektionen)
- `src/styles/` – `tokens.css` (alle Farben/Typo/Radien/Schatten), `base`, `components`, `sections`, `responsive`
- `public/` – selbst gehostete Schriften (DM Serif Display, Manrope), Bilder, Favicon

## Noch zu konfigurieren (`site.config.mjs`)
| Schlüssel | Wirkung solange `null` |
|---|---|
| `company.phone` | „Jetzt Demo anrufen“ wird zu „Demo anfragen“ (Kontaktdialog); Footer ohne Nummer |
| `demo.audioUrl` (Datei in `public/audio/`) | Beispielgespräch-Buttons zeigen ehrlichen Hinweis; Wellenform animiert nur bei echter Wiedergabe |
| `company.email` / `contact.formEndpoint` | Kontaktformular meldet, dass kein Empfänger angebunden ist |
| `company.legalName/address/location/social` | Impressum-Platzhalter, Footer ohne Angaben |
| `legal.*Url` | sonst Platzhalterseiten (noindex) mit Hinweis |
| `loginUrl`, `links.about` | „Anmelden“ / „Über uns“ werden ausgeblendet |
| `pricing.annual` | kein Monatlich/Jährlich-Umschalter |
| `integrations.verified` | alle Anbieter gelten als „mögliche Integrationsziele“ |
| `images.industries.*`, `images.howto` | neutraler Platzhalter statt Foto |
| `siteUrl` | Canonical / absolute Open-Graph-Bild-URL |
