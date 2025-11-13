"use client";

import { useEffect } from "react";
import Script from "next/script";
import useKlaroConsent from "../cookies/use-klaro-consent";
import Clickable from "./clickable";

export default function SportigoGift() {
    const hasConsent = useKlaroConsent("sportigo");

    const data = {
        redirectUrl: '/merci',
        theme: {
            dark: true,
            googleFont: {
                name: 'Montserrat',
                family: 'sans-serif'
            },
            cssFile: '/css/sportigo-formule.css',
        }
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent(
                'GiftCard', 
                'sportigoGift', 
                '4c334b6f-305e-413a-8541-355479dc0286', 
                data
            );
        }
    };

    useEffect(() => {
        if (hasConsent) init();
    }, [hasConsent]);

    if (hasConsent) {
        return (
            <>
                <section id="sportigoGift" className="w-full"></section>
                <Script
                    src="https://standalone.api.sportigo.fr/component-standalone.js"
                    strategy="afterInteractive"
                    onLoad={init} 
                />
            </>
        );
    } else {
        return (
            <div className="flex flex-col gap-y-content items-center bg-background-highlight p-content rounded-xl">
                <p className="text-foreground-base">Veuillez accepter les cookies fonctionnalités du site pour pouvoir vous inscrire en ligne.</p>
                <Clickable
                    clickableType={{ type: "button", onClick: () => window.klaro?.show()}}
                    style={{ color: "primary", variant: "secondary" }}
                    className="max-w-100 w-full"
                >
                    Gérer mes cookies
                </Clickable>
            </div>
        )
    }
}
