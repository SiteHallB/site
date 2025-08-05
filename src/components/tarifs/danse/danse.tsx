"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import { useFormule } from "@/context/formule-context";
import { PlusCircle } from "lucide-react";

export default function Danse() {
    const { rock_1, rock_2, salsa_1, salsa_2, heels, streetjazz } = useFormule();

    return (
        <IdsGroupPage
            title="Danse"
            subtitle={<>
                <p>La seconde danse pour <span className="text-accent">150€</span> au lieu de 250€. Pour s'inscrire à une seconde danse, veuillez nous contacter directement.</p>
                <div className="bg-background-highlight p-content rounded-xl flex flex-wrap gap-content mt-content flexCenter w-full">
                <PhoneNumber/>
                <Email/>
                </div>
            </>}
            ids={[rock_1, rock_2, salsa_1, salsa_2, heels, streetjazz]}/>
    );
}