import { Metadata } from "next";
import Script from "next/script";

import CoursIndex from "@/components/cours/cours-index";

export const metadata: Metadata = {
    title: "Cours collectifs à Saint Dionisy (Nîmes, Gard) | HALL B",
    description: "Cours collectifs HALL B près de Nîmes : RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates et cours d'aqua. Inclus dans la formule Boost.",
    alternates: {
        canonical: "https://www.hallb.fr/cours",
    },
    openGraph: {
        title: "Cours collectifs à Saint Dionisy (Nîmes, Gard) | HALL B",
        description: "Découvrez tous les cours collectifs HALL B : RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates, cours d'aqua. Inclus dans une seule formule.",
        url: "https://www.hallb.fr/cours",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-cours-itemlist"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Cours collectifs HALL B",
                        "description": "Tous les cours collectifs proposés à la salle HALL B, à 15 minutes de Nîmes.",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Musculation", "url": "https://www.hallb.fr/cours/musculation" },
                            { "@type": "ListItem", "position": 2, "name": "RPM", "url": "https://www.hallb.fr/cours/rpm" },
                            { "@type": "ListItem", "position": 3, "name": "Body Pump", "url": "https://www.hallb.fr/cours/body-pump" },
                            { "@type": "ListItem", "position": 4, "name": "Body Attack", "url": "https://www.hallb.fr/cours/body-attack" },
                            { "@type": "ListItem", "position": 5, "name": "Cardio Boxe", "url": "https://www.hallb.fr/cours/cardio-boxe" },
                            { "@type": "ListItem", "position": 6, "name": "PPG — Préparation Physique Générale", "url": "https://www.hallb.fr/cours/ppg" },
                            { "@type": "ListItem", "position": 7, "name": "CAF — Cuisses Abdos Fessiers", "url": "https://www.hallb.fr/cours/caf" },
                            { "@type": "ListItem", "position": 8, "name": "Step", "url": "https://www.hallb.fr/cours/step" },
                            { "@type": "ListItem", "position": 9, "name": "Zumba", "url": "https://www.hallb.fr/cours/zumba" },
                            { "@type": "ListItem", "position": 10, "name": "Yoga", "url": "https://www.hallb.fr/cours/yoga" },
                            { "@type": "ListItem", "position": 11, "name": "Pilates", "url": "https://www.hallb.fr/cours/pilates" },
                            { "@type": "ListItem", "position": 12, "name": "Cours d'aqua", "url": "https://www.hallb.fr/cours/aqua" },
                        ],
                    }),
                }}
            />
            <CoursIndex />
        </>
    );
}
