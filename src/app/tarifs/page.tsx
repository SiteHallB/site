import { Metadata } from "next";

import Tarifs from "@/components/tarifs/tarifs";

export const metadata: Metadata = {
    title: "HALL B – Tarifs | Salle de sport Saint Dionisy, Nîmes, Gard",
    description: "Découvrez les formules d'abonnement de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard) : Classic, Boost, Aqua, Danse.",
    alternates: { canonical: "https://www.hallb.fr/tarifs" },
    openGraph: {
        title: "HALL B – Tarifs | Salle de sport Saint Dionisy, Nîmes, Gard",
        description: "Formules d'abonnement HALL B près de Nîmes : Classic, Boost, Aqua, Danse, carnet de séances. Sans engagement, mensuel ou annuel.",
        url: "https://www.hallb.fr/tarifs",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Tarifs/>;
}