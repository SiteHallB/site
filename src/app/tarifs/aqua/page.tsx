"use client";

import FilterIdsGroupPage from "@/components/tarifs/filter-ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        aqua_unmois, aqua_mensuel, aqua_annuel, 
        aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel, 
        aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel 
    } = useFormule();
    
    return (
        <FilterIdsGroupPage title="Aqua" subtitle="Musculation & cardio + Aqua"
            filterIds={[
                { filter: "Paiement 1 mois sans engagement", ids: new Set([aqua_unmois, aqua_coursco_unmois, aqua_coursco_smallgroups_unmois]) },
                { filter: "Paiement mensuel", ids: new Set([aqua_mensuel, aqua_coursco_mensuel, aqua_coursco_smallgroups_mensuel]) },
                { filter: "Paiement annuel", ids: new Set([aqua_annuel, aqua_coursco_annuel, aqua_coursco_smallgroups_annuel]) }, 
                { filter: "Aqua basique", ids: new Set([aqua_unmois, aqua_mensuel, aqua_annuel]) }, 
                { filter: "Aqua cours co", ids: new Set([aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel]) }, 
                { filter: "Aqua cours co + smallGroups", ids: new Set([aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel]) }, 
            ]}
        />
    );
}