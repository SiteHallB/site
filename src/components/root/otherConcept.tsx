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
    return (
        <div className={clsx("bottom-0 rounded-xl overflow-hidden", className)}>
            <Image 
                src={images[num].src}
                width={images[num].width}
                height={images[num].height}
                className="object-cover object-center size-full"
                alt={images[num].alt}
            />
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
            pinSpacing: false, 
            start: () => "center center", 
            end: () => "center center", 
            anticipatePin: 1, 
        })
    }, { scope: container })

    const t = <p className="text-foreground-subdued">{text}</p>

    return (
        <span ref={container} className="relative w-full h-[130vh] flexCenter flex-col">
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
            <div className="absolute inset-0 p-contentClose outline-red-400 outline-2 grid grid-cols-2 grid-rows-4 gap-contentClose">
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
            start: () => "top top+=75", 
            end: () => "bottom center", 
            anticipatePin: 1, 
            markers: true, 
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
                    <Im num={0} className="col-start-1 row-start-1"/>
                    <Im num={0} className="col-start-2 row-start-2"/>
                    <Im num={2} className="col-start-1 row-start-2"/>
                </Section>
                <Section
                    type="left"
                    text={<>Cours collectifs, smallgroups, et cours aquatiques en illimité toute la semaine pour les formules associées.<br/>
                    Nous tenons à ce que chaque adhérent qui visite la salle ne veuille plus en partir.</>}
                >
                    <Im num={0} className="absolute top-2 left-2 w-20 h-45"/>
                </Section>
                <Section
                    type="right"
                    text={<>Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant.</>}
                >
                    <Im num={0} className="absolute top-2 left-2 w-20 h-45"/>
                </Section>
                <Section
                    type="left"
                    text={<>Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.</>}
                >
                    <Im num={0} className="absolute top-2 left-2 w-20 h-45"/>
                </Section>
            </div>
            {/* Marge pour les ScrollTriggers */}
            <div className="w-full h-[20vh] bg-background-base"/>
        </section>
    );
}