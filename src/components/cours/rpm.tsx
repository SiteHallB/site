"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";
import Separator from "@/components/ui/separator";
import { PhoneNumber } from "@/components/ui/contact-widget";
import { useImage } from "@/context/image-context";

import {
    Flame,
    Music,
    Timer,
    Users,
    Heart,
    Bike,
    MapPin,
    Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center text-center px-4">
            <span className="textLeadBig text-accent">{value}</span>
            <span className="textSubH2 text-foreground-subdued mt-1">
                {label}
            </span>
        </div>
    );
}

function Benefit({
    Icon,
    title,
    text,
}: {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
}) {
    return (
        <div className="benefitCard flex flex-col items-start p-6 bg-background-highlight rounded-xl border border-foreground-subdued/10 h-full">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                <Icon className="size-6 text-accent" />
            </div>
            <h3 className="textSubH2 text-foreground-base mb-2">{title}</h3>
            <p className="text-foreground-subdued">{text}</p>
        </div>
    );
}

function Step({
    n,
    title,
    text,
}: {
    n: string;
    title: string;
    text: string;
}) {
    return (
        <div className="stepItem flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full">
            <span className="textLeadBig text-accent shrink-0 leading-none">
                {n}
            </span>
            <div className="flex flex-col">
                <h3 className="textSubH2 text-foreground-base mb-1">
                    {title}
                </h3>
                <p className="text-foreground-subdued">{text}</p>
            </div>
        </div>
    );
}

function FAQItem({
    question,
    answer,
}: {
    question: string;
    answer: React.ReactNode;
}) {
    return (
        <details className="group faqItem bg-background-highlight rounded-xl border border-foreground-subdued/10 overflow-hidden">
            <summary className="cursor-pointer list-none flex flex-row items-center justify-between p-5 hover:bg-background-highlight/70 transition-colors">
                <h3 className="textSubH2 text-foreground-base pr-4">
                    {question}
                </h3>
                <span className="text-accent text-2xl shrink-0 transition-transform group-open:rotate-45">
                    +
                </span>
            </summary>
            <div className="px-5 pb-5 text-foreground-subdued">{answer}</div>
        </details>
    );
}

