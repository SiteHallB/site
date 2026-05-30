import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Yoga à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Yoga près de Nîmes chez HALL B : postures, respiration, souplesse et relaxation en 45 min. Tous niveaux, à 15 min de Nîmes à Saint Dionisy.",
    alternates: { canonical: "https://www.hallb.fr/cours/yoga" },
    openGraph: {
        title: "Cours de Yoga à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Postures, respiration et relaxation en 45 minutes. Gagnez en souplesse et en sérénité, dans une salle dédiée à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/yoga",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-yoga"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Yoga",
                        "description":
                            "Cours collectif de yoga : postures (asanas), respiration (pranayama), souplesse et relaxation. 45 minutes.",
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
                        "exerciseType": "Yoga",
                        "url": "https://www.hallb.fr/cours/yoga",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-yoga"
                items={[
                    {
                        question: "Faut-il être souple pour commencer le yoga ?",
                        answer: "Non, c'est justement en pratiquant qu'on gagne en souplesse. Chaque posture est adaptable avec des supports (blocs, sangles) et progresse à votre rythme. Le yoga s'adresse vraiment à tous, y compris aux grands débutants.",
                    },
                    {
                        question: "Le yoga muscle-t-il vraiment ?",
                        answer: "Oui, en profondeur. Les postures de gainage et d'équilibre (planche, guerrier, chaise) renforcent les abdominaux, les jambes et le dos. C'est un renforcement doux mais réel, sans impact ni charge.",
                    },
                    {
                        question: "Quel type de yoga propose HALL B ?",
                        answer: "Un yoga accessible mêlant postures (hatha / vinyasa doux), travail de la respiration et relaxation finale. L'objectif : souplesse, gainage, calme et meilleure récupération — sans dimension spirituelle imposée.",
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: "1 à 2 séances par semaine suffisent pour ressentir les bénéfices : souplesse, calme, meilleur sommeil. Excellent en complément d'une pratique plus intense (musculation, RPM, cardio).",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_yoga"
                eyebrow="Cours collectif"
                h1Top="Cours de Yoga"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Postures, respiration et relaxation en{" "}
                        <strong>45 minutes</strong>. Gagnez en{" "}
                        souplesse, gainage et sérénité dans une
                        salle dédiée chez HALL B, à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "Souplesse +", label: "Dès 4 semaines" },
                    { value: "Anti-stress", label: "Effet immédiat" },
                    { value: "Tous niveaux", label: "Aucun pré-requis" },
                ]}
                whatTitle="Le Yoga, c'est quoi ?"
                whatParagraph1={
                    <>
                        Le <strong>yoga</strong> est une pratique qui relie le
                        corps et l&apos;esprit à travers des{" "}
                        postures (asanas), un travail de{" "}
                        respiration (pranayama) et un temps de
                        relaxation. Chez HALL B, on en propose une version{" "}
                        <em>accessible et bienveillante</em>, sans dogme.
                    </>
                }
                whatParagraph2={
                    <>
                        Au programme&nbsp;: enchaînements fluides, postures
                        d&apos;équilibre et de gainage, étirements profonds et
                        respiration consciente. Le tout se termine par une{" "}
                        relaxation guidée qui apaise le système
                        nerveux et améliore la récupération.
                    </>
                }
                benefitsTitle="6 raisons d'essayer le Yoga"
                benefits={[
                    {
                        iconName: "Wind",
                        title: "Souplesse",
                        text: "Des étirements progressifs qui améliorent durablement la mobilité.",
                    },
                    {
                        iconName: "Heart",
                        title: "Anti-stress",
                        text: "La respiration et la relaxation finale font redescendre la pression immédiatement.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Gainage profond",
                        text: "Les postures sollicitent en douceur la sangle abdominale et les muscles posturaux.",
                    },
                    {
                        iconName: "Activity",
                        title: "Équilibre",
                        text: "Les postures sur appui renforcent les muscles stabilisateurs et la proprioception.",
                    },
                    {
                        iconName: "Brain",
                        title: "Concentration",
                        text: "Vous apprenez à vous recentrer, à respirer et à relâcher les tensions.",
                    },
                    {
                        iconName: "Smile",
                        title: "Meilleur sommeil",
                        text: "Un système nerveux apaisé favorise un sommeil plus profond et réparateur.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Centrage & respiration",
                        text: "Quelques minutes assis pour se reconnecter au souffle et au moment présent.",
                    },
                    {
                        n: "02",
                        title: "Échauffement doux",
                        text: "Mobilisations articulaires et premiers enchaînements pour réveiller le corps.",
                    },
                    {
                        n: "03",
                        title: "Salutations & postures debout",
                        text: "Enchaînements dynamiques, postures d'équilibre et de renforcement (guerrier, arbre, chaise).",
                    },
                    {
                        n: "04",
                        title: "Postures au sol",
                        text: "Étirements profonds, ouverture des hanches, travail du dos et du gainage.",
                    },
                    {
                        n: "05",
                        title: "Relaxation finale",
                        text: "Posture du repos et relaxation guidée — quelques minutes de relâchement total.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le yoga est idéal pour tous, et
                        particulièrement adapté si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "évacuer le stress et apaiser le mental,",
                    "gagner en souplesse et en mobilité articulaire,",
                    "soulager les tensions du dos et de la nuque,",
                    "compléter une pratique intense par de la récupération active,",
                    "améliorer votre sommeil, votre respiration et votre concentration.",
                ]}
                equipmentTitle="Une ambiance pensée pour la détente"
                equipmentParagraph1={
                    <>
                        Le yoga se pratique dans une{" "}
                        salle dédiée, dans une ambiance{" "}
                        <em>calme et tamisée</em>. Tapis épais, blocs, sangles
                        et coussins sont à votre disposition.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre professeur guide chaque posture, propose des{" "}
                        <em>variantes et des ajustements individuels</em>, et ne
                        met aucune pression de performance. Vous avancez à votre
                        rythme, séance après séance.
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
                        question: "Faut-il être souple pour commencer ?",
                        answer: (
                            <p>
                                Non, c&apos;est justement{" "}
                                <strong>en pratiquant qu&apos;on devient
                                souple</strong>. Chaque posture est adaptable
                                avec des supports (blocs, sangles) et progresse
                                à votre rythme. Le yoga s&apos;adresse à tous, y
                                compris aux grands débutants.
                            </p>
                        ),
                    },
                    {
                        question: "Le yoga muscle-t-il vraiment ?",
                        answer: (
                            <p>
                                Oui, en profondeur. Les postures de gainage et
                                d&apos;équilibre (planche, guerrier, chaise)
                                renforcent les abdominaux, les jambes et le dos.
                                Un renforcement doux mais réel,
                                sans impact ni charge.
                            </p>
                        ),
                    },
                    {
                        question: "Quel type de yoga propose HALL B ?",
                        answer: (
                            <p>
                                Un yoga accessible mêlant
                                postures (hatha / vinyasa doux), travail de la
                                respiration et relaxation finale. Objectif :
                                souplesse, gainage, calme et récupération — sans
                                dimension spirituelle imposée.
                            </p>
                        ),
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: (
                            <p>
                                1 à 2 séances par semaine suffisent pour
                                ressentir les bénéfices (souplesse, calme,
                                meilleur sommeil). Excellent en complément
                                d&apos;une pratique plus intense (musculation,
                                RPM, cardio).
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
