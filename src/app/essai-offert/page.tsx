import { Metadata } from "next";

import EssaiOffert from "@/components/essai-offert/essai-offert";

export const metadata: Metadata = {
    title: "HALL B – Essai gratuit | Salle de sport Nîmes, Gard",
    description: "Testez HALL B gratuitement ! Séance découverte 100% gratuite dans notre salle de sport à Saint Dionisy, à 15 min de Nîmes (Gard).",
};

export default function Page() {
    return <EssaiOffert/>;
}