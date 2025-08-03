"use client";

import { useEffect } from "react";
import Script from "next/script";
import useKlaroConsent from "../cookies/use-klaro-consent";
import Clickable from "./clickable";

export default function SportigoFormule({ ids }: { ids: number[] }) {
    const hasConsent = useKlaroConsent("sportigo");

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
        if (hasConsent && ids.length > 0) init();
    }, [ids, hasConsent]);

    if (hasConsent) {
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
