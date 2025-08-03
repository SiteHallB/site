import { Metadata } from "next";

import "@/styles/contact.css";
import PageStructure from "@/components/ui/page-structure";
import Reseaux from "@/components/reseaux";
import ContactForm from "@/components/contact/contact-form"
import { Email, PhoneNumber } from "@/components/ui/contact-widget";

export const metadata: Metadata = {
    title: "HALL B - Nous contacter", 
    description: "Poser une question ou demander un renseignement à la salle HALL B à Saint Dionisy (Vaunage, proche de Nimes)",
};

export default function Page() {
    return (
        <PageStructure title="Contact" subtitle={<p>Besoin d'aide ?</p>}>
            {/* Coordonnées */}
            <div className="w-full max-w-200 flex flex-wrap justify-between gap-content bg-background-highlight p-content lg:p-contentLg rounded-xl">
                {/* Email */}
                <div className="w-fit lg:items-center flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Email</p>
                    <Email/>
                    </div>
                </div>

                {/* Téléphone ? */}
                <div className="w-fit lg:items-center flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Téléphone</p>
                    <PhoneNumber/>
                    </div>
                </div>

                {/* Réseaux */}
                <Reseaux className="w-fit"/>
            </div>

            {/* Message formulaire */}
            <ContactForm/>
        </PageStructure>
    );
}