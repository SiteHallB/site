import SportigoFormule from "@/components/tarifs/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";

export default function Page() {
    return (
        <PageStructure title="Tarifs" subtitle="Sélectionnez l'offre qui vous convient">
            <div className="w-full overflow-x-hidden pt-1">
                <SportigoFormule/>
            </div>
        </PageStructure>
    );
}