import { Metadata } from "next";

import Classic from "@/components/tarifs/classic/classic";

export const metadata: Metadata = {
    title: "HALL B – Formule Classic | Salle de sport Nîmes, Gard",
    description: "Formule Classic de HALL B : accès 7j/7 aux plateaux muscu et cardio à Saint Dionisy, près de Nîmes (Gard). Découvrez toutes les options tarifaires.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/classic" },
    openGraph: {
        title: "HALL B – Formule Classic | Salle de sport Nîmes, Gard",
        description: "Formule Classic : accès libre 7j/7 de 6h à 23h aux plateaux musculation et cardio, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/tarifs/classic",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Classic/>;
}