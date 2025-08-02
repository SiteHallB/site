"use client"

import React, { useEffect, useRef, useState } from 'react';
import Clickable from './ui/clickable';
import { X } from 'lucide-react';

export default function PopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const apparitionDelay = 1000;

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        function onUserAction() {
            timerRef.current = setTimeout(() => setIsOpen(true), apparitionDelay);
            window.removeEventListener("click", onUserAction);
            window.removeEventListener("scroll", onUserAction);
            window.removeEventListener("keydown", onUserAction);
        }

        window.addEventListener("click", onUserAction);
        window.addEventListener("scroll", onUserAction);
        window.addEventListener("keydown", onUserAction);

        return () => {
            window.removeEventListener("click", onUserAction);
            window.removeEventListener("scroll", onUserAction);
            window.removeEventListener("keydown", onUserAction);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Empeche le scroll
    useEffect(() => {
        isOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');

        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="z-60 fixed inset-0 bg-background-base/50 backdrop-blur flexCenter">
                    <div
                        className="z-10 outline-1 outline-foreground-subdued rounded-xl relative max-w-100 w-[98vw] p-content lg:p-contentLg bg-background-base flexCenter flex-col text-foreground-base"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                    >
                        <h2 id="modal-title" className="text-center" style={{wordBreak: "normal"}}>Essai Offert</h2>
                        <p id="modal-desc" className="text-center textSubH2 text-foreground-subdued mb-content">Vous hésitez encore à franchir le pas ?</p>
                        <p className="text-center text-foreground-subdued mb-content">Profitez d'une séance découverte 100% gratuite pour tester notre salle et vivre l'expérience par vous-même.</p>
                        <Clickable
                            className="absolute top-1 right-1 lg:top-2 lg:right-2 hoverRotate"
                            clickableType={{type: "button", onClick: () => setIsOpen(false)}}
                            style={{}}
                            aria-label="Fermer la pop-up"
                        >
                            <X className="size-6 lg:size-8"/>
                        </Clickable>
                        <Clickable 
                            clickableType={{type: "link", path: "/offert", onClick: () => setIsOpen(false)}}
                            style={{variant:"action", color: "accent"}}
                        >
                            J'en profite
                        </Clickable>
                    </div>
                </div>
            )}
        </>
    );
}