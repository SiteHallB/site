/**
 * Seed du CMS : importe tout le contenu actuel du site (textes, images, tarifs,
 * cours, FAQ, pages locales…) dans la base Payload.
 *
 * Utilisation : pnpm seed
 * Idempotent : peut être relancé sans créer de doublons (recherche par slug / nom de fichier).
 */
import path from "path";
import { fileURLToPath } from "url";
import nextEnv from "@next/env";
import type { Payload } from "payload";

import { md } from "./lexical";
import { COURS } from "./cours-data";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(dirname, "../../..");
const PUBLIC_DIR = path.resolve(RACINE, "public");

// Charge .env.local / .env avant l'initialisation de Payload (import dynamique plus bas).
nextEnv.loadEnvConfig(RACINE);

const ctx = { skipRevalidate: true };

/* ─── Médias ──────────────────────────────────────────────────────────────── */

const mediaIds: Record<string, number> = {};

async function ensureMedia(payload: Payload, fichier: string, alt: string): Promise<number> {
    const nom = path.basename(fichier);
    const existant = await payload.find({
        collection: "media",
        where: { filename: { equals: nom } },
        limit: 1,
    });
    if (existant.docs[0]) return existant.docs[0].id as number;

    const doc = await payload.create({
        collection: "media",
        data: { alt },
        filePath: path.resolve(PUBLIC_DIR, fichier),
        context: ctx,
    });
    return doc.id as number;
}

async function seedMedias(payload: Payload) {
    const liste: [string, string, string][] = [
        // clé, fichier (relatif à public/), texte alternatif
        ["logo", "images/logo.png", "Logo HALL B"],
        ["vue_plateau_1", "images/vue_plateau_1.webp", "Vue de l'ensemble du plateau de musculation"],
        ["vue_plateau_2", "images/vue_plateau_2.webp", "Plateau de musculation et jardinière centrale"],
        ["salle_rpm", "images/salle_rpm.webp", "Salle de cours de vélo collectifs (rpm)"],
        ["poids_qualibres", "images/poids_qualibres.webp", "Machines avec poids qualibrés pour la compétition"],
        ["salle_cardio", "images/salle_cardio.webp", "Salle cardio avec de nombreux tapis de course et une atmosphère lumineuse"],
        ["sacs_boxe_1", "images/sacs_boxe_1.webp", "Salle avec sacs de frappes et altères"],
        ["sacs_boxe_2", "images/sacs_boxe_2.webp", "Salle avec sacs de frappes"],
        ["salle_danse", "images/salle_danse.webp", "Salle de danse avec mirroir et logo HALL B"],
        ["salle_coursco", "images/salle_coursco.webp", "Salle de cours collectifs avec mirroir et logos HALL B"],
        ["piscine", "images/piscine.webp", "Bassin d'aquagym avec professeure et pratiquants"],
        ["crossfit", "images/crossfit.webp", "Allée crossfits et machines de musculation"],
        ["equipe", "images/equipe.webp", "L'équipe de coachs HALL B dans la salle de sport de Saint-Dionisy"],
        ["squash", "images/squash.webp", "Terrain de squash HALL B"],
        ["bebe_nageur", "images/bebe_nageur.webp", "Flyer bébés nageurs HALL B"],
        ["pannata", "images/pannata.png", "Logo Pannata"],
        ["technogym", "images/technogym.png", "Logo Technogym"],
        ["pallini", "images/pallini.png", "Logo Pallini"],
        ["poster_desktop", "images/video-desktop-poster.webp", "Aperçu vidéo de la salle HALL B (ordinateur)"],
        ["poster_mobile", "images/video-mobile-poster.webp", "Aperçu vidéo de la salle HALL B (mobile)"],
        ["og_image", "favicon/og-image.jpg", "HALL B salle de sport Saint Dionisy"],
        // Plannings
        ["pl_bureau", "images/plannings/bureau.svg", "Planning activités HALL B"],
        ["pl_lundi", "images/plannings/lundi.svg", "Planning lundi activités HALL B"],
        ["pl_mardi", "images/plannings/mardi.svg", "Planning mardi activités HALL B"],
        ["pl_mercredi", "images/plannings/mercredi.svg", "Planning mercredi activités HALL B"],
        ["pl_jeudi", "images/plannings/jeudi.svg", "Planning jeudi activités HALL B"],
        ["pl_vendredi", "images/plannings/vendredi.svg", "Planning vendredi activités HALL B"],
        ["pl_samedi", "images/plannings/samedi.svg", "Planning samedi activités HALL B"],
        ["pl_danse", "images/plannings/danse.svg", "Planning danse activités HALL B"],
        ["pl_aqua_bureau", "images/plannings/aqua_bureau.svg", "Planning aqua HALL B"],
        ["pl_aqua_lundi", "images/plannings/aqua_lundi.svg", "Planning lundi aqua HALL B"],
        ["pl_aqua_mardi", "images/plannings/aqua_mardi.svg", "Planning mardi aqua HALL B"],
        ["pl_aqua_mercredi", "images/plannings/aqua_mercredi.svg", "Planning mercredi aqua HALL B"],
        ["pl_aqua_jeudi", "images/plannings/aqua_jeudi.svg", "Planning jeudi aqua HALL B"],
        ["pl_aqua_vendredi", "images/plannings/aqua_vendredi.svg", "Planning vendredi aqua HALL B"],
        // Illustrations des activités
        ["ic_yoga", "images/plannings/yoga.svg", "Illustration yoga"],
        ["ic_zap", "images/plannings/zap.svg", "Illustration éclair"],
        ["ic_dance", "images/plannings/dance.svg", "Illustration danse"],
        ["ic_leg", "images/plannings/leg.svg", "Illustration jambe"],
        ["ic_weight", "images/plannings/weight.svg", "Illustration haltère"],
        ["ic_stairs", "images/plannings/stairs.svg", "Illustration escaliers"],
        ["ic_bike", "images/plannings/bike_exercise.svg", "Illustration vélo d'exercice"],
        ["ic_fist", "images/plannings/fist.svg", "Illustration poing"],
    ];

    for (const [cle, fichier, alt] of liste) {
        mediaIds[cle] = await ensureMedia(payload, fichier, alt);
    }
    console.log(`Médias : ${Object.keys(mediaIds).length} fichiers importés.`);
}

/* ─── Réglages globaux ────────────────────────────────────────────────────── */

async function seedReglages(payload: Payload) {
    await payload.updateGlobal({
        slug: "theme",
        context: ctx,
        data: {
            logo: mediaIds.logo,
            couleurs: {
                accent: "#E1C340",
                fondPrincipal: "#121212",
                fondCartes: "#242424",
                fondSombre: "#000000",
                texte: "#FFFFFF",
                texteAttenue: "#FFFFFF99",
                positif: "#15803D",
                negatif: "#EF4444",
            },
            polices: { titres: "futuretense", corps: "montserrat" },
        },
    });

    await payload.updateGlobal({
        slug: "coordonnees",
        context: ctx,
        data: {
            telephone: "04 66 19 16 76",
            email: "contact@hallb.fr",
            adresse: {
                rue: "1 chemin Azord",
                codePostal: "30980",
                ville: "Saint Dionisy",
                affichage: "1 Chem. d'Azord, 30980 Saint-Dionisy",
                lienGoogleMaps: "https://maps.app.goo.gl/8NkxFXwWUCSQMxDLA",
            },
            horaires: {
                ouverture: "Ouvert 6h-23h 7/7j",
                reception: "Réception LUN-VEN 9-13h•16-21h / SAM 9-13h•15h30-19h",
                ouvertureGoogle: "06:00",
                fermetureGoogle: "23:00",
            },
            reseaux: {
                instagram: "https://www.instagram.com/hallb.fr/",
                instagramLabel: "hallb.fr",
                facebook: "https://www.facebook.com/p/HALL-B-61576081445951/",
                facebookLabel: "HALL B",
                avisGoogle: "https://g.page/r/CWQpP9p9tRZkEBM/review",
            },
            osteo: "https://www.doctolib.fr/osteopathe/langlade/chloe-arcangioli?pid=practice-702972",
            partenaires: [
                { nom: "Pannata", url: "https://www.panattasport.com/fr/", logo: mediaIds.pannata },
                { nom: "Technogym", url: "https://www.technogym.com/fr-FR/", logo: mediaIds.technogym },
                { nom: "Pallini", url: "https://www.pallini-sport.fr/", logo: mediaIds.pallini },
            ],
        },
    });

    await payload.updateGlobal({
        slug: "navigation",
        context: ctx,
        data: {
            liensPrincipaux: [
                { label: "Accueil", url: "/", externe: false },
                { label: "Tarifs", url: "/tarifs", externe: false },
                { label: "Carte cadeau", url: "/carte-cadeau", externe: false },
                { label: "Plannings", url: "/plannings", externe: false },
                { label: "Nos cours", url: "/cours", externe: false },
                { label: "Nous contacter", url: "/contact", externe: false },
            ],
            liensSecondaires: [
                { label: "Natation enfant", url: "/natation-enfant-vaunage", externe: false },
                { label: "Réservation Squash", url: "/squash", externe: false },
                {
                    label: "Consultation Ostéopathe",
                    url: "https://www.doctolib.fr/osteopathe/langlade/chloe-arcangioli?pid=practice-702972",
                    externe: true,
                },
            ],
            boutonsBarre: [
                { texte: "Essai Offert", url: "/essai-offert", style: "primary" },
                { texte: "Je m'inscris", url: "/tarifs", style: "accent" },
            ],
            imageMenu: mediaIds.crossfit,
            liensLegaux: [
                { label: "FAQ", url: "/faq" },
                { label: "Mentions Légales", url: "/mentions-legales" },
                { label: "Politique de confidentialité", url: "/politique-confidentialite" },
            ],
        },
    });

    await payload.updateGlobal({
        slug: "parametres-seo",
        context: ctx,
        data: {
            titreParDefaut: "HALL B",
            descriptionParDefaut:
                "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nîmes, Gard) : musculation haut de gamme, cours collectifs, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !",
            imagePartage: mediaIds.og_image,
            ficheGoogle: {
                nom: "HALL B",
                description:
                    "Salle de sport de 2 400 m² à Saint-Dionisy (Vaunage, Gard), à 15 min de Nîmes : musculation Panatta & Technogym, cours collectifs, squash, aquagym, danse et pôle santé.",
                logo: mediaIds.logo,
                gammePrix: "€€",
                zonesDesservies: [
                    { nom: "Nîmes", type: "City" },
                    { nom: "Saint Dionisy", type: "City" },
                    { nom: "Calvisson", type: "City" },
                    { nom: "Sommières", type: "City" },
                    { nom: "Quissac", type: "City" },
                    { nom: "Caveirac", type: "City" },
                    { nom: "Vaunage", type: "AdministrativeArea" },
                    { nom: "Gard", type: "AdministrativeArea" },
                ],
                equipements: [
                    { nom: "Plateau de musculation" },
                    { nom: "Espace cardio-training" },
                    { nom: "Cours collectifs" },
                    { nom: "Small groups" },
                    { nom: "Squash" },
                    { nom: "Aquagym et bassin chauffé" },
                    { nom: "École de danse" },
                    { nom: "Pôle santé" },
                    { nom: "Parking gratuit" },
                    { nom: "Vestiaires et douches" },
                    { nom: "Accès 7j/7 de 6h à 23h" },
                ],
            },
        },
    });

    await payload.updateGlobal({
        slug: "popup",
        context: ctx,
        data: {
            actif: false,
            titre: "Essai Offert",
            sousTitre: "Vous hésitez encore à franchir le pas ?",
            texte: "Profitez d'une séance découverte 100% gratuite pour tester notre salle et vivre l'expérience par vous-même.",
            bouton: { texte: "J'en profite", url: "/essai-offert", externe: false, style: "accent" },
            delai: 1000,
        },
    });

    console.log("Réglages : thème, coordonnées, navigation, SEO, popup.");
}

