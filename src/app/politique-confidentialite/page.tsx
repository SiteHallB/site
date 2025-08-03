import ReactMarkdown from "react-markdown";

export default function PolitiqueConfidentialitePage() {
    return (
        <main className="text-foreground-base bg-background-base py-subMenu px-content lg:px-contentLg">
<ReactMarkdown>{`
# Politique de confidentialité – Hall B
Dernière mise à jour : 03/08/2025

## 1. Responsable du traitement
Le site Hall B est édité par :
Société [Nom de la société ou structure]
Adresse : [Adresse]
E-mail de contact : [Email]
SIRET : [Numéro SIRET]

## 2. Hébergement
Le site est hébergé par : Vercel Inc.
340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis

Les données sont hébergées sur des serveurs principalement situés dans l’Union Européenne. Toutefois, certains transferts hors UE peuvent être effectués dans le cadre de l’exploitation technique du service.

Politique de confidentialité de Vercel : https://vercel.com/legal/privacy-policy

## 3. Données collectées

### a. Navigation
Des données de navigation sont collectées à des fins statistiques via Google Analytics, uniquement après recueil de votre consentement.

### b. Sécurité des formulaires
Nous utilisons hCaptcha pour protéger les formulaires contre les robots et le spam.
hCaptcha peut collecter des informations techniques (adresse IP, empreinte navigateur) pour assurer la sécurité du service. 

Voir : [Politique de confidentialité hCaptcha]([]).

### c. Contenus multimédias & CDN
Nos images et fichiers statiques peuvent être servis via le réseau Bunny.net (CDN). Des données techniques (adresse IP, logs anonymisés) peuvent être collectées à cette occasion.

Voir : [Politique de confidentialité Bunny.net]([]).

### d. Intégration Sportigo
Certaines fonctionnalités sportives sont assurées via la plateforme Sportigo. Si vous utilisez ces fonctionnalités, des données techniques ou personnelles (liées à la gestion des réservations/abonnements) peuvent être traitées par ce prestataire, selon ses propres engagements de confidentialité.

Voir : [Politique de confidentialité Sportigo]([]).

## 4. Cookies
Ce site utilise des cookies pour :

+ Google Analytics (statistiques)
+ hCaptcha (sécurité, protection anti-spam)
+ Sportigo (si dépôt de cookies, session, tracking)
+ Bunny.net (si cookie de session/optimisation, généralement rare)

Lors de votre première visite, un bandeau vous informe de l’utilisation de ces cookies. Vous pouvez changer votre consentement à tout moment via le bouton "gérer mes cookies" en pied de page. Aucun cookie non essentiel n’est déposé sans votre consentement préalable.
La gestion des cookies est assurée par la plateforme Klaro, conforme au RGPD.

## 5. Destinataires
Les services tiers listés ci-dessus peuvent également accéder à certaines données, selon leur finalité propre, et sous réserve de leur propre politique de confidentialité. Aucun partenaire tiers ne reçoit de données à des fins commerciales sans votre consentement.

## 6. Durée de conservation
Données de formulaire de contact : 1 an après réception

Données de navigation (Google Analytics) : 14 mois maximum

## 7. Vos droits
Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :

+ Droit d’accès
+ Droit de rectification
+ Droit à l’effacement
+ Droit à la limitation
+ Droit d’opposition
+ Droit à la portabilité

Vous pouvez exercer ces droits en nous contactant à : [email à compléter]



Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL : https://www.cnil.fr
`}</ReactMarkdown>
        </main>
    );
}
