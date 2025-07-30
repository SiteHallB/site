"use client"

import React, { useEffect, useState } from 'react';
import { FocusTrap } from 'focus-trap-react';
import Clickable from './clickable';
import { X } from 'lucide-react';

export default function PopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const apparitionDelay = 1000;

    // Timer
    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), apparitionDelay)
        return () => clearTimeout(timer);
    }, [])

    // Empeche le scroll
    useEffect(() => {
        isOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');

        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="z-60 fixed inset-0 bg-background-base/50 flexCenter">
                    <FocusTrap
                        focusTrapOptions={{
                            initialFocus: false, 
                            clickOutsideDeactivates: false, 
                            allowOutsideClick: false,
                            escapeDeactivates: true, 
                        }}
                    >
                        <div
                            className="outline-1 outline-foreground-subdued rounded-xl relative max-h-full max-w-[98vw] p-content lg:p-contentLg bg-background-base flexCenter flex-col text-foreground-base"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                        >
                            <h2 id="modal-title" className="text-center">Essai Offert</h2>
                            <p id="modal-desc" className="text-center textSubH2 text-foreground-subdued mb-content">Un sous titre</p>
                            <p className="text-center text-foreground-subdued mb-content">Un texte pouvant etre plus long qui explique des trucs</p>
                            <Clickable
                                className="absolute top-1 right-1 lg:top-2 lg:right-2 hoverRotate"
                                clickableType={{type: "button", onClick: () => setIsOpen(false)}}
                                style={{}}
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
                    </FocusTrap>
                </div>
            )}
        </>
    );
}