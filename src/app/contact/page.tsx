"use client"

import "@/styles/contact.css";
import PageStructure from "@/components/ui/page-structure";
import Reseaux from "@/components/reseaux";
import ContactForm from "@/components/contact/contact-form"
import { useContact } from "@/context/contact-context";
import { Email, PhoneNumber } from "@/components/ui/contact-widget";

export default function Page() {
    const { email, numero } = useContact();

    return (
        <PageStructure title="Contact" subtitle="Besoin d'aide ?">
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