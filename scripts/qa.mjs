// Browser-QA: Screenshots je Sektion, Konsolenfehler, Links, horizontaler Overflow. Voraussetzung: `npm run build` + Playwright.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const out = 'artifacts/qa/telvo';
await mkdir(out, { recursive: true });
const port = 4199;
const srv = spawn('node', ['scripts/serve.mjs'], { env: { ...process.env, PORT: port }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const base = `http://localhost:${port}`;
const browser = await chromium.launch();
const problems = [];

const shots = [
  ['01-header-hero', '#top', true], ['02-branchenleiste-funktionen', '.strip', 'features'], ['03-branchenkarten', '#branchen'],
  ['04-live-demo', '#demo'], ['05-so-funktionierts', '#so-funktionierts'], ['06-preise', '#preise'], ['07-integrationen', '#integrationen'],
  ['08-faq', '#faq'], ['09-final-cta', '.final'], ['10-footer', '.footer'],
];
async function open(width, height = 900) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problems.push(`[${width}] console ${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`[${width}] pageerror: ${e.message}`));
  page.on('requestfailed', (r) => problems.push(`[${width}] requestfailed: ${r.url()}`));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
const shoot = async (page, sel, file, extra) => {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  const box = await el.boundingBox();
  let h = box.height;
  if (extra) { const b2 = await page.locator('#' + extra === '#features' ? '#produkt' : extra).first().boundingBox(); h = b2.y + b2.height - box.y; }
  await page.screenshot({ path: `${out}/${file}.png`, clip: { x: 0, y: box.y + (await page.evaluate(() => scrollY)), width: page.viewportSize().width, height: Math.min(h, 2400) }, fullPage: true });
};

// Desktop-Sektionsshots
const d = await open(1440);
await shoot(d, 'body', '00-vollseite-desktop');
for (const [f, sel, ex] of shots) {
  if (f === '01-header-hero') { await d.screenshot({ path: `${out}/${f}.png`, fullPage: true, clip: { x: 0, y: 0, width: 1440, height: 900 } }); continue; }
  const el = d.locator(sel).first(); const bb = await el.boundingBox();
  let h = bb.height; if (ex) { const b2 = await d.locator('#produkt').boundingBox(); h = b2.y + b2.height - bb.y; }
  await d.screenshot({ path: `${out}/${f}.png`, fullPage: true, clip: { x: 0, y: bb.y, width: 1440, height: h } });
}
// Interaktionen
await d.evaluate(() => scrollTo(0, 600));
const sticky = await d.evaluate(() => document.querySelector('[data-header]').classList.contains('is-scrolled'));
if (!sticky) problems.push('Header: is-scrolled fehlt');
await d.click('#acc-btn-0'); if ((await d.getAttribute('#acc-btn-0', 'aria-expanded')) !== 'true') problems.push('FAQ öffnet nicht');
await d.keyboard.press('ArrowDown'); if (!(await d.evaluate(() => document.activeElement.id === 'acc-btn-1'))) problems.push('FAQ Pfeiltaste');
await d.screenshot({ path: `${out}/08b-faq-offen.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
await d.click('[data-open-contact="business"]'); await d.waitForTimeout(200);
if (!(await d.evaluate(() => document.querySelector('#contact-dialog').open))) problems.push('Kontaktdialog öffnet nicht');
await d.screenshot({ path: `${out}/11-kontaktdialog.png` });
await d.keyboard.press('Escape');
await d.click('[data-open-cookies]'); await d.keyboard.press('Escape');
// Links
const hrefs = await d.$$eval('a[href]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
for (const h of hrefs) {
  if (h.startsWith('tel:') || h.startsWith('mailto:')) continue;
  if (h.startsWith('/#')) { if (!(await d.$(h.slice(1)))) problems.push('Ankerziel fehlt: ' + h); continue; }
  const r = await d.request.get(base + h); if (!r.ok()) problems.push(`Link ${h} -> ${r.status()}`);
}
// Responsive: Overflow + Mobile-Shots
for (const w of [1440, 1280, 1024, 768, 390, 360]) {
  const p = await open(w, w < 700 ? 800 : 900);
  const ov = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  if (ov.sw > ov.cw) {
    const offenders = await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && !e.closest('.strip ul')).slice(0, 5).map((e) => e.className || e.tagName));
    problems.push(`Horizontaler Overflow @${w}: ${ov.sw}>${ov.cw} ${JSON.stringify(offenders)}`);
  }
  await p.screenshot({ path: `${out}/responsive-${w}-hero.png`, clip: { x: 0, y: 0, width: w, height: w < 700 ? 800 : 900 } });
  if (w === 390) {
    await p.screenshot({ path: `${out}/12-mobil-vollseite-390.png`, fullPage: true });
    await p.click('[data-menu-toggle]'); await p.screenshot({ path: `${out}/12b-mobil-menue.png`, clip: { x: 0, y: 0, width: 390, height: 600 } });
    const pr = await p.locator('#preise').boundingBox(); 
  }
  await p.context().close();
}
await browser.close(); srv.kill();
console.log(problems.length ? 'PROBLEME:\n' + problems.join('\n') : 'QA: keine Probleme gefunden');
