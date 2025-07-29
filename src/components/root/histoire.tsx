import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";


const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

export default function Histoire() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Pin titre
        ScrollTrigger.create({
            trigger: ".scrollSection", 
            endTrigger: ".descriptionText", 
            pin: ".notreHistoire", 
            pinSpacing: false, 
            start: () => "top top+=55", 
            end: () => "top top+=140", 
            anticipatePin: 1, 
        })

        // Entre dans l'image et fait apparaitre le texte dessous
        gsap.timeline({
            scrollTrigger: {
                trigger: ".imageClip", 
                start: () => "top 30%", 
                end: () => "top top", 
                pinSpacing: true, 
                scrub: true, 
            }
        })
        .to(".imageClip", {
            width: () => "100%", 
            height: () => "100%", 
            borderRadius: 0
        })
        .to(".descriptionText", {
            autoAlpha: 1, 
            ease: "power4.in"
        }, "<")
        .to(".fadeText", {
            autoAlpha: 0, 
            ease: "power3.out"
        }, "<")
    }, { scope: container })

    return (
        <section ref={container} id="histoire" className="bg-background-base pb-subSection">
            <div className="scrollSection w-full flex flex-col items-center">
                <h2 className="z-10 notreHistoire text-foreground-base text-center mb-subTitle">
                    Notre Histoire
                </h2>
                <p className="fadeText text-foreground-subdued px-content lg:px-contentLg mb-content">
                    Fiers enfants de la <span className="text-accent">Vaunage</span>, nous voulions offrir à la région un espace sportif indépendant, chaleureux et exigeant.
                </p>
                {/* Image */}
                <div className="relative w-full h-[80vh] flexCenter mb-25 overflow-hidden">
                    <div
                        className="imageClip absolute top-0 overflow-hidden rounded-3xl size-[40vh]"
                        style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
                    >
                        <Image 
                            src={images[0].src}
                            width={images[0].width}
                            height={images[0].height}
                            className="absolute left-0 top-0 size-full object-cover"
                            alt={images[0].alt}
                        />
                    </div>
                </div>
                <span className="descriptionText px-content lg:px-contentLg">
                    <p className="text-foreground-base textSubH2 mb-1">Nouveauté</p>
                    <p className="text-foreground-subdued mb-content">
                        Sous l'impulsion de <span className="text-accent">Bastien Boisseau</span>, coach passionné, nous avons transformé l'ancienne structure : adieu les terrains de foot en salle, place à un vaste plateau entièrement rénové, pensé dans les moindres détails pour <span className="text-accent">VOUS</span>.
                    </p>
                    <p className="text-foreground-subdued">Ici, aucun badge anonyme : chaque adhérent est un projet, un visage, une ambition que nous prenons plaisir à accompagner.</p>
                </span>
            </div>
        </section>
    );
}