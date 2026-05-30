import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours d'aquagym à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours d'aquagym en bassin intérieur chauffé près de Nîmes. Renforcement, cardio et bien-être sans impact pour les articulations. Tous niveaux.",
    alternates: { canonical: "https://www.hallb.fr/cours/aquagym" },
    openGraph: {
        title: "Cours d'aquagym à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Aquagym en bassin chauffé chez HALL B. Cardio, tonification et bien-être, sans impact pour les articulations.",
        url: "https://www.hallb.fr/cours/aquagym",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-aquagym"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours d'aquagym",
                        "description":
                            "Cours collectif d'aquagym en bassin intérieur chauffé. Renforcement musculaire, cardio et bien-être sans impact articulaire.",
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
                        "exerciseType": "Aquatic exercise",
                        "url": "https://www.hallb.fr/cours/aquagym",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-aquagym"
                items={[
                    {
                        question: "Faut-il savoir nager pour faire de l'aquagym ?",
                        answer: "Non. Les cours se déroulent dans la zone du bassin où l'on a pied. Aucune compétence en natation n'est requise pour participer.",
                    },
                    {
                        question: "L'aquagym fait-elle maigrir ?",
                        answer: "Oui, l'aquagym brûle 400 à 500 kcal par séance grâce à la résistance de l'eau. Combinée à une alimentation équilibrée, elle participe efficacement à une perte de poids progressive.",
                    },
                    {
                        question: "L'aquagym est-elle adaptée aux seniors ?",
                        answer: "Particulièrement, oui. L'absence d'impact protège les articulations. C'est l'une des activités les plus recommandées pour rester en forme après 60 ans, ou en cas d'arthrose, de problème de dos ou de surpoids.",
                    },
                    {
                        question: "Le bassin est-il chauffé ?",
                        answer: "Oui, notre bassin intérieur est chauffé en permanence à une température confortable, idéale pour la pratique sportive sans frissons.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Maillot de bain, bonnet de bain (obligatoire), serviette et tongs. Les frites, haltères aquatiques et autres accessoires sont fournis par la salle.",
                    },
                    {
                        question: "Y a-t-il des cours pour femmes enceintes ?",
                        answer: "Oui, des créneaux peuvent être adaptés. L'aquagym prénatale est particulièrement recommandée par les sage-femmes. Informez la coach avant le cours.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_aquagym"
                eyebrow="Bassin intérieur chauffé"
                h1Top="Cours d'aquagym"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        Renforcement, cardio et bien-être en{" "}
                        <strong>bassin intérieur chauffé</strong>. Le sport
                        sans impact pour les articulations, idéal pour tous
                        — du débutant au senior.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "400 kcal", label: "Brûlées en moyenne" },
                    { value: "0 impact", label: "Articulations protégées" },
                    { value: "Tous niveaux", label: "Aucune nage requise" },
                ]}
                whatTitle="L'aquagym, c'est quoi ?"
                whatParagraph1={
                    <>
                        L&apos;<strong>aquagym</strong> est une activité
                        physique pratiquée en milieu aquatique, dans la zone du
                        bassin où l&apos;on a pied. La <em>résistance
                        naturelle de l&apos;eau</em> remplace les charges&nbsp;:
                        chaque mouvement devient un travail musculaire complet.
                    </>
                }
                whatParagraph2={
                    <>
                        L&apos;eau supporte 90% du poids du corps&nbsp;: aucune
                        pression sur les articulations, les tendons ou la
                        colonne vertébrale. C&apos;est l&apos;une des seules
                        activités qui combine <strong>cardio, renforcement
                        musculaire et bien-être</strong> sans aucun risque de
                        traumatisme.
                    </>
                }
                benefitsTitle="6 raisons d'essayer l'aquagym"
                benefits={[
                    {
                        iconName: "Heart",
                        title: "Articulations protégées",
                        text: "Aucun impact. Idéal en cas d'arthrose, mal de dos, surpoids ou pour les seniors.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses efficace",
                        text: "La résistance de l'eau fait travailler tous les muscles. 400-500 kcal par séance.",
                    },
                    {
                        iconName: "Activity",
                        title: "Renforcement musculaire",
                        text: "Bras, jambes, fessiers, sangle abdominale — travail complet du corps.",
                    },
                    {
                        iconName: "Wind",
                        title: "Effet drainant",
                        text: "L'eau exerce un massage naturel qui améliore la circulation et lutte contre la rétention.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Effet bien-être",
                        text: "Sortir d'une séance dans l'eau chaude apaise corps et esprit. Anti-stress immédiat.",
                    },
                    {
                        iconName: "Users",
                        title: "Convivialité",
                        text: "Cours en groupe, ambiance bienveillante. Le rendez-vous social de la semaine.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement dans l'eau",
                        text: "Mouvements doux pour préparer le corps à l'effort et s'adapter à la température.",
                    },
                    {
                        n: "02",
                        title: "Travail cardio",
                        text: "Marche aquatique, running, déplacements latéraux — pour activer le système cardio-vasculaire.",
                    },
                    {
                        n: "03",
                        title: "Renforcement bras et épaules",
                        text: "Avec frites ou haltères aquatiques, travail des bras, épaules et dos.",
                    },
                    {
                        n: "04",
                        title: "Renforcement jambes et fessiers",
                        text: "Mouvements de cuisses, fessiers, mollets, en utilisant la résistance de l'eau.",
                    },
                    {
                        n: "05",
                        title: "Gainage et abdos",
                        text: "Exercices ciblés sur la sangle abdominale et le plancher pelvien.",
                    },
                    {
                        n: "06",
                        title: "Étirements & relaxation",
                        text: "Retour au calme dans l'eau, étirements et relâchement musculaire.",
                    },
                ]}
                audienceIntro={
                    <>
                        L&apos;aquagym est <strong>l&apos;une des activités
                        les plus accessibles</strong>. Particulièrement
                        adaptée si vous&nbsp;:
                    </>
                }
                audienceBullets={[
                    "souffrez d'arthrose, de douleurs articulaires ou de mal de dos,",
                    "êtes en surpoids et cherchez une activité sans impact,",
                    "êtes senior et voulez rester en forme en douceur,",
                    "êtes enceinte et cherchez une activité physique adaptée,",
                    "voulez vous remettre au sport progressivement,",
                    "cherchez un complément doux à une activité plus intense.",
                ]}
                equipmentTitle="Un bassin intérieur chauffé"
                equipmentParagraph1={
                    <>
                        Notre bassin intérieur est{" "}
                        <em>chauffé en permanence</em> à une température
                        confortable. La luminosité naturelle traverse les
                        baies vitrées et crée une ambiance apaisante,
                        idéale pour la pratique sportive comme pour le
                        bien-être.
                    </>
                }
                equipmentParagraph2={
                    <>
                        <strong>Frites, haltères aquatiques, ceintures
                        flottantes</strong> et autres accessoires sont
                        fournis par la salle. Notre coach aquagym diplômée
                        adapte les exercices à votre niveau et veille à la
                        sécurité de chacun.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. 15 minutes depuis Nîmes, et
                        moins de 20 minutes depuis Calvisson, Sommières,
                        Quissac, Vergèze et Caveirac. L&apos;un des rares
                        bassins privés du bassin nîmois proposant de
                        l&apos;aquagym régulière.
                    </>
                }
                faq={[
                    {
                        question: "Faut-il savoir nager ?",
                        answer: (
                            <p>
                                Non. Les cours se déroulent dans la zone où
                                l&apos;on a pied. <strong>Aucune
                                compétence en natation n&apos;est
                                requise</strong>.
                            </p>
                        ),
                    },
                    {
                        question: "L'aquagym fait-elle maigrir ?",
                        answer: (
                            <p>
                                Oui, l&apos;aquagym brûle 400 à 500 kcal par
                                séance grâce à la résistance de l&apos;eau.
                                Combinée à une alimentation équilibrée, elle
                                participe efficacement à une perte de poids
                                progressive.
                            </p>
                        ),
                    },
                    {
                        question: "L'aquagym est-elle adaptée aux seniors ?",
                        answer: (
                            <p>
                                Particulièrement, oui.
                                L&apos;absence d&apos;impact protège les
                                articulations. C&apos;est l&apos;une des
                                activités les plus recommandées pour rester en
                                forme après 60 ans, ou en cas d&apos;arthrose,
                                de problème de dos ou de surpoids.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                <strong>Maillot de bain, bonnet de bain
                                (obligatoire), serviette et tongs</strong>.
                                Les frites, haltères aquatiques et autres
                                accessoires sont fournis par la salle.
                            </p>
                        ),
                    },
                    {
                        question: "Y a-t-il des cours pour femmes enceintes ?",
                        answer: (
                            <p>
                                Oui, des créneaux peuvent être adaptés.
                                L&apos;aquagym prénatale est particulièrement
                                recommandée par les sage-femmes. Informez la
                                coach avant le cours.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
