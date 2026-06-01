import { Metadata } from "next";
import Script from "next/script";

import RPM from "@/components/cours/rpm";

export const metadata: Metadata = {
    title: "Cours de RPM à Saint Dionisy (Nîmes, Gard) | HALL B",
    description: "Cours de RPM (Raw Power in Motion) près de Nîmes : vélo indoor coaché en musique chez HALL B à Saint Dionisy. Plannings, horaires, séance d'essai offerte.",
    alternates: {
        canonical: "https://www.hallb.fr/cours/rpm",
    },
    openGraph: {
        title: "Cours de RPM à Saint Dionisy (Nîmes, Gard) | HALL B",
        description: "Cours de RPM (vélo indoor coaché en musique) à 15 min de Nîmes. Brûlez jusqu'à 600 kcal par séance dans une ambiance dynamique. Séance d'essai gratuite.",
        url: "https://www.hallb.fr/cours/rpm",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-rpm"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de RPM (Raw Power in Motion)",
                        "description": "Cours collectif de vélo indoor coaché en musique. Séances de 45 minutes à haute intensité, brûlant jusqu'à 600 kcal.",
                        "location": {
                            "@type": "HealthClub",
                            "name": "HALL B",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "1 chemin Azord",
                                "addressLocality": "Saint Dionisy",
                                "postalCode": "30980",
                                "addressCountry": "FR"
                            },
                            "telephone": "+33 4 66 19 16 76",
                            "url": "https://www.hallb.fr"
                        },
                        "exerciseType": "Indoor cycling",
                        "url": "https://www.hallb.fr/cours/rpm"
                    }),
                }}
            />
            <Script
                id="schema-faq-rpm"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Qu'est-ce que le RPM ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Le RPM (Raw Power in Motion) est un cours collectif de vélo indoor coaché en musique, créé par Les Mills. Une séance dure 45 minutes et alterne sprints, montées et phases de récupération. Vous pouvez brûler entre 400 et 600 kcal par séance."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Le RPM est-il accessible aux débutants ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Oui, le RPM s'adresse à tous les niveaux. Chacun règle son vélo et sa résistance en fonction de sa condition physique. Le coach guide en permanence pour adapter l'intensité."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Combien de cours de RPM par semaine chez HALL B ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "HALL B propose plusieurs séances de RPM par semaine dans une salle dédiée équipée de vélos Technogym. Consultez le planning à jour sur la page Plannings."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Faut-il un équipement particulier ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Une simple tenue de sport et une serviette suffisent. Une bouteille d'eau est fortement recommandée car les séances sont intenses. Les chaussures de sport classiques conviennent."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Comment essayer un cours de RPM chez HALL B ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Vous pouvez bénéficier d'une séance d'essai offerte. Réservez en ligne depuis la page Essai offert ou contactez-nous au 04 66 19 16 76."
                                }
                            }
                        ]
                    }),
                }}
            />
            <RPM />
        </>
    );
}
