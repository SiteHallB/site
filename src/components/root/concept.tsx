"use client"

import Image from "next/image";
import { ImageType } from "@/context/image-context";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";
import { useImage } from "@/context/image-context";

gsap.registerPlugin(ScrollTrigger);

function Section({ image, last, title, text, children }: { image: ImageType, last: boolean; title: string; text: React.ReactNode; children?: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Fait disparaitre le texte haut sauf si au dessus de lg
        const mm = gsap.matchMedia();
        mm.add('(max-width: 1023px)', () => {
            if (last) return;
            gsap.to(".fadeText", {
                scrollTrigger: {
                    trigger: ".fadeText", 
                    start: () => "center 20%", 
                    end: () => "center 20%", 
                    toggleActions: "play none none reverse", 
                }, 
                autoAlpha: 0, 
                ease: "power3.out", 
                duration: 0.5
            })
        })
    }, {scope: container })

    return (
        <section id={title} ref={container} className={`${last ? "lastSection": ""} w-full flex flex-col basis-0 grow min-w-0`}>
            {/* Image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                <Image 
                    {...image}
                    className="object-cover object-center size-full"
                />
            </div>

            {/* Texte */}
            <div className={`${last ? "" : "fadeText"}`}>
            <h3 className="text-foreground-base textSubH2 mb-1">{title}</h3>
            <p className="text-foreground-subdued mb-content">{text}</p>
            {children}
            </div>
        </section>
    );
}

export default function Concept() {
    const container = useRef<HTMLDivElement>(null)

    const { root_concept_espace, root_concept_encadrement, root_concept_qualite, root_concept_adn } = useImage();

    // Pin notre concept
    useGSAP(() => {
        // Pin titre sauf si on est au dessus de lg
        const mm = gsap.matchMedia();
        mm.add('(max-width: 1023px)', () => {
            ScrollTrigger.create({
                trigger: ".scrollSection", 
                endTrigger: ".lastSection", 
                pin: ".notreConcept", 
                pinSpacing: false, 
                start: () => "top top+=55", 
                end: () => "top top+=150", 
                anticipatePin: 1, 
            })
        })
    }, { scope: container })
    
    return (
        <section ref={container} id="concept" className="w-full bg-background-base pb-subSection px-content lg:px-contentLg">
            <div className="scrollSection w-full flex flex-col items-center">
                <h2 className="z-30 notreConcept text-foreground-base text-center mb-subTitle">
                    Notre Concept
                </h2>
                <p className="text-foreground-subdued mb-content">
                    Bienvenue dans <strong>2 400 m²</strong> de bien-être et de dépassement de soi flambant neuf - Un écrin pensé pour vous faire aimer chaque minute passée à bouger.
                </p>
                <div className="w-full flex flex-col lg:flex-row gap-y-10 gap-x-content">
                    <Section
                        image={root_concept_espace}
                        last={false}
                        title="Espace"
                        text={<>Un terrain de jeu XXL - Plateau musculation dernier cri, cours collectifs vitaminés, 
                        smallGroups training ultra-ciblés, terrains de squash, école de danse, bassin d'AQUA, pôle santé avec ostéopathe.<br/><br/>
                        Choisissez votre aventure, on s'occupe du reste.</>}
                    />
                    <Section
                        image={root_concept_encadrement}
                        last={false}
                        title="Encadrement"
                        text={<> Encadrement premium -
                        Tous nos cours sont animés par des coaches diplômés, passionnés et toujours à vos côtés pour booster vos résultats.</>}
                    />
                    <Section
                        image={root_concept_qualite}
                        last={false}
                        title="Qualité"
                        text={<>Technologie & matériel de compétition - 
                            Poids calibrés et certifiés pour la compétition, sacs de frappe, machines Panatta « made in Italy », cardio connecté Technogym : 
                            l'élite de l'équipement pour tous les niveaux — du néophyte au compétiteur.</>}
                    />
                    <Section
                        image={root_concept_adn}
                        last={true}
                        title="Notre ADN"
                        text={<>Bien-être garanti - Lumière naturelle, hygiène irréprochable, ambiance respectueuse : 
                        ici, chaque adhérent est considéré, accompagné et motivé.</>}
                    />
                </div>

                <div className="flexCenter flex-col gap-contentClose mt-content">
                    <p className="text-foreground-base text-center"><strong>Formules illimitées</strong> - 
                        Accédez sans contrainte à tous nos cours collectifs, small groups et séances aquatiques, sept jours sur sept.</p>
                    <Clickable
                        clickableType={{type:"link", path: "/tarifs"}}
                        style={{variant: "action", color: "accent"}}
                        className="w-fit"
                    >
                        Je m'inscris
                    </Clickable>
                </div>
            </div>
        </section>
    );
}