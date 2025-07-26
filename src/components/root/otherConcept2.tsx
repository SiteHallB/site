import Image from "next/image";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);


const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function Section({ type, text }: { type: "left" | "right"; text: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    const t = <p className="text-foreground-subdued">{text}</p>

    return (
        <span ref={container} className="w-full flex flex-col space-y-2">
            {/* Image */}
            <div className="w-full h-50 image rounded-xl overflow-hidden">
                <Image 
                    src={images[0].src}
                    width={images[0].width}
                    height={images[0].height}
                    className="object-cover object-center size-full"
                    alt={images[0].alt}
                />
            </div>

            {/* Texte */}
            <div className="z-10 bg-background-highlight w-full p-contentClose rounded-xl flex flex-row gap-x-contentClose">
                {type === "right" && t}
                {/* Image avec le texte */}
                <div className={`size-34 rounded-xl overflow-hidden shrink-0 ${type === "right" ? "ml-auto" : "mr-auto"}`}>
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
        </span>
    );
}

export default function Concept() {
    const container = useRef<HTMLDivElement>(null)

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
            <div className="scrollSection w-full flex flex-col space-y-10">
                <h2 className="z-30 notreConcept text-foreground-base text-center mb-30">
                    Notre Concept
                </h2>
                <Section
                    type="right"
                    text={<>Nombreuses activités, musculation cours collectifs et smallgroups avec coach diplômé, squash, danse, Pôle Aqua et pôle santé avec notre ostéopathe.</>}
                />
                <Section
                    type="left"
                    text={<>Cours collectifs, smallgroups, et cours aquatiques en illimité toute la semaine pour les formules associées.<br/>
                    Nous tenons à ce que chaque adhérent qui visite la salle ne veuille plus en partir.</>}
                />
                <Section
                    type="right"
                    text={<>Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant.</>}
                />
                <Section
                    type="left"
                    text={<>Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.</>}
                />
            </div>
        </section>
    );
}