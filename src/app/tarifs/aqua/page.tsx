"use client";

import FilterIdsGroupPage from "@/components/tarifs/filter-ids-group-page";
import { QueryFilter } from "@/components/tarifs/filter-ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        aqua_unmois, aqua_mensuel, aqua_annuel, 
        aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel, 
        aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel 
    } = useFormule();

    const queryFilter: QueryFilter = new Map([
        [JSON.stringify([1, 2]), "small-groups"],
        [JSON.stringify([1, 1]), "cours-co"],
    ]);
    
    return (
        <FilterIdsGroupPage title="Aqua" subtitle={<p>Musculation & cardio + Aqua</p>}
            filters={[
                {
                    noneFilterName: "Tout type de paiement", 
                    filters: [
                        { filterName: "1 mois sans engagement", ids: new Set([aqua_unmois, aqua_coursco_unmois, aqua_coursco_smallgroups_unmois]) },
                        { filterName: "Mensuel", ids: new Set([aqua_mensuel, aqua_coursco_mensuel, aqua_coursco_smallgroups_mensuel]) },
                        { filterName: "Annuel", ids: new Set([aqua_annuel, aqua_coursco_annuel, aqua_coursco_smallgroups_annuel]) }
                    ]
                }, 
                {
                    noneFilterName: "Toutes les formules AQUA", 
                    filters: [
                        { filterName: "AQUA seul", ids: new Set([aqua_unmois, aqua_mensuel, aqua_annuel]) }, 
                        { filterName: "AQUA + Cours co", ids: new Set([aqua_coursco_unmois, aqua_coursco_mensuel, aqua_coursco_annuel]) }, 
                        { filterName: "AQUA + Cours co + SmallGroups", ids: new Set([aqua_coursco_smallgroups_unmois, aqua_coursco_smallgroups_mensuel, aqua_coursco_smallgroups_annuel]) }
                    ]
                }
            ]}
            queryFilter={queryFilter}
        />
    );
}