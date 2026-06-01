import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Pilates à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Pilates près de Nîmes chez HALL B à Saint Dionisy. Renforcement profond, posture, gainage. Tous niveaux, séance d'essai offerte.",
    alternates: { canonical: "https://www.hallb.fr/cours/pilates" },
    openGraph: {
        title: "Cours de Pilates à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Renforcez votre sangle abdominale et améliorez votre posture grâce au Pilates chez HALL B, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/pilates",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-pilates"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Pilates",
                        "description":
                            "Cours collectif de Pilates : renforcement profond, gainage abdominal, travail postural et de la respiration.",
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
                        "exerciseType": "Pilates",
                        "url": "https://www.hallb.fr/cours/pilates",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-pilates"
                items={[
                    {
                        question: "Le Pilates fait-il maigrir ?",
                        answer: "Le Pilates n'est pas un cours brûle-graisse comme le RPM ou le Zumba, mais il affine la silhouette en raffermissant les muscles profonds. Couplé à une alimentation équilibrée et à une pratique cardio, il participe à une perte de poids durable.",
                    },
                    {
                        question: "Quelle différence entre Pilates et Yoga ?",
                        answer: "Le Yoga met l'accent sur la spiritualité, la méditation et la souplesse. Le Pilates est plus centré sur le renforcement musculaire profond et la posture. Les deux pratiques se complètent très bien.",
                    },
                    {
                        question: "Faut-il un équipement particulier ?",
                        answer: "Une tenue souple, des chaussettes antidérapantes ou les pieds nus. Le tapis et le petit matériel (élastiques, blocs) sont fournis par HALL B.",
                    },
                    {
                        question: "À quelle fréquence pratiquer le Pilates ?",
                        answer: "2 séances par semaine constituent un bon rythme pour ressentir des bénéfices durables en 4 à 6 semaines : meilleure posture, abdominaux plus toniques, moins de tensions dorsales.",
                    },
                    {
                        question: "Le Pilates convient-il aux femmes enceintes ?",
                        answer: "Oui, le Pilates est même recommandé pendant la grossesse — à condition d'adapter les postures. Informez la coach de votre situation avant le cours pour bénéficier de variantes sécurisées.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_pilates"
                eyebrow="Cours collectif"
                h1Top="Cours de Pilates"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Renforcez votre sangle abdominale, améliorez votre
                        posture et gagnez en souplesse. Le Pilates chez HALL B,
                        à 15 minutes de Nîmes, dans une salle dédiée.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "Tous niveaux", label: "Débutant à confirmé" },
                    { value: "Sans impact", label: "Articulations préservées" },
                    { value: "Effet posture", label: "Dès 4 semaines" },
                ]}
                whatTitle="Le Pilates, c'est quoi ?"
                whatParagraph1={
                    <>
                        Créée par <strong>Joseph Pilates</strong> au début du
                        XX<sup>e</sup> siècle, cette méthode douce mais
                        exigeante vise à <strong>renforcer les muscles
                        profonds</strong> du tronc, à corriger les déséquilibres
                        posturaux et à améliorer la coordination corps-esprit.
                    </>
                }
                whatParagraph2={
                    <>
                        Une séance type alterne exercices au sol{" "}
                        et postures contrôlées, toujours
                        guidées par la respiration. Idéal pour soulager les
                        douleurs de dos, affiner la silhouette et retrouver une
                        meilleure conscience corporelle.
                    </>
                }
                benefitsTitle="6 raisons de se mettre au Pilates"
                benefits={[
                    {
                        iconName: "Sparkles",
                        title: "Gainage profond",
                        text: "Travail ciblé du transverse et du plancher pelvien pour une ceinture abdominale solide.",
                    },
                    {
                        iconName: "Activity",
                        title: "Posture améliorée",
                        text: "Réalignement de la colonne vertébrale et meilleure conscience corporelle.",
                    },
                    {
                        iconName: "Heart",
                        title: "Réduction du stress",
                        text: "Le travail respiratoire calme le système nerveux et apaise l'esprit.",
                    },
                    {
                        iconName: "Wind",
                        title: "Souplesse",
                        text: "Étirements progressifs et travail de la mobilité articulaire à chaque séance.",
                    },
                    {
                        iconName: "Brain",
                        title: "Concentration",
                        text: "Chaque mouvement demande précision et focus — un vrai entraînement mental.",
                    },
                    {
                        iconName: "Smile",
                        title: "Douleurs de dos",
                        text: "Méthode recommandée par les kinés pour prévenir et soulager les douleurs lombaires.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Centrage et respiration",
                        text: "Mise en condition, conscience du périnée et de la respiration thoracique.",
                    },
                    {
                        n: "02",
                        title: "Échauffement articulaire",
                        text: "Mobilisation douce du bassin, des épaules et de la colonne.",
                    },
                    {
                        n: "03",
                        title: "Exercices de gainage",
                        text: "Travail du transverse via les exercices fondamentaux : Hundred, Roll-up, Single Leg Stretch.",
                    },
                    {
                        n: "04",
                        title: "Renforcement ciblé",
                        text: "Postures plus avancées pour cuisses, fessiers, dos et abdominaux.",
                    },
                    {
                        n: "05",
                        title: "Étirements & retour au calme",
                        text: "Relâchement musculaire, étirements en profondeur, focus respiration.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le Pilates est accessible à tous, du
                        débutant absolu au sportif confirmé. Il est
                        particulièrement adapté si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "renforcer votre sangle abdominale en profondeur,",
                    "soulager ou prévenir les douleurs de dos,",
                    "améliorer votre posture au quotidien,",
                    "vous remettre au sport en douceur après une pause,",
                    "compléter une autre pratique sportive plus intense.",
                ]}
                equipmentTitle="Une salle de cours collectifs dédiée"
                equipmentParagraph1={
                    <>
                        Le Pilates se pratique dans notre{" "}
                        salle de cours collectifs, équipée de
                        tapis épais, blocs de yoga, élastiques et petits
                        accessoires Pilates pour varier les sensations.
                    </>
                }
                equipmentParagraph2={
                    <>
                        L&apos;ambiance est <em>calme et concentrée</em>,
                        propice au travail postural et à la respiration. Notre
                        coach diplômée corrige les placements et adapte chaque
                        exercice à votre niveau.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. Accessible en{" "}
                        15 minutes depuis Nîmes, et en moins
                        de 20 minutes depuis Calvisson, Sommières, Quissac,
                        Vergèze et Caveirac. Si vous cherchiez un{" "}
                        <em>cours de Pilates dans le Gard</em>, vous êtes au
                        bon endroit.
                    </>
                }
                faq={[
                    {
                        question: "Le Pilates fait-il maigrir ?",
                        answer: (
                            <p>
                                Le Pilates n&apos;est pas un cours brûle-graisse
                                comme le RPM ou le Zumba, mais il affine la
                                silhouette en raffermissant les muscles
                                profonds. Couplé à une alimentation équilibrée
                                et à une pratique cardio, il participe à une
                                perte de poids durable.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence entre Pilates et Yoga ?",
                        answer: (
                            <p>
                                Le Yoga met l&apos;accent sur la spiritualité,
                                la méditation et la souplesse. Le Pilates est
                                plus centré sur le{" "}
                                renforcement musculaire profond{" "}
                                et la posture. Les deux pratiques se
                                complètent très bien.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il un équipement particulier ?",
                        answer: (
                            <p>
                                Une tenue souple, des chaussettes
                                antidérapantes ou les pieds nus. Le tapis et le
                                petit matériel (élastiques, blocs) sont fournis
                                par HALL B.
                            </p>
                        ),
                    },
                    {
                        question: "À quelle fréquence pratiquer le Pilates ?",
                        answer: (
                            <p>
                                2 séances par semaine constituent un bon rythme
                                pour ressentir des bénéfices durables en 4 à 6
                                semaines : meilleure posture, abdominaux plus
                                toniques, moins de tensions dorsales.
                            </p>
                        ),
                    },
                    {
                        question: "Le Pilates convient-il aux femmes enceintes ?",
                        answer: (
                            <p>
                                Oui, le Pilates est même recommandé pendant la
                                grossesse — à condition d&apos;adapter les
                                postures. Informez la coach de votre situation
                                avant le cours pour bénéficier de variantes
                                sécurisées.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
