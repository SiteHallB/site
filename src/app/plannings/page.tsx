import PageStructure from "@/components/ui/page-structure";
import SportigoPlannings from "@/components/plannings/sportigo-plannings";

export default function ReservationPage() {
    return (
        <PageStructure title="Plannings" subtitle="Réservez une séance d'essai (ou séance unitaire)">
            {/* Plannings Sportigo */}
            <div className="bg-white rounded-xl w-full overflow-x-hidden pt-1 flexCenter">
                <SportigoPlannings />
            </div>
        </PageStructure>
    );
}
