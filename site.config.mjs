/**
 * Zentrale Konfiguration der Telvo-Website.
 * Alles, was `null` ist, ist noch nicht festgelegt. Die Website verhält sich dann
 * ehrlich: Es werden keine Werte erfunden, betroffene Elemente weichen auf den
 * Kontaktdialog aus oder werden ausgeblendet.
 */
export default {
  siteUrl: null, // z. B. "https://www.telvo.de" – für Canonical & Open-Graph-Bild
  lang: 'de',
  brand: {
    name: 'Telvo',
    claim: 'KI-Telefonassistent',
    description:
      'Telvo ist Ihr KI-Telefonassistent: Er nimmt Anrufe entgegen, beantwortet Fragen, koordiniert Termine und erfasst Kundenanliegen.',
  },

  company: {
    legalName: null, // Firmenname laut Impressum
    address: null, // { street, zip, city }
    location: null, // Kurzform für Footer, z. B. "Berlin, Deutschland"
    email: null, // Kontakt-E-Mail
    phone: null, // { display: '+49 30 …', tel: '+4930…' } – Demo- und Kontaktnummer
    social: [], // [{ label: 'LinkedIn', href: 'https://…' }]
  },

  /** Konto-Login – nur anzeigen, wenn es ihn wirklich gibt. */
  loginUrl: null,

  /** Formular-Versand: bevorzugt Endpoint (z. B. Formspree/eigene API), sonst mailto an company.email. */
  contact: { formEndpoint: null },

  demo: {
    /** Pfad/URL einer echten Aufnahme, z. B. "/audio/beispielgespraech.mp3" (Datei in public/audio/ ablegen). */
    audioUrl: null,
    /** Textalternative/Transkript zur Aufnahme (Barrierefreiheit). */
    transcript: null,
  },

  /** Rechtstexte: URLs auf externe, rechtlich geprüfte Seiten – sonst werden Platzhalterseiten erzeugt. */
  legal: { imprintUrl: null, privacyUrl: null, termsUrl: null },
  links: { about: null },

  trust: [
    'Rund um die Uhr einsetzbar',
    'Individuell auf Ihre Abläufe eingerichtet',
    'Datenschutz nach DSGVO',
  ],

  /** Bilder in public/images/. `null` = Bild folgt, es wird ein neutraler Platzhalter gerendert. */
  images: {
    hero: {
      src: '/images/hero-callcenter.webp',
      srcset: '/images/hero-callcenter-800.webp 800w, /images/hero-callcenter.webp 1600w',
      width: 1600,
      height: 899,
      alt: 'Freundliche Mitarbeiterin mit Headset an einem modernen Arbeitsplatz im Callcenter, auf den Monitoren Telvo-Gesprächs- und Kundeninformationen',
    },
    howto: {
      src: '/images/hero-callcenter.webp',
      width: 1600,
      height: 899,
      alt: 'Callcenter-Arbeitsplatz mit Telvo-Oberfläche',
      position: '12% 50%',
    },
    industries: {
      handwerk: { src: '/images/branche-handwerk.webp', width: 900, height: 600, alt: 'Handwerker telefoniert gut gelaunt vor seinem Transporter', position: '38% 30%' },
      praxen: null,
      kanzleien: null,
      immobilien: null,
      onlineshops: null,
      dienstleister: null,
    },
  },

  /** Preise zentral. `annual: null` => kein Abrechnungs-Umschalter. */
  pricing: {
    currency: '€',
    annual: null,
    extraCostsNote:
      'Nicht enthalten sind Telefonie- und KI-Nutzungskosten über das Inklusivvolumen hinaus sowie Kosten für Drittsysteme. Was bei Ihrem Anrufvolumen anfällt, nennen wir Ihnen vorab im Angebot. Alle Preise netto zzgl. gesetzlicher USt., sofern nicht anders angegeben.',
    plans: [
      {
        id: 'starter', name: 'Starter', tagline: 'Für kleine Unternehmen',
        monthly: '99', setup: '499 € einmalig', from: false, limit: 'Bis zu 500 Gesprächsminuten / Monat',
        features: ['Grundlegende Gesprächsführung', 'Eine Standardintegration', 'Basis-Auswertungen (sofern verfügbar)', 'E-Mail-Support'],
        cta: 'Starter anfragen', icon: 'sprout',
      },
      {
        id: 'business', name: 'Business', tagline: 'Für wachsende Unternehmen', featured: true, badge: 'Beliebteste Wahl',
        monthly: '299', setup: '999 € einmalig', from: false, limit: 'Bis zu 2.500 Gesprächsminuten / Monat',
        features: ['Erweiterte Gesprächsabläufe', 'Terminprozesse', 'Bis zu zwei Standardintegrationen', 'Individuelle Wissensbasis', 'Erweiterte Auswertungen', 'Priorisierter Support'],
        cta: 'Business anfragen', icon: 'chart',
      },
      {
        id: 'enterprise', name: 'Enterprise', tagline: 'Für komplexe Anforderungen',
        monthly: '599', setup: 'ab 2.500 € einmalig', from: true, limit: 'Individuelles Gesprächsvolumen',
        features: ['Individuelle Gesprächsabläufe', 'Komplexere Systemintegrationen', 'Mehrere Abteilungen oder Standorte', 'Individuelle Konfiguration', 'Optionale Service-Level-Vereinbarungen', 'Persönliche Betreuung'],
        cta: 'Individuelles Angebot', icon: 'building',
      },
    ],
  },

  /** Nur Einträge in `verified` dürfen als bestehende Integration gelten. Aktuell: keine bestätigt. */
  integrations: {
    verified: [],
    categories: [
      { icon: 'calendar', name: 'Kalender', examples: ['Google Calendar', 'Microsoft Outlook'] },
      { icon: 'users', name: 'CRM', examples: ['HubSpot'] },
      { icon: 'cart', name: 'Shopsysteme', examples: ['Shopify'] },
      { icon: 'calculator', name: 'Buchhaltung', examples: ['Lexoffice', 'DATEV'] },
      { icon: 'layers', name: 'Branchensoftware', examples: ['Praxis-, Kanzlei- und Handwerkssoftware'] },
      { icon: 'code', name: 'Individuelle APIs', examples: ['Eigene Schnittstellen'] },
    ],
  },
};
