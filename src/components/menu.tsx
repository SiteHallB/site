"use client"

import "@/styles/menu.css"

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Menu as MenuIcon, X, Instagram, Facebook, ChevronRight } from 'lucide-react';
import ScrollTrigger from "gsap/ScrollTrigger";

import Clickable from "@/components/ui/clickable";
import Reseaux from "@/components/reseaux";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: "Accueil", path: "/"}, 
    { label: "Tarifs", path: "/tarifs"}, 
    { label: "Plannings", path: "/plannings"}, 
    { label: "Nous contacter", path: "/contact"}, 
];

type MenuLink = {
  path: string;
  label: string;
};

type MenuItemProps = {
  linkInfo: MenuLink;
  onClick: () => void;
};

function MenuItem({ linkInfo, onClick }: MenuItemProps) {
    return (
        <div className="menu-link-item">
            <div className="menu-link-item-holder flex flex-row items-center">
                <ChevronRight size={24} className="text-accent" />

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

export default function Menu() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

    const tl = useRef<gsap.core.Timeline | null>(null);
    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 60 });

        tl.current = gsap.timeline({ paused: true })
        .to(".menu-overlay", {
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
        isMenuOpen ? tl.current.play() : tl.current.reverse();
    }, [isMenuOpen]);

    // Désactive le scroll
    useEffect(() => {
        isMenuOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
        
        return () => { document.body.classList.remove("overflow-hidden"); };
    }, [isMenuOpen]);

    return (
        <section id="menu" ref={container}>
            {/* Barre de navigation */}
            <div className="py-5 fixed top-0 left-0 w-screen flex justify-around items-center z-50 px-4 lg:px-8 py-1 nav-bar space-x-2">
                
                <Clickable
                    clickableType={{type: "link", path: "/offert"}}
                    style={{variant: "navigationBar", color: "primary"}}
                >
                    Essai Offert
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => setIsMenuOpen(false), path: "/tarifs"}}
                    style={{variant: "navigationBar", color: "accent"}}
                >
                    Je m'inscris
                </Clickable>
                <div onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} className="text-foreground-base"/> : 
                        <MenuIcon size={24} className="text-foreground-base"/>}
                </div>
            </div>

            {/* Overlay menu */}
            <div className="menu-overlay fixed z-40 inset-0 bg-background-subdued flex flex-col pt-10 justify-around px-contentClose items-center transform-gpu [will-change:clip-path]">
                <nav className="flex flex-col w-full">
                    {navLinks.map((el, index) => (
                        <MenuItem linkInfo={el} onClick={toggleMenu} key={index}/>
                    ))}
                </nav>
                
                <div className="flex flex-col w-full">
                    <MenuItem linkInfo={{ path: "", label: "Consultation Ostéopathe" }} onClick={toggleMenu}/>
                    <MenuItem linkInfo={{ path: "", label: "Réservation Squash" }} onClick={toggleMenu}/>
                </div>
                
                <div className="relative flex overflow-hidden w-full h-50 rounded-xl">
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
        </section>
    );
}