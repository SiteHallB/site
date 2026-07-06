import type { CollectionConfig, Field } from "payload";
import { connecte, publicOuConnecte } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";
import { boutonField, seoFields, slugField } from "../fields";
import { previewUrl } from "../preview";

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: { singular: "Page libre", plural: "Pages libres" },
    admin: {
        useAsTitle: "titre",
        group: "Contenu",
        defaultColumns: ["titre", "slug", "_status"],
        description:
            "Pages construites par blocs, accessibles à la racine du site (/<slug>). Idéal pour créer une nouvelle page (événement, mentions légales, offre spéciale…) sans toucher au code.",
        livePreview: {
            url: ({ data }) => previewUrl(`/${data?.slug ?? ""}`),
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
        { name: "titre", type: "text", label: "Titre de la page (H1)", required: true },
        slugField("Adresse de la page à la racine du site. Ex : « mentions-legales » donne /mentions-legales."),
        {
            name: "gabarit",
            type: "select",
            label: "Mise en page",
            defaultValue: "standard",
            options: [
                { label: "Standard (titre centré + sections)", value: "standard" },
                { label: "Document (texte continu, type mentions légales)", value: "document" },
            ],
        },
        { name: "sousTitre", type: "richText", label: "Sous-titre (facultatif)" },
        contenuField(),
        seoFields(),
    ],
};

function contenuField(): Field {
    return {
            name: "contenu",
            type: "blocks",
            label: "Contenu de la page",
            labels: { singular: "Bloc", plural: "Blocs" },
            blocks: ([
                {
                    slug: "texte",
                    labels: { singular: "Bloc texte", plural: "Blocs texte" },
                    fields: [
                        { name: "contenu", type: "richText", label: "Texte" },
                    ],
                },
                {
                    slug: "markdown",
                    labels: { singular: "Bloc Markdown", plural: "Blocs Markdown" },
                    fields: [
                        {
                            name: "contenu",
                            type: "textarea",
                            label: "Contenu Markdown",
                            admin: {
                                description:
                                    "Syntaxe Markdown : # titre, ## sous-titre, + liste, [texte](lien)…",
                                rows: 20,
                            },
                        },
                    ],
                },
                {
                    slug: "imageTexte",
                    labels: { singular: "Image + texte", plural: "Images + texte" },
                    fields: [
                        { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                        { name: "titre", type: "text", label: "Titre" },
                        { name: "texte", type: "richText", label: "Texte" },
                        { name: "imageADroite", type: "checkbox", label: "Image à droite", defaultValue: false },
                    ],
                },
                {
                    slug: "cta",
                    labels: { singular: "Appel à l'action", plural: "Appels à l'action" },
                    fields: [
                        { name: "titre", type: "text", label: "Titre" },
                        { name: "texte", type: "richText", label: "Texte" },
                        boutonField("bouton", "Bouton"),
                    ],
                },
                {
                    slug: "faq",
                    labels: { singular: "Bloc FAQ", plural: "Blocs FAQ" },
                    fields: [
                        { name: "titre", type: "text", label: "Titre", defaultValue: "Questions fréquentes" },
                        {
                            name: "items",
                            type: "array",
                            label: "Questions",
                            fields: [
                                { name: "question", type: "text", label: "Question", required: true },
                                { name: "reponse", type: "textarea", label: "Réponse", required: true },
                            ],
                        },
                    ],
                },
                {
                    slug: "cartes",
                    labels: { singular: "Grille de cartes", plural: "Grilles de cartes" },
                    fields: [
                        { name: "titre", type: "text", label: "Titre" },
                        {
                            name: "items",
                            type: "array",
                            label: "Cartes",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", required: true },
                                { name: "texte", type: "textarea", label: "Texte" },
                                { name: "image", type: "upload", relationTo: "media", label: "Image (facultative)" },
                                { name: "url", type: "text", label: "Lien (facultatif)" },
                            ],
                        },
                    ],
                },
            ]),
    };
}
