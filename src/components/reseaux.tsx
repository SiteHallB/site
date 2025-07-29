import Clickable from "@/components/ui/clickable";
import clsx from "clsx";
import { Facebook, Instagram } from "lucide-react";

export default function Reseaux({ className, title }: { className?: string, title?: string }) {
    return (
        <div className={clsx(className, "lg:items-center flex flex-col")}>
            <div>
            <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">{title ? title : "Nos actus"}</p>
            <Clickable
                clickableType={{type: "link", path: "https://www.instagram.com/hallb.fr/", outside: true}}
                style={{variant: "menuSideButton"}}
                className="flex flex-row space-x-1 w-fit"
            >
                <Instagram/>
                <p>Instagram</p>
            </Clickable>
            <Clickable
                clickableType={{type: "link", path: "https://www.facebook.com/p/HALL-B-61576081445951/", outside: true}}
                style={{variant: "menuSideButton"}}
                className="flex flex-row space-x-1 w-fit"
            >
                <Facebook/>
                <p>Facebook</p>
            </Clickable>
            </div>
        </div>
    );
}