"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function SportigoFormule({ ids }: { ids: number[] }) {
    const data = {
        onlyOffers: ids,
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
                'BuyFromList', 
                'sportigoFormule', 
                '4c334b6f-305e-413a-8541-355479dc0286', 
                data
            );
        }
    };

    useEffect(() => {
        if (ids.length > 0) init();
    }, [ids]);

    return (
        <>
            {ids.length > 0 ?
            <>
                <section id="sportigoFormule" className="w-full"></section>
                <Script
                    src="https://standalone.api.sportigo.fr/component-standalone.js"
                    strategy="afterInteractive"
                    onLoad={init} 
                />
            </> : <p className="bg-background-highlight p-content text-foreground-base rounded-xl">Aucune offre ne correspondant à vos critères</p>}
        </>
    );
}
