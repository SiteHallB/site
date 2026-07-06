import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";
import { boutonField } from "../fields";

export const Popup: GlobalConfig = {
    slug: "popup",
    label: "Fenêtre promotionnelle (popup)",
    admin: {
        group: "Réglages",
        description:
            "Fenêtre qui s'ouvre à la première interaction du visiteur. Activez-la pour mettre en avant une offre.",
    },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        { name: "actif", type: "checkbox", label: "Afficher la popup sur le site", defaultValue: false },
        { name: "titre", type: "text", label: "Titre", defaultValue: "Essai Offert" },
        { name: "sousTitre", type: "text", label: "Sous-titre", defaultValue: "Vous hésitez encore à franchir le pas ?" },
        {
            name: "texte",
            type: "textarea",
            label: "Texte",
            defaultValue:
                "Profitez d'une séance découverte 100% gratuite pour tester notre salle et vivre l'expérience par vous-même.",
        },
        boutonField("bouton", "Bouton", { defaultTexte: "J'en profite", defaultUrl: "/essai-offert" }),
        {
            name: "delai",
            type: "number",
            label: "Délai d'apparition (millisecondes)",
            defaultValue: 1000,
            admin: { description: "Temps après la première interaction (clic, défilement…) avant l'ouverture." },
        },
    ],
};
