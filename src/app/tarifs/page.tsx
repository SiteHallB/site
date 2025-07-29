// "use client"

// import { CheckCheck } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, A11y } from "swiper/modules";
// import Clickable from "@/components/ui/clickable";

// import type { Swiper as SwiperInstance } from "swiper";

// import 'swiper/css';
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import clsx from "clsx";

// gsap.registerPlugin(ScrollTrigger);

// type Image = { src: string, width: number, height: number, alt: string };
// type FormuleProps = 
//     { aboveFold: boolean } &
//     { title: string } &
//     { subtitle: string } &
//     { description: string } &
//     { prix: number } &
//     { images: Image[] } &
//     { checkDescription: string[] } &
//     { actionLink: string } &
//     { className?: string };

// function Check({ text }: { text: string }) {
//     return (
//         <div className="flex flex-row space-x-3">
//             <CheckCheck size={24} className="text-accent shrink-0 check"/>
//             <p className="text-foreground-base">
//                 {text}
//             </p>
//         </div>
//     );
// }

// function Formule({ aboveFold, title, subtitle, prix, description, images, checkDescription, actionLink, className }: FormuleProps ) {
//     const container = useRef<HTMLDivElement>(null);
//     const swiperRef = useRef<SwiperInstance>(null);
//     const intervalRef = useRef<number>(0);

//     const tick = () => {
//         console.log("Tick @", new Date().toLocaleTimeString());
//         // … votre logique ici …
//     };

//     //🔄 Lance (ou relance) le timer
//     const startTimer = () => {
//         // si un ancien timer existe, on l'arrête
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }
//         // on démarre un nouvel intervalle à 5 000 ms
//         intervalRef.current = window.setInterval(tick, 3000);
//     };

//     //🚪 Au montage du composant, on démarre le timer
//     useEffect(() => {
//         startTimer();
//         // au démontage, on nettoie
//         return () => {
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }
//         };
//     }, []);
    
//      // Check animation
//     useGSAP(() => {
//         gsap.to(".check", {
//             scale: 1.6, 
//             ease: "power3.out", 
//             stagger: {
//                 each: 0.5, 
//                 repeat: 1, 
//                 yoyo: true, 
//                 yoyoEase: "power1.out", 
//             }, 
//             scrollTrigger: {
//                 trigger: ".check-holder", 
//                 start: "top 70%", 
//                 end: "bottom 50%", 
//                 toggleActions: "play reset play reset"
//             }
//         })
//     }, { scope: container })



//     return (
//         <div ref={container} className={clsx(className, "relative max-w-120 w-full flex flex-col bg-background-highlight rounded-xl px-contentClose lg:px-content py-content items-center justify-around space-y-content")}>
//             {/* Prix */}
//             <div className="px-contentClose flex items-center justify-center absolute left-[-0.5rem] lg:left-[-1rem] top-[-1.5rem] lg:top-[-3rem] rounded-xs bg-accent">
//                 <p className="textLeadBig">{prix}€<span className="textSmall">/mois</span></p>
//             </div>

//             {/* Titre */}
//             <div className="flex flex-col items-center w-full text-center">
//                 <h2 className="text-foreground-base">{title}</h2>
//                 <p className="textSubH2 text-foreground-subdued">{subtitle}</p>
//             </div>

//             {/* Description */}
//             <p className="text-foreground-base mb-4 mr-auto">{description}</p>

