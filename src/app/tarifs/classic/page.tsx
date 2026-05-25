import { Metadata } from "next";

import Classic from "@/components/tarifs/classic/classic";

export const metadata: Metadata = {
    title: "HALL B – Formule Classic | Salle de sport Nîmes, Gard",
    description: "Formule Classic de HALL B : accès 7j/7 aux plateaux muscu et cardio à Saint Dionisy, près de Nîmes (Gard). Découvrez toutes les options tarifaires.",
};

export default function Page() {
    return <Classic/>;
}