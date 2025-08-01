import { useImage } from "@/context/image-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

export default function Histoire() {
    const container = useRef<HTMLDivElement>(null);

    const { root_histoire } = useImage();

    useGSAP(() => {
        // Entre dans l'image et fait apparaitre le texte dessous
        gsap.timeline({
            scrollTrigger: {
                trigger: ".imageClip", 
                start: () => "top 30%", 
                end: () => "top top", 
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
                <h2 className="text-foreground-base text-center mb-subTitle">
                    Notre Histoire
                </h2>
                <p className="fadeText text-foreground-subdued px-content lg:px-contentLg mb-content">
                    Fiers enfants de la <span className="text-accent">Vaunage</span>, nous voulions offrir au bassin nîmois un espace sportif indépendant, chaleureux et exigeant.
                </p>
                {/* Image */}
                <div className="relative w-full h-[80vh] flexCenter mb-content overflow-hidden">
                    <div
                        className="imageClip absolute top-0 overflow-hidden rounded-3xl size-[40vh]"
                        style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
                    >
                        <Image 
                            {...root_histoire}
                            className="absolute left-0 top-0 size-full object-cover"
                        />
                    </div>
                </div>
                <span className="descriptionText px-content lg:px-contentLg">
                    <p className="text-foreground-subdued mb-content">
                        Sous l'impulsion de <span className="text-accent">Bastien Boisseau</span>, coach passionné, nous avons transformé l'ancienne structure : adieu les terrains de foot en salle, place à un vaste plateau entièrement rénové, pensé dans les moindres détails pour <span className="text-accent">VOUS</span>.
                    </p>
                    <p className="text-foreground-subdued">Ici, aucun badge anonyme : chaque adhérent est un projet, un visage, une ambition que nous prenons plaisir à accompagner.</p>
                </span>
            </div>
        </section>
    );
}