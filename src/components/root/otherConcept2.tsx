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

function Section({ last, title, text }: { last: boolean; title: string; text: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Fait disparaitre le texte haut
        if (last) return;
        gsap.to(".fadeText", {
            scrollTrigger: {
                trigger: ".fadeText", 
                start: "top 20%", 
                end: "top 10%", 
                scrub: true, 
            }, 
            autoAlpha: 0, 
            ease: "power3.out"
        })
    }, {scope: container })

    return (
        <span ref={container} className="w-full flex flex-col items-center">
            {/* Image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-content">
                <Image 
                    src={images[0].src}
                    width={images[0].width}
                    height={images[0].height}
                    className="object-cover object-center size-full"
                    alt={images[0].alt}
                />
            </div>

            {/* Texte */}
            <span className={`${last ? "" : "fadeText"}`}>
            <p className="text-foreground-base textSubH2 mb-1">{title}</p>
            <p className="text-foreground-subdued">{text}</p>
            </span>
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
            endTrigger: ".lastSection", 
            pin: ".notreConcept", 
            pinSpacing: false, 
            start: () => "top top+=55", 
            end: () => "top top+=150", 
            anticipatePin: 1, 
        })
    }, { scope: container })
    
    return (
        <section ref={container} id="concept" className="w-full bg-background-base px-content pb-subSection">
            <div className="scrollSection w-full flex flex-col space-y-10">
                <h2 className="z-30 notreConcept text-foreground-base text-center mb-subTitle">
                    Notre Concept
                </h2>
                <Section
                    last={false}
                    title="Possibilités"
                    text={<>Nombreuses activités, musculation cours collectifs et smallgroups avec coach diplômé, squash, danse, Pôle Aqua et pôle santé avec notre ostéopathe.</>}
                />
                <Section
                    last={false}
                    title="Programmes"
                    text={<>Cours collectifs, smallgroups, et cours aquatiques en illimité toute la semaine pour les formules associées.<br/>
                    Nous tenons à ce que chaque adhérent qui visite la salle ne veuille plus en partir.</>}
                />
                <Section
                    last={false}
                    title="Accompagnement"
                    text={<>Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant.</>}
                />
                <span className="lastSection">
                <Section
                    last={true}
                    title="Haut de gamme"
                    text={<>Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.</>}
                />
                </span>
            </div>
        </section>
    );
}