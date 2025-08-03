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
            filters={[
                {
                    noneFilterName: "Tout type de paiement", 
                    filters: [
                        { filterName: "Paiement 1 mois sans engagement", ids: new Set([aqua_unmois, aqua_coursco_unmois, aqua_coursco_smallgroups_unmois]) },
                        { filterName: "Paiement mensuel", ids: new Set([aqua_mensuel, aqua_coursco_mensuel, aqua_coursco_smallgroups_mensuel]) },
                        { filterName: "Paiement annuel", ids: new Set([aqua_annuel, aqua_coursco_annuel, aqua_coursco_smallgroups_annuel]) }
                    ]
                }, 
                {
                    noneFilterName: "Toutes les options", 
                    filters: [
                        { filterName: "Aqua basique", ids: new Set([aqua_unmois, aqua_mensuel, aqua_annuel]) }, 
                        { filterName: "Aqua cours co", ids: new Set([aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel]) }, 
                        { filterName: "Aqua cours co + smallGroups", ids: new Set([aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel]) }
                    ]
                }
            ]}
        />
    );
}