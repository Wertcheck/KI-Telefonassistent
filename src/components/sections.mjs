import { esc, icon, logo, button, picture, sectionHead, demoCall, demoListen } from './ui.mjs';

const wave = (n = 34, cls = '') =>
  `<span class="wave ${cls}" aria-hidden="true">${Array.from({ length: n }, (_, i) => {
    const h = 18 + Math.round(Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82);
    return `<i style="--h:${h}%;--d:${(i % 7) * 0.12}s"></i>`;
  }).join('')}</span>`;

/* 1 – Header */
export const header = (c) => `
<header class="site-header" data-header>
  <div class="container header__inner">
    ${logo()}
    <nav class="nav" aria-label="Hauptnavigation">
      <ul>
        <li><a href="/#produkt">Produkt</a></li>
        <li><a href="/#branchen">Branchen</a></li>
        <li><a href="/#preise">Preise</a></li>
        <li><a href="/#so-funktionierts">So funktioniert’s</a></li>
        <li><a href="/#faq">FAQ</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      ${c.loginUrl ? `<a class="nav__login" href="${esc(c.loginUrl)}">Anmelden</a>` : ''}
      ${button({ label: 'Demo ausprobieren', href: '/#demo', variant: 'primary', className: 'btn--sm header__cta' })}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>
        <span class="sr-only">Menü öffnen</span>${icon('menu', 'i-open')}${icon('close', 'i-close')}
      </button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden data-mobile-nav>
    <nav aria-label="Mobile Navigation">
      <ul>
        <li><a href="/#produkt">Produkt</a></li>
        <li><a href="/#branchen">Branchen</a></li>
        <li><a href="/#preise">Preise</a></li>
        <li><a href="/#so-funktionierts">So funktioniert’s</a></li>
        <li><a href="/#faq">FAQ</a></li>
        ${c.loginUrl ? `<li><a href="${esc(c.loginUrl)}">Anmelden</a></li>` : ''}
      </ul>
      ${button({ label: 'Demo ausprobieren', href: '/#demo', variant: 'primary', className: 'btn--block' })}
    </nav>
  </div>
</header>`;

/* 2 – Hero */
export const hero = (c) => `
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">KI, die für Sie ans Telefon geht</p>
      <h1 id="hero-title" class="h1">Mehr Zeit für das&nbsp;Wesentliche.</h1>
      <p class="lead">Unser KI-Telefonassistent nimmt Anrufe professionell entgegen, beantwortet Fragen, vereinbart Termine und erfasst Kundenanliegen – zuverlässig und in Ihrer individuellen Unternehmenssprache.</p>
      <div class="hero__cta">${demoCall(c)}${demoListen(c)}</div>
      <ul class="trust">${c.trust.map((t) => `<li>${icon('check')}${esc(t)}</li>`).join('')}</ul>
    </div>
    <div class="hero__visual">
      <figure class="hero__photo">
        ${picture(c.images.hero, { eager: true, sizes: '(min-width:1024px) 62vw, 100vw', phIcon: 'headset' })}
      </figure>
      <div class="callcard" role="group" aria-label="Beispielansicht: Telvo-Telefonie-Oberfläche">
        <div class="callcard__top">
          <span class="callcard__avatar">${icon('headset')}</span>
          <div><strong>Telvo</strong><span>KI-Telefonassistent</span></div>
          <span class="live"><i></i>Live</span>
        </div>
        ${wave(30)}
        <div class="callcard__time" aria-label="Gesprächsdauer 24 Sekunden">00:24</div>
        <p class="callcard__msg">„Guten Tag, hier ist Telvo. Wie kann ich Ihnen heute weiterhelfen?“</p>
        <p class="example-tag">Beispielansicht</p>
      </div>
      <ul class="statuscards" aria-label="Beispiel: Ablauf eines Anrufs">
        <li>${icon('phone')}<span><strong>Anruf angenommen</strong><small>in 1 Sekunde</small></span></li>
        <li>${icon('doc')}<span><strong>Anliegen erkannt</strong><small>Terminwunsch</small></span></li>
        <li>${icon('calendar')}<span><strong>Termin im Kalender</strong><small>eingetragen</small></span></li>
      </ul>
    </div>
  </div>
</section>`;

