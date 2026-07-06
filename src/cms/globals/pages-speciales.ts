/**
 * Globals des pages « spéciales » : pages dont la structure est fixe
 * (widgets Sportigo, formulaire, carte…) mais dont tous les textes sont modifiables.
 */
import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";
import { boutonField, faqArrayField, iconeField, seoFields } from "../fields";
import { previewUrl } from "../preview";

function pageGlobal(config: Omit<GlobalConfig, "access" | "hooks">): GlobalConfig {
    return {
        ...config,
        admin: { group: "Pages", ...config.admin },
        versions: { drafts: { autosave: { interval: 800 } } },
        access: { read: lecturePublique, update: connecte },
        hooks: { afterChange: [revalidateGlobal] },
    };
}

export const PageTarifs = pageGlobal({
    slug: "page-tarifs",
    label: "Page Tarifs",
    admin: {
        description:
            "Textes de la page Tarifs. Les cartes de formules se gèrent dans Contenu → Formules & tarifs.",
        livePreview: { url: () => previewUrl("/tarifs") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Tarifs" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        { name: "lienSquashTexte", type: "text", label: "Texte du lien vers le squash", defaultValue: "Voir tarifs Squash" },
        {
            name: "texteSeo",
            type: "group",
            label: "Texte de bas de page (référencement)",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)" },
                { name: "contenu", type: "richText", label: "Texte" },
            ],
        },
        seoFields(),
    ],
});

