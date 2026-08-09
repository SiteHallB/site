import { Metadata } from "next";

import PpgTeen from "@/components/tarifs/ppg-teen/ppg-teen";

export const metadata: Metadata = {
    title: "HALL B – PPG Teen (10-14 ans) | Sport ado Saint Dionisy, Nîmes",
    description: "Cours de préparation physique pour adolescents de 10 à 14 ans chez HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard). Mercredi 17h00-17h45, 300€/an.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/ppg-teen" },
    openGraph: {
        title: "HALL B – PPG Teen (10-14 ans) | Sport ado Saint Dionisy, Nîmes",
        description: "PPG Teen chez HALL B près de Nîmes : qualités physiques, bons gestes sportifs et progression dans un cadre motivant et sécurisé. Tous les mercredis de 17h00 à 17h45.",
        url: "https://www.hallb.fr/tarifs/ppg-teen",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <PpgTeen/>;
}
