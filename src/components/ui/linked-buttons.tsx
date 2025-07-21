import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from 'next/link';
import links from "@/interface/links.json"

const linkedButtonVariants = cva(
    "", 
  {
    variants: {
        variant: {
            menu: "rounded-full px-2 py-1 font-futuretense", 
            adaptable: "rounded-sm w-full py-1 text-center", 
            menuOverlay: "text-accent", 
            legal: "explanation", 
        }, 
        color: {
            default: "", 
            foreground: "bg-foreground-base text-background-base", 
            accent: "bg-accent text-background-base", 
        }, 
        size: {
            default: "text-xs", 
            menuOverlay: "menu", 
        }, 
    },
    defaultVariants: {
      variant: "menu",
      color: "default", 
      size: "default", 
    },
  }
);

type LinkedButtonProps =
    { mode: ( { id: string } | { src: string } )} &
    { text: string } &
    { onClick?: () => void } &
    VariantProps<typeof linkedButtonVariants> & {
        className?: string;
    };

export default function LinkedButton({ mode, text, onClick, className, variant, color, size, ...props }: LinkedButtonProps) {
    let link=""
    if ("id" in mode) {
        const linkObject = links.find(item => item.id === mode.id);
        if (linkObject) {
            link = linkObject["link"]
        }
    } else if ("src" in mode) {
        link = mode.src
    }
    return (
        <Link
            href = {link}
            className={clsx(linkedButtonVariants({ variant, color, size }), className)}
            {...props}
            onClick={onClick}
        >
            {text}
        </Link>
    );
}