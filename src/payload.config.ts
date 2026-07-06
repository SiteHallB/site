/**
 * Configuration du CMS Payload — back-office du site HALL B.
 *
 * Base de données : SQLite en local (fichier cms.db), Turso (libSQL) en production.
 * Médias : dossier public/media en local, Vercel Blob en production.
 */
import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";

import { Utilisateurs } from "./cms/collections/utilisateurs";
import { Media } from "./cms/collections/media";
import { Cours } from "./cms/collections/cours";
import { Formules } from "./cms/collections/formules";
import { PagesLocales } from "./cms/collections/pages-locales";
import { FaqItems } from "./cms/collections/faq-items";
import { Temoignages } from "./cms/collections/temoignages";
import { Pages } from "./cms/collections/pages";

import { Theme } from "./cms/globals/theme";
import { Coordonnees } from "./cms/globals/coordonnees";
import { Navigation } from "./cms/globals/navigation";
import { ParametresSeo } from "./cms/globals/parametres-seo";
import { Popup } from "./cms/globals/popup";
import { Accueil } from "./cms/globals/accueil";
import { Plannings } from "./cms/globals/plannings";
import {
    PageCarteCadeau,
    PageCommentVenir,
    PageContact,
    PageCoursIndex,
    PageEssaiOffert,
    PageFaq,
    PageMerci,
    PageNatation,
    PageSquash,
    PageTarifs,
    PagesLocalesCommuns,
} from "./cms/globals/pages-speciales";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

export default buildConfig({
    serverURL,
    admin: {
        user: Utilisateurs.slug,
        meta: {
            titleSuffix: " — Admin HALL B",
        },
        avatar: "default",
        dateFormat: "dd/MM/yyyy HH:mm",
        livePreview: {
            breakpoints: [
                { label: "Mobile", name: "mobile", width: 375, height: 812 },
                { label: "Tablette", name: "tablette", width: 768, height: 1024 },
                { label: "Ordinateur", name: "ordinateur", width: 1440, height: 900 },
            ],
        },
    },
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
    }),
    collections: [Cours, Formules, PagesLocales, Pages, FaqItems, Temoignages, Media, Utilisateurs],
    globals: [
        // Pages
        Accueil,
        PageTarifs,
        PageCoursIndex,
        Plannings,
        PageFaq,
        PageContact,
        PageEssaiOffert,
        PageSquash,
        PageCarteCadeau,
        PageCommentVenir,
        PageNatation,
        PagesLocalesCommuns,
        PageMerci,
        // Réglages
        Theme,
        Coordonnees,
        Navigation,
        ParametresSeo,
        Popup,
    ],
    i18n: {
        supportedLanguages: { fr, en },
        fallbackLanguage: "fr",
    },
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || "file:./cms.db",
            authToken: process.env.DATABASE_AUTH_TOKEN,
        },
    }),
    secret: process.env.PAYLOAD_SECRET || "hallb-dev-secret-a-changer-en-production",
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    plugins: [
        vercelBlobStorage({
            enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN || "",
        }),
    ],
});
