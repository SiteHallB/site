import Clickable from "@/components/ui/clickable";
import { Facebook, Instagram } from "lucide-react";

export default function Reseaux() {
    return (
        <div className="lg:items-center w-full flex flex-col">
            <div>
            <p className="text-foreground-base textSubH2 lg:mb-contentClose">Nos actus</p>
            <Clickable
                clickableType={{type: "link", path: "https://www.instagram.com/hallb.fr/"}}
                style={{variant: "menuSideButton"}}
                className="flex flex-row space-x-1"
            >
                <Instagram/>
                <p>Instagram</p>
            </Clickable>
            <Clickable
                clickableType={{type: "link", path: "https://www.facebook.com/p/HALL-B-61576081445951/"}}
                style={{variant: "menuSideButton"}}
                className="flex flex-row space-x-1"
            >
                <Facebook/>
                <p>Facebook</p>
            </Clickable>
            </div>
        </div>
    );
}