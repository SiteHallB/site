import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";

export const Coordonnees: GlobalConfig = {
    slug: "coordonnees",
    label: "Coordonnées & horaires",
    admin: {
        group: "Réglages",
        description:
            "Téléphone, email, adresse, horaires, réseaux sociaux et partenaires. Utilisés dans tout le site (menu, pied de page, pages contact…).",
    },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        { name: "telephone", type: "text", label: "Téléphone (affiché)", required: true, admin: { description: "Ex : 04 66 19 16 76" } },
        { name: "email", type: "text", label: "Email de contact", required: true },
        {
            name: "adresse",
            type: "group",
            label: "Adresse",
            fields: [
                { name: "rue", type: "text", label: "Numéro et rue", admin: { description: "Ex : 1 chemin Azord" } },
                { name: "codePostal", type: "text", label: "Code postal" },
                { name: "ville", type: "text", label: "Ville" },
                {
                    name: "affichage",
                    type: "text",
                    label: "Adresse affichée (une ligne)",
                    admin: { description: "Telle qu'affichée dans le pied de page. Ex : « 1 Chem. d'Azord, 30980 Saint-Dionisy »" },
                },
                { name: "lienGoogleMaps", type: "text", label: "Lien Google Maps" },
            ],
        },
        {
            name: "horaires",
            type: "group",
            label: "Horaires",
            fields: [
                { name: "ouverture", type: "text", label: "Ligne 1 — ouverture", admin: { description: "Ex : « Ouvert 6h-23h 7/7j »" } },
                {
                    name: "reception",
                    type: "text",
                    label: "Ligne 2 — réception (dorée)",
                    admin: { description: "Ex : « Réception LUN-VEN 9-13h•16-21h / SAM 9-13h•15h30-19h »" },
                },
                { name: "ouvertureGoogle", type: "text", label: "Heure d'ouverture (Google)", defaultValue: "06:00", admin: { description: "Format 24h HH:MM — utilisé pour la fiche Google." } },
                { name: "fermetureGoogle", type: "text", label: "Heure de fermeture (Google)", defaultValue: "23:00" },
            ],
        },
        {
            name: "reseaux",
            type: "group",
            label: "Réseaux sociaux",
            fields: [
                { name: "instagram", type: "text", label: "Lien Instagram" },
                { name: "instagramLabel", type: "text", label: "Nom affiché Instagram", defaultValue: "hallb.fr" },
                { name: "facebook", type: "text", label: "Lien Facebook" },
                { name: "facebookLabel", type: "text", label: "Nom affiché Facebook", defaultValue: "HALL B" },
                { name: "avisGoogle", type: "text", label: "Lien « laisser un avis Google »" },
            ],
        },
        {
            name: "osteo",
            type: "text",
            label: "Lien de prise de rendez-vous ostéopathe (Doctolib)",
        },
        {
            name: "partenaires",
            type: "array",
            label: "Partenaires (logos du pied de page)",
            labels: { singular: "Partenaire", plural: "Partenaires" },
            fields: [
                { name: "nom", type: "text", label: "Nom", required: true },
                { name: "url", type: "text", label: "Site web", required: true },
                { name: "logo", type: "upload", relationTo: "media", label: "Logo", required: true },
            ],
        },
    ],
};
