import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Zumba à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Zumba près de Nîmes chez HALL B. Danse fitness aux rythmes latins, jusqu'à 500 kcal en 45 min. Ambiance festive, tous niveaux bienvenus.",
    alternates: { canonical: "https://www.hallb.fr/cours/zumba" },
    openGraph: {
        title: "Cours de Zumba à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Une fête déguisée en cours de sport. Zumba, salsa, reggaeton — bougez sans vous en rendre compte.",
        url: "https://www.hallb.fr/cours/zumba",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-zumba"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Zumba",
                        "description":
                            "Cours collectif de danse fitness aux rythmes latins. Mélange de cardio, danse et chorégraphies sur 45 minutes.",
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
                        "exerciseType": "Dance fitness",
                        "url": "https://www.hallb.fr/cours/zumba",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-zumba"
                items={[
                    {
                        question: "Je ne sais pas danser, c'est grave ?",
                        answer: "Pas du tout. La Zumba est conçue pour les non-danseurs. Les pas sont simples, répétitifs, et personne ne juge. Après 2 ou 3 cours, vous connaîtrez les chorégraphies par cœur.",
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: "Entre 300 et 500 kcal par séance, selon votre intensité et votre poids. C'est l'équivalent d'une heure de course modérée — en beaucoup plus fun.",
                    },
                    {
                        question: "Quel équipement faut-il ?",
                        answer: "Une tenue confortable et des baskets de salle (semelle souple pour pivoter sans bloquer le genou). Une bouteille d'eau et une serviette — ça transpire.",
                    },
                    {
                        question: "C'est ouvert aux hommes ?",
                        answer: "Évidemment. La Zumba est mixte. Les hommes représentent une part croissante des pratiquants. Aucune raison de s'en priver.",
                    },
                    {
                        question: "Y a-t-il des cours pour seniors ?",
                        answer: "La Zumba classique reste accessible. Pour les seniors recherchant un format plus doux, la Zumba Gold peut être proposée selon les périodes — consultez le planning.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_zumba"
                eyebrow="Cours collectif"
                h1Top="Cours de Zumba"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Le sport qui ressemble à une fête. Salsa, reggaeton,
                        merengue — jusqu&apos;à <strong>500 kcal brûlées</strong>{" "}
                        en 45 minutes, sans avoir l&apos;impression de
                        s&apos;entraîner.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "500 kcal", label: "Brûlées en moyenne" },
                    { value: "Tous niveaux", label: "Aucun pré-requis" },
                    { value: "0 routine", label: "Chaque cours est différent" },
                ]}
                whatTitle="La Zumba, c'est quoi ?"
                whatParagraph1={
                    <>
                        Inventée à la fin des années 1990 par le chorégraphe
                        colombien Beto Pérez, la Zumba est
                        devenue en 20 ans le plus grand programme de{" "}
                        <strong>danse fitness</strong> au monde. Le concept est
                        simple&nbsp;: enchaîner des chorégraphies courtes sur
                        des musiques latines (salsa, reggaeton, cumbia,
                        merengue, samba) en mode fête.
                    </>
                }
                whatParagraph2={
                    <>
                        Pas besoin de savoir danser&nbsp;: les pas sont{" "}
                        <em>simples et répétitifs</em>, et chacun les adapte à
                        son niveau. L&apos;objectif n&apos;est pas la
                        perfection technique mais le plaisir{" "}
                        et l&apos;intensité. Cardio déguisé en
                        sortie&nbsp;dansante.
                    </>
                }
                benefitsTitle="6 raisons d'adorer la Zumba"
                benefits={[
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Jusqu'à 500 kcal en 45 minutes — l'un des cardios les plus efficaces.",
                    },
                    {
                        iconName: "Music",
                        title: "Le temps passe vite",
                        text: "Vous sortez du cours surpris d'avoir transpiré autant. La musique fait tout.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio renforcé",
                        text: "Endurance et capacités cardio-vasculaires progressent dès les premières semaines.",
                    },
                    {
                        iconName: "Users",
                        title: "Ambiance festive",
                        text: "Le plus convivial des cours collectifs. Souvent suivi d'un café entre adhérents.",
                    },
                    {
                        iconName: "Smile",
                        title: "Anti-stress",
                        text: "La danse libère endorphines et dopamine. Effet immédiat sur le moral.",
                    },
                    {
                        iconName: "Globe",
                        title: "Coordination",
                        text: "Vous apprenez à enchaîner des mouvements complexes — utile dans toute pratique sportive.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement dansé",
                        text: "Premières chorégraphies lentes pour activer le corps en douceur.",
                    },
                    {
                        n: "02",
                        title: "Chorégraphies cardio",
                        text: "Le cœur du cours — salsa, reggaeton, merengue, à haute intensité.",
                    },
                    {
                        n: "03",
                        title: "Plateaux toniques",
                        text: "Mouvements ciblés cuisses-fessiers entre deux chorégraphies cardio.",
                    },
                    {
                        n: "04",
                        title: "Retour au calme",
                        text: "Chorégraphies plus douces et étirements rythmés sur des musiques lentes.",
                    },
                ]}
                audienceIntro={
                    <>
                        La Zumba est <strong>l&apos;un des cours les plus
                        inclusifs</strong>&nbsp;: aucun niveau de danse
                        requis. Particulièrement adapté si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "perdre du poids sans courir sur un tapis,",
                    "retrouver le plaisir du sport après une période d'arrêt,",
                    "évacuer le stress de la semaine,",
                    "rejoindre un groupe convivial,",
                    "améliorer votre coordination et votre cardio en même temps.",
                ]}
                equipmentTitle="Une salle conçue pour danser"
                equipmentParagraph1={
                    <>
                        Nous accueillons les cours de Zumba dans notre{" "}
                        salle de danse équipée de miroirs
                        grand format, plancher technique{" "}
                        <em>conçu pour absorber les impacts</em>, et système
                        son professionnel pour vibrer au rythme de la musique.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach Zumba est certifiée ZIN{" "}
                        (Zumba Instructor Network) — gage de qualité
                        chorégraphique et de respect du concept original.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, à{" "}
                        15 minutes de Nîmes. Accessible en
                        moins de 20 minutes depuis Calvisson, Sommières,
                        Quissac, Vergèze et Caveirac. Un des rares vrais
                        cours de Zumba dans le bassin nîmois.
                    </>
                }
                faq={[
                    {
                        question: "Je ne sais pas danser, c'est grave ?",
                        answer: (
                            <p>
                                Pas du tout. La Zumba est <strong>conçue pour
                                les non-danseurs</strong>. Les pas sont
                                simples, répétitifs, et personne ne juge.
                                Après 2 ou 3 cours, vous connaîtrez les
                                chorégraphies par cœur.
                            </p>
                        ),
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: (
                            <p>
                                Entre 300 et 500 kcal par séance, selon votre
                                intensité et votre poids. C&apos;est
                                l&apos;équivalent d&apos;une heure de course
                                modérée — en beaucoup plus fun.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement faut-il ?",
                        answer: (
                            <p>
                                Une tenue confortable et des baskets de salle
                                (semelle souple pour pivoter sans bloquer le
                                genou). Une bouteille d&apos;eau et une
                                serviette &mdash; ça transpire.
                            </p>
                        ),
                    },
                    {
                        question: "C'est ouvert aux hommes ?",
                        answer: (
                            <p>
                                Évidemment. La Zumba est mixte. Les hommes
                                représentent une part croissante des
                                pratiquants. Aucune raison de s&apos;en priver.
                            </p>
                        ),
                    },
                    {
                        question: "Y a-t-il des cours pour seniors ?",
                        answer: (
                            <p>
                                La Zumba classique reste accessible. Pour les
                                seniors recherchant un format plus doux, la{" "}
                                <em>Zumba Gold</em> peut être proposée selon
                                les périodes — consultez le planning.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
