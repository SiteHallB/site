import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";
import { previewUrl } from "../preview";

export const Plannings: GlobalConfig = {
    slug: "plannings-page",
    label: "Page Plannings",
    admin: {
        group: "Pages",
        description:
            "Images des plannings (une par jour + version ordinateur) et descriptions des activités.",
        livePreview: { url: () => previewUrl("/plannings") },
    },
    versions: { drafts: { autosave: { interval: 800 } } },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        { name: "titre", type: "text", label: "Titre de la page", defaultValue: "Plannings" },
        { name: "sousTitre", type: "text", label: "Sous-titre", defaultValue: "Consultez nos nombreuses activités" },
        {
            name: "sections",
            type: "array",
            label: "Plannings",
            labels: { singular: "Planning", plural: "Plannings" },
            admin: {
                description:
                    "Chaque planning affiche une grande image sur ordinateur et un diaporama (une image par jour) sur mobile. Pour un planning simple (ex : Danse), n'ajoutez qu'une seule image et laissez la version ordinateur vide.",
            },
            fields: [
                { name: "titre", type: "text", label: "Titre", required: true },
                {
                    name: "imageBureau",
                    type: "upload",
                    relationTo: "media",
                    label: "Image ordinateur (planning complet)",
                },
                {
                    name: "jours",
                    type: "array",
                    label: "Images mobiles (une par jour)",
                    labels: { singular: "Image", plural: "Images" },
                    fields: [
                        { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                    ],
                },
            ],
        },
        {
            name: "activites",
            type: "array",
            label: "Descriptions des activités (bas de page)",
            labels: { singular: "Activité", plural: "Activités" },
            fields: [
                { name: "titre", type: "text", label: "Nom", required: true },
                { name: "illustration", type: "upload", relationTo: "media", label: "Illustration (petite image/pictogramme)" },
                { name: "url", type: "text", label: "Lien au clic", defaultValue: "/tarifs/boost" },
                { name: "description", type: "textarea", label: "Description", required: true },
            ],
        },
        {
            name: "seo",
            type: "group",
            label: "Référencement (SEO)",
            fields: [
                { name: "titre", type: "text", label: "Titre de la page (balise <title>)" },
                { name: "description", type: "textarea", label: "Description (meta description)" },
            ],
        },
    ],
};
