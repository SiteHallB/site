"use client"

import "@/styles/valeurs.css"

import { useRef } from "react";

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

type Image = { src: string, width: number, height: number, alt: string };

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function Cadre({ image }: { image: Image }) {
    return (
        <div className="image-frame overflow-hidden size-25">
            <Image 
                src={image.src}
                width={image.width}
                height={image.height}
                className="image object-cover object-center size-full"
                alt={image.alt}
            />
        </div>
    );
}

function ScrollText({ text }: { text: string }) {
    return (
        <div className="py-2 flex items-center justify-center overflow-hidden">
        <p className="text-4xl uppercase text-accent scale-y-140">
            {text}
        </p>
        
        <div className="absolute w-25 py-10 overflow-hidden flex items-center justify-center">
            <p className="text-4xl uppercase text-foreground-subdued scale-y-140 z-10">
                {text}
            </p>
        </div>
        </div>
    );
}

export default function Valeurs() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const scrollTriggerConfig = {
            trigger: ".scroll-section", 
            start: "top center", 
            end: "bottom 60%", 
            scrub: 0.1, 
        }

        gsap.utils.toArray<HTMLElement>('.image-frame').forEach((el, index) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el, 
                    start: "center center+=150", 
                    end: "center center-=150", 
                    scrub: true
                }, 
                scale: 1.1, 
                yoyo: true, 
                repeat: 1, 
                ease: "power1.out"
            })
        })

        gsap.set(".scroll-text", {
            y: 125, 
            autoAlpha: 1
        })

        gsap.timeline({
            scrollTrigger: { ...scrollTriggerConfig }
        })
        .to(".scroll-text", {
            y: 70, 
            duration: 0.5
        })
        .to(".scroll-text", {
            y: 50, 
            duration: 1
        })
        .to(".scroll-text", {
            y: 10, 
            duration: 0.5
        })
        .to(".scroll-text", {
            y: -10, 
            duration: 1
        })
        .to(".scroll-text", {
            y: -50, 
            duration: 0.5
        })
        .to(".scroll-text", {
            y: -70, 
            duration: 1
        })
        .to(".scroll-text", {
            y: -125, 
            duration: 0.5
        })
        
    }, { scope: container })

    return (
        <section ref={container} id="valeurs" className="relative z-10 w-full">
            <div className="relative inset-x-0 top-[-1px]">
                <div className="sticky top-0 w-full z-20 flex flex-col space-y-[-1px]">
                    <div className="bg-background-base w-full h-[70px]"/>
                    <h2 id="title-valeurs" className="text-center text-foreground-base title-small w-full bg-background-base pb-10">
                        Nos Valeurs
                    </h2>
                    <div className="background-transition-invert bg-background-base w-full h-[25px]"/> 
                </div>
                <div className="scroll-section w-full flex flex-col space-y-3 items-center bg-background-subdued pt-20">
                    {[...Array(9)].map((_, i) => (
                        <Cadre key={i} image={images[i % 3]} />
                    ))}
                </div>
                
            </div>
            <div className="relative top-[-52px] flex flex-col space-y-[-1px]">
                <div className="background-transition bg-background-base w-full h-[25px]"/> 
                <div className="bg-background-base w-full h-[50vh]"/>  
            </div>

            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-full h-[65px] flex items-center justify-center overflow-hidden">
                <div className="scroll-text invisible flex flex-col space-y-2">
                    <ScrollText text="Convivialité"/>
                    <ScrollText text="Entraide"/>
                    <ScrollText text="Accompagnement"/>
                </div>
                </div>
            </div>


        </section>
    );
}