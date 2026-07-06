/** Page Essai offert : textes et offre Sportigo gérés dans Pages → Page Essai offert. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import EssaiOffert from "@/components/essai-offert/essai-offert";
import { getGlobal } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-essai-offert");
    return {
        title: page?.seo?.titre || "HALL B – Essai gratuit | Salle de sport Nîmes, Gard",
        description:
            page?.seo?.description ||
            "Testez HALL B gratuitement ! Séance découverte 100% gratuite dans notre salle de sport à Saint Dionisy, à 15 min de Nîmes (Gard).",
        alternates: { canonical: `${SITE_URL}/essai-offert` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("page-essai-offert", draft);

    return (
        <EssaiOffert
            titre={page?.titre || "Essai offert"}
            sousTitre={page?.sousTitre || "Venez tester la salle gratuitement et sans engagement"}
            idSportigo={page?.idSportigo ?? 19758}
        />
    );
}