export default function RPM() {
    const { cours_rpm } = useImage();
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Fade-in hero
            gsap.from(".rpmHeroContent > *", {
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Stats counter
            gsap.from(".statItem", {
                scrollTrigger: {
                    trigger: ".statsRow",
                    start: "top 80%",
                },
                y: 40,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
            });

            // Benefits
            gsap.from(".benefitCard", {
                scrollTrigger: {
                    trigger: ".benefitsGrid",
                    start: "top 75%",
                },
                y: 50,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out",
            });

            // Steps
            gsap.from(".stepItem", {
                scrollTrigger: {
                    trigger: ".stepsList",
                    start: "top 75%",
                },
                x: -40,
                autoAlpha: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
            });

            // FAQ items
            gsap.from(".faqItem", {
                scrollTrigger: {
                    trigger: ".faqList",
                    start: "top 80%",
                },
                y: 30,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
            });
        },
        { scope: container },
    );

    return (
        <main
            ref={container}
            className="relative bg-background-base w-full pt-subMenu"
        >
            {/* ======= HERO ======= */}
            <section className="relative w-full min-h-[80vh] lg:min-h-[90vh] overflow-hidden flex items-end">
                {/* Image de fond */}
                <div className="absolute inset-0">
                    <Image
                        {...cours_rpm}
                        className="object-cover object-center size-full"
                        priority
                    />
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/70 to-background-base/30" />
                    <div className="absolute inset-0 bg-background-base/30" />
                </div>

                {/* Texte */}
                <div className="rpmHeroContent relative z-10 w-full px-content lg:px-contentLg pb-subSection pt-32 flex flex-col items-center text-center space-y-4">
                    <span className="textLeadSmall text-accent tracking-widest">
                        Cours collectif
                    </span>
                    <h1 className="text-foreground-base">
                        Cours de RPM<br />
                        <span className="text-accent">à Saint Dionisy</span>
                    </h1>
                    <p className="text-foreground-subdued max-w-2xl">
                        Le vélo indoor coaché en musique chez HALL B, à
                        15&nbsp;minutes de Nîmes (Gard). Une séance, jusqu&apos;à{" "}
                        <strong>600&nbsp;calories brûlées</strong> en
                        45&nbsp;minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                        <Clickable
                            clickableType={{
                                type: "link",
                                path: "/essai-offert",
                            }}
                            style={{ variant: "page", color: "accent" }}
                            className="min-w-[15rem]"
                        >
                            Séance d&apos;essai offerte
                        </Clickable>
                        <Clickable
                            clickableType={{
                                type: "link",
                                path: "/plannings",
                            }}
                            style={{ variant: "page", color: "primary" }}
                            className="min-w-[15rem]"
                        >
                            Voir les plannings
                        </Clickable>
                    </div>
                </div>
            </section>

            {/* ======= STATS ======= */}
            <section className="w-full bg-background-subdued py-content lg:py-contentLg px-content">
                <div className="statsRow flex flex-row flex-wrap items-center justify-around gap-y-6 max-w-5xl mx-auto">
                    <div className="statItem">
                        <Stat value="45 min" label="Durée d'une séance" />
                    </div>
                    <div className="statItem">
                        <Stat value="600 kcal" label="Brûlées en moyenne" />
                    </div>
                    <div className="statItem">
                        <Stat value="100 %" label="Sans impact" />
                    </div>
                    <div className="statItem">
                        <Stat value="Tous niveaux" label="Débutant à confirmé" />
                    </div>
                </div>
            </section>

            {/* ======= QU'EST-CE QUE LE RPM ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-content lg:gap-contentLg items-center">
                    <div className="w-full lg:w-1/2 aspect-square rounded-xl overflow-hidden">
                        <Image
                            {...cours_rpm}
                            className="object-cover object-center size-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col space-y-content">
                        <h2 className="text-foreground-base">
                            Le RPM, c&apos;est quoi&nbsp;?
                        </h2>
                        <Separator className="!my-2 max-w-20" />
                        <p className="text-foreground-subdued">
                            Le <strong>RPM</strong> — pour{" "}
                            <em>Raw Power in Motion</em> — est un cours
                            collectif de <strong>vélo indoor</strong> créé par
                            Les Mills. Pendant{" "}
                            <strong>45 minutes intenses</strong>, un coach vous
                            guide à travers sprints, montées et phases de
                            récupération, le tout rythmé par une playlist
                            soigneusement chorégraphiée.
                        </p>
                        <p className="text-foreground-subdued">
                            C&apos;est l&apos;un des cours les plus efficaces
                            pour <strong>brûler des calories</strong> et
                            renforcer son endurance, sans aucun impact sur les
                            articulations. Chaque pratiquant règle sa propre
                            résistance&nbsp;: vous adaptez la difficulté à
                            votre niveau tout en profitant de l&apos;énergie
                            collective.
                        </p>
                    </div>
                </div>
            </section>

            {/* ======= BENEFICES ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        Pourquoi essayer
                    </span>
                    <h2 className="text-foreground-base text-center mb-2">
                        6 raisons de se mettre au RPM
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="benefitsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content w-full mt-content">
                        <Benefit
                            Icon={Flame}
                            title="Perte de poids"
                            text="Jusqu'à 600 kcal brûlées par séance grâce à l'effet HIIT du vélo indoor."
                        />
                        <Benefit
                            Icon={Heart}
                            title="Cardio renforcé"
                            text="Vos capacités pulmonaires et votre endurance progressent dès les premières semaines."
                        />
                        <Benefit
                            Icon={Bike}
                            title="Muscles tonifiés"
                            text="Cuisses, fessiers, mollets et gainage travaillent sans impact pour les articulations."
                        />
                        <Benefit
                            Icon={Users}
                            title="Effet de groupe"
                            text="L'énergie collective et la motivation du coach vous poussent à donner le meilleur."
                        />
                        <Benefit
                            Icon={Music}
                            title="Rythmé par la musique"
                            text="Chaque séance suit une chorégraphie musicale précise — la séance passe vite."
                        />
                        <Benefit
                            Icon={Timer}
                            title="Efficace en 45 min"
                            text="Le format court s'intègre facilement à un emploi du temps chargé."
                        />
                    </div>
                </div>
            </section>

            {/* ======= DEROULEMENT ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-4xl mx-auto flex flex-col">
                    <span className="textLeadSmall text-accent tracking-widest text-center mb-2">
                        Étape par étape
                    </span>
                    <h2 className="text-foreground-base text-center">
                        Comment se déroule une séance
                    </h2>
                    <Separator className="!my-4 max-w-20 mx-auto" />

                    <div className="stepsList flex flex-col gap-content lg:gap-contentLg mt-content">
                        <Step
                            n="01"
                            title="Accueil & réglage du vélo"
                            text="Vous arrivez 5 min en avance. Le coach vous aide à ajuster hauteur de selle et guidon."
                        />
                        <Step
                            n="02"
                            title="Échauffement progressif"
                            text="3 à 5 minutes pour préparer le corps, augmenter la fréquence cardiaque en douceur."
                        />
                        <Step
                            n="03"
                            title="Plat à allure soutenue"
                            text="Stabilisation du rythme cardiaque sur une cadence régulière, en groupe."
                        />
                        <Step
                            n="04"
                            title="Montées & sprints"
                            text="Le cœur du cours — résistance augmentée puis explosions courtes de 20 à 60 secondes."
                        />
                        <Step
                            n="05"
                            title="Récupération"
                            text="Phases pour réguler la respiration entre chaque bloc d'effort."
                        />
                        <Step
                            n="06"
                            title="Retour au calme & étirements"
                            text="3 à 5 minutes pour terminer la séance et étirer les jambes."
                        />
                    </div>
                </div>
            </section>

            {/* ======= SALLE DEDIEE ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-content lg:gap-contentLg items-center">
                    <div className="w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden">
                        <Image
                            {...cours_rpm}
                            className="object-cover object-center size-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col space-y-content">
                        <span className="textLeadSmall text-accent tracking-widest">
                            L&apos;équipement
                        </span>
                        <h2 className="text-foreground-base">
                            Une salle entièrement dédiée
                        </h2>
                        <Separator className="!my-2 max-w-20" />
                        <p className="text-foreground-subdued">
                            Le RPM se pratique dans une{" "}
                            <strong>salle dédiée</strong> chez HALL B, équipée
                            de vélos <strong>Technogym Group Cycle</strong>,
                            référence mondiale du cycling collectif. Chaque
                            vélo est équipé d&apos;un écran qui affiche votre
                            cadence et votre puissance en temps réel.
                        </p>
                        <p className="text-foreground-subdued">
                            L&apos;ambiance lumineuse et le système sonore
                            professionnel ont été pensés pour{" "}
                            <em>vous immerger pleinement</em> dans la séance.
                            Une atmosphère qui change tout, par rapport à un
                            cours improvisé.
                        </p>
                    </div>
                </div>
            </section>

            {/* ======= POUR QUI ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        Le bon cours
                    </span>
                    <h2 className="text-foreground-base">À qui s&apos;adresse le RPM&nbsp;?</h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued mt-2">
                        Le RPM est <strong>accessible à tous</strong> grâce à
                        l&apos;auto-régulation de l&apos;intensité. Il est
                        particulièrement adapté si vous cherchez à&nbsp;:
                    </p>
                    <ul className="text-foreground-subdued mt-content space-y-2 text-left max-w-2xl">
                        <li>
                            <strong>•</strong> perdre du poids sans traumatiser
                            vos articulations,
                        </li>
                        <li>
                            <strong>•</strong> améliorer votre cardio pour la
                            course à pied, le trail, le vélo de route,
                        </li>
                        <li>
                            <strong>•</strong> reprendre le sport dans un cadre
                            structuré et motivant,
                        </li>
                        <li>
                            <strong>•</strong> rejoindre une activité dynamique
                            en groupe, conviviale,
                        </li>
                        <li>
                            <strong>•</strong> obtenir un entraînement efficace
                            en 45 minutes seulement.
                        </li>
                    </ul>
                </div>
            </section>

            {/* ======= CTA GRAND FORMAT ======= */}
            <section className="relative w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        {...cours_rpm}
                        className="object-cover object-center size-full"
                    />
                    <div className="absolute inset-0 bg-background-base/80" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-content lg:px-contentLg py-subSection flex flex-col items-center text-center space-y-content">
                    <h2 className="text-foreground-base">
                        Prêt à monter sur le vélo&nbsp;?
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <p className="text-foreground-subdued max-w-xl">
                        Votre <strong>première séance est offerte</strong>.
                        Réservez en ligne ou contactez-nous directement —
                        on s&apos;occupe du reste.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Clickable
                            clickableType={{
                                type: "link",
                                path: "/essai-offert",
                            }}
                            style={{ variant: "page", color: "accent" }}
                            className="min-w-[15rem]"
                        >
                            Réserver ma séance d&apos;essai
                        </Clickable>
                        <div className="flexCenter">
                            <PhoneNumber />
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= ZONE GEOGRAPHIQUE ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <MapPin className="size-10 text-accent mb-4" />
                    <h2 className="text-foreground-base">
                        Du RPM dans le bassin nîmois
                    </h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued max-w-2xl mt-2">
                        HALL B est situé à <strong>Saint Dionisy</strong>, en
                        plein cœur de la Vaunage. Notre salle est accessible en{" "}
                        <strong>15 minutes depuis le centre de Nîmes</strong>,
                        et en moins de 20 minutes depuis Calvisson, Sommières,
                        Quissac, Vergèze et Caveirac.
                    </p>
                    <p className="text-foreground-subdued max-w-2xl mt-2">
                        Si vous cherchiez un{" "}
                        <em>cours de RPM dans le Gard</em>, c&apos;est ici
                        que ça se passe.
                    </p>
                </div>
            </section>

            {/* ======= FAQ ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-3xl mx-auto flex flex-col">
                    <span className="textLeadSmall text-accent tracking-widest text-center mb-2">
                        FAQ
                    </span>
                    <h2 className="text-foreground-base text-center">
                        Vos questions fréquentes
                    </h2>
                    <Separator className="!my-4 max-w-20 mx-auto" />

                    <div className="faqList flex flex-col gap-3 mt-content">
                        <FAQItem
                            question="Le RPM est-il accessible aux débutants ?"
                            answer={
                                <p>
                                    Oui. Chaque pratiquant règle sa propre
                                    résistance et adapte son intensité à sa
                                    condition physique. Le coach vous guide dès
                                    le premier cours.
                                </p>
                            }
                        />
                        <FAQItem
                            question="Combien de calories brûle-t-on en un cours ?"
                            answer={
                                <p>
                                    Entre 400 et 600 kcal pour une séance de 45
                                    minutes, selon votre poids, votre intensité
                                    et votre niveau.
                                </p>
                            }
                        />
                        <FAQItem
                            question="À quelle fréquence pratiquer le RPM ?"
                            answer={
                                <p>
                                    2 à 3 séances par semaine constituent un
                                    bon rythme pour progresser et perdre du
                                    poids, en laissant à votre corps le temps
                                    de récupérer.
                                </p>
                            }
                        />
                        <FAQItem
                            question="Faut-il un équipement particulier ?"
                            answer={
                                <p>
                                    Une tenue de sport, une serviette et une
                                    bouteille d&apos;eau suffisent. Vos
                                    chaussures de sport classiques conviennent.
                                </p>
                            }
                        />
                        <FAQItem
                            question="Comment réserver une séance d'essai ?"
                            answer={
                                <p>
                                    Profitez d&apos;une{" "}
                                    <Link
                                        href="/essai-offert"
                                        className="text-accent hoverUnderline"
                                    >
                                        séance d&apos;essai offerte
                                    </Link>{" "}
                                    en ligne ou contactez-nous au{" "}
                                    <a
                                        href="tel:+33466191676"
                                        className="text-accent hoverUnderline"
                                    >
                                        04 66 19 16 76
                                    </a>
                                    .
                                </p>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* ======= MAILLAGE INTERNE ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-content">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="textSubH2 text-foreground-subdued mb-content">
                        À découvrir aussi
                    </span>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/plannings"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Planning complet
                        </Link>
                        <Link
                            href="/tarifs/boost"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Formule Boost — cours illimités
                        </Link>
                        <Link
                            href="/tarifs"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Tous nos tarifs
                        </Link>
                        <Link
                            href="/squash"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Réservation Squash
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
