/**
 * Champs réutilisables du CMS (boutons, SEO, slug, couleur, lien).
 * Tous les libellés sont en français pour le back-office.
 */
import type { Field, GroupField } from "payload";

/** Slug : identifiant d'URL (kebab-case). */
export function slugField(description?: string): Field {
    return {
        name: "slug",
        type: "text",
        label: "Adresse (slug)",
        required: true,
        unique: true,
        index: true,
        admin: {
            description:
                description ??
                "Partie de l'adresse web de la page (ex : « rpm » pour /cours/rpm). Lettres minuscules, chiffres et tirets uniquement. Attention : changer le slug change l'URL de la page.",
        },
        validate: (value: unknown) => {
            if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
                return "Utilisez uniquement des lettres minuscules, chiffres et tirets (ex : mon-adresse).";
            }
            return true;
        },
    };
}

/** Couleur hexadécimale (#RRGGBB ou #RRGGBBAA). */
export function couleurField(name: string, label: string, defaultValue: string, description?: string): Field {
    return {
        name,
        type: "text",
        label,
        defaultValue,
        required: true,
        admin: {
            description: description ?? "Code couleur hexadécimal, ex : #E1C340.",
            components: {
                // Aperçu natif du navigateur : champ texte simple, la valeur reste un hex.
            },
        },
        validate: (value: unknown) => {
            if (typeof value !== "string" || !/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
                return "Code couleur invalide. Exemple attendu : #E1C340 (ou #E1C34080 avec transparence).";
            }
            return true;
        },
    };
}

/** Bouton : texte + destination + style. */
export function boutonField(name: string, label: string, options?: { defaultTexte?: string; defaultUrl?: string; defaultStyle?: "accent" | "primary" }): GroupField {
    return {
        name,
        type: "group",
        label,
        fields: [
            {
                name: "texte",
                type: "text",
                label: "Texte du bouton",
                defaultValue: options?.defaultTexte,
                required: true,
            },
            {
                name: "url",
                type: "text",
                label: "Destination (lien)",
                defaultValue: options?.defaultUrl,
                required: true,
                admin: {
                    description: "Adresse interne (ex : /tarifs) ou externe (https://…).",
                },
            },
            {
                name: "externe",
                type: "checkbox",
                label: "Ouvrir dans un nouvel onglet (lien externe)",
                defaultValue: false,
            },
            {
                name: "style",
                type: "select",
                label: "Style du bouton",
                defaultValue: options?.defaultStyle ?? "accent",
                options: [
                    { label: "Plein (fond doré)", value: "accent" },
                    { label: "Contour (transparent, bordure claire)", value: "primary" },
                ],
            },
        ],
    };
}

/** Lien simple : label + url + externe. */
export function lienField(name = "lien", label = "Lien"): GroupField {
    return {
        name,
        type: "group",
        label,
        fields: [
            { name: "label", type: "text", label: "Texte affiché", required: true },
            {
                name: "url",
                type: "text",
                label: "Destination",
                required: true,
                admin: { description: "Adresse interne (ex : /tarifs) ou externe (https://…)." },
            },
            { name: "externe", type: "checkbox", label: "Ouvrir dans un nouvel onglet", defaultValue: false },
        ],
    };
}

/** Onglet SEO réutilisable pour chaque page. */
export function seoFields(): Field {
    return {
        name: "seo",
        type: "group",
        label: "Référencement (SEO)",
        admin: {
            description:
                "Éléments affichés par Google et les réseaux sociaux. Laissez vide pour utiliser les valeurs par défaut du site.",
        },
        fields: [
            {
                name: "titre",
                type: "text",
                label: "Titre de la page (balise <title>)",
                admin: { description: "≈ 60 caractères max. Ex : « Cours de RPM à Saint Dionisy (Nîmes, Gard) | HALL B »" },
            },
            {
                name: "description",
                type: "textarea",
                label: "Description (meta description)",
                admin: { description: "≈ 155 caractères max. Résumé affiché sous le titre dans Google." },
            },
            {
                name: "image",
                type: "upload",
                relationTo: "media",
                label: "Image de partage (Open Graph)",
                admin: { description: "Image affichée lors d'un partage sur les réseaux sociaux (1200×630 conseillé)." },
            },
            {
                name: "noIndex",
                type: "checkbox",
                label: "Masquer cette page des moteurs de recherche (noindex)",
                defaultValue: false,
            },
        ],
    };
}

/** Icônes disponibles (lucide-react) avec libellés français. */
export const ICONES = [
    { label: "Vélo", value: "Bike" },
    { label: "Flamme", value: "Flame" },
    { label: "Musique", value: "Music" },
    { label: "Chronomètre", value: "Timer" },
    { label: "Groupe", value: "Users" },
    { label: "Cœur", value: "Heart" },
    { label: "Haltère", value: "Dumbbell" },
    { label: "Étincelles", value: "Sparkles" },
    { label: "Activité", value: "Activity" },
    { label: "Vent", value: "Wind" },
    { label: "Cerveau", value: "Brain" },
    { label: "Sourire", value: "Smile" },
    { label: "Globe", value: "Globe" },
    { label: "Éclair", value: "Zap" },
    { label: "Vagues", value: "Waves" },
    { label: "Bébé", value: "Baby" },
    { label: "Échelle de piscine", value: "WavesLadder" },
    { label: "Double coche", value: "CheckCheck" },
    { label: "Calendrier", value: "CalendarCheck2" },
    { label: "Cible", value: "Target" },
    { label: "Épingle carte", value: "MapPin" },
    { label: "Horloge", value: "Clock" },
    { label: "Téléphone", value: "Phone" },
    { label: "Voiture", value: "Car" },
    { label: "Parking", value: "SquareParking" },
];

/** Champ de sélection d'icône. */
export function iconeField(name = "icone", label = "Icône", defaultValue = "Sparkles"): Field {
    return { name, type: "select", label, options: ICONES, defaultValue };
}

/** Question / réponse en texte simple (compatible schéma FAQPage de Google). */
export function faqArrayField(name = "faq", label = "Questions fréquentes (FAQ)"): Field {
    return {
        name,
        type: "array",
        label,
        labels: { singular: "Question", plural: "Questions" },
        admin: {
            components: {},
            description: "Affichées sur la page et transmises à Google (résultats enrichis FAQ).",
        },
        fields: [
            { name: "question", type: "text", label: "Question", required: true },
            { name: "reponse", type: "textarea", label: "Réponse", required: true },
        ],
    };
}