/* 3 – Branchen-Leiste */
const INDUSTRIES = [
  { id: 'handwerk', name: 'Handwerk', icon: 'hammer', text: 'Anfragen aufnehmen, Rückrufe und Termine koordinieren – auch wenn Sie auf der Baustelle sind.' },
  { id: 'praxen', name: 'Arztpraxen', strip: 'Praxen', icon: 'pulse', text: 'Terminanfragen, Rezeptwünsche und allgemeine Fragen strukturiert entgegennehmen.' },
  { id: 'kanzleien', name: 'Kanzleien', icon: 'scale', text: 'Erstanfragen aufnehmen, Termine vereinbaren und Informationen weitergeben.' },
  { id: 'immobilien', name: 'Immobilien', icon: 'home', text: 'Interessenten-Anfragen erfassen und Besichtigungstermine abstimmen.' },
  { id: 'onlineshops', name: 'Onlineshops', icon: 'cart', text: 'Fragen zu Bestellungen, Lieferung und Produkten beantworten.' },
  { id: 'dienstleister', name: 'Dienstleister', icon: 'briefcase', text: 'Anrufe annehmen, Anliegen erfassen und Termine vereinbaren.' },
];
const STRIP = ['handwerk', 'praxen', 'immobilien', 'kanzleien', 'onlineshops', 'dienstleister'];

export const industryStrip = () => `
<section class="strip" aria-label="Einsatzbereiche">
  <div class="container"><ul>
    ${STRIP.map((id) => { const i = INDUSTRIES.find((x) => x.id === id); return `<li><a href="/#branche-${id}">${icon(i.icon)}<span>${i.strip || i.name}</span></a></li>`; }).join('')}
  </ul></div>
</section>`;

/* 4 – Funktionen */
const FEATURES = [
  { icon: 'phone', t: 'Anrufe entgegennehmen', d: 'Ihre Kunden erreichen immer einen freundlichen Assistenten, der ihr Anliegen aufnimmt und strukturiert weiterverarbeitet.' },
  { icon: 'calendar', t: 'Termine vereinbaren', d: 'Der Assistent koordiniert Termine und berücksichtigt bei entsprechender Integration verfügbare Zeiten.' },
  { icon: 'doc', t: 'Fragen beantworten', d: 'Häufige Fragen zu Leistungen, Öffnungszeiten und Abläufen werden anhand des Unternehmenswissens beantwortet.' },
  { icon: 'puzzle', t: 'Systeme verbinden', d: 'Telvo kann mit geeigneten Kalendern, CRM-Systemen und weiteren Geschäftsanwendungen verbunden werden.' },
];
export const features = () => `
<section class="section features" id="produkt" aria-labelledby="features-title">
  <div class="container">
    <h2 id="features-title" class="sr-only">Funktionen</h2>
    <ul class="features__grid">
      ${FEATURES.map((f) => `<li class="feature"><span class="roundicon">${icon(f.icon)}</span><h3 class="h4">${f.t}</h3><p>${f.d}</p></li>`).join('')}
    </ul>
  </div>
</section>`;

/* 5 – Branchen */
export const industries = (c) => `
<section class="section section--sand" id="branchen" aria-labelledby="ind-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: 'Für viele Branchen – sofort einsetzbar', title: 'Ein Assistent.<br>Viele Möglichkeiten.', id: 'ind-title' })}
      <p class="lead">Telvo passt sich Ihrer Branche, Ihren Abläufen und Ihren Anforderungen an.</p>
    </div>
    <ul class="cards">
      ${INDUSTRIES.map((i) => `
      <li class="card" id="branche-${i.id}">
        <a class="card__link" href="/#branche-${i.id}" data-open-contact="${i.id}" aria-label="${i.name}: mehr erfahren">
          <div class="card__media">${picture(c.images.industries[i.id], { phIcon: i.icon, sizes: '(min-width:1024px) 30vw, 90vw' })}</div>
          <div class="card__body">
            <h3 class="h4">${i.name}</h3>
            <p>${i.text}</p>
            <span class="card__more">Mehr erfahren ${icon('arrow')}</span>
          </div>
        </a>
      </li>`).join('')}
    </ul>
  </div>
</section>`;

