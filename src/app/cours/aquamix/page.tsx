import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Cours d'Aqua Mix à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "Cours d'Aqua Mix près de Nîmes chez HALL B : aquagym, aquabike et renforcement réunis dans une séance variée, en bassin chauffé, sans impact. À 15 min de Nîmes.",
    alternates: { canonical: "https://www.hallb.fr/cours/aquamix" },
    openGraph: {
        title: "Cours d'Aqua Mix à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "La séance complète : gym, vélo et renforcement aquatiques réunis. Variée, sans impact, en bassin chauffé à 15 min de Nîmes.",
        url: "https://www.hallb.fr/cours/aquamix",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-course-aquamix"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Cours d'Aqua Mix",
                        "description":
                            "Cours collectif aquatique combinant aquagym, aquabike et renforcement dans une même séance. Sans impact. 45 minutes.",
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
                        "url": "https://www.hallb.fr/cours/aquamix",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-aquamix"
                items={[
                    {
                        question: "Qu'est-ce qui est mélangé dans l'aqua mix ?",
                        answer: "L'aqua mix combine dans une même séance plusieurs disciplines aquatiques : gym tonique (aquagym), vélo immergé (aquabike) et renforcement avec accessoires (aqua power). On change d'atelier régulièrement pour ne jamais s'ennuyer.",
                    },
                    {
                        question: "Faut-il savoir nager ?",
                        answer: "Non, tous les ateliers se déroulent là où vous avez pied. On ne nage jamais : c'est l'option idéale pour découvrir l'ensemble des cours d'aqua en une seule séance.",
                    },
                    {
                        question: "C'est pour qui ?",
                        answer: "Pour tout le monde, et surtout pour ceux qui aiment varier. Cardio, renforcement et tonification sont réunis, sans impact pour les articulations. Parfait si vous hésitez entre les différents cours d'aqua.",
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement, un bonnet peut être demandé. Vélos et accessoires aquatiques sont fournis.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_aquamix"
                eyebrow="Bassin chauffé"
                h1Top="Cours d'Aqua Mix"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        La séance complète&nbsp;:{" "}
                        <strong>gym, vélo et renforcement aquatiques</strong>{" "}
                        réunis dans 45 minutes variées, sans impact. En bassin
                        chauffé chez HALL B, à 15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "45 min", label: "Durée d'une séance" },
                    { value: "3-en-1", label: "Gym, vélo, renfo" },
                    { value: "Sans impact", label: "Articulations préservées" },
                    { value: "Tous niveaux", label: "Aucun pré-requis" },
                ]}
                whatTitle="L'aqua mix, c'est quoi ?"
                whatParagraph1={
                    <>
                        L&apos;<strong>aqua mix</strong> est la séance{" "}
                        <strong>la plus complète</strong> des cours d&apos;aqua :
                        elle combine dans un même cours <em>plusieurs
                        disciplines aquatiques</em> — gym tonique, vélo immergé
                        et renforcement avec accessoires.
                    </>
                }
                whatParagraph2={
                    <>
                        On enchaîne les ateliers&nbsp;: un bloc{" "}
                        <strong>aquagym</strong>, un bloc{" "}
                        <strong>aquabike</strong>, un bloc renforcement façon{" "}
                        <strong>aqua power</strong>. Résultat&nbsp;: une séance{" "}
                        <em>variée et complète</em> qui travaille le cardio,
                        les jambes et tout le corps, sans jamais s&apos;ennuyer.
                    </>
                }
                benefitsTitle="6 raisons d'essayer l'aqua mix"
                benefits={[
                    {
                        iconName: "Sparkles",
                        title: "Le plus complet",
                        text: "Cardio, renforcement et tonification réunis dans une seule séance.",
                    },
                    {
                        iconName: "Activity",
                        title: "Jamais monotone",
                        text: "On change d'atelier régulièrement : le temps passe à toute vitesse.",
                    },
                    {
                        iconName: "Bike",
                        title: "Jambes & cardio",
                        text: "Le bloc aquabike galbe les jambes et fait grimper le souffle.",
                    },
                    {
                        iconName: "Dumbbell",
                        title: "Renforcement",
                        text: "Le bloc aqua power tonifie le haut et le bas du corps avec accessoires.",
                    },
                    {
                        iconName: "Heart",
                        title: "Sans impact",
                        text: "L'eau porte le corps : zéro choc pour les articulations.",
                    },
                    {
                        iconName: "Flame",
                        title: "Brûle-graisses",
                        text: "L'enchaînement des ateliers maintient une dépense calorique élevée.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Échauffement",
                        text: "Mise à l'eau et adaptation à la résistance en douceur.",
                    },
                    {
                        n: "02",
                        title: "Bloc aquagym",
                        text: "Mouvements rythmés debout dans l'eau pour réveiller tout le corps.",
                    },
                    {
                        n: "03",
                        title: "Bloc aquabike",
                        text: "Pédalage immergé : cardio et travail des jambes.",
                    },
                    {
                        n: "04",
                        title: "Bloc renforcement",
                        text: "Haltères mousse et frites pour tonifier bras, jambes et abdos.",
                    },
                    {
                        n: "05",
                        title: "Étirements & relâchement",
                        text: "Retour au calme dans l'eau pour bien récupérer.",
                    },
                ]}
                audienceIntro={
                    <>
                        L&apos;aqua mix est <strong>idéal pour tous</strong>, et
                        particulièrement si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "tout faire en une seule séance (cardio + renfo + tonification),",
                    "varier les plaisirs et ne jamais vous ennuyer,",
                    "découvrir l'ensemble des cours d'aqua,",
                    "travailler tout le corps sans agresser les articulations,",
                    "reprendre une activité complète en douceur.",
                ]}
                equipmentTitle="Un bassin chauffé tout équipé"
                equipmentParagraph1={
                    <>
                        L&apos;aqua mix profite de notre{" "}
                        <strong>bassin intérieur chauffé</strong> et de tout
                        l&apos;équipement aquatique&nbsp;: vélos, haltères en
                        mousse, frites et plaques.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Notre coach aquatique diplômé{" "}
                        <em>compose la séance et adapte l&apos;intensité</em> à
                        chacun. On a toujours pied et on ne nage jamais&nbsp;:
                        c&apos;est l&apos;option idéale pour goûter à tout.
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
                        question: "Qu'est-ce qui est mélangé dans l'aqua mix ?",
                        answer: (
                            <p>
                                Plusieurs disciplines aquatiques dans une même
                                séance : <strong>aquagym</strong> (gym tonique),{" "}
                                <strong>aquabike</strong> (vélo immergé) et
                                renforcement façon <strong>aqua power</strong>.
                                On change d&apos;atelier régulièrement.
                            </p>
                        ),
                    },
                    {
                        question: "Faut-il savoir nager ?",
                        answer: (
                            <p>
                                Non, tous les ateliers se déroulent là où vous
                                avez pied. <strong>On ne nage jamais</strong> :
                                c&apos;est l&apos;option idéale pour découvrir
                                tous les cours d&apos;aqua en une séance.
                            </p>
                        ),
                    },
                    {
                        question: "C'est pour qui ?",
                        answer: (
                            <p>
                                Pour <strong>tout le monde</strong>, et surtout
                                pour ceux qui aiment varier. Cardio,
                                renforcement et tonification réunis, sans impact.
                                Parfait si vous hésitez entre les cours
                                d&apos;aqua.
                            </p>
                        ),
                    },
                    {
                        question: "Quel équipement prévoir ?",
                        answer: (
                            <p>
                                Un maillot de bain, une serviette et une
                                bouteille d&apos;eau. Selon le règlement, un
                                bonnet peut être demandé. Vélos et accessoires
                                sont fournis.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
