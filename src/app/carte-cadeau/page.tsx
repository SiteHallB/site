import { Metadata } from "next";

import CarteCadeau from "@/components/tarifs/carte-cadeau/carte-cadeau";

export const metadata: Metadata = {
    title: "HALL B – Carte cadeau | Salle de sport Nîmes, Gard",
    description: "Offrez une séance avec la carte cadeau HALL B, valable pour toutes nos activités à Saint Dionisy, près de Nîmes (Gard).",
};

export default function Page() {
    return <CarteCadeau/>;
}