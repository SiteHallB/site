// app/planning/page.tsx
import SportigoPlannings from "@/components/plannings/sportigo-plannings";

export default function ReservationPage() {
    return (
        <main className="bg-background-base w-full pt-subMenu px-content lg:px-contentLg pb-content lg:pb-contentLg flex flex-col space-y-10">
            {/* Titre */}
            <div className="flex flex-col items-center space-y-2 mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base">Plannings</h1>
                <p className="text-foreground-subdued text-center">
                    Réservez votre créneaux en vous connectant à votre compte.<br/>
                    Si vous n'avez pas encore de compte, cliquez sur inscription : vous recevrez votre mot de passe ainsi que des instructions par mail
                </p>
            </div>

            {/* Plannings Sportigo */}
            <div className="bg-white rounded-xl w-full">
                <SportigoPlannings />
            </div>
        </main>
    );
}
