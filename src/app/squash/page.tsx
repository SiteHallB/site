import PageStructure from "@/components/ui/page-structure";
import SportigoFormule from "@/components/ui/sportigo-formule";
import SportigoSquash from "@/components/ui/sportigo-squash";



export default function Page() {
    return (
        <PageStructure title="Squash" subtitle="Réservez votre terrain en quelques cliques">
            <SportigoSquash/>
        </PageStructure>
    );
}