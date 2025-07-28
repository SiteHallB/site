"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoFormule() {
    const data = {
        initOfferPayment: {
            id: 0,
            cancelable: false
        },
        redirectUrl: 'https://www.sportigo.io/thank-you',
        theme: {
            dark: false,
            googleFont: {
                name: 'Audiowide',
                family: 'serif'
            },
            cssFile: 'http://monsite.fr/style.css',
        }
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent(
                'BuyFromList', 
                'ID_SECTION', 
                'API_KEY', 
                data
            );
        }
    };

    // Au premier montage (refresh ou navigation), on tente un init immédiat
    useEffect(() => {
        init();
    }, []);

    return (
        <>
        <section id="ID_SECTION" className="w-full"></section>
        <Script
            src="https://standalone.api.sportigo.fr/component-standalone.js"
            strategy="afterInteractive"
            onLoad={init} 
        />
        </>
    );
}
