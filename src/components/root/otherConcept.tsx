"use client"

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

type Image = { src: string, width: number, height: number, alt: string}
type Section = { text:string, image: Image }
type ParallaxCommentedImagesProps = { sections: Section[] }

function ParallaxSection() {

}

function ParallaxCommentedImages({ sections }: ParallaxCommentedImagesProps) {
    return (
        <div>
            {sections.map((section, index) => (
                <div>

                </div>
            ))}
        </div>
    );
}

export default function Concept() {
    const container = useRef<HTMLDivElement>(null);

    // Pin notre concept
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".scrollSection", 
            pin: ".notreConcept", 
            pinSpacing: false, 
            start: () => "top top+=75", 
            end: () => "bottom bottom", 
            anticipatePin: 1, 
            markers: true, 
        })
    }, { scope: container })
    
    return (
        <section ref={container} id="concept" className="w-full bg-background-base">
            <div className="scrollSection w-full h-200">
                <h2 className="notreConcept text-foreground-base text-center">
                    Notre Concept
                </h2>
                <p className="text-foreground-base">
                    Du caca
                </p>
            </div>
        </section>
    );
}