window._klaroConsentListeners = window._klaroConsentListeners || [];

function notifyConsentChange(service, consent) {
    window._klaroConsentListeners.forEach(cb => cb(service, consent));
}

let lastGaConsent = null;
let lastSportigoConsent = null;

var klaroConfig = {
    elementID: 'klaro',
    storageMethod: 'cookie',
    storageName: 'klaro',
    cookieExpiresAfterDays: 365,
    privacyPolicy: '/politique-confidentialite',
    acceptAll: true,
    declineAll: true, 

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
            googleAnalytics: {
                description: "Google Analytics est un service d'analyse de la fréquentation du site proposé par Google. Les données collectées sont anonymes et permettent de mesurer l'audience et l'utilisation du site pour en améliorer le contenu.",
            }, 
            sportigo: {
                description: "Sportigo gère votre compte club et permet de voir formules, plannings en ligne. Il peut utiliser des cookies pour la session.",
            },
            purposes: {
                security: "Sécurité", 
                analytics: "Mesure d'audience",
                fonctionnalité: "Fonctionnalités",
            },
            save: "Sauvegarder",
            acceptSelected: "Accepter la sélection", 
            acceptAll: "Tout accepter",
            declineAll: "Tout refuser",
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
            name: "googleAnalytics",
            title: "Google Analytics",
            purposes: ["analytics"],
            cookies: [
                /^_ga/, 
                /^_gid/, 
                /^_gat/, 
                /^_ga_[A-Z0-9]+/,
                /^_gat_gtag_[A-Z0-9]+/,
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
                notifyConsentChange(app.name, consent);
                if (app && app.name === "google-analytics") {
                    if (lastGaConsent !== null && lastGaConsent !== consent) {
                        setTimeout(() => window.location.reload(), 0);
                    }
                    lastGaConsent = consent;
                }
            },
        },
        {
            name: 'sportigo',
            title: 'Sportigo',
            purposes: ['fonctionnalité'],
            cookies: [
                [/^intercom-session-/]
            ],
            required: false,
            default: false,
            onlyOnce: false,
            callback: function(consent, app) {
                notifyConsentChange(app.name, consent);
                if (app && app.name === "sportigo") {
                    if (lastSportigoConsent !== null && lastSportigoConsent !== consent) {
                        setTimeout(() => window.location.reload(), 0);
                    }
                    lastSportigoConsent = consent;
                }
            }
        },
    ],
}
