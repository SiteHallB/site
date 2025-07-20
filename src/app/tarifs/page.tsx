"use client"

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { timeStamp } from "console";

gsap.registerPlugin(ScrollTrigger);

type Image = { src: string, width: number, height: number, alt: string };
type FormuleProps = { images: Image[] };

function Formule({ images }: FormuleProps ) {
    const n = images.length;

    const container = useRef<HTMLDivElement>(null);
    const imageFrame = useRef<HTMLDivElement>(null);
    const scrollEnter = useRef<"down" | "up">("down");

    const imageId = (i: number): string => `.image-${i}`;
    const imageContainerId = (i: number): string => `.image-container-${i}`;
    const otherImageContainerId = (i: number): string[] =>
        Array.from({ length: n }, (_, j) => j)
            .filter(j => j !== i)
            .map(imageContainerId);

    // POSSIBLEMENT PAS CLEAN
    const screenPart = (i: number): string => {
        const scrollHeight = window.innerHeight - (imageFrame.current?.offsetHeight ?? 0);
        return `${Math.round( scrollHeight / window.innerHeight / n * 100 * (n - i))}%`;
    }

    images.forEach((el, i) => {
        useGSAP(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: imageFrame.current, 
                    start: `top ${screenPart(i)}`, 
                    end: `top ${screenPart(i+1)}`, 
                    toggleActions: `${i !== 0 ? "restart" : "none"} none ${i !== n - 1 ? "restart" : "none"} none`, 
                    onEnter: () => (scrollEnter.current = "down"),
                    onEnterBack: () => (scrollEnter.current = "up"),
                }
            })

            // Mettre le container i au dessus du précédent (grisé) qui sera au dessus des autres
            otherImageContainerId(i).forEach((id, _) => {
                tl.set(id, {
                    zIndex: 0, 
                })
            })
            tl.set(imageContainerId(i), {
                zIndex: 20, 
                filter: "grayscale(0%)", 
            })
            const previousId = scrollEnter.current === "down" && i !== 0 ? i - 1
                : scrollEnter.current === "up" && i !== n - 1 ? i + 1
                : null;
            if (previousId !== null) {
                tl.set(imageContainerId(previousId), {
                    zIndex: 10, 
                    filter: "grayscale(60%)", 
                })
            }

            // Animation
            tl.set(imageContainerId(i), {
                scale: 0.4, 
                rotation: 15, 
                delay: i
            })
            .set(imageId(i), {
                scale: 1.5, 
                rotation: -10, 
            })
            .to(imageContainerId(i), {
                duration: 1.5, 
                scale: 1, 
                rotation: 0, 
                ease: "power4.out"
            })
            .to(imageId(i), {
                duration: 1.2, 
                scale: 1, 
                rotation: 0, 
                ease: "power4.out"
            }, "<")
        }, { scope: container })
    })

    return (
        <div
            ref={container}
            className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around space-y-5"
        >
            {/* Prix */}
            <div className="px-2 font-futuretense flex items-center justify-center absolute left-[-0.5rem] top-[-0.9rem] rounded-xs bg-accent">
                <p className="text-base">40€<span className="text-[0.7rem]">/mois</span></p>
            </div>

            {/* Titre */}
            <div className="mb-auto flex flex-col items-center">
                <h2 className="title text-foreground-base mx-auto">
                    Classic
                </h2>
                <p className="text-foreground-subdued mb-4 subtitle">
                    Muscu & Cardio accès libre
                </p>
            </div>

            {/* Images */}
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                {images.map((image, i) => (
                    <div className={`absolute m-auto inset-0 rounded-xl flex overflow-hidden `"}>
                        <Image 
                            src="/images/concept.jpg"
                            width={3024}
                            height={4032}
                            className="object-cover image"
                            alt=""
                        />
                    </div> 
                ))}




                <Image 
                    src="/images/valeurs.jpg"
                    width={3024}
                    height={4032}
                    className="object-cover absolute inset-0 m-auto image-base"
                    alt=""
                />
                <div className="opacity-0 z-10 absolute m-auto inset-0 rounded-xl flex overflow-hidden image-container">
                    <Image 
                        src="/images/concept.jpg"
                        width={3024}
                        height={4032}
                        className="object-cover image"
                        alt=""
                    />
                </div> 
                <div className="opacity-0 z-10 absolute m-auto inset-0 rounded-xl flex overflow-hidden image-container">
                    <Image 
                        src="/images/histoire.jpg"
                        width={3024}
                        height={4032}
                        className="object-cover image"
                        alt=""
                    />
                </div> 
               
            
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-3">
                    <CheckCheck size={24} className="text-accent shrink-0"/>
                    <p className="text-foreground-base readable">Accès 7jours/7 de 7h à 23h au plateau muscu/cardio</p>
                </div>
                <div className="flex flex-row space-x-3">
                    <CheckCheck size={24} className="text-accent"/>
                    <p className="text-foreground-base readable">Autre truc à dire</p>
                </div>
            </div>

            {/* Bouton */}
            <div className="text-xl text-foreground-base">
                Action
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div className="bg-background-base w-full px-content">
            <div className="py-18 flex flex-col w-full space-y-5 items-center">
                <p className="mt-5 text-foreground-subdued title-long text-center">
                    Des
                    <span className="menu text-foreground-base"> tarifs</span> adaptés à tous les
                    <span className="text-foreground-base"> pratiquants</span>, tous les
                    <span className="text-foreground-base"> goûts</span> et
                    <span className="text-foreground-base"> projets</span>.
                </p>

                <p className="explanation text-foreground-subdued text-center">
                    Explication possiblement détaillée sur comment les abonnement marchent
                </p>
                <div className="h-[200px]"></div>
                <Formule/>

                {/* Exemple */}
                <div className="bg-background-highlight w-full h-[80vh] rounded-xl p-2">
                    <h2 className="title text-foreground-base">
                        Boost
                    </h2>
                </div>
            </div>
            
        </div>
    );
}