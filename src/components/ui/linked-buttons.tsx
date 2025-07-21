import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from 'next/link';
import links from "@/interface/links.json"

const linkedButtonVariants = cva(
  "font-futuretense uppercase",
  {
    variants: {
        variant: {
            menu: "rounded-full px-2 py-1", 
            adaptable: "rounded-sm w-full py-1 text-center"
        }, 
        color: {
            foreground: "bg-foreground-base text-background-base", 
            accent: "bg-accent text-background-base", 
        }, 
        size: {
            default: "text-xs", 
        }, 
    },
    defaultVariants: {
      variant: "menu",
      color: "accent", 
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