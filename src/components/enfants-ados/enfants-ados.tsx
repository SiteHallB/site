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
    Baby,
    WavesLadder,
    Zap,
    Dumbbell,
    Users,
    ShieldCheck,
    GraduationCap,
    Clock,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Données des activités ───────────────────────────────────────────────────

type Activite = {
    imageKey: string;
    icon: React.ReactNode;
    ages: string;
    titre: string;
    horaires: React.ReactNode[];
    description: string;
    prix: string;
    ctaLabel: string;
    ctaPath: string;
    lienSecondaire?: { label: string; path: string };
};

const ACTIVITES: Activite[] = [
    {
        imageKey: "enfants_natation",
        icon: <WavesLadder className="size-6 text-accent" />,
        ages: "Dès 6 mois",
        titre: "Natation enfants",
        horaires: [
            <>Mercredi <span className="text-accent">11h30</span> — Bébés nageurs</>,
            <>Mercredi <span className="text-accent">17h00</span> — Natation 3 / 4 ans</>,
            <>Mercredi <span className="text-accent">17h30</span> — Natation 5 ans et +</>,
        ],
        description:
            "Bébés nageurs, école de natation et tests d'aisance aquatique dans notre bassin chauffé. Maximum 5 enfants par cours, encadrés par un maître-nageur diplômé.",
        prix: "À partir de 15€ la séance",
        ctaLabel: "S'inscrire à la natation",
        ctaPath: "/tarifs/carnet-seances",
        lienSecondaire: { label: "En savoir plus sur la natation", path: "/natation-enfant-vaunage" },
    },
    {
        imageKey: "enfants_ppg_kid",
        icon: <Sparkles className="size-6 text-accent" />,
        ages: "6 - 9 ans",
        titre: "PPG Kid",
        horaires: [<>Mercredi <span className="text-accent">16h00 - 16h45</span></>],
        description:
            "Un cours ludique de préparation physique pour développer la motricité, la coordination, l'équilibre, la force et la confiance en soi grâce à des exercices adaptés à leur âge.",
        prix: "300€ / an — rentrée le 2 septembre",
        ctaLabel: "Inscrire mon enfant",
        ctaPath: "/tarifs/ppg-kid",
    },
    {
        imageKey: "enfants_ppg_teen",
        icon: <Zap className="size-6 text-accent" />,
        ages: "10 - 14 ans",
        titre: "PPG Teen",
        horaires: [<>Mercredi <span className="text-accent">17h00 - 17h45</span></>],
        description:
            "Un entraînement conçu pour les adolescents : améliorer les qualités physiques, apprendre les bons gestes sportifs et progresser dans un environnement motivant et sécurisé.",
        prix: "300€ / an — rentrée le 2 septembre",
        ctaLabel: "Inscrire mon ado",
        ctaPath: "/tarifs/ppg-teen",
    },
];

// ─── Le mercredi, c'est leur jour ────────────────────────────────────────────

const CRENEAUX: { heure: string; activite: string; ages: string }[] = [
    { heure: "11h30", activite: "Bébés nageurs", ages: "Les tout-petits, avec un parent" },
    { heure: "16h00", activite: "PPG Kid", ages: "6 - 9 ans" },
    { heure: "17h00", activite: "Natation — groupe débutants", ages: "3 - 4 ans" },
    { heure: "17h00", activite: "PPG Teen", ages: "10 - 14 ans" },
    { heure: "17h30", activite: "Natation — groupe confirmés", ages: "5 ans et +" },
];

// ─── Pourquoi HALL B ─────────────────────────────────────────────────────────

