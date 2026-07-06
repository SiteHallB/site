import type { CollectionConfig } from "payload";
import { connecte, publicOuConnecte } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";
import { boutonField, faqArrayField, ICONES, seoFields, slugField } from "../fields";
import { previewUrl } from "../preview";

export const Cours: CollectionConfig = {
    slug: "cours",
    labels: { singular: "Cours", plural: "Cours" },
    admin: {
        useAsTitle: "titre",
        group: "Contenu",
        defaultColumns: ["titre", "slug", "ordre", "_status"],
        description:
            "Chaque cours a sa propre page (/cours/…) et apparaît dans la liste « Nos cours ». Créez, modifiez ou supprimez librement.",
        livePreview: {
            url: ({ data }) => previewUrl(`/cours/${data?.slug ?? ""}`),
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
                    label: "Général",
                    fields: [
                        {
                            name: "titre",
                            type: "text",
                            label: "Nom du cours",
                            required: true,
                            admin: { description: "Ex : RPM, Pilates, Body Pump…" },
                        },
                        slugField("Adresse de la page : /cours/<slug>. Ex : « rpm » donne /cours/rpm."),
                        {
                            name: "image",
                            type: "upload",
                            relationTo: "media",
                            label: "Image du cours",
                            required: true,
                            admin: { description: "Utilisée dans le bandeau d'ouverture et les sections de la page." },
                        },
                        {
                            name: "ordre",
                            type: "number",
                            label: "Ordre d'affichage",
                            defaultValue: 0,
                            admin: { description: "Dans la liste « Nos cours » : du plus petit au plus grand." },
                        },
                        {
                            name: "pageActive",
                            type: "checkbox",
                            label: "Ce cours a sa propre page détaillée",
                            defaultValue: true,
                            admin: {
                                description:
                                    "Décochez pour un cours affiché uniquement dans la liste « Nos cours », sans page dédiée (ex : Abdos Flash).",
                            },
                        },
                        {
                            name: "carte",
                            type: "group",
                            label: "Carte dans la liste « Nos cours »",
                            fields: [
                                {
                                    name: "resume",
                                    type: "textarea",
                                    label: "Résumé court",
                                    admin: { description: "1 à 2 phrases affichées sur la carte du cours." },
                                },
                                {
                                    name: "icone",
                                    type: "select",
                                    label: "Icône",
                                    options: ICONES,
                                    defaultValue: "Activity",
                                },
                                {
                                    name: "intensite",
                                    type: "select",
                                    label: "Intensité",
                                    options: [
                                        { label: "Modérée", value: "Modérée" },
                                        { label: "Élevée", value: "Élevée" },
                                        { label: "Très élevée", value: "Très élevée" },
                                    ],
                                    defaultValue: "Élevée",
                                },
                                { name: "duree", type: "text", label: "Durée affichée", defaultValue: "45 min" },
                                {
                                    name: "themeBleu",
                                    type: "checkbox",
                                    label: "Carte bleue (cours Aqua)",
                                    defaultValue: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Haut de page",
                    fields: [
                        {
                            name: "eyebrow",
                            type: "text",
                            label: "Sur-titre",
                            defaultValue: "Cours collectif",
                            admin: { description: "Petit texte doré au-dessus du titre principal." },
                        },
                        { name: "h1Top", type: "text", label: "Titre — ligne 1", required: true, admin: { description: "Ex : « Cours de RPM »" } },
                        { name: "h1Bottom", type: "text", label: "Titre — ligne 2 (dorée)", defaultValue: "à Saint Dionisy" },
                        {
                            name: "heroLead",
                            type: "richText",
                            label: "Phrase d'accroche",
                            admin: { description: "Sous le titre. Le gras apparaît en doré sur le site." },
                        },
                        {
                            name: "stats",
                            type: "array",
                            label: "Chiffres clés (bandeau sous le titre)",
                            labels: { singular: "Chiffre clé", plural: "Chiffres clés" },
                            maxRows: 4,
                            fields: [
                                { name: "value", type: "text", label: "Valeur", required: true, admin: { description: "Ex : « 45 min »" } },
                                { name: "label", type: "text", label: "Légende", required: true, admin: { description: "Ex : « Durée d'une séance »" } },
                            ],
                        },
                        boutonField("boutonSecondaire", "Bouton secondaire du bandeau", {
                            defaultTexte: "Voir les plannings",
                            defaultUrl: "/plannings",
                            defaultStyle: "primary",
                        }),
                    ],
                },
                {
                    label: "Sections",
                    fields: [
                        {
                            name: "quoi",
                            type: "group",
                            label: "Section « C'est quoi ? »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", admin: { description: "Ex : « Le RPM, c'est quoi ? »" } },
                                { name: "paragraphe1", type: "richText", label: "Paragraphe 1" },
                                { name: "paragraphe2", type: "richText", label: "Paragraphe 2" },
                            ],
                        },
                        {
                            name: "benefices",
                            type: "group",
                            label: "Section « Pourquoi essayer »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", admin: { description: "Ex : « 6 raisons de se mettre au RPM »" } },
                                {
                                    name: "liste",
                                    type: "array",
                                    label: "Bénéfices",
                                    labels: { singular: "Bénéfice", plural: "Bénéfices" },
                                    fields: [
                                        { name: "icone", type: "select", label: "Icône", options: ICONES, defaultValue: "Sparkles" },
                                        { name: "titre", type: "text", label: "Titre", required: true },
                                        { name: "texte", type: "textarea", label: "Texte", required: true },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "deroulement",
                            type: "array",
                            label: "Section « Comment se déroule une séance » (étapes)",
                            labels: { singular: "Étape", plural: "Étapes" },
                            fields: [
                                { name: "titre", type: "text", label: "Titre de l'étape", required: true },
                                { name: "texte", type: "textarea", label: "Description", required: true },
                            ],
                            admin: { description: "La numérotation (01, 02, …) est automatique." },
                        },
                        {
                            name: "equipement",
                            type: "group",
                            label: "Section « L'équipement »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", admin: { description: "Ex : « Une salle entièrement dédiée »" } },
                                { name: "paragraphe1", type: "richText", label: "Paragraphe 1" },
                                { name: "paragraphe2", type: "richText", label: "Paragraphe 2" },
                            ],
                        },
                        {
                            name: "public",
                            type: "group",
                            label: "Section « À qui ça s'adresse ? »",
                            fields: [
                                { name: "intro", type: "richText", label: "Introduction" },
                                {
                                    name: "points",
                                    type: "array",
                                    label: "Liste à puces",
                                    labels: { singular: "Point", plural: "Points" },
                                    fields: [{ name: "texte", type: "text", label: "Texte", required: true }],
                                },
                            ],
                        },
                        {
                            name: "zone",
                            type: "group",
                            label: "Section « Zone géographique »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", defaultValue: "À 15 min de Nîmes" },
                                { name: "texte", type: "richText", label: "Texte" },
                            ],
                        },
                        faqArrayField(),
                    ],
                },
                {
                    label: "Référencement",
                    fields: [
                        seoFields(),
                        {
                            name: "schemaExercice",
                            type: "group",
                            label: "Données structurées Google (avancé)",
                            admin: {
                                description:
                                    "Informations transmises à Google pour décrire le cours (résultats enrichis).",
                            },
                            fields: [
                                { name: "nom", type: "text", label: "Nom de l'activité", admin: { description: "Ex : « Cours de RPM (Raw Power in Motion) »" } },
                                { name: "description", type: "textarea", label: "Description de l'activité" },
                                { name: "typeExercice", type: "text", label: "Type d'exercice (en anglais)", admin: { description: "Ex : « Indoor cycling », « Pilates »…" } },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
