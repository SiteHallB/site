/** Page Contact : textes gérés dans Pages → Page Contact, coordonnées dans Réglages. */
import Contact from "@/components/contact/contact";
import { Metadata } from "next";
import { draftMode } from "next/headers";

import { getGlobal } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-contact");
    return {
        title: page?.seo?.titre || "HALL B – Contact | Salle de sport Saint Dionisy, Nîmes",
        description:
            page?.seo?.description ||
            "Contactez la salle de sport HALL B à Saint Dionisy (Vaunage, Nîmes, Gard). Questions, renseignements, réservations : notre équipe vous répond.",
        alternates: { canonical: `${SITE_URL}/contact` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("page-contact", draft);

    return (
        <Contact
            titre={page?.titre || "Contact"}
            lienAideTexte={page?.lienAideTexte || "Besoin d'aide ?"}
        />
    );
}
