import SportigoFormule from "@/components/ui/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";

export default function Page() {
    return (
        <PageStructure title="Séance d'essai offerte" subtitle="Venez découvrir nos espaces gratuitement et sans engagement, vous ne serez pas déçus">
            <div className="w-full pt-1 flexCenter">
                <SportigoFormule ids={[19912]}/>
            </div>
        </PageStructure>
    );
}