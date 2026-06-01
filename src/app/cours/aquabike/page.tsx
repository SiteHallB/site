import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours d'Aquabike à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours d'aquabike près de Nîmes chez HALL B : vélo immergé en bassin chauffé, cardio intense et jambes galbées, sans impact. Tous niveaux, à 15 min de Nîmes.",
    alternates: { canonical: "https://www.hallb.fr/cours/aquabike" },
    openGraph: {
        title: "Cours d'Aquabike à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Le vélo dans l'eau : cardio intense, jambes galbées et effet anti-cellulite, sans impact. En bassin chauffé à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/aquabike",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-aquabike"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours d'Aquabike",
                        "description":
                            "Cours collectif de vélo immergé en bassin chauffé. Cardio et renforcement du bas du corps sans impact. 45 minutes.",
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
                        "url": "https://www.hallb.fr/cours/aquabike",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-aquabike"
                items={[
                    {
                        question: "Faut-il savoir nager pour l'aquabike ?",
                        answer: "Non. Le vélo est posé au fond du bassin, là où vous avez pied, et vous restez assis dessus. On ne nage jamais : aucune crainte à avoir, même si vous n'êtes pas à l'aise dans l'eau.",
                    },
                    {
                        question: "L'aquabike fait-il maigrir et agit-il sur la cellulite ?",
                        answer: "Oui, c'est l'un des cours d'aqua les plus efficaces : la résistance de l'eau augmente la dépense calorique et le massage permanent de l'eau sur les jambes est réputé pour stimuler la circulation et atténuer l'aspect de la cellulite.",
                    },
                    {
                        question: "Quelle différence avec l'aquagym ?",
                        answer: "L'aquagym est une gym tonique avec des mouvements variés debout dans l'eau. L'aquabike est centré sur le pédalage assis : plus de cardio et un travail ciblé des jambes et des fessiers.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement du bassin, un bonnet peut être demandé. Les vélos sont fournis et réglés à votre taille.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_aquabike"
                eyebrow="Bassin chauffé"
                h1Top="Cours d'Aquabike"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Le vélo dans l&apos;eau&nbsp;: <strong>cardio intense</strong>{" "}
                        et jambes galbées, sans impact pour les articulations.
                        45 minutes en bassin chauffé chez HALL B, à 15 minutes
                        de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "~500 kcal", label: "Brûlées en moyenne" },
                    { value: "Sans impact", label: "Articulations préservées" },
                    { value: "Tous niveaux", label: "Aucun pré-requis" },
                ]}
                whatTitle="L'aquabike, c'est quoi ?"
                whatParagraph1={
                    <>
                        L&apos;<strong>aquabike</strong> est un cours de{" "}
                        <strong>vélo immergé</strong> : on pédale sur un vélo
                        installé au fond d&apos;un bassin chauffé, l&apos;eau
                        arrivant à la taille. La <em>résistance de l&apos;eau</em>{" "}
                        remplace les côtes et rend chaque coup de pédale plus
                        efficace.
                    </>
                }
                whatParagraph2={
                    <>
                        Le coach rythme la séance&nbsp;: pédalage souple,
                        sprints, montées, travail debout sur les pédales. Le tout
                        <strong> sans aucun choc</strong> pour les genoux et le
                        dos, avec en prime l&apos;effet drainant et massant de
                        l&apos;eau sur les jambes.
                    </>
                }
                benefitsTitle="6 raisons d'essayer l'aquabike"
                benefits={[
                    {
                        iconName: "Bike",
                        title: "Jambes galbées",
                        text: "Cuisses, mollets et fessiers travaillés intensément contre la résistance de l'eau.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio efficace",
                        text: "Le souffle et l'endurance progressent vite, sans s'essouffler comme à sec.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Anti-cellulite",
                        text: "Le massage continu de l'eau stimule la circulation et lisse l'aspect de la peau.",
                    },
                    {
                        iconName: "Heart",
                        title: "Sans impact",
                        text: "Zéro choc pour les genoux, les hanches et le dos : idéal en reprise ou après blessure.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "La dépense calorique est élevée et se poursuit après la séance.",
                    },
                    {
                        iconName: "Wind",
                        title: "Jambes légères",
                        text: "Effet drainant immédiat : on ressort avec les jambes plus légères.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Installation & échauffement",
                        text: "Réglage du vélo et pédalage souple pour s'adapter à la résistance de l'eau.",
                    },
                    {
                        n: "02",
                        title: "Montée en intensité",
                        text: "Augmentation progressive du rythme et de la résistance.",
                    },
                    {
                        n: "03",
                        title: "Sprints & intervalles",
                        text: "Alternance d'efforts intenses et de récupérations pour booster le cardio.",
                    },
                    {
                        n: "04",
                        title: "Travail ciblé",
                        text: "Pédalage debout et mouvements pour intensifier le travail des jambes et des fessiers.",
                    },
                    {
                        n: "05",
                        title: "Retour au calme",
                        text: "Pédalage léger et étirements dans l'eau pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        L&apos;aquabike est <strong>accessible à tous</strong>,
                        et particulièrement recommandé si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "affiner et galber les jambes et les fessiers,",
                    "lutter contre la cellulite et les jambes lourdes,",
                    "faire du cardio sans agresser les articulations,",
                    "reprendre le sport après une blessure ou une grossesse,",
                    "perdre du poids dans une ambiance fun et rafraîchissante.",
                ]}
                equipmentTitle="Des vélos dans un bassin chauffé"
                equipmentParagraph1={
                    <>
                        L&apos;aquabike se pratique dans notre{" "}
                        <strong>bassin intérieur chauffé</strong>, baigné de
                        lumière naturelle. Les vélos immergés sont réglés à votre
                        taille par le coach.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach aquatique diplômé{" "}
                        <em>adapte l&apos;intensité à chacun</em> et veille à la
                        sécurité de tous. On a toujours pied et on ne nage
                        jamais&nbsp;: aucune appréhension à avoir.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en Vaunage. Accessible
                        en 15 minutes depuis Nîmes, et en moins de 20 minutes
                        depuis Calvisson, Sommières, Quissac, Vergèze et
                        Caveirac.
                    </>
                }
                faq={[
                    {
                        question: "Faut-il savoir nager pour l'aquabike ?",
                        answer: (
                            <p>
                                Non. Le vélo est posé au fond du bassin, là où
                                vous avez pied, et vous restez assis dessus.{" "}
                                <strong>On ne nage jamais</strong> : aucune
                                crainte, même si vous n&apos;êtes pas à
                                l&apos;aise dans l&apos;eau.
                            </p>
                        ),
                    },
                    {
                        question: "Ça fait maigrir et ça agit sur la cellulite ?",
                        answer: (
                            <p>
                                Oui, c&apos;est l&apos;un des cours d&apos;aqua
                                les plus efficaces : la résistance de l&apos;eau
                                augmente la dépense calorique et le{" "}
                                <strong>massage des jambes</strong> stimule la
                                circulation et atténue la cellulite.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence avec l'aquagym ?",
                        answer: (
                            <p>
                                L&apos;<strong>aquagym</strong> est une gym
                                tonique debout dans l&apos;eau. L&apos;
                                <strong>aquabike</strong> est centré sur le
                                pédalage assis : plus de cardio et un travail
                                ciblé des jambes et des fessiers.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Un maillot de bain, une serviette et une
                                bouteille d&apos;eau. Selon le règlement, un
                                bonnet peut être demandé. Les vélos sont fournis
                                et réglés à votre taille.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
