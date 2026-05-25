import { Metadata } from "next";

import CarnetSeances from "@/components/tarifs/carnet-seances/carnet-seances";

export const metadata: Metadata = {
    title: "HALL B – Carnet de séances | Salle de sport Nîmes, Gard",
    description: "Flexibilité maximale avec le carnet de séances HALL B à Saint Dionisy (Nîmes, Gard) : 1, 10, 30, 50 ou 100 séances, toutes activités confondues.",
};

export default function Page() {
    return <CarnetSeances/>;
}