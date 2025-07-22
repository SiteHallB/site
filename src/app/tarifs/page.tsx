"use client"

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import LinkedButton from "@/components/ui/linked-buttons";

gsap.registerPlugin(ScrollTrigger);

type Image = { src: string, width: number, height: number, alt: string };
type FormuleProps = 
    { aboveFold: boolean } &
    { title: string } &
    { subtitle: string } &
    { description: string } &
    { prix: number } &
    { images: Image[] } &
    { checkDescription: string[] } &
    { actionLink: string };

function Check({ text }: { text: string }) {
    return (
        <div className="flex flex-row space-x-3">
            <CheckCheck size={24} className="text-accent shrink-0 check"/>
            <p className="text-foreground-base readable">
                {text}
            </p>
        </div>
    );
}

// // ATTENTION : il faut passer au moins 2 images
// function Formule({ title, subtitle, prix, description, images, checkDescription, actionLink }: FormuleProps ) {
//     const n = images.length;

//     const imageFrame = useRef<HTMLDivElement>(null);
//     const container = useRef<HTMLDivElement>(null);
//     const imageContainers = useRef<HTMLDivElement[]>([]);
//     const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
//         if (!el || imageContainers.current.includes(el)) return;
//         imageContainers.current.splice(index, 0, el);
//     }, []);
    
//     const imageClass = (i: number): string => `image-${i}`;
//     const imageContainerClass = (i: number): string => `image-container-${i}`;
//     const imageSelector = (i: number): string => `.${imageClass(i)}`;
//     const imageContainerSelector = (i: number): string => `.${imageContainerClass(i)}`;

//     // POSSIBLEMENT PAS CLEAN
//     const screenPart = (i: number): string => {
//         const scrollHeight = window.innerHeight - (imageFrame.current?.offsetHeight ?? 0);
//         return `${Math.round( scrollHeight / window.innerHeight * 100 * (n - i - 0.5) / (n - 1))}%`;
//     }

//     useGSAP(() => {
//         const updateStacking = (i: number, direction: ("fromTop" | "fromBottom")) => {
//             for (let j = 0; j < n; j++) {
//                 imageContainers.current[j].style.zIndex = "0";
//                 if (j === i) { imageContainers.current[j].style.zIndex = "20"; }
//                 else if (j === i + 1 || j === i - 1) {
//                     const previousId =
//                         direction === "fromTop" && i !== 0 ? i - 1 :
//                         direction === "fromBottom" && i !== n - 1 ? i + 1 :
//                         null;
//                     if (j === previousId) imageContainers.current[j].style.zIndex = "10";
//                 }
//                 imageContainers.current[j].style.filter = j === i ? "grayscale(0%)" : "grayscale(60%)";
//             }
//         }

//         images.forEach((el, i) => {
//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: imageFrame.current, 
//                     start: () => `top ${screenPart(i)}`, 
//                     end: () => `top ${screenPart(i+1)}`, 
//                     toggleActions:  `${i !== 0 ? "restart" : "none"} none ${i !== n - 1 ? "restart" : "none"} none`, 
//                     onEnter: () => updateStacking(i, "fromTop"),
//                     onEnterBack: () => updateStacking(i, "fromBottom"),
//                 }
//             })

//             // Animation
//             tl.set(imageContainerSelector(i), {
//                 scale: 0.4, 
//                 rotation: 15, 
//             })
//             .set(imageSelector(i), {
//                 scale: 1.5, 
//                 rotation: -10, 
//             })
//             .to(imageContainerSelector(i), {
//                 duration: 1, 
//                 scale: 1, 
//                 rotation: 0, 
//                 ease: "power4.out"
//             })
//             .to(imageSelector(i), {
//                 duration: 0.7, 
//                 scale: 1, 
//                 rotation: 0, 
//                 ease: "power4.out"
//             }, "<")
//         }, { scope: imageFrame })
//     })

