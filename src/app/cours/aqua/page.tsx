import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours d'aqua à Saint Dionisy (Nîmes) : aquagym, aquabike, aqua power, aqua mix | HALL B",
    description:
        "Tous les cours d'aqua de HALL B près de Nîmes : aquagym, aquabike, aqua power et aqua mix en bassin chauffé, sans impact. À 15 min de Nîmes, Saint Dionisy.",
    alternates: { canonical: "https://www.hallb.fr/cours/aqua" },
    openGraph: {
        title: "Cours d'aqua à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Aquagym, aquabike, aqua power, aqua mix : 4 cours d'aqua en bassin chauffé, sans impact pour les articulations. À 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/aqua",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-aqua"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours d'aqua — aquagym, aquabike, aqua power, aqua mix",
                        "description":
                            "Cours collectifs en bassin chauffé : aquagym, aquabike, aqua power et aqua mix. Travail tonique sans impact pour les articulations. 45 minutes.",
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
                        "exerciseType": "Aquatic fitness",
                        "url": "https://www.hallb.fr/cours/aqua",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-aqua"
                items={[
                    {
                        question: "Faut-il savoir nager pour les cours d'aqua ?",
                        answer: "Non, aucun besoin de savoir nager. Les cours se déroulent dans une zone où vous avez pied, l'eau arrivant à la taille ou à la poitrine. On ne nage jamais : on bouge, on pédale ou on renforce, toujours en appui.",
                    },
                    {
                        question: "Quelle différence entre aquagym, aquabike, aqua power et aqua mix ?",
                        answer: "L'aquagym est une gym tonique douce en eau. L'aquabike se pratique sur un vélo immergé (cardio intense, jambes). L'aqua power est plus intensif, avec accessoires de résistance. L'aqua mix combine plusieurs de ces disciplines dans une même séance variée.",
                    },
                    {
                        question: "Les cours d'aqua aident-ils à mincir et contre la cellulite ?",
                        answer: "Oui. La résistance de l'eau augmente la dépense calorique et le massage de l'eau sur la peau, surtout en aquabike, est réputé pour son action sur la circulation et l'aspect de la cellulite.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement du bassin, un bonnet de bain peut être demandé. Les vélos et accessoires aqua sont fournis par la salle.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_aqua"
                eyebrow="Bassin chauffé"
                h1Top="Cours d'aqua"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Quatre cours en bassin chauffé&nbsp;:{" "}
                        <strong>aquagym, aquabike, aqua power et aqua mix</strong>.
                        Du tonique sans impact pour les articulations, chez
                        HALL B à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "4 cours", label: "Aqua au choix" },
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "Sans impact", label: "Articulations préservées" },
                    { value: "Bassin chauffé", label: "Toute l'année" },
                ]}
                whatTitle="Les cours d'aqua, c'est quoi ?"
                whatParagraph1={
                    <>
                        Nos <strong>cours d&apos;aqua</strong> se pratiquent
                        dans un bassin intérieur chauffé.
                        L&apos;eau <em>porte le corps</em> — donc aucun choc
                        pour les articulations — tout en offrant une{" "}
                        résistance naturelle qui tonifie en
                        profondeur. Idéal pour tous les âges et toutes les
                        conditions physiques.
                    </>
                }
                whatParagraph2={
                    <>
                        Quatre formats pour varier les plaisirs&nbsp;:{" "}
                        aquagym (gym tonique douce),{" "}
                        aquabike (vélo immergé, cardio
                        intense), aqua power (renforcement
                        intensif avec accessoires) et{" "}
                        aqua mix (la séance complète qui
                        combine tout). Chacun trouve le sien.
                    </>
                }
                benefitsTitle="Aquagym, aquabike, aqua power, aqua mix"
                benefits={[
                    {
                        iconName: "Activity",
                        title: "Aquagym",
                        text: "Gym tonique en eau : mouvements rythmés pour tonifier tout le corps en douceur.",
                    },
                    {
                        iconName: "Bike",
                        title: "Aquabike",
                        text: "Pédalage sur vélo immergé : cardio intense, jambes galbées, effet anti-cellulite.",
                    },
                    {
                        iconName: "Flame",
                        title: "Aqua Power",
                        text: "Format haute intensité avec accessoires (haltères mousse, frites) pour un renforcement tonique.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Aqua Mix",
                        text: "Le mélange complet : gym, vélo et renforcement réunis dans une séance variée.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Mise à l'eau & échauffement",
                        text: "Adaptation à la résistance de l'eau et mobilisation articulaire en douceur.",
                    },
                    {
                        n: "02",
                        title: "Bloc cardio",
                        text: "Selon le cours : mouvements dynamiques (aquagym) ou pédalage (aquabike).",
                    },
                    {
                        n: "03",
                        title: "Renforcement",
                        text: "Travail tonique avec la résistance de l'eau et des accessoires (frites, haltères mousse).",
                    },
                    {
                        n: "04",
                        title: "Travail ciblé",
                        text: "Jambes, fessiers, sangle abdominale — l'eau intensifie chaque mouvement.",
                    },
                    {
                        n: "05",
                        title: "Étirements & relâchement",
                        text: "Retour au calme dans l'eau, étirements et détente pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        Les cours d&apos;aqua sont{" "}
                        accessibles à tous, et particulièrement
                        recommandés si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "faire du sport sans agresser les articulations, le dos ou les genoux,",
                    "reprendre une activité après une blessure ou une grossesse,",
                    "tonifier les jambes et lutter contre la cellulite (aquabike),",
                    "améliorer votre cardio et votre circulation en douceur,",
                    "bouger dans une eau chauffée, agréable toute l'année.",
                ]}
                equipmentTitle="Un bassin chauffé et lumineux"
                equipmentParagraph1={
                    <>
                        Nos cours d&apos;aqua se déroulent dans un{" "}
                        bassin intérieur chauffé, baigné de
                        lumière naturelle. Vélos d&apos;aquabike, haltères en
                        mousse, frites et accessoires de résistance sont fournis.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Nos coachs aquatiques diplômés{" "}
                        <em>adaptent l&apos;intensité à chacun</em> et veillent
                        à la sécurité de tous. Aucune crainte à avoir&nbsp;: on
                        a toujours pied et on ne nage jamais.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. Accessible en{" "}
                        15 minutes depuis Nîmes, et en moins de
                        20 minutes depuis Calvisson, Sommières, Quissac, Vergèze
                        et Caveirac. Un des rares bassins dédiés aux cours
                        d&apos;aqua du bassin nîmois.
                    </>
                }
                faq={[
                    {
                        question: "Faut-il savoir nager ?",
                        answer: (
                            <p>
                                Non, aucun besoin de savoir nager.
                                Les cours se déroulent là où vous avez pied,
                                l&apos;eau arrivant à la taille ou à la
                                poitrine. On ne nage jamais : on bouge, on
                                pédale ou on renforce, toujours en appui.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence entre les 4 cours d'aqua ?",
                        answer: (
                            <p>
                                L&apos;aquagym est une gym
                                tonique douce. L&apos;aquabike{" "}
                                se pratique sur vélo immergé (cardio, jambes).
                                L&apos;aqua power est plus
                                intensif, avec accessoires de résistance.
                                L&apos;aqua mix combine
                                plusieurs disciplines dans une même séance.
                            </p>
                        ),
                    },
                    {
                        question: "Est-ce efficace contre la cellulite ?",
                        answer: (
                            <p>
                                Oui. La résistance et le massage de l&apos;eau,
                                surtout en aquabike, sont
                                réputés pour stimuler la circulation et
                                améliorer l&apos;aspect de la peau, tout en
                                augmentant la dépense calorique.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Un maillot de bain, une
                                serviette et une bouteille d&apos;eau. Selon le
                                règlement du bassin, un bonnet peut être demandé.
                                Vélos et accessoires aqua sont fournis par la
                                salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
