import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours d'Aqua Power à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours d'Aqua Power près de Nîmes chez HALL B : renforcement tonique haute intensité en bassin chauffé, avec accessoires, sans impact. Tous niveaux, à 15 min de Nîmes.",
    alternates: { canonical: "https://www.hallb.fr/cours/aquapower" },
    openGraph: {
        title: "Cours d'Aqua Power à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "L'aqua le plus tonique : renforcement haute intensité avec accessoires, dans l'eau. Sans impact, en bassin chauffé à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/aquapower",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-aquapower"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours d'Aqua Power",
                        "description":
                            "Cours collectif aquatique haute intensité avec accessoires de résistance. Renforcement musculaire complet sans impact. 45 minutes.",
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
                        "url": "https://www.hallb.fr/cours/aquapower",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-aquapower"
                items={[
                    {
                        question: "L'aqua power est-il trop intense pour un débutant ?",
                        answer: "Non, car l'intensité vient surtout de la vitesse d'exécution : chacun va à son rythme. Le coach propose des variantes plus douces. C'est plus tonique que l'aquagym, mais toujours sans choc grâce à l'eau.",
                    },
                    {
                        question: "Faut-il savoir nager ?",
                        answer: "Non, les exercices se font là où vous avez pied. On ne nage jamais : on enchaîne des mouvements de renforcement avec la résistance de l'eau et des accessoires.",
                    },
                    {
                        question: "Quelle différence avec l'aquagym ?",
                        answer: "L'aquagym est une gym tonique en douceur. L'aqua power est sa version plus intense et plus musculaire : on utilise davantage d'accessoires (haltères mousse, frites) et un rythme plus soutenu pour renforcer en profondeur.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement, un bonnet peut être demandé. Tous les accessoires aquatiques sont fournis par la salle.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_aquapower"
                eyebrow="Bassin chauffé"
                h1Top="Cours d'Aqua Power"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        L&apos;aqua le plus tonique&nbsp;:{" "}
                        <strong>renforcement haute intensité</strong> avec
                        accessoires, dans l&apos;eau et sans impact. 45 minutes
                        en bassin chauffé chez HALL B, à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "Tonique", label: "Intensité élevée" },
                    { value: "Sans impact", label: "Articulations préservées" },
                    { value: "Corps entier", label: "Renforcement complet" },
                ]}
                whatTitle="L'aqua power, c'est quoi ?"
                whatParagraph1={
                    <>
                        L&apos;<strong>aqua power</strong> est la version{" "}
                        <strong>intensive</strong> des cours d&apos;aqua. On
                        enchaîne des mouvements de <em>renforcement musculaire</em>{" "}
                        dans l&apos;eau, en s&apos;appuyant sur la résistance
                        naturelle de l&apos;eau et sur des accessoires (haltères
                        en mousse, frites, plaques).
                    </>
                }
                whatParagraph2={
                    <>
                        Plus rythmé et plus musculaire que l&apos;aquagym, ce
                        cours sollicite <strong>tout le corps</strong> — bras,
                        épaules, jambes, fessiers et sangle abdominale — pour
                        tonifier en profondeur, le tout <em>sans aucun choc</em>{" "}
                        pour les articulations.
                    </>
                }
                benefitsTitle="6 raisons d'essayer l'aqua power"
                benefits={[
                    {
                        iconName: "Dumbbell",
                        title: "Renforcement complet",
                        text: "Haut et bas du corps sollicités contre la résistance de l'eau et des accessoires.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Le rythme soutenu et l'eau font grimper la dépense calorique.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Tonification",
                        text: "Un travail musculaire qui raffermit la silhouette sans prise de volume.",
                    },
                    {
                        iconName: "Heart",
                        title: "Sans impact",
                        text: "L'eau porte le corps : aucun choc pour le dos, les genoux et les hanches.",
                    },
                    {
                        iconName: "Activity",
                        title: "Cardio en bonus",
                        text: "L'intensité sollicite aussi le système cardio-vasculaire.",
                    },
                    {
                        iconName: "Users",
                        title: "Effet de groupe",
                        text: "L'énergie collective et la musique vous poussent à donner le meilleur.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement dans l'eau",
                        text: "Adaptation à la résistance et mobilisation articulaire en douceur.",
                    },
                    {
                        n: "02",
                        title: "Renforcement haut du corps",
                        text: "Bras, épaules et dos avec haltères mousse et plaques.",
                    },
                    {
                        n: "03",
                        title: "Renforcement bas du corps",
                        text: "Jambes et fessiers : squats, fentes et sauts amortis par l'eau.",
                    },
                    {
                        n: "04",
                        title: "Gainage & abdos",
                        text: "Travail de la sangle abdominale avec frites et déséquilibres contrôlés.",
                    },
                    {
                        n: "05",
                        title: "Étirements & relâchement",
                        text: "Retour au calme et étirements dans l'eau pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        L&apos;aqua power s&apos;adresse à{" "}
                        <strong>tous ceux qui veulent se tonifier dans
                        l&apos;eau</strong>. Particulièrement adapté si vous
                        souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "renforcer et raffermir tout le corps sans matériel à sec,",
                    "brûler des calories avec un cours tonique mais sans impact,",
                    "compléter le cardio (aquabike) par du renforcement,",
                    "retrouver une activité intense après une blessure,",
                    "varier des cours d'aqua plus doux comme l'aquagym.",
                ]}
                equipmentTitle="Accessoires et bassin chauffé"
                equipmentParagraph1={
                    <>
                        L&apos;aqua power se pratique dans notre{" "}
                        <strong>bassin intérieur chauffé</strong>, avec haltères
                        en mousse, frites, plaques et gants aquatiques pour
                        intensifier chaque mouvement.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach aquatique diplômé{" "}
                        <em>ajuste l&apos;intensité à chacun</em> et veille à la
                        bonne exécution. On a toujours pied et on ne nage
                        jamais&nbsp;: l&apos;intensité vient de l&apos;eau, pas
                        de la profondeur.
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
                        question: "C'est trop intense pour un débutant ?",
                        answer: (
                            <p>
                                Non&nbsp;: l&apos;intensité vient surtout de la
                                vitesse d&apos;exécution, et{" "}
                                <strong>chacun va à son rythme</strong>. Le coach
                                propose des variantes plus douces. C&apos;est
                                plus tonique que l&apos;aquagym, mais toujours
                                sans choc.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il savoir nager ?",
                        answer: (
                            <p>
                                Non, les exercices se font là où vous avez pied.{" "}
                                <strong>On ne nage jamais</strong> : on enchaîne
                                des mouvements de renforcement avec la résistance
                                de l&apos;eau et des accessoires.
                            </p>
                        ),
                    },
                    {
                        question: "Quelle différence avec l'aquagym ?",
                        answer: (
                            <p>
                                L&apos;<strong>aquagym</strong> est une gym
                                tonique en douceur. L&apos;
                                <strong>aqua power</strong> en est la version
                                plus intense et plus musculaire : plus
                                d&apos;accessoires et un rythme plus soutenu pour
                                renforcer en profondeur.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Un maillot de bain, une serviette et une
                                bouteille d&apos;eau. Selon le règlement, un
                                bonnet peut être demandé. Tous les accessoires
                                sont fournis par la salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
