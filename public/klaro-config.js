window._klaroConsentListeners = window._klaroConsentListeners || [];

function notifyConsentChange(service, consent) {
    window._klaroConsentListeners.forEach(cb => cb(service, consent));
}

var klaroConfig = {
    elementID: 'klaro',
    storageMethod: 'cookie',
    storageName: 'klaro',
    cookieExpiresAfterDays: 365,
    privacyPolicy: '/politique-confidentialite',
    default: false,
    mustConsent: true,
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
    services: [
        {
            name: "hcaptcha",
            title: "hCaptcha",
            purposes: ["security"],
            cookies: [],
            required: false,
            default: false,
            onlyOnce: true,
            callback: function(consent, app) { notifyConsentChange(app.name, consent); }
        }
    ],
}
