// WCAG-AA-Kontrastprüfung aller sichtbaren Textknoten (Hintergrund = nächster deckender Vorfahre).
import { createRequire } from 'node:module'; import { spawn } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || 'playwright');
const srv = spawn('node', ['scripts/serve.mjs'], { env: { ...process.env, PORT: 4197 }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4197', { waitUntil: 'networkidle' });
const res = await page.evaluate(() => {
  const parse = (c) => { const k = c.match(/color\(srgb ([^)]+)\)/); if (k) { const [r, g, b, a = 1] = k[1].split(/[ \/]+/).filter(Boolean).map(Number); return { r: r * 255, g: g * 255, b: b * 255, a }; } const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const bgOf = (el) => { const stack = []; for (let e = el; e; e = e.parentElement) { const cs0 = getComputedStyle(e); let c = parse(cs0.backgroundColor); if ((!c || c.a === 0) && cs0.backgroundImage.includes('gradient')) { const g = cs0.backgroundImage.match(/(rgba?\([^)]+\)|color\(srgb [^)]+\))/); c = g && parse(g[1]); } if (c && c.a > 0) { stack.push(c); if (c.a >= 1) break; } } let base = { r: 247, g: 244, b: 238 }; for (const c of stack.reverse()) base = { r: c.r * c.a + base.r * (1 - c.a), g: c.g * c.a + base.g * (1 - c.a), b: c.b * c.a + base.b * (1 - c.a) }; return base; };
  const out = new Map();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) {
    const t = n.textContent.trim(); const el = n.parentElement; if (!t || !el.checkVisibility() || el.closest('dialog:not([open]),script,style,[hidden]')) continue;
    const cs = getComputedStyle(el); const fg = parse(cs.color) || { r: 0, g: 0, b: 0, a: 1 }; const bg = bgOf(el); const op = parseFloat(cs.opacity) || 1;
    const a = fg.a * op; const f = { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) };
    const L1 = lum(f), L2 = lum(bg); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700; const large = size >= 24 || (size >= 18.66 && bold);
    if (ratio < (large ? 3 : 4.5)) out.set(el.className + '|' + t.slice(0, 30), `${ratio.toFixed(2)} ${t.slice(0, 40)}`);
  }
  return [...out.values()];
});
console.log(res.length ? 'KONTRASTPROBLEME:\n' + res.join('\n') : 'Kontrast: alle Textknoten ≥ AA');
await b.close(); srv.kill();
