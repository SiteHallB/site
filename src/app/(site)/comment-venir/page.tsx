/** Page Comment venir : textes gérés dans Pages → Page Comment venir. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import CommentVenir, { type CommentVenirData } from "@/components/comment-venir/comment-venir";
import { getCollection, getGlobal } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-comment-venir");
    const titre = page?.seo?.titre || "Comment venir | HALL B – Salle de sport à Saint-Dionisy (Nîmes)";
    const description =
        page?.seo?.description ||
        "Accès à HALL B, salle de sport à Saint-Dionisy (Vaunage, Gard) : itinéraire depuis Nîmes, Calvisson, Sommières et Quissac, parking gratuit, horaires et plan interactif.";
    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/comment-venir` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/comment-venir`, type: "website", siteName: "HALL B" },
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const [page, coordonnees, communes] = await Promise.all([
        getGlobal("page-comment-venir", draft),
        getGlobal("coordonnees"),
        getCollection("villes"),
    ]);

    const adresseComplete = [
        coordonnees?.adresse?.rue || "1 chemin Azord",
        `${coordonnees?.adresse?.codePostal || "30980"} ${coordonnees?.adresse?.ville || "Saint-Dionisy"}`,
    ].join(", ");

    const data: CommentVenirData = {
        titre: page?.titre || "Comment venir",
        sousTitre:
            page?.sousTitre ||
            "HALL B se situe à Saint-Dionisy, au cœur de la Vaunage, à 15 minutes de Nîmes. Itinéraire, horaires et parking gratuit — tout est ici.",
        infos: (page?.infos ?? []).map((i) => ({
            icone: i.icone || "MapPin",
            titre: i.titre,
            texte: i.texte,
        })),
        telephone: `+33${(coordonnees?.telephone || "04 66 19 16 76").replace(/\s/g, "").replace(/^0/, "")}`,
        boutonItineraireTexte: page?.boutonItineraireTexte || "Ouvrir l'itinéraire",
        lienItineraire: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(adresseComplete)}`,
        mapSrc: `https://maps.google.com/maps?q=${encodeURIComponent(adresseComplete)}&z=14&hl=fr&output=embed`,
        itineraires: {
            titre: page?.itineraires?.titre || "En voiture",
            liste: (page?.itineraires?.liste ?? []).map((r) => ({
                ville: r.ville,
                temps: r.temps || "",
                description: r.description || "",
            })),
        },
        communes: communes.map((c) => ({ slug: c.slug, linkLabel: c.linkLabel || c.ville })),
        ctaTexte: page?.ctaTexte || "Première visite ? Profitez d'une séance d'essai offerte.",
        ctaBoutonTexte: page?.ctaBoutonTexte || "Je profite de l'essai offert",
    };

    return <CommentVenir data={data} />;
}
