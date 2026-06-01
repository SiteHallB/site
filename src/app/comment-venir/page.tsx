import { Metadata } from "next";

import CommentVenir from "@/components/comment-venir/comment-venir";

export const metadata: Metadata = {
    title: "Comment venir | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
    description:
        "Accès à HALL B, salle de sport à Saint-Dionisy (Vaunage, Gard) : itinéraire depuis Nîmes, Calvisson, Sommières et Quissac, parking gratuit, horaires et plan interactif.",
    alternates: { canonical: "https://www.hallb.fr/comment-venir" },
    openGraph: {
        title: "Comment venir | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
        description:
            "Itinéraire, horaires et parking gratuit pour rejoindre HALL B à Saint-Dionisy, au cœur de la Vaunage, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/comment-venir",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <CommentVenir />;
}
