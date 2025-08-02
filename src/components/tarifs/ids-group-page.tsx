import SportigoFormule from "@/components/ui/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import { ChevronLeft } from "lucide-react";

export default function IdsGroupPage({ revenir, title, subtitle, ids }: { revenir?: boolean; title: string, subtitle: string, ids: number[]}) {
    return (
        <PageStructure title={title} subtitle={subtitle}>
            <div className="w-full overflow-x-hidden pt-1 flexCenter flex-col gap-y-content">
                {revenir && <Clickable
                    clickableType={{type: "link", path: "/tarifs"}}
                    style={{variant: "menuMainButton"}}
                    className="mr-auto flexCenter flex-row"
                >
                    <ChevronLeft className="size-6"/>
                    Revenir aux formules
                </Clickable>}
                <SportigoFormule ids={ids}/>
            </div>
        </PageStructure>
    );
}