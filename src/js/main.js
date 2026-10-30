'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Toast */
const toastEl = $('[data-toast]');
let toastTimer;
const toast = (msg) => {
  if (!toastEl) return;
  toastEl.textContent = msg; toastEl.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (toastEl.hidden = true), 5000);
};

/* Sticky Header */
const header = $('[data-header]');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll(); addEventListener('scroll', onScroll, { passive: true });

/* Mobile-Navigation */
const toggle = $('[data-menu-toggle]'), mnav = $('[data-mobile-nav]');
const setMenu = (open) => {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.sr-only').textContent = open ? 'Menü schließen' : 'Menü öffnen';
  mnav.hidden = !open;
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
mnav?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });
matchMedia('(min-width:901px)').addEventListener('change', (m) => m.matches && setMenu(false));

/* Accordion (WAI-ARIA: Buttons, aria-expanded, Pfeiltasten/Home/End) */
$$('[data-accordion]').forEach((acc) => {
  const btns = $$('.acc__btn', acc);
  btns.forEach((b, i) => {
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
    b.addEventListener('keydown', (e) => {
      const k = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: btns.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault(); btns[(k + btns.length) % btns.length].focus();
    });
  });
});

/* Dialoge */
const contact = $('#contact-dialog'), cookies = $('#cookie-dialog');
const backdropClose = (d) => d?.addEventListener('click', (e) => { if (e.target === d) d.close(); });
backdropClose(contact); backdropClose(cookies);
const openers = new Map();
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open-contact]');
  if (o) {
    e.preventDefault();
    if (o.hasAttribute('data-unavailable')) return;
    const topic = o.dataset.openContact;
    const sel = $('select[name=topic]', contact);
    const known = $$('option', sel).some((x) => x.value === topic);
    sel.value = known ? topic : (['handwerk','praxen','kanzleien','immobilien','onlineshops','dienstleister'].includes(topic) ? 'beratung' : 'kontakt');
    if (['handwerk','praxen','kanzleien','immobilien','onlineshops','dienstleister'].includes(topic)) {
      const ta = $('textarea', contact); if (!ta.value) ta.value = `Ich interessiere mich für Telvo im Bereich: ${o.getAttribute('aria-label')?.split(':')[0] || topic}.`;
    }
    $('[data-contact-msg]', contact).hidden = true;
    contact.showModal();
  }
  if (e.target.closest('[data-open-cookies]')) cookies.showModal();
});

const form = $('[data-contact-form]');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = $('[data-contact-msg]', contact);
  const show = (t, kind) => { msg.textContent = t; msg.className = 'form__msg is-' + kind; msg.hidden = false; };
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = Object.fromEntries(new FormData(form));
  delete data.consent;
  const { endpoint, email } = contact.dataset;
  const btn = $('[data-submit]', form); btn.disabled = true;
  try {
    if (endpoint) {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      show('Vielen Dank! Ihre Anfrage ist eingegangen – wir melden uns bei Ihnen.', 'ok'); form.reset();
    } else if (email) {
      const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${email}?subject=${encodeURIComponent('Telvo-Anfrage: ' + data.topic)}&body=${encodeURIComponent(body)}`;
      show('Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Nachricht dort ab.', 'ok');
    } else {
      show('Das Kontaktformular ist noch nicht an einen Empfänger angebunden. Bitte versuchen Sie es später erneut.', 'error');
    }
  } catch (err) {
    show('Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.', 'error');
  } finally { btn.disabled = false; }
});

/* Demo: echte Audiowiedergabe; Animation/Zeit nur während tatsächlicher Wiedergabe */
const demo = $('[data-demo]');
if (demo) {
  const src = demo.dataset.audio;
  const status = $('[data-demo-status]', demo), state = $('[data-demo-state]', demo), time = $('[data-demo-time]', demo);
  const btns = $$('[data-demo-play]');
  let audio;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const setPlaying = (p) => {
    demo.classList.toggle('is-playing', p);
    state.textContent = p ? 'Beispielgespräch läuft' : 'Bereit';
    btns.forEach((b) => { b.setAttribute('aria-pressed', String(p)); const l = b.querySelector('.btn__label'); if (l) l.textContent = p ? 'Beispielgespräch pausieren' : 'Beispielgespräch anhören'; if (b.classList.contains('round')) b.setAttribute('aria-label', p ? 'Beispielgespräch pausieren' : 'Beispielgespräch abspielen'); });
  };
  btns.forEach((b) => b.addEventListener('click', async () => {
    if (!src) { status.textContent = 'Das Beispielgespräch wird noch bereitgestellt. Gern zeigen wir Telvo in einer persönlichen Demo.'; toast('Das Beispielgespräch ist noch nicht verfügbar.'); if (!demo.matches(':focus-within')) demo.scrollIntoView({ behavior: 'smooth' }); return; }
    if (!audio) {
      audio = new Audio(src); audio.preload = 'none';
      audio.addEventListener('timeupdate', () => (time.textContent = fmt(audio.currentTime)));
      audio.addEventListener('ended', () => { setPlaying(false); time.textContent = '00:00'; });
      audio.addEventListener('pause', () => setPlaying(false));
      audio.addEventListener('playing', () => setPlaying(true));
      audio.addEventListener('error', () => { setPlaying(false); status.textContent = 'Die Aufnahme konnte nicht geladen werden.'; });
    }
    if (audio.paused) { try { await audio.play(); status.textContent = ''; } catch { status.textContent = 'Wiedergabe nicht möglich. Bitte erneut versuchen.'; } } else audio.pause();
    if (location.hash !== '#demo' && b.closest('.hero')) demo.scrollIntoView({ behavior: 'smooth' });
  }));
}

/* Abrechnungs-Umschalter (nur gerendert, wenn Jahrespreise konfiguriert sind) */
$$('[data-billing]').forEach((b) => b.addEventListener('click', () => {
  const annual = b.dataset.billing === 'annual';
  $$('[data-billing]').forEach((x) => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
  $$('[data-price-monthly]').forEach((p) => (p.textContent = annual && p.dataset.priceAnnual ? p.dataset.priceAnnual : p.dataset.priceMonthly));
}));