/* ─── Page d'accueil ──────────────────────────────────────────────────────── */

async function seedAccueil(payload: Payload) {
    await payload.updateGlobal({
        slug: "accueil",
        context: ctx,
        data: {
            _status: "published",
            hero: {
                titre: "La plus grande salle de sport du Gard",
                videoDesktop: "https://vz-80ca2e5b-6ca.b-cdn.net/5d676075-41e1-410d-9582-bac89110c43b/playlist.m3u8",
                videoMobile: "https://vz-80ca2e5b-6ca.b-cdn.net/543c7316-c279-43a4-a730-782a53783e41/playlist.m3u8",
                posterDesktop: mediaIds.poster_desktop,
                posterMobile: mediaIds.poster_mobile,
                bandeau: [
                    { texte: "Musculation", url: "/tarifs/classic", externe: false },
                    { texte: "Cours collectifs", url: "/tarifs/boost", externe: false },
                    { texte: "Aqua", url: "/tarifs/aqua", externe: false },
                    { texte: "Squash", url: "/squash", externe: false },
                    {
                        texte: "Osteo",
                        url: "https://www.doctolib.fr/osteopathe/langlade/chloe-arcangioli?pid=practice-702972",
                        externe: true,
                    },
                    { texte: "Danse", url: "/tarifs/danse", externe: false },
                ],
                boutons: [
                    { texte: "Séance d'essai offerte", url: "/essai-offert", style: "primary" },
                    { texte: "Je m'inscris", url: "/tarifs", style: "accent" },
                ],
            },
            concept: {
                titre: "Notre Concept",
                intro: md(
                    "Bienvenue dans **2 400 m²** de bien-être et de dépassement de soi flambant neuf - Un écrin pensé pour vous faire aimer chaque minute passée à bouger.",
                ),
                sections: [
                    {
                        titre: "Espace",
                        texte: md(
                            "Un terrain de jeu XXL - Plateau musculation dernier cri, cours collectifs vitaminés, smallGroups training ultra-ciblés, terrains de squash, école de danse, bassin d'AQUA, pôle santé avec ostéopathe.\n\nChoisissez votre aventure, on s'occupe du reste.",
                        ),
                        image: mediaIds.vue_plateau_1,
                    },
                    {
                        titre: "Encadrement",
                        texte: md(
                            "Encadrement premium - Tous nos cours sont animés par des coaches diplômés, passionnés et toujours à vos côtés pour booster vos résultats.",
                        ),
                        image: mediaIds.salle_rpm,
                    },
                    {
                        titre: "Qualité",
                        texte: md(
                            "Technologie & matériel de compétition - Poids calibrés et certifiés pour la compétition, sacs de frappe, machines Panatta « made in Italy », cardio connecté Technogym : l'élite de l'équipement pour tous les niveaux — du néophyte au compétiteur.",
                        ),
                        image: mediaIds.poids_qualibres,
                    },
                    {
                        titre: "Notre ADN",
                        texte: md(
                            "Bien-être garanti - Lumière naturelle, hygiène irréprochable, ambiance respectueuse : ici, chaque adhérent est considéré, accompagné et motivé.",
                        ),
                        image: mediaIds.salle_cardio,
                    },
                ],
                ctaTexte: md(
                    "[**Formules illimitées**](/tarifs) - Accédez sans contrainte à tous nos cours collectifs, small groups et séances aquatiques, sept jours sur sept.",
                ),
                ctaBouton: { texte: "Je m'inscris", url: "/tarifs", externe: false, style: "accent" },
            },
            essaiOffert: {
                ligne1: "Viens essayer",
                ligne2: "gratuitement et sans engagement",
                bouton: { texte: "Essai Offert", url: "/essai-offert", externe: false, style: "accent" },
            },
            histoire: {
                titre: "Notre Histoire",
                intro: md(
                    "Fiers enfants de la **Vaunage**, nous voulions offrir au bassin nîmois un espace sportif indépendant, chaleureux et exigeant.",
                ),
                image: mediaIds.equipe,
                texte: md(
                    "Sous l'impulsion de **Bastien Boisseau**, coach passionné, nous avons transformé l'ancienne structure : adieu les terrains de foot en salle, place à un vaste plateau entièrement rénové, pensé dans les moindres détails pour **VOUS**.\n\nIci, aucun badge anonyme : chaque adhérent est un projet, un visage, une ambition que nous prenons plaisir à accompagner.",
                ),
            },
            valeurs: {
                titre: "Nos Valeurs",
                image: mediaIds.sacs_boxe_1,
                liste: [{ nom: "Convivialité" }, { nom: "Accompagnement" }, { nom: "Entraide" }],
            },
            seoLocal: {
                titre: "Votre salle de sport entre Nîmes et la Vaunage",
                contenu: md(
                    "HALL B est une **salle de sport de 2 400 m²** située à Saint-Dionisy, dans le Gard, à seulement 15 minutes de Nîmes. Pensée pour tous les profils — du débutant au sportif confirmé — elle réunit sous un même toit un grand [plateau de musculation](/cours/musculation), des [cours collectifs](/cours), des small groups, un bassin d'[aquagym](/cours/aquagym), deux terrains de [squash](/squash), une école de danse et un pôle santé avec ostéopathe.\n\n" +
                        "Idéalement placée au cœur de la **Vaunage**, HALL B est facilement accessible depuis Nîmes, Calvisson, Sommières, Vergèze, Caveirac, Langlade et Saint-Côme. Un grand parking gratuit vous attend directement devant la salle, et le plateau de musculation est ouvert **7j/7 de 6h à 23h** pour s'adapter à tous les emplois du temps.\n\n" +
                        "Que votre objectif soit la prise de masse, la perte de poids, la remise en forme ou simplement le plaisir de bouger dans une ambiance conviviale, nos coachs diplômés vous accompagnent à chaque étape. Découvrez nos [formules d'abonnement](/tarifs) sans engagement, consultez les [plannings](/plannings) et profitez d'une [séance d'essai offerte](/essai-offert) pour découvrir la salle.",
                ),
            },
            temoignages: { source: "google" },
            seo: {
                titre: "HALL B – Salle de sport à Saint Dionisy | Nîmes, Gard",
                description:
                    "Salle de sport 2 400 m² à Saint Dionisy, à 15 min de Nîmes (Gard) : musculation, cours collectifs, squash, aquagym, danse. Essayez HALL B gratuitement !",
                noIndex: false,
            },
        },
    });
    console.log("Page d'accueil remplie.");
}

/* ─── Pages spéciales ─────────────────────────────────────────────────────── */

