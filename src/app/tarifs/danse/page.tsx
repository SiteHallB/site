import { Metadata } from "next";

import Danse from "@/components/tarifs/danse/danse";

export const metadata: Metadata = {
    title: "HALL B – Cours de danse | Saint Dionisy, Nîmes, Gard",
    description: "Tarifs des cours de danse chez HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard). Cours adaptés à tous niveaux.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/danse" },
    openGraph: {
        title: "HALL B – Cours de danse | Saint Dionisy, Nîmes, Gard",
        description: "Cours de danse à HALL B près de Nîmes : niveaux débutant et avancé, progression accompagnée sur l'année.",
        url: "https://www.hallb.fr/tarifs/danse",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Danse/>;
}