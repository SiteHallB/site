"use client"

import { useContact } from "@/context/contact-context";

export default function Horaires() {
    const { horairesOuverture, horairesReception } = useContact();

    return (
        <div className="w-full flex flex-col">
            <div>
            <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Horaires</p>
            <p className="text-foreground-subdued">
                {horairesOuverture}<br/>
                <span className="text-accent">{horairesReception}</span>
            </p>
            </div>
        </div>
    );
}
