import { Metadata } from "next";

import PpgKid from "@/components/tarifs/ppg-kid/ppg-kid";

export const metadata: Metadata = {
    title: "HALL B – PPG Kid (6-9 ans) | Sport enfant Saint Dionisy, Nîmes",
    description: "Cours de préparation physique pour enfants de 6 à 9 ans chez HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard). Mercredi 16h00-16h45, 300€/an.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/ppg-kid" },
    openGraph: {
        title: "HALL B – PPG Kid (6-9 ans) | Sport enfant Saint Dionisy, Nîmes",
        description: "PPG Kid chez HALL B près de Nîmes : motricité, coordination, équilibre et confiance en soi par le jeu. Tous les mercredis de 16h00 à 16h45.",
        url: "https://www.hallb.fr/tarifs/ppg-kid",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <PpgKid/>;
}
