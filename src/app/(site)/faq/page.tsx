/** Page FAQ : questions gérées dans Contenu → FAQ générale, textes dans Pages → Page FAQ. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import Faq, { type FaqData } from "@/components/faq/faq";
import { getCollection, getGlobal } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-faq");
    const titre = page?.seo?.titre || "FAQ | HALL B – Salle de sport à Saint-Dionisy (Nîmes)";
    const description =
        page?.seo?.description ||
        "Toutes les réponses sur HALL B : horaires 7j/7 de 6h à 23h, tarifs sans engagement, accès et parking gratuit, activités (musculation, cours, squash, aquagym) et séance d'essai offerte.";
    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/faq` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/faq`, type: "website", siteName: "HALL B" },
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const [page, items] = await Promise.all([
        getGlobal("page-faq", draft),
        getCollection("faq-items"),
    ]);

    const data: FaqData = {
        titre: page?.titre || "Questions fréquentes",
        sousTitre:
            page?.sousTitre ||
            "Horaires, tarifs, accès, activités… Retrouvez toutes les réponses sur HALL B, votre salle de sport à Saint-Dionisy, à 15 minutes de Nîmes.",
        items: items.map((i) => ({ question: i.question, reponse: i.reponse })),
        liens: (page?.liens ?? []).map((l) => ({ label: l.label, url: l.url })),
        ctaTexte: page?.ctaTexte || "Une autre question ? La meilleure réponse, c'est d'essayer.",
        ctaBoutonTexte: page?.ctaBoutonTexte || "Je profite de l'essai offert",
    };

    return <Faq data={data} />;
}
