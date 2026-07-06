"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";
import Separator from "@/components/ui/separator";
import type { ImageType } from "@/context/image-context";
import { getIcon } from "@/lib/icons";

import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export type Discipline = {
    name: string;
    short: string;
    icone: string;
    href?: string;
    intensite: string;
    duree: string;
    accentColor?: "blue";
};

type Bouton = { texte: string; url: string; style: "primary" | "accent" };

export type CoursIndexData = {
    hero: { eyebrow: string; h1Top: string; h1Bottom: string; texte: string; image: ImageType };
    blocsFormules: {
        eyebrow: string;
        titre: string;
        texte: React.ReactNode;
        couleur: "accent" | "bleu";
        icone: string;
        boutons: Bouton[];
    }[];
    catalogue: { eyebrow: string; titre: string; texte: string };
    disciplines: Discipline[];
    argumentsSection: { titre: string; liste: { titre: string; texte: string }[] };
    planningCta: { titre: string; texte: string; bouton: Bouton };
    ctaFinal: { titre: string; texte: React.ReactNode; boutons: Bouton[] };
};

function DisciplineCard({ d }: { d: Discipline }) {
    const blue = d.accentColor === "blue";
    const iconBg = blue ? "bg-sky-400/15" : "bg-accent/15";
    const iconText = blue ? "text-sky-400" : "text-accent";
    const hoverBorder = blue ? "hover:border-sky-400" : "hover:border-accent";
    const hoverArrow = blue ? "group-hover:text-sky-400" : "group-hover:text-accent";
    const accentText = blue ? "text-sky-400" : "text-accent";

    const Icon = getIcon(d.icone);

    const inner = (
        <div className={`disciplineCard group relative h-full flex flex-col p-6 bg-background-highlight rounded-xl border border-foreground-subdued/10 ${hoverBorder} transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex flex-row items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
                    <Icon className={`size-6 ${iconText}`} />
                </div>
                {d.href && (
                    <span className={`text-foreground-subdued ${hoverArrow} transition-colors`}>
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
                    <span className={accentText}>⏱</span> {d.duree}
                </span>
                <span className="textSmall text-foreground-subdued">
                    <span className={accentText}>🔥</span> {d.intensite}
                </span>
            </div>

            {d.href && (
                <span className={`textSmall ${accentText} mt-3 hoverUnderline w-fit`}>
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

function BlocFormule({ bloc }: { bloc: CoursIndexData["blocsFormules"][number] }) {
    const bleu = bloc.couleur === "bleu";
    const Icon = getIcon(bloc.icone);

    return (
        <section className={`w-full bg-background-subdued px-content lg:px-contentLg ${bleu ? "pb-subSection" : "py-subSection"}`}>
            <div className={`boostHighlight max-w-4xl mx-auto relative overflow-hidden rounded-xl border-2 ${bleu ? "border-sky-400/40" : "border-accent/40"} p-6 lg:p-10 bg-gradient-to-br from-background-highlight to-background-base`}>
                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${bleu ? "bg-sky-400/10" : "bg-accent/10"} blur-3xl`} />
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    <div className={`w-16 h-16 rounded-full ${bleu ? "bg-sky-400" : "bg-accent"} flex items-center justify-center shrink-0`}>
                        <Icon className="size-8 text-background-base" />
                    </div>
                    <div className="flex-grow flex flex-col space-y-2">
                        <span className={`textLeadSmall ${bleu ? "text-sky-400" : "text-accent"} tracking-widest`}>
                            {bloc.eyebrow}
                        </span>
                        <h2 className="text-foreground-base">{bloc.titre}</h2>
                        <div className="text-foreground-subdued">{bloc.texte}</div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            {bloc.boutons.map((bouton, i) =>
                                bleu && bouton.style === "accent" ? (
                                    <Link
                                        key={i}
                                        href={bouton.url}
                                        className="clickableBase flexCenter rounded-full px-3 py-1 textLeadSmall bg-sky-400 text-background-subdued hover:bg-sky-300 transition-colors"
                                    >
                                        {bouton.texte}
                                    </Link>
                                ) : (
                                    <Clickable
                                        key={i}
                                        clickableType={{ type: "link", path: bouton.url }}
                                        style={{ variant: "navigationBar", color: bouton.style }}
                                    >
                                        {bouton.texte}
                                    </Clickable>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function CoursIndex({ data }: { data: CoursIndexData }) {
    const container = useRef<HTMLDivElement>(null);
    const heroImage = data.hero.image;

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
                        {data.hero.eyebrow}
                    </span>
                    <h1 className="text-foreground-base">
                        {data.hero.h1Top}<br />
                        <span className="text-accent">{data.hero.h1Bottom}</span>
                    </h1>
                    <p className="text-foreground-subdued max-w-2xl">
                        {data.hero.texte}
                    </p>
                </div>
            </section>

            {/* ======= BLOCS FORMULES (Boost, Aqua…) ======= */}
            {data.blocsFormules.map((bloc, i) => (
                <BlocFormule key={i} bloc={bloc} />
            ))}

            {/* ======= GRID DISCIPLINES ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <span className="textLeadSmall text-accent tracking-widest mb-2">
                        {data.catalogue.eyebrow}
                    </span>
                    <h2 className="text-foreground-base text-center">
                        {data.catalogue.titre}
                    </h2>
                    <Separator className="!my-4 max-w-20" />
                    <p className="text-foreground-subdued text-center max-w-2xl">
                        {data.catalogue.texte}
                    </p>

                    <div className="disciplinesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content w-full mt-content">
                        {data.disciplines.map((d) => (
                            <DisciplineCard key={d.name} d={d} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= ARGUMENTS ======= */}
            <section className="w-full bg-background-subdued px-content lg:px-contentLg py-subSection">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="text-foreground-base text-center">
                        {data.argumentsSection.titre}
                    </h2>
                    <Separator className="!my-4 max-w-20" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-content mt-content w-full">
                        {data.argumentsSection.liste.map((arg, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-4">
                                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                                    <Check className="size-6 text-accent" />
                                </div>
                                <h3 className="textSubH2 text-foreground-base mb-2">
                                    {arg.titre}
                                </h3>
                                <p className="text-foreground-subdued textSmall">
                                    {arg.texte}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= PLANNING CTA ======= */}
            <section className="w-full px-content lg:px-contentLg py-subSection">
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-content">
                    <h2 className="text-foreground-base">
                        {data.planningCta.titre}
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <p className="text-foreground-subdued">
                        {data.planningCta.texte}
                    </p>
                    <Clickable
                        clickableType={{ type: "link", path: data.planningCta.bouton.url }}
                        style={{ variant: "page", color: data.planningCta.bouton.style }}
                        className="min-w-[15rem]"
                    >
                        {data.planningCta.bouton.texte}
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
                        {data.ctaFinal.titre}
                    </h2>
                    <Separator className="!my-2 max-w-20" />
                    <div className="text-foreground-subdued max-w-xl">
                        {data.ctaFinal.texte}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        {data.ctaFinal.boutons.map((bouton, i) => (
                            <Clickable
                                key={i}
                                clickableType={{ type: "link", path: bouton.url }}
                                style={{ variant: "page", color: bouton.style }}
                                className="min-w-[15rem]"
                            >
                                {bouton.texte}
                            </Clickable>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
