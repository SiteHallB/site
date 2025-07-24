"use client"

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText)

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function TextReveal({ text }: { text: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const split = new SplitText(".split", {
            type: "lines"
        });

        const scrollTriggerConfig = {
            trigger: ".image-container", 
            start: "top 40%", 
            end: "top 40%", 
            toggleActions: "play none reverse none", 
        }
        gsap.timeline({ scrollTrigger: {...scrollTriggerConfig }})
        .to(".image-1", {
            xPercent: -65, 
            yPercent: -13, 
            duration: 0.4, 
            rotate: 3, 
            ease: "power3.inOut", 
        })
        .to(".image-2", {
            delay: 0.1, 
            xPercent: 65, 
            yPercent: -10, 
            duration: 0.3, 
            rotate: -4, 
            ease: "power2.inOut", 
        }, "<")
        .from(split.lines, {
            stagger: 0.07, 
            y: 40, 
            autoAlpha: 0, 
            ease: "back.out", 
            delay: -0.2
        }, ">")
    }, { scope: container })

    return (
        <div ref={container} className="relative">
            <div className="image-container flex flex-row size-auto space-x-2">
            <div className="image-1 overflow-hidden size-[45vw] rounded-sm image z-10">
                <Image 
                    src={images[0].src}
                    width={images[0].width}
                    height={images[0].height}
                    className="object-cover object-center size-full"
                    alt={images[0].alt}
                />
            </div>
            <div className="image-2 overflow-hidden size-[45vw] rounded-sm image z-10">
                <Image 
                    src={images[1].src}
                    width={images[1].width}
                    height={images[1].height}
                    className="object-cover object-center size-full"
                    alt={images[1].alt}
                />
            </div>
            </div>
            <div className="px-15 top-[-35px] absolute inset-0 flex items-center readable text-foreground-subdued">
                <p className="split">
                    {text}
                </p>
            </div>
        </div>
    );
}

export default function Histoire() {
    return (
        <section className="bg-background-base relative h-auto top-[-600px] bottom-0 text-white w-full text-center title-small flex flex-col space-y-18 items-center overflow-hidden">
            <h2 className="mb-10">Notre histoire</h2>
            <TextReveal
                text={<>Fiers enfants de la <span className="text-accent">Vaunage</span>, nous voulions offrir à la région un espace sportif indépendant, chaleureux et exigeant.</>}
            />
            <TextReveal
                text={<>
            Sous l'impulsion de <span className="text-accent">Bastien Boisseau</span>, coach passionné, nous avons transformé l'ancienne structure : adieu les terrains de foot en salle, place à un vaste plateau entièrement rénové, pensé dans les moindres détails pour <span className="text-accent">VOUS</span>.
                </>}
            />
            <TextReveal
                text={<>
            Ici, aucun badge anonyme : chaque adhérent est un projet, un visage, une ambition que nous prenons plaisir à accompagner.
                </>}
            />
        </section>
    );
}