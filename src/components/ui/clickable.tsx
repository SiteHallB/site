
import Link from "next/link";
import links from "@/interface/links.json"

import { cva, type VariantProps } from "class-variance-authority";

import { trackEvent } from "@/components/analytics/ga";
import clsx from "clsx";

const clickableVariants = cva(
    "text-center hover:cursor-pointer", 
    {
        variants: {
            color: {
                default: "", 
                primary: "hoverPrimary text-foreground-base outline-foreground-base outline-[2px] outline-offset-[-2px]", 
                primarySubdued: "hoverPrimarySubdued text-foreground-subdued outline-foreground-subdued outline-[2px] outline-offset-[-2px]", 
                accent: "hoverAccent text-background-subdued bg-accent outline-background-subdued outline-[1px]", 
            }, 
            variant: {
                default: "", 
                page: "w-full px-4 py-2 rounded-full textLead", 
                navigationBar: "px-3 py-1 rounded-full textLeadSmall", 
                menuMainButton: "hoverUnderline textSubH2 text-foreground-base", 
                menuSideButton: "hoverUnderline textSmall text-foreground-subdued", 
                action: "py-1 px-2 rounded-sm textLead", 
                legal: "hoverUnderline textSmall text-foreground-subdued", 
                secondary: "textNormal rounded p-2", 
            }, 
        },
        defaultVariants: {
            color: "default", 
            variant: "default", 
        }
    }
);

type ClickableType = 
    | {
        type: "button"; 
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; 
        htmlType?: "button" | "submit" | "reset";
    }
    | {
        type: "link"; 
        onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
        path: string;
        outside?: boolean
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
        if (clickableType.type !== "button") return;
        handleTracking();
        if (clickableType.onClick) clickableType.onClick(e);
    }

    function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
        if (clickableType.type !== "link") return;
        handleTracking();
        if (clickableType.onClick) clickableType.onClick(e);
    }

    const cn = clsx(clickableVariants(style), className)
    
    if (clickableType.type === "button") {
        return (
            <button
                type={clickableType.htmlType || "button"}
                onClick={handleButtonClick}
                className={cn}
            >
                {children}
            </button>
        );
    } else {
        const outsideProps = clickableType.outside
            ? { target: '_blank', rel: 'noopener noreferrer' } : {}
        return (
            <Link
                { ...outsideProps }
                href={clickableType.path}
                onClick={handleLinkClick}
                className={cn}
            >
                {children}
            </Link>
        );
    }
}