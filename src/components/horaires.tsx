export default function Horaires() {
    return (
        <div className="lg:items-center w-full flex flex-col">
            <div>
            <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Horaires</p>
            <p className="text-foreground-subdued">
                - Ouverture 6h-23h 7/7j<br/>
                - <span className="text-accent">Réception</span> : 9h-13h 16h-20h du Lundi au vendredi / 9h-13h le Samedi
            </p>
            </div>
        </div>
    );
}