async function seedPagesSpeciales(payload: Payload) {
    await payload.updateGlobal({
        slug: "page-tarifs",
        context: ctx,
        data: {
            _status: "published",
            titre: "Tarifs",
            sousTitre:
                "Choisissez l'offre adaptée à vos besoins. Nos formules Classic, Boost, et Aqua sont disponibles en paiement sans engagement, mensuel, ou annuel.",
            lienSquashTexte: "Voir tarifs Squash",
            texteSeo: {
                titre: "Quel abonnement choisir chez HALL B ?",
                contenu: md(
                    "HALL B propose des **formules d'abonnement** adaptées à chaque objectif et chaque budget, dans sa salle de sport de 2 400 m² à **Saint-Dionisy**, à 15 minutes de **Nîmes**. La formule **Classic** (à partir de 40€/mois) donne un accès libre au plateau de musculation et cardio 7j/7 de 6h à 23h. La formule **Boost** (à partir de 55€/mois) ajoute l'accès illimité à tous les [cours collectifs](/cours) et small groups.\n\n" +
                        "Pour la pratique aquatique, la formule **Aqua** inclut le bassin chauffé et les séances d'aquagym. Besoin de souplesse ? Le **carnet de séances** permet de venir sans engagement, et la **carte cadeau** est valable sur toutes nos activités. La [réservation de squash](/squash) se fait séparément, en ligne.\n\n" +
                        "Toutes nos formules sont disponibles **sans engagement, en mensuel ou en annuel**. Pas encore décidé ? Profitez d'une [séance d'essai offerte](/essai-offert) pour découvrir la salle avant de vous inscrire.",
                ),
            },
            seo: {
                titre: "HALL B – Tarifs | Salle de sport Saint Dionisy, Nîmes, Gard",
                description:
                    "Découvrez les formules d'abonnement de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard) : Classic, Boost, Aqua, Danse.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-cours",
        context: ctx,
        data: {
            _status: "published",
            hero: {
                eyebrow: "Tous nos cours",
                h1Top: "Cours collectifs",
                h1Bottom: "à Saint Dionisy",
                texte: "Plus de 10 disciplines, des dizaines de séances chaque semaine. À 15 minutes de Nîmes, dans le Gard, encadrées par des coachs diplômés.",
                image: mediaIds.salle_coursco,
            },
            blocsFormules: [
                {
                    eyebrow: "Formule Boost",
                    titre: "Une seule formule, tous les cours",
                    texte: md(
                        "Toutes les disciplines ci-dessous sont incluses dans la formule **Boost** de HALL B. Musculation, cardio, cours collectifs et small groups en accès illimité, 7 jours sur 7.",
                    ),
                    couleur: "accent",
                    icone: "Sparkles",
                    boutons: [
                        { texte: "Voir la formule Boost", url: "/tarifs/boost", style: "accent" },
                        { texte: "Séance d'essai offerte", url: "/essai-offert", style: "primary" },
                    ],
                },
                {
                    eyebrow: "Formule Aqua",
                    titre: "Une formule 100% aquatique",
                    texte: md(
                        "Aquagym, aquabike, aqua power et aqua mix : un travail tonique et **sans impact** pour les articulations, dans un bassin intérieur chauffé. Accessible à tous, sans savoir nager.",
                    ),
                    couleur: "bleu",
                    icone: "Waves",
                    boutons: [
                        { texte: "Voir la formule Aqua", url: "/tarifs/aqua", style: "accent" },
                        { texte: "Séance d'essai offerte", url: "/essai-offert", style: "primary" },
                    ],
                },
            ],
            catalogue: {
                eyebrow: "Le catalogue",
                titre: "Nos disciplines",
                texte: "Du cardio brûle-graisses aux séances bien-être en passant par le renforcement musculaire — choisissez ce qui vous correspond.",
            },
            arguments: {
                titre: "Pourquoi nos cours collectifs ?",
                liste: [
                    {
                        titre: "Coachs diplômés",
                        texte: "Tous nos cours sont animés par des professionnels formés, passionnés et présents pour booster vos résultats.",
                    },
                    {
                        titre: "Salles dédiées",
                        texte: "Salle de cycling, salle de cours collectifs, salle de danse — chaque discipline a son espace optimisé.",
                    },
                    {
                        titre: "Petits groupes",
                        texte: "Effectifs contrôlés pour un suivi attentif et des conseils personnalisés du coach.",
                    },
                ],
            },
            planningCta: {
                titre: "Quand viennent les cours ?",
                texte: "Plusieurs séances chaque jour, du lundi au dimanche. Matin, midi et soir. Consultez le planning complet pour trouver le créneau qui vous convient.",
                bouton: { texte: "Voir le planning complet", url: "/plannings", externe: false, style: "accent" },
            },
            ctaFinal: {
                titre: "Envie d'essayer ?",
                texte: md("Votre **première séance est offerte** sur n'importe lequel de nos cours collectifs."),
                boutons: [
                    { texte: "Réserver mon essai", url: "/essai-offert", style: "accent" },
                    { texte: "Voir la formule Boost", url: "/tarifs/boost", style: "primary" },
                ],
            },
            ctaCours: {
                titre: "Envie d'essayer ?",
                texte: md("Votre **première séance est offerte**. Réservez en ligne ou contactez-nous directement."),
                boutonTexte: "Réserver ma séance d'essai",
            },
            maillage: [
                { label: "Tous nos cours", url: "/cours" },
                { label: "Planning complet", url: "/plannings" },
                { label: "Formule Boost", url: "/tarifs/boost" },
                { label: "Tous nos tarifs", url: "/tarifs" },
            ],
            seo: {
                titre: "Cours collectifs à Saint Dionisy (Nîmes, Gard) | HALL B",
                description:
                    "Cours collectifs HALL B près de Nîmes : RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates et cours d'aqua. Inclus dans la formule Boost.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "plannings-page",
        context: ctx,
        data: {
            _status: "published",
            titre: "Plannings",
            sousTitre: "Consultez nos nombreuses activités",
            sections: [
                {
                    titre: "Cours co - Small Groups",
                    imageBureau: mediaIds.pl_bureau,
                    jours: [
                        { image: mediaIds.pl_lundi },
                        { image: mediaIds.pl_mardi },
                        { image: mediaIds.pl_mercredi },
                        { image: mediaIds.pl_jeudi },
                        { image: mediaIds.pl_vendredi },
                        { image: mediaIds.pl_samedi },
                    ],
                },
                {
                    titre: "AQUA",
                    imageBureau: mediaIds.pl_aqua_bureau,
                    jours: [
                        { image: mediaIds.pl_aqua_lundi },
                        { image: mediaIds.pl_aqua_mardi },
                        { image: mediaIds.pl_aqua_mercredi },
                        { image: mediaIds.pl_aqua_jeudi },
                        { image: mediaIds.pl_aqua_vendredi },
                    ],
                },
                { titre: "Danse", imageBureau: mediaIds.pl_danse, jours: [] },
            ],
            activites: [
                { titre: "Pilates", illustration: mediaIds.ic_yoga, url: "/tarifs/boost", description: "Renforcez vos muscles en profondeur, améliorez votre posture et gagnez en souplesse grâce à des mouvements doux mais redoutablement efficaces." },
                { titre: "Abdos flash", illustration: mediaIds.ic_zap, url: "/tarifs/boost", description: "Un cours express et intense pour sculpter votre sangle abdominale en un minimum de temps. Résultats garantis !" },
                { titre: "Zumba", illustration: mediaIds.ic_dance, url: "/tarifs/boost", description: "Dansez, transpirez et amusez-vous ! Un mix explosif de rythmes latinos et de cardio qui fait brûler des calories sans s'en rendre compte." },
                { titre: "CAF", illustration: mediaIds.ic_leg, url: "/tarifs/boost", description: "Cuisse, Abdos, Fessiers : le trio gagnant pour tonifier le bas du corps, brûler un maximum de calories et galber la silhouette." },
                { titre: "Pump", illustration: mediaIds.ic_weight, url: "/tarifs/boost", description: "Un entraînement avec charges inspiré de la musculation pour brûler les graisses et vous sculpter un corps puissant et athlétique." },
                { titre: "Cross training", illustration: mediaIds.ic_weight, url: "/tarifs/boost", description: "Un condensé explosif de cardio, force et agilité. Variez les exercices pour repousser vos limites et booster vos performances." },
                { titre: "Step", illustration: mediaIds.ic_stairs, url: "/tarifs/boost", description: "Un cours chorégraphié fun et dynamique sur step qui combine cardio et renforcement pour affiner la silhouette en s'amusant." },
                { titre: "Fessiers flash", illustration: mediaIds.ic_zap, url: "/tarifs/boost", description: "15 minutes d'exercices ciblés et ultra efficaces pour raffermir et sculpter vos fessiers rapidement." },
                { titre: "RPM", illustration: mediaIds.ic_bike, url: "/tarifs/boost", description: "En selle pour un cours de vélo indoor explosif ! Dépense calorique maximale, sensations fortes et dépassement de soi garantis." },
                { titre: "Cardio Boxe", illustration: mediaIds.ic_fist, url: "/tarifs/aqua", description: "Un mix parfait entre boxe et cardio pour se défouler, brûler des calories et libérer tout son stress dans une ambiance survoltée." },
                { titre: "Stretch", illustration: mediaIds.ic_yoga, url: "/tarifs/boost", description: "Un moment de détente et de mobilité pour étirer vos muscles, relâcher les tensions et améliorer votre souplesse au quotidien." },
                { titre: "PPG", illustration: mediaIds.ic_weight, url: "/tarifs/boost", description: "La préparation physique générale : des exercices complets pour développer endurance, force et explosivité, quel que soit votre niveau." },
            ],
            seo: {
                titre: "HALL B – Plannings | Salle de sport Saint Dionisy, Nîmes",
                description:
                    "Consultez le planning des cours collectifs et activités de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard).",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-faq",
        context: ctx,
        data: {
            _status: "published",
            titre: "Questions fréquentes",
            sousTitre:
                "Horaires, tarifs, accès, activités… Retrouvez toutes les réponses sur HALL B, votre salle de sport à Saint-Dionisy, à 15 minutes de Nîmes.",
            liens: [
                { label: "Voir les tarifs", url: "/tarifs" },
                { label: "Plannings des cours", url: "/plannings" },
                { label: "Nos cours", url: "/cours" },
                { label: "Comment venir", url: "/comment-venir" },
                { label: "Carte cadeau", url: "/carte-cadeau" },
            ],
            ctaTexte: "Une autre question ? La meilleure réponse, c'est d'essayer.",
            ctaBoutonTexte: "Je profite de l'essai offert",
            seo: {
                titre: "FAQ | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
                description:
                    "Toutes les réponses sur HALL B : horaires 7j/7 de 6h à 23h, tarifs sans engagement, accès et parking gratuit, activités (musculation, cours, squash, aquagym) et séance d'essai offerte.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-contact",
        context: ctx,
        data: {
            _status: "published",
            titre: "Contact",
            lienAideTexte: "Besoin d'aide ?",
            seo: {
                titre: "HALL B – Contact | Salle de sport Saint Dionisy, Nîmes",
                description:
                    "Contactez la salle de sport HALL B à Saint Dionisy (Vaunage, Nîmes, Gard). Questions, renseignements, réservations : notre équipe vous répond.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-essai-offert",
        context: ctx,
        data: {
            _status: "published",
            titre: "Essai offert",
            sousTitre: "Venez tester la salle gratuitement et sans engagement",
            idSportigo: 19758,
            seo: {
                titre: "HALL B – Essai gratuit | Salle de sport Nîmes, Gard",
                description:
                    "Testez HALL B gratuitement ! Séance découverte 100% gratuite dans notre salle de sport à Saint Dionisy, à 15 min de Nîmes (Gard).",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-squash",
        context: ctx,
        data: {
            _status: "published",
            titre: "Réservation Squash",
            sousTitre:
                "Envie de vous défouler ou de partager un bon moment entre amis ? Nos deux terrains de squash vous attendent chez HALL B à Saint-Dionisy, à 15 minutes de Nîmes.",
            pointsCles: [
                { texte: "Location de terrain facilement en ligne" },
                { texte: "Location de raquettes sur place" },
                { texte: "Tournois réguliers pour se challenger" },
            ],
            image: mediaIds.squash,
            sectionSeo: {
                titre: "Le squash à Saint-Dionisy, près de Nîmes",
                contenu: md(
                    "Vous cherchez un **terrain de squash près de Nîmes** ? HALL B met à votre disposition **deux terrains de squash** à **Saint-Dionisy**, en plein cœur de la **Vaunage**, à seulement 15 minutes de Nîmes et à proximité de Calvisson, Sommières, Vergèze et Caveirac. Que vous soyez débutant curieux ou joueur confirmé, nos courts sont ouverts à tous, adhérents comme visiteurs.\n\n" +
                        "Le squash est l'un des sports de raquette les plus complets et les plus intenses. Sur un court fermé, la balle ne sort jamais du jeu : les échanges s'enchaînent à un rythme soutenu et sollicitent le cardio, la vitesse, les réflexes et le sens tactique. En une heure de jeu, on peut brûler entre **600 et 900 calories** — difficile de trouver plus efficace pour se défouler.",
                ),
            },
            benefices: {
                titre: "Pourquoi jouer au squash ?",
                liste: [
                    { icone: "Flame", titre: "Brûle-calories", texte: "600 à 900 kcal par heure. L'un des sports les plus efficaces pour se dépenser en un minimum de temps." },
                    { icone: "Zap", titre: "Réflexes & vitesse", texte: "Des échanges rapides qui développent les réflexes, la vitesse d'exécution et la coordination œil-main." },
                    { icone: "Brain", titre: "Jeu tactique", texte: "Anticiper, placer la balle, piéger l'adversaire : le squash est autant un sport mental que physique." },
                    { icone: "Users", titre: "Entre amis", texte: "Un format idéal pour partager un bon moment à deux, ou se challenger lors de nos tournois réguliers." },
                ],
            },
            infosPratiques: {
                titre: "Infos pratiques",
                points: [
                    { texte: "Deux terrains réservables en ligne, 7j/7" },
                    { texte: "Location de raquettes et de balles sur place" },
                    { texte: "Vestiaires et douches à disposition" },
                    { texte: "Tournois réguliers ouverts à tous les niveaux" },
                    { texte: "Grand parking gratuit devant la salle" },
                ],
                note: md(
                    "**HALL B** — 1 chemin Azord, 30980 Saint-Dionisy. À 15 min de Nîmes, accès facile depuis toute la Vaunage et le bassin nîmois.",
                ),
            },
            faq: [
                { question: "Comment réserver un terrain de squash chez HALL B ?", reponse: "La réservation se fait directement en ligne sur cette page, en quelques clics. Choisissez votre créneau, en heure pleine ou en heure creuse, puis confirmez. Vous pouvez aussi réserver sur place à l'accueil." },
                { question: "Faut-il apporter sa propre raquette ?", reponse: "Non, la location de raquettes est possible directement sur place. Vous pouvez venir les mains vides : il vous suffit d'une tenue de sport et de chaussures à semelle non marquante." },
                { question: "Combien y a-t-il de terrains de squash ?", reponse: "HALL B dispose de deux terrains de squash, à Saint-Dionisy, à 15 minutes de Nîmes. Des tournois sont organisés régulièrement pour se challenger entre joueurs." },
                { question: "Faut-il être adhérent pour jouer au squash ?", reponse: "Non. La location de terrain de squash est accessible à tous, adhérents comme non-adhérents, via la réservation en ligne. Le squash n'est pas inclus dans les formules d'abonnement." },
                { question: "Le squash est-il un bon sport pour se dépenser ?", reponse: "Oui, le squash est l'un des sports les plus intenses : une partie peut brûler 600 à 900 kcal par heure. Il développe le cardio, la vitesse, les réflexes et la coordination, tout en restant ludique." },
            ],
            seo: {
                titre: "Squash à Saint Dionisy (Nîmes, Gard) | HALL B",
                description:
                    "Réservez en ligne l'un des deux terrains de squash de HALL B, à 15 min de Nîmes (Gard). Location de raquettes sur place, tournois réguliers. Tous niveaux.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-carte-cadeau",
        context: ctx,
        data: {
            _status: "published",
            titre: "Carte cadeau",
            sousTitre: "",
            seo: {
                titre: "HALL B – Carte cadeau | Salle de sport Nîmes, Gard",
                description:
                    "Offrez une séance avec la carte cadeau HALL B, valable pour toutes nos activités à Saint Dionisy, près de Nîmes (Gard).",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-comment-venir",
        context: ctx,
        data: {
            _status: "published",
            titre: "Comment venir",
            sousTitre:
                "HALL B se situe à Saint-Dionisy, au cœur de la Vaunage, à 15 minutes de Nîmes. Itinéraire, horaires et parking gratuit — tout est ici.",
            infos: [
                { icone: "MapPin", titre: "Adresse", texte: "HALL B — 1 chemin Azord, 30980 Saint-Dionisy" },
                { icone: "SquareParking", titre: "Parking", texte: "Grand parking gratuit directement devant l'entrée de la salle." },
                { icone: "Clock", titre: "Horaires d'accès", texte: "Plateau en accès libre 7j/7, de 6h à 23h." },
                { icone: "Phone", titre: "Téléphone", texte: "04 66 19 16 76" },
            ],
            boutonItineraireTexte: "Ouvrir l'itinéraire",
            ctaTexte: "Première visite ? Profitez d'une séance d'essai offerte.",
            ctaBoutonTexte: "Je profite de l'essai offert",
            itineraires: {
                titre: "En voiture",
                liste: [
                    { ville: "Depuis Nîmes", temps: "≈ 15 min", description: "Direction ouest / Vaunage par la D40 (Caveirac puis Saint-Dionisy)." },
                    { ville: "Depuis Calvisson", temps: "≈ 5 min", description: "Salle voisine, située à l'entrée de Saint-Dionisy." },
                    { ville: "Depuis Sommières", temps: "≈ 15 min", description: "Via Calvisson, puis direction Saint-Dionisy." },
                    { ville: "Depuis Quissac", temps: "≈ 20 min", description: "Via Sommières, puis Saint-Dionisy." },
                    { ville: "Depuis l'A9", temps: "≈ 15 min", description: "Sortie Gallargues / Vergèze, puis direction Vaunage." },
                ],
            },
            seo: {
                titre: "Comment venir | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
                description:
                    "Accès à HALL B, salle de sport à Saint-Dionisy (Vaunage, Gard) : itinéraire depuis Nîmes, Calvisson, Sommières et Quissac, parking gratuit, horaires et plan interactif.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "page-natation",
        context: ctx,
        data: {
            _status: "published",
            titre: "Natation",
            sousTitre: "Cours de natation en vaunage - Piscine intérieure à Saint Dionisy.",
            intro: "Chez HALL B à Saint-Dionisy, nous proposons :",
            offres: [
                { icone: "Baby", texte: md("*Bébés nageurs* - pour familiariser les tout-petits avec l'eau en douceur") },
                { icone: "WavesLadder", texte: md("*École de natation enfants* - apprendre à nager et gagner en confiance") },
                { icone: "CheckCheck", texte: md("*Tests d'aisance aquatique certifiants* - indispensables pour certaines activités nautiques et colonies") },
                { icone: "CalendarCheck2", texte: md("Paiement à la séance : réservation par téléphone ou en achetant directement votre séance/carnet de séances en ligne") },
            ],
            bouton: { texte: "Acheter en ligne", url: "/tarifs/carnet-seances", externe: false, style: "accent" },
            horaires: {
                titre: "Horaires : (tous les Mercredis)",
                lignes: [
                    { texte: "11h00 : Bébés nageurs" },
                    { texte: "17h00 : Groupe 3 / 4 / 5 ans" },
                    { texte: "17h30 : Groupe 5 ans et +" },
                ],
            },
            image: mediaIds.bebe_nageur,
            seo: {
                titre: "HALL B – Natation Enfant | Vaunage, Saint Dionisy, Nîmes",
                description:
                    "Cours de natation enfant en Vaunage – Piscine intérieure à Saint Dionisy, près de Nîmes (Gard). Inscriptions ouvertes.",
            },
        },
    });

    await payload.updateGlobal({
        slug: "pages-locales-communs",
        context: ctx,
        data: {
            _status: "published",
            ctaTexte: "Envie d'essayer ? Votre première séance est offerte.",
            ctaBoutonTexte: "Je profite de l'essai offert",
            atouts: {
                titre: "Pourquoi choisir HALL B ?",
                liste: [
                    { icone: "Dumbbell", titre: "2 400 m² d'équipement", texte: "Le plus grand plateau du Gard : machines Panatta, cardio Technogym, charges libres et espace cross-training." },
                    { icone: "Users", titre: "Cours collectifs & small groups", texte: "RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates… un planning complet encadré par des coachs diplômés." },
                    { icone: "Waves", titre: "Cours d'aqua & piscine chauffée", texte: "Un bassin intérieur chauffé pour nos cours d'aqua (aquagym, aquabike…) et l'école de natation des enfants." },
                    { icone: "Target", titre: "Deux terrains de squash", texte: "Réservation en ligne simple et rapide, pour jouer entre amis ou en compétition." },
                    { icone: "SquareParking", titre: "Parking gratuit", texte: "Un grand parking gratuit juste devant l'entrée. Zéro stress de stationnement." },
                    { icone: "Clock", titre: "7j/7 de 6h à 23h", texte: "Accès libre tous les jours, tôt le matin comme tard le soir. À votre rythme." },
                ],
            },
            decouvrir: {
                titre: "Découvrir HALL B",
                liens: [
                    { label: "Nos cours", url: "/cours" },
                    { label: "Musculation", url: "/cours/musculation" },
                    { label: "Cours d'aqua", url: "/cours/aquagym" },
                    { label: "Squash", url: "/squash" },
                    { label: "Tarifs", url: "/tarifs" },
                    { label: "Plannings", url: "/plannings" },
                ],
            },
            autresVilles: {
                titre: "HALL B, votre salle de sport dans tout le bassin nîmois",
                texte: "Notre salle de Saint-Dionisy accueille aussi les sportifs de :",
            },
            image: mediaIds.vue_plateau_1,
        },
    });

    await payload.updateGlobal({
        slug: "page-merci",
        context: ctx,
        data: {
            _status: "published",
            titre: "Merci !",
            texte: "Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l'application Sportigo.",
            bouton: { texte: "Retour à l'accueil", url: "/", externe: false, style: "primary" },
        },
    });

    console.log("Pages spéciales remplies.");
}

/* ─── Collections ─────────────────────────────────────────────────────────── */

async function upsert(
    payload: Payload,
    collection: "cours" | "formules" | "villes" | "pages" | "faq-items",
    slugOrWhere: string | null,
    data: Record<string, unknown>,
    whereField = "slug",
) {
    const where = slugOrWhere ? { [whereField]: { equals: slugOrWhere } } : null;
    if (where) {
        const existant = await payload.find({ collection, where, limit: 1, draft: true });
        if (existant.docs[0]) {
            await payload.update({ collection, id: existant.docs[0].id, data, context: ctx });
            return;
        }
    }
    await payload.create({ collection, data: data as never, context: ctx });
}

async function seedCours(payload: Payload) {
    for (const c of COURS) {
        await upsert(payload, "cours", c.slug, {
            _status: "published",
            titre: c.titre,
            slug: c.slug,
            image: mediaIds[c.image],
            ordre: c.ordre,
            pageActive: c.pageActive !== false,
            carte: {
                resume: c.carte.resume,
                icone: c.carte.icone,
                intensite: c.carte.intensite,
                duree: c.carte.duree,
                themeBleu: c.carte.themeBleu ?? false,
            },
            eyebrow: c.eyebrow ?? "Cours collectif",
            h1Top: c.h1Top ?? c.titre,
            h1Bottom: c.h1Bottom ?? "à Saint Dionisy",
            heroLead: c.heroLead ? md(c.heroLead) : undefined,
            stats: c.stats ?? [],
            boutonSecondaire: c.boutonSecondaire
                ? { texte: c.boutonSecondaire.texte, url: c.boutonSecondaire.url, externe: false, style: c.boutonSecondaire.style ?? "primary" }
                : { texte: "Voir les plannings", url: "/plannings", externe: false, style: "primary" },
            quoi: c.quoi ? { titre: c.quoi.titre, paragraphe1: md(c.quoi.p1), paragraphe2: md(c.quoi.p2) } : undefined,
            benefices: c.benefices
                ? { titre: c.benefices.titre, liste: c.benefices.liste.map((b) => ({ icone: b.icone, titre: b.titre, texte: b.texte })) }
                : undefined,
            deroulement: c.deroulement ?? [],
            public: c.publicCible
                ? { intro: md(c.publicCible.intro), points: c.publicCible.points.map((p) => ({ texte: p })) }
                : undefined,
            equipement: c.equipement
                ? { titre: c.equipement.titre, paragraphe1: md(c.equipement.p1), paragraphe2: md(c.equipement.p2) }
                : undefined,
            zone: c.zone ? { titre: c.zone.titre ?? "À 15 min de Nîmes", texte: md(c.zone.texte) } : undefined,
            faq: c.faq ?? [],
            seo: c.seo ? { titre: c.seo.titre, description: c.seo.description, noIndex: false } : undefined,
            schemaExercice: c.schemaExercice,
        });
    }
    console.log(`Cours : ${COURS.length} entrées.`);
}

async function seedFormules(payload: Payload) {
    const imagesBoost = [
        { image: mediaIds.vue_plateau_2 },
        { image: mediaIds.salle_cardio },
        { image: mediaIds.salle_coursco },
        { image: mediaIds.salle_rpm },
        { image: mediaIds.sacs_boxe_2 },
    ];

    const formules: Record<string, unknown>[] = [
        {
            titre: "Classic",
            slug: "classic",
            sousTitre: "Musculation & cardio",
            groupe: "principale",
            ordre: 1,
            prix: { prefixe: "A partir de", montant: "40€", suffixe: "/mois" },
            images: [{ image: mediaIds.vue_plateau_2 }, { image: mediaIds.salle_cardio }],
            avantages: [{ texte: md("Accès libre au plateau 7/7j de 6h à 23h"), icone: "check" }],
            pageDediee: true,
            sousTitrePage: md("Musculation & cardio"),
            filtres: [
                {
                    titreAucun: "Tout type de paiement",
                    options: [
                        { nom: "Sans engagement", ids: [21408] },
                        { nom: "Mensuel", ids: [19872] },
                        { nom: "Annuel", ids: [19871] },
                    ],
                },
            ],
        },
        {
            titre: "Boost",
            slug: "boost",
            sousTitre: "Classic + Cours collectifs + SmallGroups",
            groupe: "principale",
            ordre: 2,
            prix: { prefixe: "A partir de", montant: "55€", suffixe: "/mois" },
            images: imagesBoost,
            avantages: [
                { texte: md("Accès libre au plateau 7/7j de 6h à 23h"), icone: "check" },
                { texte: md("Accès illimité au planning de **COURS CO**"), icone: "check" },
                { texte: md("Accès illimité aux **SMALLGROUPS**"), icone: "check" },
            ],
            pageDediee: true,
            sousTitrePage: md("Musculation & cardio + Cours Collectifs + SmallGroups"),
            filtres: [
                {
                    titreAucun: "Tout type de paiement",
                    options: [
                        { nom: "Sans engagement", ids: [19912, 19914] },
                        { nom: "Mensuel", ids: [21467, 21468] },
                        { nom: "Annuel", ids: [19915, 19913] },
                    ],
                },
            ],
        },
        {
            titre: "Aqua",
            slug: "aqua",
            sousTitre: "Classic + Aqua",
            groupe: "principale",
            ordre: 3,
            prix: { prefixe: "A partir de", montant: "75€", suffixe: "/mois" },
            images: [{ image: mediaIds.piscine }, { image: mediaIds.vue_plateau_2 }, { image: mediaIds.salle_cardio }],
            avantages: [
                { texte: md("Accès libre au plateau 7/7j de 6h à 23h"), icone: "check" },
                { texte: md("Accès illimité au planning d'**AQUA**"), icone: "check" },
                { texte: md("**10€ BOOST**"), icone: "plus" },
            ],
            pageDediee: true,
            sousTitrePage: md("Musculation & cardio + Aqua"),
            filtres: [
                {
                    titreAucun: "Tout type de paiement",
                    options: [
                        { nom: "Sans engagement", ids: [19919, 19916] },
                        { nom: "Mensuel", ids: [21469, 21471] },
                        { nom: "Annuel", ids: [19918, 19917] },
                    ],
                },
                {
                    titreAucun: "Toutes les formules AQUA",
                    options: [
                        { nom: "AQUA seul", ids: [19919, 21469, 19918] },
                        { nom: "AQUA + Boost", ids: [19916, 21471, 19917], optionUrl: "cours-co" },
                    ],
                },
            ],
        },
        {
            titre: "Carnet de séances",
            slug: "carnet-seances",
            sousTitre: "Envie de flexibilité ?",
            groupe: "autre",
            ordre: 1,
            prix: { prefixe: "A partir de", montant: "15€", suffixe: "" },
            images: [
                { image: mediaIds.vue_plateau_2 },
                { image: mediaIds.salle_cardio },
                { image: mediaIds.salle_coursco },
                { image: mediaIds.salle_rpm },
                { image: mediaIds.sacs_boxe_2 },
                { image: mediaIds.piscine },
            ],
            avantages: [
                { texte: md("Accéder à la salle pour X séances sans engagement"), icone: "check" },
                { texte: md("Toutes activités confondues (Squash non compris)"), icone: "check" },
            ],
            pageDediee: true,
            sousTitrePage: md(
                "Choisissez un carnet de 1, 10, 30, 50 ou 100 séance(s) toutes activités confondues (sauf Squash).\n\nNatation enfants et bébés nageurs : voir infos et plannings sur [natation enfant](/natation-enfant-vaunage)",
            ),
            offresSimples: [19759, 21421, 21423, 21428, 21429],
        },
        {
            titre: "Danse",
            slug: "danse",
            sousTitre: "1h/semaine",
            groupe: "autre",
            ordre: 2,
            prix: { prefixe: "", montant: "250€", suffixe: "/an" },
            images: [{ image: mediaIds.salle_danse }],
            avantages: [
                { texte: md("Niveau débutant et avancé"), icone: "check" },
                { texte: md("Progression accompagnée sur l'année"), icone: "check" },
                { texte: md("**150€**/an pour 1 danse supplémentaire"), icone: "plus" },
            ],
            pageDediee: true,
            sousTitrePage: md(
                "La seconde danse pour **150€** au lieu de 250€. Pour s'inscrire à une seconde danse, veuillez nous contacter directement.",
            ),
            afficherContact: true,
            offresSimples: [19926, 21547, 21548, 21549, 21550, 21551],
        },
        {
            titre: "Natation enfants",
            slug: "natation-enfants",
            sousTitre: "Tous les Mercredis",
            groupe: "autre",
            ordre: 3,
            prix: { prefixe: "A partir de", montant: "15€", suffixe: "" },
            images: [{ image: mediaIds.bebe_nageur }],
            avantages: [
                { texte: md("11h00 : Bébés nageurs"), icone: "check" },
                { texte: md("17h00 : Groupe 3 / 4 / 5 ans"), icone: "check" },
                { texte: md("17h30 : Groupe 5 ans et +"), icone: "check" },
                { texte: md("Encadré par un maître-nageur diplômé"), icone: "plus" },
                { texte: md("Maximum 5 enfants par cours pour un apprentissage personnalisé et de qualité"), icone: "plus" },
            ],
            lienCarte: "/tarifs/carnet-seances",
            pageDediee: false,
        },
        {
            titre: "Carte Cadeau",
            slug: "carte-cadeau-formule",
            sousTitre: "Pensez à vos proches !",
            groupe: "cadeau",
            ordre: 1,
            prix: { prefixe: "Choisissez votre prix", montant: "", suffixe: "" },
            images: [
                { image: mediaIds.squash },
                { image: mediaIds.vue_plateau_2 },
                { image: mediaIds.salle_cardio },
                { image: mediaIds.salle_coursco },
                { image: mediaIds.salle_rpm },
                { image: mediaIds.sacs_boxe_2 },
                { image: mediaIds.piscine },
            ],
            avantages: [{ texte: md("Valable pour toutes nos activités."), icone: "check" }],
            lienCarte: "/carte-cadeau",
            pageDediee: false,
        },
    ];

    for (const f of formules) {
        await upsert(payload, "formules", f.slug as string, { _status: "published", ...f });
    }
    console.log(`Formules : ${formules.length} entrées.`);
}

async function seedFaq(payload: Payload) {
    const items = [
        { question: "Quels sont les horaires de la salle de sport HALL B ?", reponse: "Le plateau de musculation et de cardio-training est accessible 7j/7, de 6h à 23h. Les cours collectifs, l'aquagym, la danse et le squash suivent un planning hebdomadaire consultable sur la page Plannings." },
        { question: "Où se situe HALL B et comment y accéder ?", reponse: "HALL B se trouve au 1 chemin Azord, 30980 Saint-Dionisy, au cœur de la Vaunage, à 15 minutes de Nîmes. Un grand parking gratuit est disponible juste devant l'entrée, avec des itinéraires simples depuis Nîmes, Calvisson, Sommières et Quissac." },
        { question: "Combien coûte un abonnement chez HALL B ?", reponse: "HALL B propose plusieurs formules d'abonnement sans engagement (musculation, cours collectifs, aquagym, danse) ainsi que des carnets de séances pour plus de flexibilité. Le détail des tarifs est disponible sur la page Tarifs." },
        { question: "Peut-on essayer la salle gratuitement avant de s'inscrire ?", reponse: "Oui. HALL B offre une séance d'essai gratuite pour découvrir les équipements, les cours et l'ambiance avant de vous engager. La réservation se fait en ligne en quelques clics." },
        { question: "Quelles activités et quels équipements propose HALL B ?", reponse: "Sur 2 400 m², HALL B réunit un grand plateau de musculation (machines Panatta, cardio Technogym), des cours collectifs (RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates), des small groups, deux terrains de squash, un bassin chauffé pour l'aquagym et la natation enfant, une école de danse et un pôle santé avec ostéopathe." },
        { question: "Faut-il déjà être sportif pour s'entraîner chez HALL B ?", reponse: "Non, tous les profils sont les bienvenus, du grand débutant au sportif confirmé. Nos coachs diplômés vous accueillent, corrigent vos mouvements et adaptent votre programme à vos objectifs : remise en forme, prise de masse, perte de poids ou simple plaisir de bouger." },
        { question: "Y a-t-il un parking à HALL B ?", reponse: "Oui, un grand parking gratuit se trouve directement devant l'entrée de la salle. Aucun souci de stationnement, même aux heures de forte affluence." },
        { question: "Peut-on offrir une carte cadeau HALL B ?", reponse: "Oui, HALL B propose des cartes cadeaux valables sur ses activités. C'est une idée idéale pour faire découvrir la salle à un proche." },
    ];

    for (let i = 0; i < items.length; i++) {
        await upsert(payload, "faq-items", items[i].question, { ...items[i], ordre: i + 1 }, "question");
    }
    console.log(`FAQ : ${items.length} questions.`);
}

async function seedPagesLocales(payload: Payload) {
    const communes: Record<string, unknown>[] = [
        {
            ville: "Nîmes",
            slug: "salle-de-sport-nimes",
            linkLabel: "Nîmes",
            ordre: 1,
            h1: "Salle de sport à Nîmes",
            sousTitre: md("À 15 minutes de Nîmes, HALL B est la plus grande salle de sport du Gard : 2 400 m² d'équipement haut de gamme, parking gratuit et accès 7j/7."),
            distance: "15 minutes",
            temps: "15 min",
            intro: md(
                "À seulement **15 minutes du centre de Nîmes**, HALL B accueille chaque jour les Nîmois dans une **salle de sport de 2 400 m²** à Saint-Dionisy, au cœur de la Vaunage. Loin de l'agitation et des stationnements payants du centre-ville, vous profitez d'un équipement premium, d'un grand parking gratuit et d'un accès libre 7j/7 de 6h à 23h.\n\n" +
                    "Sous un même toit : un grand [plateau de musculation](/cours/musculation) Panatta & Technogym, des [cours collectifs](/cours) et small groups, un bassin d'[aquagym](/cours/aquagym) chauffé, deux terrains de [squash](/squash), une école de danse et un pôle santé. Pour beaucoup de Nîmois de l'ouest et du sud de la ville, HALL B est plus rapide d'accès — et bien plus complet — que les salles du centre.",
            ),
            trajet: md(
                "Depuis Nîmes, rejoignez HALL B en une quinzaine de minutes en direction de la Vaunage (Caveirac, Saint-Dionisy) par la D40. Un grand **parking gratuit** vous attend directement devant l'entrée : fini la chasse à la place de stationnement et les horodateurs. L'itinéraire précis est indiqué sur la carte ci-dessous.",
            ),
            faq: [
                { question: "Quelle est la meilleure salle de sport près de Nîmes ?", reponse: "HALL B, à Saint-Dionisy (15 min de Nîmes), est la plus grande salle de sport du Gard avec 2 400 m² : plateau de musculation Panatta & Technogym, cours collectifs, squash, aquagym, danse et pôle santé. Parking gratuit et accès 7j/7 de 6h à 23h." },
                { question: "Combien de temps faut-il pour aller de Nîmes à HALL B ?", reponse: "Comptez environ 15 minutes depuis le centre de Nîmes en direction de la Vaunage, et souvent moins depuis l'ouest de l'agglomération nîmoise. Un grand parking gratuit est disponible devant la salle." },
            ],
            seo: {
                titre: "Salle de sport à Nîmes (Gard) | HALL B – 2 400 m² à 15 min",
                description: "La plus grande salle de sport près de Nîmes : 2 400 m², musculation Panatta & Technogym, cours collectifs, squash, aquagym. À 15 min de Nîmes, parking gratuit. Essai offert.",
            },
        },
        {
            ville: "la Vaunage",
            slug: "salle-de-sport-vaunage",
            linkLabel: "Vaunage",
            ordre: 2,
            h1: "Salle de sport en Vaunage",
            sousTitre: md("Implantée à Saint-Dionisy, HALL B est LA salle de sport de la Vaunage : 2 400 m² au centre de la plaine, à quelques minutes de chaque village."),
            distance: "au cœur de la Vaunage",
            temps: "Sur place",
            intro: md(
                "HALL B est **la salle de sport de la Vaunage**. Implantée à Saint-Dionisy, au centre de la plaine viticole qui réunit Calvisson, Caveirac, Langlade, Nages-et-Solorgues, Congénies, Boissières, Saint-Côme et Clarensac, elle place une salle de 2 400 m² à quelques minutes seulement de chaque village.\n\n" +
                    "Plus besoin de rouler jusqu'à Nîmes ou Sommières pour s'entraîner sérieusement : vous trouvez ici un grand [plateau de musculation](/cours/musculation), des [cours collectifs](/cours), un bassin d'[aquagym](/cours/aquagym) chauffé, deux terrains de [squash](/squash), une école de danse et un pôle santé. Le tout avec un parking gratuit et un accès 7j/7 de 6h à 23h.",
            ),
            trajet: md(
                "Où que vous habitiez en Vaunage — Calvisson, Caveirac, Langlade, Nages, Congénies, Saint-Côme, Boissières ou Clarensac — HALL B est à **moins de 10 minutes** de chez vous. La salle est située à l'entrée de Saint-Dionisy, avec un grand parking gratuit juste devant.",
            ),
            faq: [
                { question: "Où se trouve la salle de sport de la Vaunage ?", reponse: "HALL B est située à Saint-Dionisy (30980), au centre de la Vaunage, à quelques minutes de Calvisson, Caveirac, Langlade, Nages, Congénies et Saint-Côme. Un grand parking gratuit est disponible devant la salle." },
                { question: "Quelles activités propose HALL B en Vaunage ?", reponse: "Musculation et cardio (Panatta, Technogym), cours collectifs et small groups, squash (2 terrains), aquagym en bassin chauffé, école de danse et pôle santé — sur 2 400 m², accessibles 7j/7 de 6h à 23h." },
            ],
            seo: {
                titre: "Salle de sport en Vaunage | HALL B – Saint-Dionisy (Gard)",
                description: "HALL B, la salle de sport de la Vaunage à Saint-Dionisy : 2 400 m², musculation, cours collectifs, squash, aquagym, danse. Au centre de Calvisson, Caveirac, Langlade, Nages. Essai offert.",
            },
        },
        {
            ville: "Calvisson",
            slug: "salle-de-sport-calvisson",
            linkLabel: "Calvisson",
            ordre: 3,
            h1: "Salle de sport à Calvisson",
            sousTitre: md("À 5 minutes de Calvisson, HALL B est votre salle de sport de proximité : 2 400 m², parking gratuit et accès 7j/7."),
            distance: "5 minutes",
            temps: "5 min",
            intro: md(
                "Capitale de la Vaunage, Calvisson est à peine à **5 minutes** de HALL B. Notre **salle de sport de 2 400 m²**, à Saint-Dionisy, est sans doute la plus proche et la plus complète pour les Calvissonnais qui veulent s'entraîner sans faire de route.\n\n" +
                    "Vous y trouvez un grand [plateau de musculation](/cours/musculation) Panatta & Technogym, un planning fourni de [cours collectifs](/cours) et de small groups, un bassin d'[aquagym](/cours/aquagym) chauffé, deux terrains de [squash](/squash) et une école de danse — avec un parking gratuit et un accès 7j/7 de 6h à 23h.",
            ),
            trajet: md(
                "Depuis Calvisson, HALL B est à environ 5 minutes en voiture en direction de Saint-Dionisy. La salle se trouve à l'entrée du village, avec un **grand parking gratuit** directement devant l'entrée. Idéal pour venir s'entraîner avant ou après le travail.",
            ),
            faq: [
                { question: "Y a-t-il une salle de sport à Calvisson ?", reponse: "La salle de sport la plus proche et la plus complète de Calvisson est HALL B, à Saint-Dionisy (environ 5 minutes) : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h." },
                { question: "HALL B est-elle loin de Calvisson ?", reponse: "Non, comptez environ 5 minutes en voiture entre Calvisson et HALL B à Saint-Dionisy. Un grand parking gratuit vous attend devant la salle." },
            ],
            seo: {
                titre: "Salle de sport à Calvisson | HALL B – à 5 min (Vaunage, Gard)",
                description: "Votre salle de sport à 5 minutes de Calvisson : HALL B, 2 400 m² à Saint-Dionisy. Musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
            },
        },
        {
            ville: "Sommières",
            slug: "salle-de-sport-sommieres",
            linkLabel: "Sommières",
            ordre: 4,
            h1: "Salle de sport près de Sommières",
            sousTitre: md("À 15 minutes de Sommières, HALL B réunit musculation, cours collectifs, squash et aquagym sur 2 400 m² — avec parking gratuit."),
            distance: "15 minutes",
            temps: "15 min",
            intro: md(
                "À **15 minutes de Sommières** et de sa cité médiévale, HALL B est la salle de sport la plus complète du secteur : **2 400 m²** d'équipement à Saint-Dionisy, au cœur de la Vaunage. Un vrai centre sportif plutôt qu'une simple salle de quartier.\n\n" +
                    "Au programme : un grand [plateau de musculation](/cours/musculation) Panatta & Technogym, des [cours collectifs](/cours) et small groups, un bassin d'[aquagym](/cours/aquagym) chauffé, deux terrains de [squash](/squash), une école de danse et un pôle santé. Avec un parking gratuit et un accès 7j/7 de 6h à 23h.",
            ),
            trajet: md(
                "Depuis Sommières, rejoignez HALL B en une quinzaine de minutes en direction de Calvisson et Saint-Dionisy. La salle est facile d'accès, avec un **grand parking gratuit** juste devant l'entrée. L'itinéraire est indiqué sur la carte ci-dessous.",
            ),
            faq: [
                { question: "Quelle salle de sport choisir près de Sommières ?", reponse: "HALL B, à Saint-Dionisy (15 min de Sommières), est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h." },
                { question: "À quelle distance est HALL B de Sommières ?", reponse: "Environ 15 minutes en voiture, en direction de Calvisson puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle." },
            ],
            seo: {
                titre: "Salle de sport près de Sommières | HALL B – 2 400 m² (Gard)",
                description: "À 15 minutes de Sommières, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
            },
        },
        {
            ville: "Quissac",
            slug: "salle-de-sport-quissac",
            linkLabel: "Quissac",
            ordre: 5,
            h1: "Salle de sport près de Quissac",
            sousTitre: md("À une vingtaine de minutes de Quissac, HALL B propose 2 400 m² de musculation, cours collectifs, squash et aquagym — avec parking gratuit."),
            distance: "20 minutes",
            temps: "20 min",
            intro: md(
                "À une **vingtaine de minutes de Quissac** et de la vallée du Vidourle, HALL B offre aux habitants de la porte des Cévennes une véritable salle de sport de **2 400 m²**, à Saint-Dionisy. Un équipement et un choix d'activités qu'on ne trouve nulle part ailleurs dans le secteur.\n\n" +
                    "Plateau de [musculation](/cours/musculation) Panatta & Technogym, [cours collectifs](/cours) et small groups, bassin d'[aquagym](/cours/aquagym) chauffé, deux terrains de [squash](/squash), école de danse et pôle santé — avec un parking gratuit et un accès 7j/7 de 6h à 23h.",
            ),
            trajet: md(
                "Depuis Quissac, comptez environ 20 minutes en direction de Sommières puis Saint-Dionisy. La salle dispose d'un **grand parking gratuit** juste devant l'entrée. Retrouvez l'itinéraire détaillé sur la carte ci-dessous.",
            ),
            faq: [
                { question: "Y a-t-il une grande salle de sport près de Quissac ?", reponse: "Oui, HALL B à Saint-Dionisy (environ 20 minutes de Quissac) est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h." },
                { question: "Combien de temps de route entre Quissac et HALL B ?", reponse: "Environ 20 minutes en voiture, via Sommières puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle." },
            ],
            seo: {
                titre: "Salle de sport près de Quissac | HALL B – 2 400 m² (Gard)",
                description: "À 20 minutes de Quissac, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
            },
        },
        {
            ville: "Vergèze",
            slug: "salle-de-sport-vergeze",
            linkLabel: "Vergèze",
            ordre: 6,
            h1: "Salle de sport près de Vergèze",
            sousTitre: md("À 15 minutes de Vergèze, HALL B réunit musculation, cours collectifs, squash et cours d'aqua sur 2 400 m² — avec parking gratuit et accès 7j/7."),
            distance: "15 minutes",
            temps: "15 min",
            intro: md(
                "À **15 minutes de Vergèze** et de la source Perrier, HALL B offre aux habitants du sud de la Vaunage une véritable **salle de sport de 2 400 m²**, à Saint-Dionisy. Un centre sportif complet, bien plus qu'une simple salle de quartier.\n\n" +
                    "Vous y trouvez un grand [plateau de musculation](/cours/musculation) Panatta & Technogym, des [cours collectifs](/cours) et small groups, un bassin de [cours d'aqua](/cours/aquagym) chauffé, deux terrains de [squash](/squash), une école de danse et un pôle santé. Avec un parking gratuit et un accès 7j/7 de 6h à 23h.",
            ),
            trajet: md(
                "Depuis Vergèze, rejoignez HALL B en une quinzaine de minutes en direction de la Vaunage (Boissières, Calvisson) puis Saint-Dionisy. La salle dispose d'un **grand parking gratuit** juste devant l'entrée. L'itinéraire est indiqué sur la carte ci-dessous.",
            ),
            faq: [
                { question: "Y a-t-il une grande salle de sport près de Vergèze ?", reponse: "Oui, HALL B à Saint-Dionisy (environ 15 minutes de Vergèze) est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, cours d'aqua et danse, avec parking gratuit et accès 7j/7 de 6h à 23h." },
                { question: "Combien de temps de route entre Vergèze et HALL B ?", reponse: "Environ 15 minutes en voiture, en direction de Calvisson puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle." },
            ],
            seo: {
                titre: "Salle de sport près de Vergèze | HALL B – 2 400 m² (Gard)",
                description: "À 15 minutes de Vergèze, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, cours d'aqua. Parking gratuit, accès 7j/7. Essai offert.",
            },
        },
    ];

    for (const commune of communes) {
        await upsert(payload, "villes", commune.slug as string, { _status: "published", ...commune });
    }
    console.log(`Pages locales : ${communes.length} villes.`);
}

async function seedPagesLibres(payload: Payload) {
    const mentions = `Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), nous vous informons des éléments suivants :

## 1. Éditeur du site
+ Nom commercial : HALL B
+ Raison sociale : SAS HALL B
+ Forme juridique : Société par actions simplifiée (SAS)
+ Capital social : 10 000,00 €
+ Adresse du siège social : 1 chemin d'Azord
+ Numéro SIRET : 944 092 568 00012
+ Numéro RCS : Nîmes
+ Responsable de publication : Bastien Boisseau
+ Contact : contact@hallb.fr

## 2. Hébergeur
Vercel Inc.
340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis : [lien](https://vercel.com)

## 3. Propriété intellectuelle
L'ensemble du site (structure, design, contenu, textes, images, logos, vidéos…) est la propriété exclusive de Hall B, sauf mentions contraires.
Toute reproduction, représentation, adaptation ou publication, même partielle, est strictement interdite sans autorisation écrite préalable.

## 4. Conditions d'utilisation
L'utilisation du site Hall B implique l'acceptation pleine et entière des présentes mentions légales.
Celles-ci peuvent être modifiées à tout moment ; les utilisateurs sont invités à les consulter régulièrement.

## 5. Données personnelles
Les traitements de données personnelles effectués via ce site sont détaillés dans notre politique de confidentialité.
Conformément à la loi Informatique et Libertés et au RGPD, vous disposez de droits d'accès, de rectification et de suppression.
Pour les exercer : contact@hallb.fr.

## 6. Responsabilité
L'éditeur du site décline toute responsabilité en cas d'erreur ou d'omission dans le contenu, ainsi qu'en cas d'interruption ou de dysfonctionnement du site.`;

    const politique = `Dernière mise à jour : 03/08/2025

## 1. Responsable du traitement
Le site Hall B est édité par :
+ Société HALL B
+ Adresse : 1 chemin d'Azord
+ E-mail de contact : contact@hallb.fr
+ SIRET : 944 092 568 00012

## 2. Hébergement
Le site est hébergé par : Vercel Inc.
+ 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis

Les données sont hébergées sur des serveurs principalement situés dans l'Union Européenne. Toutefois, certains transferts hors UE peuvent être effectués dans le cadre de l'exploitation technique du service.

Voir : [Politique de confidentialité de Vercel](https://vercel.com/legal/privacy-policy)

## 3. Données collectées

### a. Navigation
Des données de navigation sont collectées à des fins statistiques via Google Analytics, uniquement après recueil de votre consentement.

### b. Sécurité des formulaires
Nous utilisons hCaptcha pour protéger les formulaires contre les robots et le spam.
hCaptcha peut collecter des informations techniques (adresse IP, empreinte navigateur) pour assurer la sécurité du service.

Voir : [Politique de confidentialité hCaptcha](https://www.hcaptcha.com/privacy).

### c. Contenus multimédias & CDN
Nos images et fichiers statiques peuvent être servis via le réseau Bunny.net (CDN). Des données techniques (adresse IP, logs anonymisés) peuvent être collectées à cette occasion.

Voir : [Politique de confidentialité Bunny.net](https://bunny.net/privacy/).

### d. Intégration Sportigo
Certaines fonctionnalités sportives sont assurées via la plateforme Sportigo. Si vous utilisez ces fonctionnalités, des données techniques ou personnelles (liées à la gestion des réservations/abonnements) peuvent être traitées par ce prestataire, selon ses propres engagements de confidentialité.

Voir : [Politique de confidentialité Sportigo](https://www.sportigo.io/fr/regles-de-confidentialite).

## 4. Cookies
Ce site utilise des cookies pour :

+ Google Analytics (statistiques)
+ hCaptcha (sécurité, protection anti-spam)
+ Sportigo (si dépôt de cookies, session, tracking)
+ Bunny.net (si cookie de session/optimisation, généralement rare)

Lors de votre première visite, un bandeau vous informe de l'utilisation de ces cookies. Vous pouvez changer votre consentement à tout moment via le bouton "gérer mes cookies" en pied de page. Aucun cookie non essentiel n'est déposé sans votre consentement préalable.
La gestion des cookies est assurée par la plateforme Klaro, conforme au RGPD.

## 5. Destinataires
Les services tiers listés ci-dessus peuvent également accéder à certaines données, selon leur finalité propre, et sous réserve de leur propre politique de confidentialité. Aucun partenaire tiers ne reçoit de données à des fins commerciales sans votre consentement.

## 6. Durée de conservation
Données de formulaire de contact : 1 an après réception

Données de navigation (Google Analytics) : 14 mois maximum

## 7. Vos droits
Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :

+ Droit d'accès
+ Droit de rectification
+ Droit à l'effacement
+ Droit à la limitation
+ Droit d'opposition
+ Droit à la portabilité

Vous pouvez exercer ces droits en nous contactant à : contact@hallb.fr

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la [CNIL](https://www.cnil.fr)`;

    await upsert(payload, "pages", "mentions-legales", {
        _status: "published",
        titre: "Mentions légales - Hall B",
        slug: "mentions-legales",
        gabarit: "document",
        contenu: [{ blockType: "markdown", contenu: mentions }],
        seo: {
            titre: "HALL B - Mentions Légales",
            description: "Mentions Légales de la salle de sport HALL B à Saint Dionisy.",
        },
    });

    await upsert(payload, "pages", "politique-confidentialite", {
        _status: "published",
        titre: "Politique de confidentialité - Hall B",
        slug: "politique-confidentialite",
        gabarit: "document",
        contenu: [{ blockType: "markdown", contenu: politique }],
        seo: {
            titre: "HALL B - Politique de Confidentialité",
            description: "Politique de confidentialité de la salle de sport HALL B à Saint Dionisy.",
        },
    });

    console.log("Pages libres : mentions légales + politique de confidentialité.");
}

/* ─── Utilisateur admin (facultatif) ──────────────────────────────────────── */

async function seedAdmin(payload: Payload) {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!email || !password) return;

    const existant = await payload.find({
        collection: "utilisateurs",
        where: { email: { equals: email } },
        limit: 1,
    });
    if (existant.docs.length === 0) {
        await payload.create({
            collection: "utilisateurs",
            data: { email, password, nom: "Administrateur" },
            context: ctx,
        });
        console.log(`Utilisateur admin créé : ${email}`);
    }
}

/* ─── Point d'entrée ──────────────────────────────────────────────────────── */

async function main() {
    // Imports dynamiques : la config Payload lit les variables d'environnement.
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    console.log("Seed du contenu HALL B…");
    await seedMedias(payload);
    await seedReglages(payload);
    await seedAccueil(payload);
    await seedPagesSpeciales(payload);
    await seedCours(payload);
    await seedFormules(payload);
    await seedFaq(payload);
    await seedPagesLocales(payload);
    await seedPagesLibres(payload);
    await seedAdmin(payload);

    console.log("Seed terminé ✔");
    process.exit(0);
}

main().catch((e) => {
    console.error("Échec du seed :", e);
    process.exit(1);
});
