import Contact from "@/components/contact/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HALL B – Contact | Salle de sport Saint Dionisy, Nîmes",
    description: "Contactez la salle de sport HALL B à Saint Dionisy (Vaunage, Nîmes, Gard). Questions, renseignements, réservations : notre équipe vous répond.",
    alternates: { canonical: "https://www.hallb.fr/contact" },
};

export default function Page() {
    return (
        <Contact/>
    );
}