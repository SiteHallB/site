import { Metadata } from "next";

import Squash from "@/components/squash/squash";

export const metadata: Metadata = {
    title: "HALL B – Squash à Saint Dionisy | Nîmes, Gard",
    description: "Réservez en ligne l'un des deux terrains de squash de HALL B, salle de sport à Saint Dionisy, à 15 min de Nîmes (Gard).",
};

export default function Page() {
    return <Squash/>
}