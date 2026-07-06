/**
 * Contrôle d'accès du CMS :
 * - le contenu publié est lisible par tous (le site en a besoin),
 * - toute modification nécessite un compte administrateur.
 */
import type { Access } from "payload";

export const connecte: Access = ({ req: { user } }) => Boolean(user);

export const publicOuConnecte: Access = ({ req: { user } }) => {
    if (user) return true;
    // Les visiteurs ne voient que les documents publiés.
    return { _status: { equals: "published" } };
};

export const lecturePublique: Access = () => true;
