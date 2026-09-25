import { Metadata } from "next";

import TarifsSquash from "@/components/tarifs/squash/squash";

export const metadata: Metadata = {
    title: "HALL B – Tarifs Squash | Saint Dionisy, Nîmes, Gard",
    description: "Tarifs squash chez HALL B, à 15 min de Nîmes (Gard) : Pass Squash à 450€/an, séance à 16€ en heure creuse et 22€ en heure pleine. Réservation en ligne 7j/7.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/squash" },
    openGraph: {
        title: "HALL B – Tarifs Squash | Saint Dionisy, Nîmes, Gard",
        description: "Pass Squash à 450€/an (2 réservations par semaine, partenaire inclus) ou séance à 16€ / 22€. Deux terrains réservables en ligne, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/tarifs/squash",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <TarifsSquash/>;
}
