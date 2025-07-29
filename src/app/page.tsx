"use client"

import Hero from "@/components/root/hero";
import Concept from "@/components/root/concept";
import EssaiOffert from "@/components/root/essai-offert";
import Histoire from "@/components/root/histoire";
import Valeurs from "@/components/root/valeurs";

export default function Home() {
    return (
        <main className="relative bg-background-base">
            <Hero/>
            <Concept/>
            <EssaiOffert/>
            <Histoire/>
            <Valeurs/>
        </main>
    );
}