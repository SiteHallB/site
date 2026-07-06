import type { GlobalConfig } from "payload";
import { connecte, lecturePublique } from "../access";
import { revalidateGlobal } from "../hooks";
import { couleurField } from "../fields";

export const Theme: GlobalConfig = {
    slug: "theme",
    label: "Apparence (couleurs & polices)",
    admin: {
        group: "Réglages",
        description:
            "Couleurs et polices de tout le site. Les modifications s'appliquent partout instantanément.",
    },
    access: { read: lecturePublique, update: connecte },
    hooks: { afterChange: [revalidateGlobal] },
    fields: [
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            label: "Logo du site",
            admin: { description: "Affiché sur la page d'accueil, dans le pied de page et le menu." },
        },
        {
            name: "couleurs",
            type: "group",
            label: "Couleurs",
            fields: [
                couleurField("accent", "Couleur d'accent (doré)", "#E1C340", "Boutons, liens et mises en avant."),
                couleurField("fondPrincipal", "Fond principal", "#121212"),
                couleurField("fondCartes", "Fond des cartes et encadrés", "#242424"),
                couleurField("fondSombre", "Fond sombre (sections alternées, footer)", "#000000"),
                couleurField("texte", "Couleur du texte principal", "#FFFFFF"),
                couleurField("texteAttenue", "Couleur du texte secondaire", "#FFFFFF99", "Texte atténué : paragraphes, légendes."),
                couleurField("positif", "Couleur « oui / validé »", "#15803D"),
                couleurField("negatif", "Couleur « non / erreur »", "#EF4444"),
            ],
        },
        {
            name: "polices",
            type: "group",
            label: "Polices",
            fields: [
                {
                    name: "titres",
                    type: "select",
                    label: "Police des titres",
                    defaultValue: "futuretense",
                    required: true,
                    options: [
                        { label: "Future Tense (police actuelle)", value: "futuretense" },
                        { label: "Bebas Neue", value: "bebas" },
                        { label: "Oswald", value: "oswald" },
                        { label: "Anton", value: "anton" },
                        { label: "Montserrat", value: "montserrat" },
                    ],
                },
                {
                    name: "corps",
                    type: "select",
                    label: "Police du texte",
                    defaultValue: "montserrat",
                    required: true,
                    options: [
                        { label: "Montserrat (police actuelle)", value: "montserrat" },
                        { label: "Inter", value: "inter" },
                        { label: "Open Sans", value: "opensans" },
                    ],
                },
            ],
        },
    ],
};
