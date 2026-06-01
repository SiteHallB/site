import { Metadata } from "next";

import Faq from "@/components/faq/faq";

export const metadata: Metadata = {
    title: "FAQ | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
    description:
        "Toutes les réponses sur HALL B : horaires 7j/7 de 6h à 23h, tarifs sans engagement, accès et parking gratuit, activités (musculation, cours, squash, aquagym) et séance d'essai offerte.",
    alternates: { canonical: "https://www.hallb.fr/faq" },
    openGraph: {
        title: "FAQ | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
        description:
            "Horaires, tarifs, accès, activités : toutes les réponses sur HALL B, salle de sport à Saint-Dionisy, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/faq",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Faq />;
}