export const PageCoursIndex = pageGlobal({
    slug: "page-cours",
    label: "Page Nos cours",
    admin: {
        description:
            "Textes de la page « Nos cours ». La grille des disciplines se gère dans Contenu → Cours.",
        livePreview: { url: () => previewUrl("/cours") },
    },
    fields: [
        {
            name: "hero",
            type: "group",
            label: "Bandeau d'ouverture",
            fields: [
                { name: "eyebrow", type: "text", label: "Sur-titre", defaultValue: "Tous nos cours" },
                { name: "h1Top", type: "text", label: "Titre — ligne 1", defaultValue: "Cours collectifs" },
                { name: "h1Bottom", type: "text", label: "Titre — ligne 2 (dorée)", defaultValue: "à Saint Dionisy" },
                { name: "texte", type: "textarea", label: "Texte d'introduction" },
                { name: "image", type: "upload", relationTo: "media", label: "Image de fond" },
            ],
        },
        {
            name: "blocsFormules",
            type: "array",
            label: "Blocs de mise en avant (Boost, Aqua…)",
            labels: { singular: "Bloc", plural: "Blocs" },
            fields: [
                { name: "eyebrow", type: "text", label: "Sur-titre", admin: { description: "Ex : « Formule Boost »" } },
                { name: "titre", type: "text", label: "Titre", required: true },
                { name: "texte", type: "richText", label: "Texte" },
                {
                    name: "couleur",
                    type: "select",
                    label: "Couleur du bloc",
                    defaultValue: "accent",
                    options: [
                        { label: "Doré (accent)", value: "accent" },
                        { label: "Bleu (aqua)", value: "bleu" },
                    ],
                },
                iconeField(),
                {
                    name: "boutons",
                    type: "array",
                    label: "Boutons",
                    maxRows: 2,
                    fields: [
                        { name: "texte", type: "text", label: "Texte", required: true },
                        { name: "url", type: "text", label: "Destination", required: true },
                        {
                            name: "style",
                            type: "select",
                            label: "Style",
                            defaultValue: "accent",
                            options: [
                                { label: "Plein", value: "accent" },
                                { label: "Contour", value: "primary" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "catalogue",
            type: "group",
            label: "Section « Nos disciplines »",
            fields: [
                { name: "eyebrow", type: "text", label: "Sur-titre", defaultValue: "Le catalogue" },
                { name: "titre", type: "text", label: "Titre", defaultValue: "Nos disciplines" },
                { name: "texte", type: "textarea", label: "Texte" },
            ],
        },
        {
            name: "arguments",
            type: "group",
            label: "Section « Pourquoi nos cours collectifs ? »",
            fields: [
                { name: "titre", type: "text", label: "Titre", defaultValue: "Pourquoi nos cours collectifs ?" },
                {
                    name: "liste",
                    type: "array",
                    label: "Arguments",
                    labels: { singular: "Argument", plural: "Arguments" },
                    fields: [
                        { name: "titre", type: "text", label: "Titre", required: true },
                        { name: "texte", type: "textarea", label: "Texte", required: true },
                    ],
                },
            ],
        },
        {
            name: "planningCta",
            type: "group",
            label: "Section « Quand viennent les cours ? »",
            fields: [
                { name: "titre", type: "text", label: "Titre", defaultValue: "Quand viennent les cours ?" },
                { name: "texte", type: "textarea", label: "Texte" },
                boutonField("bouton", "Bouton", { defaultTexte: "Voir le planning complet", defaultUrl: "/plannings" }),
            ],
        },
        {
            name: "ctaFinal",
            type: "group",
            label: "Section finale « Envie d'essayer ? »",
            fields: [
                { name: "titre", type: "text", label: "Titre", defaultValue: "Envie d'essayer ?" },
                { name: "texte", type: "richText", label: "Texte" },
                {
                    name: "boutons",
                    type: "array",
                    label: "Boutons",
                    maxRows: 2,
                    fields: [
                        { name: "texte", type: "text", label: "Texte", required: true },
                        { name: "url", type: "text", label: "Destination", required: true },
                        {
                            name: "style",
                            type: "select",
                            label: "Style",
                            defaultValue: "accent",
                            options: [
                                { label: "Plein", value: "accent" },
                                { label: "Contour", value: "primary" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "ctaCours",
            type: "group",
            label: "Encart « Envie d'essayer ? » (affiché sur chaque page de cours)",
            fields: [
                { name: "titre", type: "text", label: "Titre", defaultValue: "Envie d'essayer ?" },
                { name: "texte", type: "richText", label: "Texte" },
                { name: "boutonTexte", type: "text", label: "Texte du bouton", defaultValue: "Réserver ma séance d'essai" },
            ],
        },
        {
            name: "maillage",
            type: "array",
            label: "Liens « À découvrir aussi » (bas de chaque page de cours)",
            labels: { singular: "Lien", plural: "Liens" },
            fields: [
                { name: "label", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
            ],
        },
        seoFields(),
    ],
});

export const PageFaq = pageGlobal({
    slug: "page-faq",
    label: "Page FAQ",
    admin: {
        description: "Textes de la page FAQ. Les questions se gèrent dans Contenu → FAQ générale.",
        livePreview: { url: () => previewUrl("/faq") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Questions fréquentes" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        {
            name: "liens",
            type: "array",
            label: "Liens utiles (bas de page)",
            labels: { singular: "Lien", plural: "Liens" },
            fields: [
                { name: "label", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
            ],
        },
        {
            name: "ctaTexte",
            type: "text",
            label: "Texte de l'encart final",
            defaultValue: "Une autre question ? La meilleure réponse, c'est d'essayer.",
        },
        {
            name: "ctaBoutonTexte",
            type: "text",
            label: "Texte du bouton de l'encart final",
            defaultValue: "Je profite de l'essai offert",
        },
        seoFields(),
    ],
});

export const PageContact = pageGlobal({
    slug: "page-contact",
    label: "Page Contact",
    admin: {
        description:
            "Textes de la page Contact. Les coordonnées elles-mêmes se gèrent dans Réglages → Coordonnées & horaires.",
        livePreview: { url: () => previewUrl("/contact") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Contact" },
        { name: "lienAideTexte", type: "text", label: "Texte du lien « aide » sous le titre", defaultValue: "Besoin d'aide ?" },
        seoFields(),
    ],
});

export const PageEssaiOffert = pageGlobal({
    slug: "page-essai-offert",
    label: "Page Essai offert",
    admin: {
        description: "Page de réservation de la séance d'essai (widget Sportigo).",
        livePreview: { url: () => previewUrl("/essai-offert") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Essai offert" },
        {
            name: "sousTitre",
            type: "textarea",
            label: "Sous-titre",
            defaultValue: "Venez tester la salle gratuitement et sans engagement",
        },
        {
            name: "idSportigo",
            type: "number",
            label: "Identifiant Sportigo de la séance découverte",
            admin: { description: "Numéro de l'offre « séance découverte » dans Sportigo." },
        },
        seoFields(),
    ],
});

export const PageSquash = pageGlobal({
    slug: "page-squash",
    label: "Page Squash",
    admin: {
        description: "Page de réservation squash : textes, points forts, FAQ.",
        livePreview: { url: () => previewUrl("/squash") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Réservation Squash" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        {
            name: "pointsCles",
            type: "array",
            label: "Points clés (au-dessus de la réservation)",
            labels: { singular: "Point", plural: "Points" },
            fields: [{ name: "texte", type: "text", label: "Texte", required: true }],
        },
        { name: "image", type: "upload", relationTo: "media", label: "Photo" },
        {
            name: "sectionSeo",
            type: "group",
            label: "Section « Le squash près de Nîmes »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)" },
                { name: "contenu", type: "richText", label: "Texte" },
            ],
        },
        {
            name: "benefices",
            type: "group",
            label: "Section « Pourquoi jouer au squash ? »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)", defaultValue: "Pourquoi jouer au squash ?" },
                {
                    name: "liste",
                    type: "array",
                    label: "Cartes",
                    labels: { singular: "Carte", plural: "Cartes" },
                    fields: [
                        iconeField(),
                        { name: "titre", type: "text", label: "Titre", required: true },
                        { name: "texte", type: "textarea", label: "Texte", required: true },
                    ],
                },
            ],
        },
        {
            name: "infosPratiques",
            type: "group",
            label: "Section « Infos pratiques »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)", defaultValue: "Infos pratiques" },
                {
                    name: "points",
                    type: "array",
                    label: "Liste à puces",
                    labels: { singular: "Point", plural: "Points" },
                    fields: [{ name: "texte", type: "text", label: "Texte", required: true }],
                },
                { name: "note", type: "richText", label: "Texte de conclusion" },
            ],
        },
        faqArrayField(),
        seoFields(),
    ],
});

export const PageCarteCadeau = pageGlobal({
    slug: "page-carte-cadeau",
    label: "Page Carte cadeau",
    admin: {
        description: "Page d'achat de la carte cadeau (widget Sportigo).",
        livePreview: { url: () => previewUrl("/carte-cadeau") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Carte cadeau" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        seoFields(),
    ],
});

export const PageCommentVenir = pageGlobal({
    slug: "page-comment-venir",
    label: "Page Comment venir",
    admin: {
        description:
            "Itinéraires et infos d'accès. L'adresse et le téléphone proviennent de Réglages → Coordonnées & horaires.",
        livePreview: { url: () => previewUrl("/comment-venir") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Comment venir" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        {
            name: "infos",
            type: "array",
            label: "Blocs d'information (adresse, parking, horaires…)",
            labels: { singular: "Bloc", plural: "Blocs" },
            fields: [
                iconeField(),
                { name: "titre", type: "text", label: "Titre", required: true },
                { name: "texte", type: "textarea", label: "Texte", required: true },
            ],
        },
        { name: "boutonItineraireTexte", type: "text", label: "Texte du bouton itinéraire", defaultValue: "Ouvrir l'itinéraire" },
        {
            name: "ctaTexte",
            type: "text",
            label: "Texte de l'encart final",
            defaultValue: "Première visite ? Profitez d'une séance d'essai offerte.",
        },
        {
            name: "ctaBoutonTexte",
            type: "text",
            label: "Texte du bouton de l'encart final",
            defaultValue: "Je profite de l'essai offert",
        },
        {
            name: "itineraires",
            type: "group",
            label: "Section « Itinéraires par ville »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)", defaultValue: "Itinéraires depuis les environs" },
                {
                    name: "liste",
                    type: "array",
                    label: "Itinéraires",
                    labels: { singular: "Itinéraire", plural: "Itinéraires" },
                    fields: [
                        { name: "ville", type: "text", label: "Départ", required: true, admin: { description: "Ex : « Depuis Nîmes »" } },
                        { name: "temps", type: "text", label: "Temps", admin: { description: "Ex : « ≈ 15 min »" } },
                        { name: "description", type: "textarea", label: "Description du trajet" },
                    ],
                },
            ],
        },
        seoFields(),
    ],
});

export const PageNatation = pageGlobal({
    slug: "page-natation",
    label: "Page Natation enfant",
    admin: {
        description: "Page natation enfant / bébés nageurs.",
        livePreview: { url: () => previewUrl("/natation-enfant-vaunage") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Natation" },
        { name: "sousTitre", type: "textarea", label: "Sous-titre" },
        { name: "intro", type: "text", label: "Phrase d'introduction", defaultValue: "Chez HALL B à Saint-Dionisy, nous proposons :" },
        {
            name: "offres",
            type: "array",
            label: "Liste des prestations",
            labels: { singular: "Prestation", plural: "Prestations" },
            fields: [
                iconeField(),
                { name: "texte", type: "richText", label: "Texte", required: true },
            ],
        },
        boutonField("bouton", "Bouton d'achat", { defaultTexte: "Acheter en ligne", defaultUrl: "/tarifs/carnet-seances" }),
        {
            name: "horaires",
            type: "group",
            label: "Encart horaires",
            fields: [
                { name: "titre", type: "text", label: "Titre", defaultValue: "Horaires : (tous les Mercredis)" },
                {
                    name: "lignes",
                    type: "array",
                    label: "Lignes",
                    labels: { singular: "Ligne", plural: "Lignes" },
                    fields: [{ name: "texte", type: "text", label: "Texte", required: true }],
                },
            ],
        },
        { name: "image", type: "upload", relationTo: "media", label: "Photo / flyer" },
        seoFields(),
    ],
});

export const PagesLocalesCommuns = pageGlobal({
    slug: "pages-locales-communs",
    label: "Pages locales — sections communes",
    admin: {
        description:
            "Sections partagées par toutes les pages locales (« Salle de sport à Nîmes », etc.) : encart d'essai, atouts, liens de découverte. Le contenu propre à chaque ville se gère dans Contenu → Pages locales (SEO).",
    },
    fields: [
        {
            name: "ctaTexte",
            type: "text",
            label: "Texte de l'encart d'essai",
            defaultValue: "Envie d'essayer ? Votre première séance est offerte.",
        },
        {
            name: "ctaBoutonTexte",
            type: "text",
            label: "Texte du bouton d'essai",
            defaultValue: "Je profite de l'essai offert",
        },
        {
            name: "atouts",
            type: "group",
            label: "Section « Pourquoi choisir HALL B ? »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)", defaultValue: "Pourquoi choisir HALL B ?" },
                {
                    name: "liste",
                    type: "array",
                    label: "Atouts",
                    labels: { singular: "Atout", plural: "Atouts" },
                    fields: [
                        iconeField(),
                        { name: "titre", type: "text", label: "Titre", required: true },
                        { name: "texte", type: "textarea", label: "Texte", required: true },
                    ],
                },
            ],
        },
        {
            name: "decouvrir",
            type: "group",
            label: "Section « Découvrir HALL B »",
            fields: [
                { name: "titre", type: "text", label: "Titre (H2)", defaultValue: "Découvrir HALL B" },
                {
                    name: "liens",
                    type: "array",
                    label: "Liens",
                    labels: { singular: "Lien", plural: "Liens" },
                    fields: [
                        { name: "label", type: "text", label: "Texte", required: true },
                        { name: "url", type: "text", label: "Destination", required: true },
                    ],
                },
            ],
        },
        {
            name: "autresVilles",
            type: "group",
            label: "Section « Autres villes »",
            fields: [
                {
                    name: "titre",
                    type: "text",
                    label: "Titre (H2)",
                    defaultValue: "HALL B, votre salle de sport dans tout le bassin nîmois",
                },
                {
                    name: "texte",
                    type: "text",
                    label: "Texte",
                    defaultValue: "Notre salle de Saint-Dionisy accueille aussi les sportifs de :",
                },
            ],
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            label: "Image d'illustration (intro des pages locales)",
        },
    ],
});

export const PageMerci = pageGlobal({
    slug: "page-merci",
    label: "Page Merci",
    admin: {
        description: "Page de confirmation après une inscription en ligne.",
        livePreview: { url: () => previewUrl("/merci") },
    },
    fields: [
        { name: "titre", type: "text", label: "Titre", defaultValue: "Merci !" },
        {
            name: "texte",
            type: "textarea",
            label: "Texte",
            defaultValue:
                "Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l'application Sportigo.",
        },
        boutonField("bouton", "Bouton", { defaultTexte: "Retour à l'accueil", defaultUrl: "/", defaultStyle: "primary" }),
    ],
});
