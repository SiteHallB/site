/**
 * Hooks de revalidation : à chaque publication dans le back-office,
 * les pages du site sont régénérées pour refléter le nouveau contenu.
 */
import { revalidatePath } from "next/cache";
import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    GlobalAfterChangeHook,
} from "payload";

function revalidateSite() {
    try {
        // Régénère tout le site (layout racine) : simple et sûr pour un site de cette taille.
        revalidatePath("/", "layout");
    } catch (e) {
        // revalidatePath n'est pas disponible hors contexte Next (ex : script de seed).
        console.error("Revalidation du site impossible :", (e as Error).message);
    }
}

/** Revalide le site quand un document est publié (pas pour un simple brouillon). */
export const revalidateApresPublication: CollectionAfterChangeHook = ({ doc, req }) => {
    if (req.context?.skipRevalidate) return doc;
    const status = (doc as { _status?: string })._status;
    if (status === undefined || status === "published") revalidateSite();
    return doc;
};

/** Revalide le site après suppression d'un document. */
export const revalidateApresSuppression: CollectionAfterDeleteHook = ({ doc, req }) => {
    if (req.context?.skipRevalidate) return doc;
    revalidateSite();
    return doc;
};

/** Revalide le site quand un réglage global est publié. */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
    if (req.context?.skipRevalidate) return doc;
    const status = (doc as { _status?: string })._status;
    if (status === undefined || status === "published") revalidateSite();
    return doc;
};