//             {/* Images */}
//             <Swiper
//                 onSwiper={(swiper) => {
//                     swiperRef.current = swiper;
//                 }}
//                 onSlideChange={startTimer}
//                 className="
//                     w-full h-[30vh]
//                     [&_.swiper-button-prev]:text-accent 
//                     [&_.swiper-button-next]:text-accent
//                     [&_.swiper-pagination-bullet]:bg-black
//                     [&_.swiper-pagination-bullet-active]:bg-accent 
//                 "
//                 modules={[Navigation, Pagination, A11y]}
//                 spaceBetween={-50}
//                 slidesPerView={1.3}
//                 centeredSlides
//                 navigation
//                 pagination={{ clickable: true }}
//             >
//                 {images.map((el, index) => (
//                     <SwiperSlide
//                         key={index}
//                         className="select-none overflow-hidden rounded-xl transition-all duration-300 ease-in-out swiper-slide-custom"
//                     >
//                         <img
//                             src={el.src}
//                             className="w-full h-full object-cover object-center"
//                             alt=""
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
            
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
//             <Clickable
//                 clickableType={{type:"link", onClick: () => 0, path: actionLink}}
//                 style={{variant: "action", color: "accent"}}
//             >
//                 Je m'abonne
//             </Clickable>
//         </div>
//     );
// }



// export default function Page() {
//     return (
//         <main className="bg-background-base w-full px-content pt-subMenu pb-content lg:pb-contentLg">
//             {/* Titre */}
//             <div className="flex flex-col items-center space-y-2 mb-subTitle lg:mb-subTitleLg">
//                 <h1 className="text-foreground-base">Tarifs</h1>
//                 <p className="text-foreground-subdued">
//                     Choisissez la formule adaptée à vos besoins
//                 </p>
//             </div>
            
//             {/* Formules */}
//             <div className="flex flex-wrap justify-center gap-12 lg:gap-contentLg mb-content lg:mb-contentLg">
//             <Formule 
//                 aboveFold={true}
//                 title="Classic"
//                 subtitle="Muscu & Cardio accès libre"
//                 prix={40}
//                 description="Blabla"
//                 images={[
//                     { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
//                 ]}
//                 checkDescription={[
//                     "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
//                     "Autre truc à dire", 
//                     "Encore un"
//                 ]}
//                 actionLink=""
//             />

//             <Formule 
//                 aboveFold={false}
//                 title="Boost"
//                 subtitle="Classic + Cours collectifs"
//                 prix={50}
//                 description="Blabla"
//                 images={[
//                     { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
//                 ]}
//                 checkDescription={[
//                     "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
//                     "Autre truc à dire", 
//                     "Encore un"
//                 ]}
//                 actionLink=""
//             />

//             <Formule 
//                 aboveFold={false}
//                 title="Aqua"
//                 subtitle="Classic + Aqua"
//                 prix={75}
//                 description="Blabla"
//                 images={[
//                     { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
//                 ]}
//                 checkDescription={[
//                     "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
//                     "Autre truc à dire", 
//                 ]}
//                 actionLink=""
//             />

//             <Formule 
//                 aboveFold={false}
//                 title="Aqua"
//                 subtitle="Classic + Aqua"
//                 prix={75}
//                 description="Blabla"
//                 images={[
//                     { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
//                 ]}
//                 checkDescription={[
//                     "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
//                     "Autre truc à dire", 
//                     "Encore un"
//                 ]}
//                 actionLink=""
//             />

//             <Formule 
//                 aboveFold={false}
//                 title="Aqua"
//                 subtitle="Classic + Aqua"
//                 prix={75}
//                 description="Blabla"
//                 images={[
//                     { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
//                     { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
//                 ]}
//                 checkDescription={[
//                     "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
//                     "Autre truc à dire", 
//                     "Encore un"
//                 ]}
//                 actionLink=""
//                 className=""
//             />
//             </div>

//             <p className="textSmall text-foreground-subdued text-center">
//                 Explication possiblement détaillée sur comment les abonnements marchent
//             </p>
//         </main>
//     );
// }

import SportigoFormule from "@/components/tarifs/sportigo-formule";

export default function Page() {
    return (
        <main className="bg-background-base w-full pt-subMenu px-content lg:px-contentLg pb-content lg:pb-contentLg flex flex-col space-y-10">
            {/* Titre */}
            <div className="flex flex-col items-center space-y-2 mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base">Tarifs</h1>
                <p className="text-foreground-subdued text-center">
                    Sélectionnez l'offre qui vous convient
                </p>
            </div>

            <div className="w-full overflow-x-hidden">
                <SportigoFormule/>
            </div>
        </main>
    );
}