const ARGUMENTS = [
    {
        icon: GraduationCap,
        titre: "Encadrement diplômé",
        texte: "Maître-nageur et coachs diplômés d'État : vos enfants apprennent les bons gestes dès le départ, en toute sécurité.",
    },
    {
        icon: Users,
        titre: "Petits groupes",
        texte: "Des effectifs volontairement réduits pour un vrai suivi de chaque enfant et des progrès visibles séance après séance.",
    },
    {
        icon: ShieldCheck,
        titre: "Cadre sécurisé",
        texte: "Bassin chauffé, salles dédiées, matériel adapté à chaque âge et parking gratuit juste devant la salle.",
    },
    {
        icon: Dumbbell,
        titre: "Pendant ce temps… à vous !",
        texte: "Profitez du créneau de votre enfant pour vous entraîner sur le plateau ou en cours collectif. Toute la famille bouge.",
    },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EnfantsAdos() {
    const container = useRef<HTMLDivElement>(null);
    const images = useImage();
    const hero = images.enfants_hero;

    useGSAP(
        () => {
            gsap.from(".enfantsHeroContent > *", {
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
            });

            gsap.set(".activiteCard, .argumentCard, .creneauItem", { y: 40, autoAlpha: 0 });
            ScrollTrigger.batch(".activiteCard, .argumentCard, .creneauItem", {
                start: "top 90%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.08,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // Filet de sécurité — force l'affichage après 2.5s au cas où
            const safety = window.setTimeout(() => {
                gsap.to(".activiteCard, .argumentCard, .creneauItem", {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    overwrite: false,
                });
            }, 2500);

            return () => window.clearTimeout(safety);
        },
        { scope: container },
    );

    return (
        <main ref={container} className="relative bg-background-base w-full pt-subMenu">
            {/* ======= HERO ======= */}
            <section className="relative w-full min-h-[80vh] lg:min-h-[90vh] overflow-hidden flex items-end">
                <div className="absolute inset-0">
                    <Image
                        {...hero}
                        className="object-cover object-center size-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/70 to-background-base/30" />
                    <div className="absolute inset-0 bg-background-base/30" />
                </div>

                <div className="enfantsHeroContent relative z-10 w-full px-content lg:px-contentLg pb-subSection pt-32 flex flex-col items-center text-center space-y-4">
                    <h1 className="text-foreground-base">
                        Enfants &amp; Ados
                        <br />
                        <span className="text-accent">chez HALL B</span>
                    </h1>
                    <p className="text-foreground-subdued max-w-2xl">
                        Natation, préparation physique Kid et Teen : de <strong>6 mois à 14 ans</strong>,
                        vos enfants grandissent, nagent et se dépensent dans un cadre encadré.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                        <Clickable
                            clickableType={{ type: "link", path: "#activites" }}
                            style={{ variant: "page", color: "accent" }}
                            className="min-w-[15rem]"
                        >
                            Découvrir les activités
                        </Clickable>
                        <Clickable
                            clickableType={{ type: "link", path: "/contact" }}
                            style={{ variant: "page", color: "primary" }}
                            className="min-w-[15rem]"
                        >
                            Poser une question
                        </Clickable>
                    </div>
                </div>
            </section>

            {/* ======= LES 3 ACTIVITES ======= */}
            <section id="activites" className="w-full px-content lg:px-contentLg py-subSection scroll-mt-subMenu">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        Nos activités jeunesse
                    </span>
                    <h2 className="text-foreground-base text-center mb-2">
                        Une activité pour chaque âge
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-content w-full mt-content items-stretch">
                        {ACTIVITES.map((a, i) => (
                            <article
                                key={i}
                                className="activiteCard flex flex-col bg-background-highlight rounded-xl border border-foreground-subdued/10 overflow-hidden h-full"
                            >
                                <div className="relative h-52 shrink-0">
                                    <Image
                                        {...images[a.imageKey]}
                                        className="object-cover object-center size-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-highlight to-transparent" />
                                    <span className="absolute top-3 left-3 bg-accent text-background-base rounded-xs px-3 py-1 textSmall">
                                        {a.ages}
                                    </span>
                                </div>

                                <div className="flex flex-col flex-1 p-6 space-y-3">
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                                            {a.icon}
                                        </div>
                                        <h3 className="textSubH2 text-foreground-base">{a.titre}</h3>
                                    </div>

                                    <ul className="text-foreground-subdued space-y-1">
                                        {a.horaires.map((h, j) => (
                                            <li key={j} className="flex flex-row items-center gap-2">
                                                <Clock className="size-4 text-accent shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-foreground-subdued flex-1">{a.description}</p>

                                    <p className="text-foreground-base"><strong>{a.prix}</strong></p>

                                    <div className="flex flex-col gap-2 pt-2">
                                        <Clickable
                                            clickableType={{ type: "link", path: a.ctaPath }}
                                            style={{ variant: "page", color: "accent" }}
                                            className="w-full"
                                        >
                                            {a.ctaLabel}
                                        </Clickable>
                                        {a.lienSecondaire && (
                                            <Link
                                                href={a.lienSecondaire.path}
                                                className="text-center text-foreground-subdued hover:text-accent transition-colors textSmall hoverUnderline"
                                            >
                                                {a.lienSecondaire.label}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= LE MERCREDI C'EST LEUR JOUR ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-foreground-base text-center">
                        Une organisation simple
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="w-full flex flex-col mt-content">
                        {CRENEAUX.map((c, i) => (
                            <div
                                key={i}
                                className="creneauItem flex flex-row items-center gap-4 lg:gap-8 py-4 border-b border-foreground-subdued/10 last:border-b-0"
                            >
                                <span className="textSubH2 text-accent shrink-0 w-20 lg:w-24">{c.heure}</span>
                                <div className="flex flex-col flex-1">
                                    <span className="text-foreground-base">{c.activite}</span>
                                    <span className="textSmall text-foreground-subdued">{c.ages}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-foreground-subdued text-center mt-content">
                        Réservation de la natation par téléphone ou en ligne.
                        PPG Kid et Teen : inscription à l&apos;année, rentrée le mercredi 2 septembre.
                    </p>
                </div>
            </section>

            {/* ======= POURQUOI HALL B ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        L&apos;esprit HALL B
                    </span>
                    <h2 className="text-foreground-base text-center">
                        Pourquoi nous confier vos enfants&nbsp;?
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-content w-full mt-content">
                        {ARGUMENTS.map((arg, i) => {
                            const Icon = arg.icon;
                            return (
                                <div
                                    key={i}
                                    className="argumentCard flex flex-col items-start p-6 bg-background-highlight rounded-xl border border-foreground-subdued/10 h-full"
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                                        <Icon className="size-6 text-accent" />
                                    </div>
                                    <h3 className="textSubH2 text-foreground-base mb-2">{arg.titre}</h3>
                                    <p className="text-foreground-subdued">{arg.texte}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ======= CTA FINAL ======= */}
            <section className="relative w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        {...hero}
                        className="object-cover object-center size-full"
                    />
                    <div className="absolute inset-0 bg-background-base/80" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-content lg:px-contentLg py-subSection flex flex-col items-center text-center space-y-content">
                    <Baby className="size-10 text-accent" />
                    <h2 className="text-foreground-base">
                        Une question sur les activités enfants&nbsp;?
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <p className="text-foreground-subdued max-w-xl">
                        Places limitées pour garantir la qualité d&apos;encadrement.
                        Appelez-nous ou passez directement à l&apos;accueil, l&apos;équipe vous répond.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 items-center">
                        <Clickable
                            clickableType={{ type: "link", path: "/contact" }}
                            style={{ variant: "page", color: "accent" }}
                            className="min-w-[15rem]"
                        >
                            Nous contacter
                        </Clickable>
                        <div className="flexCenter">
                            <PhoneNumber />
                        </div>
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
                            href="/natation-enfant-vaunage"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Natation enfant
                        </Link>
                        <Link
                            href="/tarifs/ppg-kid"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            PPG Kid
                        </Link>
                        <Link
                            href="/tarifs/ppg-teen"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            PPG Teen
                        </Link>
                        <Link
                            href="/tarifs"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Tous nos tarifs
                        </Link>
                        <Link
                            href="/essai-offert"
                            className="px-4 py-2 rounded-full border border-foreground-subdued/30 text-foreground-base hover:border-accent hover:text-accent transition-colors textSmall"
                        >
                            Essai offert (adultes)
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
