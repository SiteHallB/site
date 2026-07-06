import type { CollectionConfig } from "payload";
import { connecte, publicOuConnecte } from "../access";
import { revalidateApresPublication, revalidateApresSuppression } from "../hooks";
import { faqArrayField, seoFields, slugField } from "../fields";
import { previewUrl } from "../preview";

export const PagesLocales: CollectionConfig = {
    // NB : ne pas nommer cette collection « pages-locales » — sa table SQL s'appellerait
    // « pages_locales », le nom que Payload réserve à la table de traductions de la
    // collection « pages » (collision → requêtes cassées).
    slug: "villes",
    labels: { singular: "Page locale (ville)", plural: "Pages locales (SEO)" },
    admin: {
        useAsTitle: "ville",
        group: "Contenu",
        defaultColumns: ["ville", "slug", "ordre", "_status"],
        description:
            "Pages de référencement par ville (« Salle de sport à Nîmes », etc.). Elles apparaissent aussi dans la grille des temps de trajet en bas de la page d'accueil.",
        livePreview: {
            url: ({ data }) => previewUrl(`/${data?.slug ?? ""}`),
        },
    },
    versions: { drafts: { autosave: { interval: 800 } } },
    access: {
        read: publicOuConnecte,
        create: connecte,
        update: connecte,
        delete: connecte,
    },
    hooks: {
        afterChange: [revalidateApresPublication],
        afterDelete: [revalidateApresSuppression],
    },
    fields: [
        { name: "ville", type: "text", label: "Ville / zone", required: true, admin: { description: "Ex : « Nîmes », « la Vaunage »…" } },
        slugField("Adresse de la page à la racine du site. Ex : « salle-de-sport-nimes » donne /salle-de-sport-nimes."),
        { name: "linkLabel", type: "text", label: "Libellé court (liens croisés)", admin: { description: "Utilisé dans les liens entre pages locales. Ex : « Nîmes »." } },
        { name: "ordre", type: "number", label: "Ordre d'affichage", defaultValue: 0 },
        { name: "h1", type: "text", label: "Titre principal (H1)", required: true },
        { name: "sousTitre", type: "richText", label: "Sous-titre" },
        {
            name: "distance",
            type: "text",
            label: "Temps de trajet (texte)",
            admin: { description: "Ex : « 15 minutes » ou « au cœur de la Vaunage »." },
        },
        {
            name: "temps",
            type: "text",
            label: "Temps court (grille de l'accueil)",
            admin: { description: "Ex : « 15 min », « Sur place »." },
        },
        { name: "intro", type: "richText", label: "Introduction (2 paragraphes conseillés)" },
        { name: "trajet", type: "richText", label: "Paragraphe « Comment venir »" },
        faqArrayField(),
        seoFields(),
    ],
};
