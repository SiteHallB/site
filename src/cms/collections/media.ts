import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";
import { connecte, lecturePublique } from "../access";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
    slug: "media",
    labels: { singular: "Média", plural: "Médiathèque" },
    admin: {
        group: "Contenu",
        description:
            "Toutes les images et fichiers du site. Pensez à renseigner le texte alternatif (accessibilité et référencement).",
    },
    access: {
        read: lecturePublique,
        create: connecte,
        update: connecte,
        delete: connecte,
    },
    upload: {
        // En local : fichiers stockés dans public/media.
        // En production (Vercel) : stockage automatique sur Vercel Blob via le plugin.
        staticDir: path.resolve(dirname, "../../../public/media"),
        mimeTypes: ["image/*", "video/*", "application/pdf"],
        focalPoint: true,
        adminThumbnail: "miniature",
        imageSizes: [
            { name: "miniature", width: 400, withoutEnlargement: true },
            { name: "carte", width: 900, withoutEnlargement: true },
            { name: "grande", width: 1800, withoutEnlargement: true },
        ],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            label: "Texte alternatif",
            admin: {
                description:
                    "Description courte de l'image, lue par les lecteurs d'écran et utilisée par Google Images.",
            },
        },
    ],
};
