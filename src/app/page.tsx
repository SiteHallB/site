import { Metadata } from "next";

import Hero from "@/components/root/hero";
import Concept from "@/components/root/concept";
import EssaiOffert from "@/components/root/essai-offert";
import Histoire from "@/components/root/histoire";
import Valeurs from "@/components/root/valeurs";

export const metadata: Metadata = {
    title: "HALL B - Accueil", 
    description: "Salle de sport 2 400 m² à Saint Dionisy (Vaunage): musculation haut de gamme, cours collectifs, smallGroups, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !", 
};

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