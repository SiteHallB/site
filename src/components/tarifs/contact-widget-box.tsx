"use client";

import { Email, PhoneNumber } from "@/components/ui/contact-widget";

/** Encadré téléphone + email affiché sous le sous-titre de certaines pages de tarifs (ex : Danse). */
export default function ContactWidgetBox() {
    return (
        <div className="bg-background-highlight p-content rounded-xl flex flex-wrap gap-content mt-content flexCenter w-full">
            <PhoneNumber />
            <Email />
        </div>
    );
}
