"use client"

import "@/styles/contact.css";
import PageStructure from "@/components/ui/page-structure";
import Reseaux from "@/components/reseaux";
import ContactForm from "@/components/contact/contact-form"

export default function Page() {
    return (
        <PageStructure title="Contact" subtitle="Besoin d'aide ?">
            {/* Coordonnées */}
            <div className="w-full max-w-200 flex flex-wrap justify-between gap-content bg-background-highlight p-content lg:p-contentLg rounded-xl">
                {/* Email */}
                <div className="w-fit lg:items-center flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Email</p>
                    <p className="text-foreground-subdued">
                        email
                    </p>
                    </div>
                </div>

                {/* Téléphone ? */}
                <div className="w-fit lg:items-center flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Téléphone</p>
                    <p className="text-foreground-subdued">
                        06000000
                    </p>
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