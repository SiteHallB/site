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
import { useImage, ImageType } from "@/context/image-context";

import {
    MapPin,
    Bike,
    Flame,
    Music,
    Timer,
    Users,
    Heart,
    Dumbbell,
    Sparkles,
    Activity,
    Wind,
    Brain,
    Smile,
    Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Icon mapping (string → composant) ────────────────────────────────────────
// Nécessaire car on ne peut pas passer un composant React entre Server et Client Component.

const ICONS = {
    Bike,
    Flame,
    Music,
    Timer,
    Users,
    Heart,
    Dumbbell,
    Sparkles,
    Activity,
    Wind,
    Brain,
    Smile,
    Globe,
} as const;

export type IconName = keyof typeof ICONS;

// ─── Types ────────────────────────────────────────────────────────────────────

export type Stat = { value: string; label: string };

export type Benefit = {
    iconName: IconName;
    title: string;
    text: string;
};

export type Step = { n: string; title: string; text: string };

export type FAQ = { question: string; answer: React.ReactNode };

export type CoursTemplateProps = {
    /** Clé d'image dans le contexte (ex: "cours_rpm", "cours_pilates") */
    imageKey: string;
    /** Petit eyebrow au-dessus du H1 — ex: "Cours collectif" */
    eyebrow: string;
    /** Première partie du H1 — ex: "Cours de Pilates" */
    h1Top: string;
    /** Deuxième partie du H1 colorée en accent — ex: "à Saint Dionisy" */
    h1Bottom: string;
    /** Phrase d'accroche sous le titre */
    heroLead: React.ReactNode;
    /** 4 stats clés affichées en bandeau juste après le hero */
    stats: [Stat, Stat, Stat, Stat];
    /** Section "C'est quoi ?" — titre + 2 paragraphes (séparés pour éviter le warning React key) */
    whatTitle: string;
    whatParagraph1: React.ReactNode;
    whatParagraph2: React.ReactNode;
    /** Section bénéfices : titre + 6 bénéfices */
    benefitsTitle: string;
    benefits: Benefit[];
    /** Étapes de déroulement (4 à 6 étapes recommandées) */
    steps: Step[];
    /** Public cible : intro + liste de bullets (string simple) */
    audienceIntro: React.ReactNode;
    audienceBullets: string[];
    /** Section salle/équipement */
    equipmentTitle: string;
    equipmentParagraph1: React.ReactNode;
    equipmentParagraph2: React.ReactNode;
    /** FAQ items */
    faq: FAQ[];
    /** Phrase de localisation (mentionner les villes alentour) */
    localText: React.ReactNode;
    /** Bouton secondaire du hero (défaut : "Voir les plannings" → /plannings) */
    secondaryCta?: { label: string; path: string };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCell({ value, label }: Stat) {
    return (
        <div className="flex flex-col items-center text-center px-4">
            <span className="textLeadBig text-accent">{value}</span>
            <span className="textSubH2 text-foreground-subdued mt-1">
                {label}
            </span>
        </div>
    );
}

function BenefitCard({ iconName, title, text }: Benefit) {
    const Icon = ICONS[iconName];
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

function StepItem({ n, title, text }: Step) {
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

function FAQItem({ question, answer }: FAQ) {
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

// ─── Main Template ────────────────────────────────────────────────────────────

export default function CoursTemplate(props: CoursTemplateProps) {
    const container = useRef<HTMLDivElement>(null);
    const allImages = useImage() as Record<string, ImageType>;
    const image = allImages[props.imageKey] ?? allImages.cours_rpm;

    useGSAP(
        () => {
            // Hero
            gsap.from(".coursHeroContent > *", {
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
            });

            // Stats
            gsap.set(".statItem", { y: 40, autoAlpha: 0 });
            ScrollTrigger.batch(".statItem", {
                start: "top 92%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // Benefits
            gsap.set(".benefitCard", { y: 40, autoAlpha: 0 });
            ScrollTrigger.batch(".benefitCard", {
                start: "top 90%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.07,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // Steps
            gsap.set(".stepItem", { x: -30, autoAlpha: 0 });
            ScrollTrigger.batch(".stepItem", {
                start: "top 90%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        x: 0,
                        autoAlpha: 1,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // FAQ
            gsap.set(".faqItem", { y: 20, autoAlpha: 0 });
            ScrollTrigger.batch(".faqItem", {
                start: "top 92%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.06,
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // Filet de sécurité — force l'affichage après 2.5s au cas où
            const safety = window.setTimeout(() => {
                gsap.to(
                    [
                        ".statItem",
                        ".benefitCard",
                        ".stepItem",
                        ".faqItem",
                    ],
                    { autoAlpha: 1, y: 0, x: 0, duration: 0.3, overwrite: false },
                );
            }, 2500);

            return () => window.clearTimeout(safety);
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
                <div className="absolute inset-0">
                    <Image
                        {...image}
                        className="object-cover object-center size-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/70 to-background-base/30" />
                    <div className="absolute inset-0 bg-background-base/30" />
                </div>

                <div className="coursHeroContent relative z-10 w-full px-content lg:px-contentLg pb-subSection pt-32 flex flex-col items-center text-center space-y-4">
                    <span className="textLeadSmall text-accent tracking-widest">
                        {props.eyebrow}
                    </span>
                    <h1 className="text-foreground-base">
                        {props.h1Top}
                        <br />
                        <span className="text-accent">{props.h1Bottom}</span>
                    </h1>
                    <p className="text-foreground-subdued max-w-2xl">
                        {props.heroLead}
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
                            clickableType={{ type: "link", path: props.secondaryCta?.path ?? "/plannings" }}
                            style={{ variant: "page", color: "primary" }}
                            className="min-w-[15rem]"
                        >
                            {props.secondaryCta?.label ?? "Voir les plannings"}
                        </Clickable>
                    </div>
                </div>
            </section>

            {/* ======= STATS ======= */}
            <section className="w-full bg-background-subdued py-content lg:py-contentLg px-content">
                <div className="flex flex-row flex-wrap items-center justify-around gap-y-6 max-w-5xl mx-auto">
                    {props.stats.map((s, i) => (
                        <div key={i} className="statItem">
                            <StatCell {...s} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ======= QU'EST-CE QUE ? ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-content lg:gap-contentLg items-center">
                    <div className="w-full lg:w-1/2 aspect-square rounded-xl overflow-hidden">
                        <Image
                            {...image}
                            className="object-cover object-center size-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col space-y-content">
                        <h2 className="text-foreground-base">
                            {props.whatTitle}
                        </h2>
                        <Separator className="!my-2 max-w-20" />
                        <p className="text-foreground-subdued">
                            {props.whatParagraph1}
                        </p>
                        <p className="text-foreground-subdued">
                            {props.whatParagraph2}
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
                        {props.benefitsTitle}
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content w-full mt-content">
                        {props.benefits.map((b, i) => (
                            <BenefitCard key={i} {...b} />
                        ))}
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

                    <div className="flex flex-col gap-content lg:gap-contentLg mt-content">
                        {props.steps.map((s, i) => (
                            <StepItem key={i} {...s} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= EQUIPEMENT / SALLE DEDIEE ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-content lg:gap-contentLg items-center">
                    <div className="w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden">
                        <Image
                            {...image}
                            className="object-cover object-center size-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col space-y-content">
                        <span className="textLeadSmall text-accent tracking-widest">
                            L&apos;équipement
                        </span>
                        <h2 className="text-foreground-base">
                            {props.equipmentTitle}
                        </h2>
                        <Separator className="!my-2 max-w-20" />
                        <p className="text-foreground-subdued">
                            {props.equipmentParagraph1}
                        </p>
                        <p className="text-foreground-subdued">
                            {props.equipmentParagraph2}
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
                    <h2 className="text-foreground-base">
                        À qui ça s&apos;adresse&nbsp;?
                    </h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued mt-2">
                        {props.audienceIntro}
                    </p>
                    <ul className="text-foreground-subdued mt-content space-y-2 text-left max-w-2xl">
                        {props.audienceBullets.map((b, i) => (
                            <li key={i}>
                                <strong>•</strong> {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ======= CTA GRAND FORMAT ======= */}
            <section className="relative w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        {...image}
                        className="object-cover object-center size-full"
                    />
                    <div className="absolute inset-0 bg-background-base/80" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-content lg:px-contentLg py-subSection flex flex-col items-center text-center space-y-content">
                    <h2 className="text-foreground-base">
                        Envie d&apos;essayer&nbsp;?
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <p className="text-foreground-subdued max-w-xl">
                        Votre <strong>première séance est offerte</strong>.
                        Réservez en ligne ou contactez-nous directement.
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
                        À 15 min de Nîmes
                    </h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued max-w-2xl mt-2">
                        {props.localText}
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

                    <div className="flex flex-col gap-3 mt-content">
                        {props.faq.map((f, i) => (
                            <FAQItem key={i} {...f} />
                        ))}
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
                            href="/cours"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Tous nos cours
                        </Link>
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
                            Formule Boost
                        </Link>
                        <Link
                            href="/tarifs"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Tous nos tarifs
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
