"use client"

import "@/styles/menu.css"

import { usePathname } from 'next/navigation';

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Menu as MenuIcon, X, Instagram, Facebook, ChevronRight } from 'lucide-react';
import ScrollTrigger from "gsap/ScrollTrigger";

import Clickable from "@/components/ui/clickable";
import Reseaux from "@/components/reseaux";
import clsx from "clsx";
import { useLinks } from "@/context/link-context";

gsap.registerPlugin(ScrollTrigger);

type MenuLink = {
  path: string;
  label: string;
};

type MenuItemProps = {
  linkInfo: MenuLink;
  onClick: () => void;
};

function MenuItem({ linkInfo, onClick }: MenuItemProps) {
    const pathname = usePathname();

    return (
        <div className="menu-link-item">
            <div className="menu-link-item-holder flex flex-row items-center">
                <ChevronRight size={24} className={clsx({ "text-accent": pathname === linkInfo.path, "text-foreground-subdued": pathname !== linkInfo.path})}/>

                <Clickable
                    clickableType={{type: "link", onClick: onClick, path: linkInfo.path}}
                    style={{variant: "menuMainButton"}}
                >
                    {linkInfo.label}
                </Clickable>
            </div>
        </div>
    );
}

function MenuOverlay({ setIsMenuShown, isMenuOpen, setIsMenuOpen }: { setIsMenuShown: (value: boolean) => void; isMenuOpen: boolean; setIsMenuOpen: (value: boolean) => void }) {
    const close = () => { setIsMenuOpen(false); };
    const container = useRef<HTMLDivElement>(null);

    const { osteo } = useLinks();

    const navLinks = [
        { label: "Accueil", path: "/"}, 
        { label: "Tarifs", path: "/tarifs"}, 
        { label: "Essai offert", path: "/offert"}, 
        { label: "Plannings", path: "/plannings"}, 
        { label: "Nous contacter", path: "/contact"}, 
    ];
    
    const tl = useRef<gsap.core.Timeline | null>(null);
    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 60 });

        tl.current = gsap.timeline({ paused: true })
        .to(".menuOverlay", {
            duration: 1.25, 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
            y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power4.inOut", 
            delay: -1, 
        })

        tl.current.duration(1);
    }, { scope: container });

    useEffect(() => {
        if(!tl.current) return;
        isMenuOpen ? tl.current.play() : tl.current.reverse().eventCallback('onReverseComplete', () => setIsMenuShown(false));
    }, [isMenuOpen]);

    return (
        <div ref={container} >
        <div className="fixed inset-0 z-40 pointer-events-auto touch-none menuOverlay">
            {/* Exterieur de l'overlay */}
            <div className="h-full w-auto" onClick={close}></div>

            {/* Vrai overlay */}
            <div className="absolute inset-y-0 right-0 w-full max-w-120 border-l-1 border-l-foreground-subdued bg-background-base flex flex-col pt-10 justify-around px-contentClose items-center transform-gpu [will-change:clip-path]">
                <nav className="flex flex-col w-full">
                    {navLinks.map((el, index) => (
                        <MenuItem linkInfo={el} onClick={close} key={index}/>
                    ))}
                </nav>
                
                <div className="flex flex-col w-full">
                    <MenuItem linkInfo={{ path: osteo, label: "Consultation Ostéopathe" }} onClick={close}/>
                    <MenuItem linkInfo={{ path: "/squash", label: "Réservation Squash" }} onClick={close}/>
                </div>
                
                <div className="relative flex overflow-hidden w-full max-w-100 h-50">
                    <div className="absolute inset-y-0 left-0 w-[7rem] bg-gradient-to-r from-background-base to-transparent z-10"/>
                    <div className="absolute inset-y-0 right-0 w-[7rem] bg-gradient-to-l from-background-base to-transparent z-10"/>
                    <Image 
                        src="/images/concept.jpg"
                        width={3024}
                        height={4032}
                        className="object-cover"
                        alt=""
                    />
                </div> 

                <Reseaux/>
            </div>
        </div>
        </div>
    );
}

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) setIsMenuShown(true);
    };

    return (
        <section id="menu">
            {/* Barre de navigation */}
            <nav className="fixed right-0 w-full max-w-120 z-50 py-content px-contentClose flex justify-around items-center lg:px-8 py-1 nav-bar space-x-2">
                <Clickable
                    clickableType={{type: "link", onClick: () => setIsMenuOpen(false), path: "/offert"}}
                    style={{variant: "navigationBar", color: "primary"}}
                >
                    Essai Offert
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => setIsMenuOpen(false), path: "/tarifs"}}
                    style={{variant: "navigationBar", color: "accent"}}
                    trackingConfig={{
                        action: "bouton_click", 
                        category: "interaction", 
                        label: "je m'inscris - barre de navigation"
                    }}
                >
                    Je m'inscris
                </Clickable>
                
                {/* Bouton menu */}
                <Clickable 
                    aria-controls="menuOverlay"
                    aria-expanded={isMenuOpen}
                    aria-label="Ouvrir le menu"
                    clickableType={{type: "button", onClick: toggleMenu, htmlType: "button"}}
                    style={{}}
                >
                    {isMenuOpen ? <X className="size-6 lg:size-8 hoverRotate text-foreground-base"/> : 
                        <MenuIcon size={24} className="size-6 lg:size-8 hoverRotate text-foreground-base"/>}
                </Clickable>
            </nav>

            {/* Overlay menu */}
            {isMenuShown && <MenuOverlay setIsMenuShown={setIsMenuShown} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>}
        </section>
    );
}