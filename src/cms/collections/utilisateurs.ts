import type { CollectionConfig } from "payload";
import { connecte } from "../access";

export const Utilisateurs: CollectionConfig = {
    slug: "utilisateurs",
    labels: { singular: "Utilisateur", plural: "Utilisateurs" },
    admin: {
        useAsTitle: "email",
        group: "Réglages",
        description: "Comptes ayant accès à ce back-office.",
    },
    auth: true,
    access: {
        read: connecte,
        create: connecte,
        update: connecte,
        delete: connecte,
    },
    fields: [
        { name: "nom", type: "text", label: "Nom" },
    ],
};
