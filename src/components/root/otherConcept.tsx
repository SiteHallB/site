"use client"

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import clsx from "clsx";

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function Im({ num, className }: { num: number, className: string }) {
    const container = useRef<HTMLDivElement>(null);

    // Fait disparaitre les images en haut
    useGSAP(() => {
        gsap.to(".image", {
            scrollTrigger: {
                trigger: ".image", 
                start: "top 55%", 
                end: "top 40%", 
                scrub: true, 
                anticipatePin: 1, 
                pinSpacing: false
            }, 
            autoAlpha: 0
        })
    }, {scope: container })

    return (
        <div ref={container}>
        <div className={clsx("image bottom-0 rounded-xl overflow-hidden", className)}>
            <Image 
                src={images[num].src}
                width={images[num].width}
                height={images[num].height}
                className="object-cover object-center size-full"
                alt={images[num].alt}
            />
        </div>
        </div>
    );
}

function Section({ type, text, children }: { type: "left" | "right"; text: React.ReactNode, children: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Pin texte
        ScrollTrigger.create({
            trigger: ".firstImage", 
            endTrigger: ".lastImage", 
            pin: ".pinText", 
            start: () => "center 35%", 
            end: () => "center 35%", 
            anticipatePin: 1, 
        })
    }, { scope: container })

    const t = <p className="text-foreground-subdued">{text}</p>

    return (
        <span ref={container} className="relative w-full h-[130vh] pt-30">
            {/* Texte */}
            <div className="pinText z-10 bg-background-highlight w-full p-contentClose rounded-xl flex flex-row gap-x-contentClose">
                {type === "right" && t}
                {/* Première image */}
                <div className={`firstImage size-34 rounded-xl overflow-hidden shrink-0 ${type === "right" ? "ml-auto" : "mr-auto"}`}>
                    <Image 
                        src={images[0].src}
                        width={images[0].width}
                        height={images[0].height}
                        className="object-cover object-center size-full"
                        alt={images[0].alt}
                    />
                </div>
                {type === "left" && t}
            </div>

            {/* Derniere image aligné avec la première */}
            <div className={`lastImage z-20 absolute size-34 bottom-0 rounded-xl overflow-hidden ${type === "right" ? "right-3" : "left-3"}`}>
                <Image 
                    src={images[1].src}
                    width={images[1].width}
                    height={images[1].height}
                    className="object-cover object-center size-full"
                    alt={images[1].alt}
                />
            </div>

            {/* Images en grille */}
            <div className="absolute inset-x-0 bottom-0 top-[50vh]">
                {children}
            </div>
        </span>
    );
}

export default function Concept() {
    const container = useRef<HTMLDivElement>(null);

    // Pin notre concept
    useGSAP(() => {
        // Pin titre
        ScrollTrigger.create({
            trigger: ".scrollSection", 
            pin: ".notreConcept", 
            pinSpacing: false, 
            start: () => "top top+=55", 
            end: () => "bottom center", 
            anticipatePin: 1, 
        })
    }, { scope: container })
    
    return (
        <section ref={container} id="concept" className="w-full bg-background-base px-content">
            <div className="scrollSection w-full flex flex-col">
                <h2 className="z-30 notreConcept text-foreground-base text-center">
                    Notre Concept
                </h2>
                <Section
                    type="right"
                    text={<>Nombreuses activités, musculation cours collectifs et smallgroups avec coach diplômé, squash, danse, Pôle Aqua et pôle santé avec notre ostéopathe.</>}
                >
                    <Im num={0} className="absolute left-[34vw] top-0 w-[40vw] h-[32vh]"/>
                    <Im num={1} className="absolute left-[2vw] top-[10vh] w-[40vw] h-[32vh]"/>
                    <Im num={2} className="absolute left-[50vw] top-[26vh] w-[40vw] h-[32vh]"/>
                    <Im num={0} className="absolute left-[6vw] top-[35vh] w-[40vw] h-[32vh]"/>
                    
                </Section>
                <Section
                    type="left"
                    text={<>Cours collectifs, smallgroups, et cours aquatiques en illimité toute la semaine pour les formules associées.<br/>
                    Nous tenons à ce que chaque adhérent qui visite la salle ne veuille plus en partir.</>}
                >
                    <Im num={0} className="absolute left-[34vw] top-0 w-[40vw] h-[32vh]"/>
                    <Im num={1} className="absolute left-[2vw] top-[10vh] w-[40vw] h-[32vh]"/>
                    <Im num={2} className="absolute left-[50vw] top-[26vh] w-[40vw] h-[32vh]"/>
                </Section>
                <Section
                    type="right"
                    text={<>Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant.</>}
                >
                    <Im num={0} className="absolute left-[34vw] top-0 w-[40vw] h-[32vh]"/>
                    <Im num={1} className="absolute left-[2vw] top-[10vh] w-[40vw] h-[32vh]"/>
                    <Im num={2} className="absolute left-[50vw] top-[26vh] w-[40vw] h-[32vh]"/>
                    <Im num={0} className="absolute left-[6vw] top-[35vh] w-[40vw] h-[32vh]"/>
                </Section>
                <Section
                    type="left"
                    text={<>Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.</>}
                >
                    <Im num={0} className="absolute left-[34vw] top-0 w-[40vw] h-[32vh]"/>
                    <Im num={1} className="absolute left-[2vw] top-[10vh] w-[40vw] h-[32vh]"/>
                    <Im num={2} className="absolute left-[50vw] top-[26vh] w-[40vw] h-[32vh]"/>
                </Section>
            </div>
            {/* Marge pour les ScrollTriggers */}
            <div className="w-full h-[20vh] bg-background-base"/>
        </section>
    );
}