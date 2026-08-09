import { Metadata } from "next";

import EnfantsAdos from "@/components/enfants-ados/enfants-ados";

export const metadata: Metadata = {
    title: "HALL B – Enfants & Ados | Natation, PPG Kid & Teen | Saint Dionisy, Nîmes",
    description:
        "Activités enfants et ados chez HALL B à Saint Dionisy près de Nîmes (Gard) : bébés nageurs, école de natation, PPG Kid (6-9 ans) et PPG Teen (10-14 ans). Tous les mercredis, encadrement diplômé.",
    alternates: { canonical: "https://www.hallb.fr/enfants-ados" },
    openGraph: {
        title: "HALL B – Enfants & Ados | Natation, PPG Kid & Teen",
        description:
            "De 6 mois à 14 ans : natation, préparation physique Kid et Teen tous les mercredis chez HALL B, salle de sport à Saint Dionisy, à 15 minutes de Nîmes.",
        url: "https://www.hallb.fr/enfants-ados",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <EnfantsAdos/>;
}
