"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import { useFormule } from "@/context/formule-context";
import { PlusCircle } from "lucide-react";

export default function Page() {
    const { danse } = useFormule();

    return (
        <IdsGroupPage
            title="Danse"
            subtitle={<>
                <p>La seconde danse pour <span className="text-accent">150€</span> de <PlusCircle className="inline-block size-5 lg:size-7 text-accent"/> au lieu de 250€. Pour s'inscrire à une seconde danse, veuillez nous contacter directement.</p>
                <div className="bg-background-highlight p-content rounded-xl flex flex-wrap gap-content mt-content flexCenter">
                <PhoneNumber/>
                <Email/>
                </div>
            </>}
            ids={[danse]}/>
    );
}