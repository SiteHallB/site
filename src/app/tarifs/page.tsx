import { Euro, CheckCheck } from "lucide-react";

export default function Page() {
    return (
        <div className="bg-background-base w-full px-content">
            <div className="py-22 flex flex-col w-full space-y-5">
                
                <div className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around">
                    {/* Prix */}
                    <div className="px-2 font-futuretense flex items-center justify-center absolute left-[-0.5rem] top-[-0.9rem] rounded-xs bg-accent">
                        <p className="text-base">40€<span className="text-[0.7rem]">/mois</span></p>
                    </div>

                    {/* Titre */}
                    <div className="mb-auto flex flex-col items-center">
                        <h2 className="title text-foreground-base mx-auto">
                            Classic
                        </h2>
                        <p className="text-foreground-subdued mb-4 subtitle">
                            Muscu & Cardio accès libre
                        </p>
                    </div>

                    {/* Images */}

                    {/* Description */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-row space-x-3">
                            <CheckCheck size={24} className="text-accent shrink-0"/>
                            <p className="text-foreground-base readable">Accès 7jours/7 de 7h à 23h au plateau muscu/cardio</p>
                        </div>
                        <div className="flex flex-row space-x-3">
                            <CheckCheck size={24} className="text-accent"/>
                            <p className="text-foreground-base readable">Autre truc à dire</p>
                        </div>
                    </div>

                    
                </div>

                {/* Exemple */}
                <div className="bg-background-highlight w-full h-[80vh] rounded-xl p-2">
                    <h2 className="title text-foreground-base">
                        Boost
                    </h2>
                </div>
            </div>
            
        </div>
    );
}