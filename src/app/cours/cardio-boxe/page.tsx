import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Cardio Boxe à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Cardio Boxe près de Nîmes chez HALL B : boxe fitness sans contact, cardio et défoulement en 45 min. Tous niveaux, à 15 min de Nîmes.",
    alternates: { canonical: "https://www.hallb.fr/cours/cardio-boxe" },
    openGraph: {
        title: "Cours de Cardio Boxe à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Boxe fitness sans contact : frappe, cardio et défoulement en 45 minutes. Brûle-graisses et anti-stress, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/cardio-boxe",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-cardio-boxe"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Cardio Boxe",
                        "description":
                            "Cours collectif de boxe fitness sans contact : travail de frappe sur sac, cardio et renforcement. 45 minutes.",
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
                        "exerciseType": "Boxing",
                        "url": "https://www.hallb.fr/cours/cardio-boxe",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-cardio-boxe"
                items={[
                    {
                        question: "Faut-il savoir boxer pour participer ?",
                        answer: "Non, aucune expérience requise. Le coach enseigne les gestes de base (garde, directs, crochets, esquives) dès les premières séances. On progresse vite et chacun frappe à son intensité.",
                    },
                    {
                        question: "Y a-t-il des coups ou du contact ?",
                        answer: "Non. La cardio boxe est une boxe fitness sans adversaire et sans contact : on frappe dans le vide, sur sac ou sur pattes d'ours. Zéro risque de coup, 100 % défoulement.",
                    },
                    {
                        question: "Est-ce un bon cours pour maigrir ?",
                        answer: "Oui, c'est un excellent brûle-graisses : entre 400 et 600 kcal par séance grâce à l'alternance de frappes rapides et d'exercices de renforcement. Le corps est sollicité dans son ensemble.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Une tenue de sport, des baskets, une serviette et de l'eau. Les sacs de frappe et le matériel sont fournis ; des gants peuvent être recommandés (renseignez-vous à l'accueil).",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_cardio_boxe"
                eyebrow="Cours collectif"
                h1Top="Cours de Cardio Boxe"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        La boxe fitness sans contact : frappe,
                        cardio et défoulement en <strong>45 minutes</strong>.
                        Un brûle-graisses anti-stress redoutable, chez HALL B à
                        15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "~500 kcal", label: "Brûlées en moyenne" },
                    { value: "Sans contact", label: "Aucun risque de coup" },
                    { value: "Tous niveaux", label: "Aucune expérience requise" },
                ]}
                whatTitle="La Cardio Boxe, c'est quoi ?"
                whatParagraph1={
                    <>
                        La <strong>cardio boxe</strong> (ou boxe fitness) reprend
                        les gestes de la boxe — directs,
                        crochets, uppercuts, esquives, jeu de jambes — sous
                        forme d&apos;un entraînement cardio rythmé, <em>sans
                        adversaire et sans contact</em>.
                    </>
                }
                whatParagraph2={
                    <>
                        On enchaîne combinaisons de frappes sur
                        sac ou dans le vide et exercices de renforcement
                        (gainage, squats, pompes). Résultat&nbsp;: un cours
                        complet qui défoule, fait fondre les calories et{" "}
                        évacue le stress de la journée.
                    </>
                }
                benefitsTitle="6 raisons d'essayer la Cardio Boxe"
                benefits={[
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "L'alternance frappes / renforcement fait grimper la dépense calorique.",
                    },
                    {
                        iconName: "Heart",
                        title: "Anti-stress",
                        text: "Frapper défoule comme rien d'autre : la tension de la journée part dans le sac.",
                    },
                    {
                        iconName: "Activity",
                        title: "Coordination",
                        text: "Le travail des combinaisons améliore les réflexes, la vitesse et la coordination.",
                    },
                    {
                        iconName: "Dumbbell",
                        title: "Corps complet",
                        text: "Bras, épaules, jambes et sangle abdominale : tout le corps travaille.",
                    },
                    {
                        iconName: "Timer",
                        title: "Confiance en soi",
                        text: "Maîtriser les gestes de la boxe est valorisant et booste l'assurance.",
                    },
                    {
                        iconName: "Users",
                        title: "Ambiance & énergie",
                        text: "L'énergie du groupe et la musique rendent la séance addictive.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement",
                        text: "Corde à sauter, déplacements et mobilité des épaules et hanches (5 à 8 min).",
                    },
                    {
                        n: "02",
                        title: "Technique de base",
                        text: "Garde, directs, crochets, uppercuts, esquives — les fondamentaux expliqués.",
                    },
                    {
                        n: "03",
                        title: "Combinaisons sur sac",
                        text: "Enchaînements de frappes rythmés, en intervalle haute intensité.",
                    },
                    {
                        n: "04",
                        title: "Renforcement",
                        text: "Gainage, pompes, squats et abdos pour compléter le travail cardio.",
                    },
                    {
                        n: "05",
                        title: "Retour au calme",
                        text: "Étirements des épaules, du dos et des jambes pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        La cardio boxe s&apos;adresse à{" "}
                        <strong>tous ceux qui veulent se défouler en
                        s&apos;entraînant</strong>. Particulièrement adaptée si
                        vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "évacuer le stress et l'énergie négative,",
                    "brûler un maximum de calories en un cours fun,",
                    "améliorer votre cardio, vos réflexes et votre coordination,",
                    "tonifier le haut du corps et la sangle abdominale,",
                    "découvrir les gestes de la boxe sans risque de coup.",
                ]}
                equipmentTitle="Sacs de frappe et espace dédié"
                equipmentParagraph1={
                    <>
                        La cardio boxe profite de nos{" "}
                        sacs de frappe et d&apos;un espace
                        adapté au sein de la salle. Pattes d&apos;ours et
                        accessoires viennent varier les exercices.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach veille à la{" "}
                        <em>qualité des gestes</em> pour préserver poignets et
                        épaules, et ajuste l&apos;intensité des combinaisons
                        selon votre niveau. Débutant ou habitué, vous frappez à
                        votre rythme.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. Accessible en{" "}
                        15 minutes depuis Nîmes, et en moins de
                        20 minutes depuis Calvisson, Sommières, Quissac, Vergèze
                        et Caveirac.
                    </>
                }
                faq={[
                    {
                        question: "Faut-il savoir boxer pour participer ?",
                        answer: (
                            <p>
                                Non, aucune expérience requise.
                                Le coach enseigne les gestes de base (garde,
                                directs, crochets, esquives) dès les premières
                                séances. On progresse vite et chacun frappe à
                                son intensité.
                            </p>
                        ),
                    },
                    {
                        question: "Y a-t-il des coups ou du contact ?",
                        answer: (
                            <p>
                                Non. La cardio boxe est une{" "}
                                <strong>boxe fitness sans adversaire et sans
                                contact</strong> : on frappe dans le vide, sur
                                sac ou sur pattes d&apos;ours. Zéro risque de
                                coup, 100 % défoulement.
                            </p>
                        ),
                    },
                    {
                        question: "Est-ce un bon cours pour maigrir ?",
                        answer: (
                            <p>
                                Oui, c&apos;est un excellent{" "}
                                brûle-graisses : entre 400 et
                                600 kcal par séance grâce à l&apos;alternance de
                                frappes rapides et d&apos;exercices de
                                renforcement.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Une tenue de sport, des baskets, une serviette
                                et de l&apos;eau. Les sacs de frappe et le
                                matériel sont fournis ; des gants peuvent être
                                recommandés (renseignez-vous à l&apos;accueil).
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
