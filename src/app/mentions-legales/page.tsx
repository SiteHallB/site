import ReactMarkdown from "react-markdown";

export default function PolitiqueConfidentialitePage() {
    return (
        <main className="text-foreground-base bg-background-base py-subMenu px-content lg:px-contentLg">
<ReactMarkdown>{`
# Mentions légales – Hall B
Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), nous vous informons des éléments suivants :

## 1. Éditeur du site
+ Nom commercial : Hall B
+ Raison sociale : [SAS HALL B ou autre structure juridique]
+ Forme juridique : Société par actions simplifiée (SAS)
+ Capital social : [à compléter] €
+ Adresse du siège social : [Adresse complète]
+ Numéro SIRET : [à compléter]
+ Numéro RCS : [Ville d’immatriculation]
+ Responsable de publication : [Ton nom, ou un représentant légal]
+ Contact : [Email professionnel]

## 2. Hébergeur
Vercel Inc.
340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis https://vercel.com

## 3. Propriété intellectuelle
L’ensemble du site (structure, design, contenu, textes, images, logos, vidéos…) est la propriété exclusive de Hall B, sauf mentions contraires.
Toute reproduction, représentation, adaptation ou publication, même partielle, est strictement interdite sans autorisation écrite préalable.

## 4. Conditions d’utilisation
L’utilisation du site Hall B implique l’acceptation pleine et entière des présentes mentions légales.
Celles-ci peuvent être modifiées à tout moment ; les utilisateurs sont invités à les consulter régulièrement.

## 5. Données personnelles
Les traitements de données personnelles effectués via ce site sont détaillés dans notre politique de confidentialité.
Conformément à la loi Informatique et Libertés et au RGPD, vous disposez de droits d’accès, de rectification et de suppression.
Pour les exercer : [email professionnel].

## 6. Responsabilité
L’éditeur du site décline toute responsabilité en cas d’erreur ou d’omission dans le contenu, ainsi qu’en cas d’interruption ou de dysfonctionnement du site.
`}</ReactMarkdown>
        </main>
    );
}
