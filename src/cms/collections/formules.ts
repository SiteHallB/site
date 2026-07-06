import type { CollectionConfig } from "payload";
import { connecte, publicOuConnecte } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";
import { faqArrayField, seoFields, slugField } from "../fields";
import { previewUrl } from "../preview";

export const Formules: CollectionConfig = {
    slug: "formules",
    labels: { singular: "Formule (tarif)", plural: "Formules & tarifs" },
    admin: {
        useAsTitle: "titre",
        group: "Contenu",
        defaultColumns: ["titre", "slug", "groupe", "ordre", "_status"],
        description:
            "Les formules affichées sur la page Tarifs. Chaque formule peut avoir sa propre page de souscription (/tarifs/…) reliée à Sportigo.",
        livePreview: {
            url: ({ data }) =>
                previewUrl(data?.pageDediee === false ? "/tarifs" : `/tarifs/${data?.slug ?? ""}`),
        },
    },
    versions: { drafts: { autosave: { interval: 800 } } },
    access: {
        read: publicOuConnecte,
        create: connecte,
        update: connecte,
        delete: connecte,
    },
    hooks: {
        afterChange: [revalidateApresPublication],
        afterDelete: [revalidateApresSuppression],
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Carte (page Tarifs)",
                    fields: [
                        { name: "titre", type: "text", label: "Nom de la formule", required: true },
                        slugField("Adresse de la page dédiée : /tarifs/<slug>. Ex : « classic » donne /tarifs/classic."),
                        { name: "sousTitre", type: "text", label: "Sous-titre", admin: { description: "Ex : « Musculation & cardio »" } },
                        {
                            name: "groupe",
                            type: "select",
                            label: "Emplacement sur la page Tarifs",
                            defaultValue: "principale",
                            required: true,
                            options: [
                                { label: "Formules principales (haut de page)", value: "principale" },
                                { label: "Autres formules (bas de page)", value: "autre" },
                                { label: "Carte cadeau (pleine largeur)", value: "cadeau" },
                                { label: "Ne pas afficher sur la page Tarifs", value: "cachee" },
                            ],
                        },
                        { name: "ordre", type: "number", label: "Ordre d'affichage", defaultValue: 0 },
                        {
                            name: "prix",
                            type: "group",
                            label: "Étiquette de prix",
                            fields: [
                                { name: "prefixe", type: "text", label: "Texte avant", admin: { description: "Ex : « A partir de »" } },
                                { name: "montant", type: "text", label: "Montant (mis en avant)", admin: { description: "Ex : « 40€ »" } },
                                { name: "suffixe", type: "text", label: "Texte après", admin: { description: "Ex : « /mois » ou « /an »" } },
                            ],
                        },
                        {
                            name: "images",
                            type: "array",
                            label: "Photos (diaporama de la carte)",
                            labels: { singular: "Photo", plural: "Photos" },
                            fields: [
                                { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                            ],
                        },
                        {
                            name: "avantages",
                            type: "array",
                            label: "Points forts (avec coche)",
                            labels: { singular: "Point fort", plural: "Points forts" },
                            fields: [
                                { name: "texte", type: "richText", label: "Texte", required: true },
                                {
                                    name: "icone",
                                    type: "select",
                                    label: "Icône",
                                    defaultValue: "check",
                                    options: [
                                        { label: "Double coche", value: "check" },
                                        { label: "Plus (option payante)", value: "plus" },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "lienCarte",
                            type: "text",
                            label: "Destination du bouton « En savoir plus » (facultatif)",
                            admin: {
                                description:
                                    "Par défaut la carte renvoie vers la page dédiée /tarifs/<slug>. Renseignez une autre adresse pour la remplacer (ex : /carte-cadeau).",
                            },
                        },
                    ],
                },
                {
                    label: "Page de souscription",
                    fields: [
                        {
                            name: "pageDediee",
                            type: "checkbox",
                            label: "Cette formule a sa propre page /tarifs/<slug>",
                            defaultValue: true,
                        },
                        {
                            name: "sousTitrePage",
                            type: "richText",
                            label: "Sous-titre de la page",
                            admin: {
                                condition: (data) => data?.pageDediee !== false,
                                description: "Ex : « Musculation & cardio + Cours Collectifs + SmallGroups »",
                            },
                        },
                        {
                            name: "afficherContact",
                            type: "checkbox",
                            label: "Afficher téléphone et email sous le sous-titre",
                            defaultValue: false,
                            admin: { condition: (data) => data?.pageDediee !== false },
                        },
                        {
                            name: "offresSimples",
                            type: "number",
                            label: "Offres Sportigo (sans filtres)",
                            hasMany: true,
                            admin: {
                                condition: (data) => data?.pageDediee !== false,
                                description:
                                    "Liste d'offres affichées directement, sans filtres (ex : page Danse). Laissez vide si vous utilisez des groupes de filtres ci-dessous.",
                            },
                        },
                        {
                            name: "filtres",
                            type: "array",
                            label: "Groupes de filtres",
                            labels: { singular: "Groupe de filtres", plural: "Groupes de filtres" },
                            admin: {
                                condition: (data) => data?.pageDediee !== false,
                                description:
                                    "Chaque groupe affiche une rangée de filtres exclusifs (ex : Sans engagement / Mensuel / Annuel). Les identifiants d'offres proviennent de Sportigo.",
                            },
                            fields: [
                                {
                                    name: "titreAucun",
                                    type: "text",
                                    label: "Libellé « aucun filtre »",
                                    defaultValue: "Tout type de paiement",
                                    required: true,
                                },
                                {
                                    name: "options",
                                    type: "array",
                                    label: "Options",
                                    labels: { singular: "Option", plural: "Options" },
                                    fields: [
                                        { name: "nom", type: "text", label: "Nom du filtre", required: true },
                                        {
                                            name: "ids",
                                            type: "number",
                                            label: "Identifiants d'offres Sportigo",
                                            hasMany: true,
                                            required: true,
                                            admin: {
                                                description:
                                                    "Numéros des offres dans Sportigo (ex : 21408). Plusieurs valeurs possibles.",
                                            },
                                        },
                                        {
                                            name: "optionUrl",
                                            type: "text",
                                            label: "Pré-sélection par lien (facultatif)",
                                            admin: {
                                                description:
                                                    "Si renseigné, l'adresse /tarifs/<slug>?option=<valeur> active ce filtre automatiquement (ex : « small-groups »).",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Référencement",
                    fields: [seoFields(), faqArrayField("faqSeo", "FAQ de la page (facultatif)")],
                },
            ],
        },
    ],
};
