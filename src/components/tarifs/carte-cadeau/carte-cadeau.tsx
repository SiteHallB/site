"use client";

import PageStructure from "@/components/ui/page-structure";
import SportigoGift from "@/components/ui/sportigo-gift";

export default function CarteCadeau({ titre = "Carte cadeau", sousTitre = "" }: { titre?: string; sousTitre?: string }) {
    return (
        <PageStructure title={titre} subtitle={<p>{sousTitre}</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-1 flexCenter">
            <SportigoGift/>
            </div>
        </PageStructure>
    );
}
