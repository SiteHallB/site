"use client"

import "@/styles/concept.css"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]


export default function Concept() {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const scrollTriggerConfig = {
            scrub: true, 
            trigger: ".scroll-section", 
            start: "top top+=55", 
            end: "bottom center", 
        }
        gsap.to(".concept-title", {
            scrollTrigger: { ...scrollTriggerConfig, pin:true }
        })
        gsap.timeline({scrollTrigger: { ...scrollTriggerConfig, scrub: true }, })
        .to(".first-text", {
            autoAlpha: 0
        })
        .to(".image", {
            scale: 2, 
            yPercent: -60, 
            duration: 1, 
        }, "<")
        .to(".image", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        }, ">")
        .to(".second-text", {
            y: -400
        }, "<")
    }, { scope: container })

    return (
        <section ref={container} id="#concept" className="relative bg-background-base w-full h-[200vh] overflow-x-hidden">
            <div className="scroll-section flex flex-col items-center space-y-5">
                <p className="concept-title text-foreground-base text-center w-full title-small z-20">
                    Notre concept
                </p>
                <p className="first-text text-foreground-subdued text-left px-content w-full readable">
                    <span className="text-accent">2400m2</span> d'infrastructure sportive flambant neuve.
                    Nombreuses activités, musculation cours collectifs et smallgroups avec coach diplômé, squash, danse, Pôle Aqua et pôle santé avec notre ostéopathe.
                </p>

                <div className="overflow-hidden size-[70vw] rounded-2xl image">
                    <Image 
                        src={images[0].src}
                        width={images[0].width}
                        height={images[0].height}
                        className="object-cover object-center size-full"
                        alt={images[0].alt}
                    />
                </div>
            </div>
            <div className="second-text relative p-content mx-content bg-background-highlight rounded-xl">
            <p className="text-foreground-base readable">
                Cours collectifs, smallgroups, et cours aquatiques en illimité toute la semaine pour les formules associées. <br/>
                Nous tenons à ce que chaque adhérent qui visite la salle ne veuille plus en partir. <br/>
                Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant. <br/>
                Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.
            </p>
            </div>
        </section>
    );
}