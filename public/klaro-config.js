window._klaroConsentListeners = window._klaroConsentListeners || [];

function notifyConsentChange(service, consent) {
    window._klaroConsentListeners.forEach(cb => cb(service, consent));
}

let lastGaConsent = null;

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
                description: "hCaptcha protège ce site des robots. Ce service est essentiel au fonctionnement du formulaire.",
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
            cookies: [
                "_cf_bm",
                "hc_access",
                "hmt_id",
                "hmt_b",
                "hc_token",
            ],
            required: false,
            default: false,
            onlyOnce: true,
            callback: function(consent, app) { notifyConsentChange(app.name, consent); }
        }, 
        {
            name: "google-analytics",
            title: "Google Analytics",
            purposes: ["analytics"],
            cookies: [
                /^_ga/, 
                /^_gid/, 
                /^_gat/, 
                "AMP_TOKEN", 
                "_gac_*", 
                "NID",
                "__Secure-3PAPISID",
                "__Secure-3PSID",
                "__Secure-3PSIDCC",
            ],
            required: false,
            default: false,
            onlyOnce: true,
            callback: function(consent, app) {
                if (app && app.name === "google-analytics") {
                    if (lastGaConsent !== null && lastGaConsent !== consent) {
                        setTimeout(() => window.location.reload(), 100);
                    }
                    lastGaConsent = consent;
                }
            },
        },
    ],
}
