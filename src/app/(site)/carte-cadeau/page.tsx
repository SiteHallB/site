/** Page Carte cadeau : textes gérés dans Pages → Page Carte cadeau. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import CarteCadeau from "@/components/tarifs/carte-cadeau/carte-cadeau";
import { getGlobal } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-carte-cadeau");
    return {
        title: page?.seo?.titre || "HALL B – Carte cadeau | Salle de sport Nîmes, Gard",
        description:
            page?.seo?.description ||
            "Offrez une séance avec la carte cadeau HALL B, valable pour toutes nos activités à Saint Dionisy, près de Nîmes (Gard).",
        alternates: { canonical: `${SITE_URL}/carte-cadeau` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("page-carte-cadeau", draft);

    return <CarteCadeau titre={page?.titre || "Carte cadeau"} sousTitre={page?.sousTitre || ""} />;
}
