import SportigoFormule from "@/components/tarifs/sportigo-formule";

export default function Page() {
    return (
        <main className="bg-background-base w-full pt-subMenu px-content lg:px-contentLg pb-content lg:pb-contentLg flex flex-col space-y-10">
            {/* Titre */}
            <div className="flex flex-col items-center space-y-2 mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base text-center">Séance d'essai offerte</h1>
                <p className="text-foreground-subdued text-center">
                    Profitez de cette offre incroyable
                </p>
            </div>

            <div className="w-full overflow-x-hidden">
                <SportigoFormule id={28526}/>
            </div>
        </main>
    );
}