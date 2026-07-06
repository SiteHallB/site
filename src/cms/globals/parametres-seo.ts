import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";

export const ParametresSeo: GlobalConfig = {
    slug: "parametres-seo",
    label: "Référencement du site",
    admin: {
        group: "Réglages",
        description:
            "Réglages de référencement globaux : titre et description par défaut, image de partage, fiche Google (données structurées).",
    },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        { name: "titreParDefaut", type: "text", label: "Titre par défaut du site", admin: { description: "Utilisé quand une page n'a pas de titre SEO. Ex : « HALL B »" } },
        { name: "descriptionParDefaut", type: "textarea", label: "Description par défaut" },
        {
            name: "imagePartage",
            type: "upload",
            relationTo: "media",
            label: "Image de partage par défaut (Open Graph)",
        },
        {
            name: "ficheGoogle",
            type: "group",
            label: "Fiche Google (données structurées LocalBusiness)",
            admin: {
                description:
                    "Informations transmises à Google pour la fiche de l'établissement. L'adresse, le téléphone et les horaires proviennent de « Coordonnées & horaires ».",
            },
            fields: [
                { name: "nom", type: "text", label: "Nom de l'établissement", defaultValue: "HALL B" },
                { name: "description", type: "textarea", label: "Description de l'établissement" },
                {
                    name: "logo",
                    type: "upload",
                    relationTo: "media",
                    label: "Logo (fiche Google)",
                },
                {
                    name: "gammePrix",
                    type: "text",
                    label: "Gamme de prix",
                    defaultValue: "€€",
                },
                {
                    name: "zonesDesservies",
                    type: "array",
                    label: "Zones desservies",
                    labels: { singular: "Zone", plural: "Zones" },
                    fields: [
                        { name: "nom", type: "text", label: "Nom", required: true },
                        {
                            name: "type",
                            type: "select",
                            label: "Type",
                            defaultValue: "City",
                            options: [
                                { label: "Ville", value: "City" },
                                { label: "Zone / région", value: "AdministrativeArea" },
                            ],
                        },
                    ],
                },
                {
                    name: "equipements",
                    type: "array",
                    label: "Équipements & services",
                    labels: { singular: "Équipement", plural: "Équipements" },
                    fields: [{ name: "nom", type: "text", label: "Nom", required: true }],
                },
            ],
        },
    ],
};
