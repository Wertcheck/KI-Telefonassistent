import { mkdir, rm, cp, readFile, writeFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from '../site.config.mjs';
import { esc } from '../src/components/ui.mjs';
import * as S from '../src/components/sections.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const exists = (p) => access(p).then(() => true, () => false);

const c = structuredClone(config);
// Bilder, die laut Konfiguration existieren sollen, aber nicht in public/ liegen, werden zu Platzhaltern.
const check = async (img) => (img && (await exists(path.join(root, 'public', img.src))) ? img : null);
c.images.hero = await check(c.images.hero);
c.images.howto = await check(c.images.howto);
for (const k of Object.keys(c.images.industries)) c.images.industries[k] = await check(c.images.industries[k]);

// Basispfad für Projekt-Seiten (GitHub Pages: /<repo>); lokal leer.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const rebase = (html) =>
  html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`)
    .replace(/srcset="([^"]+)"/g, (_, v) => `srcset="${v.replace(/(^|, )\//g, `$1${base}/`)}"`);

const abs = (p) => (c.siteUrl ? c.siteUrl.replace(/\/$/, '') + p : p);
const head = ({ title, description, path: pth = '/', noindex = false, og = true }) => `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#F7F4EE">
${noindex ? '<meta name="robots" content="noindex">' : ''}
${c.siteUrl ? `<link rel="canonical" href="${esc(abs(pth))}">` : ''}
<meta property="og:type" content="website"><meta property="og:locale" content="de_DE"><meta property="og:site_name" content="Telvo">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
${og && c.images.hero ? `<meta property="og:image" content="${esc(abs(c.images.hero.src))}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/dm-serif-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${c.images.hero ? `<link rel="preload" as="image" href="${esc(c.images.hero.src)}" imagesrcset="${esc(c.images.hero.srcset || '')}" imagesizes="(min-width:1100px) 600px, 100vw" fetchpriority="high">` : ''}
<link rel="stylesheet" href="/styles.css">
</head>`;

const page = (body, meta) => `${head(meta)}
<body>
<a class="skip" href="#main">Zum Inhalt springen</a>
${S.header(c)}
${body}
${S.footer(c)}
${S.dialogs(c)}
<script src="/main.js" defer></script>
</body></html>`;

const home = page(
  `<main id="main">${[S.hero(c), S.industryStrip(), S.features(), S.industries(c), S.demo(c), S.how(c), S.pricing(c), S.integrations(c), S.faq(), S.finalCta()].join('\n')}</main>`,
  { title: 'Telvo – KI-Telefonassistent für Ihr Unternehmen', description: c.brand.description, path: '/' },
);

const legal = (file, title, c2 = c) => page(
  `<main id="main" class="legal container"><h1 class="h2">${title}</h1>
  <div class="legal__notice" role="note"><strong>Hinweis zur Konfiguration:</strong> Dieser Text wurde noch nicht hinterlegt. Bitte hier die rechtlich geprüfte Fassung ergänzen oder in <code>site.config.mjs</code> unter <code>legal</code> eine externe URL eintragen. Es werden bewusst keine Angaben erfunden.</div>
  ${file === 'impressum' ? `<p>Anbieter: ${esc(c.company.legalName || '[Firmenname fehlt]')}<br>Anschrift: ${c.company.address ? esc(`${c.company.address.street}, ${c.company.address.zip} ${c.company.address.city}`) : '[Anschrift fehlt]'}<br>E-Mail: ${esc(c.company.email || '[E-Mail fehlt]')}</p>` : ''}
  <p><a href="/">← Zurück zur Startseite</a></p></main>`,
  { title: `${title} – Telvo`, description: `${title} von Telvo`, path: `/${file}.html`, noindex: true, og: false },
);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
const css = [];
for (const f of ['tokens', 'base', 'components', 'sections', 'responsive']) css.push(await readFile(path.join(root, 'src/styles', `${f}.css`), 'utf8'));
await writeFile(path.join(dist, 'styles.css'), css.join('\n').replaceAll('url(/fonts/', `url(${base}/fonts/`));
await cp(path.join(root, 'src/js/main.js'), path.join(dist, 'main.js'));
await writeFile(path.join(dist, 'index.html'), rebase(home));
await writeFile(path.join(dist, 'impressum.html'), rebase(legal('impressum', 'Impressum')));
await writeFile(path.join(dist, 'datenschutz.html'), rebase(legal('datenschutz', 'Datenschutzerklärung')));
await writeFile(path.join(dist, 'agb.html'), rebase(legal('agb', 'Allgemeine Geschäftsbedingungen')));
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${c.siteUrl ? `Sitemap: ${c.siteUrl}/sitemap.xml\n` : ''}`);
console.log('Build fertig →', path.relative(root, dist), '| Bilder:', c.images.hero ? 'Hero ok' : 'Hero fehlt');
