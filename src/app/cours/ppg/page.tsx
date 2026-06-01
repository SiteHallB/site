import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de PPG (Préparation Physique Générale) à Saint Dionisy (Nîmes) | HALL B",
    description:
        "Cours collectif de PPG près de Nîmes : préparation physique générale, cardio, renforcement et mobilité en 45 min chez HALL B Saint Dionisy. Tous niveaux.",
    alternates: { canonical: "https://www.hallb.fr/cours/ppg" },
    openGraph: {
        title: "Cours de PPG à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "45 minutes de préparation physique complète : cardio, force, explosivité et mobilité. La base de tous les sports.",
        url: "https://www.hallb.fr/cours/ppg",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-ppg"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de PPG — Préparation Physique Générale",
                        "description":
                            "Cours collectif de préparation physique générale : cardio, renforcement musculaire, explosivité et mobilité. 45 minutes.",
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
                        "exerciseType": "Conditioning",
                        "url": "https://www.hallb.fr/cours/ppg",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-ppg"
                items={[
                    {
                        question: "La PPG, c'est pour qui ?",
                        answer: "Pour tout le monde. Débutants comme sportifs confirmés : l'intensité s'adapte à chacun. C'est aussi la base idéale pour préparer un autre sport (running, foot, rugby, trail, sports de raquette).",
                    },
                    {
                        question: "Quelle différence avec le CAF ?",
                        answer: "Le CAF cible le bas du corps (cuisses, abdos, fessiers). La PPG travaille le corps entier en combinant cardio, renforcement, explosivité et mobilité. C'est plus complet et plus orienté condition physique générale.",
                    },
                    {
                        question: "Faut-il du matériel ?",
                        answer: "Non, tout est fourni : tapis, élastiques, kettlebells, médecine-balls, steps. Prévoyez juste une tenue de sport, des baskets, une serviette et de l'eau.",
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: "1 à 3 séances par semaine selon vos objectifs. En complément de la musculation ou d'un sport, une à deux séances suffisent à gagner en condition physique.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_ppg"
                eyebrow="Cours collectif"
                h1Top="Cours de PPG"
                h1Bottom="Préparation Physique Générale"
                heroLead={
                    <>
                        Cardio, force, explosivité et mobilité réunis en{" "}
                        <strong>45 minutes</strong>. La PPG, c&apos;est la base
                        athlétique complète, encadrée par un coach, chez HALL B
                        à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "~500 kcal", label: "Brûlées en moyenne" },
                    { value: "Corps entier", label: "Travail complet" },
                    { value: "Tous niveaux", label: "Intensité adaptable" },
                ]}
                whatTitle="La PPG, c'est quoi ?"
                whatParagraph1={
                    <>
                        PPG signifie{" "}
                        <strong>Préparation Physique Générale</strong>.
                        C&apos;est un cours collectif <em>complet</em> qui
                        développe l&apos;ensemble des qualités physiques&nbsp;:
                        endurance cardio, force, vitesse, explosivité,
                        coordination et mobilité.
                    </>
                }
                whatParagraph2={
                    <>
                        La séance enchaîne <strong>cardio, renforcement au poids
                        du corps et exercices fonctionnels</strong> sous forme
                        de circuits dynamiques. C&apos;est le socle idéal pour
                        se remettre en forme, progresser dans son sport ou
                        simplement gagner une condition physique solide et
                        durable.
                    </>
                }
                benefitsTitle="6 raisons de faire de la PPG"
                benefits={[
                    {
                        iconName: "Activity",
                        title: "Condition complète",
                        text: "Cardio, force et mobilité travaillés dans une seule et même séance.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Des circuits intenses qui font grimper la dépense calorique pendant et après l'effort.",
                    },
                    {
                        iconName: "Dumbbell",
                        title: "Renforcement global",
                        text: "Haut du corps, bas du corps, gainage — tout le corps est sollicité.",
                    },
                    {
                        iconName: "Heart",
                        title: "Endurance & souffle",
                        text: "Le cœur et la capacité cardio progressent séance après séance.",
                    },
                    {
                        iconName: "Timer",
                        title: "Efficace en 45 min",
                        text: "Format dense et sans temps mort, parfait sur la pause déjeuner.",
                    },
                    {
                        iconName: "Users",
                        title: "Dynamique de groupe",
                        text: "L'énergie collective vous pousse à donner le meilleur jusqu'à la fin.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement",
                        text: "Mobilité articulaire et activation cardio progressive (5 à 8 min).",
                    },
                    {
                        n: "02",
                        title: "Bloc cardio",
                        text: "Course, sauts, montées de genoux, déplacements — on monte en intensité.",
                    },
                    {
                        n: "03",
                        title: "Renforcement",
                        text: "Squats, fentes, pompes, gainage, au poids du corps ou avec petites charges.",
                    },
                    {
                        n: "04",
                        title: "Circuit fonctionnel",
                        text: "Stations enchaînées (kettlebell, élastiques, médecine-ball) en intervalle.",
                    },
                    {
                        n: "05",
                        title: "Retour au calme",
                        text: "Étirements et relâchement musculaire pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        La PPG s&apos;adresse à <strong>tous ceux qui veulent
                        une condition physique solide</strong>. Particulièrement
                        adaptée si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "vous remettre en forme de manière complète et progressive,",
                    "gagner en endurance, en force et en explosivité,",
                    "préparer physiquement un autre sport (course, trail, sports collectifs),",
                    "perdre du poids grâce à des circuits brûle-graisses,",
                    "varier vos entraînements et casser la routine du plateau.",
                ]}
                equipmentTitle="Une salle pensée pour le fonctionnel"
                equipmentParagraph1={
                    <>
                        La PPG se pratique dans notre{" "}
                        salle de cours collectifs, équipée de
                        tapis, kettlebells, médecine-balls, élastiques, steps et
                        petites charges pour varier les exercices.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach diplômé adapte l&apos;intensité à chacun,
                        corrige les placements et propose des{" "}
                        <em>variantes plus douces ou plus exigeantes</em> selon
                        votre niveau. Personne ne reste sur le bord.
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
                        question: "La PPG, c'est pour qui ?",
                        answer: (
                            <p>
                                Pour tout le monde. Débutants
                                comme sportifs confirmés : l&apos;intensité
                                s&apos;adapte à chacun. C&apos;est aussi la base
                                idéale pour préparer un autre sport (running,
                                foot, rugby, trail, sports de raquette).
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence avec le CAF ?",
                        answer: (
                            <p>
                                Le CAF cible le bas du corps
                                (cuisses, abdos, fessiers). La{" "}
                                PPG travaille le corps entier
                                en combinant cardio, renforcement, explosivité
                                et mobilité. Plus complet, plus orienté
                                condition physique générale.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il du matériel ?",
                        answer: (
                            <p>
                                Non, tout est fourni : tapis,
                                élastiques, kettlebells, médecine-balls, steps.
                                Prévoyez juste une tenue de sport, des baskets,
                                une serviette et de l&apos;eau.
                            </p>
                        ),
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: (
                            <p>
                                1 à 3 séances par semaine selon vos objectifs.
                                En complément de la musculation ou d&apos;un
                                sport, une à deux séances suffisent à gagner en
                                condition physique.
                            </p>
                        ),
                    },
                ]}
                secondaryCta={{ label: "Voir les plannings", path: "/plannings" }}
            />
        </>
    );
}
