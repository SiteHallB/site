"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";
import Separator from "@/components/ui/separator";
import { useImage } from "@/context/image-context";

import {
    Bike,
    Music,
    Dumbbell,
    Flame,
    Heart,
    Activity,
    Waves,
    Zap,
    Sparkles,
    ArrowRight,
    Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Discipline = {
    name: string;
    short: string;
    Icon: React.ComponentType<{ className?: string }>;
    href?: string;
    intensite: "Modérée" | "Élevée" | "Très élevée";
    duree: string;
};

const DISCIPLINES: Discipline[] = [
    {
        name: "Musculation",
        short: "Plateau 2 400 m² équipé Panatta & Technogym. Accès libre 7j/7 de 6h à 23h.",
        Icon: Dumbbell,
        href: "/cours/musculation",
        intensite: "Élevée",
        duree: "Libre",
    },
    {
        name: "RPM",
        short: "Vélo indoor coaché en musique. Sprints, montées, jusqu'à 600 kcal par séance.",
        Icon: Bike,
        href: "/cours/rpm",
        intensite: "Très élevée",
        duree: "45 min",
    },
    {
        name: "Body Pump",
        short: "Renforcement musculaire complet avec barres lestées sur fond de musique.",
        Icon: Dumbbell,
        href: "/cours/body-pump",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "Body Attack",
        short: "Cardio athlétique haute énergie inspiré des sports. Jusqu'à 600 kcal par séance.",
        Icon: Activity,
        href: "/cours/body-attack",
        intensite: "Très élevée",
        duree: "45 min",
    },
    {
        name: "Cardio Boxe",
        short: "Boxe fitness sans contact : frappe, cardio et défoulement. Anti-stress garanti.",
        Icon: Flame,
        href: "/cours/cardio-boxe",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "PPG",
        short: "Préparation physique générale : cardio, force et mobilité. La base de tous les sports.",
        Icon: Zap,
        href: "/cours/ppg",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "CAF",
        short: "Cuisses, Abdos, Fessiers — Renforcement musculaire ciblé du bas du corps.",
        Icon: Flame,
        href: "/cours/caf",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "Abdos Flash",
        short: "Format court et intensif dédié à la sangle abdominale. Idéal sur la pause déjeuner.",
        Icon: Zap,
        intensite: "Élevée",
        duree: "15 min",
    },
    {
        name: "Step",
        short: "Cours chorégraphié sur step. Travail cardio et coordination en groupe.",
        Icon: Activity,
        href: "/cours/step",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "Zumba",
        short: "Danse fitness aux rythmes latins. Cardio intense déguisé en fête.",
        Icon: Music,
        href: "/cours/zumba",
        intensite: "Élevée",
        duree: "45 min",
    },
    {
        name: "Yoga",
        short: "Postures, respiration et relaxation. Souplesse, gainage et sérénité.",
        Icon: Heart,
        href: "/cours/yoga",
        intensite: "Modérée",
        duree: "45 min",
    },
    {
        name: "Pilates",
        short: "Renforcement profond, posture, gainage. Travail doux et précis sur la sangle abdominale.",
        Icon: Sparkles,
        href: "/cours/pilates",
        intensite: "Modérée",
        duree: "45 min",
    },
    {
        name: "Cours d'aqua",
        short: "Aquagym, aquabike, aqua power et aqua mix en bassin chauffé. Sans impact pour les articulations.",
        Icon: Waves,
        href: "/cours/aqua",
        intensite: "Modérée",
        duree: "45 min",
    },
];

function DisciplineCard({ d }: { d: Discipline }) {
    const inner = (
        <div className="disciplineCard group relative h-full flex flex-col p-6 bg-background-highlight rounded-xl border border-foreground-subdued/10 hover:border-accent transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-row items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                    <d.Icon className="size-6 text-accent" />
                </div>
                {d.href && (
                    <span className="text-foreground-subdued group-hover:text-accent transition-colors">
                        <ArrowRight className="size-5" />
                    </span>
                )}
            </div>

            <h3 className="textSubH2 text-foreground-base mb-2">{d.name}</h3>
            <p className="text-foreground-subdued textSmall flex-grow">
                {d.short}
            </p>

            <div className="flex flex-row gap-3 mt-4 pt-4 border-t border-foreground-subdued/10">
                <span className="textSmall text-foreground-subdued">
                    <span className="text-accent">⏱</span> {d.duree}
                </span>
                <span className="textSmall text-foreground-subdued">
                    <span className="text-accent">🔥</span> {d.intensite}
                </span>
            </div>

            {d.href && (
                <span className="textSmall text-accent mt-3 hoverUnderline w-fit">
                    Découvrir →
                </span>
            )}
        </div>
    );

    return d.href ? (
        <Link href={d.href} className="block h-full">
            {inner}
        </Link>
    ) : (
        <div className="h-full">{inner}</div>
    );
}

export default function CoursIndex() {
    const { root_concept_encadrement, salle_coursco } = useImage();
    const container = useRef<HTMLDivElement>(null);

    // Tolérant : tous les composants n'exposent pas forcément salle_coursco via le provider.
    // On retombe sur l'image RPM/encadrement si non défini.
    const heroImage = salle_coursco ?? root_concept_encadrement;

    useGSAP(
        () => {
            // Hero : animation au mount (toujours fiable car visible au chargement)
            gsap.from(".coursHeroContent > *", {
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Cards disciplines : ScrollTrigger.batch (plus fiable que from + ScrollTrigger)
            gsap.set(".disciplineCard", { y: 40, autoAlpha: 0 });
            ScrollTrigger.batch(".disciplineCard", {
                start: "top 92%",
                onEnter: (batch) =>
                    gsap.to(batch, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.06,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true,
                    }),
                once: true,
            });

            // Boost highlight
            gsap.set(".boostHighlight", { scale: 0.95, autoAlpha: 0 });
            ScrollTrigger.create({
                trigger: ".boostHighlight",
                start: "top 85%",
                once: true,
                onEnter: () =>
                    gsap.to(".boostHighlight", {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        overwrite: true,
                    }),
            });

            // Filet de sécurité : si pour une raison X les cards restent
            // invisibles après 2s, on force leur affichage (rare mais utile).
            const safety = window.setTimeout(() => {
                gsap.to(".disciplineCard", {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    overwrite: false,
                });
                gsap.to(".boostHighlight", {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.3,
                    overwrite: false,
                });
            }, 2000);

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
            <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] overflow-hidden flex items-end">
                <div className="absolute inset-0">
                    <Image
                        {...heroImage}
                        className="object-cover object-center size-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/70 to-background-base/30" />
                    <div className="absolute inset-0 bg-background-base/30" />
                </div>

                <div className="coursHeroContent relative z-10 w-full px-content lg:px-contentLg pb-subSection pt-32 flex flex-col items-center text-center space-y-4">
                    <span className="textLeadSmall text-accent tracking-widest">
                        Tous nos cours
                    </span>
                    <h1 className="text-foreground-base">
                        Cours collectifs<br />
                        <span className="text-accent">à Saint Dionisy</span>
                    </h1>
                    <p className="text-foreground-subdued max-w-2xl">
                        Plus de 10 disciplines, des dizaines de séances chaque
                        semaine. À 15 minutes de Nîmes, dans le Gard, encadrées
                        par des coachs diplômés.
                    </p>
                </div>
            </section>

            {/* ======= BOOST HIGHLIGHT ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="boostHighlight max-w-4xl mx-auto relative overflow-hidden rounded-xl border-2 border-accent/40 p-6 lg:p-10 bg-gradient-to-br from-background-highlight to-background-base">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shrink-0">
                            <Sparkles className="size-8 text-background-base" />
                        </div>
                        <div className="flex-grow flex flex-col space-y-2">
                            <span className="textLeadSmall text-accent tracking-widest">
                                Formule Boost
                            </span>
                            <h2 className="text-foreground-base">
                                Une seule formule, tous les cours
                            </h2>
                            <p className="text-foreground-subdued">
                                Toutes les disciplines ci-dessous sont
                                incluses{" "}
                                dans la formule <strong>Boost</strong> de HALL
                                B. Musculation, cardio, cours collectifs et
                                small groups en accès illimité, 7 jours sur 7.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Clickable
                                    clickableType={{
                                        type: "link",
                                        path: "/tarifs/boost",
                                    }}
                                    style={{
                                        variant: "navigationBar",
                                        color: "accent",
                                    }}
                                >
                                    Voir la formule Boost
                                </Clickable>
                                <Clickable
                                    clickableType={{
                                        type: "link",
                                        path: "/essai-offert",
                                    }}
                                    style={{
                                        variant: "navigationBar",
                                        color: "primary",
                                    }}
                                >
                                    Séance d&apos;essai offerte
                                </Clickable>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= GRID DISCIPLINES ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        Le catalogue
                    </span>
                    <h2 className="text-foreground-base text-center">
                        Nos disciplines
                    </h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued text-center max-w-2xl">
                        Du cardio brûle-graisses aux séances bien-être en
                        passant par le renforcement musculaire — choisissez ce
                        qui vous correspond.
                    </p>

                    <div className="disciplinesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content w-full mt-content">
                        {DISCIPLINES.map((d) => (
                            <DisciplineCard key={d.name} d={d} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= ARGUMENTS ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="text-foreground-base text-center">
                        Pourquoi nos cours collectifs&nbsp;?
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-content mt-content w-full">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                                <Check className="size-6 text-accent" />
                            </div>
                            <h3 className="textSubH2 text-foreground-base mb-2">
                                Coachs diplômés
                            </h3>
                            <p className="text-foreground-subdued textSmall">
                                Tous nos cours sont animés par des
                                professionnels formés, passionnés et présents
                                pour booster vos résultats.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                                <Check className="size-6 text-accent" />
                            </div>
                            <h3 className="textSubH2 text-foreground-base mb-2">
                                Salles dédiées
                            </h3>
                            <p className="text-foreground-subdued textSmall">
                                Salle de cycling, salle de cours collectifs,
                                salle de danse — chaque discipline a son
                                espace optimisé.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                                <Check className="size-6 text-accent" />
                            </div>
                            <h3 className="textSubH2 text-foreground-base mb-2">
                                Petits groupes
                            </h3>
                            <p className="text-foreground-subdued textSmall">
                                Effectifs contrôlés pour un suivi attentif et
                                des conseils personnalisés du coach.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= PLANNING CTA ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-content">
                    <h2 className="text-foreground-base">
                        Quand viennent les cours&nbsp;?
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <p className="text-foreground-subdued">
                        Plusieurs séances chaque jour, du lundi au dimanche.
                        Matin, midi et soir. Consultez le planning complet
                        pour trouver le créneau qui vous convient.
                    </p>
                    <Clickable
                        clickableType={{ type: "link", path: "/plannings" }}
                        style={{ variant: "page", color: "accent" }}
                        className="min-w-[15rem]"
                    >
                        Voir le planning complet
                    </Clickable>
                </div>
            </section>

            {/* ======= CTA FINAL ======= */}
            <section className="relative w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        {...heroImage}
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
                        Votre <strong>première séance est offerte</strong> sur
                        n&apos;importe lequel de nos cours collectifs.
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
                            Réserver mon essai
                        </Clickable>
                        <Clickable
                            clickableType={{
                                type: "link",
                                path: "/tarifs/boost",
                            }}
                            style={{ variant: "page", color: "primary" }}
                            className="min-w-[15rem]"
                        >
                            Voir la formule Boost
                        </Clickable>
                    </div>
                </div>
            </section>
        </main>
    );
}