//     // Check animation
//     useGSAP(() => {
//         gsap.to(".check", {
//             scale: 1.4, 
//             ease: "power3.out", 
//             stagger: {
//                 each: 0.5, 
//                 repeat: 1, 
//                 yoyo: true, 
//                 yoyoEase: "power1.out", 
//             }, 
//             scrollTrigger: {
//                 trigger: ".check-holder", 
//                 start: "center 80%", 
//             }
//         })
//     }, { scope: container })

//     return (
//         <div ref={container} className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around space-y-5">
//             {/* Prix */}
//             <div className="px-2 font-futuretense flex items-center justify-center absolute left-[-0.5rem] top-[-0.9rem] rounded-xs bg-accent">
//                 <p className="text-base">{prix}€<span className="text-[0.7rem]">/mois</span></p>
//             </div>

//             {/* Titre */}
//             <div className="mb-auto flex flex-col items-center">
//                 <h2 className="title text-foreground-base">{title}</h2>
//                 <p className="text-foreground-subdued mb-4 subtitle">{subtitle}</p>
//             </div>

//             {/* Description */}
//             <p className="text-foreground-base mb-4 readable mr-auto">{description}</p>

//             {/* Images */}
//             <div
//                 ref={imageFrame}
//                 className="relative w-full h-full rounded-xl overflow-hidden"
//             >
//                 {images.map((image, i) => (
//                     <div
//                         key={i}
//                         ref={el => { addToRefs(el, i); }}
//                         className={`absolute m-auto inset-0 rounded-xl flex overflow-hidden ${imageContainerClass(i)} ${i == 0 ? "z-10" : "z-0"}`}
//                     >
//                         <Image 
//                             src={image.src}
//                             width={image.width}
//                             height={image.height}
//                             className={`object-cover ${imageClass(i)}`}
//                             alt={image.alt}
//                         />
//                     </div> 
//                 ))}            
//             </div>

//             {/* Check description */}
//             <div className="flex flex-col space-y-2 check-holder">
//                 {checkDescription.map((el, i) => (
//                     <Check 
//                         key={i}
//                         text={el}
//                     />
//                 ))}
//             </div>

//             {/* Bouton */}
//             <LinkedButton mode={{src: actionLink}} text={`S'abonner pour ${prix}€ par mois`} className="text-xl font-futuretense" color="accent" variant="adaptable"/>
//         </div>
//     );
// }






type From = { previous: number, current: number}

import { useState } from "react";

