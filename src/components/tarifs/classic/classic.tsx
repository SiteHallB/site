"use client";

import FilterIdsGroupPage from "@/components/tarifs/filter-ids-group-page";

import { useFormule } from "@/context/formule-context";

export default function Classic() {
    const { classic_unmois, classic_mensuel, classic_annuel } = useFormule();

    return (
        <FilterIdsGroupPage title="Classic" subtitle={<p>Musculation & cardio</p>}
            filters={[
                {
                    noneFilterName: "Tout type de paiement", 
                    filters: [
                        { filterName: "Sans engagement", ids: new Set([classic_unmois]) },
                        { filterName: "Mensuel", ids: new Set([classic_mensuel]) },
                        { filterName: "Annuel", ids: new Set([classic_annuel]) }
                    ]
                }, 
            ]}
        />
    );
}