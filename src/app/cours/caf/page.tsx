import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours CAF (Cuisses Abdos Fessiers) à Saint Dionisy (Nîmes) | HALL B",
    description:
        "Cours collectif CAF près de Nîmes : Cuisses, Abdos, Fessiers. Renforcement ciblé du bas du corps, 45 minutes intenses chez HALL B Saint Dionisy.",
    alternates: { canonical: "https://www.hallb.fr/cours/caf" },
    openGraph: {
        title: "Cours CAF (Cuisses Abdos Fessiers) à Saint Dionisy | HALL B",
        description:
            "Le cours qui ne ment pas : 45 minutes ciblées sur cuisses, abdos et fessiers. Résultats visibles en 6 semaines.",
        url: "https://www.hallb.fr/cours/caf",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-caf"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours CAF — Cuisses Abdos Fessiers",
                        "description":
                            "Cours collectif de renforcement musculaire ciblé du bas du corps. 45 minutes d'exercices intenses pour cuisses, abdos et fessiers.",
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
                        "url": "https://www.hallb.fr/cours/caf",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-caf"
                items={[
                    {
                        question: "Le CAF fait-il maigrir ?",
                        answer: "Le CAF tonifie et raffermit, mais ne brûle pas autant de calories qu'un cours cardio pur (RPM, Zumba). Pour une perte de poids efficace, combiner CAF + cardio + une alimentation équilibrée.",
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: "2 à 3 séances par semaine constituent un rythme idéal. Les muscles ont besoin de 48h pour récupérer entre deux séances de renforcement intensif.",
                    },
                    {
                        question: "Risque-t-on de prendre du volume ?",
                        answer: "Non, le CAF se pratique en endurance musculaire (séries longues, charges légères). L'effet est tonifiant, pas hypertrophiant. Pour prendre du volume, il faudrait de la musculation lourde.",
                    },
                    {
                        question: "Faut-il avoir un bon niveau au départ ?",
                        answer: "Non, le cours est adapté à tous les niveaux. La coach propose des variantes plus faciles pour les débutants et plus exigeantes pour les confirmés. Chacun avance à son rythme.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Tenue souple, baskets de salle, serviette, bouteille d'eau. Le tapis, les élastiques et accessoires sont fournis par la salle.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_caf"
                eyebrow="Cours collectif"
                h1Top="Cours CAF"
                h1Bottom="Cuisses · Abdos · Fessiers"
                heroLead={
                    <>
                        Le cours qui ne ment pas. 45 minutes de renforcement
                        ciblé sur le <strong>bas du corps et la sangle
                        abdominale</strong>, dans une salle dédiée chez HALL
                        B à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "350 kcal", label: "Brûlées en moyenne" },
                    { value: "6 sem", label: "Pour des résultats visibles" },
                    { value: "Tous niveaux", label: "Intensité adaptable" },
                ]}
                whatTitle="Le CAF, c'est quoi ?"
                whatParagraph1={
                    <>
                        CAF est l&apos;acronyme de{" "}
                        <strong>Cuisses, Abdos, Fessiers</strong>. C&apos;est
                        un cours collectif <em>spécialisé dans le renforcement
                        du bas du corps</em>, qui enchaîne sans temps mort des
                        exercices ciblés sur ces trois zones musculaires.
                    </>
                }
                whatParagraph2={
                    <>
                        Squats, fentes, ponts fessiers, planches, crunchs,
                        relevés de jambes... La séance alterne phases
                        d&apos;intensité et récupérations courtes. Travail
                        principalement au poids du corps{" "}
                        complété parfois d&apos;élastiques ou de petites
                        charges. Idéal pour <strong>raffermir, tonifier et
                        affiner</strong>.
                    </>
                }
                benefitsTitle="6 raisons de faire du CAF"
                benefits={[
                    {
                        iconName: "Flame",
                        title: "Fessiers galbés",
                        text: "L'exercice n°1 pour des fessiers fermes et toniques en quelques semaines.",
                    },
                    {
                        iconName: "Activity",
                        title: "Cuisses affinées",
                        text: "Travail des quadriceps, ischio-jambiers et adducteurs pour des jambes dessinées.",
                    },
                    {
                        iconName: "Dumbbell",
                        title: "Sangle abdominale",
                        text: "Crunchs, planches, gainage — pour des abdos visibles et fonctionnels.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio en bonus",
                        text: "Le rythme soutenu sollicite aussi votre système cardio-vasculaire.",
                    },
                    {
                        iconName: "Timer",
                        title: "Efficace en 45 min",
                        text: "Format court et intensif — parfait pour la pause méridienne.",
                    },
                    {
                        iconName: "Users",
                        title: "Motivation collective",
                        text: "L'effet groupe vous pousse à tenir les séries jusqu'à la dernière répétition.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement dynamique",
                        text: "Mobilisation articulaire et activation des chaînes musculaires (5 min).",
                    },
                    {
                        n: "02",
                        title: "Cuisses",
                        text: "Squats, fentes, montées de genoux — quadriceps et ischio-jambiers.",
                    },
                    {
                        n: "03",
                        title: "Fessiers",
                        text: "Ponts fessiers, kickbacks, fire hydrants — focus grand et moyen fessier.",
                    },
                    {
                        n: "04",
                        title: "Abdos",
                        text: "Crunchs, relevés de jambes, planches, gainage latéral.",
                    },
                    {
                        n: "05",
                        title: "Étirements",
                        text: "Étirements profonds des cuisses, fessiers et lombaires.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le CAF s&apos;adresse à <strong>toutes les personnes
                        qui veulent tonifier le bas du corps</strong>, sans
                        prendre de masse musculaire. Particulièrement adapté
                        si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "raffermir cuisses, fessiers et abdominaux,",
                    "perdre la culotte de cheval ou les capitons,",
                    "améliorer votre posture et votre stabilité,",
                    "prévenir les douleurs lombaires liées à un manque de gainage,",
                    "compléter une pratique cardio par du renforcement.",
                ]}
                equipmentTitle="Une salle dédiée au renforcement"
                equipmentParagraph1={
                    <>
                        Le CAF se pratique dans notre{" "}
                        salle de cours collectifs, équipée de
                        tapis épais, élastiques de musculation, mini-bandes,
                        steps et petites charges pour intensifier les
                        exercices.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach diplômée veille à la <em>qualité des
                        placements</em>, ajuste l&apos;intensité pour chacun
                        et propose des variantes plus douces ou plus
                        difficiles selon votre niveau.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. Accessible en{" "}
                        15 minutes depuis Nîmes, et en moins
                        de 20 minutes depuis Calvisson, Sommières, Quissac,
                        Vergèze et Caveirac.
                    </>
                }
                faq={[
                    {
                        question: "Le CAF fait-il maigrir ?",
                        answer: (
                            <p>
                                Le CAF tonifie et raffermit,
                                mais ne brûle pas autant de calories qu&apos;un
                                cours cardio pur (RPM, Zumba). Pour une perte
                                de poids efficace, combiner CAF + cardio + une
                                alimentation équilibrée.
                            </p>
                        ),
                    },
                    {
                        question: "À quelle fréquence pratiquer ?",
                        answer: (
                            <p>
                                2 à 3 séances par semaine constituent un rythme
                                idéal. Les muscles ont besoin de 48h pour
                                récupérer entre deux séances de renforcement
                                intensif.
                            </p>
                        ),
                    },
                    {
                        question: "Risque-t-on de prendre du volume ?",
                        answer: (
                            <p>
                                Non, le CAF se pratique en{" "}
                                <em>endurance musculaire</em> (séries longues,
                                charges légères). L&apos;effet est tonifiant,
                                pas hypertrophiant. Pour prendre du volume, il
                                faudrait de la musculation lourde.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il avoir un bon niveau au départ ?",
                        answer: (
                            <p>
                                Non, le cours est <strong>adapté à tous les
                                niveaux</strong>. La coach propose des
                                variantes plus faciles pour les débutants et
                                plus exigeantes pour les confirmés. Chacun
                                avance à son rythme.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Tenue souple, baskets de salle, serviette,
                                bouteille d&apos;eau. Le tapis, les élastiques
                                et accessoires sont fournis par la salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
