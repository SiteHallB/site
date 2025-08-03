"use client";

import { useState } from "react";
import Clickable from "../ui/clickable";
import PageStructure from "../ui/page-structure";
import SportigoFormule from "../ui/sportigo-formule";

function intersection(...sets: Set<number>[]): number[] {
    if (sets.length === 0) return [];
    // Commence par le set le plus petit pour optimiser
    sets.sort((a, b) => a.size - b.size);
    const [smallest, ...rest] = sets;
    return Array.from(smallest).filter(x => rest.every(set => set.has(x)));
}

function union(...sets: Set<number>[]): number[] {
    const result = new Set<number>();
    for (const s of sets) {
        for (const val of s) {
            result.add(val);
        }
    }
    return Array.from(result);
}

type FilterIds = {filter: string; ids: Set<number>}[];
export default function FilterIdsGroupPage({ title, subtitle, filterIds }: { title: string, subtitle: string, filterIds: FilterIds}) {
    const n = filterIds.length;
    const noneFilter = union(...filterIds.map(f => f.ids));
    const [appliedFilters, setAppliedFilters] = useState<boolean[]>(Array(n).fill(false));

    function applyFilters(applied: boolean[]) {
        if (isNoneFilter()) return noneFilter;
        const activeSets = filterIds
            .filter((_, index) => applied[index])
            .map(f => f.ids);
        return intersection(...activeSets);
    }

    function isNoneFilter() {
        return appliedFilters.every(x => x === false);
    }

    function handleFilterChange(change: number) {
        if (change === n) { // Filter aucun filtres
            setAppliedFilters(Array(n).fill(false));
        } else {
            setAppliedFilters(appliedFilters.map((el, index) => index === change ? !el : el))
        }
    }

    return (
        <PageStructure title={title} subtitle={subtitle}>
            <div className="w-full overflow-x-hidden pt-1 flexCenter flex-col gap-y-content">
                <Clickable
                    clickableType={{type: "link", path: "/tarifs"}}
                    style={{variant: "menuMainButton"}}
                    className="mr-auto flexCenter flex-row"
                >
                    Revenir aux formules
                </Clickable>

                {/* Boutons filters */}
                <nav aria-label={`Filtres tarifs ${title}`} className="bg-background-highlight px-content py-contentClose rounded-full flex flex-row gap-x-content">
                    <p className="text-foreground-base">Filtrer :</p>
                    <ul className="flex flex-row list-none gap-x-content">
                    {/* Filter aucun filtre */}
                    <li>
                    <Clickable
                        clickableType={{type: "button", onClick: () => handleFilterChange(n)}}
                        style={{variant: isNoneFilter() ? "filterTrue" : "filterFalse"}}
                    >
                        Toutes les formules {title}
                    </Clickable>
                    </li>
                    {filterIds.map((el, index) =>
                        <li key={index}>
                        <Clickable
                            clickableType={{type: "button", onClick: () => handleFilterChange(index)}}
                            style={{variant: appliedFilters[index] ? "filterTrue" : "filterFalse"}}
                        >
                            {filterIds[index].filter}
                        </Clickable>
                        </li>
                    )}
                    </ul>
                </nav>

                {/* Formules */}
                <SportigoFormule ids={applyFilters(appliedFilters)}/>
            </div>
        </PageStructure>
    );
}