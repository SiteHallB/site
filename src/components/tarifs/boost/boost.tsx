"use client";

import FilterIdsGroupPage from "@/components/tarifs/filter-ids-group-page";
import { useFormule } from "@/context/formule-context";
import { QueryFilter } from "@/components/tarifs/filter-ids-group-page";

export default function Boost() {
    const {
        boost_unmois, boost_mensuel, boost_annuel, 
        boost_smallgroups_unmois, boost_smallgroups_mensuel, boost_smallgroups_annuel
    } = useFormule();

    const queryFilter: QueryFilter = new Map([
        [JSON.stringify([1, 1]), "small-groups"],
    ]);

    return (
        <FilterIdsGroupPage title="Boost" subtitle={<p>Musculation & cardio + Cours Collectifs</p>}
            filters={[
                {
                    noneFilterName: "Tout type de paiement", 
                    filters: [
                        { filterName: "Sans engagement", ids: new Set([boost_unmois, boost_smallgroups_unmois]) },
                        { filterName: "Mensuel", ids: new Set([boost_mensuel, boost_smallgroups_mensuel]) },
                        { filterName: "Annuel", ids: new Set([boost_annuel, boost_smallgroups_annuel]) }
                    ]
                }, 
                {
                    noneFilterName: "Toutes les options", 
                    filters: [
                        { filterName: "Cours co", ids: new Set([boost_unmois, boost_mensuel, boost_annuel]) }, 
                        { filterName: "Cours co + SmallGroups", ids: new Set([boost_smallgroups_unmois, boost_smallgroups_mensuel, boost_smallgroups_annuel]) }
                    ]
                }
            ]}
            queryFilter={queryFilter}
        />
    );
}