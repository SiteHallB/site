import { Metadata } from "next";
import Script from "next/script";

import CoursTemplate from "@/components/cours/cours-template";
import FAQSchema from "@/components/cours/faq-schema";

export const metadata: Metadata = {
    title: "Salle de musculation à Saint Dionisy (Nîmes, Gard) | HALL B",
    description:
        "La plus grande salle de musculation du Gard. Plateau Panatta & Technogym, poids calibrés, 2 400 m² à Saint Dionisy (Nîmes). Essai gratuit.",
    alternates: { canonical: "https://www.hallb.fr/cours/musculation" },
    openGraph: {
        title: "Salle de musculation à Saint Dionisy (Nîmes, Gard) | HALL B",
        description:
            "Plateau Panatta & Technogym, poids calibrés compétition, 2 400 m². La salle de musculation référence du bassin nîmois.",
        url: "https://www.hallb.fr/cours/musculation",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="schema-musculation"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ExerciseAction",
                        "name": "Musculation à HALL B",
                        "description":
                            "Plateau de musculation 2 400 m² équipé Panatta et Technogym, accès libre 7j/7 de 6h à 23h.",
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
                        "url": "https://www.hallb.fr/cours/musculation",
                    }),
                }}
            />
            <FAQSchema
                id="schema-faq-musculation"
                items={[
                    {
                        question: "Quels sont les horaires d'accès à la salle de musculation ?",
                        answer: "Le plateau de musculation est accessible 7 jours sur 7, de 6h à 23h, pour tous les adhérents — sans réservation.",
                    },
                    {
                        question: "Quel matériel propose HALL B ?",
                        answer: "Plateau musculation Panatta (made in Italy), cardio connecté Technogym, poids calibrés et certifiés pour la compétition, sacs de frappe, espace cross-training, machines guidées et charges libres.",
                    },
                    {
                        question: "Y a-t-il des coachs sur le plateau ?",
                        answer: "Oui, des coachs diplômés sont présents pour vous accompagner, corriger votre technique et vous proposer des programmes adaptés à vos objectifs (prise de masse, perte de poids, performance).",
                    },
                    {
                        question: "Combien coûte un abonnement musculation ?",
                        answer: "L'accès libre au plateau est inclus dans la formule Classic (40€/mois). La formule Boost (55€/mois) ajoute les cours collectifs et les small groups. Détails sur la page Tarifs.",
                    },
                    {
                        question: "Faut-il prendre rendez-vous pour s'inscrire ?",
                        answer: "Non, l'inscription se fait en ligne ou directement sur place. Vous pouvez aussi profiter d'une séance d'essai gratuite pour visiter la salle avant de vous engager.",
                    },
                    {
                        question: "Y a-t-il un parking gratuit ?",
                        answer: "Oui, un grand parking gratuit est disponible directement devant la salle, à Saint Dionisy.",
                    },
                ]}
            />
            <CoursTemplate
                imageKey="cours_musculation"
                secondaryCta={{ label: "Je m'inscris", path: "/tarifs" }}
                eyebrow="Plateau 2 400 m²"
                h1Top="Salle de musculation"
                h1Bottom="à Saint Dionisy"
                heroLead={
                    <>
                        La plus grande salle de musculation du Gard.
                        Équipement <strong>Panatta & Technogym</strong>, poids
                        calibrés compétition, accès libre 7j/7 de 6h à 23h. À
                        15 minutes de Nîmes.
                    </>
                }
                stats={[
                    { value: "2 400 m²", label: "Surface totale" },
                    { value: "7j/7", label: "Accès libre 6h-23h" },
                    { value: "Panatta", label: "Machines Made in Italy" },
                    { value: "Tous niveaux", label: "Débutant à compétiteur" },
                ]}
                whatTitle="La salle de muscu HALL B"
                whatParagraph1={
                    <>
                        Notre plateau de musculation s&apos;étend sur{" "}
                        <strong>2 400 m²</strong> et regroupe l&apos;ensemble
                        des outils nécessaires pour un entraînement complet :
                        charges libres, machines guidées, espace cross-training,
                        zone cardio, racks à squat et bench press, sacs de
                        frappe.
                    </>
                }
                whatParagraph2={
                    <>
                        L&apos;équipement est signé Panatta{" "}
                        (Italie) pour les machines de musculation et{" "}
                        Technogym pour le cardio connecté.
                        Les poids sont <em>calibrés et certifiés pour la
                        compétition</em>. Bref, l&apos;élite de
                        l&apos;équipement, accessible à tous — du néophyte
                        au compétiteur.
                    </>
                }
                benefitsTitle="6 bonnes raisons de venir s'entraîner ici"
                benefits={[
                    {
                        iconName: "Dumbbell",
                        title: "Matériel premium",
                        text: "Machines Panatta et cardio Technogym — le top de l'équipement pro.",
                    },
                    {
                        iconName: "Timer",
                        title: "7j/7 de 6h à 23h",
                        text: "Accès libre tous les jours, matin tôt comme tard le soir. À votre rythme.",
                    },
                    {
                        iconName: "Users",
                        title: "Coachs présents",
                        text: "Diplômés et disponibles pour conseiller, corriger les placements, construire un programme.",
                    },
                    {
                        iconName: "Sparkles",
                        title: "Lumière naturelle",
                        text: "Grandes baies vitrées, hauteur sous plafond importante — on respire en s'entraînant.",
                    },
                    {
                        iconName: "Flame",
                        title: "Zone cross-training",
                        text: "Espace dédié avec barres olympiques, kettlebells, plateformes pour le travail fonctionnel.",
                    },
                    {
                        iconName: "Heart",
                        title: "Hygiène irréprochable",
                        text: "Salle nettoyée plusieurs fois par jour. Lingettes désinfectantes à disposition partout.",
                    },
                ]}
                steps={[
                    {
                        n: "01",
                        title: "Visite & séance d'essai",
                        text: "Vous découvrez la salle gratuitement avec un coach. Visite, conseils, premier essai sur les machines.",
                    },
                    {
                        n: "02",
                        title: "Inscription en 5 min",
                        text: "Choisissez votre formule (Classic ou Boost), inscription rapide en ligne ou sur place.",
                    },
                    {
                        n: "03",
                        title: "Programme personnalisé",
                        text: "Sur demande, nos coachs établissent un programme adapté à vos objectifs.",
                    },
                    {
                        n: "04",
                        title: "Entraînement en autonomie",
                        text: "Accès libre 7j/7, à votre rythme. Les coachs restent disponibles pour conseils ponctuels.",
                    },
                    {
                        n: "05",
                        title: "Suivi & progression",
                        text: "Bilans réguliers possibles avec le coach pour ajuster le programme et progresser durablement.",
                    },
                ]}
                audienceIntro={
                    <>
                        Notre salle de musculation s&apos;adresse à{" "}
                        tous les profils. Particulièrement
                        adaptée si vous souhaitez&nbsp;:
                    </>
                }
                audienceBullets={[
                    "vous remettre au sport dans un cadre encadré et bienveillant,",
                    "construire une masse musculaire (prise de masse, hypertrophie),",
                    "perdre du poids en combinant cardio et renforcement,",
                    "préparer une compétition (force, powerlifting, bodybuilding),",
                    "améliorer votre condition physique générale au quotidien,",
                    "compléter une pratique sportive externe (running, vélo, sports collectifs).",
                ]}
                equipmentTitle="L'équipement à votre disposition"
                equipmentParagraph1={
                    <>
                        Plateau musculation avec une vaste gamme de{" "}
                        machines guidées Panatta{" "}
                        (développé couché, squat, presse à cuisses, leg
                        extension, biceps, triceps...) et un large espace
                        charges libres avec barres olympiques, racks, bancs.
                    </>
                }
                equipmentParagraph2={
                    <>
                        Zone cardio Technogym (tapis de course, vélos
                        elliptiques, rameurs, vélos cardio), espace
                        cross-training avec sacs de frappe et kettlebells.
                        L&apos;ensemble en lumière naturelle, avec une
                        hauteur sous plafond généreuse — <em>une vraie salle
                        d&apos;entraînement, pas un placard</em>.
                    </>
                }
                localText={
                    <>
                        HALL B est situé à Saint Dionisy, en
                        Vaunage. 15 minutes depuis Nîmes, et
                        moins de 20 minutes depuis Calvisson, Sommières,
                        Quissac, Vergèze et Caveirac. Parking gratuit
                        directement devant la salle. Pour une vraie salle de
                        musculation dans le bassin nîmois.
                    </>
                }
                faq={[
                    {
                        question: "Quels sont les horaires de la salle de musculation ?",
                        answer: (
                            <p>
                                Le plateau est accessible 7 jours sur 7, de{" "}
                                6h à 23h, sans réservation
                                pour les adhérents.
                            </p>
                        ),
                    },
                    {
                        question: "Quel matériel propose HALL B ?",
                        answer: (
                            <p>
                                Plateau musculation Panatta{" "}
                                (made in Italy), cardio connecté{" "}
                                Technogym, poids calibrés
                                certifiés pour la compétition, sacs de frappe,
                                espace cross-training, machines guidées et
                                charges libres.
                            </p>
                        ),
                    },
                    {
                        question: "Y a-t-il des coachs sur le plateau ?",
                        answer: (
                            <p>
                                Oui, des coachs diplômés sont présents pour
                                vous accompagner, corriger votre technique et
                                vous proposer des programmes adaptés à vos
                                objectifs (prise de masse, perte de poids,
                                performance).
                            </p>
                        ),
                    },
                    {
                        question: "Combien coûte un abonnement musculation ?",
                        answer: (
                            <p>
                                L&apos;accès libre au plateau est inclus dans
                                la formule Classic{" "}
                                (40€/mois). La formule Boost{" "}
                                (55€/mois) ajoute les cours collectifs et les
                                small groups.
                            </p>
                        ),
                    },
                    {
                        question: "Y a-t-il un parking gratuit ?",
                        answer: (
                            <p>
                                Oui, un grand parking gratuit est disponible
                                directement devant la salle.
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
}
