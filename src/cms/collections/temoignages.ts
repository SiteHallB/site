import type { CollectionConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";

export const Temoignages: CollectionConfig = {
    slug: "temoignages",
    labels: { singular: "Témoignage", plural: "Témoignages" },
    admin: {
        useAsTitle: "nom",
        group: "Contenu",
        defaultColumns: ["nom", "note", "visible"],
        description:
            "Témoignages rédigés à la main. Le site affiche en priorité les avis Google ; ces témoignages servent de complément ou de remplacement (voir Réglages du site → Avis).",
    },
    access: {
        read: lecturePublique,
        create: connecte,
        update: connecte,
        delete: connecte,
    },
    hooks: {
        afterChange: [revalidateApresPublication],
        afterDelete: [revalidateApresSuppression],
    },
    fields: [
        { name: "nom", type: "text", label: "Prénom / nom", required: true },
        { name: "texte", type: "textarea", label: "Témoignage", required: true },
        {
            name: "note",
            type: "number",
            label: "Note (1 à 5)",
            min: 1,
            max: 5,
            defaultValue: 5,
        },
        { name: "visible", type: "checkbox", label: "Afficher sur le site", defaultValue: true },
        { name: "ordre", type: "number", label: "Ordre d'affichage", defaultValue: 0 },
    ],
};
