/** Wiederverwendbare UI-Bausteine: Icons, Buttons, Bilder, Logo. */
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const P = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h4"/>',
  puzzle: '<path d="M10 4a2 2 0 0 1 4 0v2h4v4h-2a2 2 0 0 0 0 4h2v6h-6v-2a2 2 0 0 0-4 0v2H4v-6h2a2 2 0 0 0 0-4H4V6h6z"/>',
  hammer: '<path d="m14 7 3-3 3 3-3 3M15 9 5 19a1.5 1.5 0 0 1-3-3l10-10M11 5l4 4"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  home: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  scale: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 7a3.5 3.5 0 0 0 6 0zM19 8l-3 7a3.5 3.5 0 0 0 6 0z"/>',
  cart: '<path d="M3 4h2l2.5 11h10L20 7H6.5"/><circle cx="9" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>',
  pause: '<path d="M8 5h3v14H8zM14 5h3v14h-3z" fill="currentColor"/>',
  mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  volume: '<path d="M4 9v6h4l5 4V5L8 9zM17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>',
  keypad: '<path d="M6 5h.01M12 5h.01M18 5h.01M6 11h.01M12 11h.01M18 11h.01M6 17h.01M12 17h.01M18 17h.01" stroke-width="3" stroke-linecap="round"/>',
  hangup: '<path d="M3 14c5-5 13-5 18 0l-2 3-4-1v-3a10 10 0 0 0-6 0v3l-4 1z" fill="currentColor"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3 6"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  sprout: '<path d="M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
  chart: '<path d="M4 20V10M10 20V5M16 20v-8M22 20H2"/>',
  building: '<path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/><path d="M19 20c0 1.5-2 2-5 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${P[name] || ''}</svg>`;

/** Telvo-Marke (nachgebaut nach Referenz) + Wortmarke. Offizielles SVG kann in public/ ersetzt werden. */
export const logoMark = (size = 34) =>
  `<svg class="logo__mark" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2h8a10 10 0 0 1 10 10v8H20z" fill="#258765"/><path d="M2 20V12A10 10 0 0 1 12 2h8v18z" fill="#0B3025"/><path d="M2 20h18v18h-8A10 10 0 0 1 2 28z" fill="#1c6a50"/><path d="M20 20h18v8a10 10 0 0 1-10 10h-8z" fill="#3aa882"/></svg>`;

export const logo = (cls = '') =>
  `<a class="logo ${cls}" href="/#top" aria-label="Telvo – Startseite">${logoMark()}<span class="logo__word">Telvo</span></a>`;

/**
 * Button / Link-Button.
 * variants: primary | secondary | ghost | light | green
 */
export const button = ({ label, sub, href, variant = 'primary', ic, attrs = '', tag, className = '', type = 'button' }) => {
  const inner = `${ic ? `<span class="btn__icon">${icon(ic)}</span>` : ''}<span class="btn__text"><span class="btn__label">${label}</span>${sub ? `<span class="btn__sub">${sub}</span>` : ''}</span>`;
  const cls = `btn btn--${variant}${sub ? ' btn--two' : ''} ${className}`;
  const t = tag || (href ? 'a' : 'button');
  return t === 'a'
    ? `<a class="${cls}" href="${esc(href)}" ${attrs}>${inner}</a>`
    : `<button type="${type}" class="${cls}" ${attrs}>${inner}</button>`;
};

/** Bild oder – wenn noch nicht geliefert – ruhiger Platzhalter in Markenfarben. */
export const picture = (img, { phIcon = 'headset', loading = 'lazy', sizes = '100vw', cls = '', eager = false } = {}) => {
  if (!img)
    return `<div class="ph ${cls}" role="img" aria-label="Bild folgt">${icon(phIcon)}</div>`;
  const pos = img.position ? ` style="object-position:${img.position}"` : '';
  return `<img class="${cls}" src="${esc(img.src)}"${img.srcset ? ` srcset="${esc(img.srcset)}"` : ''} width="${img.width}" height="${img.height}" alt="${esc(img.alt)}" sizes="${sizes}" ${eager ? 'fetchpriority="high"' : `loading="${loading}"`} decoding="async"${pos}>`;
};

export const sectionHead = ({ eyebrow, title, text, id, dark = false, align = '' }) =>
  `<header class="shead ${align}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2 ${id ? `id="${id}"` : ''} class="h2">${title}</h2>${text ? `<p class="lead">${text}</p>` : ''}</header>`;

/** Gemeinsamer CTA-Helper: Telefonnummer vorhanden -> tel:, sonst Kontaktdialog (keine erfundene Nummer). */
export const demoCall = (cfg, { variant = 'primary', ctx = 'demo' } = {}) => {
  const ph = cfg.company.phone;
  return ph
    ? button({ label: 'Jetzt Demo anrufen', sub: esc(ph.display), href: `tel:${ph.tel}`, variant, ic: 'phone' })
    : button({ label: 'Demo anfragen', sub: 'Demo-Nummer wird bereitgestellt', variant, ic: 'phone', attrs: `data-open-contact="demo"` });
};

export const demoListen = (cfg, { variant = 'secondary' } = {}) =>
  button({
    label: 'Beispielgespräch anhören',
    sub: cfg.demo.audioUrl ? 'Hören Sie, wie Telvo klingt' : 'Aufnahme folgt in Kürze',
    variant, ic: 'play',
    attrs: 'data-demo-play' + (cfg.demo.audioUrl ? '' : ' data-unavailable'),
  });