/* 6 – Live-Demo */
export const demo = (c) => {
  const audio = c.demo.audioUrl;
  return `
<section class="demo" id="demo" aria-labelledby="demo-title" data-demo ${audio ? `data-audio="${esc(audio)}"` : ''}>
  <div class="container demo__grid">
    <div class="demo__copy">
      <p class="eyebrow eyebrow--light">Live erleben</p>
      <h2 id="demo-title" class="h2">Testen Sie Telvo selbst.</h2>
      <p class="lead">Rufen Sie unsere Demo an oder erleben Sie ein Beispielgespräch direkt im Browser.</p>
      <div class="stack">${demoCall(c, { variant: 'green' })}${demoListen(c, { variant: 'glass' })}</div>
      <p class="demo__status" role="status" aria-live="polite" data-demo-status>${audio ? '' : 'Das Beispielgespräch wird noch bereitgestellt. Gern zeigen wir Telvo in einer persönlichen Demo.'}</p>
      ${c.demo.transcript ? `<details class="transcript"><summary>Transkript anzeigen</summary><p>${esc(c.demo.transcript)}</p></details>` : ''}
    </div>
    <div class="phone" aria-label="Telvo-Telefonie-Oberfläche">
      <div class="phone__frame">
        <div class="phone__notch" aria-hidden="true"></div>
        <div class="phone__screen">
          <div class="phone__bar" aria-hidden="true"><span>9:41</span><span>●●●</span></div>
          <div class="phone__name">Telvo</div>
          <div class="phone__role">KI-Telefonassistent</div>
          <div class="phone__time" data-demo-time>00:00</div>
          ${wave(36, 'wave--lg')}
          <div class="phone__state" data-demo-state>${audio ? 'Bereit' : 'Beispielansicht'}</div>
          <div class="phone__actions">
            <button type="button" class="round" data-demo-play ${audio ? '' : 'data-unavailable'} aria-label="Beispielgespräch abspielen">${icon('volume')}</button>
            <span class="round round--static" aria-hidden="true">${icon('keypad')}</span>
            <span class="round round--end" aria-hidden="true">${icon('hangup')}</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="checks">
      <li>${icon('check')}<span>Natürlich klingende Gespräche</span></li>
      <li>${icon('check')}<span>Echte Anwendungsszenarien</span></li>
      <li>${icon('check')}<span>Keine Wartezeit</span></li>
      <li>${icon('check')}<span>Jederzeit verfügbar<small>sofern entsprechend konfiguriert</small></span></li>
    </ul>
  </div>
</section>`;
};

/* 7 – So funktioniert's */
const STEPS = [
  ['01', 'Anforderungen besprechen', 'Wir klären, welche Anrufe Ihr Assistent übernehmen soll und welche Systeme eingebunden werden müssen.'],
  ['02', 'Assistent einrichten', 'Wir konfigurieren Gesprächsabläufe, Unternehmenswissen und erforderliche Integrationen.'],
  ['03', 'Testen und starten', 'Sie prüfen die Gesprächsführung und geben den Assistenten nach erfolgreicher Einrichtung frei.'],
];
export const how = (c) => `
<section class="section how" id="so-funktionierts" aria-labelledby="how-title">
  <div class="container how__grid">
    <div>
      ${sectionHead({ eyebrow: 'So funktioniert’s', title: 'In wenigen Schritten zu Ihrem KI-Telefonassistenten.', id: 'how-title' })}
      <ol class="steps">
        ${STEPS.map(([n, t, d]) => `<li><span class="steps__n">${n}</span><h3 class="h4">${t}</h3><p>${d}</p></li>`).join('')}
      </ol>
    </div>
    <figure class="how__img">${picture(c.images.howto, { sizes: '(min-width:1024px) 34vw, 90vw' })}</figure>
  </div>
</section>`;

