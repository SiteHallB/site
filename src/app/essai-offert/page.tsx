import { Metadata } from "next";

import EssaiOffert from "@/components/essai-offert/essai-offert";

export const metadata: Metadata = {
    title: "HALL B - Essai Offert", 
    description: "Vous hésitez encore à franchir le pas ? Profitez d'une séance découverte 100% gratuite pour tester HALL B à Saint Dionisy et vivre l'expérience par vous-même.",
};

export default function Page() {
    return <EssaiOffert/>;
}