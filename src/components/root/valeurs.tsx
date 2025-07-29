import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

type Image = { src: string, width: number, height: number, alt: string };

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

function Cadre({ image }: { image: Image }) {
    return (
        <div className="image overflow-hidden size-[25vw] shrink-0">
            <Image 
                src={image.src}
                width={image.width}
                height={image.height}
                className="object-cover object-center size-full"
                alt={image.alt}
            />
        </div>
    );
}

export default function Valeurs() {
    const container = useRef<HTMLDivElement>(null);

    // Pin haut
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".pinTitle", 
            endTrigger: ".lowTransition", 
            pin: ".pinTitle", 
            pinSpacing: false, 
            start: () => "top top", 
            end: () => "bottom bottom", 
            anticipatePin: 1
        })
    }, { scope: container })

    // Grossit images
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".imagesContainer", 
                start: () => "top center", 
                end: () => "bottom center",  
                scrub: true
            }
        })
        .set(".textContainer", {
            autoAlpha: 0
        })
        .set(".textContainer", {
            autoAlpha: 1
        }, "+=0.1")

        tl.set(".scrollText", {
            yPercent: -150, 
        }, "<")
        tl.to(".scrollText", {
            stagger: { 
                amount: 1, 
                ease: "slow(0.9,1,false)"
            }, 
            duration: 1, 
            yPercent: 150, 
        }, "<")
        tl.set(".textContainer", {
            autoAlpha: 0
        }, ">")
    }, { scope: container })

    return (
        <section ref={container} id="valeurs" className="w-full bg-background-subdued flex flex-col items-center">
            <div className="z-10 pinTitle bg-background-base relative w-full pt-subMenu">
                <h2 className="text-foreground-base text-center pb-subTitle">
                    Nos valeurs
                </h2>
                <div className="absolute bottom-[-50px] bg-gradient-to-b from-background-base to-transparent w-full h-[50px]"/> 
            </div>

            {/* Images */}
            <div className="imagesContainer flex flex-col gap-y-[2vw]">
                {[...Array(9)].map((_, i) => (
                    <Cadre key={i} image={images[i % 3]} />
                ))}
            </div>

            {/* Transition basse */}
            <div className="lowTransition relative w-full">
                <div className="absolute top-[-50px] bg-gradient-to-t from-background-base to-transparent w-full h-[50px]"/> 
                <div className="bg-background-base w-full h-[50px]"/>
            </div>
            <div className="w-full bg-background-base">
                <p className="text-foreground-subdued pb-subSection text-center">Du texte pour la transition</p>
            </div>

            {/* Texte */}
            <div className="textContainer invisible fixed inset-0 z-20 flexCenter">
                <div className="relative w-full flexCenter overflow-hidden py-content">
                    <h3 className="scrollText text-foreground-base">Convivialité</h3>
                    <h3 className="absolute scrollText text-foreground-base">Entraide</h3>
                    <h3 className="absolute scrollText text-foreground-base">Accompagnement</h3>
                </div>
            </div>
        </section>
    );
}