function Formule({ aboveFold, title, subtitle, prix, description, images, checkDescription, actionLink }: FormuleProps ) {
    const container = useRef<HTMLDivElement>(null);
    const imageFrame = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLDivElement[]>([]);
    const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
        if (!el || imageRefs.current.includes(el)) return;
        imageRefs.current.splice(index, 0, el);
    }, []);

    const nbImages = images.length;
    const [fromImage, setFromImage] = useState<From>({ previous: -1, current: 0});

    // POSSIBLEMENT PAS CLEAN
    const screenPart = (i: number): string => {
        const scrollHeight = window.innerHeight - (imageFrame.current?.offsetHeight ?? 0);
        return `${Math.round( scrollHeight / window.innerHeight * 100 * (nbImages - i - 0.5) / (nbImages - 1))}%`;
    }
    
    useGSAP(() => {
        images.forEach((_, index) => {
            ScrollTrigger.create({
                trigger: imageFrame.current, 
                start: () => `top ${screenPart(index)}`, 
                end: () => `top ${screenPart(index + 1)}`, 
                onEnter: () => {
                    setFromImage({ previous: index - 1, current: index })
                }, 
                onEnterBack: () => {
                    setFromImage({ previous: index + 1, current: index })
                }, 
            })
        })
    }, { scope: container })

    useGSAP(() => {
        const current = imageRefs.current[fromImage.current]
        if (fromImage.previous === -1 || fromImage.previous == nbImages) {
            gsap.set(current, {
                autoAlpha: 1, 
                zIndex: 10, 
            })
            return;
        }
        const previous = imageRefs.current[fromImage.previous]

        gsap.timeline()
        .set(previous, {
            zIndex: 0, 
            autoAlpha: 1, 
            filter: "grayscale(50%)",
        })
        .set(current, {
            autoAlpha: 1, 
            scale: 0.5, 
            zIndex: 10, 
            rotate: 6
        }, ">")
        .to(current, {
            scale: 1, 
            rotate: 0, 
            ease: "power2.out"
        }, ">")
        .set(previous, {
            autoAlpha: 1, 
            filter: "grayscale(0%)"
        }, ">")
    }, { dependencies: [fromImage], scope: container })

    // Check animation
    useGSAP(() => {
        gsap.to(".check", {
            scale: 1.6, 
            ease: "power3.out", 
            stagger: {
                each: 0.5, 
                repeat: 1, 
                yoyo: true, 
                yoyoEase: "power1.out", 
            }, 
            scrollTrigger: {
                trigger: ".check-holder", 
                start: "center 70%", 
            }
        })
    }, { scope: container })

    return (
        <div ref={container} className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around space-y-5">
            {/* Prix */}
            <div className="px-2 font-futuretense flex items-center justify-center absolute left-[-0.5rem] top-[-0.9rem] rounded-xs bg-accent">
                <p className="text-base">{prix}€<span className="text-[0.7rem]">/mois</span></p>
            </div>

            {/* Titre */}
            <div className="mb-auto flex flex-col items-center">
                <h2 className="title text-foreground-base">{title}</h2>
                <p className="text-foreground-subdued mb-4 subtitle">{subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-foreground-base mb-4 readable mr-auto">{description}</p>

            {/* Images */}
            <div ref={imageFrame} className="relative size-full rounded-xl overflow-hidden outline-foreground-subdued outline-1">
                <div className="absolute size-full rounded-xl overflow-hidden">
                    <Image 
                        src={images[0].src}
                        width={images[0].width}
                        height={images[0].height}
                        className="object-cover object-center size-full"
                        alt={images[0].alt}
                        priority={aboveFold}
                    />
                </div>
                {images.map((el, index) => (
                    <div key={index} className="invisible absolute size-full rounded-xl overflow-hidden" ref={el => { addToRefs(el, index); }}>
                        <Image 
                            src={el.src}
                            width={el.width}
                            height={el.height}
                            className="object-cover object-center size-full"
                            alt={el.alt}
                            priority={aboveFold}
                        />
                    </div>
                ))}    
            </div>

            {/* Check description */}
            <div className="flex flex-col space-y-2 check-holder">
                {checkDescription.map((el, i) => (
                    <Check 
                        key={i}
                        text={el}
                    />
                ))}
            </div>

            {/* Bouton */}
            <LinkedButton mode={{src: actionLink}} text={`S'abonner pour ${prix}€ par mois`} className="text-xl font-futuretense" color="accent" variant="adaptable"/>
        </div>
    );
}



export default function Page() {
    return (
        <main className="bg-background-base w-full px-content">
        <div className="pt-20 pb-10 flex flex-col w-full space-y-10 items-center">
            {/* Titre */}
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-foreground-base title">Tarifs</h1>
                <p className="text-foreground-subdued readable">
                    Choisissez la formule adaptée à vos besoins
                </p>
            </div>
            
            <Formule 
                aboveFold={true}
                title="Classic"
                subtitle="Muscu & Cardio accès libre"
                prix={40}
                description="Blabla"
                images={[
                    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                ]}
                checkDescription={[
                    "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                    "Autre truc à dire", 
                    "Encore un"
                ]}
                actionLink=""
            />

            <Formule 
                aboveFold={false}
                title="Boost"
                subtitle="Classic + Cours collectifs"
                prix={50}
                description="Blabla"
                images={[
                    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                ]}
                checkDescription={[
                    "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                    "Autre truc à dire", 
                    "Encore un"
                ]}
                actionLink=""
            />

            <p className="explanation text-foreground-subdued text-center">
                Explication possiblement détaillée sur comment les abonnements marchent
            </p>
        </div>
        </main>
    );
}