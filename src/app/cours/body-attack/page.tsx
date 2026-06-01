import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Body Attack à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Body Attack près de Nîmes chez HALL B : cardio athlétique haute énergie, jusqu'à 600 kcal en 45 min. Tous niveaux, à 15 min de Nîmes.",
    alternates: { canonical: "https://www.hallb.fr/cours/body-attack" },
    openGraph: {
        title: "Cours de Body Attack à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Le cardio athlétique haute énergie inspiré des sports. Jusqu'à 600 kcal en 45 minutes, dans une salle dédiée à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/body-attack",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-body-attack"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Body Attack",
                        "description":
                            "Cours collectif de cardio athlétique haute énergie, inspiré des mouvements sportifs. Entraînement par intervalles. 45 minutes.",
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
                        "exerciseType": "Aerobic",
                        "url": "https://www.hallb.fr/cours/body-attack",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-body-attack"
                items={[
                    {
                        question: "Le Body Attack est-il fait pour les débutants ?",
                        answer: "Oui, à condition d'y aller à son rythme. Le coach propose toujours des options à faible impact (sans saut) pour les débutants et des options à fort impact pour les confirmés. On adapte l'intensité, jamais l'inverse.",
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: "Entre 400 et 600 kcal pour une séance de 45 minutes, ce qui en fait l'un des cours cardio les plus efficaces, au même niveau que le RPM ou le Step.",
                    },
                    {
                        question: "Quelle différence avec le Body Pump ?",
                        answer: "Le Body Pump est du renforcement musculaire avec barres lestées. Le Body Attack est du cardio athlétique (course, sauts, fentes dynamiques) sans matériel. L'un muscle, l'autre fait surtout grimper le cardio et brûler des calories.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "De bonnes baskets avec un bon amorti (mouvements pliométriques), une tenue respirante, une serviette et une grande bouteille d'eau. Aucun matériel n'est nécessaire.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_body_attack"
                eyebrow="Cours collectif"
                h1Top="Cours de Body Attack"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Le cardio athlétique haute énergie{" "}
                        inspiré des mouvements sportifs. Jusqu&apos;à{" "}
                        <strong>600 kcal en 45 minutes</strong>, dans une salle
                        dédiée chez HALL B, à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "600 kcal", label: "Jusqu'à, par séance" },
                    { value: "Cardio", label: "Intensité élevée" },
                    { value: "Tous niveaux", label: "Options adaptées" },
                ]}
                whatTitle="Le Body Attack, c'est quoi ?"
                whatParagraph1={
                    <>
                        Le Body Attack est un cours collectif
                        de cardio athlétique qui mélange{" "}
                        <em>aérobic, course, sauts et mouvements inspirés des
                        sports</em> (foot, basket, athlétisme). Le tout
                        chorégraphié sur une musique entraînante.
                    </>
                }
                whatParagraph2={
                    <>
                        Construit en entraînement par intervalles,
                        il alterne pics d&apos;effort cardio et phases de
                        renforcement (fentes, squats, gainage). Résultat&nbsp;:
                        un cours brûle-graisses redoutable qui
                        booste l&apos;endurance, l&apos;agilité et le moral.
                    </>
                }
                benefitsTitle="6 raisons d'essayer le Body Attack"
                benefits={[
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Jusqu'à 600 kcal par séance, avec un effet 'afterburn' qui prolonge la combustion.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio en béton",
                        text: "Le cœur et le souffle progressent vite grâce au travail par intervalles.",
                    },
                    {
                        iconName: "Activity",
                        title: "Agilité & coordination",
                        text: "Les déplacements et appuis sportifs améliorent la vivacité et l'équilibre.",
                    },
                    {
                        iconName: "Dumbbell",
                        title: "Renforcement",
                        text: "Fentes, squats sautés et gainage tonifient les jambes et la sangle abdominale.",
                    },
                    {
                        iconName: "Music",
                        title: "Énergie & musique",
                        text: "Une playlist qui pulse et un coach qui motive : le temps passe à toute vitesse.",
                    },
                    {
                        iconName: "Users",
                        title: "Effet groupe",
                        text: "L'énergie collective vous porte et vous pousse à vous dépasser.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement dynamique",
                        text: "Montée cardiaque progressive et mobilisation des appuis (5 min).",
                    },
                    {
                        n: "02",
                        title: "Premiers blocs cardio",
                        text: "Déplacements, course et sauts simples pour entrer dans le rythme.",
                    },
                    {
                        n: "03",
                        title: "Pics d'intensité",
                        text: "Intervalles haute intensité inspirés des mouvements sportifs.",
                    },
                    {
                        n: "04",
                        title: "Renforcement",
                        text: "Fentes, squats, pompes et gainage pour tonifier le corps.",
                    },
                    {
                        n: "05",
                        title: "Retour au calme",
                        text: "Récupération cardio et étirements pour bien terminer.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le Body Attack s&apos;adresse à{" "}
                        tous ceux qui aiment le cardio dynamique.
                        Particulièrement adapté si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "perdre du poids avec un cours brûle-graisses très efficace,",
                    "améliorer votre endurance et votre souffle,",
                    "gagner en agilité, en vivacité et en coordination,",
                    "vous défouler et évacuer le stress en musique,",
                    "varier des cours plus calmes ou du plateau de musculation.",
                ]}
                equipmentTitle="Une salle dédiée au cardio collectif"
                equipmentParagraph1={
                    <>
                        Le Body Attack se pratique dans notre{" "}
                        salle de cours collectifs, spacieuse,
                        au sol adapté pour amortir les sauts et préserver vos
                        articulations.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach diplômé propose en permanence{" "}
                        <em>une option à faible impact et une option à fort
                        impact</em>, pour que chacun travaille à la bonne
                        intensité, du débutant au sportif aguerri.
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
                        question: "Le Body Attack est-il fait pour les débutants ?",
                        answer: (
                            <p>
                                Oui, à condition d&apos;y aller à son rythme. Le
                                coach propose toujours des{" "}
                                options à faible impact (sans
                                saut) pour les débutants et à fort impact pour
                                les confirmés. On adapte l&apos;intensité,
                                jamais l&apos;inverse.
                            </p>
                        ),
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: (
                            <p>
                                Entre 400 et 600 kcal pour une
                                séance de 45 minutes — l&apos;un des cours cardio
                                les plus efficaces, au niveau du RPM ou du Step.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence avec le Body Pump ?",
                        answer: (
                            <p>
                                Le Body Pump est du
                                renforcement avec barres lestées. Le{" "}
                                Body Attack est du cardio
                                athlétique (course, sauts, fentes) sans
                                matériel. L&apos;un muscle, l&apos;autre fait
                                grimper le cardio et brûler des calories.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                De bonnes <strong>baskets avec un bon
                                amorti</strong> (mouvements pliométriques), une
                                tenue respirante, une serviette et une grande
                                bouteille d&apos;eau. Aucun matériel
                                n&apos;est nécessaire.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
