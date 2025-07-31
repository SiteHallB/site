window._klaroConsentListeners = window._klaroConsentListeners || [];

function notifyConsentChange(service, consent) {
    window._klaroConsentListeners.forEach(cb => cb(service, consent));
}

var klaroConfig = {
  elementID: 'klaro',
  storageMethod: 'cookie',
  storageName: 'klaro',
  cookieExpiresAfterDays: 365,
  privacyPolicy: '/politique-confidentialite', // À personnaliser
  default: false, // aucun service activé par défaut
  mustConsent: true, // pas de navigation sans consentement
  acceptAll: true,

  translations: {
    fr: {
      consentModal: {
        title: "Gestion des cookies",
        description:
          "Nous utilisons des cookies pour assurer le bon fonctionnement du site, améliorer votre expérience et protéger les formulaires contre le spam et les bots.",
      },
      hcaptcha: {
        description: "Service hCaptcha pour sécuriser le formulaire de contact contre les robots.",
      },
      purposes: {
        security: "Sécurité et protection anti-spam"
      },
      save: "Sauvegarder",
      acceptAll: "Tout accepter",
      acceptSelected: "Accepter la sélection",
      decline: "Tout refuser",
    }
  },
  apps: [
    {
      name: "hcaptcha",
      title: "hCaptcha",
      purposes: ["security"],
      cookies: [
        /^_cfduid$/, // ex. cookies Cloudflare
        "hmt_id",    // ex. cookies hcaptcha (adapter selon besoins)
      ],
      required: false,
      default: false,
      onlyOnce: true,
      callback: function(consent, app) {
        notifyConsentChange(app.name, consent);
        // ... (autres log éventuels)
      }
    }
    // tu peux ajouter ici d'autres apps (Analytics, etc)
  ],
}
