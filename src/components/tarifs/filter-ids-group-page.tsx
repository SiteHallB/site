"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import Clickable from "../ui/clickable";
import PageStructure from "../ui/page-structure";
import SportigoFormule from "../ui/sportigo-formule";
import RevenirAuxTarifs from "./revenir-aux-tarifs";
import { useSearchParams } from "next/navigation";

function intersection<T>(...sets: Set<T>[]): Set<T> {
    if (sets.length === 0) return new Set();
    // Commence par le set le plus petit pour optimiser
    sets.sort((a, b) => a.size - b.size);
    const [smallest, ...rest] = sets;
    return new Set(Array.from(smallest).filter(x => rest.every(set => set.has(x))));
}

function union<T>(...sets: Set<T>[]): Set<T> {
    const result = new Set<T>();
    for (const s of sets) {
        for (const val of s) {
            result.add(val);
        }
    }
    return result;
}

// A entourer de nav
function FilterExclusive({ onChange, appliedFilters, noneFilterName, filterNames }: { onChange: (newState: boolean[]) => void; appliedFilters: boolean[]; noneFilterName: string; filterNames: string[] }) {
    const n = filterNames.length;

    const isNoneFilter = () => appliedFilters.every(x => x === false);

    function handleFilterChange(change: number) {
        if (change === n) onChange(Array(n).fill(false));
        else {
            const prev = appliedFilters[change]
            onChange(Array(n).fill(false).map((el, index) => index === change ? !prev : el))
        }
    }

    return (
        <ul className="bg-background-highlight px-content py-contentClose rounded-xl flex flex-wrap list-none gap-content">
        {/* Filter aucun filtre */}
        <li>
        <Clickable
            clickableType={{type: "button", onClick: () => handleFilterChange(n)}}
            style={{variant: isNoneFilter() ? "filterTrue" : "filterFalse"}}
        >
            {noneFilterName}
        </Clickable>
        </li>
        {filterNames.map((el, index) =>
            <li key={index}>
            <Clickable
                clickableType={{type: "button", onClick: () => handleFilterChange(index)}}
                style={{variant: appliedFilters[index] ? "filterTrue" : "filterFalse"}}
                className="text-left"
            >
                {el}
            </Clickable>
            </li>
        )}
        </ul>
    );
}

type FilterExclusiveType = { noneFilterName: string; filters: {filterName: string; ids: Set<number>}[]};
type Filters = FilterExclusiveType[]
export type QueryFilter = Map<string, string>; // JSON.stringify la clé pour [filterExclusiveNumber, filterNumber]
export function FilterIdsGroupPageComponent({ title, subtitle, filters, queryFilter }: { title: string, subtitle: React.ReactNode, filters: Filters, queryFilter?: QueryFilter}) {
    const n = filters.length;
    const lengths = filters.map(filterExclusive => filterExclusive.filters.length);
    const [filtersState, setFiltersState] = useState<boolean[][]>(() => lengths.map(len => Array(len).fill(false)));
    const allIds = Array.from(union(...filters.map((filterExclusive, _) => union(...filterExclusive.filters.map((el, _) => el.ids)))));

    const searchParams = useSearchParams();
    useEffect(() => {
        if (!queryFilter) return;
        const filtersAfterQuery = filters.map((filterExclusive, i) =>
            (filterExclusive.filters.map((filter, j) => {
                const queryName = queryFilter.get(JSON.stringify([i, j]));
                    if (!queryName) return false;
                    else {
                        return searchParams.get("option") === queryName;
                    }
                }
            ))
        )
        setFiltersState(filtersAfterQuery);
    }, [searchParams]);

    function handleChange(numFilterExclusive: number, newState: boolean[]) {
        setFiltersState(filtersState.map((el, index) => index === numFilterExclusive ? newState : el));
    }

    function applyFilters(toApply: boolean[][]) {
        const activeSetsPerFilterExclusive = 
            filters.map((el, index) => 
                el.filters
                    .filter((_, i) => toApply[index][i])
                    .map(f => f.ids)
            ).filter((el, _) => el.length > 0)
        const result = Array.from(intersection(...activeSetsPerFilterExclusive.map((el, _) => intersection(...el))));
        if (result.length === 0) return allIds;
        else return result;
    }

    return (
        <PageStructure title={title} subtitle={subtitle}>
            <div className="w-full overflow-x-hidden pt-1 flexCenter flex-col gap-y-content">
                <RevenirAuxTarifs/>

                {/* Boutons filters */}
                <nav aria-label={`Filtres tarifs ${title}`} className="mx-content flex flex-col gap-y-content p-content outline-background-highlight outline-3 rounded">
                    <p className="text-foreground-base">Filtrer :</p>
                    {filters.map((el, index) => (
                        <FilterExclusive
                            key={index}
                            onChange={(newState) => handleChange(index, newState)}
                            appliedFilters={filtersState[index]}
                            noneFilterName={filters[index].noneFilterName}
                            filterNames={filters[index].filters.map((e => e.filterName))}
                        />
                    ))}
                </nav>

                {/* Formules */}
                <SportigoFormule ids={applyFilters(filtersState)}/>
            </div>
        </PageStructure>
    );
}

export default function FilterIdsGroupPage(props: { title: string, subtitle: React.ReactNode, filters: Filters, queryFilter?: QueryFilter}) {
    return (
        <Suspense>
            <FilterIdsGroupPageComponent {...props}/>
        </Suspense>
    );
}