import type { CollectionConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";

export const FaqItems: CollectionConfig = {
    slug: "faq-items",
    labels: { singular: "Question (FAQ)", plural: "FAQ générale" },
    admin: {
        useAsTitle: "question",
        group: "Contenu",
        defaultColumns: ["question", "ordre"],
        description: "Questions/réponses de la page FAQ (/faq). Transmises à Google (résultats enrichis).",
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
        { name: "question", type: "text", label: "Question", required: true },
        { name: "reponse", type: "textarea", label: "Réponse", required: true },
        { name: "ordre", type: "number", label: "Ordre d'affichage", defaultValue: 0 },
    ],
};
