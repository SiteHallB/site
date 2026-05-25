import { Metadata } from "next";

import Danse from "@/components/tarifs/danse/danse";

export const metadata: Metadata = {
    title: "HALL B – Cours de danse | Saint Dionisy, Nîmes, Gard",
    description: "Tarifs des cours de danse chez HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard). Cours adaptés à tous niveaux.",
};

export default function Page() {
    return <Danse/>;
}