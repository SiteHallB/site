import { Metadata } from "next";

import Boost from "@/components/tarifs/boost/boost";

export const metadata: Metadata = {
    title: "HALL B – Formule Boost | Salle de sport Nîmes, Gard",
    description: "Formule Boost de HALL B à Saint Dionisy (Nîmes, Gard) : accès illimité aux plateaux muscu, cardio, cours collectifs et smallgroups.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/boost" },
    openGraph: {
        title: "HALL B – Formule Boost | Salle de sport Nîmes, Gard",
        description: "Formule Boost : plateau muscu + tous les cours collectifs et small groups en illimité, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/tarifs/boost",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Boost/>;
}