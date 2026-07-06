import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";
import { boutonField, seoFields } from "../fields";
import { previewUrl } from "../preview";

export const Accueil: GlobalConfig = {
    slug: "accueil",
    label: "Page d'accueil",
    admin: {
        group: "Pages",
        description: "Tout le contenu de la page d'accueil, section par section.",
        livePreview: { url: () => previewUrl("/") },
    },
    versions: { drafts: { autosave: { interval: 800 } } },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Bandeau d'ouverture",
                    fields: [
                        {
                            name: "hero",
                            type: "group",
                            label: "Bandeau vidéo",
                            fields: [
                                {
                                    name: "titre",
                                    type: "text",
                                    label: "Phrase sous le logo (H1)",
                                    defaultValue: "La plus grande salle de sport du Gard",
                                },
                                {
                                    name: "videoDesktop",
                                    type: "text",
                                    label: "Vidéo ordinateur (lien .m3u8)",
                                    admin: { description: "Lien de diffusion Bunny CDN pour grands écrans." },
                                },
                                {
                                    name: "videoMobile",
                                    type: "text",
                                    label: "Vidéo mobile (lien .m3u8)",
                                },
                                {
                                    name: "posterDesktop",
                                    type: "upload",
                                    relationTo: "media",
                                    label: "Image d'attente ordinateur",
                                    admin: { description: "Affichée avant le chargement de la vidéo." },
                                },
                                {
                                    name: "posterMobile",
                                    type: "upload",
                                    relationTo: "media",
                                    label: "Image d'attente mobile",
                                },
                                {
                                    name: "bandeau",
                                    type: "array",
                                    label: "Bandeau d'activités (mots qui clignotent)",
                                    labels: { singular: "Activité", plural: "Activités" },
                                    fields: [
                                        { name: "texte", type: "text", label: "Texte", required: true },
                                        { name: "url", type: "text", label: "Destination", required: true },
                                        { name: "externe", type: "checkbox", label: "Lien externe", defaultValue: false },
                                    ],
                                },
                                {
                                    name: "boutons",
                                    type: "array",
                                    label: "Boutons",
                                    labels: { singular: "Bouton", plural: "Boutons" },
                                    maxRows: 3,
                                    fields: [
                                        { name: "texte", type: "text", label: "Texte", required: true },
                                        { name: "url", type: "text", label: "Destination", required: true },
                                        {
                                            name: "style",
                                            type: "select",
                                            label: "Style",
                                            defaultValue: "accent",
                                            options: [
                                                { label: "Plein (fond doré)", value: "accent" },
                                                { label: "Contour", value: "primary" },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Notre Concept",
                    fields: [
                        {
                            name: "concept",
                            type: "group",
                            label: "Section « Notre Concept »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", defaultValue: "Notre Concept" },
                                { name: "intro", type: "richText", label: "Texte d'introduction" },
                                {
                                    name: "sections",
                                    type: "array",
                                    label: "Cartes (Espace, Encadrement, Qualité…)",
                                    labels: { singular: "Carte", plural: "Cartes" },
                                    fields: [
                                        { name: "titre", type: "text", label: "Titre", required: true },
                                        { name: "texte", type: "richText", label: "Texte" },
                                        { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                                    ],
                                },
                                { name: "ctaTexte", type: "richText", label: "Phrase de conclusion" },
                                boutonField("ctaBouton", "Bouton", { defaultTexte: "Je m'inscris", defaultUrl: "/tarifs" }),
                            ],
                        },
                    ],
                },
                {
                    label: "Essai offert",
                    fields: [
                        {
                            name: "essaiOffert",
                            type: "group",
                            label: "Section « Viens essayer »",
                            fields: [
                                { name: "ligne1", type: "text", label: "Texte au-dessus du logo", defaultValue: "Viens essayer" },
                                { name: "ligne2", type: "text", label: "Texte sous le logo", defaultValue: "gratuitement et sans engagement" },
                                boutonField("bouton", "Bouton", { defaultTexte: "Essai Offert", defaultUrl: "/essai-offert" }),
                            ],
                        },
                    ],
                },
                {
                    label: "Notre Histoire",
                    fields: [
                        {
                            name: "histoire",
                            type: "group",
                            label: "Section « Notre Histoire »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", defaultValue: "Notre Histoire" },
                                { name: "intro", type: "richText", label: "Phrase d'introduction" },
                                { name: "image", type: "upload", relationTo: "media", label: "Image" },
                                { name: "texte", type: "richText", label: "Texte affiché après l'image" },
                            ],
                        },
                    ],
                },
                {
                    label: "Nos Valeurs",
                    fields: [
                        {
                            name: "valeurs",
                            type: "group",
                            label: "Section « Nos Valeurs »",
                            fields: [
                                { name: "titre", type: "text", label: "Titre", defaultValue: "Nos Valeurs" },
                                { name: "image", type: "upload", relationTo: "media", label: "Image" },
                                {
                                    name: "liste",
                                    type: "array",
                                    label: "Valeurs",
                                    labels: { singular: "Valeur", plural: "Valeurs" },
                                    fields: [{ name: "nom", type: "text", label: "Nom", required: true }],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Bloc SEO local",
                    fields: [
                        {
                            name: "seoLocal",
                            type: "group",
                            label: "Section « Votre salle de sport entre Nîmes et la Vaunage »",
                            admin: {
                                description:
                                    "La grille des villes avec temps de trajet est générée automatiquement à partir des Pages locales (SEO).",
                            },
                            fields: [
                                { name: "titre", type: "text", label: "Titre" },
                                { name: "contenu", type: "richText", label: "Texte" },
                            ],
                        },
                    ],
                },
                {
                    label: "Témoignages",
                    fields: [
                        {
                            name: "temoignages",
                            type: "group",
                            label: "Avis affichés en pied de page",
                            fields: [
                                {
                                    name: "source",
                                    type: "select",
                                    label: "Source des avis",
                                    defaultValue: "google",
                                    options: [
                                        { label: "Avis Google (automatique)", value: "google" },
                                        { label: "Témoignages rédigés dans le back-office", value: "manuel" },
                                    ],
                                    admin: {
                                        description:
                                            "Les témoignages manuels se gèrent dans Contenu → Témoignages.",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Référencement",
                    fields: [seoFields()],
                },
            ],
        },
    ],
};
