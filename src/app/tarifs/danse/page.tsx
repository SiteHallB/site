"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const { danse } = useFormule();

    return (
        <IdsGroupPage
            title="Danse"
            subtitle={<>
                La seconde danse pour <span className="text-accent">150€</span> de plus au lieu de 250€. Pour s'inscrire dans une seconde danse, veuillez nous contacter directement.
                <div className="bg-background-highlight p-content rounded-xl flex flex-wrap gap-content mt-content">
                <PhoneNumber/>
                <Email/>
                </div>
            </>}
            ids={[danse]}/>
    );
}