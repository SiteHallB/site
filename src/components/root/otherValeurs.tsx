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
        <div className="imageFrame overflow-hidden size-25 shrink-0">
            <Image 
                src={image.src}
                width={image.width}
                height={image.height}
                className="opacity-0 image object-cover object-center size-full"
                alt={image.alt}
            />
        </div>
    );
}

export default function Valeurs() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Pin titre et transitions
        ScrollTrigger.create({
            trigger: ".scrollSection", 
            endTrigger: ".images", 
            pin: ".transition", 
            pinSpacing: false, 
            start: () => "top top+=55", 
            end: () => "bottom bottom", 
            anticipatePin: 1, 
        })

        // Agrandi images pret du centre
        gsap.utils.toArray<HTMLElement>('.imageFrame').forEach((el, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: el, 
                    start: "center center+=150", 
                    end: "center center-=150", 
                    scrub: true, 
                    markers: true
                }
            })
            .to(el, {
                autoAlpha: 1, 
                duration: 0.1
            })
            .to(el, {
                scale: 1.1, 
                yoyo: true, 
                repeat: 1, 
                ease: "power1.out", 
                duration: 5
            })
            .to(el, {
                autoAlpha: 0, 
                duration: 0.1
            })
        })
    }, { scope: container })

    return (
        <section ref={container} id="valeurs" className="w-full bg-background-base pb-subSection">
            <div className="relative scrollSection w-full flex flex-col items-center">
                <span className="transition">
                <h2 className="z-20 nosValeurs text-foreground-base text-center mb-subTitle px-content">
                    Nos Valeurs
                </h2>
                {/* Dégradé haut */}
                <div className="z-20 bg-gradient-to-b from-background-base to-transparent w-full h-[50px]"/>
                <div className="bg-background-subdued w-full h-[50vh]">
                    <div className="images relative top-0 z-10 w-full flex flex-col space-y-3 items-center">
                        {[...Array(9)].map((_, i) => (
                            <Cadre key={i} image={images[i % 3]} />
                        ))}
                    </div>
                </div>
                <div className="z-20 bg-gradient-to-t from-background-base to-transparent w-full h-[50px]"/>
                </span>
            </div>

            
            
            
            
{/*             
            <div className="relative inset-x-0 top-[-1px]">
                <div className="sticky top-0 w-full z-20 flex flex-col space-y-[-1px]">
                    <div className="bg-background-base w-full h-[70px]"/>
                    <h2 id="title-valeurs" className="text-center text-foreground-base w-full bg-background-base pb-10">
                        Nos Valeurs
                    </h2>
                    <div className="bg-gradient-to-b from-background-base to-transparent w-full h-[50px]"/> 
                </div>
                <div className="scroll-section w-full flex flex-col space-y-3 items-center bg-background-subdued pt-20">
                    {[...Array(9)].map((_, i) => (
                        <Cadre key={i} image={images[i % 3]} />
                    ))}
                </div>
            </div> */}
        </section>
    );
}