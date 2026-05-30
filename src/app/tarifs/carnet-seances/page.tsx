import { Metadata } from "next";

import CarnetSeances from "@/components/tarifs/carnet-seances/carnet-seances";

export const metadata: Metadata = {
    title: "HALL B – Carnet de séances | Salle de sport Nîmes, Gard",
    description: "Flexibilité maximale avec le carnet de séances HALL B à Saint Dionisy (Nîmes, Gard) : 1, 10, 30, 50 ou 100 séances, toutes activités confondues.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/carnet-seances" },
    openGraph: {
        title: "HALL B – Carnet de séances | Salle de sport Nîmes, Gard",
        description: "Carnet de séances HALL B près de Nîmes : 1, 10, 30, 50 ou 100 séances sans engagement, toutes activités confondues.",
        url: "https://www.hallb.fr/tarifs/carnet-seances",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <CarnetSeances/>;
}