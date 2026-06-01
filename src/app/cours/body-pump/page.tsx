import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Body Pump à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours de Body Pump (Pump) près de Nîmes chez HALL B. Renforcement musculaire complet avec barres lestées, sur fond de musique. Brûlez jusqu'à 400 kcal.",
    alternates: { canonical: "https://www.hallb.fr/cours/body-pump" },
    openGraph: {
        title: "Cours de Body Pump à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Renforcement musculaire complet en groupe, barres lestées + musique. Body Pump chez HALL B à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/body-pump",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-body-pump"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Body Pump",
                        "description":
                            "Cours collectif de renforcement musculaire avec barres lestées et disques, créé par Les Mills. 45 minutes intenses.",
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
                        "exerciseType": "Strength training",
                        "url": "https://www.hallb.fr/cours/body-pump",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-body-pump"
                items={[
                    {
                        question: "Le Body Pump fait-il prendre du muscle ?",
                        answer: "Oui, surtout pour les débutants. Le travail régulier avec charges (même légères au début) stimule la croissance musculaire et tonifie progressivement. Pour de l'hypertrophie pure, compléter avec de la musculation classique.",
                    },
                    {
                        question: "Quelle charge choisir au début ?",
                        answer: "Commencez léger : 2 à 5 kg sur la barre suffisent pour la première séance, le temps d'apprendre les mouvements. La coach vous conseillera des progressions adaptées.",
                    },
                    {
                        question: "Body Pump vs musculation classique ?",
                        answer: "Le Body Pump travaille en endurance musculaire (séries longues, charges modérées). La musculation classique permet plus de spécialisation et de surcharge progressive. Les deux sont complémentaires.",
                    },
                    {
                        question: "Combien de fois par semaine ?",
                        answer: "2 à 3 séances par semaine, en alternant avec un jour de récupération ou un cours cardio (RPM, Zumba). Le corps a besoin de temps pour reconstruire les muscles entre deux séances de renforcement.",
                    },
                    {
                        question: "Faut-il un équipement particulier ?",
                        answer: "Tenue de sport, chaussures adaptées (éviter les semelles plates type Converse), serviette et bouteille d'eau. Tout le reste (barre, disques, tapis) est fourni par la salle.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_body_pump"
                eyebrow="Cours collectif"
                h1Top="Cours de Body Pump"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Le cours de renforcement musculaire le plus efficace du
                        monde, créé par Les Mills. Une barre, des disques, une
                        playlist explosive — et jusqu&apos;à{" "}
                        <strong>400 kcal brûlées</strong> en 45 min.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "400 kcal", label: "Brûlées en moyenne" },
                    { value: "Tous niveaux", label: "Charges adaptables" },
                    { value: "10 muscles", label: "Travaillés en 1 séance" },
                ]}
                whatTitle="Le Body Pump, c'est quoi ?"
                whatParagraph1={
                    <>
                        Le <strong>Body Pump</strong> (parfois appelé{" "}
                        <em>Pump</em> tout court) est un cours collectif créé
                        par Les Mills en 1991. Le principe :
                        utiliser des barres lestées et des
                        disques de musculation sur fond de musique pour
                        travailler en groupe tous les grands groupes
                        musculaires.
                    </>
                }
                whatParagraph2={
                    <>
                        Chaque chanson cible un muscle précis (squats, soulevé
                        de terre, développé couché, biceps, triceps, épaules,
                        gainage). C&apos;est l&apos;équivalent d&apos;une séance
                        complète de musculation, en{" "}
                        format collectif motivant, avec un
                        rythme et une intensité dictés par la musique.
                    </>
                }
                benefitsTitle="6 raisons de faire du Body Pump"
                benefits={[
                    {
                        iconName: "Dumbbell",
                        title: "Renforcement complet",
                        text: "Tous les grands groupes musculaires travaillés en une seule séance.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Jusqu'à 400 kcal éliminées et un effet 'afterburn' qui prolonge la combustion.",
                    },
                    {
                        iconName: "Music",
                        title: "Effet motivant",
                        text: "La musique rythme chaque exercice — vous ne voyez pas le temps passer.",
                    },
                    {
                        iconName: "Users",
                        title: "Énergie du groupe",
                        text: "L'effet collectif vous pousse à donner le meilleur, même les jours sans.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio + force",
                        text: "Combinaison rare qui muscle ET améliore l'endurance cardio-vasculaire.",
                    },
                    {
                        iconName: "Timer",
                        title: "Efficace en 45 min",
                        text: "Un entraînement complet sans avoir à enchaîner les machines de musculation.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement (5 min)",
                        text: "Activation musculaire générale avec barre légère, mobilisation articulaire.",
                    },
                    {
                        n: "02",
                        title: "Squats",
                        text: "Travail des cuisses et fessiers — la base de tout entraînement.",
                    },
                    {
                        n: "03",
                        title: "Pectoraux & dos",
                        text: "Développé couché, rowing barre, soulevé de terre. Les gros muscles du haut du corps.",
                    },
                    {
                        n: "04",
                        title: "Biceps, triceps, épaules",
                        text: "Petits muscles isolés, exercices courts et intenses pour la tonicité.",
                    },
                    {
                        n: "05",
                        title: "Gainage abdominal",
                        text: "Crunch, planches, oblique — la sangle abdominale en fin de séance.",
                    },
                    {
                        n: "06",
                        title: "Étirements",
                        text: "Retour au calme et étirement de tous les muscles travaillés.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le Body Pump est accessible à tous{" "}
                        grâce aux charges adaptables. Particulièrement adapté
                        si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "renforcer vos muscles sans aller en salle de musculation,",
                    "découvrir la musculation dans un cadre encadré,",
                    "tonifier votre corps tout en brûlant des calories,",
                    "profiter de l'effet motivant du groupe,",
                    "compléter un cardio par du travail de force.",
                ]}
                equipmentTitle="Une salle équipée pour le Pump"
                equipmentParagraph1={
                    <>
                        Notre salle de cours collectifs est
                        équipée de barres olympiques et de disques de
                        musculation calibrés Pannata{" "}
                        (made in Italy), pour que chaque pratiquant ajuste sa
                        charge en fonction de l&apos;exercice et de son
                        niveau.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Système sonore professionnel, miroirs grand format
                        pour vérifier les placements, plancher antidérapant —{" "}
                        <em>tout est pensé pour la pratique en groupe</em>.
                        Notre coach diplômée corrige et adapte les
                        mouvements.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. Accessible en{" "}
                        15 minutes depuis Nîmes, et en moins
                        de 20 minutes depuis Calvisson, Sommières, Quissac,
                        Vergèze et Caveirac. Le seul vrai cours de Body Pump
                        du bassin nîmois.
                    </>
                }
                faq={[
                    {
                        question: "Le Body Pump fait-il prendre du muscle ?",
                        answer: (
                            <p>
                                Oui, surtout pour les débutants. Le travail
                                régulier avec charges (même légères au début)
                                stimule la croissance musculaire et tonifie
                                progressivement. Pour de l&apos;hypertrophie
                                pure, compléter avec de la musculation
                                classique.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle charge choisir au début ?",
                        answer: (
                            <p>
                                Commencez léger&nbsp;: 2 à 5
                                kg sur la barre suffisent pour la première
                                séance, le temps d&apos;apprendre les
                                mouvements. La coach vous conseillera des
                                progressions adaptées.
                            </p>
                        ),
                    },
                    {
                        question: "Body Pump vs musculation classique ?",
                        answer: (
                            <p>
                                Le Body Pump travaille en <em>endurance
                                musculaire</em> (séries longues, charges
                                modérées). La musculation classique permet plus
                                de spécialisation et de surcharge progressive.
                                Les deux sont complémentaires.
                            </p>
                        ),
                    },
                    {
                        question: "Combien de fois par semaine ?",
                        answer: (
                            <p>
                                2 à 3 séances par semaine, en alternant avec un
                                jour de récupération ou un cours cardio (RPM,
                                Zumba). Le corps a besoin de temps pour
                                reconstruire les muscles entre deux séances de
                                renforcement.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il un équipement particulier ?",
                        answer: (
                            <p>
                                Tenue de sport, chaussures adaptées (éviter les
                                semelles plates type Converse), serviette et
                                bouteille d&apos;eau. Tout le reste (barre,
                                disques, tapis) est fourni par la salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
