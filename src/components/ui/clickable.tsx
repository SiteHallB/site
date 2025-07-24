
import Link from "next/link";
import links from "@/interface/links.json"

import { cva, type VariantProps } from "class-variance-authority";

import { trackEvent } from "@/components/analytics/ga";
import clsx from "clsx";

const clickableVariants = cva(
    "text-center", 
    {
        variants: {
            color: {
                default: "", 
                primary: "text-foreground-base outline-foreground-base outline-[2px] outline-offset-[-2px]", 
                accent: "text-background-subdued bg-accent", 
            }, 
            variant: {
                page: "w-full px-2 py-2 rounded-full textLead", 
                navigationBar: "px-2 py-1 rounded-full textLeadSmall", 
                menuMainButton: "textSubH2 text-foreground-base", 
                menuSideButton: "textSmall text-foreground-subdued", 
                action: "py-1 rounded-sm textLead shadow-xl", 
                legal: "textSmall text-foreground-subdued", 
            }, 
        },
        defaultVariants: {
            color: "default", 
            variant: "page", 
        }
    }
);

type ClickableType = 
    | {
        type: "button"; 
        onClick: () => void; 
    }
    | {
        type: "link"; 
        onClick: () => void; 
        path?: string; 
        interfaceId?: string;
    }

export default function Clickable({ clickableType, trackingLabel, className, children, style }: 
    {
        clickableType: ClickableType; 
        trackingLabel?: string; 
        className?: string; 
        children: React.ReactNode;

        style: VariantProps<typeof clickableVariants>
    })
{
    function handleTracking() {
        if (trackingLabel) {
            trackEvent({
                action: clickableType.type === "button" ? "click_button" : "click_link", 
                category: "interaction",
                label: trackingLabel,
            })
        }
    }

    function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        handleTracking();
        clickableType.onClick();
    }

    function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
        handleTracking();
        clickableType.onClick();
    }

    const cn = clsx(clickableVariants(style), className)
    
    if (clickableType.type === "button") {
        return (
            <button
                onClick={handleButtonClick}
                className={cn}
            >
                {children}
            </button>
        );
    } else {
        let path = clickableType.path ? clickableType.path : ""
        if (clickableType.interfaceId) {
            const linkObject = links.find(item => item.id === clickableType.interfaceId);
            if (linkObject) path = linkObject["path"]
        }
        return (
            <Link
                href={path}
                onClick={handleLinkClick}
                className={cn}
            >
                {children}
            </Link>
        );
    }
}