/* 8 – Preise */
export const pricing = (c) => {
  const p = c.pricing;
  const toggle = p.annual
    ? `<div class="toggle" role="group" aria-label="Abrechnungszeitraum"><button type="button" class="is-on" aria-pressed="true" data-billing="monthly">Monatlich</button><button type="button" aria-pressed="false" data-billing="annual">Jährlich <small>${esc(p.annual.hint || '')}</small></button></div>`
    : '';
  return `
<section class="section section--sand" id="preise" aria-labelledby="price-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: 'Einfach. Transparent. Planbar.', title: 'Unsere Pakete.', id: 'price-title' })}
      <p class="lead">Transparent. Flexibel. Planbar.</p>
    </div>
    ${toggle}
    <ul class="plans">
      ${p.plans.map((pl) => `
      <li class="plan ${pl.featured ? 'plan--featured' : ''}">
        ${pl.badge ? `<span class="plan__badge">${pl.badge}</span>` : ''}
        <div class="plan__head"><span class="roundicon roundicon--sm">${icon(pl.icon)}</span><div><h3 class="h4">${pl.name}</h3><p>${pl.tagline}</p></div></div>
        <p class="plan__price">${pl.from ? '<span class="plan__from">ab</span> ' : ''}<strong data-price-monthly="${pl.monthly}"${p.annual?.prices?.[pl.id] ? ` data-price-annual="${p.annual.prices[pl.id]}"` : ''}>${pl.monthly}</strong> ${p.currency} <span class="plan__per">/ Monat</span></p>
        <p class="plan__setup"><span>Einrichtung</span> ${pl.setup}</p>
        <p class="plan__limit">${icon('clock')}${pl.limit}</p>
        <ul class="plan__features">${pl.features.map((f) => `<li>${icon('check')}${f}</li>`).join('')}</ul>
        ${button({ label: pl.cta, variant: pl.featured ? 'primary' : 'secondary', ic: null, attrs: `data-open-contact="${pl.id}"`, className: 'btn--block' })}
      </li>`).join('')}
    </ul>
    <p class="note">${icon('shield')}<span>${esc(p.extraCostsNote)}</span></p>
  </div>
</section>`;
};

/* 9 – Integrationen */
export const integrations = (c) => {
  const v = c.integrations.verified;
  return `
<section class="section integ" id="integrationen" aria-labelledby="integ-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: 'Nahtlose Integration', title: 'Passt zu Ihren bestehenden Systemen.', id: 'integ-title' })}
      <p class="lead">Telvo wird auf die Systeme abgestimmt, die Ihr Unternehmen verwendet.</p>
    </div>
    <ul class="integ__grid">
      ${c.integrations.categories.map((k) => `
      <li class="integ__item"><span class="roundicon roundicon--sm">${icon(k.icon)}</span><h3 class="h4">${k.name}</h3>
        <ul class="chips">${k.examples.map((e) => `<li class="${v.includes(e) ? 'chip chip--ok' : 'chip'}">${e}</li>`).join('')}</ul></li>`).join('')}
    </ul>
    <p class="note note--plain">${icon('puzzle')}<span><strong>Mögliche Integrationsziele.</strong> ${v.length ? `Bereits getestet: ${v.join(', ')}. ` : ''}Die genannten Anbieter sind Beispiele für Systeme, mit denen Telvo verbunden werden kann – sie sind keine vorab fertigen Standard-Schnittstellen. Was für Ihr System machbar ist, klären wir im Erstgespräch.</span></p>
  </div>
</section>`;
};

