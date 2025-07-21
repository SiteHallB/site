import LinkedButton from "./ui/linked-buttons"

export default function Footer() {
    return (
        <footer className="bg-background-subdued">
            {/* Marques */}
            <div className="px-content flex flex-row w-full text-foreground-base text-lg py-10 items-center justify-around">
                <p>Marque1</p>
                <p>Marque2</p>
                <p>Marque3</p>
            </div>

            {/* Loi */}
            <div className="px-content text-foreground-subdued flex flex-col w-full py-5 space-y-4">
                <LinkedButton
                    variant="legal"
                    mode={{src: ""}}
                    text="Mentions légales"
                />
                <LinkedButton
                    variant="legal"
                    mode={{src: ""}}
                    text="Politique de confidentialité"
                />
                <LinkedButton
                    variant="legal"
                    mode={{src: ""}}
                    text="Politique cookies"
                />
            </div>
        </footer>
    );
}