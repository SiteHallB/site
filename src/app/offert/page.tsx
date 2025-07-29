import SportigoFormule from "@/components/tarifs/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";

export default function Page() {
    return (
        <PageStructure title="Séance d'essai offerte" subtitle="Venez découvrir nos espaces gratuitement et sans engagement, vous ne serez pas déçus">
            <div className="w-full overflow-x-hidden">
                <SportigoFormule id={28526}/>
            </div>
        </PageStructure>
    );
}