/* 10 – FAQ */
const FAQ = [
  ['Wie funktioniert ein KI-Telefonassistent?', 'Ein eingehender Anruf wird vom Assistenten angenommen. Er versteht das Anliegen, beantwortet Fragen anhand des hinterlegten Unternehmenswissens, vereinbart auf Wunsch Termine und erfasst alle wichtigen Angaben strukturiert für Ihr Team.'],
  ['Brauche ich einen Onlineshop?', 'Nein. Telvo ist unabhängig von einem Onlineshop einsetzbar – etwa für Handwerksbetriebe, Praxen, Kanzleien oder Dienstleister. Shopsysteme sind nur eine von mehreren möglichen Anbindungen.'],
  ['Kann Telvo meine bestehende Telefonnummer verwenden?', 'Das hängt von Ihrem Telefonanbieter und Ihrer Telefonanlage ab, etwa über eine Rufumleitung oder Anbindung. Wir prüfen im Erstgespräch gemeinsam, welche Lösung für Sie passt.'],
  ['Kann der Assistent Termine vereinbaren?', 'Ja. Terminprozesse sind Teil des Pakets Business. Auf freie Zeiten greift der Assistent zu, wenn Ihr Kalender angebunden ist; andernfalls nimmt er Terminwünsche auf und leitet sie an Sie weiter.'],
  ['Kann Telvo mit meiner Software verbunden werden?', 'Telvo kann mit geeigneten Kalendern, CRM-Systemen und weiteren Anwendungen verbunden werden. Ob und wie das bei Ihrer Software möglich ist, klären wir vorab im Gespräch.'],
  ['Was passiert bei schwierigen Fragen?', 'Kann der Assistent eine Frage nicht sicher beantworten, erfindet er keine Antwort. Stattdessen nimmt er das Anliegen auf und sorgt – je nach Einrichtung – für einen Rückruf oder die Weiterleitung an Sie.'],
  ['Funktioniert Telvo auch außerhalb der Geschäftszeiten?', 'Ja, der Assistent kann rund um die Uhr Anrufe annehmen. Welche Zeiten gelten und wie außerhalb der Geschäftszeiten verfahren wird, legen Sie bei der Einrichtung fest.'],
  ['Wie lange dauert die Einrichtung?', 'Das hängt vom Umfang der Gesprächsabläufe und der gewünschten Integrationen ab. Im Erstgespräch nennen wir Ihnen einen konkreten Zeitplan.'],
  ['Welche laufenden Kosten entstehen?', 'Es fällt die monatliche Paketgebühr an. Darüber hinaus können Telefonie- und KI-Nutzungskosten oberhalb des Inklusivvolumens entstehen. Was bei Ihnen zu erwarten ist, nennen wir transparent vorab im Angebot.'],
  ['Wie werden Gesprächsdaten verarbeitet?', 'Gesprächsdaten werden nur zum Zweck der vereinbarten Leistung und nach den Vorgaben der DSGVO verarbeitet. Details zu Speicherdauer, Dienstleistern und Auftragsverarbeitung finden Sie in der Datenschutzerklärung und im Beratungsgespräch.'],
];
export const faq = () => `
<section class="section section--sand" id="faq" aria-labelledby="faq-title">
  <div class="container faq__grid">
    <div class="faq__intro">
      ${sectionHead({ eyebrow: 'FAQ', title: 'Alles, was Sie wissen müssen.', id: 'faq-title' })}
      <p class="lead">Ihre Frage ist nicht dabei? Wir antworten gern persönlich.</p>
      ${button({ label: 'Frage stellen', variant: 'secondary', ic: 'mail', attrs: 'data-open-contact="faq"' })}
    </div>
    <div class="accordion" data-accordion>
      ${FAQ.map(([q, a], i) => `
      <div class="acc">
        <h3><button type="button" class="acc__btn" id="acc-btn-${i}" aria-expanded="false" aria-controls="acc-panel-${i}"><span>${q}</span>${icon('chevron')}</button></h3>
        <div class="acc__panel" id="acc-panel-${i}" role="region" aria-labelledby="acc-btn-${i}" hidden><p>${a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>`;

/* 11 – Final CTA */
export const finalCta = () => `
<section class="final" aria-labelledby="final-title">
  <svg class="final__botanic" viewBox="0 0 320 420" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
    <path d="M60 420C70 300 90 200 150 20"/>
    <path d="M78 330c-40-10-60-40-62-80 40 6 62 34 62 80zM92 270c40-14 62-46 60-90-42 10-62 44-60 90zM108 205c-36-14-50-44-48-80 36 8 50 38 48 80zM124 150c34-12 52-40 52-76-36 8-52 36-52 76zM140 90c-22-14-30-34-28-56 24 6 32 26 28 56z"/>
    <path d="M200 420c8-80 30-150 70-230"/>
    <path d="M214 340c34-8 52-34 52-66-34 6-52 30-52 66zM232 270c-30-8-42-32-40-60 30 6 42 28 40 60zM250 220c28-10 42-34 42-62-30 8-42 30-42 62z"/>
  </svg>
  <div class="container final__inner">
    <div class="final__copy">
      <h2 id="final-title" class="h2">Ihr nächster Anruf könnte schon von Telvo übernommen werden.</h2>
      <p class="lead">Lernen Sie kennen, was ein KI-Telefonassistent in Ihrem Unternehmen leisten kann.</p>
      <div class="stack">
        ${button({ label: 'Demo ausprobieren', href: '/#demo', variant: 'green' })}
        ${button({ label: 'Beratung vereinbaren', variant: 'glass', attrs: 'data-open-contact="beratung"' })}
      </div>
    </div>
  </div>
</section>`;

/* 12 – Footer */
export const footer = (c) => {
  const co = c.company;
  const L = c.legal;
  const legal = (url, page, label) => `<li><a href="${esc(url || page)}"${url ? ' rel="noopener"' : ''}>${label}</a></li>`;
  return `
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      ${logo()}
      <p>${esc(c.brand.description)}</p>
      <p class="footer__copy">© ${new Date().getFullYear()} ${esc(co.legalName || c.brand.name)}. Alle Rechte vorbehalten.</p>
    </div>
    <nav aria-label="Produkt"><h3 class="footer__h">Produkt</h3><ul>
      <li><a href="/#produkt">Funktionen</a></li><li><a href="/#branchen">Branchen</a></li><li><a href="/#preise">Preise</a></li><li><a href="/#so-funktionierts">So funktioniert’s</a></li><li><a href="/#faq">FAQ</a></li></ul></nav>
    <nav aria-label="Unternehmen"><h3 class="footer__h">Unternehmen</h3><ul>
      ${c.links.about ? `<li><a href="${esc(c.links.about)}">Über uns</a></li>` : ''}
      <li><button type="button" class="linklike" data-open-contact="kontakt">Kontakt</button></li></ul></nav>
    <nav aria-label="Rechtliches"><h3 class="footer__h">Rechtliches</h3><ul>
      ${legal(L.imprintUrl, '/impressum.html', 'Impressum')}${legal(L.privacyUrl, '/datenschutz.html', 'Datenschutz')}
      <li><button type="button" class="linklike" data-open-cookies>Cookie-Einstellungen</button></li>
      ${legal(L.termsUrl, '/agb.html', 'AGB')}</ul></nav>
    <div><h3 class="footer__h">Kontakt</h3><ul class="footer__contact">
      ${co.email ? `<li>${icon('mail')}<a href="mailto:${esc(co.email)}">${esc(co.email)}</a></li>` : ''}
      ${co.phone ? `<li>${icon('phone')}<a href="tel:${esc(co.phone.tel)}">${esc(co.phone.display)}</a></li>` : ''}
      ${co.location ? `<li>${icon('pin')}<span>${esc(co.location)}</span></li>` : ''}
      ${co.social.map((s) => `<li><a href="${esc(s.href)}" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}
      <li><button type="button" class="linklike" data-open-contact="kontakt">Nachricht schreiben</button></li>
    </ul></div>
  </div>
</footer>`;
};

/* Dialoge: Kontakt & Cookies */
export const dialogs = (c) => `
<dialog class="dialog" id="contact-dialog" aria-labelledby="contact-title" data-contact data-endpoint="${esc(c.contact.formEndpoint || '')}" data-email="${esc(c.company.email || '')}">
  <form method="dialog" class="dialog__close-form"><button class="dialog__x" aria-label="Schließen">${icon('close')}</button></form>
  <h2 id="contact-title" class="h3">Sprechen wir über Ihren Telefonassistenten.</h2>
  <p class="dialog__lead" data-contact-lead>Hinterlassen Sie uns Ihre Nachricht – wir melden uns bei Ihnen.</p>
  <form class="form" data-contact-form novalidate>
    <label>Name<input name="name" autocomplete="name" required></label>
    <label>E-Mail<input name="email" type="email" autocomplete="email" required></label>
    <label>Telefon <span class="opt">(optional)</span><input name="phone" type="tel" autocomplete="tel"></label>
    <label>Unternehmen / Branche <span class="opt">(optional)</span><input name="company" autocomplete="organization"></label>
    <label>Anliegen<select name="topic">
      <option value="demo">Demo</option><option value="beratung">Beratung</option>
      ${c.pricing.plans.map((p) => `<option value="${p.id}">Paket ${p.name}</option>`).join('')}
      <option value="faq">Allgemeine Frage</option><option value="kontakt">Sonstiges</option></select></label>
    <label>Nachricht <span class="opt">(optional)</span><textarea name="message" rows="3"></textarea></label>
    <label class="check"><input type="checkbox" name="consent" required><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Siehe <a href="${esc(c.legal.privacyUrl || '/datenschutz.html')}">Datenschutz</a>.</span></label>
    <p class="form__msg" role="alert" data-contact-msg hidden></p>
    ${button({ label: 'Anfrage senden', variant: 'primary', type: 'submit', attrs: 'data-submit', className: 'btn--block' })}
  </form>
</dialog>

<dialog class="dialog dialog--sm" id="cookie-dialog" aria-labelledby="cookie-title">
  <form method="dialog" class="dialog__close-form"><button class="dialog__x" aria-label="Schließen">${icon('close')}</button></form>
  <h2 id="cookie-title" class="h3">Cookie-Einstellungen</h2>
  <p>Diese Website setzt aktuell nur technisch notwendige Speicherung ein und verwendet keine Tracking- oder Marketing-Cookies. Es ist daher keine Einwilligung erforderlich.</p>
  <p class="dialog__small">Sollten künftig optionale Dienste eingebunden werden, können Sie Ihre Auswahl hier verwalten.</p>
</dialog>
<div class="toast" role="status" aria-live="polite" data-toast hidden></div>`;
