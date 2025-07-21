"use client"

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Image = { src: string, width: number, height: number, alt: string };
type FormuleProps = { images: Image[] };

function Formule({ images }: FormuleProps ) {
    const n = images.length;

    const imageFrame = useRef<HTMLDivElement>(null);
    const imageContainers = useRef<HTMLDivElement[]>([]);
    const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
        if (!el || imageContainers.current.includes(el)) return;
        imageContainers.current.splice(index, 0, el);
    }, []);
    
    const imageClass = (i: number): string => `image-${i}`;
    const imageContainerClass = (i: number): string => `image-container-${i}`;
    const imageSelector = (i: number): string => `.${imageClass(i)}`;
    const imageContainerSelector = (i: number): string => `.${imageContainerClass(i)}`;

    // POSSIBLEMENT PAS CLEAN
    const screenPart = (i: number): string => {
        const scrollHeight = window.innerHeight - (imageFrame.current?.offsetHeight ?? 0);
        return `${Math.round( scrollHeight / window.innerHeight * 100 * (n - 1 - i) / (n - 2))}%`;
    }

    useGSAP(() => {
        const updateStacking = (i: number, direction: ("fromTop" | "fromBottom")) => {
            for (let j = 0; j < n; j++) {
                imageContainers.current[j].style.zIndex = "0";
                if (j === i) { imageContainers.current[j].style.zIndex = "20"; }
                else if (j === i + 1 || j === i - 1) {
                    const previousId =
                        direction === "fromTop" && i !== 0 ? i - 1 :
                        direction === "fromBottom" && i !== n - 1 ? i + 1 :
                        null;
                    if (j === previousId) imageContainers.current[j].style.zIndex = "10";
                }
                imageContainers.current[j].style.filter = j === i ? "grayscale(0%)" : "grayscale(60%)";
            }
        }

        images.forEach((el, i) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: imageFrame.current, 
                    start: () => `top ${screenPart(i)}`, 
                    end: () => `top ${screenPart(i+1)}`, 
                    toggleActions:  `${i !== 0 ? "restart" : "none"} none ${i !== n - 1 ? "restart" : "none"} none`, 
                    onEnter: () => updateStacking(i, "fromTop"),
                    onEnterBack: () => updateStacking(i, "fromBottom"),
                }
            })

            // Animation
            tl.set(imageContainerSelector(i), {
                scale: 0.4, 
                rotation: 15, 
            })
            .set(imageSelector(i), {
                scale: 1.5, 
                rotation: -10, 
            })
            .to(imageContainerSelector(i), {
                duration: 1, 
                scale: 1, 
                rotation: 0, 
                ease: "power4.out"
            })
            .to(imageSelector(i), {
                duration: 0.7, 
                scale: 1, 
                rotation: 0, 
                ease: "power4.out"
            }, "<")
        }, { scope: imageFrame })
    })

    return (
        <div className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around space-y-5">
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
            <div
                ref={imageFrame}
                className="relative w-full h-full rounded-xl overflow-hidden"
            >
                {images.map((image, i) => (
                    <div
                        key={i}
                        ref={el => { addToRefs(el, i); }}
                        className={`absolute m-auto inset-0 rounded-xl flex overflow-hidden ${imageContainerClass(i)} ${i == 0 ? "z-10" : "z-0"}`}
                    >
                        <Image 
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            className={`object-cover ${imageClass(i)}`}
                            alt={image.alt}
                        />
                    </div> 
                ))}            
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
                <Formule images={[
                    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                ]}/>

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