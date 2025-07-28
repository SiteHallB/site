import Image from "next/image";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/all";

import Clickable from "@/components/ui/clickable";

gsap.registerPlugin(ScrollTrigger);


const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function Section({ last, title, text, children }: { last: boolean; title: string; text: React.ReactNode; children?: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Fait disparaitre le texte haut sauf si au dessus de lg
        const mm = gsap.matchMedia();
        mm.add('(max-width: 1024px)', () => {
            if (last) return;
            gsap.to(".fadeText", {
                scrollTrigger: {
                    trigger: ".fadeText", 
                    start: () => "top 20%", 
                    end: () => "top 10%", 
                    scrub: true, 
                }, 
                autoAlpha: 0, 
                ease: "power3.out", 
            })
        })
    }, {scope: container })

    return (
        <div ref={container} className="w-full flex flex-col basis-0 grow min-w-0">
            {/* Image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                <Image 
                    src={images[0].src}
                    width={images[0].width}
                    height={images[0].height}
                    className="object-cover object-center size-full"
                    alt={images[0].alt}
                />
            </div>

            {/* Texte */}
            <div className={`${last ? "" : "fadeText"}`}>
            <p className="text-foreground-base textSubH2 mb-1 break-words">{title}</p>
            <p className="text-foreground-subdued mb-content">{text}</p>
            {children}
            </div>
        </div>
    );
}

export default function Concept() {
    const container = useRef<HTMLDivElement>(null)

    // Pin notre concept
    useGSAP(() => {
        // Pin titre sauf si on est au dessus de lg
        const mm = gsap.matchMedia();
        mm.add('(max-width: 1024px)', () => {
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
                <div className="w-full flex flex-col lg:flex-row gap-y-10 gap-x-content">
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
                >
                    <div className="w-full flex flex-wrap gap-contentClose">
                        <Clickable
                            clickableType={{type:"link", path: "/plannings"}}
                            style={{variant: "secondary", color: "primarySubdued"}}
                        >
                            Voir le planning
                        </Clickable>
                        <Clickable
                            clickableType={{type:"link", path: ""}}
                            style={{variant: "secondary", color: "primarySubdued"}}
                        >
                            Réservation Squash
                        </Clickable>
                    </div>
                </Section>
                <Section
                    last={false}
                    title="Accompagnement"
                    text={<>Tout le monde doit se sentir considéré et accompagné. Matériel sélectionné sur le volet pour satisfaire tout type de pratiquant.</>}
                />
                <span className="lastSection basis-0 grow">
                <Section
                    last={true}
                    title="Haut de gamme"
                    text={<>Poids calibrés pour la compétition, plateau d'haltérophilie, sacs de frappe pour les boxeurs, machines de musculation qualité italienne signée panatta, cardio connecté par technogym.</>}
                />
                </span>
                </div>
            </div>
        </section>
    );
}