import Contact from "@/components/contact/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HALL B - Nous contacter", 
    description: "Poser une question ou demander un renseignement à la salle HALL B à Saint Dionisy (Vaunage, proche de Nimes)",
};

export default function Page() {
    return (
        <Contact/>
    );
}