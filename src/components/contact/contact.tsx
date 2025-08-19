"use client";

import "@/styles/contact.css";
import PageStructure from "@/components/ui/page-structure";
import Reseaux from "@/components/reseaux";
import ContactForm from "@/components/contact/contact-form"
import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import Clickable from "@/components/ui/clickable";
import { useRef } from "react";
import Horaires from "../horaires";

export default function Contact() {
    const contactFormContainer = useRef<HTMLDivElement>(null);

    return (
        <PageStructure title="Contact" subtitle={
            <Clickable
                clickableType={{type: "button", onClick: () => {contactFormContainer.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });}}}
                style={{}}
                className="hoverUnderline"
            >
                <p>Besoin d'aide ?</p>
            </Clickable>
        }>
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

                {/* Horaires */}
                <Horaires/>
            </div>

            {/* Message formulaire */}
            <div ref={contactFormContainer} className="w-full flexCenter">
            <ContactForm/>
            </div>
        </PageStructure>
    );
}