import { Metadata } from "next";
import Script from "next/script";

import Squash from "@/components/squash/squash";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Squash à Saint Dionisy (Nîmes, Gard) | HALL B",
    description: "Réservez en ligne l'un des deux terrains de squash de HALL B, à 15 min de Nîmes (Gard). Location de raquettes sur place, tournois réguliers. Tous niveaux.",
    alternates: { canonical: "https://www.hallb.fr/squash" },
    openGraph: {
        title: "Squash à Saint Dionisy (Nîmes, Gard) | HALL B",
        description: "Deux terrains de squash réservables en ligne chez HALL B, à 15 min de Nîmes. Location de raquettes, tournois réguliers, tous niveaux.",
        url: "https://www.hallb.fr/squash",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-squash"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Squash à HALL B",
                        "description":
                            "Deux terrains de squash réservables en ligne chez HALL B, à Saint Dionisy près de Nîmes. Location de raquettes sur place, tournois réguliers.",
                        "location": {
                            "@type": "HealthClub",
                            "name": "HALL B",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "1 chemin Azord",
                                "addressLocality": "Saint Dionisy",
                                "postalCode": "30980",
                                "addressCountry": "FR",
                            },
                            "telephone": "+33 4 66 19 16 76",
                            "url": "https://www.hallb.fr",
                        },
                        "exerciseType": "Squash",
                        "url": "https://www.hallb.fr/squash",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-squash"
                items={[
                    {
                        question: "Comment réserver un terrain de squash chez HALL B ?",
                        answer: "La réservation se fait directement en ligne sur cette page, en quelques clics. Choisissez votre créneau, en heure pleine ou en heure creuse, puis confirmez. Vous pouvez aussi réserver sur place à l'accueil.",
                    },
                    {
                        question: "Faut-il apporter sa propre raquette ?",
                        answer: "Non, la location de raquettes est possible directement sur place. Vous pouvez venir les mains vides : il vous suffit d'une tenue de sport et de chaussures à semelle non marquante.",
                    },
                    {
                        question: "Combien y a-t-il de terrains de squash ?",
                        answer: "HALL B dispose de deux terrains de squash, à Saint Dionisy, à 15 minutes de Nîmes. Des tournois sont organisés régulièrement pour se challenger entre joueurs.",
                    },
                    {
                        question: "Faut-il être adhérent pour jouer au squash ?",
                        answer: "Non. La location de terrain de squash est accessible à tous, adhérents comme non-adhérents, via la réservation en ligne. Le squash n'est pas inclus dans les formules d'abonnement.",
                    },
                    {
                        question: "Le squash est-il un bon sport pour se dépenser ?",
                        answer: "Oui, le squash est l'un des sports les plus intenses : une partie peut brûler 600 à 900 kcal par heure. Il développe le cardio, la vitesse, les réflexes et la coordination, tout en restant ludique.",
                    },
                ]}
            />
            <Squash/>
        </>
    );
}