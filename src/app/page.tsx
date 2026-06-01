import { Metadata } from "next";

import Hero from "@/components/root/hero";
import Concept from "@/components/root/concept";
import EssaiOffert from "@/components/root/essai-offert";
import Histoire from "@/components/root/histoire";
import Valeurs from "@/components/root/valeurs";
import SeoLocal from "@/components/root/seo-local";

export const metadata: Metadata = {
    title: "HALL B – Salle de sport à Saint Dionisy | Nîmes, Gard",
    description: "Salle de sport 2 400 m² à Saint Dionisy, à 15 min de Nîmes (Gard) : musculation, cours collectifs, squash, aquagym, danse. Essayez HALL B gratuitement !",
    alternates: { canonical: "https://www.hallb.fr/" },
};

export default function Home() {
    return (
        <main className="relative bg-background-base">
            <Hero/>
            <Concept/>
            <EssaiOffert/>
            <Histoire/>
            <Valeurs/>
            <SeoLocal/>
        </main>
    );
}