"use client";

import Clickable from "@/components/ui/clickable";
import { useLinks } from "@/context/link-context";
import clsx from "clsx";
import { Facebook, Instagram } from "lucide-react";

export default function Reseaux({ className, title }: { className?: string, title?: string }) {
    const { instagram: instagramPath, facebook: facebookPath } = useLinks();

    return (
        <div className={clsx(className, "lg:items-center flex flex-col")}>
            <div>
            <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">{title ? title : "Nos actus"}</p>
            <Clickable
                clickableType={{type: "link", path: instagramPath, outside: true}}
                style={{variant: "menuSideButton"}}
                className="w-fit flex flex-row gap-x-1 items-center"
            >
                <Instagram className="text-foreground-subdued size-4 lg:size-6"/>
                <p>Instagram</p>
            </Clickable>
            <Clickable
                clickableType={{type: "link", path: facebookPath, outside: true}}
                style={{variant: "menuSideButton"}}
                className="w-fit flex flex-row gap-x-1 items-center"
            >
                <Facebook/>
                <p>Facebook</p>
            </Clickable>
            </div>
        </div>
    );
}