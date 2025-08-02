"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        boost_unmois, boost_mensuel, boost_annuel, 
        boost_smallgroups_unmois, boost_smallgroups_mensuel, boost_smallgroups_annuel
    } = useFormule();

    return (
        <IdsGroupPage title="Boost" subtitle="Musculation & cardio + Cours Collectifs" ids={[boost_unmois, boost_mensuel, boost_annuel, 
        boost_smallgroups_unmois, boost_smallgroups_mensuel, boost_smallgroups_annuel]}/>
    );
}