"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        aqua_unmois, aqua_mensuel, aqua_annuel, 
        aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel, 
        aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel 
    } = useFormule();
    
    return (
        <IdsGroupPage title="Aqua" subtitle="Musculation & cardio + Aqua" ids={[aqua_unmois, aqua_mensuel, aqua_annuel, 
        aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel, 
        aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, 
        aqua_coursco_smallgroups_annuel]}/>
    );
}