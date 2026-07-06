import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";

export const Navigation: GlobalConfig = {
    slug: "navigation",
    label: "Menu & navigation",
    admin: {
        group: "Réglages",
        description: "Liens du menu, boutons de la barre de navigation et image du menu.",
    },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        {
            name: "liensPrincipaux",
            type: "array",
            label: "Liens principaux du menu",
            labels: { singular: "Lien", plural: "Liens" },
            fields: [
                { name: "label", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
                { name: "externe", type: "checkbox", label: "Lien externe (nouvel onglet)", defaultValue: false },
            ],
        },
        {
            name: "liensSecondaires",
            type: "array",
            label: "Liens secondaires (sous la barre de séparation)",
            labels: { singular: "Lien", plural: "Liens" },
            fields: [
                { name: "label", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
                { name: "externe", type: "checkbox", label: "Lien externe (nouvel onglet)", defaultValue: false },
            ],
        },
        {
            name: "boutonsBarre",
            type: "array",
            label: "Boutons de la barre de navigation (en haut à droite)",
            labels: { singular: "Bouton", plural: "Boutons" },
            maxRows: 2,
            fields: [
                { name: "texte", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
                {
                    name: "style",
                    type: "select",
                    label: "Style",
                    defaultValue: "primary",
                    options: [
                        { label: "Plein (fond doré)", value: "accent" },
                        { label: "Contour", value: "primary" },
                    ],
                },
            ],
        },
        {
            name: "imageMenu",
            type: "upload",
            relationTo: "media",
            label: "Image décorative du menu",
        },
        {
            name: "liensLegaux",
            type: "array",
            label: "Liens du bas de page (FAQ, mentions légales…)",
            labels: { singular: "Lien", plural: "Liens" },
            admin: { description: "Le bouton « Gérer mes cookies » est ajouté automatiquement." },
            fields: [
                { name: "label", type: "text", label: "Texte", required: true },
                { name: "url", type: "text", label: "Destination", required: true },
            ],
        },
    ],
};
