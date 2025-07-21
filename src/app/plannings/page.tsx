"use client"

import { useState } from "react";

type Activite = {
    text: string, 
    horraire: string, 
}

function Horraire({ }) {
    return (
        <div className="bg-background-subdued w-full h-full flex flex-row items-center p-2">
            <p className="text-foreground-base hour">
                9h-10h
            </p>
        </div>
    );
}

function Jour() {
    return (
        <div className="flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl p-5 items-center justify-around space-y-5">
            <Horraire/>
            <Horraire/>
            <Horraire/>
        </div>
    );
}

export default function Page() {
    return (
        <div className="bg-background-base w-full px-content">
            <div className="pt-20 pb-10 flex flex-col w-full space-y-10 items-center">
                {/* Titre */}
                <div className="flex flex-col items-center space-y-2">
                    <h1 className="text-foreground-base title">Plannings</h1>
                    <p className="text-foreground-subdued title-long text-center">
                        Ouverture tous les jours
                    </p>
                </div>
                


                {/* Jour */}
                <Jour/>
            </div>
        </div>
    );
}