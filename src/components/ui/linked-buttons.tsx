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
    { id: string } &
    { text: string } &
    VariantProps<typeof linkedButtonVariants> & {
        className?: string;
    };

export default function LinkedButton({ id, text, className, variant, color, size, ...props }: LinkedButtonProps) {
    const linkObject = links.find(item => item.id === id);
    let link = ""
    if (linkObject) {
        link = linkObject["link"]
    }
    return (
        <Link
            href = {link}
            className={clsx(linkedButtonVariants({ variant, color, size }), className)}
            {...props}
        >
            {text}
        </Link>
    );
}