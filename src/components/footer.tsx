"use client"

import Clickable from "@/components/ui/clickable";

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
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Mentions Légales
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Politique de confidentialité
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Gérer vos cookies
                </Clickable>
            </div>
        </footer>
    );
}