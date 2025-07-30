import PageStructure from "@/components/ui/page-structure";
import SportigoFormule from "@/components/ui/sportigo-formule";



export default function Page() {
    return (
        <PageStructure title="Squash" subtitle="Réservez votre terrain en quelques cliques">
            <div className="columns-2 gap-3">
                <div className="break-inside-avoid mb-4 w-50 h-20 bg-white"/>
                <div className="break-inside-avoid mb-4 size-50 bg-white"/>
                <div className="break-inside-avoid mb-4 size-50 bg-white"/>
            </div>
        </PageStructure>
    );
}