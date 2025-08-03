import SportigoFormule from "@/components/ui/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import { ChevronLeft } from "lucide-react";
import RevenirAuxTarifs from "./revenir-aux-tarifs";

export default function IdsGroupPage({ revenir, title, subtitle, ids }: { revenir?: boolean; title: string, subtitle: string, ids: number[]}) {
    return (
        <PageStructure title={title} subtitle={subtitle}>
            <div className="w-full overflow-x-hidden pt-1 flexCenter flex-col gap-y-content">
                <RevenirAuxTarifs/>
                <SportigoFormule ids={ids}/>
            </div>
        </PageStructure>
    );
}