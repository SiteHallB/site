import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours de Step à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours collectif de Step près de Nîmes chez HALL B. Cardio chorégraphié sur step, jusqu'à 500 kcal en 45 min. Coordination et endurance.",
    alternates: { canonical: "https://www.hallb.fr/cours/step" },
    openGraph: {
        title: "Cours de Step à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Cardio chorégraphié sur step. Effet brûle-graisses + coordination + ambiance de groupe. 45 minutes intenses.",
        url: "https://www.hallb.fr/cours/step",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-step"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours de Step",
                        "description":
                            "Cours collectif de cardio chorégraphié sur step (marche surélevée). Travail de coordination, d'endurance et brûle-graisses.",
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
                        "exerciseType": "Aerobic step",
                        "url": "https://www.hallb.fr/cours/step",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-step"
                items={[
                    {
                        question: "Le Step est-il difficile à apprendre ?",
                        answer: "Au début, oui — la coordination demande un peu de pratique. Mais la coach décompose toujours les chorégraphies. Au bout de 3 ou 4 séances, les pas de base sont acquis.",
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: "Entre 400 et 500 kcal pour une séance de 45 minutes. C'est l'un des cours les plus efficaces côté combustion calorique, à égalité avec le RPM et la Zumba.",
                    },
                    {
                        question: "Le Step abîme-t-il les genoux ?",
                        answer: "Non, à condition de respecter la technique : pied à plat sur le step, genou aligné. La coach corrige les placements en permanence. Personnes avec pathologie articulaire : consultez votre médecin avant.",
                    },
                    {
                        question: "Faut-il déjà savoir danser ?",
                        answer: "Aucun pré-requis. Le Step est différent de la danse : les pas sont codifiés et progressifs. Si vous savez compter jusqu'à 8, vous savez faire du Step.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Tenue de sport, baskets avec bon amorti (running ou cross-training), serviette et eau. Le step est fourni par la salle.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_step"
                eyebrow="Cours collectif"
                h1Top="Cours de Step"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Cardio chorégraphié sur step (marche surélevée).
                        Brûle-graisses, coordination et ambiance musicale —
                        jusqu&apos;à <strong>500 kcal en 45 min</strong>.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "500 kcal", label: "Brûlées en moyenne" },
                    { value: "Coordination", label: "Effet cerveau" },
                    { value: "Tous niveaux", label: "Hauteur du step ajustable" },
                ]}
                whatTitle="Le Step, c'est quoi ?"
                whatParagraph1={
                    <>
                        Inventé dans les années 1980, le <strong>Step</strong>{" "}
                        consiste à enchaîner des chorégraphies sur une{" "}
                        marche surélevée (le step), au
                        rythme d&apos;une musique entraînante. Mouvements de
                        montée-descente, sauts, déplacements latéraux,
                        chorégraphies de plus en plus complexes.
                    </>
                }
                whatParagraph2={
                    <>
                        C&apos;est l&apos;un des cours les plus efficaces pour{" "}
                        brûler des calories tout en{" "}
                        <em>développant la coordination</em>. Le cerveau
                        travaille autant que les jambes pour mémoriser les
                        chorégraphies. Effet anti-âge cognitif documenté.
                    </>
                }
                benefitsTitle="6 raisons de faire du Step"
                benefits={[
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "Jusqu'à 500 kcal en 45 min, avec un effet 'afterburn' qui prolonge la combustion.",
                    },
                    {
                        iconName: "Heart",
                        title: "Cardio renforcé",
                        text: "Endurance et capacités cardio-vasculaires en nette progression dès 4 semaines.",
                    },
                    {
                        iconName: "Brain",
                        title: "Coordination & mémoire",
                        text: "Mémoriser les chorégraphies stimule les fonctions cognitives — vrai entraînement cérébral.",
                    },
                    {
                        iconName: "Activity",
                        title: "Cuisses et fessiers",
                        text: "Les montées-descentes ciblent quadriceps, ischios et fessiers en profondeur.",
                    },
                    {
                        iconName: "Music",
                        title: "Rythmé par la musique",
                        text: "Une chorégraphie = une chanson. Vous ne voyez pas le temps passer.",
                    },
                    {
                        iconName: "Users",
                        title: "Effet de groupe",
                        text: "Apprendre les chorégraphies ensemble crée une vraie dynamique collective.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement",
                        text: "Mouvements simples sur place pour activer le corps (5 min).",
                    },
                    {
                        n: "02",
                        title: "Apprentissage des pas",
                        text: "La coach décompose les pas de base — basic step, V-step, knee-up...",
                    },
                    {
                        n: "03",
                        title: "Construction de la chorégraphie",
                        text: "Assemblage progressif des pas en chorégraphies de 32 temps.",
                    },
                    {
                        n: "04",
                        title: "Intensification",
                        text: "Chorégraphies enchaînées, ajout de bras, de sauts, de variantes plus rapides.",
                    },
                    {
                        n: "05",
                        title: "Retour au calme",
                        text: "Marche sur step ralentie, étirements et relâchement musculaire.",
                    },
                ]}
                audienceIntro={
                    <>
                        Le Step convient à <strong>toute personne qui aime
                        bouger en musique</strong>. Particulièrement adapté
                        si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "brûler des calories dans un cadre fun,",
                    "améliorer votre coordination et votre agilité,",
                    "tonifier le bas du corps tout en faisant du cardio,",
                    "développer votre mémoire motrice,",
                    "rejoindre un cours convivial avec des chorégraphies progressives.",
                ]}
                equipmentTitle="Une salle équipée et un step réglable"
                equipmentParagraph1={
                    <>
                        Le Step se pratique dans notre{" "}
                        salle de cours collectifs, équipée de
                        steps professionnels <em>à hauteur ajustable</em> (1,
                        2 ou 3 niveaux) pour adapter l&apos;intensité à votre
                        condition physique.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Système sonore professionnel, miroirs grand format
                        pour vérifier les placements, plancher amorti pour
                        protéger les articulations. Notre coach décompose
                        toujours les chorégraphies pour que les débutants
                        puissent suivre.
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
                        question: "Le Step est-il difficile à apprendre ?",
                        answer: (
                            <p>
                                Au début, oui — la coordination demande un peu
                                de pratique. Mais la coach décompose toujours
                                les chorégraphies. Au bout de 3 ou 4 séances,
                                les pas de base sont acquis.
                            </p>
                        ),
                    },
                    {
                        question: "Combien de calories brûle-t-on ?",
                        answer: (
                            <p>
                                Entre 400 et 500 kcal pour une séance de 55
                                minutes. C&apos;est l&apos;un des cours les
                                plus efficaces côté combustion calorique, à
                                égalité avec le RPM et la Zumba.
                            </p>
                        ),
                    },
                    {
                        question: "Le Step abîme-t-il les genoux ?",
                        answer: (
                            <p>
                                <strong>Non, à condition de respecter la
                                technique</strong>&nbsp;: pied à plat sur le
                                step, genou aligné. La coach corrige les
                                placements en permanence. Personnes avec
                                pathologie articulaire&nbsp;: consultez votre
                                médecin avant.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il déjà savoir danser ?",
                        answer: (
                            <p>
                                Aucun pré-requis. Le Step est différent de la
                                danse&nbsp;: les pas sont codifiés et
                                progressifs. Si vous savez compter
                                jusqu&apos;à 8, vous savez faire du Step.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Tenue de sport, baskets avec bon amorti
                                (running ou cross-training), serviette et
                                eau. Le step est fourni par la salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
