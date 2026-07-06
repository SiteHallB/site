"use client"

import Image from "next/image";
import { ImageType } from "@/context/image-context";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";

gsap.registerPlugin(ScrollTrigger);

export type ConceptData = {
    titre: string;
    intro: React.ReactNode;
    sections: { titre: string; texte: React.ReactNode; image: ImageType }[];
    ctaTexte: React.ReactNode;
    ctaBouton: { texte: string; url: string; style: "primary" | "accent" };
};

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
            <div className="text-foreground-subdued mb-content">{text}</div>
            {children}
            </div>
        </section>
    );
}

export default function Concept({ data }: { data: ConceptData }) {
    const container = useRef<HTMLDivElement>(null)

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
                    {data.titre}
                </h2>
                <div className="text-foreground-subdued mb-content">
                    {data.intro}
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-y-10 gap-x-content">
                    {data.sections.map((section, index) => (
                        <Section
                            key={index}
                            image={section.image}
                            last={index === data.sections.length - 1}
                            title={section.titre}
                            text={section.texte}
                        />
                    ))}
                </div>

                <div className="flexCenter flex-col gap-contentClose mt-content">
                    <div className="text-foreground-base text-center">
                        {data.ctaTexte}
                    </div>
                    <Clickable
                        clickableType={{type:"link", path: data.ctaBouton.url}}
                        style={{variant: "action", color: data.ctaBouton.style}}
                        className="w-fit"
                    >
                        {data.ctaBouton.texte}
                    </Clickable>
                </div>
            </div>
        </section>
    );
}
