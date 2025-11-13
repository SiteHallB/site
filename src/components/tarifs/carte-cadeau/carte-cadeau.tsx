"use client";

import PageStructure from "@/components/ui/page-structure";
import SportigoGift from "@/components/ui/sportigo-gift";

export default function CarteCadeau() {
    return (
        <PageStructure title="Carte cadeau" subtitle={<p></p>}>
            <div className="bg-background-highlight rounded-xl w-full p-1 flexCenter">
            <SportigoGift/>
            </div>
        </PageStructure>
    );
}